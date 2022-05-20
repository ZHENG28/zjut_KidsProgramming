import util from '@/utils/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('ZJUT OJ Admin', `v${process.env.VUE_APP_VERSION}`)
    }
  }
}
