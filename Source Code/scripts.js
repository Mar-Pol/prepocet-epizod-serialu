document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initTooltip();
  initInputFields();
});

// --- Téma ---
function initTheme() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").checked = true;
    document.querySelector(".slider .icon").textContent = "🌙";
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("themeToggle").checked = false;
    document.querySelector(".slider .icon").textContent = "🌞";
  }
}
window.onload = () => {
  let saved = localStorage.getItem("darkMode");
  if (saved === null) {
    localStorage.setItem("darkMode", "true");
  }
  initTheme();
};

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  let isDark = document.body.classList.contains("dark-mode");
  let icon = document.querySelector(".slider .icon");
  icon.style.opacity = "0";
  setTimeout(() => {
    icon.textContent = isDark ? "🌙" : "🌞";
    icon.style.opacity = "1";
  }, 200);
  localStorage.setItem("darkMode", isDark.toString());
}

function validateInput(input) {
  if (input.value.includes('-')) {
    input.value = input.value.replace('-', '');
  }
}

// --- Tooltip ---
function initTooltip() {
  const help = document.getElementById("helpIcon");
  const tip = document.getElementById("tooltip");
  if (!help || !tip) return;
  help.addEventListener("mouseover", () => {
    tip.style.display = "block";
    let r = help.getBoundingClientRect();
    let left = r.right + 10;
    if (left + tip.offsetWidth > window.innerWidth) {
      left = r.left - tip.offsetWidth - 10;
    }
    tip.style.top = r.top + window.scrollY + "px";
    tip.style.left = left + "px";
  });
  help.addEventListener("mouseout", () => tip.style.display = "none");
}

// --- Popup správy ---
function _showPopup(msg, cls) {
  const popup = document.createElement('div');
  popup.textContent = msg;
  popup.className = 'popup ' + cls;
  document.body.appendChild(popup);
  setTimeout(() => document.body.removeChild(popup), 3000);
}

function showError(msg) {
  _showPopup(msg, 'popup-error');
}

function showInfo(msg) {
  _showPopup(msg, 'popup-info');
}

// --- Vstupy & Validácie ---
function initInputFields() {
  const ep = document.getElementById("episodes");
  const range = document.getElementById("episodeRange");
  const bMin = document.getElementById("borderMin");
  const bMax = document.getElementById("borderMax");
  const hrs = document.getElementById("hours");
  const mins = document.getElementById("minutes");

  function blokujNuluNaZaciatku(input) {
    input.addEventListener("keypress", function (e) {
      if (e.key === '0' && input.value.length === 0) {
        e.preventDefault();
        showError("Číslo nemôže začínať nulou.");
      }
    });
  }

  // Použitie pre všetky relevantné vstupy
  [ep, hrs, mins, bMin, bMax, range].forEach(input => {
    blokujNuluNaZaciatku(input);
  });


  // Toggle fields
  ep.addEventListener("input", toggleTimeInput);
  bMin.addEventListener("input", toggleTimeInput);
  bMax.addEventListener("input", toggleTimeInput);
  hrs.addEventListener("input", toggleEpisodeInput);
  mins.addEventListener("input", toggleEpisodeInput);

  // Validácia rozsahu po blur
  range.addEventListener("blur", function () {
    let original = this.value;
    let clean = original
      .replace(/[–—]/g, "-")
      .replace(/^-+|-+$/g, "")
      .trim();
    this.value = clean;
    if (clean !== original && /[–—-]/.test(original)) {
      showInfo("Bolo odstránené '-' na konci.");
    }
    if (!validateRangeOrSingle(clean)) {
      showError("Zadajte platný rozsah napr. '40-50'.");
      this.value = "";
    }
  });
  range.addEventListener("keypress", function (e) {
    if (!((e.which >= 48 && e.which <= 57) || [45, 8211, 8212].includes(e.which))) {
      e.preventDefault();
      showError("Povolené iba číslice a pomlčka.");
    }
  });

  // Validácia čísiel
  [hrs, mins, bMin, bMax].forEach(input => {
    input.addEventListener("keypress", function (e) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        showError("Povolené iba číslice.");
      }
    });
  });

  // Epizódy (+)
  ep.addEventListener("blur", function () {
    let orig = this.value.trim();
    if (orig.endsWith("+")) {
      this.value = orig.replace(/\++$/, "");
      showInfo("Bolo odstránené '+' na konci.");
    }
    let v = this.value;
    if (v && !/^\d+(\+\d+)*$/.test(v)) {
      showError("Neplatný formát pre epizódy. Použi '12+8'.");
      this.value = "";
    }
  });
  ep.addEventListener("keypress", function (e) {
    if (!(/[0-9]/.test(e.key) || e.key === '+')) {
      e.preventDefault();
      showError("Povolené iba číslice a '+'.");
    }
  });
}

