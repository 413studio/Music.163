id0 = sessionStorage.getItem('Id');
//音频控制
let timer
let time = sessionStorage.getItem('time')
let audio = document.querySelector('audio');
let i_ = 1;
let songs = document.querySelectorAll('.list');
let number;
let song_title_new = document.querySelectorAll('.song_title_new');
let song_details = [];
let urls = []
let last = document.querySelector('.last');
let start = document.querySelector('.start');
let next = document.querySelector('.next');
let time1 = document.querySelectorAll('.song_time')
let time_dt = [];
let t1
let t0
let actual = document.querySelector('.actual')
audio.src = sessionStorage.getItem('src');
audio.currentTime = sessionStorage.getItem('currentTime');
actual.style.width = sessionStorage.getItem('width')
document.querySelector('.time0').innerHTML = sessionStorage.getItem('time0')
//获取歌曲id
async function get_id() {
    const get_song = await fetch(`http://localhost:3000/playlist/detail?id=${id0}`, {
        method: "get",
    })
    let data = await get_song.json();

    let song_ids = await data.playlist.trackIds;
    console.log(song_ids);
    return song_ids

}


async function play() {

    let song_ids = await get_id();

    for (let s of song_ids) {
        const song = await fetch(`http://localhost:3000/song/detail?ids=${s.id}`)
        let song_detail = await song.json();
        song_details.push(song_detail);
        time_dt.push(song_detail.songs[0].dt);
        let res = await fetch(`http://localhost:3000/song/url?id=${s.id}`);
        let song_url = await res.json();

        let url = song_url.data[0].url;
        urls.push(url);
        if (song_title_new !== null) {
            for (let num = 0; num < songs.length; num++) {

                // 歌曲双击获取url以便播放
                song_title_new[num].addEventListener('dblclick', async () => {
                    // clearInterval(timer);
                    // timer = null;
                    actual.style.width = 0;
                    i_ = 1
                    clearInterval(timer);
                    timer = null;
                    time = 0;
                    document.querySelector('.time0').innerHTML = '0:00';
                    t1 = time_dt[num];

                    // document.querySelector('.song_start').src = '/pics/正在播.png';
                    // document.querySelector('.song_start').style.display = 'block';

                    timer = setInterval(() => {

                        console.log(t1);
                        t0 = time
                        let jd = jingdu0();
                        let baseTime = new Date(time);
                        let sec = '';
                        sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
                        document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
                        sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
                        sessionStorage.setItem('width', jd);
                        sessionStorage.setItem('currentTime', time / 1000)
                        time = time + 1000;
                    }, 1000)
                    audio.src = urls[num];
                    sessionStorage.setItem('src', urls[num]);
                    audio.load();
                    setTimeout(() => {
                        audio.play();
                        document.querySelector('.start').src = '/pics/暂停.png';
                        document.querySelector('.start').title = '暂停';
                    }, 500)
                    number = num;
                    //底部样式改变
                    changeSong(num, song_details)
                    //判断歌曲是否结束
                    setInterval(() => {
                        if (t0 >= t1) {
                            number += 1
                            t1 = time_dt[number];
                            console.log("结束");
                            clearInterval(timer);
                            timer = null;
                            actual.style.width = 0;
                            document.querySelector('.time0').innerHTML = '0:00';
                            sessionStorage.setItem('time0', '0:00');
                            start.src = '/pics/播放2.png';
                            start.title = '播放';
                            i_ = 1

                            changeSong(number, song_details);
                            audio.src = urls[number];
                            sessionStorage.setItem('src', urls[number]);
                            audio.load();
                            setTimeout(() => {
                                audio.play();
                                document.querySelector('.start').src = '/pics/暂停.png';
                                document.querySelector('.start').title = '暂停';
                            }, 500)
                            clearInterval(timer);
                            time = 0;
                            timer = setInterval(() => {
                                t0 = time
                                t1 = time_dt[number];
                                jingdu0();
                                let baseTime = new Date(time);
                                let sec = '';
                                sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
                                document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
                                sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec)
                                sessionStorage.setItem('currentTime', time / 1000)
                                time = time + 1000;
                            }, 1000)

                        }
                    }, 1000)
                })
            }
        }

    }
    console.log(song_details);
}
play();

