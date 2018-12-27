import html2Canvas from 'html2canvas'

import JsPDF from 'jspdf'

export function getPdf(where, title) {
  html2Canvas(document.querySelector('#pdfContent'), {
    allowTaint: false
  }).then(function(canvas) {
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    const height = 841.89
    const width = 595.28
    const pageHeight = contentWidth / width * height
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = width
    const imgHeight = width / contentWidth * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const PDF = new JsPDF('', 'pt', 'a4')

    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'JPEG', 60, 0, imgWidth, imgHeight)
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'JPEG', 60, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        if (leftHeight > 0) {
          PDF.addPage()
        }
      }
    }
    PDF.save(title + '.pdf')
  }
  )
}

