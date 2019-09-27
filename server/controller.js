/* eslint-disable camelcase */
const redis = require('redis');
const db = require('./model');

// create and connect redis client to local instance.
const client = redis.createClient(6379);

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

// Function to return reviews to the server
const getReviewsForProduct = (request, response) => {
  // Get productId from the request and set the redis key for the function
  const { productId } = request.params;

  // No cache, so ask model to query database for that productId
  return db.getReviewList(productId)
    .then((results) => {
      // Format the result
      const reviews = {};
      results.rows.forEach((row) => {
        if (!reviews[row.id]) {
          reviews[row.id] = {
            review_id: row.id,
            rating: row.rating,
            summary: row.summary,
            response: row.response,
            body: row.body,
            date: row.date_submitted,
            reviewer_name: row.reviewer_name,
            helpfulness: row.helpfulness,
            photos: [],
          };
        }
        if (row.photo_id) {
          reviews[row.id].photos.push(
            {
              url: row.link,
              id: row.photo_id,
            },
          );
        }
        // Trim the photos down to only 5 (because I forgot to do this in the front-end)
        reviews[row.id].photos = reviews[row.id].photos.slice(0, 5);
      });
      const output = {
        product: productId,
        page: 0,
        count: Object.keys(reviews).length,
        results: Object.values(reviews),
      };
        // Set the redis list key equal to output and save in the redis db
      // Return the response to the server
      response.status(200).json(output);
    });
};

const getMetaData = (request, response) => {
  const { productId } = request.params;

  return db.getMetaData(productId)
    .then((results) => {
      const metaData = {
        productId,
        ratings: {},
        recommended: {
          0: 0,
          1: 0,
        },
        characteristics: {},
      };
      results.rows.forEach((row) => {
        if (!metaData.ratings[row.rating]) {
          metaData.ratings[row.rating] = 1;
        } else {
          metaData.ratings[row.rating] += 1;
        }
        if (row.recommend) { metaData.recommended[0] += 1; }
        if (!row.recommend) { metaData.recommended[1] += 1; }
        if (!metaData.characteristics[row.characteristic]) {
          metaData.characteristics[row.characteristic] = {
            id: row.id,
            value: row.characteristic_rating,
            ratingCount: 1,
          };
        } else {
          metaData.characteristics[row.characteristic].ratingCount += 1;
          metaData.characteristics[row.characteristic].value = Math.floor(
            (metaData.characteristics[row.characteristic].value + row.characteristic_rating)
                      / metaData.characteristics[row.characteristic].ratingCount,
          );
        }
      });
      response.status(202).json(metaData);
    });
};

const markAsHelpful = (request, response) => {
  const { review_id } = request.params;
  return db.markAsHelpful(review_id)
    .then(() => response.sendStatus(201));
};

const markAsReported = (request, response) => {
  const { review_id } = request.params;
  return db.markAsReported(review_id)
    .then(() => response.sendStatus(201));
};

const postReview = (request, response) => {
  const { product_id } = request.params;
  return db.postReview(product_id)
    .then(() => response.sendStatus(202));
};

module.exports = {
  getReviewsForProduct,
  getMetaData,
  markAsHelpful,
  markAsReported,
  postReview,
};
