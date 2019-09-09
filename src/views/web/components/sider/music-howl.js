import lodash from "lodash";
import {Howl, Howler} from "howler";
import {message} from "antd";

export default class MusicHowl {
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