//时间处理函数
function timeMake(time) {
    let baseTime = new Date(time);
    let sec = '';
    sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
    let t = baseTime.getMinutes() + ':' + sec;
    return t

}
//样式改变
function changeSong(number, song_details) {
    //底部时间变化
    document.querySelector('.time0').innerHTML = '0:00';
    let t = timeMake(time_dt[number])
    document.querySelector('.time1').innerHTML = t;


    sessionStorage.setItem("song_time", t);

    //歌曲封面
    document.querySelector('.left_bottom>img').src = song_details[number].songs[0].al.picUrl;
    //本地短暂存储样式
    sessionStorage.setItem("song_pic", song_details[number].songs[0].al.picUrl);
    //歌曲名字
    document.querySelector('.song_name').innerHTML = song_details[number].songs[0].name;
    //本地短暂存储样式
    sessionStorage.setItem("song_name", song_details[number].songs[0].name);
    //歌手
    document.querySelector('.singer').innerHTML = song_details[number].songs[0].ar[0].name;
    sessionStorage.setItem("singer", song_details[number].songs[0].ar[0].name);
}




//底部播放等的样式

last.addEventListener('mouseover', () => {
    last.src = '/pics/上一首1.png';
})
last.addEventListener('mouseleave', () => {
    last.src = '/pics/上一首.png';
})
last.addEventListener('click', () => {
    if (number === 0) {
        alert('没有上一首了')
    }
    number -= 1;
    clearInterval(timer);
    timer = null;
    t1 = time_dt[number];
    actual.style.width = 0;
    document.querySelector('.time0').innerHTML = '0:00';
    sessionStorage.setItem('time0', '0:00');
    start.src = '/pics/播放2.png';
    start.title = '播放';
    i_ = 1

    changeSong(number, song_details);
    audio.src = urls[number];
    sessionStorage.setItem('src', urls[number]);
    audio.load();
    setTimeout(() => {
        audio.play();
        document.querySelector('.start').src = '/pics/暂停.png';
        document.querySelector('.start').title = '暂停';
    }, 500)
    clearInterval(timer);
    time = 0;
    timer = setInterval(() => {
        t0 = time
        t1 = time_dt[number];
        jingdu0();
        let baseTime = new Date(time);
        let sec = '';
        let jd = jingdu0();
        sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
        document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
        sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
        sessionStorage.setItem('width', jd);
        sessionStorage.setItem('currentTime', time / 1000)
        time = time + 1000;
    }, 1000)

    //判断歌曲是否结束

    setInterval(() => {
        if (t0 >= t1) {
            console.log("结束");
            number += 1;


            clearInterval(timer);
            timer = null;
            actual.style.width = 0;
            document.querySelector('.time0').innerHTML = '0:00';
            sessionStorage.setItem('time', '0:00');
            start.src = '/pics/播放2.png';
            start.title = '播放';
            i_ = 1

            changeSong(number, song_details);
            audio.src = urls[number];
            sessionStorage.setItem('src', urls[number]);
            audio.load();
            setTimeout(() => {
                audio.play();
                document.querySelector('.start').src = '/pics/暂停.png';
                document.querySelector('.start').title = '暂停';
            }, 500)
            clearInterval(timer);
            time = 0;
            timer = setInterval(() => {
                t0 = time
                t1 = time_dt[number];
                let jd = jingdu0();
                let baseTime = new Date(time);
                let sec = '';
                sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
                document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
                sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
                sessionStorage.setItem('currentTime', time / 1000)
                sessionStorage.setItem('width', jd);
                time = time + 1000;
            }, 1000)
        }
    })
})

next.addEventListener('mouseover', () => {
    next.src = '/pics/下一首1.png';
})
next.addEventListener('mouseleave', () => {
    next.src = '/pics/下一首.png';
})
next.addEventListener('click', () => {
    if (number === urls.length) {
        alert('没有下一首了')
    }
    number += 1;
    t1 = time_dt[number];
    clearInterval(timer);
    timer = null;
    actual.style.width = 0;
    document.querySelector('.time0').innerHTML = '0:00';
    sessionStorage.setItem('time0', '0:00');
    start.src = '/pics/播放2.png';
    start.title = '播放';
    i_ = 1

    changeSong(number, song_details);
    audio.src = urls[number];
    sessionStorage.setItem('src', urls[number]);
    audio.load();
    setTimeout(() => {
        audio.play();
        document.querySelector('.start').src = '/pics/暂停.png';
        document.querySelector('.start').title = '暂停';
    }, 500)
    clearInterval(timer);
    time = 0;
    timer = setInterval(() => {
        let jd = jingdu0();
        t0 = time
        t1 = time_dt[number];

        let baseTime = new Date(time);
        let sec = '';
        sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
        document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
        sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
        sessionStorage.setItem('currentTime', time / 1000)
        sessionStorage.setItem('width', jd);
        time = time + 1000;
    }, 1000)

    //判断歌曲是否结束

    setInterval(() => {
        if (t0 >= t1) {
            console.log("结束");
            number += 1;
            t1 = time_dt[number];
            clearInterval(timer);
            timer = null;
            actual.style.width = 0;
            document.querySelector('.time0').innerHTML = '0:00';
            sessionStorage.setItem('time', '0:00');
            start.src = '/pics/播放2.png';
            start.title = '播放';
            i_ = 1

            changeSong(number, song_details);
            audio.src = urls[number];
            sessionStorage.setItem('src', urls[number]);
            audio.load();
            setTimeout(() => {
                audio.play();
                document.querySelector('.start').src = '/pics/暂停.png';
                document.querySelector('.start').title = '暂停';
            }, 500)
            clearInterval(timer);
            time = 0;
            timer = setInterval(() => {
                t0 = time
                let jd = jingdu0();
                let baseTime = new Date(time);
                let sec = '';
                sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
                document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
                sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
                sessionStorage.setItem('width', jd);
                sessionStorage.setItem('currentTime', time / 1000)
                time = time + 1000;
            }, 1000)
        }
    })
})



