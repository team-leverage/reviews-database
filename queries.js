const Pool = require('pg').Pool
const pool = new Pool({
    database: 'postgres',
    user: 'stephen',
    database: 'reviews',
    port: 5432,
  })

const getCharacteristics = (request, response) => {
  pool.query('SELECT * FROM characteristics', (error, results) => {
    if (error) {
      throw error
    }
    console.log('heyo!')
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getCharacteristics
}