const fs = require('fs');
const faker = require('faker');
const file = fs.createWriteStream('./reviews_seed');

const headers = ['id', 'product_id', 'rating', 'date_submitted', 'summary', 'body', 'recommend', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness']

for (let i=0; i < headers.length; i++) {
    if (i === headers.length - 1) {
        file.write(headers[i])
    } else {
        file.write(headers[i] + ',')
    }
}

// number to use 6660000

baconWords = ['Spicy', 'jalapeno', 'bacon', 'ipsum', 'dolor', 'biltong', 'chuck', 'landjaeger', 'cow', 'bacon',
                'drumstick', 'pastrami', 'ball', 'tip', 'short', 'loin', 'brisket', 'prosciutto', 
                'meatloaf', 'buffalo', 'frankfurter']

file.write("\n")

var review_id = 0

for (var j = 0; j < 3500000; j++) {
    let reviewNumber = Math.floor(Math.random() * 5) + 1
    let review = ''
    for (var l = 0; l < reviewNumber; l++) {
        for (let k = 0; k < headers.length; k++) {
            if (k === 0) {
                review += review_id.toString() + ','
            }
            if (k === 1) {
                review += j.toString() + ','
            }
            if (k === 2) {
                review += (Math.floor(Math.random() * 5) +1) + ','
            }
            if (k === 3) {
                review += (faker.date.past(5) + ',')
            }
            if (k === 4) {
                review += (faker.lorem.sentence() + ',')
            }
            if (k === 5) {
                review += (faker.lorem.paragraph() + ',')
            }
            if (k === 6) {
                review += (Math.floor(Math.random() * 2) + ',')
            }
            if (k === 7) {
                review += (Math.floor(Math.random() * 2) + ',')
            }
            if (k === 8) {
                review += (faker.internet.userName() + ',')
            }
            if (k === 9) {
                review += (faker.internet.email() + ',')
            }
            if (k === 10) {
                let chance = Math.floor(Math.random() * 4)
                    if (chance === 1) {
                        review += (faker.lorem.paragraph() + ',')
                } else {
                    review += ("" + ',')
                }
            }
            if (k === 11) {
                review += (Math.floor(Math.random() * 30) + '\n')
            }
        }
        review_id += 1
    }
    file.write(review)
}

file.end();