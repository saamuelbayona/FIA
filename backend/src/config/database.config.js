/**
 * Configuración de Base de Datos
 * Railway: usa MYSQL_URL (recomendado) o variables MYSQL*
 * Local: usa DB_* o fallback localhost
 * @module config/database
 */

// Railway inyecta MYSQL_URL o MYSQL_PUBLIC_URL - conectar por URL tiene prioridad
const mysqlUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

if (mysqlUrl) {
  console.log('🔗 Usando MYSQL_URL para conectar a Railway');
  module.exports = {
    uri: mysqlUrl,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4'
  };
} else if (process.env.MYSQLHOST || process.env.DB_HOST) {
  // Usar variables individuales si existen
  console.log('🔗 Usando variables individuales para conectar');
  module.exports = {
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    port: parseInt(process.env.MYSQLPORT || process.env.DB_PORT || '3306', 10),
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4'
  };
} else {
  // Fallback a localhost (solo para desarrollo local sin .env)
  console.warn('⚠️  ADVERTENCIA: Variables de base de datos no configuradas. Crea un archivo .env basado en .env.example');
  module.exports = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data_dashboard',
    port: 3306,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    charset: 'utf8mb4'
  };
}
