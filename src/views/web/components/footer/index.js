import React, { Component } from 'react'

class Footer extends Component{
	state = {
		copyrightYear: null
	};

	componentDidMount() {
		const now = new Date();
		this.setState({copyrightYear: now.getFullYear()})
	}

	render() {
		const {copyrightYear} = this.state;
		return <footer className="app-footer">
			<p className="copyright">版权所有 © 2019—{copyrightYear} <a href="/about" rel="noopener noreferrer">汪小二</a> 保留所有权利<br/><a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action" rel="noopener noreferrer" target="_blank">赣ICP备19005439号</a></p>
		</footer>
	}
}
export default Footer;
