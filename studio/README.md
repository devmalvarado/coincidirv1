# Sanity Studio — Coincidir (paso 1)

Este paquete es el **CMS**: aquí editas contenido y se guarda en el proyecto de Sanity en la nube.

## 1. Cuenta y proyecto en Sanity

1. Entra en [sanity.io](https://www.sanity.io) y crea una cuenta (o inicia sesión).
2. En [sanity.io/manage](https://www.sanity.io/manage), **Create project**.
3. Nombre sugerido: `coincidir` (o el que prefieras).
4. Plan **Free** está bien para empezar.
5. Dataset: deja **`production`** (es el que usa este repo por defecto).

## 2. Project ID en tu máquina

1. En Manage: tu proyecto → **Settings** (engranaje) → **API** → copia **Project ID**.
2. En esta carpeta (`studio/`):

   ```bash
   cp .env.example .env
   ```

3. Edita `studio/.env` y pega el ID:

   ```env
   SANITY_STUDIO_PROJECT_ID=abcd1234
   SANITY_STUDIO_DATASET=production
   ```

   No subas `.env` a Git (ya está ignorado en la raíz del monorepo).

## 3. Login del CLI (una vez por ordenador)

**Importante:** `npm create sanity@latest` en modo automático (`-y`) **solo funciona si ya hiciste login** en este equipo. Si ves *Must be logged in to run this command in unattended mode*, ejecuta antes el login.

Desde la **raíz del monorepo**:

```bash
npm run login:studio
```

O desde `studio/`:

```bash
npx sanity login
```

Elige el proveedor (Google/GitHub/etc.) y autoriza. Así `sanity dev` y `sanity deploy` pueden actuar en tu cuenta.

### Regenerar el Studio con la plantilla `clean` (opcional)

Si quieres el scaffold oficial enlazado a un proyecto ya existente (equivalente a tu comando, pero adaptado al monorepo), **después del login** y desde la **raíz del repo**:

```bash
# Sustituye TU_PROJECT_ID por el ID de sanity.io/manage → tu proyecto → API
npm create sanity@latest -- -y --project TU_PROJECT_ID --dataset production --template clean --output-path studio --overwrite-files --package-manager npm --env .env
```

- **`--overwrite-files`** sustituye lo que haya en `studio/` por la plantilla. Haz **copia de seguridad** si ya tienes esquemas o README que quieras conservar.
- Versión interactiva (sin `-y`), similar a la tuya:

  ```bash
  npm create sanity@latest -- --project TU_PROJECT_ID --dataset production --template clean
  ```

  Cuando pregunte la carpeta, indica `studio` (o mueve el resultado después).

Si creaste `studio/.env` con tu **Project ID** y el dataset `production`, con eso basta para `npm run dev:studio` **sin** volver a ejecutar `create-sanity`, salvo que quieras resetear a la plantilla oficial.

## 4. Arrancar el Studio en local

Desde la raíz del monorepo:

```bash
npm run dev:studio
```

Se abre en **http://localhost:3333** (o el puerto que indique la terminal). Deberías ver el documento de ejemplo **Landing** en el desk.

## 5. Studio en la nube (opcional, recomendado para editores)

Cuando quieras una URL estable tipo `https://coincidir.sanity.studio`:

```bash
cd studio
npx sanity deploy
```

Sigue el asistente (hostname único). Los mismos `SANITY_STUDIO_PROJECT_ID` / dataset de tu `.env` apuntan a ese contenido; solo cambia **dónde** se sirve la interfaz del editor.

## Problemas frecuentes

| Síntoma | Qué hacer |
|--------|-----------|
| Error sobre `SANITY_STUDIO_PROJECT_ID` | Crea `studio/.env` desde `.env.example` y pega el Project ID. |
| No puedo publicar / “unauthorized” | Ejecuta `npm run login:studio` de nuevo. |
| El dataset no existe | En Manage → Datasets, crea `production` o cambia `SANITY_STUDIO_DATASET` en `.env` al nombre exacto. |

## Siguiente paso (paso 2 del plan)

Cuando el Studio abra bien en local, seguimos con **esquemas** alineados al mockup (hero, pilares, proyectos, insights) y luego conectar **Astro** con las mismas variables (`web/.env` con `PUBLIC_SANITY_*`).
