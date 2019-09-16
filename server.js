const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/reviews/:productId/list', db.getReviewList);
app.get('/reviews/:productId/meta', db.getMetaData);
app.put('/reviews/helpful/:review_id', db.markAsHelpful);
app.listen(port, () => console.log(`listening on ${port}`));
