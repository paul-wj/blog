import React, { Component } from 'react'
import {Card, Slider, message} from 'antd';
import {Howl, Howler} from 'howler';
import lodash from 'lodash'
class MusicHowl {
	constructor(playlist) {
		this.playlist = playlist;
		this.index = 0;
		this.timer = null;
		const currentPlay = playlist[this.index];
		this.name = currentPlay.name;
		this.author = currentPlay.author;
		this.picUrl = currentPlay.picUrl;
		this.endTime = '';
	}

	static formatTime(time) {
		if (!time) {
			return '0:00'
		}
		const minutes = Math.floor(time / 60) || 0;
		const seconds = (time - minutes * 60) || 0;
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}

	static debounceSeek(callbak) {
		return (lodash.debounce(callbak, 100))();
	}

	//开始播放
	play(soundIndex) {
		const {playlist, index} = this;
		soundIndex = soundIndex === undefined ? index : soundIndex;
		const soundData = playlist[soundIndex];
		//设置当前播放歌曲名称和歌曲作者、歌曲图片
		this.name = soundData.name;
		this.author = soundData.author;
		this.picUrl = soundData.picUrl;

		const self = this;
		let sound;
		if (soundData.howl) {
			sound = soundData.howl;
		} else {
			const step = this.step.bind(this);
			sound = soundData.howl = new Howl({
				src: [soundData.url],
				html5: true,
				onplay: function () {
					//设置当前歌曲时间长度
					self.endTime = MusicHowl.formatTime(Math.round(sound.duration()));
					self.timer = requestAnimationFrame(step);
					console.log(`${soundData.name}play`)
				},
				onload: function () {
					console.log(`${soundData.name}load`)
				},
				onloaderror: function(id, err) {
					console.log(id, err, 'loading');
					if (id) {
						message.error('歌曲加载出错，请切换歌曲');
					}
				},
				onplayerror: function(id, err) {
					console.log(id, err, 'playing');
					if (id) {
						message.error('歌曲播放出错，请切换歌曲');
					}
				},
				onend: function () {
					self.cancelStep();
					self.skip('next');
					console.log(`${soundData.name}end`)
				},
				onpause: function () {
					self.cancelStep();
					console.log(`${soundData.name}pause`)
				},
				onstop: function () {
					self.cancelStep();
					console.log(`${soundData.name}stop`)
				},
				onseek: function () {
					self.timer = requestAnimationFrame(step);
					console.log(`${soundData.name}seek`)
				}
			})
		}
		this.index = soundIndex;
		this.isPause = false;
		sound.play();
	}
	//暂停播放
	pause() {
		const {playlist, index} = this;
		const sound = playlist[index].howl;
		this.isPause = true;
		sound.pause();
	}
	//切换播放
	skip(direction) {
		const {index, playlist} = this;
		const playlistLength = playlist.length;
		let currentIndex = 0;
		if (direction === 'prev') {
			currentIndex = index - 1;
			currentIndex = currentIndex < 0 ? playlistLength - 1 : currentIndex;
		} else {
			currentIndex = index + 1;
			currentIndex = currentIndex >= playlistLength ? 0 : currentIndex;
		}
		this.skipTo(currentIndex);
	}
	//跳至指定索引播放
	skipTo(currentIndex) {
		const {index, playlist} = this;
		const currentSound = playlist[index].howl;
		if (currentSound) {
			currentSound.stop();
		}
		this.play(currentIndex)
	}
	//设置当前歌曲播放点
	seek(per) {
		MusicHowl.debounceSeek(() => {
			const {playlist, index} = this;
			const sound = playlist[index].howl;
			if (sound.playing()) {
				const seek = sound.duration() * (per/100);
				sound.seek(Math.round(seek));
			}
		});
	}
	step() {
		const {playlist, index} = this;
		const sound = playlist[index].howl;
		const seek = sound.seek() || 0;
		this.currentTime = MusicHowl.formatTime(Math.round(seek));
		this.progress = (seek / sound.duration()) * 100 || 0;
		if (sound.playing()) {
			this.cancelStep();
			this.timer = requestAnimationFrame(this.step.bind(this));
		}
	}

	cancelStep() {
		const {timer} = this;
		if (timer) {
			cancelAnimationFrame(timer);
		}
	}
}

export default class Music extends Component{

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
		isMask: false
	};

	async getSongList() {
		let res = await this.$webApi.getSongList();
		if (res.flags === 'success') {
			const result = res.data.reverse();
			this.setState({songList: []});
			if (result && result.length) {
				const musicHowl = new MusicHowl(result);
				const {name, author, picUrl, endTime} = musicHowl;
				this.setState({songList: result, musicHowl, name, author, picUrl, endTime}, () => {
					this.play();
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

	step() {
		const {endTime, musicHowl} = this.state;
		const {currentTime, progress, endTime: currentEndTime} = musicHowl;
		if (endTime !== currentEndTime) {
			this.setState({currentTime, progress, endTime: currentEndTime});
		} else {
			this.setState({currentTime, progress});
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
		const {isOpen} = this.state;
		const currentIsOpen = !isOpen;
		this.setState({isOpen: currentIsOpen}, () => {
			const songContainerDom = document.querySelector('.song-container');
			if (currentIsOpen) {
				songContainerDom.style.display = 'block';
				songContainerDom.className = `song-container rollIn animated`;
			} else {
				songContainerDom.className = `song-container hinge animated`;
				this.setState({isMask: true});
				const timer = setTimeout(() => {
					clearTimeout(timer);
					songContainerDom.style.display = 'none';
					this.setState({isMask: false})
				}, 3000)
			}
		});
	}

	componentDidMount() {
		this.getSongList();
	}

	render(){
		const {skip, play, onProgressChange, toggleSongListContainer} = this;
		const {isPause, name, author, picUrl, progress, currentTime, endTime, isOpen, isMask} = this.state;
		return (<Card className="music">
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
			<div className="song-container">
				<span onClick={toggleSongListContainer.bind(this)}>关闭</span>
			</div>
			<div className="song-mask" style={{display: isMask ? 'block' : ''}} />
		</Card>)
	}
}
