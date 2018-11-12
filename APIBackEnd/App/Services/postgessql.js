
/**
 * Servicio de Postgressql
 * 
 */
const pg = require('pg')

module.exports = {
  postgres : function () {
    return new CrudOperations();
  }
};

class CrudOperations {
  constructor() {

  }
  /**
   * metodo para retornar json con un select a una tabla
   * @param {Select a ser consultado} query 
   */
  async select(query){
    const connectionData = {
      user: 'luisgarcia',
      host: 'localhost',
      database: 'tasking',
      password: '123',
      port: 5432,
    }
    var pool = new pg.Pool(connectionData)

    const findAllQuery = query;
    try {
      let rows = await pool.query(findAllQuery);
      console.log(rows["rows"])
      return rows["rows"]
    } catch(error) {
      return error;
    }
  } 

  async delete(query){
    const connectionData = {
      user: 'luisgarcia',
      host: 'localhost',
      database: 'tasking',
      password: '123',
      port: 5432,
    }
    var pool = new pg.Pool(connectionData)

    const findAllQuery = query;
    try {
      let rows = await pool.query(findAllQuery);
      console.log(rows["rows"])
      return rows["rows"]
    } catch(error) {
      return error;
    }
  } 

  async insert(query){
    const connectionData = {
      user: 'luisgarcia',
      host: 'localhost',
      database: 'tasking',
      password: '123',
      port: 5432,
    }
    var pool = new pg.Pool(connectionData)
    const findAllQuery = query;
    try {
      let rows = await pool.query(findAllQuery);
      console.log(rows["rows"])
      return rows["rows"]
    } catch(error) {
      return error;
    }
  }

  async update(query){
    const connectionData = {
      user: 'luisgarcia',
      host: 'localhost',
      database: 'tasking',
      password: '123',
      port: 5432,
    }
    var pool = new pg.Pool(connectionData)
    const findAllQuery = query;
    try {
      let rows = await pool.query(findAllQuery);
      console.log(rows["rows"])
      return rows["rows"]
    } catch(error) {
      return error;
    }
  }


}
