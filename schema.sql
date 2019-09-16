CREATE DATABASE reviews;

\c reviews;

CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    rating INTEGER,
    date_submitted VARCHAR(100),
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
    photo_id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(id),
    link VARCHAR(300)
);

CREATE TABLE characteristics (
    id SERIAL PRIMARY KEY,
    characteristic VARCHAR(20)
);

CREATE TABLE characteristics_reviews (
    id SERIAL PRIMARY KEY,
    review_id INTEGER REFERENCES reviews(id),
    characteristic_id INTEGER REFERENCES characteristics(id),
    rating INTEGER
);

\COPY reviews FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/reviews_seed.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/photos_seed.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/characteristics_seed.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics_reviews FROM '/Users/stephen/hrgbld/sdc/reviews-database/data/characteristics_review_seed.csv' DELIMITER ',' CSV HEADER;
