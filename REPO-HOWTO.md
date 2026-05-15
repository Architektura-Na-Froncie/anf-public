#  Repozytorium Architektury na Froncie

(kopia wiadomości, którą uczestnicy ANF powinni otrzymać e-mailem)

  - **REPO**. kod kolejnych modułów będzie publikowany w repozytorium na GitLabie, pod adresem `https://anf:AMyNf1Yyg8sUMdaHeyW7@gitlab.com/architektura-na-froncie/anf-public-2022.git`
  - aby pobrać repo, uruchom poniższą komendę z linii poleceń (trzeba mieć zainstalowanego klienta git): `git clone https://anf:AMyNf1Yyg8sUMdaHeyW7@gitlab.com/architektura-na-froncie/anf-public-2022.git` lub z poziomu IDE, jak wolisz 🙃
  - **BRANCHE**. Kodzik będzie na gałęzi `main` 
  - **ZALEŻNOŚCI**. Skoro masz już sklonowane repozytorium, trzeba zainstalować zależności (czyli wszystkie biblioteki i narzędzia, wymagane do uruchomienia kodu). Uruchom w terminalu polecenie `npm install` **w katalogu głównym repozytorium**. (Ewentualnie możesz ręcznie wywołać `npm install` wewnątrz 2 katalogów: `api/` i `webapp/`)
  - **NOWE MODUŁY**. W momencie publikacji każdego nowego modułu szkolenia, dostępne są nie tylko lekcje video, slajdy itp - ale również nowe commity w repo na gałęzi `main`. Najpierw standardowo `git pull` - ale potem trzeba zainstalować nowe zależności (`npm install`). **Kolejne moduły dodawać będą nowe zależności**.
  - **LOKALNE MODYFIKACJE**. Zachęcamy do lokalnego “znęcania się” nad kodem, ale **zalecamy umieszczać swoje zmiany na osobnych gałęziach** - aby zminimalizować ryzyko konfliktów pomiędzy swoimi zmianami, a kodem kolejnych modułów. Sporadycznie - ale jednak - kod nowego modułu będzie modyfikował pliki już istniejące.
  - **NODE/NPM**. Wspieramy node v16+ oraz npm v8+.
  - unikaj spacji w nazwach folderów (np. tam, gdzie klonujesz repo) 🤓
