# IT Jobben
(Text kommer...)

## Info om Servern
(Text kommer...)

## Klientsidan
(Text kommer...)

## Användning av Gulp.js
(Text kommer...)


## Arbetsflöde för att uppdatera VPS-servern
(Under konstruktion)
En Git branch används för att uppdatera VPS-servern (Digitalocean) med ny kod. Detta med hjälp av en git branch vid namn 'digitalocean'. En Branch används för att `/dist` mappen i vanliga fall inkulderas i `.gitignore`. Detta är inte fallet med digitalocean-grenen.

 Arbetsflöde för att uppdatera VPS-servern bör följa denna struktur:
* Jobba på feature-branches
* När du är nöjd (efter noggrant testande) gör en `git merge` in i master igen med den nya koden
* Kolla en extra gång att allt fungerar som det ska
* `git checkout digitalocean` för att byta till grenen som sedan ska pushas till VPS-servern. Uppdatera dena gren med de nya ändringarna från master med hjälp av `git rebase master`. Grenen digitalocean är nu up-to-date med master.
* `git push -f live digitalocean` för att pusha den nya koden till vps-servern. `live` är alltså namnet på den remote branch som är satt för vps-servern.
* Slutligen `git checkout master` igen för att gå tillbaka till master branch

## TODO
* Skriv en gulp-task som automatiserar `git push` till vps-servern
* Skriv klart README
