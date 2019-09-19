const Pool = require('pg-pool');

const pool = new Pool({
  user: 'stephen',
  database: 'reviews',
  port: 5432,
});

const getReviewList = (productId) => pool.query(`SELECT
    * FROM reviews 
    LEFT JOIN photos 
    ON photos.review_id = reviews.id 
    WHERE reviews.product_id = ${productId}`);

const getMetaData = (productId) => pool.query(`SELECT
    reviews.recommend,
    reviews.rating,
    characteristics_reviews.id, 
    characteristics_reviews.review_id, 
    characteristics_reviews.characteristic_rating,
    characteristics.characteristic 
    FROM characteristics_reviews
    LEFT JOIN reviews ON reviews.id = characteristics_reviews.review_id 
    LEFT JOIN characteristics ON characteristics_reviews.characteristic_id = characteristics.id 
    WHERE reviews.product_id = ${productId}`);

const markAsHelpful = (reviewId) => pool.query(`UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE reviews.id = ${reviewId}`);


const markAsReported = (reviewId) => pool.query(`UPDATE reviews
    SET reported = true
    WHERE reviews.id = ${reviewId}`);

const postReview = (product_id) => {
  const date = new Date().toString();
  let reviewId;
  pool.query(`INSERT INTO reviews
    (id, product_id, rating, date_submitted, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) 
    VALUES 
    (default, ${product_id}, ${req.body.rating}, '${date}', '${req.body.summary}', '${req.body.body}', '${req.body.recommend}', false, '${req.body.name}', '${req.body.email}', null, 0)
    RETURNING id;`)
    .then((returned) => {
      const { id } = returned.rows[0];
      reviewId = id;
      Object.entries(JSON.parse(req.body.characteristics)).forEach((entry) => {
        pool.query(`INSERT INTO characteristics_reviews
          (id, review_id, characteristic_id, characteristic_rating)
          VALUES
          (default, ${id}, ${entry[0]}, ${entry[1]})`);
      });
    })
    .then(() => {
      JSON.parse(req.body.photos).forEach((url) => {
        pool.query(`INSERT INTO photos 
          (photo_id, review_id, link)
          VALUES 
          (default, ${reviewId}, '${url}')`);
      });
    });
};

module.exports = {
  getReviewList,
  getMetaData,
  markAsHelpful,
  markAsReported,
  postReview,
};
