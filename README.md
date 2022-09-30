# Dokumentasjon

## Komponentstruktur

Bruker hovedsaklig funksjonelle komponenter. Disse komponentene har ikke som hensikt å lagre informasjon i en state, men heller tar inn data og vise det til brukeren.

Vi har imidlertid valgt å gjøre loginForm som en class. Dette er på bakgrunn av at en class er en "statefull-component". I loginform må vi lagre informasjon om hva brukeren har skrevet i input-feltene og sende denne informasjonen videre. Bruken av class er derfor hensiktsmessig. 

## Context API'et

## AJAX

## HTML Web Storage

I prosjektet brukes localstorage for å lage prosjekt-ID og token. Dette gir oss muligheten til å lagre prosjekt informasjonen. Hver gang brukeren logger inn lagres prosjekt-ID og token i localStorage. Videre kan vi da hente ut innlogget bruker ved å kalle localStorage.getItem() og logge inn denne brukeren automatisk. På denne måten slipper innlogget bruker å logge seg inn hver gang en vil aksessere siden. 

Sessionstorage er tatt i bruk for å lagre filtervalg. Hver gang brukeren oppdaterer fitlervalgene vil informasjonen lagres i session storage. Deretter benyttes sessionStorage.getItem() for å hente ut tidligere filtervalg, dersom brukeren oppdaterer siden. 

## Responsiv Web Design

Et av kravene i oppgaven var at nettsiden skal være tilpasset mobil, pad og pc. For å oppfølge dette kravet har vi tatt i bruk media queries og viewport for å tilpasse designet de ulike skjermstørrelsene. 

For pc og pad har vi en header sammensatt av en overskrift og logg ut knapp, en sidebar bestående av ulike filtervalg og hovedsiden som brukes for å vise grafene. Sidebaren har en minimums bredde noe som gjør at kun størrelsen på hovedsiden endrer seg når vinduet blir større/mindre. 

For å at designet skal fungere på mobil har vi benyttet media queries for å endre den overordnede strukturen på nettsiden når vinduet blir lite. Da vil sidebaren bli byttet ut med en filter knapp liggede mellom headeren og hovedsiden. Dersom en trykker på denne knappen vil filtervalgene fremvises til bruker og ta opp hele skjermen (header vises fortsatt).

Disse løsningene gjør at designet blir interaktivt og responsivt.

## Testing



## Bruk av Git

Vi har valgt å bruke Git i henhold til anbefalingen fra fagstabben. Vi definerer et issue som beskriver en oppgave vi ønsker å løse. Videre lager vi en branch en eller flere branches med hensikt å løse problemet issuen fremsetter. På denne måten kan flere medlemmer av gruppen jobbe med samme problem samtidig. 

Videre har vi et format på hvordan gruppen utfører en merge request. Før koden merges inn i main skal et annet gruppemedlem gjennomgå koden og kommentere dersom det forekommer feil. Dette gjør at feilaktig kode i større grad fikses før den blir merget inn i main. Da slipper en at det oppstår problemer senere som ofte er vanskelig å lokalisere og løse. 