# IT Jobben
Demo för appen finns [här.](https://itjobben.herokuapp.com)

IT Jobben är en webb applikation som använder öppen data ifrån [Arbetsförmedlingens API](https://api.arbetsformedlingen.se) för att hitta lediga IT-jobb i Sverige.

På IT Jobben kan man hitta lediga jobb inom specifikt yrke, hitta jobb i kommuner, söka efter lediga jobb eller se enklare statistik över hur arbetsmarknaden ser ut för IT-sektorn.

IT Jobben består av en Node server och Angular kod på frontend sidan som pratar med Node servern (som i sin tur pratar med Arbetsförmedlingens API) och visar lediga IT-jobb.

## Backend
Som backend till denna webbapp används Node och Express. Javascript används alltså både på backend och frontend.

`server/app.js` är själva huvudfilen där servern skapas. Denna fil importerar först en config fil `server/config.js` och slutligen route filerna `server/routes/api.js` och `server/routes/location.js`.

Konfig-filen `server/config.js` innehåller en logger-funktion som hela tiden använder console.log om req.method, req.url och req.params. Konfig-filen möjliggör även CORS vilket behövs för att göra cross-domain snack.

I `server/routes/` finns två olika filer som sköter http requests med Arbetsförmedlingens API och skickar tillbaka data. `server/routes/api.js` har hand om requests för yrkesgrupper, yrken och sökning medan `server/routes/location.js` har hand om request för län, kommuner och sådant. Se respektive filer för vilka typer av requests som går att göra.


### Start av servern
Beroende på om man befinner sig i utvecklingsmiljö eller produktionsmiljö ska olika `NODE_ENV` parametrar användas när servern startas. Environment variablarna som kan skickas in är antingen `production` eller `development`.

Olika environment varaibles används för att servern serverar olika mappar som statiska filer. `dist/` är för det mesta tom på alla git grenar förutom digitalocean och då är det bättre att kunna starta servern och ha `app/` serverad istället.

I `server/app.js` och `server/config.js` finns if-satser som lyssnar efter vilken NODE_ENV som används och serverar olika filer beroende på variableln.

Du kan enkelt starta utveckling eller produktion av node servern med hjälp av npm scripts.

#### Start i utvecklingsmiljö
När servern startas i utvecklingsmiljö ska förslagsvsis nodemon användas, detta för att servern då startar om sig själv när förändringar sker i filerna som berörs. Detta för att slippa manuellt starta om servern hela tiden.
```
$ npm run start:dev
```
#### Start i produktionsmiljö
Det andra sättet att starta servern på är alltså att använda `production` som NODE_ENV. Detta innebär att `dist/` används som statiska filer till servern istället för `app/`.

När servern ska startas i produktionsmiljö behövs inte nodemon användas utan kan på lokal maskin startas med hjälp av node istället.
```
$ npm run start:prod
```

När servern sen är igång är det bara öppna en webbläsare och gå till `http://LOKAL-IP:1339`



## Frontend

Angular.js används som grund för klientsidan och klientkoden finns  i `app/`.

### Bower
Bower används för att installera frontend bibliotek och när dessa installeras hamnar de i `lib/` tack vare inställningarna i `.bowerrc`.

### Angular.js

#### Controllers
I `app/js/controllers/` finns en hel del controller-filer som gör httqp requests med servern och binder resultat till $scope.

#### Templates
I `app/templates/` finns olika templates som är knutna till respektive controllers i controllers-mappen.

### SCSS och CSS
SCSS används med hjälp av gulp.js för att skriva styling enklare och kompilera SCC till CSS kod.

I `app/css/scss/style.scss` görs olika imports till filer i `app/css/scss/partials/_PARTIAL-NAME.SCSS` där bland annat filer för variabler, mixins och allmän layout finns.

## Användning av Gulp.js

Gulp.js används och har en del dev-dependencies som går att se i `package.json`. Gulp används på den lokala datorn för att slå ihop javascript-filer, kompilera scss, optimera bilder, minifiera html-filer samt att slå ihop externa bibliotek såsom angular och bootstrap till en enda fil för respektive css och javascript kod.

`gulpfile.js` innehåller en del gulp tasks men default task som körs med `gulp` anropar en watch task som håller koll på css, html och javascript kod i `app/`. När förändringar sker i respektive path eller filändelse körs diverse gulp tasks och har `dist/` som slutpunkt.

Se `gulpfile.js` för mer info om vad det är för task som finns tillgängliga.

```
// Se till att gulp körs när du utvecklar för att watch ska kunna köras på app/
// Gulp default task är att hålla koll på alla filer i /app så inga parametrar behöver skrivas i kommandot
$ gulp
```
## Heroku deployment
VPS hos Digital Ocean används inte längre utan Heroku används istället.
Följande kommando pushar kod från master branch till remote heroku branch
```
$ git push heroku master
```

### NPM scripts
NPM Scritps används i samband med deploy till Heroku. Det handlar om `preinstall` och `postinstall`. Den första ser till att alla filer i `bower.json` installeras och den andra använder en gulp task för att bygga filer i produktionsmiljö

## TODO
