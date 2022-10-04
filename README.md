# Dokumentasjon

## Kjøring og bygging av applikasjonen

- For å kjøre lokalt bruk `npm i` til å installere nødvendige biblioteker og `npm start` for å kjøre applikasjonen.
- For å bygge bruk `npm run build`

## Komponentstruktur

Vi har benyttet hovedsaklig funksjonelle komponenter. Disse komponentene er enklere å lese og krever mindre "boilerplate" sammenlignet med klasser. I tillegg har de noe bedre ytelse. 

AuthenticationFrom-komponenten er derimot laget som en class. Her lagrer informasjon om hva brukeren har skrevet i input-feltene og sende denne informasjonen videre. 

## Context API'et

Vi har benyttet Context API'et for å sende filtreringsinformasjon mellom komponentene. Dette gjør det enklere å hente og oppdatere informasjon selv dypt nede i komponenthierarkiet. Vi sender både filtreringinformasjon og en
funksjon til å oppdatere denne dataen ned til komponentene. Filtreringsinformasjonen blir brukt av alle graf 
komponentene, samt sidebar-komponenten.

## AJAX

Vi har valgt å bruke tredjepartsbiblioteket axios for å laste data fra GitLab. Flere på gruppa hadde erfaring med axios fra før og vi valgte derfor denne løsningen. Axios er kompatible i mange weblesere og har god bakoverkompatibilitet med eldre nettlesere. Vi kunne ha brukt andre løsninger, som for eksempel fetch() API'et. Funksjonene som henter data fra GitLab ligger i gitlabService.ts. Den bruker alltid *https://gitlab.stud.idi.ntnu.no/api/v4/projects/* som URL før den legger til prosjekt ID og andre valg avhengig av funksjonen for å aksessere riktig endepunkt. Det vil si at applikasjonen per nå kun fungerer på repoer som ligger på NTNU sitt domene.

## HTML Web Storage

I prosjektet brukes localstorage for å lagre prosjekt-ID. Videre kan vi da hente ut informasjonen ved å kalle localStorage.getItem() og logge inn denne brukeren automatisk. På denne måten slipper innlogget bruker å logge seg inn hver gang en vil aksessere siden.

Sessionstorage er tatt i bruk for å lagre filtervalg. Hver gang brukeren oppdaterer filtervalgene vil informasjonen lagres i session storage med sessionStorage.setItem(). Deretter benyttes sessionStorage.getItem() for å hente ut tidligere filtervalg, dersom brukeren oppdaterer siden. Data lagret i sessionstorage vil bli slettet når brukeren lukker nettleseren.

## Responsiv Web Design

Et av kravene i oppgaven var at nettsiden skal være tilpasset mobil, pad og pc. For å oppfølge dette kravet har vi tatt i bruk media queries og viewport for å tilpasse designet de ulike skjermstørrelsene.

For pc og pad har vi en header sammensatt av en overskrift og logg ut knapp, en sidebar bestående av ulike filtervalg og hovedsiden som brukes for å vise grafene. Sidebaren har en minimums bredde noe som gjør at kun størrelsen på hovedsiden endrer seg når vinduet blir større/mindre.

For at designet skal fungere på mobil, har vi benyttet media queries til å endre den overordnede strukturen på nettsiden når vindustørrelsen minker. Sidebaren vil da bli byttet ut med en filter knapp liggede mellom headeren og hovedsiden. Dersom en trykker på denne knappen vil filtervalgene fremvises til bruker og ta opp hele skjermen (header vises fortsatt). Teksten i header blir også mindre når skjermen blir mindre for å unngå overflyt av teksten.

Grafene er laget med biblioteket [recharts](https://recharts.org/). Grafene i seg selv tegnes automatisk og er responsiv, men containeren rundt har i utgangspunktet fast høyde og bredde. Derimot har recharts en `<ReponsiveContainer>` som gjør at man kan sette bredden til å ta opp hele containeren den er i.

Disse løsningene gjør at designet blir interaktivt og responsivt.

## Testing

### Komponent og snapshot-testing

Snapshot-testen tar en snapshot av applikasjonen ved oppstart. Deretter sammenlignes snapshotet med en tidligere snapshot lagret i _snapshots_ mappen. Poenget med testen er ikke å passe på at komponentene oppfører seg som de skal, men å passe på at alle elementer i komponenttreet er plassert som de skal, og ved endringer vil testen feile.

Vi har valgt å skrive komponent-tester for App-komponenten som kaller AuthenticationPage-komponenten ved oppstart. Testene mocker localstorage da Node som brukes til kjøring av tester ikke har en implementasjon for dette. Videre sjekkes det at innloggingssiden fungerer som den skal ved å sjekke at brukeren blir tatt videre ved inntasting, og det testes at brukeren kommer rett inn til grafene ved neste besøk.

Testene kjøres med `npm test`

### Testing av brukergrensesnitt og responsivt design

Applikasjonen har blitt testet på en iPhone XS med en oppløsning på 2436x1125 i vertikal og horisontal(landskap) vinkling. Applikasjonen kjører som den skal og tilpasser seg skjermstørelsen, hvor sideelementene endrer seg avhengig av om den brukes i horisontal eller vertikal modus. I horisontal modus vil det dukke opp noen små hvite rammer på hver side av applikasjonen som er ca like store som "busslommen" på toppen av mobilen. Den fungerer derimot som den skal og ser fremdeles bra ut. I horisontal modus er vil filteropsjonene vises på siden akkurat som på større skjermer. I vertikal modus forsvinner filtermenyen og den blir erstattet av filterknappen. Dette er forventet oppførsel.

Applikasjonen har blitt testet på en MacBook Pro 13 tommer i Safari og Google Chrome. Applikasjonens oppførsel er som forventet i begge i nettlesere og den oppfører seg som den skal. I Google Chrome har den også blitt testet ved å velge oppløsningen til ulike enheter som for eksempel iPhone SE. Den er ikke simulert på telefoner med lavere oppløsning (mindre skjermstørrelse) enn iPhone SE, men denne telefonen er en av de mindre på markedet og har samme skjermstørrelse som iPhoner helt tilbake til 2014.

Applikasjonen har blitt testet på den samme MacBooken koblet til en 34 tommer 3440x1440 skjerm. Denne skjermen er veldig bred, og det var interessant å se hvordan applikasjonen tilpasset seg. Grafene skalerer ut som de skal og oppførselen til applikasjonen er som forventet.

Applikasjonen har også blitt testet på en iPad air 3 generasjon, hvor den oppførte seg som på en datamaskin. Skjermen er stor nok til at det var lett å interagere med sideelementene på denne skjermstørrelsen. Applikasjonen oppførte seg som den skulle og skalerte på en fornuftig måte.

## Bruk av Git

Vi har valgt å bruke Git i henhold til anbefalingen fra fagstabben. Vi definerer et issue som beskriver en oppgave vi ønsker å løse. Videre lager vi en branch en eller flere branches med hensikt å løse problemet issuen fremsetter. På denne måten kan flere medlemmer av gruppen jobbe med samme problem samtidig.

Videre har vi et format på hvordan gruppen utfører en merge request. Før koden merges inn i main skal et annet gruppemedlem gjennomgå koden og kommentere dersom det forekommer feil (code review). Dette gjør at feilaktig kode i større grad fikses før den blir merget inn i main. Da slipper en at det oppstår problemer senere som ofte er vanskelig å lokalisere og løse.
