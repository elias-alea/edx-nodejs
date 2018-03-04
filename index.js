const fs = require('fs')
const path = require('path')
const csvToJson = require('csvtojson')
const csvFilePath = 'customer-data.csv'
let customerStr = '['

csvToJson()
    .fromFile(csvFilePath, {
        toArrayString: true
    })
    .on('data', (data) => {
        // concatentate strigified JSON here
        customerStr += data.toString('utf8') + ','
    }).on('end', ()=> {
        // Remove extra comma from JSON string and add closing array square bracket
        customerStr = customerStr.substring(0, customerStr.length - 1)
        customerStr += ']'
    })
    .on('error', (error) => {
        console.log(`There was an error processing your file. See below \n ${error.message}`)
    })
    .on('done', ()=> {
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), customerStr)
    })
    