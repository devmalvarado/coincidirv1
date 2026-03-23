# Coincidir — Landing (Astro + Sanity)

Monorepo con dos paquetes:

| Carpeta   | Rol |
|-----------|-----|
| `web/`    | Landing en **Astro** (sitio estático → **Cloudflare Pages** gratis) |
| `studio/` | **Sanity Studio** para editar contenido (puedes usar [sanity.io/manage](https://www.sanity.io/manage) o desplegar el studio aparte) |

## Desarrollo local

```bash
npm install
# Antes: studio/.env con SANITY_STUDIO_PROJECT_ID (ver studio/README.md)
npm run login:studio   # una vez: autenticación Sanity CLI
npm run dev:studio     # http://localhost:3333
npm run dev:web        # http://localhost:4321
```

### Tema claro / oscuro

- Por defecto sigue **`prefers-color-scheme`** del sistema.
- El usuario puede fijar **claro**, **oscuro** o volver a **automático** (iconos monitor / sol / luna en el header y en el splash).
- La preferencia se guarda en **`localStorage`** bajo la clave `coincidir-theme` (`light`, `dark`, o ausente = sistema).

### Idiomas (home)

- **Español (por defecto):** `/home` — textos en `web/src/i18n/landing.es.json`
- **Inglés:** `/en/home` — `web/src/i18n/landing.en.json`

Las rutas antiguas **`/landing`** y **`/en/landing`** redirigen con **301** a `/home` y `/en/home`.

El header incluye enlaces **ES** / **EN** que cambian de ruta (sitio estático, sin JavaScript obligatorio). La estructura tipada está en `web/src/i18n/types.ts`.

En Studio hay documentos **Landing** y **Artículo (Blog)**. Los del blog se listan en `/home#blog` y `/en/home#blog` con enlaces a `/blog/[slug]` y `/en/blog/[slug]`.

### Paso 1 — Sanity Studio operativo

Configuración detallada (crear proyecto en sanity.io, `.env`, login, `sanity deploy`): **[studio/README.md](./studio/README.md)**.

## Lottie (`.lottie`)

Coloca archivos **dotLottie** en `web/public/lottie/` (por ejemplo `hero.lottie`). En el navegador la URL será `/lottie/hero.lottie`. No uses espacios en el nombre del archivo.

El componente `web/src/components/HeroLottie.astro` usa `@lottiefiles/dotlottie-web` y acepta la prop `src` si cambias de ruta o nombre.

## Variables de entorno (`web/.env`)

Copia `web/.env.example` a `web/.env` y rellena el proyecto y dataset de Sanity.

## Cloudflare Pages (GitHub)

1. Conecta el repo en Cloudflare Pages.
2. **Root directory:** `web`
3. **Build command:** `npm install && npm run build`
4. **Build output directory:** `dist`
5. Añade las variables de entorno públicas de Sanity en el panel de Cloudflare (mismas que en `.env`).

> Si Cloudflare no detecta workspaces, usa **Root directory** vacío (raíz del repo) y como comando de build: `npm install && npm run build:web`, y como directorio de salida: `web/dist`.

## Sanity

El **Project ID** y el **dataset** van en `studio/.env` (Studio) y en `web/.env` con prefijo `PUBLIC_` (Astro). No hace falta editar `sanity.config.ts` a mano si usas las variables de entorno.
