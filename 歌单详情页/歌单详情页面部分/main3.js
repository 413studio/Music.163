document.querySelector('.left_bottom>img').src = sessionStorage.getItem('song_pic');
document.querySelector('.song_name').innerHTML = sessionStorage.getItem('song_name');
document.querySelector('.singer').innerHTML = sessionStorage.getItem('singer');
document.querySelector('.time1').innerHTML = sessionStorage.getItem('song_time');
document.querySelector('.time0').innerHTML = sessionStorage.getItem('time');
document.querySelector('.actual').style.width = sessionStorage.getItem('width');
document.querySelector('audio').src = sessionStorage.getItem('src')
let id0 = sessionStorage.getItem('Id');
console.log(id0);
let head_left_pic = document.querySelector('.head_left_pic')
let title = document.querySelector('.title');
let creator_avatar = document.querySelector('.creator_avatar');
let creator_name = document.querySelector('.creator_name');
let creattime = document.querySelector('.creattime');
let tag = document.querySelector('.tag>a')
let songs_number = document.querySelector('.songs_number>span');
let play_number = document.querySelector('.play_number>span');
let introduction = document.querySelector('.introduction>div');
let int_img = document.querySelector('.introduction img');
//get请求获取相关内容
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
async function main_list_message(){
    const get_list = await fetch(`http://localhost:3000/playlist/detail?id=${id0}`,{
        method : "get",
    })
    let data = await get_list.json();
    console.log(data);
    head_left_pic.src = data.playlist.coverImgUrl;
    title.innerHTML = data.playlist.name;
    creator_avatar.src = data.playlist.creator.avatarUrl;
    creator_name.innerHTML = data.playlist.creator.nickname;
    songs_number.innerHTML = data.playlist.trackCount;
    play_number.innerHTML = count(data.playlist.playCount);
    introduction.innerHTML = '简介：'+data.playlist.description;
    let tags = '';
    //标签的小处理
    for(let t of data.playlist.tags){
        tags += `${t}/`;
    }
    tags = tags.substring(0,tags.length-1);
    tag.innerHTML = tags;
    //创建时间的小处理
    let baseTime = data.playlist.createTime;
    let t = new Date(baseTime);
    creattime.innerHTML = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() +'-' + '创建'
}
//简介的隐藏和展开
let cot = 0
int_img.addEventListener('click',()=>{
    if(cot==0){
        int_img.src = "/图片/上箭头.png";
        introduction.classList.add('of_app');
        introduction.classList.remove('of_hid');
        cot = 1
    }
    else{
        int_img.src = "/图片/下箭头.png";
        introduction.classList.add('of_hid');
        introduction.classList.remove('of_app');
        cot = 0
    }
})
main_list_message()
//歌曲获取与插入
let list = document.createElement('div');
async function songs_get(){
    const get_song = await fetch(`http://localhost:3000/playlist/detail?id=${id0}`,{
        method : "get",
    })
    let data = await get_song.json();
    
    let song_ids = data.playlist.trackIds;
    console.log(song_ids);
    let num = 1;
    for(let s of song_ids){
        const song = await fetch(`http://localhost:3000/song/detail?ids=${s.id}`,{
            method : "get",
        })
        let song_detail = await song.json();

        //节点的创造和插入
        //节点克隆一下前面的,加内容
        let base = document.querySelector('.list0');
        let new_song = base.cloneNode(true);
        new_song.classList.remove('list0');
        new_song.classList.add('list');
        let song_spans = new_song.childNodes;
        song_spans[1].classList.add('song_title_new');
        song_spans[1].style.cursor = 'pointer';
       
       
        song_spans[1].innerHTML = song_detail.songs[0].name;
        song_spans[3].innerHTML = song_detail.songs[0].ar[0].name;
        song_spans[3].classList.add('player');
        song_spans[5].innerHTML = song_detail.songs[0].al.name;
        song_spans[5].classList.add('al');
        //歌曲时间的处理

        let baseTime = new Date(song_detail.songs[0].dt);
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
    //导入底部的js
    let  JSElement=document.createElement("script");
 
    JSElement.setAttribute("type","text/javascript");
 
    JSElement.setAttribute("src","/主页面/底部部分/bottom.js");
    
    document.body.appendChild(JSElement);
}
songs_get();   






//精彩评论获取
let comment_title = document.querySelector('.comment_title');
let comments_hot = document.querySelector('.comments_hot');
async function get_comment_hot(){
    const comment = await fetch(`http://localhost:3000/comment/hot?id=${id0}&type=2`,{
        method : "get",
    })
    let comment_detail = await comment.json();
   
    if(comment_detail.hotComments.length==0){
        comment_title.style.display = 'none';
        comments_hot.style.display = 'none';
    }
    else{
        comment_title.style.display = 'block';
        comments_hot.style.display = 'block';
    }
    return comment_detail;
}
//最新评论获取

async function get_comment_new(page){
    const comment = await fetch(`http://localhost:3000/comment/playlist?id=${id0}&offset=${page}`,{
        method : "get",
    })
    let comment_detail_new = await comment.json();

    comments_hot.style.display = 'block';
    
    return comment_detail_new;
}
//评论插入热门
function comments_mk(detail){
    let comment_new = document.createElement('div');
    comment_new.className = 'comment_new';
    let comment_pic = document.createElement('img');
    comment_pic.className = 'comment_pic';
    //主要评论
    let main_comment = document.createElement('div');
    main_comment.className = 'main_comment';
    //评论人和头像
    let commenter = document.createElement('div');
    commenter.className = 'commenter';
    let comment_id = document.createElement('span');
    comment_id.className = 'comment_id';
    let comment_main = document.createElement('span');
    comment_main.className = 'com';
    //评论时间
    let comment_time = document.createElement('div');
    comment_time.className = 'comment_time';
    let time = document.createElement('span');
    let callback = document.createElement('img');
    callback.src = "/图片/回复.png";
    callback.className = 'callback';
    //节点插入
    commenter.appendChild(comment_id);
    commenter.appendChild(comment_main);
    comment_time.appendChild(time);
    comment_time.appendChild(callback);
    main_comment.appendChild(commenter);
    main_comment.appendChild(comment_time);
    comment_new.appendChild(comment_pic);
    comment_new.appendChild(main_comment);
    comment_pic.src = detail.user.avatarUrl;
    comment_id.innerHTML = detail.user.nickname+'：';
    comment_id.style.cursor = "default";
    comment_main.innerHTML = detail.content;
    
    //分秒处理
    let baseTime = new Date(detail.time);
    let h = '';
    baseTime.getMinutes()>=10 ? (h=baseTime.getMinutes()):(h='0'+baseTime.getMinutes())
    time.innerHTML = detail.timeStr+' '+baseTime.getHours()+':'+h;
    return comment_new;
}

//最新评论插入
function comments_mk2(detail){
    let comment_new = document.createElement('div');
    comment_new.className = 'comment_new';
    let comment_pic = document.createElement('img');
    comment_pic.className = 'comment_pic';
    //主要评论
    let main_comment = document.createElement('div');
    main_comment.className = 'main_comment';
    //评论人和头像
    let commenter = document.createElement('div');
    commenter.className = 'commenter';
    let comment_id = document.createElement('span');
    comment_id.className = 'comment_id';
    let comment_main = document.createElement('span');
    comment_main.className = 'com';
    //评论时间
    let comment_time = document.createElement('div');
    comment_time.className = 'comment_time';
    let time = document.createElement('span');
    let callback = document.createElement('img');
    callback.src = "/图片/回复.png";
    callback.className = 'callback';
    //节点插入
    commenter.appendChild(comment_id);
    commenter.appendChild(comment_main);
    comment_time.appendChild(time);
    comment_time.appendChild(callback);
    main_comment.appendChild(commenter);
    main_comment.appendChild(comment_time);
    comment_new.appendChild(comment_pic);
    comment_new.appendChild(main_comment);
    comment_pic.src = detail.user.avatarUrl;
    comment_id.innerHTML = detail.user.nickname+'：';
    comment_id.style.cursor = "default";
    comment_main.innerHTML = detail.content;
    
    //分秒处理
    let baseTime = new Date(detail.time);
    let h = '';
    baseTime.getMinutes()>=10 ? (h=baseTime.getMinutes()):(h='0'+baseTime.getMinutes())
    time.innerHTML = detail.timeStr+' '+baseTime.getHours()+':'+h;
    return comment_new;
}



//评论页显示
let comment = document.querySelector('.comment_none');
let songs_list_none = document.querySelector('.songs_list_none');
let comment_page = document.querySelector('.comment_page');
let list_page = document.querySelector('.list_page');
let list_bottom = document.querySelector('.list_bottom')
comment.addEventListener('click',async ()=>{
    comment.classList.add('comment');
    songs_list_none.classList.remove('songs_list');
    list_page.style.display = 'none'
    comment_page.style.display = 'block'
    let details = await get_comment_hot();
    
   
    for(let i = 0;i<details.hotComments.length;i++){
        let comment_hot = comments_mk(details.hotComments[i]);
        document.querySelector('.comments_hot').appendChild(comment_hot);
    }
    let details2 = await get_comment_new(0);
    
    for(let i1 = 0;i1<20;i1++){
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    list_bottom.style.display = 'flex';
    
})
songs_list_none.addEventListener('click',()=>{
    comment.classList.remove('comment');
    songs_list_none.classList.add('songs_list');
    list_page.style.display = 'block'
    comment_page.style.display = 'none'
    list_bottom.style.display = 'none';
})
//评论更新分页，先删除原先的，再增加新的
let last_lists = document.querySelector('.last_lists');
let page0 = document.querySelector('.page0');
let page1 = document.querySelector('.page1');
let page2 = document.querySelector('.page2');
let page3 = document.querySelector('.page3');
let page4 = document.querySelector('.page4');
let page5 = document.querySelector('.page5');
let page6 = document.querySelector('.page6');
let page7 = document.querySelector('.page7');
let next_lists = document.querySelector('.next_lists');
let count0;
page0.addEventListener('click',async ()=>{
    count0 = 0;
    page0.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
    }
    for(let i1 = 0;i1<20;i1++){
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})

page1.addEventListener('click',async ()=>{
    count0 = 1;
    page1.classList.add('page_on');
    page0.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);

    }
    window.scrollTo(0,0)
})
page2.addEventListener('click',async ()=>{
    count0 = 2;
    page2.classList.add('page_on');
    page1.classList.remove('page_on');
    page0.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
       
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
page3.addEventListener('click',async ()=>{
    count0 = 3;
    page3.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page0.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
page4.addEventListener('click',async ()=>{
    count0 = 4;
    page4.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page0.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
       
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
page5.addEventListener('click',async ()=>{
    count0 = 5;
    page5.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page0.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
page6.addEventListener('click',async ()=>{
    count0 = 6;
    page6.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page0.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页1.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
page7.addEventListener('click',async ()=>{
    count0 = 7;
    page7.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page0.classList.remove('page_on');
    last_lists.src = "/图片/上一页1.png" ;
    next_lists.src = "/图片/下一页.png";
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})


//前后按钮翻页
let pages = document.querySelectorAll('.pages div');

next_lists.addEventListener('click',async ()=>{
    if(count0<7){
        pages[count0].classList.remove('page_on');
        pages[count0+1].classList.add('page_on');
    }
    count0++
    if(count0==7){
        last_lists.src = "/图片/上一页1.png" ;
        next_lists.src = "/图片/下一页.png";
    }
    else{
        last_lists.src = "/图片/上一页1.png" ;
        next_lists.src = "/图片/下一页1.png";
    }
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})
last_lists.addEventListener('click',async ()=>{
    if(count0>0){
        pages[count0].classList.remove('page_on');
        pages[count0-1].classList.add('page_on');
    }
    count0--
    if(count0==0){
        last_lists.src = "/图片/上一页.png" ;
        next_lists.src = "/图片/下一页1.png";
    }
    else{
        last_lists.src = "/图片/上一页1.png" ;
        next_lists.src = "/图片/下一页1.png";
    }
    let details2 = await get_comment_new(count0*20);
    for(let i2 = 0;i2<20;i2++){
        document.querySelector('.comments_new').removeChild(document.querySelectorAll('.comments_new > div')[0]);
      

    }
    for(let i1 = 0;i1<20;i1++){
        
        let comment_new = comments_mk2(details2.comments[i1]);
        document.querySelector('.comments_new').appendChild(comment_new);
    }
    window.scrollTo(0,0)
})

 
