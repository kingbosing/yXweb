const agentArray = require('./.dev.agent.json')

const apiurl = 'http://192.168.10.47/'
const recruitApi = 'http://192.168.10.47:9082/'
const dotnetHost = 'http://localhost:65158/'
// const dotnetHost = 'http://webapi.work-oa.com/'h
const proxyArr = [
  // 'Api',
  // 'Login',
  'Scripts',
  // 'Apix',
  'Content',
  'Fonts'
  // 'Images',
  // 'RecruitApi'
].concat(agentArray)
var nowAgent = {}

proxyArr.forEach(element => {
  if (!nowAgent['/' + element + '/']) {
    nowAgent['/' + element + '/'] = {
      target: dotnetHost,
      secure: false
    }
  }
  if (!nowAgent['/' + element.toLowerCase() + '/']) {
    nowAgent['/' + element.toLowerCase() + '/'] = {
      target: dotnetHost,
      secure: false
    }
  }
})
const proxyTable = Object.assign(
  {
    '/apix': {
      target: apiurl,
      pathRewrite: {
        '^/apix': '/api'
      }
    },
    'recruitapi': {
      target: recruitApi,
      pathRewrite: {
        '^/recruitapi': '/api'
      }
    },
    // '/login': {
    //   target: dotnetHost
    // },
    '/Login': {
      target: apiurl,
      pathRewrite: {
        '^/Login': '/api/login'
      }
    },
    '/favicon.ico': { target: dotnetHost },
    'Images': {
      target: '@/assets/images'
      // pathRewrite: {
      //   '^/Images': '/api/login'
      // }
    },
    'images': {
      target: '@/assets/images',
      pathRewrite: {
        '^/images': 'images'
      }
    }
  },

  // nowAgent
)
module.exports = {
  //   configureWebpack:{
  //     resolve: {
  //         alias: {
  //             vue: './node_modules/vue/dist/vue.js'
  //         },
  //     },
  //   }
  devServer: {
    proxy: proxyTable
  },
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html'

    }
  },
  configureWebpack: {
    performance: {
      hints: false, // 枚举
      maxAssetSize: 30000000, // 整数类型（以字节为单位）
      maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
      assetFilter: function(assetFilename) {
      // 提供资源文件名的断言函数
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      }
    }
  },
  baseUrl: process.env.BASE_URL,
  outputDir: process.env.OUTPUT_DIR,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: true,
  css: undefined
}
