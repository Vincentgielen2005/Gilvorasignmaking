# Gilvora Signmaking — website

Statische website (puur HTML/CSS/JS, geen build-stap nodig) voor gilvorasignmaking.be.

## Structuur

```
index.html                     Homepage
diensten.html                  Overzicht van alle diensten
diensten/striping.html         Dienstpagina
diensten/belettering.html      Dienstpagina
diensten/carwrap.html          Dienstpagina
diensten/gevelreclame.html     Dienstpagina
diensten/chrome-delete.html    Dienstpagina
diensten/commerciele-wrap.html Dienstpagina
contact.html                   Contactpagina
404.html                       Foutpagina bij niet-bestaande links
assets/css/style.css           Alle styling (huisstijlkleuren, animaties)
assets/js/main.js              Menu, scroll-animaties, contactformulier
assets/img/favicon.svg         Favicon (G-logo)
robots.txt / sitemap.xml       Voor zoekmachines
```

Er is geen server, database of build-tool nodig — het zijn gewoon bestanden die
door elke webserver direct kunnen worden geserveerd.

## Lokaal bekijken

```bash
python3 -m http.server 8000
```
en open `http://localhost:8000` in de browser.

## Live zetten op gilvorasignmaking.be

Kies een van deze opties:

1. **Hosting via je domeinregistrar / een hostingpakket (cPanel, Combell, ...)**
   Upload alle bestanden en mappen via FTP/bestandsbeheer naar de rootmap van
   je hosting (meestal `public_html` of `www`). Zorg dat `index.html` in de
   root staat.

2. **Gratis/eenvoudige static hosting (Netlify, Vercel, GitHub Pages, ...)**
   Koppel deze repository aan de hostingdienst naar keuze en stel
   `gilvorasignmaking.be` in als custom domain. Volg daarna de DNS-instructies
   van die dienst (meestal een CNAME- of A-record bij je domeinregistrar).

In beide gevallen moet je bij je domeinregistrar (waar je gilvorasignmaking.be
hebt geregistreerd) de DNS laten wijzen naar de hostingpartij die je kiest.

## Later aan te vullen

- **E-mailadres**: er is momenteel geen bedrijfsmailbox. Het contactformulier
  stuurt daarom door naar WhatsApp (+32 485 48 22 07). Zodra er een e-mailadres
  is (bv. `info@gilvorasignmaking.be`), kan dat overal op de site toegevoegd
  worden en kan het formulier eventueel ook via e-mail versturen.
- **Logo**: de site gebruikt een eenvoudige "G"-badge in de huisstijlkleuren
  als vervanger, omdat het originele logobestand niet beschikbaar was tijdens
  het bouwen. Vervang `assets/img/favicon.svg` en de `.logo-badge` in de
  HTML/CSS door het echte logo zodra dat bestand er is.
- **Foto's**: de dienstenpagina's gebruiken decoratieve grafische panelen in
  plaats van echte projectfoto's (die waren nog niet beschikbaar). Deze kunnen
  per pagina vervangen worden door echte foto's van afgewerkt werk.
