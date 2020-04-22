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

   export(score) {
      let doc = new PDFDocument({
         autoFirstPage: false
      });
      score.pageUrls().forEach(url => {
         this.downloadSvgData(url)
            .then(svg => {
               doc.addPage()
               if (score.vector) {
                  SVGtoPDF(doc, svg, 0, 0)
               }
            })
      })
   }

   downloadSvgData(url) {
      return new Promise((success, error) => {
         return axios.get(url)
            .then(response => success(processPage.response.data))
            .catch(reason => error(reason));
      });
   }
}

module.exports = {
   ScoreExporter : ScoreExporter,
   PdfScoreExporter : PdfScoreExporter
}