start.addEventListener('click', () => {
    time = sessionStorage.getItem('currentTime') * 1000
    if (i_ == 0) {
        start.src = '/pics/暂停.png';
        start.title = '暂停';
        audio.play();
        i_ = 1;
        clearInterval(timer);
        timer = setInterval(() => {
            let jd = this.jingdu0();
            t0 = time
            console.log(time);
            let baseTime = new Date(time);
            let sec = '';
            sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
            document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
            sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);
            sessionStorage.setItem('width', jd);
            sessionStorage.setItem('currentTime', time / 1000)
            time = time + 1000;
        }, 1000)



    } else {
        start.src = '/pics/播放2.png';
        start.title = '播放';
        audio.pause();
        i_ = 0;
        clearInterval(timer);
        timer = null;

    }
})




//进度条显示
function jingdu0() {

    actual.style.width = `${(t0/t1)*100}%`;
    sessionStorage.setItem('width', (t0 / t1) * 100);
    return `${(t0/t1)*100}%`
}

//音量显示
let louder = document.querySelector('.louder');
let loud_pic = document.querySelector('.right_bottom>img');
let loud = document.querySelector('.loud');
let label1 = document.querySelector('.label1');
loud_pic.addEventListener('click', () => {
    if (sessionStorage.getItem('volume') !== 0) {
        audio.volume = 0;
        loud.style.height = 0 + 'px';
        loud_pic.src = "/pics/静音.png"
    } else {
        audio.volume = sessionStorage.getItem('volume')
        loud.style.height = sessionStorage.getItem('volume') * 100
        loud_pic.src = "/pics/音量.png"
    }


})
loud_pic.addEventListener('mouseover', () => {
    loud.style.display = 'flex';
    label1.style.display = 'block'
    louder.addEventListener('mouseover', () => {
        loud.style.display = 'flex';
        label1.style.display = 'block'

    })
    louder.addEventListener('mouseleave', () => {
        loud.style.display = 'none';
        label1.style.display = 'none'
    })
})
loud_pic.addEventListener('mouseleave', () => {
    loud.style.display = 'none';
    label1.style.display = 'none'
})

//进度拖拽

function moveY(node) {
    function move(e) {
        loud_pic.src = "/pics/音量.png"
        diffY = 742 - e.clientY;
        loud.style.height = diffY + 'px';
        audio.volume = diffY / 100;
        sessionStorage.setItem('volume', diffY / 100);

    }
    //点击位移
    louder.addEventListener('mousedown', (e0) => {
        move(e0)
    })
    //拖拽
    node.addEventListener('mousedown', () => {
        node.onmousemove = function (e) {

            move(e)
        }


    })
    louder.addEventListener('mouseup', () => {


        node.onmousemove = null;


    })
}
let total = document.querySelector('.total')
let label2 = document.querySelector('.label2');

function moveX(node) {
    function move(e) {



        let diffX = e.clientX - 548;
        actual.style.width = diffX + 'px';

        sessionStorage.setItem('width', `${diffX/300}%`)

        time = (diffX / 300) * t1;

        audio.currentTime = time / 1000;
        console.log(audio.currentTime);
        sessionStorage.setItem('currentTime', time / 1000)
        let baseTime = new Date(time);
        let sec = '';
        sec = baseTime.getSeconds() >= 10 ? (sec = baseTime.getSeconds()) : (sec = '0' + baseTime.getSeconds())
        document.querySelector('.time0').innerHTML = baseTime.getMinutes() + ':' + sec;
        sessionStorage.setItem('time0', baseTime.getMinutes() + ':' + sec);

    }
    //点击位移
    total.addEventListener('mousedown', (e0) => {
        move(e0)

    })
    //拖拽
    node.addEventListener('mousedown', () => {
        total.onmousemove = function (e) {
            move(e)

        }

    })
    total.addEventListener('mouseup', () => {
        total.onmousemove = null;

    })
}
moveY(label1);
moveX(label2)