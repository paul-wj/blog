import React, { Component, Fragment } from 'react'
import {Card, Slider} from 'antd';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import MusicHowl from './music-howl'

@withRouter
class Music extends Component{
	static propTypes = {
		className: PropTypes.string
	};

	songContainerScrollTop = 0;
	state = {
		songList: [],
		musicHowl: null,
		isPause: true,
		name: '',
		author: '',
		picUrl: '',
		currentTime: '',
		endTime: '',
		progress: 0,
		timer: null,
		isOpen: false,
		isMask: false,
		volume: 50,
		isMute: false
	};

	async getSongList() {
		let res = await this.$webApi.getSongList();
		if (res.flags === 'success') {
			this.setState({songList: []});
			let result = res.data;
			if (result && result.length) {
				const musicHowl = new MusicHowl(result);
				const {name, author, picUrl, endTime} = musicHowl;
				this.setState({songList: result, musicHowl, name, author, picUrl, endTime}, () => {
					// this.play();
				});
			}
		}
	};

	play() {
		const {isPause, musicHowl} = this.state;
		if (isPause) {
			musicHowl.play();
			this.step();
		} else {
			musicHowl.pause();
			this.cancelStep();
		}
		this.setState({isPause: !isPause});
	}

	skip(direction) {
		const {musicHowl} = this.state;
		musicHowl.skip(direction);
		const {name, author, picUrl} = musicHowl;
		this.setState({isPause: false, name, author, picUrl});
		this.step();
	}

	skipTo(index)　{
		const {musicHowl} = this.state;
		musicHowl.skipTo(index);
		this.step();
	}

	step() {
		const {endTime, musicHowl} = this.state;
		const {currentTime, progress, endTime: currentEndTime, name, author, picUrl} = musicHowl;
		if (endTime !== currentEndTime) {
			this.setState({currentTime, progress, endTime: currentEndTime, name, author, picUrl});
		} else {
			this.setState({currentTime, progress, name, author, picUrl});
		}
		const timer = requestAnimationFrame(this.step.bind(this));
		this.setState({timer});
	}

	onProgressChange(progress) {
		const {musicHowl} = this.state;
		if (progress) {
			musicHowl.seek(progress);
		}
	}

	cancelStep() {
		const {timer} = this.state;
		if (timer) {
			cancelAnimationFrame(timer);
		}
	}

	toggleSongListContainer() {
		const {className} = this.props;
		const {songContainerScrollTop} = this;
		const {isOpen} = this.state;
		const currentIsOpen = !isOpen;
		this.setState({isOpen: currentIsOpen}, () => {
			const songContainerDom = className ? document.querySelector(`.${className} .song-container`) : document.querySelector('.song-container');
			if (currentIsOpen) {
				songContainerDom.style.display = 'block';
				songContainerDom.scrollTop = songContainerScrollTop;
				songContainerDom.className = `song-container rollIn animated`;
			} else {
				this.songContainerScrollTop = songContainerDom.scrollTop;
				songContainerDom.className = `song-container hinge animated`;
				this.setState({isMask: true});
				const timer = setTimeout(() => {
					clearTimeout(timer);
					songContainerDom.style.display = 'none';
					this.setState({isMask: false})
				}, 1000)
			}
		});
	}

	changeVolume(val) {
		const {changeVolume, isMute} = MusicHowl;
		changeVolume(val);
		if (isMute && val !== 0) {
			this.changeMute();
		}
		this.setState({volume: val});
	}

	changeMute(e) {
		e.stopPropagation();
		const {changeMute} = MusicHowl;
		const {isMute} = this.state;
		const currentIsMute = !isMute;
		changeMute(currentIsMute);
		this.setState({isMute: currentIsMute})
	}

	componentDidMount() {
		this.getSongList();
	}

	render(){
		const {className} = this.props;
		const {play, skip, skipTo, onProgressChange, toggleSongListContainer, changeVolume, changeMute} = this;
		const {isPause, name, author, picUrl, progress, currentTime, endTime, isMask, songList, volume, isMute} = this.state;
		return (<Fragment>{ songList.length ? <Card className={`music ${className}`}>
			<div className="music-content">
				<p className="music-title">私人播放器<span onClick={toggleSongListContainer.bind(this)} className="iconfont icon-category" /></p>
				<p className="music-name">{name}</p>
				<p className="music-author">{author}</p>
				{picUrl ? <p className="music-pic"><img src={picUrl} width="100%" alt={name} /></p> : null}
				<Slider onChange={onProgressChange.bind(this)} style={{margin: '14px 2px 10px'}} value={progress} tipFormatter={null} />
				<p className="music-time" style={{visibility: currentTime && endTime ? 'visible' : 'hidden'}}><span>{currentTime}</span>/<span>{endTime}</span></p>
				<div className="music-control">
					<i onClick={skip.bind(this, 'prev')} className="iconfont icon-left" />
					<i onClick={play.bind(this)} className={`iconfont ${isPause ? 'icon-bofang' : 'icon-zanting'}`}/>
					<i onClick={skip.bind(this, 'next')} className="iconfont icon-left right" />
				</div>
				<div className="music-control-options">
					<div className={`iconfont ${!isMute ? 'icon-shengyin' : 'icon-jingyin'}`}>
						<span className="placeholder" onClick={changeMute.bind(this)} />
						<Slider onChange={changeVolume.bind(this)} vertical className="voice-container" value={volume} />
					</div>
				</div>
			</div>
			<div className="song-container">
				<div>
					<ul>
						{songList.map((song, index) => <li onClick={() => {
							skipTo.call(this, index);
							toggleSongListContainer.call(this);
						}} className={name === song.name && author === song.author ? 'active' : ''} key={song.id}>
							<i className="song-sign" />
							<span className="song-order">{index + 1}</span>
							<span className="song-name" title={song.name}>{song.name}</span>
							<span className="song-author" title={song.author}>{song.author}</span>
						</li>)}
					</ul>
				</div>
				<i className="iconfont icon-close2 song-container-close" onClick={toggleSongListContainer.bind(this)} />
			</div>
			<div className="song-mask" style={{display: isMask ? 'block' : ''}} />
		</Card> : null} </Fragment>)
	}
}

export default Music;
