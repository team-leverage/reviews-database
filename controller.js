const db = require('./model');

const getReviewsForProduct = (request, response) => {
  const { productId } = request.params;
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
            date: row.date,
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
      });
      const output = {
        product: productId,
        page: 0,
        count: Object.keys(reviews).length,
        results: Object.values(reviews),
      };
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
            rating: row.characteristic_rating,
            ratingCount: 1,
          };
        } else {
          metaData.characteristics[row.characteristic].ratingCount += 1;
          metaData.characteristics[row.characteristic].rating = Math.floor(
            (metaData.characteristics[row.characteristic].rating + row.characteristic_rating)
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
