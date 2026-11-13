# Plan Nutricional

Aplicación web de demostración para consultar datos personales de ejemplo, un plan de alimentación y una rutina de actividad física. Construida con Next.js App Router, React, Tailwind CSS y MySQL.

## Requisitos

- Node.js compatible con Next.js 16.
- npm.
- Una base de datos MySQL con las tablas `datos_personales`, `salud_objetivos` y `rutina_disponibilidad`.

## Instalación local

Desde esta carpeta (`plan-nutricional`):

```bash
npm ci
```

Crea un archivo `.env.local` con los datos de conexión:

```env
DB_HOST=tu-servidor-mysql
DB_PORT=3306
DB_USER=tu-usuario
DB_PASSWORD=tu-contraseña
DB_NAME=tu-base-de-datos
# Opcional: certificado CA PEM del proveedor MySQL
# DB_SSL_CA="-----BEGIN CERTIFICATE-----..."
```

Inicia el servidor:

```bash
npm run dev
```

Abre http://localhost:3000.

## Comprobaciones

```bash
npm run lint
npm run build
npm run start
```

La página consulta `GET /api/plan`. El endpoint usa el registro con `dp.id = 1`; modifica ese identificador en `pages/api/plan.js` si tu conjunto de datos de demostración utiliza otro.

## Despliegue en Vercel

1. Importa el repositorio de GitHub en Vercel.
2. Configura **Root Directory** como `plan-nutricional`.
3. Configura las variables `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` en los entornos que utilizarás.
4. Si tu proveedor MySQL entrega un certificado CA, configura también `DB_SSL_CA`.
5. Ejecuta el despliegue y revisa los registros de funciones si la API devuelve un error.

## Estructura relevante

- `app/page.tsx`: interfaz principal (Client Component).
- `app/layout.tsx`: layout y metadatos.
- `pages/api/plan.js`: API de consulta MySQL. Se conserva el Pages Router únicamente para esta ruta API.
- `lib/db.js`: pool de conexiones MySQL.

La página principal vive exclusivamente en App Router. No debe volver a crearse `pages/index.js`, porque duplicaría la ruta `/`.
