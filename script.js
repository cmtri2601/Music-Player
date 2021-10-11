const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'PLAYER';

const player = $('.player');
const playlist = $('.playlist');
const dashboard = $('.dashboard');
const volumeProgress = $('.volume-progress');
const nameCurrentSong = $('.header h2');
const audio = $('audio');
const cdThumb = $('.cd img');
const toggle = $('.btn-toggle');
const progress = $('.progress');
const next = $('.btn-next i');
const prev = $('.btn-prev i');
const random = $('.btn-random i');
const repeat = $('.btn-repeat i');
const volumeDown = $('.btn-volume .fa-minus');
const volumeUp = $('.btn-volume .fa-plus');


const app = {
    currentSong: 0,
    volume: 40,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            title: "Couting Stars",
            singer: "OneRepublic",
            thumb: "image\\countingstar.jfif",
            audio: "audio\\y2meta.com - [Vietsub+Lyrics] Counting Stars - OneRepublic (64 kbps).mp3"
        },
        {
            title: "Opps",
            singer: "Little Mix",
            thumb: "image\\oops.jfif",
            audio: "audio\\y2meta.com - [Vietsub+Lyrics] Oops - Little Mix (64 kbps).mp3"
        },
        {
            title: "Galway Girl",
            singer: "Ed Sheeran",
            thumb: "image\\galwaygirl.jfif",
            audio: "audio\\y2meta.com - Ed Sheeran - Galway Girl [Official Music Video] (64 kbps).mp3"
        },
        {
            title: "Believer",
            singer: "Imagine Dragon",
            thumb: "image\\believer.jfif",
            audio: "audio\\y2meta.com - Imagine Dragons - Believer (64 kbps).mp3"
        },
        {
            title: "Demons",
            singer: "Imagine Dragon",
            thumb: "image\\demon.jfif",
            audio: "audio\\y2meta.com - Imagine Dragons - Demons (Official Video) (64 kbps).mp3"
        },
        {
            title: "Natural",
            singer: "Imagine Dragon",
            thumb: "image\\natural.jfif",
            audio: "audio\\y2meta.com - Imagine Dragons - Natural (Lyrics) (64 kbps).mp3"
        },
        {
            title: "At Seventeen",
            singer: "Janis lan",
            thumb: "image\\atseventeen.jfif",
            audio: "audio\\y2meta.com - Janis Ian   At Seventeen 17   Lyrics (64 kbps).mp3"
        },
        {
            title: "Lemon tree",
            singer: "Fool's Garden",
            thumb: "image\\lemontree.jfif",
            audio: "audio\\y2meta.com - Lemon Tree - Fools Garden (Lyrics) 🎵 (64 kbps).mp3"
        },
        {
            title: "Cho tôi lang thang",
            singer: "Ngọt vc. Đen",
            thumb: "image\\chotoilangthang.jfif",
            audio: "audio\\y2meta.com - Ngọt vc. Đen - Cho Tôi Lang Thang (64 kbps).mp3"
        },
        {
            title: "Happy",
            singer: "Pharrell Williams",
            thumb: "image\\happy.jfif",
            audio: "audio\\y2meta.com - Pharrell Williams - Happy (Video) (64 kbps).mp3"
        }
    ],

    setConfig(key, value) {
        this.config[key] = value;
    },

    render() {
        const html = this.songs.map((song,index) =>
            `<div class="song song-index-${index}">
                <div class="song-thumb">
                    <img src="${song.thumb}" alt="thumb">
                </div>

                <div class="info">
                    <h2 class="title">${song.title}</h2>
                    <h5 class="singer">${song.singer}</h5>
                </div>

                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        ).join('')

        playlist.innerHTML = html;
    },

    getSong(isNext) {
        let song;
        if (this.isRandom) {
            do {
                song = Math.floor(Math.random() * this.songs.length);
            } while (song === this.currentSong)
        } else {
            if (isNext) {   
                song  = this.currentSong + 1 >= this.songs.length ? 0 : this.currentSong + 1;
            } else {
                song  = this.currentSong - 1 < 0 ? this.songs.length - 1 : this.currentSong - 1;
            }
        }
        return song;
    },
    
    handleEvents() {
        //if use function (): this = btn
        //solution: arrow funtion || bind()
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        player.onscroll = () => {
            //200 is maxheight of cdThumb
            let scrollTop = player.scrollTop;

            let newHeight = 200 - scrollTop < 0 ? 0 : 200 - scrollTop;
            
            cdThumb.style.height = newHeight + 'px';
            cdThumb.style.width = newHeight + 'px';
            cdThumb.style.opacity = newHeight / 200;
        }

        toggle.onclick = () => {
            toggle.style.opacity = 0.8;
            setTimeout(function() {toggle.style.opacity = 1}, 150);
            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        audio.onplay = () => {
            this.isPlaying = true;
            dashboard.classList.add('toggle-active');
            cdThumbAnimate.play();
        }

        audio.onpause = () => {
            this.isPlaying = false;
            dashboard.classList.remove('toggle-active');
            cdThumbAnimate.pause();
        }

        audio.ontimeupdate = () => {
            if (audio.duration) {
                progress.value = audio.currentTime/audio.duration * 100;  
            } else {
                progress.value = 0;
            }
        }

        audio.onended = () => {
            if (this.isRepeat) {
                this.loadCurrentSong();
            } else {
                let isNext = true;
                this.currentSong = this.getSong(isNext);
                this.loadCurrentSong();
            }
        }

        progress.oninput = () => {
            let seekTime = progress.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        }

        next.onclick = () => {
            next.style.opacity = 0.7;
            setTimeout(function() {next.style.opacity = 0.5}, 150);

            let isNext = true;
            this.currentSong = this.getSong(isNext);
            this.loadCurrentSong();
        }

        prev.onclick = () => {
            prev.style.opacity = 0.7;
            setTimeout(function() {prev.style.opacity = 0.5}, 150);

            let isNext = false;
            this.currentSong  = this.getSong(isNext);
            this.loadCurrentSong();
        }

        random.onclick = () => {
            if (this.isRandom) {
                this.isRandom = false;
                random.classList.remove('random-active');
            } else {
                this.isRandom = true;
                random.classList.add('random-active');
            }
        }

        repeat.onclick = () => {
            if (this.isRepeat) {
                this.isRepeat = false;
                repeat.classList.remove('repeat-active');
            } else {
                this.isRepeat = true;
                repeat.classList.add('repeat-active');
            }
        }

        playlist.onclick = (e) => {
            const song = e.target.closest('.song');
            if (song) {
                let index = song.classList[1].slice(11); //11 is length of (song-index-)
                if (this.currentSong !== parseInt(index)) {
                    this.currentSong = parseInt(index);
                    this.loadCurrentSong();
                }
            }
        }

        volumeProgress.oninput = () => {
            this.volume = volumeProgress.value / 100;
            audio.volume = this.volume;
        }

        volumeDown.onclick = () => {
            volumeDown.style.opacity = 0.7;
            setTimeout(function() {volumeDown.style.opacity = 0.5}, 150);

            volumeProgress.classList.add('volume-active');
            setTimeout(function() {volumeProgress.classList.remove('volume-active')}, 2500);

            this.volume = volumeProgress.value;
            this.volume = this.volume - 5 >= 0 ? this.volume - 5 : 0;
            volumeProgress.value = this.volume;
            audio.volume = this.volume / 100;
        }

        volumeUp.onclick = () => {
            volumeUp.style.opacity = 0.7;
            setTimeout(function() {volumeUp.style.opacity = 0.5}, 150);

            volumeProgress.classList.add('volume-active');
            setTimeout(function() {volumeProgress.classList.remove('volume-active')}, 2500);

            this.volume = parseInt(volumeProgress.value);
            this.volume = this.volume + 5 <= 100 ? this.volume + 5 : 100;
            volumeProgress.value = this.volume;
            audio.volume = this.volume / 100;
        }
    },
    loadCurrentSong() {
        //song
        nameCurrentSong.innerHTML = this.songs[this.currentSong].title;
        cdThumb.src = this.songs[this.currentSong].thumb;
        audio.src = this.songs[this.currentSong].audio;
        let promise = audio.play(); 
        promise
            .then()
            .catch(err => console.log(err));

        //volume
        volumeProgress.value = this.volume;

        //Handle song active
        if ($('.song-active')) {
            $('.song-active').classList.remove('song-active');
        }
        $(`.song-index-${this.currentSong}`).classList.add('song-active');


        //Handle scroll active into view
        const songHeight = $('.song').offsetHeight;

        let heightCd = cdThumb.offsetHeight;
        let scrollTop = player.scrollTop;
        let scrollBot = scrollTop + 240;//(600 - (160 + heightCd)); 

        if (this.currentSong * songHeight < scrollTop - (200 - heightCd)) { 
            player.scrollTop = this.currentSong * songHeight + (190 - heightCd);
        } else if ((this.currentSong + 1) * songHeight > scrollBot) {
            player.scrollTop = (this.currentSong - 2) * songHeight - 10; //default is 3 * 74 => get 2
        }
    },
    start() {
        //Handle Events
        this.handleEvents();

        //Render songs
        this.render();

        //debugger;
        //Load current song
        this.loadCurrentSong(); 
    }
}

//debugger;
app.start();