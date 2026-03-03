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
- En tu proyecto, haz clic en **+ New** → **Database** → **MySQL**.
- Railway creará una instancia y añadirá las variables de conexión automáticamente.

## 5. Generar dominio

En **Settings** → **Networking** → **Generate Domain** para obtener la URL pública de tu app.

## 6. Usuarios de prueba

- **admin** / admin123  
- **analista** / analista123  
- **viewer** / viewer123  

(Asegúrate de tener estos usuarios y contraseñas en tu base de datos.)