// Pomocná: prepnutie vstupov časy/epizódy
function toggleEpisodeInput() {
  const hrsVal = document.getElementById("hours").value;
  const minsVal = document.getElementById("minutes").value;
  const ep = document.getElementById("episodes");
  const bMin = document.getElementById("borderMin");
  const bMax = document.getElementById("borderMax");
  const msgE = document.getElementById("episodeMsgAlert");
  const msgMin = document.getElementById("minMsgAlert");
  const msgMax = document.getElementById("maxMsgAlert");

  if (hrsVal || minsVal) {
    // zablokuj vstupy a vymaž hodnoty
    ep.disabled = true;
    bMin.disabled = true;
    bMax.disabled = true;
    ep.value = "";
    bMin.value = "";
    bMax.value = "";

    // oranžový text pod každým polom
    const info = "<span style='color:orange;'>Tento údaj nie je potrebný pri výpočte, pretože sa použije zadaný čas.</span>";
    if (msgE) msgE.innerHTML = info;
    if (msgMin) msgMin.innerHTML = info;
    if (msgMax) msgMax.innerHTML = info;
  } else {
    // odblokuj vstupy
    ep.disabled = false;
    bMin.disabled = false;
    bMax.disabled = false;
    if (msgE) msgE.innerHTML = "";
    if (msgMin) msgMin.innerHTML = "";
    if (msgMax) msgMax.innerHTML = "";
  }
}

// Pomocná: prepnutie vstupov rozsah/časy
function toggleTimeInput() {
  const epVal = document.getElementById("episodes").value;
  const minVal = document.getElementById("borderMin").value;
  const maxVal = document.getElementById("borderMax").value;
  const hrs = document.getElementById("hours");
  const mins = document.getElementById("minutes");
  const msgH = document.getElementById("hoursMsgAlert");
  const msgM = document.getElementById("minutesMsgAlert");

  if (epVal || minVal || maxVal) {
    // zablokuj vstupy a vymaž hodnoty
    hrs.disabled = true;
    mins.disabled = true;
    hrs.value = "";
    mins.value = "";

    // oranžový text pod oboma polami
    const info = "<span style='color:orange;'>Odhadovaný počet hodín bude vypočítaný.</span>";
    if (msgH) msgH.innerHTML = info;
    if (msgM) msgM.innerHTML = info;
  } else {
    // odblokuj vstupy
    hrs.disabled = false;
    mins.disabled = false;
    if (msgH) msgH.innerHTML = "";
    if (msgM) msgM.innerHTML = "";
  }
}


