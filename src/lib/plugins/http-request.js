import { message } from 'antd'
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const singOut = () => {
  window.location.href = '/';
};

const getResult = res => {
  let authorization = window.localStorage.getItem("authorization") || '';
  let result = res.data;
  let code = result.code;
  if (!res.config.baseURL) {
    return {
      flags: 'success',
      data: result.results || result.result,
      message: '成功'
    }
  }
  if (Object.prototype.toString.call(result).indexOf('Blob') > -1) {
    return {
      flags: 'success',
      data: result,
      message: '成功',
      url: `${res.config.url}?authorization=${authorization}`
    };
  }
  if (result && (code === 0 || code === 404)) {
    let data = code === 0 ? (result.results || result.result) : null;
    return {
      flags: 'success',
      data,
      message: result.message,
      code
    };
  } else if (result && code === 400) {
    let {message, results} = result;
    if (results && results.length) {
      message = results.reduce((startValue, currentValue) => [...startValue, currentValue.message], []).toString();
    }
    message.error(message);
    return {
      flags: 'fail',
      code,
      message
    };
  } else if (result && code === 900) {
    singOut();
  }
  else {
    message.error(message);
    return {
      flags: 'fail',
      message: result.message,
      code
    };
  }
};
/**
 * 基于axios的http请求，默认方式为post
 * @param url
 * @param data
 * @param options
 * @param params
 * @returns {Promise}
 */
export const httpRequest = (url, data = {}, options = { method : 'post' }, params) => {
	let authorization = window.localStorage.getItem("authorization") || '';
    return axios(Object.assign({
        baseURL: BASE_URL,
        headers: {authorization},
        url,
        data,
        params,
        timeout: 60000
    }, options))
    .then(getResult)
    .catch(err => {
      if (!err.response || ![401, 422].includes(err.response.status)) {
        message.error('网络错误');
        return {
          flags: 'fail',
          message: '网络错误',
          code: err.response ? err.response.status : 0
        }
      }
      message.error(err.response.data.message);
      return {
        flags: 'fail',
        message: err.response.data.message,
        code: err.response.data.code
      }
    });
};
