const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
let arr = [];
pdfExtract.extract('upc.pdf', options, (err, data) => {
  if (err) return console.log(err);
  data.pages.map((item, i) => {
      item.content.map(el => {
          if(el.str.includes("'")) {
              arr.push(el.str)
          }
      })
  })
  console.log(arr)
});
