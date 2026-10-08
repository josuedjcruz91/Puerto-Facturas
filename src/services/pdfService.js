// Captura el mismo documento visible; pagina por filas/bloques para evitar cortes.
export async function createInvoicePdf(node) {
  if (!node) throw new Error('El documento todavía no está disponible.')
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')])
  const clone = node.cloneNode(true)
  const host = document.createElement('div')
  host.style.cssText = 'position:absolute;left:-10000px;top:0;width:794px;background:white'
  clone.style.cssText = 'width:794px;max-width:none;padding:40px;box-sizing:border-box'
  host.setAttribute('aria-hidden', 'true')
  host.className = 'no-print'
  host.appendChild(clone)
  document.body.appendChild(host)
  try {
    await document.fonts.ready
    const canvas = await html2canvas(clone, { scale: 1.5, backgroundColor: '#ffffff', windowWidth: 1100 })
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const width = 190
    const pagePixels = Math.floor(277 * canvas.width / width)
    const bounds = clone.getBoundingClientRect()
    const scale = canvas.width / bounds.width
    const blocks = [...clone.querySelectorAll('header, section, tr, dl, footer')].map(element => { const rect = element.getBoundingClientRect(); return { start: Math.floor((rect.top - bounds.top) * scale), end: Math.ceil((rect.bottom - bounds.top) * scale) } })
    let offset = 0
    while (offset < canvas.height) {
      let end = Math.min(offset + pagePixels, canvas.height)
      const crossing = blocks.find(block => block.start > offset && block.start < end && block.end > end && block.end - block.start < pagePixels)
      if (crossing) end = crossing.start
      const page = document.createElement('canvas')
      page.width = canvas.width
      page.height = end - offset
      page.getContext('2d').drawImage(canvas, 0, offset, canvas.width, page.height, 0, 0, page.width, page.height)
      if (offset > 0) pdf.addPage()
      pdf.addImage(page.toDataURL('image/png'), 'PNG', 10, 10, width, page.height * width / page.width)
      offset = end
    }
    return pdf.output('blob')
  } finally { host.remove() }
}
