# Despliegue en Railway

## 1. Instalar Git (si no lo tienes)

Descarga e instala Git desde: https://git-scm.com/download/win

Después de instalar, reinicia la terminal.

## 2. Subir el proyecto a GitHub

Abre una terminal en la carpeta del proyecto y ejecuta:

```powershell
# Ir a la carpeta del proyecto
cd "c:\Users\Samuel\OneDrive\Desktop\FIA"

# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - FIA Pollo Fiesta"

# Crear repositorio en GitHub:
# 1. Ve a https://github.com/new
# 2. Crea un repo (ej: "fia-pollo-fiesta")
# 3. NO marques "Initialize with README"
# 4. Copia la URL del repo

# Conectar y subir (reemplaza TU-USUARIO y TU-REPO con tus datos)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git branch -M main
git push -u origin main
```

## 3. Desplegar en Railway

1. Ve a https://railway.app y crea una cuenta (puedes usar GitHub).
2. **New Project** → **Deploy from GitHub repo**.
3. Selecciona tu repositorio.
4. Railway detectará automáticamente el proyecto Node.js.

## 4. Variables de entorno en Railway

En tu proyecto de Railway, ve a **Variables** y agrega:

| Variable      | Descripción                     | Ejemplo                    |
|---------------|---------------------------------|----------------------------|
| `PORT`        | Lo asigna Railway automáticamente | -                        |
| `DB_HOST`     | Host de MySQL/MariaDB           | `monorail.proxy.rlwy.net` |
| `DB_USER`     | Usuario de base de datos        | `root`                    |
| `DB_PASSWORD` | Contraseña de base de datos     | `***`                     |
| `DB_NAME`     | Nombre de la base de datos      | `railway`                 |
| `DB_PORT`     | Puerto de MySQL                 | `12345`                   |
| `JWT_SECRET`  | Clave secreta para JWT          | (genera una aleatoria)    |

**Base de datos en Railway:**
1. En tu proyecto, haz clic en **+ New** → **Database** → **MySQL**.
2. **Importante:** En tu **servicio de la app** (el que despliega el código), ve a **Variables** → **Add Reference** (o "+" para nueva variable).
3. Selecciona el **servicio MySQL** como referencia — así se inyectarán `MYSQL_URL`, `MYSQLHOST`, etc. automáticamente.
4. Sin esta referencia, la app intentará conectar a localhost y fallará.

## 5. Importar la base de datos a Railway

### Si tienes la base de datos local (data_dashboard)

1. **Exporta tu base de datos local:**
   ```powershell
   cd backend
   npm run export-db
   ```
   Esto crea `backend/database_export.sql` con todas las tablas y datos.

2. **Importa en Railway** con MySQL Workbench, DBeaver o similar:
   - Conecta al MySQL de Railway (Variables → host, puerto, usuario, contraseña).
   - Ejecuta el archivo `backend/database_export.sql`.

### Si NO tienes datos locales

Ejecuta `backend/src/infrastructure/database/schema_cpanel.sql` en Railway (crea tablas vacías + usuarios de prueba).

### Usuarios de prueba (incluidos en ambos)

- **admin** / admin123
- **analista** / analista123
- **viewer** / viewer123

## 6. Generar dominio

En **Settings** → **Networking** → **Generate Domain** para obtener la URL pública de tu app.

## 7. Usuarios de prueba

- **admin** / admin123  
- **analista** / analista123  
- **viewer** / viewer123  

(Asegúrate de tener estos usuarios y contraseñas en tu base de datos.)
