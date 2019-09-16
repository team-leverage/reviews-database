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
        reviews[row.id] = {
          review_id: row.id,
          rating: row.rating,
          summary: row.summary,
          response: row.response,
          body: row.body, 
          date: row.date,
          reviewer_name: row.reviewer_name,
          helpfulness: row.helpfulness,
          photos: []
        }
      }
      if (row.photo_id) {
        reviews[row.id].photos.push(
          {
            url: row.link,
            id: row.photo_id,
          }
        )
      }
    })
    console.log(Object.keys(reviews).length)
    const output = {
      product: productId,
      page: 0,
      count: Object.keys(reviews).length,
      results: Object.values(reviews)
    }
    response.status(200).json(output)})
}

module.exports = {
  getCharacteristics,
  getReviewList
}