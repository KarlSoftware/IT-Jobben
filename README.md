# IT Jobben
(Text kommer...)

## Info om Servern
Som backend till denna webbapp används Node och Express. Javascript används alltså både på backend och frontend.

`server/app.js` är själva huvudfilen där servern skapas. Denna fil importerar först en config fil `server/config.js` och slutligen route filerna `server/routes/api.js` och `server/routes/location.js`.

Konfig-filen innehåller en logger-funktion som hela tiden använder console.log om req.method, req.url och req.params. Konfig-filen möjliggör även CORS vilket behövs för att göra cross-domain snack.

I `server/routes/` finns två olika filer som sköter http requests med Arbetsförmedlingens API och skickar tillbaka data. `server/routes/api.js` har hand om requests för yrkesgrupper, yrken och sökning medan `server/routes/location.js` har hand om request för län, kommuner och sådant. Se respektive filer för vilka typer av requests som går att göra.


### Start av servern
Beroende på om man befinner sig i utvecklingsmiljö eller produktionsmiljö ska olika `NODE_ENV` parametrar användas när servern startas. Environment variablarna som kan skickas in är antingen `production` eller `development`.

Olika environment varaibles används för att servern serverar olika mappar som statiska filer. `dist/` är för det mesta tom på alla git grenar förutom digitalocean och då är det bättre att kunna starta servern och ha `app/` serverad istället.

I `server/app.js` och `server/config.js` finns if-satser som lyssnar efter vilken NODE_ENV som används och serverar olika filer beroende på variableln.

#### Start i utvecklingsmiljö
När servern startas i utvecklingsmiljö ska förslagsvsis nodemon användas, detta för att servern då startar om sig själv när förändringar sker i filerna som berörs. Detta för att slippa manuellt starta om servern hela tiden.
```
// Starta servern i developmentläge
$ NODE_ENV=development nodemon server/app.js
```
#### Start i produktionsmiljö
Det andra sättet att starta servern på är alltså att använda `production` som NODE_ENV. Detta innebär att `dist/` används som statiska filer till servern istället för `app/`.

När servern ska startas i produktionsmiljö behövs inte nodemon användas utan kan på lokal maskin startas med hjälp av node istället.
```
// Starta servern i produktionsläge
$ NODE_ENV=production node server/app.js
```

För att starta servern på VPS-servern ska istället förslagsvis npm-paketet `forever` användas. Detta för att forever låter servern vara igång även om ssh-sessionen bryts.
```
// starta servern på VPS-servern
$ NODE_ENV=production forever start server/app.js
```

När servern sen är igång är det bara öppna en webbläsare och gå till `http://LOKAL-IP:1339`



## Klientsidan

Angular.js används som grund för klientsidan och klientkoden finns  i `app/`.

Bower används för att installera frontend bibliotek och när dessa installeras hamnar de i `lib/` tack vare inställningarna i `.bowerrc`.

### Angular controllers
I `app/js/controllers/` finns en hel del controller-filer som gör httqp requests med servern och binder resultat till $scope.
### Angular templates
I `app/templates/` finns olika templates som är knutna till respektive controllers i controllers-mappen.
### SCSS och CSS
SCSS används med hjälp av gulp.js för att skriva styling enklare och kompilera SCC till CSS kod.

I `app/css/scss/style.scss` görs olika imports till filer i `app/css/scss/partials/_PARTIAL-NAME.SCSS` där bland annat filer för variabler, mixins och allmän layout finns.

## Användning av Gulp.js

Gulp.js används och har en del dev-dependencies som går att se i `package.json`. Gulp används på den lokala datorn för att slå ihop javascript-filer, kompilera scss, optimera bilder, minifiera html-filer samt att slå ihop externa bibliotek såsom angular och bootstrap till en enda fil för respektive css och javascript kod.

`gulpfile.js` innehåller en del gulp tasks men default task som körs med `gulp` anropar en watch task som håller koll på css, html och javascript kod i `app/`. När förändringar sker i respektive path eller filändelse körs diverse gulp tasks och har `dist/` som slutpunkt.

Se `gulpfile.js` för mer info om vad det är för task som finns tillgängliga.

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
* Skriv klart README
