const fs = require('fs');
const faker = require('faker');
const file = fs.createWriteStream('./data/characteristics_review_seed');

const headers = ['id', 'review_id', 'characteristic_id', 'rating']

for (let i=0; i < headers.length; i++) {
    if (i === headers.length - 1) {
        file.write(headers[i])
    } else {
        file.write(headers[i] + ',')
    }
}

file.write("\n")

let id = 1

for (var i = 1; i < 3500000; i++) {
    var rando = Array.from({length: Math.floor(Math.random() * 9)}, () => Math.floor(Math.random() * 6));
    var uniqueRando = Array.from(new Set(rando))
    let stringy = ''
    for (var j = 0; j < uniqueRando.length; j++) {
        let rating = Math.floor(Math.random() * 5) + 1
        stringy += (id.toString() + ',' + i.toString() + ',' + uniqueRando[j] + ',' + rating + '\n')
        id+=1
    }
    file.write(stringy)
}

file.end();