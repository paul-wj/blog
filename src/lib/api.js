import {httpRequest} from './plugins/http-request';
 const webApi =  {
	 login(data){
		 return httpRequest(`/login`, {}, {method: 'get'}, data)
	 },
	 getArticleAllList() {
		 return httpRequest(`/article`, {}, {method: 'get'})
	 }
 };
export default webApi;
