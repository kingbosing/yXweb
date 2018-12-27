import { globalvariable } from '@/utils/globalvariable'

export default {
  name: 'urlUtil',
  // 格式化图片URL t={c,m,p}
  formatPicUrl(url, w, h, t = 'c') {
    if (url) {
      return (
        process.env.VUE_APP_IMAGE_BASE_URL +
        url
          .replace('{0}', w)
          .replace('{1}', h)
          .replace('{2}', t)
      )
    }
  },

  // 格式化图片URL t={c,m,p}
  formatImgUrl(url, w, h, t = 'c') {
    if (url) {
      return (
        globalvariable().imgapiurl +
        url
          .replace('{0}', w)
          .replace('{1}', h)
          .replace('{2}', t)
      )
    }
  },

  // 格式化图片URL t={c,m,p}
  formatUrl(url, w, h, t = 'c') {
    if (url) {
      return (
        url
          .replace('{0}', w)
          .replace('{1}', h)
          .replace('{2}', t)
      )
    }
  }

}
