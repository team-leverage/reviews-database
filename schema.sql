CREATE DATABASE reviews;

\c reviews;

CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    rating INTEGER,
    date_submitted VARCHAR(30),
    summary VARCHAR(100),
    body VARCHAR(1000),
    recommend INTEGER,
    reported INTEGER,
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

CREATE TABLE characteristics_review (
    id SERIAL PRIMARY KEY,
    characteristic_id INTEGER REFERENCES characteristics(id),
    review_id INTEGER REFERENCES reviews(id),
    rating INTEGER
);

