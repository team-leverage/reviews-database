const fs = require('fs');
const faker = require('faker');
const file = fs.createWriteStream('./data/photos_seed');

const headers = ['id', 'review_id', 'link']

for (let i=0; i < headers.length; i++) {
    if (i === headers.length - 1) {
        file.write(headers[i])
    } else {
        file.write(headers[i] + ',')
    }
}

file.write("\n")

let counter = 0

for (var j = 0; j < 3500000; j++) {
    let chance = Math.floor(Math.random() * 3)
    if (chance === 1) {
        let photoEntry = ''
        let photoNumber = Math.floor(Math.random() * 17) + 1
        for (var k = 0; k < photoNumber; k++) {
            photoEntry += (counter + ',' + j.toString() + ',' + faker.image.imageUrl() + '\n')
            counter+=1
        }
        file.write(photoEntry)
    }
}

file.end();