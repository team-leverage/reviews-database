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
    response.status(200).json(results.rows)
  })
}

const getReviewList = (request, response) => {
  const productId = request.params.productId
  pool.query(`SELECT * FROM reviews LEFT JOIN photos ON photos.review_id = reviews.id WHERE reviews.product_id = ${productId}`, (error, results) => {
    if (error) {
      throw error
    }
    const reviews = {}
    results.rows.forEach(row => {
      if (!reviews[row.id]) {
        reviews[row.id] = row
      }
    })
    console.log(reviews)
    response.status(200).json(results.rows)})
}

module.exports = {
  getCharacteristics,
  getReviewList
}