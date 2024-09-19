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
