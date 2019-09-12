CREATE DATABASE reviews;

\c reviews;

CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    rating INTEGER,
    date VARCHAR(30),
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
    review_id INTEGER REFERENCE reviews(id),
    url VARCHAR(300)
);

CREATE TABLE characteristics_review (
    id SERIAL PRIMARY KEY,
    characteristic_id INTEGER REFERENCE characteristic(id),
    review_id INTEGER REFERENCE review(id),
    value INTEGER
);

CREATE TABLE characteristics (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCE reviews(id),
    name VARCHAR(20)
);