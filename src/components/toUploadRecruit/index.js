import uploadRecruit from './src'

/* istanbul ignore next */
uploadRecruit.install = function(Vue) {
  Vue.component(uploadRecruit.name, uploadRecruit)
}

export default uploadRecruit
