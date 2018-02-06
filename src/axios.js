import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './router'
import { delCookie } from './util.js'

axios.defaults.timeout = 5000;

//http请求拦截
let loadingInstance;
axios.interceptors.request.use(config => {
    loadingInstance = Loading.service({ fullscreen: true });
    return config;
}, error => {
    loadingInstance.close();
    Message.error({
        message: '加载超时'
    });
    return Promise.reject(error);
});

//http响应拦截
axios.interceptors.response.use(data => {
    loadingInstance.close();
    return data;
}, error => {
    loadingInstance.close();
    if (error && error.response) {
        switch (error.response.status) {
            case 401: delCookie('session');
                      router.push('/login');
                      break;
            default: Message.error({
                        message: '服务器错误'
                     });
                     break;
        }
    }
   
    return Promise.reject(error);
});

export default axios;