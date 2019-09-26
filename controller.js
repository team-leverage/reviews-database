const redis = require('redis');
const db = require('./model');

// create and connect redis client to local instance.
const client = redis.createClient(6379);

// Print redis errors to the console
client.on('error', (err) => {
  console.log(`Error ${err}`);
});

const getReviewsForProduct = (request, response) => {
  const { productId } = request.params;

  const metaRedisKey = `reviews:list:${productId}`;

  return client.get(metaRedisKey, (err, data) => {
    if (data) {
      return response.json({ source: 'cache', data: JSON.parse(data) });
    }
    return db.getReviewList(productId)
      .then((results) => {
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
          reviews[row.id].photos = reviews[row.id].photos.slice(0, 5);
        });
        const output = {
          product: productId,
          page: 0,
          count: Object.keys(reviews).length,
          results: Object.values(reviews),
        };
        client.setex(metaRedisKey, 3600, JSON.stringify(metaData));
        response.status(200).json(output);
      });
  });
};

const getMetaData = (request, response) => {
  const { productId } = request.params;

  const metaRedisKey = `reviews:meta:${productId}`;

  return client.get(metaRedisKey, (err, data) => {
    if (data) {
      console.log('redis found something useful');
      return response.json({ source: 'cache', data: JSON.parse(data) });
    }
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
        // save to redis
        client.setex(metaRedisKey, 3600, JSON.stringify(metaData));
        response.status(202).json(metaData);
      });

  // if it isn't return the result
  });
};

const markAsHelpful = (request, response) => {
  console.log('marked as helpful');
  const { review_id } = request.params;
  return db.markAsHelpful(review_id)
    .then(() => response.sendStatus(201));
};

const markAsReported = (request, response) => {
  console.log('reported');
  const { review_id } = request.params;
  return db.markAsReported(review_id)
    .then(() => response.sendStatus(201));
};

const postReview = (request, response) => {
  const { product_id } = request.params;
  return db.postReview(product_id)
    .then(() => response.sendStatus(202));
};

const test = (request, response) => {
  response.sendStatus(204);
};

module.exports = {
  getReviewsForProduct,
  getMetaData,
  markAsHelpful,
  markAsReported,
  postReview,
  test,
};
