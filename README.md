# IT Jobben
(Text kommer...)

## Info om Servern
(Text kommer...)

## Klientsidan
(Text kommer...)

## Användning av Gulp.js
(Text kommer...)

### Deploy med gulp.js
I `gulpfile.js` finns det 5 stycken gulp tasks som är till för att underlätta deploy till vps servern. Det handlar om tasks som uppdaterar digitalocean-grenen från master, bygger dist-mappen med nytt innehåll, committar och slutligen pushar till `live digitalocean`.

I Följande ordning ska gulp kommandona exekveras:

* `gulp checkout-digitalocean` eller `git checkout digitalocean`.
* `gulp update-branch` som uppdaterar current branch med innehåll från master. Detta med hjälp av en lokal pull --rebase.
* `gulp build-dist` som bygger om `/dist` mappen från det nya innehållet som föregånde gulp task genererade.
* `gulp commit` som helt enkelt committar alla ändringar som gjorts i `/dist`.
* `gulp push-vps` som slutligen gör en force push till `live digitalocean` och alltså uppdaterar repot på VPS-servern.


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

Antingen kan du följa detta arbetsflöde eller använda dig av de Gulp tasks som är skapde för att enklare göra en deploy till VPS-servern. Se mer under rubriken "Användning av Gulp.js"

## TODO
* Skriv en gulp-task som automatiserar `git push` till vps-servern
* Skriv klart README
