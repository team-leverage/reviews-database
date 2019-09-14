const fs = require('fs');
const faker = require('faker');
const file = fs.createWriteStream('./data/characteristics_seed');

const headers = ['id', 'characteristic']
const characteristics = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit']

for (let i=0; i < headers.length; i++) {
    if (i === headers.length - 1) {
        file.write(headers[i])
    } else {
        file.write(headers[i] + ',')
    }
}

file.write("\n")

for (var i = 0; i < characteristics.length; i++) {
    file.write((i).toString() + ',' + characteristics[i] + '\n')
}

file.end();