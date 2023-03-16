const SongDetail = JSON.parse(sessionStorage.getItem('SongListDetail'))
console.log(SongDetail);
document.querySelector('h2').innerHTML = sessionStorage.getItem('kw')
let list = document.createElement('div');
async function songs_get(){
    let num = 1;
    for(let s of SongDetail){
        
        let song_detail = s

        //节点的创造和插入
        //节点克隆一下前面的,加内容
        let base = document.querySelector('.list0');
        let new_song = base.cloneNode(true);
        new_song.classList.remove('list0');
        new_song.classList.add('list');
        let song_spans = new_song.childNodes;
        song_spans[1].classList.add('song_title_new');
        song_spans[1].style.cursor = 'pointer';


        song_spans[1].innerHTML = song_detail.name;
        song_spans[3].innerHTML = song_detail.artists[0].name;
        song_spans[3].classList.add('player');
        song_spans[5].innerHTML = song_detail.album.name;
        song_spans[5].classList.add('al');
        //歌曲时间的处理

        let baseTime = new Date(song_detail.duration);
        let sec = '';
        baseTime.getSeconds()>=10 ? (sec=baseTime.getSeconds()):(sec='0'+baseTime.getSeconds())
        song_spans[7].classList.add('song_time');
        song_spans[7].innerHTML = baseTime.getMinutes()+':'+sec;
        //加俩个原本没有的节点
        let song_start = document.createElement('img');
        song_start.className = 'song_start';
        song_start.style.display = 'none';
        let song_number = document.createElement('span');
        song_number.className = 'song_number';
        if(num<10){
            song_number.innerHTML = '0' + num;
            num += 1;
        }
        else{
            song_number.innerHTML = `${num}`;
            num += 1;
        }
        new_song.insertBefore(song_number,song_spans[0]);
        new_song.insertBefore(song_start,song_number);
        //最后加入到list节点的结尾
        list.appendChild(new_song);
    }
    let list_page = document.querySelector('.list_page');
    list_page.appendChild(list);
    
}
songs_get();   