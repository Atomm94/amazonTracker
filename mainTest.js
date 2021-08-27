const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const jsonfile = require('jsonfile')
const options = {}; /* see below */
let arr = [];
let products = [];

pdfExtract.extract('upc.pdf', options, async(err, data) => {
  if (err) return console.log(err);
  data.pages.map((item, i) => {
      item.content.map(el => {
        if(el.str.includes("'")) {
          arr.push({upc: el.str.split("'")[1]})
        }
      })
  })
   await jsonfile.writeFileSync('upc.json', arr, { spaces: 2 })
});

// (async function() {
//   let newData = [];
//   let data = await jsonfile.readFileSync('upc.json');
//   for (let i = 202; i < data.length; i++) {
//       newData.push({upc: data[i].upc})
//   }
//    await jsonfile.writeFileSync('dd.json', newData, { spaces: 2 })
//    return newData;
// })()