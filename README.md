# Prepočet epizód seriálu  

Jednoduchá webová aplikácia na odhad počtu epizód preloženej verzie seriálu na základe údajov z originálneho (pôvodne nepreloženého) seriálu.  

## 🎨 Vzhľad stránky  
✅ Prehľadný a jednoduchý dizajn  
✅ Svetlý a tmavý režim s prepínaním  
✅ Optimalizované pre mobilné zariadenia  

## ⚡ Funkcie  
✔️ Automatická kontrola vstupu a ošetrenie bežných chýb  
✔️ Vymazanie vstupov jedným klikom  
✔️ Interaktívna nápoveda (po ukázaní myšou na otáznik)  
✔️ Dynamická úprava odhadovaného času – po výpočte možno čas ručne doladiť (napr. ±30 min, ±1–4 hod, reset)

## 📌 Odkiaľ získať potrebné údaje? ##
-> Potrebné údaje sú takmer vždy na ČSFD, kliknutím na "Prepočet epizód seriálu" sa otvorí "csfd.sk".

## 🔢 Čo treba zadať?  
Máš dve možnosti:  
1. **Presnejší výpočet** – zadaj **celkový čas** + *rozsah minutáže preložených epizód  
2. **Odhadovaný výpočet** – ak nepoznáš celkový čas, zadaj:  
   - Min-max minutáž pôvodného seriálu v pôvodnom jazyku
   - Počet epizód  
   - Rozsah minutáže preložených epizód
*Predvolená minutáž preloženej epizódy je 40–50 min = 45 min. Ak nezadáš nič, použije sa automaticky.

## 🧮 Ako sa počíta počet epizód?  
1. Ak je zadaný celkový čas seriálu, použije sa na výpočet v kombinácii s rozsahom minutáže preložených epizód.  
2. Ak nie je známy celkový čas, ale vieme počet epizód a minutáž pôvodného nepreloženého seriálu, najskôr sa odhadne približný celkový čas.
3. Na základe celkového času a predpokladaného rozsahu minutáže preloženej verzie sa vypočíta odhadovaný počet epizód.
     
   **Výsledok sa zobrazí kliknutím na "Vypočítať**  

## 🌍 Spustenie offline HTML 
1. Stiahni si `PrepočetEpizódSeriálu.html`  
2. Otvor ho.  
3. Zadaj údaje a klikni na **„Vypočítať“**.  
4. Ak chceš začať odznova, použi tlačidlo **„Vymazať“**.

## ⚠️ UPOZORNENIE:
**Výpočty majú iba informatívny charakter. Nie je možné presne "vypočítať" počet preložených epizód z pôvodného jazyka seriálu pretože epizódy majú rôzne dĺžky. Všetko funguje iba na základe premieru zo zadaných údajov.** 
