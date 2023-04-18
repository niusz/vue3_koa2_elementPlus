/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    dev: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/21b83c3eaa243c38d0dfd5e5486cd16d/api'
    },
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/21b83c3eaa243c38d0dfd5e5486cd16d/api'
    },
    prod: {

    }
}
export default {
    env,
    mock: true,
    ...EnvConfig[env]
}