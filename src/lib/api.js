import {httpRequest} from './plugins/http-request';
 const webApi =  {
	 login(data){
		 return httpRequest(`/login`, data, {method: 'post'})
	 },
	 registerUser(data) {
		 return httpRequest(`/user`, data, {method: 'post'})
	 },
	 updateUser(id, data) {
		 return httpRequest(`/user/${id}`, data, {method: 'patch'})
	 },
	 getTagAllList(context) {
		 return httpRequest(`/tag`, {}, {method: 'get'}, {}, context)
	 },
	 createTag(data) {
		 return httpRequest(`/tag`, data, {method: 'post'})
	 },
	 editTag(id, data) {
		 return httpRequest(`/tag/${id}`, data, {method: 'patch'})
	 },
	 deleteTag(id) {
		 return httpRequest(`/tag/${id}`, {}, {method: 'delete'})
	 },
	 getCategoryAllList(context) {
		 return httpRequest(`/category`, {}, {method: 'get'}, {}, context)
	 },
	 createCategory(data) {
		 return httpRequest(`/category`, data, {method: 'post'})
	 },
	 editCategory(id, data) {
		 return httpRequest(`/category/${id}`, data, {method: 'patch'})
	 },
	 deleteCategory(id) {
		 return httpRequest(`/category/${id}`, {}, {method: 'delete'})
	 },
	 getArticleAllList() {
		 return httpRequest(`/article`, {}, {method: 'get'})
	 },
	 getArticleById(id) {
		 return httpRequest(`/article/${id}`, {}, {method: 'get'})
	 },
	 editArticle(id, data) {
		 return httpRequest(`/article/${id}`, data, {method: 'patch'})
	 },
	 deleteArticle(id) {
		 return httpRequest(`/article/${id}`, {}, {method: 'delete'})
	 },
	 createArticle(data) {
		 return httpRequest(`/article`, data, {method: 'post'})
	 },
	 getArticleCommentList(id) {
		 return httpRequest(`/article/comment/${id}`, {}, {method: 'get'})
	 },
	 createArticleComment(id, data) {
		 return httpRequest(`/article/comment/${id}`, data, {method: 'post'})
	 }
 };
export default webApi;
