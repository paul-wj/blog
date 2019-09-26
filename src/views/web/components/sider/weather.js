import React, {Component, Fragment} from 'react'
import {withRouter} from "react-router-dom";
import {Card} from 'antd';


@withRouter
class Weather extends Component{

	state = {
		weatherInfo: null
	};

	async getWeather() {
		const {cname} = window.returnCitySN;
		let res = await this.$webApi.getWeather({cname});
		if (res.flags === 'success') {
			const result = res.data;
			if (result) {
				this.setState({weatherInfo: result})
			}
		}
	}

	componentDidMount() {
		const timer = setTimeout(() => {
			clearTimeout(timer);
			this.getWeather();
		}, 500);
	}

	render(){
		const {weatherInfo} = this.state;
		const {now}  = weatherInfo || {now: null, lifestyleForecast: null, forecast: null, basic: null, aqi: null, airForecast: null};
		return (<Fragment>
			{ weatherInfo ? <Card className="weather">
				<div className="weather-top" style={{backgroundImage: `url('https://apip.weatherdt.com/float/static/images/bg_${now.code}d.png')`}}>
					<div className="weather-top-container">
						<span className="temperature">{`${now.tmp}°`}</span>
						<span className="weather-icon"><img alt={now.txt} src={`https://apip.weatherdt.com/float/static/images/cond/cond-a-${now.code}d.png`} /></span>
					</div>
				</div>
				<ul className="weather-content">
					<li>
						<span className="iconfont icon-kongqishidu"/>
						<div className="weather-type-content">
							<span className="weather-type">11</span><br/>
							<span className="weather-name">湿度</span>
						</div>
					</li>
					<li>
						<span className="iconfont icon-PM"/>
						<div className="weather-type-content">
							<span className="weather-type">11</span><br/>
							<span className="weather-name">PM</span>
						</div>
					</li>
					<li>
						<span className="iconfont icon-feng"/>
						<div className="weather-type-content">
							<span className="weather-type">11</span><br/>
							<span className="weather-name">风</span>
						</div>
					</li>
				</ul>
			</Card> : null}
		</Fragment>)
	}
}

export default Weather;
