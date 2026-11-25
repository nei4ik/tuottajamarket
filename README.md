# Tuottajamarket

[Suomeksi](#-suomeksi) · [In English](#-in-english)

---

## 🇫🇮 Suomeksi

**Tuottajamarket** on suomalainen lähiruoan verkkokauppasovellus, joka on rakennettu Reactilla (Vite), React Routerilla, Expressillä ja Prisma + PostgreSQL -tietokannalla.

### Ominaisuudet

- **Suosikit ja tuotevalikoima**: Etusivulla on vaakasuuntainen suosikkituotteiden lista (*Suosikit*) sekä responsiivinen ruudukko muille tuotteille (*Muut tuotteet*).
- **Reaaliaikainen haku**: Tuotteiden suodatus nimen, kuvauksen ja kategorian perusteella.
- **Tuotesivu (`/product/:id`)**: Yksittäisen tuotteen tiedot sekä saman kategorian muut tuotteet sivun alaosassa.
- **Ostoskori**: Sivupaneelityylinen ostoskori, jossa on määrän säätö (`-` / `kpl` / `+`), yksittäisen tuotteen poisto, korin tyhjennys ja reaaliaikainen yhteissumma.
- **Pikselikuvitukset**: Tuotteille luodaan automaattisesti terävät 16×16 SVG-pikselikuvat (`ProductPixelArt`) nimen ja kategorian perusteella.
- **Käyttöohjeet (`/ohjeet`) ja 404-sivu**: Selkeä navigointi sivupalkin kautta.

### Teknologiat

| Osa | Teknologia |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 8, Material UI, Oxlint |
| Backend | Node.js, Express 5, CORS, dotenv |
| Tietokanta | PostgreSQL, Prisma 7 (`@prisma/adapter-pg`) |

### Projektin rakenne

```text
tuottajamarket/
├── backend/                # Express API + Prisma 7 + PostgreSQL
│   ├── prisma/             # Tietokantaskeema (schema.prisma)
│   ├── scripts/            # Apuskriptit (db:check, db:studio)
│   ├── db.js               # Prisma Client + PostgreSQL-adapteri
│   ├── server.js           # API-palvelin (/health, /products)
│   └── .env.example        # Ympäristömuuttujien malli
├── tuottajamarket/         # React + Vite -sovellus
│   ├── src/
│   │   ├── components/     # UI-komponentit (Header, Cart, ProductCard, ProductPixelArt...)
│   │   ├── pages/          # Reittisivut (HomePage, ProductPage, InstructionsPage, NotFoundPage)
│   │   ├── providers/      # AppProvider (tuotteet ja ostoskori)
│   │   └── router/         # React Router -asetukset
│   ├── vercel.json         # SPA-uudelleenohjaukset Vercelille
│   └── .env.example        # Frontendin ympäristömuuttujien malli
├── vercel.json             # Juurihakemiston Vercel-asetukset
└── README.md
```

### Paikallinen asennus ja käynnistys

#### 1. Backend (`backend/`)

```bash
cd backend
npm install
cp .env.example .env
```

Aseta `backend/.env`-tiedostoon oma PostgreSQL-yhteysmerkkijono (`DATABASE_URL`), generoi Prisma Client ja käynnistä palvelin:

```bash
npm run db:generate
npm run db:check
npm run dev
```

API käynnistyy osoitteeseen `http://localhost:3000` (`/health`, `/products`).

#### 2. Frontend (`tuottajamarket/`)

```bash
cd tuottajamarket
npm install
cp .env.example .env
npm run dev
```

Sovellus avautuu osoitteessa `http://localhost:5173`.

### Komennot

- **Frontend (`tuottajamarket/`)**: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`
- **Backend (`backend/`)**: `npm run dev`, `npm start`, `npm run db:validate`, `npm run db:generate`, `npm run db:check`, `npm run db:studio`

### Julkaisu Vercelissä

1. Vie repositorio GitHubiin.
2. Luo uusi projekti Vercelissä ja valitse tämä repositorio (juurihakemiston `vercel.json` rakentaa `tuottajamarket/`-kansion automaattisesti, tai voit asettaa **Root Directory** -arvoksi `tuottajamarket`).
3. Lisää Vercelin asetuksiin ympäristömuuttuja:
   - `VITE_API_URL` = julkaistun backend-palvelimesi URL (esim. `https://your-api.onrender.com`).
4. Lisää backend-palvelimesi ympäristömuuttujiin `CORS_ORIGIN` = Vercelin antama osoite (esim. `https://tuottajamarket.vercel.app`).

---

## 🇬🇧 In English

**Tuottajamarket** is a Finnish local-food e-commerce web application built with React (Vite), React Router, Express, and Prisma + PostgreSQL.

### Features

- **Featured & Catalog Sections**: Horizontal scrollable strip for featured items (*Suosikit*) and a responsive product grid for the rest of the catalog (*Muut tuotteet*).
- **Live Search**: Instant filtering by product title, description, or category.
- **Product Detail Page (`/product/:id`)**: Detailed view for each product with a horizontal ribbon of related items from the same category.
- **Interactive Shopping Cart**: Slide-over modal cart with quantity steppers (`-` / `kpl` / `+`), single-item removal, clear-cart action, and live total calculation.
- **Pixel-Art Product Illustrations**: Crisp 16×16 SVG pixel-art sprites (`ProductPixelArt`) automatically matched to each product's title and category.
- **Instructions (`/ohjeet`) & 404 Page**: Accessible navigation via the side drawer.

### Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 8, Material UI, Oxlint |
| Backend | Node.js, Express 5, CORS, dotenv |
| Database | PostgreSQL, Prisma 7 (`@prisma/adapter-pg`) |

### Project Structure

```text
tuottajamarket/
├── backend/                # Express API + Prisma 7 + PostgreSQL
│   ├── prisma/             # Database schema (schema.prisma)
│   ├── scripts/            # Helper scripts (db:check, db:studio)
│   ├── db.js               # Prisma Client + PostgreSQL adapter
│   ├── server.js           # API server (/health, /products)
│   └── .env.example        # Environment variables template
├── tuottajamarket/         # React + Vite application
│   ├── src/
│   │   ├── components/     # UI components (Header, Cart, ProductCard, ProductPixelArt...)
│   │   ├── pages/          # Route pages (HomePage, ProductPage, InstructionsPage, NotFoundPage)
│   │   ├── providers/      # AppProvider (products & cart state)
│   │   └── router/         # React Router configuration
│   ├── vercel.json         # SPA rewrites for Vercel
│   └── .env.example        # Frontend environment variables template
├── vercel.json             # Root Vercel configuration
└── README.md
```

### Local Setup

#### 1. Backend (`backend/`)

```bash
cd backend
npm install
cp .env.example .env
```

Update `backend/.env` with your PostgreSQL `DATABASE_URL`, generate the Prisma client, and start the API:

```bash
npm run db:generate
npm run db:check
npm run dev
```

The API runs on `http://localhost:3000` (`/health`, `/products`).

#### 2. Frontend (`tuottajamarket/`)

```bash
cd tuottajamarket
npm install
cp .env.example .env
npm run dev
```

The app runs on `http://localhost:5173`.

### Available Scripts

- **Frontend (`tuottajamarket/`)**: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`
- **Backend (`backend/`)**: `npm run dev`, `npm start`, `npm run db:validate`, `npm run db:generate`, `npm run db:check`, `npm run db:studio`

### Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in **Vercel** (the root `vercel.json` automatically builds `tuottajamarket/`, or you can set **Root Directory** to `tuottajamarket`).
3. Configure the environment variable in Vercel:
   - `VITE_API_URL` = your deployed backend URL (e.g. `https://your-api.onrender.com`).
4. Set `CORS_ORIGIN` on your backend host to your Vercel deployment URL (e.g. `https://tuottajamarket.vercel.app`).
