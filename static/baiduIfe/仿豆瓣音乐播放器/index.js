new Vue({
	el: '.wrapper',
	data: {
		musicLists: [
			{
				id: 1,
				title: '途中',
				src: 'http://mr1.doubanio.com/fa8595867f67aea0ba65883075b205f7/0/fm/song/p2517050_128k.mp3'
			},
			{
				id: 2,
				title: '来信',
				src: 'http://mr1.doubanio.com/c89f1d4ae190e120988d669ab58f4e65/0/fm/song/p2569361_128k.mp3'
			}
		],
		music: {},
		audio: new Audio(),
		progress: 0,
		volume: 0.3,
		buffered: 0
	},
	methods: {
		load(){
			this.audio.src = this.music.src
		},
		play(){
			this.audio.play()
		},
		pause(){
			this.audio.pause()
		},
		replay(){
			this.audio.currentTime = 0
			this.audio.play()
		},
		next(){
			this.music = this.musicLists.find((item)=> {
				return item.id == this.music.id + 1
			})
			this.audio.load()
			this.audio.play()
		},
		volumeAdd(){
			this.audio.volume += 0.1
			console.dir(this.audio)
		},
		volumeMin(){
			this.audio.volume -= 0.1
		}
	},
	created(){
		console.log(this.audio.readyState)
		this.audio.autoplay = true
		this.audio.volume = this.volume
		this.music = this.musicLists[0]
		this.load()
		
		this.audio.currentTime = 0
		this.audio.controls = true
		
		let buffered = 0
		this.audio.addEventListener('timeupdate', (e)=> {
			for (let i = 0; i < this.audio.buffered.length; i++) {
				if (this.audio.currentTime < this.audio.buffered.end(i)) {
					buffered = this.audio.buffered.end(i)
				}
			}
			this.buffered = buffered / this.audio.duration
			this.progress = this.audio.currentTime / this.audio.duration
		});
		
		
	}
	
})