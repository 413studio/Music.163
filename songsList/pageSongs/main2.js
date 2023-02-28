document.querySelector('.left_bottom>img').src = sessionStorage.getItem('song_pic');
document.querySelector('.song_name').innerHTML = sessionStorage.getItem('song_name');
document.querySelector('.singer').innerHTML = sessionStorage.getItem('singer');
document.querySelector('.time1').innerHTML = sessionStorage.getItem('song_time')
document.querySelector('.time0').innerHTML = sessionStorage.getItem('time');
document.querySelector('.actual').style.width = sessionStorage.getItem('width');
document.querySelector('audio').src = sessionStorage.getItem('src')

//点击换主pics
let category = document.querySelectorAll('.categorys div');
let list_head_pic = document.querySelector('.list_head_pic');
for(let i=0;i<8;i++){
    category[i].addEventListener('click',()=>{
        list_head_pic.src = `/songsList/picSongs/${i}.png`;
    })
}

//处理歌单
//计算播放数
function count(number){
    if(number>100000000){
        number = parseInt(number/100000000) + '亿';
    }
    else if(number>10000){
        number = parseInt(number/10000) + '万';
    }
    else{
        number = number;
    }
    return number;
}


//歌单封面以及作者还有播放数的获取
async function list_recommends(tag,offset){
    const b = await fetch(`http://localhost:3000/top/playlist?limit=50&order=hot&cat=${tag}&offset=${offset}`,{
        method:"get",
    });
    let data = await b.json();
    console.log(data);
    let img = document.querySelectorAll('.rec_pic')
  
    let p = document.querySelectorAll('.recommend>p');
    let number = document.querySelectorAll('.number');
    let author = document.querySelectorAll('.author');
    for(let i_0 = 0;i_0<50;i_0++){
        img[i_0].src = data.playlists[i_0].coverImgUrl;
        p[i_0].innerHTML = data.playlists[i_0].name;
        let n = parseInt(data.playlists[i_0].playCount);
        let num = count(n);
        //id保存
        img[i_0].addEventListener('click',()=>{
            let id0 = data.playlists[i_0].id;
            
            sessionStorage.setItem('Id',id0);
        })
        number[i_0].innerText = num;
        author[i_0].innerText = data.playlists[i_0].creator.nickname;
    }

}
list_recommends('华语',0);
//歌单按钮
let recommend = document.querySelectorAll('.recommend');
let but = document.querySelectorAll('.but');
console.log(but);
function button(){
    for(let i1=0;i1<50;i1++){
    
    recommend[i1].addEventListener('mouseover',()=>{
        but[i1].classList.add("appear");
    })
    recommend[i1].addEventListener('mouseleave',()=>{
        but[i1].classList.remove("appear");
    })

}
}
button();

let type = '华语';
let count0 = 0
//分类歌单
function new_list(){
    list_recommends(type,count0);
}
let category0 = document.querySelector('.category0');
let category1 = document.querySelector('.category1');
let category2 = document.querySelector('.category2');
let category3 = document.querySelector('.category3');
let category4 = document.querySelector('.category4');
let category5 = document.querySelector('.category5');
let category6 = document.querySelector('.category6');
let category7 = document.querySelector('.category7');
//分类，需要把类别颜色变化，分页按钮恢复原来样子
//初始化函数，用于选分类的时候初始化下面的分页按钮
function new_list(){
    count0 = 0;
    page0.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
}
category0.addEventListener('click',()=>{
    category0.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category0.innerHTML,0);
    type = category0.innerHTML;
    new_list();
})
category1.addEventListener('click',()=>{
    category1.style.color = 'rgb(236, 65, 65)';
    category0.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category1.innerHTML,0);
    type = category1.innerHTML;
    new_list();
});
category2.addEventListener('click',()=>{
    category2.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category2.innerHTML,0);
    type = category2.innerHTML;
    new_list();
});
category3.addEventListener('click',()=>{
    category3.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category3.innerHTML,0);
    type = category3.innerHTML;
    new_list();
});
category4.addEventListener('click',()=>{
    category4.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category4.innerHTML,0);
    type = category4.innerHTML;
    new_list();
});
category5.addEventListener('click',()=>{
    category5.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category5.innerHTML,0);
    type = category5.innerHTML;
    new_list();
});
category6.addEventListener('click',()=>{
    category6.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    category7.style.color = 'rgb(89, 89, 89)';
    list_recommends(category6.innerHTML,0);
    type = category6.innerHTML;
    new_list();
});
category7.addEventListener('click',()=>{
    category7.style.color = 'rgb(236, 65, 65)';
    category1.style.color = 'rgb(89, 89, 89)';
    category2.style.color = 'rgb(89, 89, 89)';
    category3.style.color = 'rgb(89, 89, 89)';
    category4.style.color = 'rgb(89, 89, 89)';
    category5.style.color = 'rgb(89, 89, 89)';
    category6.style.color = 'rgb(89, 89, 89)';
    category0.style.color = 'rgb(89, 89, 89)';
    list_recommends(category7.innerHTML,0);
    type = category7.innerHTML;
    new_list();
});
//分页按钮

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

page0.addEventListener('click',()=>{
    count0 = 0;
    page0.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})

page1.addEventListener('click',()=>{
    count0 = 1;
    page1.classList.add('page_on');
    page0.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page2.addEventListener('click',()=>{
    count0 = 2;
    page2.classList.add('page_on');
    page1.classList.remove('page_on');
    page0.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page3.addEventListener('click',()=>{
    count0 = 3;
    page3.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page0.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page4.addEventListener('click',()=>{
    count0 = 4;
    page4.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page0.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page5.addEventListener('click',()=>{
    count0 = 5;
    page5.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page0.classList.remove('page_on');
    page6.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page6.addEventListener('click',()=>{
    count0 = 6;
    page6.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page0.classList.remove('page_on');
    page7.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页1.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
page7.addEventListener('click',()=>{
    count0 = 7;
    page7.classList.add('page_on');
    page1.classList.remove('page_on');
    page2.classList.remove('page_on');
    page3.classList.remove('page_on');
    page4.classList.remove('page_on');
    page5.classList.remove('page_on');
    page6.classList.remove('page_on');
    page0.classList.remove('page_on');
    last_lists.src = "/pics/上一页1.png" ;
    next_lists.src = "/pics/下一页.png";
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})


//前后按钮翻页
let pages = document.querySelectorAll('.pages div');

next_lists.addEventListener('click',()=>{
    if(count0<7){
        pages[count0].classList.remove('page_on');
        pages[count0+1].classList.add('page_on');
    }
    count0++
    if(count0==7){
        last_lists.src = "/pics/上一页1.png" ;
        next_lists.src = "/pics/下一页.png";
    }
    else{
        last_lists.src = "/pics/上一页1.png" ;
        next_lists.src = "/pics/下一页1.png";
    }
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
last_lists.addEventListener('click',()=>{
    if(count0>0){
        pages[count0].classList.remove('page_on');
        pages[count0-1].classList.add('page_on');
    }
    count0--
    if(count0==0){
        last_lists.src = "/pics/上一页.png" ;
        next_lists.src = "/pics/下一页1.png";
    }
    else{
        last_lists.src = "/pics/上一页1.png" ;
        next_lists.src = "/pics/下一页1.png";
    }
    list_recommends(type,50*count0);
    window.scrollTo(0,0)
})
