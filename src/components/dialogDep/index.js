import getDepeople from './src/component'

/* istanbul ignore next */
getDepeople.install = function(Vue) {
  Vue.component(getDepeople.name, getDepeople)
}

export default getDepeople
