require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const cors = require('cors');
const controller = require('./controller');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/reviews/:productId/list', controller.getReviewsForProduct);

app.get('/reviews/:productId/meta', controller.getMetaData);

app.put('/reviews/helpful/:review_id', controller.markAsHelpful);

app.put('/reviews/report/:review_id', controller.markAsReported);

app.post('/reviews/:product_id', controller.postReview);

app.listen(port, () => console.log(`listening on ${port}`));
