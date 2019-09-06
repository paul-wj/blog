var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
elms.forEach(function (elm) {
	window[elm] = document.getElementById(elm);
});
var Player = function (playlist) {
	this.playlist = playlist;
	this.index = 0;
	track.innerHTML = '1. ' + playlist[0].title;
	playlist.forEach(function (song) {
		var div = document.createElement('div');
		div.className = 'list-song';
		div.innerHTML = song.title;
		div.onclick = function () {
			player.skipTo(playlist.indexOf(song));
		};
		list.appendChild(div);
	});
};
Player.prototype = {
	play: function (index) {
		var self = this;
		var sound;
		index = typeof index === 'number' ? index : self.index;
		var data = self.playlist[index];
		if (data.howl) {
			sound = data.howl;
		} else {
			sound = data.howl = new Howl({
				src: ['./audio/' + data.file + '.webm', './audio/' + data.file + '.mp3'],
				html5: true,
				onplay: function () {
					duration.innerHTML = self.formatTime(Math.round(sound.duration()));
					requestAnimationFrame(self.step.bind(self));
					wave.container.style.display = 'block';
					bar.style.display = 'none';
					pauseBtn.style.display = 'block';
				},
				onload: function () {
					wave.container.style.display = 'block';
					bar.style.display = 'none';
					loading.style.display = 'none';
				},
				onend: function () {
					wave.container.style.display = 'none';
					bar.style.display = 'block';
					self.skip('next');
				},
				onpause: function () {
					wave.container.style.display = 'none';
					bar.style.display = 'block';
				},
				onstop: function () {
					wave.container.style.display = 'none';
					bar.style.display = 'block';
				},
				onseek: function () {
					requestAnimationFrame(self.step.bind(self));
				}
			});
		}
		sound.play();
		track.innerHTML = (index + 1) + '. ' + data.title;
		if (sound.state() === 'loaded') {
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'block';
		} else {
			loading.style.display = 'block';
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'none';
		}
		self.index = index;
	}, pause: function () {
		var self = this;
		var sound = self.playlist[self.index].howl;
		sound.pause();
		playBtn.style.display = 'block';
		pauseBtn.style.display = 'none';
	}, skip: function (direction) {
		var self = this;
		var index = 0;
		if (direction === 'prev') {
			index = self.index - 1;
			if (index < 0) {
				index = self.playlist.length - 1;
			}
		} else {
			index = self.index + 1;
			if (index >= self.playlist.length) {
				index = 0;
			}
		}
		self.skipTo(index);
	}, skipTo: function (index) {
		var self = this;
		if (self.playlist[self.index].howl) {
			self.playlist[self.index].howl.stop();
		}
		progress.style.width = '0%';
		self.play(index);
	}, volume: function (val) {
		var self = this;
		Howler.volume(val);
		var barWidth = (val * 90) / 100;
		barFull.style.width = (barWidth * 100) + '%';
		sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
	}, seek: function (per) {
		var self = this;
		var sound = self.playlist[self.index].howl;
		if (sound.playing()) {
			sound.seek(sound.duration() * per);
		}
	}, step: function () {
		var self = this;
		var sound = self.playlist[self.index].howl;
		var seek = sound.seek() || 0;
		timer.innerHTML = self.formatTime(Math.round(seek));
		progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';
		if (sound.playing()) {
			requestAnimationFrame(self.step.bind(self));
		}
	}, togglePlaylist: function () {
		var self = this;
		var display = (playlist.style.display === 'block') ? 'none' : 'block';
		setTimeout(function () {
			playlist.style.display = display;
		}, (display === 'block') ? 0 : 500);
		playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
	}, toggleVolume: function () {
		var self = this;
		var display = (volume.style.display === 'block') ? 'none' : 'block';
		setTimeout(function () {
			volume.style.display = display;
		}, (display === 'block') ? 0 : 500);
		volume.className = (display === 'block') ? 'fadein' : 'fadeout';
	}, formatTime: function (secs) {
		var minutes = Math.floor(secs / 60) || 0;
		var seconds = (secs - minutes * 60) || 0;
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
};
var player = new Player([{title: 'Rave Digger', file: 'rave_digger', howl: null}, {
	title: '80s Vibe',
	file: '80s_vibe',
	howl: null
}, {title: 'Running Out', file: 'running_out', howl: null}]);
playBtn.addEventListener('click', function () {
	player.play();
});
pauseBtn.addEventListener('click', function () {
	player.pause();
});
prevBtn.addEventListener('click', function () {
	player.skip('prev');
});
nextBtn.addEventListener('click', function () {
	player.skip('next');
});
waveform.addEventListener('click', function (event) {
	player.seek(event.clientX / window.innerWidth);
});
playlistBtn.addEventListener('click', function () {
	player.togglePlaylist();
});
playlist.addEventListener('click', function () {
	player.togglePlaylist();
});
volumeBtn.addEventListener('click', function () {
	player.toggleVolume();
});
volume.addEventListener('click', function () {
	player.toggleVolume();
});
barEmpty.addEventListener('click', function (event) {
	var per = event.layerX / parseFloat(barEmpty.scrollWidth);
	player.volume(per);
});
sliderBtn.addEventListener('mousedown', function () {
	window.sliderDown = true;
});
sliderBtn.addEventListener('touchstart', function () {
	window.sliderDown = true;
});
volume.addEventListener('mouseup', function () {
	window.sliderDown = false;
});
volume.addEventListener('touchend', function () {
	window.sliderDown = false;
});
var move = function (event) {
	if (window.sliderDown) {
		var x = event.clientX || event.touches[0].clientX;
		var startX = window.innerWidth * 0.05;
		var layerX = x - startX;
		var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
		player.volume(per);
	}
};
volume.addEventListener('mousemove', move);
volume.addEventListener('touchmove', move);
var wave = new SiriWave({
	container: waveform,
	width: window.innerWidth,
	height: window.innerHeight * 0.3,
	cover: true,
	speed: 0.03,
	amplitude: 0.7,
	frequency: 2
});
wave.start();
var resize = function () {
	var height = window.innerHeight * 0.3;
	var width = window.innerWidth;
	wave.height = height;
	wave.height_2 = height / 2;
	wave.MAX = wave.height_2 - 4;
	wave.width = width;
	wave.width_2 = width / 2;
	wave.width_4 = width / 4;
	wave.canvas.height = height;
	wave.canvas.width = width;
	wave.container.style.margin = -(height / 2) + 'px auto';
	var sound = player.playlist[player.index].howl;
	if (sound) {
		var vol = sound.volume();
		var barWidth = (vol * 0.9);
		sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
	}
};
window.addEventListener('resize', resize);
resize();
