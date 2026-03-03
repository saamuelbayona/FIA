/**
 * Conexión a Base de Datos MariaDB
 * Infrastructure Layer
 */

const mysql = require('mysql2/promise');
const dbConfig = require('../../config/database.config');

class DatabaseConnection {
  constructor() {
    this.pool = null;
  }

  /**
   * Crear pool de conexiones
   */
  async connect() {
    try {
      this.pool = mysql.createPool(dbConfig);
      
      // Verificar conexión
      const connection = await this.pool.getConnection();
      console.log('✅ Conectado a MariaDB - Base de datos:', dbConfig.database);
      connection.release();
      
      return this.pool;
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error.message);
      throw error;
    }
  }

  /**
   * Ejecutar query
   */
  async query(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('❌ Error en query:', error.message);
      throw error;
    }
  }

  /**
   * Ejecutar query que retorna un solo registro
   */
  async queryOne(sql, params = []) {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows[0] || null;
    } catch (error) {
      console.error('❌ Error en queryOne:', error.message);
      throw error;
    }
  }

  /**
   * Cerrar pool de conexiones
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('✅ Conexión a la base de datos cerrada');
    }
  }

  /**
   * Obtener pool
   */
  getPool() {
    return this.pool;
  }
}

// Singleton
let instance = null;

module.exports = {
  getInstance: () => {
    if (!instance) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
};
