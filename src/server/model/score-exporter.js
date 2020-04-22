const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const axios = require('axios');

class ScoreExporter {
   constructor() {
      if (this.constructor === ScoreExporter) {
         throw new TypeError('Cannot construct parent abstract class');
      }
   }

   export() {

   }
}

class PdfScoreExporter extends ScoreExporter {
   constructor() {
      super();
   }

   export(score, writeable) {
      let doc = new PDFDocument({
         autoFirstPage: false
      });
      doc.pipe(writeable)
      score.pageUrls().forEach(url => {
         doc.addPage();
         if (score.vector) {
            // SVGtoPDF(doc, data, 0, 0)
         }
         else {
            axios.get(url, {responseType: "arraybuffer"})
               .then(response => {
                  doc.image(response.data, 0, 0)
               });
         }
      });
      // doc.end();
   }
}

module.exports = {
   ScoreExporter: ScoreExporter,
   PdfScoreExporter: PdfScoreExporter
}