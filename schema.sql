CREATE DATABASE reviews;

\c reviews;

CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    rating INTEGER,
    date_submitted VARCHAR(30),
    summary VARCHAR(1000),
    body VARCHAR(1000),
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(50),
    reviewer_email VARCHAR(100),
    response VARCHAR(1000),
    helpfulness INTEGER
    );

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(id),
    link VARCHAR(300)
);

CREATE TABLE characteristics (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES reviews(id),
    characteristic VARCHAR(20)
);

CREATE TABLE characteristics_reviews (
    id SERIAL PRIMARY KEY,
    characteristic_id INTEGER REFERENCES characteristics(id),
    review_id INTEGER REFERENCES reviews(id),
    rating INTEGER
);

\COPY reviews FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/reviews.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics_reviews FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
