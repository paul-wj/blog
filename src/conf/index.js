export const IS_PROD = process.env.NODE_ENV === 'production';
export const VERSION = 0.12;

export const noticeTypeList = {
	10: '评论了你的文章',
	20: '回复了你的评论文章',
	30: '点赞了你的评论文章',
	40: '踩了你的评论文章'
};

export const noticeRouterList = {
	10: '/article/',
	20: '/article/',
	30: '/article/',
	40: '/article/'
};
