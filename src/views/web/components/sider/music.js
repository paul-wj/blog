import React, { Component, Fragment } from 'react'
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

	static changeVolume(val) {
		const volumeNum = val/100;
		Howler.volume(volumeNum);
	}

	static changeMute(mute) {
		Howler.mute(mute);
	}

	cancelStep() {
		const {timer} = this;
		if (timer) {
			cancelAnimationFrame(timer);
		}
	}
}


export default class Music extends Component{
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
				result = result.reverse();
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
		const {songContainerScrollTop} = this;
		const {isOpen} = this.state;
		const currentIsOpen = !isOpen;
		this.setState({isOpen: currentIsOpen}, () => {
			const songContainerDom = document.querySelector('.song-container');
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
		const {play, skip, skipTo, onProgressChange, toggleSongListContainer, changeVolume, changeMute} = this;
		const {isPause, name, author, picUrl, progress, currentTime, endTime, isMask, songList, volume, isMute} = this.state;
		return (<Fragment>{ songList.length ? <Card className="music">
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
