NHL CENTER - PUHDAS JULKAISUPAKETTI

Tämä on uusi, erillinen Vercel-projekti. Se sisältää:
- index.html: sivuston käyttöliittymä
- api/nhl.js: Vercelin palvelinpuolen NHL-välityspalvelu
- package.json ja vercel.json: projektin asetukset

Julkaisu:
1. Luo GitHubissa uusi tyhjä repository nimellä nhl-center-clean.
2. Pura ZIP omalla koneella.
3. Lataa KAIKKI paketin sisältö GitHub-repositorion juureen (älä lataa ylimääräistä nhl-center-clean-kansiota sen sisälle).
4. Vercelissä valitse Add New > Project ja tuo nhl-center-clean-repository.
5. Framework Preset: Other. Build Command ja Output Directory jätetään tyhjiksi/oletuksiksi.
6. Deploy.

Testaa julkaisun jälkeen: https://OMA-OSOITE.vercel.app/api/nhl?type=score
Jos saat JSON-vastauksen, API-reitti toimii. Jos saat virheen, avaa Vercelin Functions/Logs ja tarkista virhe.

Huomio: ulkoiset NHL- ja RSS-palvelut voivat muuttaa rajapintojaan tai rajoittaa pyyntöjä. Pakettia ei ole voitu testata käyttäjän omassa Vercel-tilissä.
