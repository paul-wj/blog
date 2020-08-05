const {NODE_ENV, BASE_API_URL, SOCKET_URL} = process.env;
export const IS_PROD = NODE_ENV === 'production';
export const BASE_URL = BASE_API_URL;
export const BASE_SOCKET_URL = SOCKET_URL;
export const VERSION = '1.0.0';
export const REACT_STORE_KEY = 'reactStore';
export const ICON_FONT_URL = '//at.alicdn.com/t/font_1231743_7b76y610pwe.js';
export const TOKEN_KEY = 'authorization';
export const REFRESH_TOKEN_KEY = 'refreshToken';