// Validácia rozsahu
function validateRangeOrSingle(value) {
  const cleaned = value.replace(/[–—]/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
  if (/^[1-9][0-9]*$/.test(cleaned)) return true;
  if (/^[1-9][0-9]*-[1-9][0-9]*$/.test(cleaned)) {
    const [f, t] = cleaned.split("-").map(Number);
    return f <= t;
  }
  return false;
}

// Výpočty epizód
let currentTotalMinutes = 0;
let isEstimatedTime = false;

function calculateEpisodes() {
  let h = parseInt(document.getElementById("hours").value) || 0;
  let m = parseInt(document.getElementById("minutes").value) || 0;
  let totalMinutes = h * 60 + m;
  let borderMin = parseInt(document.getElementById("borderMin").value) || 0;
  let borderMax = parseInt(document.getElementById("borderMax").value) || 0;
  let episodes = parseEpisodeCount(document.getElementById("episodes").value);

  if (!h && !m && !borderMin && !borderMax && !episodes) {
    showError("Zadaj hodnoty");
    document.getElementById("result").innerHTML = "";
    return;
  }

  let [newMinLength, newMaxLength] = parseRange(document.getElementById("episodeRange").value);

  isEstimatedTime = (totalMinutes === 0 && episodes > 0);
  if (isEstimatedTime) {
    let avgOrig = (borderMin && borderMax && borderMin !== borderMax) ?
      (borderMin + borderMax) / 2 :
      Math.max(borderMin, borderMax);
    totalMinutes = episodes * avgOrig;
  }
  currentTotalMinutes = totalMinutes;

  let newMaxCount = newMinLength > 0 ? Math.round(totalMinutes / newMinLength) : 0;
  let newMinCount = newMaxLength > 0 ? Math.round(totalMinutes / newMaxLength) : 0;
  let avgNew = (newMaxCount > 0 && newMinCount > 0) ?
    Math.floor((newMinCount + newMaxCount) / 2) :
    0;

  let res = "";
  if (isEstimatedTime) {
    res += `<strong>Odhadovaný celkový čas:</strong> <span id="estimatedTime">${Math.floor(totalMinutes/60)} hod ${Math.round(totalMinutes%60)} min</span>`;
    res += ` <span class="time-adjuster">
        <select id="timeAdjustValue" class="form-select form-select-sm">
            <option value="30">30min</option>
            <option value="45">45min</option>
            <option value="60" selected>1h</option>
            <option value="120">2h</option>
            <option value="180">3h</option>
            <option value="240">4h</option>
        </select>
        <button class="btn-add" onclick="adjustTime(true)">+</button>
        <button class="btn-sub" onclick="adjustTime(false)">-</button>
        <button class="btn-reset" onclick="resetTime()">RESET</button>
        </span><br>`;
  }
  res += `<strong>Zadaný celkový čas seriálu v pôvodnom jazyku:</strong> ${Math.floor(totalMinutes / 60)} hod ${totalMinutes % 60} min <br>`;
  res += `<strong>Celkový čas seriálu v minutách:</strong> ${Math.round(totalMinutes)} minút<br><br>`;

  function sklonuj(n) {
    if (n === 1) return "epizódu";
    if (n >= 2 && n <= 4) return "epizódy";
    return "epizód";
  }
  if (newMinLength === newMaxLength) {
    res += `<strong>Odhadovaná dĺžka seriálu je </strong><span id="episodeCount">${avgNew}</span> ${sklonuj(avgNew)}.`;
  } else {
    res += `<strong>Preložený seriál by mohol mať približne od</strong> <span id="minEpisodeCount">${newMinCount}</span> <strong>do</strong> <span id="maxEpisodeCount">${newMaxCount}</span> ${sklonuj(newMaxCount)}.<br>`;
    res += `<strong>Odhadovaná dĺžka seriálu: </strong><span id="avgEpisodeCount">${avgNew}</span> ${sklonuj(avgNew)}.`;
  }
  document.getElementById("result").innerHTML = res;
}

//  adjustTime
function adjustTime(add) {
  if (!isEstimatedTime) return;

  let adjustSelect = document.getElementById("timeAdjustValue");
  if (!adjustSelect) {
    let adj = 60;
    currentTotalMinutes = Math.max(0, currentTotalMinutes + (add ? adj : -adj));
  } else {
    let adj = parseInt(adjustSelect.value) || 60;
    currentTotalMinutes = Math.max(0, currentTotalMinutes + (add ? adj : -adj));
  }

  // Aktualizácia zobrazeného času
  let hours = Math.floor(currentTotalMinutes / 60);
  let minutes = Math.round(currentTotalMinutes % 60);
  document.getElementById("estimatedTime").textContent = `${hours} hod ${minutes} min`;

  // Aktualizácia celkového času (ak existuje)
  let totalDisplay = document.getElementById("totalMinutesDisplay");
  if (totalDisplay) {
    totalDisplay.textContent = Math.round(currentTotalMinutes);
  }

  // Prepočet epizód
  let [newMinLength, newMaxLength] = parseRange(document.getElementById("episodeRange").value);
  let newMaxCount = newMinLength > 0 ? Math.round(currentTotalMinutes / newMinLength) : 0;
  let newMinCount = newMaxLength > 0 ? Math.round(currentTotalMinutes / newMaxLength) : 0;
  let avgNew = (newMaxCount > 0 && newMinCount > 0) ? Math.floor((newMinCount + newMaxCount) / 2) : 0;

  // Aktualizácia počet epizód
  if (document.getElementById("episodeCount")) {
    document.getElementById("episodeCount").textContent = avgNew;
  }
  if (document.getElementById("minEpisodeCount")) {
    document.getElementById("minEpisodeCount").textContent = newMinCount;
  }
  if (document.getElementById("maxEpisodeCount")) {
    document.getElementById("maxEpisodeCount").textContent = newMaxCount;
  }
  if (document.getElementById("avgEpisodeCount")) {
    document.getElementById("avgEpisodeCount").textContent = avgNew;
  }
}

function resetTime() {
  calculateEpisodes();
}

// Parsovanie rozsahu s predvolením
function parseRange(input) {
  let v = input.replace(/[–—]/g, "-").replace(/^-+|-+$/g, "").trim();
  if (!v) return [40, 50];
  let p = v.split("-").map(x => x.trim());
  if (p.length === 1) {
    let n = parseInt(p[0]) || 0;
    return [n, n];
  }
  if (p.length === 2) {
    let a = parseInt(p[0]) || 0,
      b = parseInt(p[1]) || 0;
    return [a, b];
  }
  showError("Neplatný rozsah! Použite napr. '43-50'.");
  return [40, 50];
}

// Parsovanie počtu epizód
function parseEpisodeCount(input) {
  let v = input.replace(/\s+/g, "");
  if (!v) return 0;
  if (v.includes("+")) {
    return v.split("+").reduce((sum, x) => sum + (parseInt(x) || 0), 0);
  }
  return parseInt(v) || 0;
}

// Vymaž vstupy
function clearInputs() {
  ["hours", "minutes", "episodes", "episodeRange", "borderMin", "borderMax"].forEach(id => {
    const e = document.getElementById(id);
    if (e) e.value = "";
  });
  document.getElementById("result").innerHTML = "";
  toggleTimeInput();
  toggleEpisodeInput();
}