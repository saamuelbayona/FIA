/**
 * Configuración del Servidor
 * @module config/server
 */

module.exports = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  // CORS: Railway debe inyectar CORS_ORIGIN con el dominio del frontend
  corsOrigin: process.env.CORS_ORIGIN || 'https://fiapollofiesta.up.railway.app',
  jwtSecret: process.env.JWT_SECRET || 'fia-dashboard-secret-2025',
  jwtExpiration: process.env.JWT_EXPIRATION || '24h'
};
