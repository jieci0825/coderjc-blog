const siteTitle = import.meta.env.VITE_APP_TITLE
const divide = ' - '
var routeTitle = '',
	articleTitle = ''

function setTitle() {
	// 两个标题都不存在
	if (!routeTitle && !articleTitle) {
		// 使用默认标题
		document.title = siteTitle
	}
	// 如果存在路由标题而不存在文章标题
	else if (routeTitle && !articleTitle) {
		// 使用路由标题
		document.title = siteTitle + divide + routeTitle
	}
	// 如果存在文章标题而不存在路由标题
	else if (articleTitle && !routeTitle) {
		// 使用文章标题
		document.title = articleTitle
	}
	// 如果都存在
	else {
		document.title = routeTitle + divide + articleTitle
	}
}

// 网站标题控制
export default {
	// 设置路由标题
	setRouteTitle(title: string) {
		routeTitle = title
		setTitle()
	},

	// 设置文章标题标题
	setArticleTitle(title: string) {
		articleTitle = title
		setTitle()
	}
}
