import {httpRequest} from './plugins/http-request';
 const webApi =  {
	 getSongList() {
		return httpRequest(`/song`, {}, {method: 'get'}, {})
	 },
	 getWeather(data) {
		 return httpRequest(`/weather`, {}, {method: 'get'}, data)
	 },
	 login(data){
		 return httpRequest(`/login`, data, {method: 'post'})
	 },
	 loginOut() {
		 return httpRequest(`/login-out`, {}, {method: 'delete'})
	 },
	 registerUser(data) {
		 return httpRequest(`/user`, data, {method: 'post'})
	 },
	 updateUser(id, data) {
		 return httpRequest(`/user/${id}`, data, {method: 'patch'})
	 },
	 checkUserAuth() {
		 return httpRequest(`/user/check-auth`, {}, {method: 'get'})
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
	 getArticlePageList(params) {
		 return httpRequest(`/article/page`, {}, {method: 'get'}, params)
	 },
	 getArticleSimplePageList(params) {
		 return httpRequest(`/article/page/simple`, {}, {method: 'get'}, params)
	 },
	 getArticleById(id) {
		 return httpRequest(`/article/${id}`, {}, {method: 'get'})
	 },
	 getArticlePageListByCategoryId(id, params) {
		 return httpRequest(`/article/category/${id}`, {}, {method: 'get'}, params)
	 },
	 getArticlePageListByTagId(id, params) {
		 return httpRequest(`/article/tag/${id}`, {}, {method: 'get'}, params)
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
	 },
	 deleteArticleComment(commentId) {
		 return httpRequest(`/article/comment/${commentId}`, {}, {method: 'delete'})
	 },
	 createArticleCommentReply(id, data) {
		 return httpRequest(`/article/reply/${id}`, data, {method: 'post'})
	 },
	 deleteArticleCommentReply(replyId) {
		 return httpRequest(`/article/reply/${replyId}`, {}, {method: 'delete'})
	 },
	 getStatisticsForArticle() {
		 return httpRequest(`/statistics/article`, {}, {method: 'get'})
	 },
	 getStatisticsForComment() {
		 return httpRequest(`/statistics/comment`, {}, {method: 'get'})
	 },
	 getStatisticsForReply() {
		 return httpRequest(`/statistics/reply`, {}, {method: 'get'})
	 },
	 getRecipeAllList() {
		 return httpRequest(`/recipe`, {}, {method: 'get'}, {})
	 },
	 getCurrentWeekRecipe() {
		 return httpRequest(`/recipe-week`, {}, {method: 'get'}, {})
	 },
	 getUnreadMessageList() {
		 return httpRequest(`/message-un-read`, {}, {method: 'get'}, {})
	 },
	 readMessage(data) {
		 return httpRequest(`/message-read`, data, {method: 'post'}, {})
	 },
	 clearUnreadMessage(data) {
		 return httpRequest(`/message-read-batch`, data, {method: 'post'}, {})
	 },
	 getAboutCommentList() {
		 return httpRequest(`/about/comment`, {}, {method: 'get'});
	 },
	 createAboutComment(data) {
		 return httpRequest(`/about/comment`, data, {method: 'post'}, {});
	 },
	 createAboutCommentReply(data) {
		 return httpRequest(`/about/reply`, data, {method: 'post'}, {});
	 }
 };
export default webApi;
