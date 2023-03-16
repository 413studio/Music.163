document.querySelector('.left_bottom>img').src = sessionStorage.getItem('song_pic');
document.querySelector('.song_name').innerHTML = sessionStorage.getItem('song_name');
document.querySelector('.singer').innerHTML = sessionStorage.getItem('singer');
document.querySelector('.time1').innerHTML = sessionStorage.getItem('song_time')
document.querySelector('.time0').innerHTML = sessionStorage.getItem('time');

document.querySelector('audio').src = sessionStorage.getItem('src')
// 首页轮播图

async function get_pics(){
    const a = await fetch("http://localhost:3000/homepage/block/page", {
    method: "get",
});
    data = await a.json();
    console.log(data);
    let pic_urls = data.data.blocks;
    let pic_url = new Array(7);
    pic_urls = pic_urls[0].extInfo.banners;
    for(let i = 0;i<7;i++){
        pic_url[i] = pic_urls[i].pic;
    }
    
    return pic_url
}


// for(let i=0;i<lis.length;i++) {
//     lis[i].addEventListener('mouseover',function(){
//     lis[i].classList.add('li1');
// })
//     lis[i].addEventListener('mouseleave',function(){
//     lis[i].classList.remove('li1');
// })
// }


let left = document.querySelector('.left');
let right = document.querySelector('.right');
let pic = document.querySelector('.pic');
pic.addEventListener('mouseover',function(){
    left.style.display = 'block';
    right.style.display = 'block';
})

pic.addEventListener('mouseleave',function(){
    left.style.display = 'none';
    right.style.display = 'none';
})
let left_pic = document.querySelector('.left_pic');
let main_pic = document.querySelector('.main_pic');
let right_pic = document.querySelector('.right_pic');
let behind = document.querySelector('.behind');

async function set_pic(){
    
    let arr_pic = await get_pics();   //轮播图
    left_pic.src = arr_pic[6];
    right_pic.src = arr_pic[1];
    main_pic.src = arr_pic[0];
    
    
    }
set_pic();
let a1 = 2;
let a2 = 5;
let i = 0;
function chang_r(){
    
    lis[i].classList.remove('li1')
   
    if(i+1>6){
        lis[0].classList.add('li1');
    }
    else{
        lis[i+1].classList.add('li1');
    }
    
    i += 1;
    if(i>6){
        i = i-7;
    }
    
}
function change_l(){
    
    lis[i].classList.remove('li1')
    
    if(i-1<0){
        lis[6].classList.add('li1');
    }
    else{
        lis[i-1].classList.add('li1');
    }
    i -= 1;
    if(i<0){
        i = i+7
    }
    
}
let lis = document.querySelectorAll('.list li'); //  点
async function change_right(){
    let left_pic = document.querySelector('.left_pic');
    let main_pic = document.querySelector('.main_pic');
    let right_pic = document.querySelector('.right_pic');
    let behind = document.querySelector('.behind');
    left_pic.classList.add('behind');
    left_pic.classList.remove('left_pic')
    main_pic.classList.add('left_pic');
    main_pic.classList.remove('main_pic');
    right_pic.classList.add('main_pic');
    right_pic.classList.remove('right_pic');
    behind.classList.add('right_pic');
    behind.classList.remove('behind');
    chang_r();
    let arr_pic = await get_pics();
    behind.src = await arr_pic[a1]
    if(a1+1>6){
        a1 = a1+1-7;
    }
    else{
        a1 += 1;
    }
    if(a2+1>6){
        a2 = a2+1-7;
    }
    else{
        a2 += 1;
    }
    
}
console.log(window.location.pathname);

async function change_left(){
    let left_pic = document.querySelector('.left_pic');
    let main_pic = document.querySelector('.main_pic');
    let right_pic = document.querySelector('.right_pic');
    let behind = document.querySelector('.behind');
    left_pic.classList.add('main_pic');
    left_pic.classList.remove('left_pic');
    main_pic.classList.add('right_pic');
    main_pic.classList.remove('main_pic');
    right_pic.classList.add('behind');
    right_pic.classList.remove('right_pic');
    behind.classList.add('left_pic');
    behind.classList.remove('behind');
    
    change_l();
    let arr_pic = await get_pics();
    behind.src = await arr_pic[a2];
    if(a2-1<0){
        a2 = a2-1+7;
    }
    else{
        a2 -= 1;
    }
    if(a1-1<0){
        a1 = a1-1+7;
    }
    else{
        a1 -= 1;
    }
    
  
    
}
left.addEventListener('click',change_left);
right.addEventListener('click',change_right);
//自动播放
let timeone = setInterval(function(){
    change_right();
    },3000);
pic.addEventListener('mouseover',()=>{
    clearInterval(timeone);
    timeone = null; 
})
pic.addEventListener('mouseleave',()=>{
    clearInterval(timeone);
    timeone = setInterval(function(){
        change_right();
    },3000);
})
//计算播放数
function count(number){
    if(number>10000){
        number = parseInt(number/10000) + '万';
    }
    else{
        number = number;
    }
    return number;
}

let img = document.querySelectorAll('.rec_pic')
//歌单封面
async function list_recommends(){
    const b = await fetch('http://localhost:3000/top/playlist?limit=10&order=hot',{
        method:"get",
    });
    let data = await b.json();
    console.log(data);  
    
  
    let p = document.querySelectorAll('.recommend>p')
    let number = document.querySelectorAll('.number')
   
    for(let i_0 = 0;i_0<10;i_0++){
        img[i_0].src = data.playlists[i_0].coverImgUrl;
        p[i_0].innerHTML = data.playlists[i_0].name;
        //id保存
        
        img[i_0].addEventListener('click',()=>{
            let id0 = data.playlists[i_0].id;
            
            sessionStorage.setItem('Id',id0);
        })
        

        let n = parseInt(data.playlists[i_0].playCount);
        let num = count(n);
        number[i_0].innerText = num;
    }

}
list_recommends();
//歌单按钮
let recommend = document.querySelectorAll('.recommend');
let but = document.querySelectorAll('.but');
console.log(but);
function button(){
    for(let i1=0;i1<10;i1++){
    
    recommend[i1].addEventListener('mouseover',()=>{
        but[i1].classList.add("appear");
    })
    recommend[i1].addEventListener('mouseleave',()=>{
        but[i1].classList.remove("appear");
    })

}
}
button();

//新歌速递

async function getNewSong(){
    let songs = [];
    let res = await fetch('http://localhost:3000/top/song?type=0');
    let data = await res.json();
    
    for(let song of data.data){
        songs.push(song);
    }
    for(let i = 0;i<12;i++){
        document.querySelectorAll('.sp')[i].src = songs[i].album.picUrl;
        document.querySelectorAll('.nm')[i].innerHTML =  songs[i].name;
        document.querySelectorAll('.Singer')[i].innerHTML = songs[i].artists[0].name;
        
    }
    
    
}
getNewSong();



