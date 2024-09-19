# PG6301 Web-utvikling og API Design Eksamen

Jeg har en deployet denne appen på Heroku, dersom den vil testes uten å kjøre koden lokalt:
Heroku Link for testing: https://simple-heroku-0f0e028dd370.herokuapp.com/

Karakter: C

Oppgaven på eksamen var å lage an live chat applikasjon der man kunne snakke sammen med andre mennesker på sann-tid fra forskjellige datamaskiner.

Merkeverdige teknologier med appen:
- OAuth2 Google OpenID Login
- Websockets for sanntids oppdattering for chatten
- REST API Backend med Express/Node.js
- Registrering og lagring av Brukere
- Autorisering av brukere(Man kan ikke bruke applikasjonen hvis man er ikke logget inn på noe som helst måte)
- Lagring av data med NoSQL database MongoDB
- Kommunikasjon med MongoDB databasen ved bruk av en ORM Mongoose
- Bruk av Middleware som (bodyParser, cookieParser, Mongoose osv.)
- React Library for Frontend funksjonalitet

Ved behov for testing lokalt:

1. I prosjekt root folder, bruk 'npm install' i terminal
2. Videre: 'npm postinstall'
3. Grunnet at appen blir deployet på heroku må appen bruke secure web-sockets, derfor er linken til websockets i koden wss og ikke ws. Hvis du vil kjøre koden lokalt må dette endres til ws. Eneste stedet dette må endres er på Chat komponenten i fuseLoadandFetch useEffect metoden.
4. 'npm run dev' og appen skal kjøre
