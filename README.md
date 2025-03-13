# Prepočet epizód seriálu  

Jednoduchá webová aplikácia na odhad počtu epizód preloženého seriálu na základe údajov z originalného (pôvodne nepreloženého) seriálu.  

## 🎨 Vzhľad stránky  
✅ Jednoduchý a prehľadný dizajn  
✅ Podpora tmavého a svetlého režimu s možnosťou prepínania  

## ⚡ Funkcie  
✔️ Automatická kontrola vstupu a ošetrenie bežných chýb  
✔️ Vymazanie vstupov jedným klikom  
✔️ Interaktívna nápoveda (po ukázaní myšou na otáznik)  
✔️ Dynamický výstup – výsledky sa zobrazia okamžite  

## 🔢 Čo treba zadať?  
Máš dve možnosti:  
1. **Presný výpočet** – zadaj **celkový čas** + rozsah minutáže preložených epizód.  
2. **Odhadovaný výpočet** – ak nepoznáš celkový čas, zadaj:  
   - Min-max minutáž pôvodného jazyka  
   - Počet epizód  
   - Rozsah minutáže preložených epizód  

## 🧮 Ako sa počíta počet epizód?  
1. Ak je zadaný celkový čas seriálu, použije sa na výpočet.  
2. Ak nie je známy, ale vieme počet epizód a minutáž, najskôr sa odhadne celkový čas.  
3. Na základe celkového času a predpokladaného rozsahu minutáže preloženej verzie sa vypočíta odhadovaný počet epizód.  

**Výsledok sa zobrazí okamžite na stránke.**  

## 🌍 Spustenie offline HTML 
1. Stiahni si `index.html`.  
2. Otvor ho v modernom prehliadači.  
3. Zadaj údaje a klikni na **„Vypočítať“**.  
4. Ak chceš začať odznova, použi tlačidlo **„Vymazať“**.
   
## 💻 Spustenie offline ako program  
1. Stiahni si `prepocet_epizod_serialu.exe`.  
2. Zadávaj postupne údaje a program automaticky urobí výpočet.  
   - Program funguje úplne rovnako ako webstránka.  

### **Návod:**  
1. Ak nepoznáš hodnotu/y alebo nie sú potrebné, stlač Enter.  
2. Ak si nie si istý, čo zadať, napíš `?` a zobrazí sa nápoveda.  

### **Musíš zadať:**  
- Buď **celkový čas** a **rozsah preložených epizód**  
- Alebo **počet epizód**, **rozsah min-max minutáže** pre pôvodné epizódy a **rozsah preložených epizód**  

## 🚀 Netlify
Aplikácia je nasadená na **Netlify** a dostupná online.
