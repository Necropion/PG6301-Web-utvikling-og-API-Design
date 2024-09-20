# PG6301 Web-utvikling og API Design Eksamen

Jeg har en deployet denne appen på Heroku, dersom den vil testes uten å kjøre koden lokalt:
Heroku Link for testing: https://simple-heroku-0f0e028dd370.herokuapp.com/

### Karakter: C

Oppgaven på eksamen var å lage an live chat applikasjon der man kunne snakke sammen med andre mennesker på sann-tid fra forskjellige datamaskiner.

Applikasjonen møter deg med en inloggingsside der du har valget mellom Google Login eller registrering av tradisjonelt bruker med passord. Når du har logget inn møtes du av hjemmesiden med en liste av alle chat rom laget av brukere på applikasjonen. du kan bli med på hvilken som helt chat og begynne en samtale. Du har også mulighet til å lage dine egne chat rom og se alle chat rom som du har laget i "My Chats". Om du vil se informasjon om din egen profil har du Profile komponenten, ellers kan du alltid se alle brukere på nettsiden og trykke på dem for å se deres informasjon.

### Merkeverdige teknologier med appen:
- OAuth2 Google OpenID Login
- Websockets for sanntids oppdattering for chatten
- REST API Backend med Express/Node.js
- Registrering og lagring av Brukere
- Autorisering av brukere(Man kan ikke bruke applikasjonen hvis man er ikke logget inn på noe som helst måte)
- Lagring av data med NoSQL database MongoDB
- Kommunikasjon med MongoDB databasen ved bruk av en ORM Mongoose
- Bruk av Middleware som (bodyParser, cookieParser, Mongoose osv.)
- React Library for Frontend funksjonalitet

### Testing lokalt:

For å kunne kjøre denne applikasjonen kommre du til å trenge 2 Environment Variabler:
- PORT variabel(Hvilken lokal port din lokale server skal kjøres på)
- En MONGO_URI til en database i Mongo Atlas
- En COOKIE_SECRET(for autentisering av brukere)

Uten disse variablene kommer ikke appen til å kjøre

Dette bør være inne i en .env fil inne på server mappen.

Kjør disse kommandoene for å sette opp prosjektet lokalt:
1. I prosjekt root folder, bruk 'npm install' i terminal
2. Videre: 'npm run postinstall'
3. Grunnet at appen blir deployet på heroku må appen bruke secure web-sockets, derfor er linken til websockets i koden wss og ikke ws. Hvis du vil kjøre koden lokalt må dette endres til ws. Eneste stedet dette må endres er på Chat komponenten i fuseLoadandFetch useEffect metoden.
4. 'npm run dev' og appen skal kjøre
