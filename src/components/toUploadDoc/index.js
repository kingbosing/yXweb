import UploadDoc from './src'

/* istanbul ignore next */
UploadDoc.install = function(Vue) {
  Vue.component(UploadDoc.name, UploadDoc)
}

export default UploadDoc
