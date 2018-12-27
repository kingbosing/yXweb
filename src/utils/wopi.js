var allowExts = {
  docx: {
    editUrl: 'we/WordEditorFrame.aspx?WOPISrc='
  },
  xlsx: {
    editUrl: 'x/_layouts/xlviewerinternal.aspx?WOPISrc='
  },
  pptx: {
    editUrl: 'p/PowerPointFrame.aspx?PowerPointView=ReadingView&WOPISrc='
  },
  pdf: {
    editUrl: 'wv/wordviewerframe.aspx?PdfMode=1&WOPISrc='
  }
}
export default {
  name: 'wopi',
  isCollaboration(filename) {
    var ext = this.getExt(filename)
    if (allowExts[ext]) return true
    return false
  },
  getExt(filename) {
    var fns = (filename || '').split('.')
    if (fns.length === 1) return ''
    return fns[fns.length - 1]
  },
  getViewUrl(url) {
    var ext = this.getExt(url)
    if (allowExts.indexOf(ext) < 0) return ''
    return ''
  },
  getEditUrl(url, token) {
    var ext = this.getExt(url)
    token = token || '123'
    if (!allowExts[ext]) return ''
    return (
      process.env.VUE_APP_OOS_BASE_URL +
      allowExts[ext].editUrl +
      encodeURIComponent(encodeURI(process.env.VUE_APP_OOS_LOCAL_URL + url)) +
      '&access_token=' +
      token +
      '&ui=zh-CN'
    )
  }
}
