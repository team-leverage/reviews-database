const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const controller = require('./controller');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// ROUTES
app.get('/reviews/:productId/list', controller.getReviewsForProduct);

app.get('/reviews/:productId/meta', controller.getMetaData);

app.put('/reviews/helpful/:review_id', controller.markAsHelpful);

app.put('/reviews/report/:review_id', controller.markAsHelpful);

app.post('/reviews/:product_id', controller.postReview);


app.listen(port, () => console.log(`listening on ${port}`));
