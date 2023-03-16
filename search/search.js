

document.querySelector('.search-s').addEventListener('focus',()=>{
    document.querySelector('.searchBox').style.display = 'flex';
})
document.querySelector('.search').addEventListener('click',(e)=>{
    e.stopPropagation();
})

document.querySelector('body').addEventListener('click',()=>{
    document.querySelector('.searchBox').style.display = 'none';
})


//发送请求
async function hotSearch(){
    const res = await fetch(`http://localhost:3000/search/hot/detail`,{
        method : "get",
    })

    const {data} = await res.json();

    return data

}
let SongListDetail=[]
async function hotResult(kw){
    const res = await fetch(`http://localhost:3000/search?keywords=${kw}`,{
        method : "get",
    })
    const data = await res.json();
    console.log(data);
    const {result:{songs}} = data
    console.log(songs);
    
    
    return songs
}

//页面跳转
function changeUrl(){
    window.location.pathname = '/search/mainSearch.html'
}

//节流函数

const throttle = function(fn,wt){
    let isRunning = false
    return async function(args){
        if(!isRunning){
            await fn(args)
            isRunning = true
            setTimeout(()=>{
                isRunning = false
            },wt)
            return isRunning
        }
        else{
            alert('搜索太快')
        }
    }
}

const search_li = document.querySelectorAll('.search__li>li')
//搜索框回车事件
function searchEnter(){
    document.querySelector('.search-s').addEventListener('keypress',async (e)=>{
        if(e.keyCode === 13){
            const searchWord = document.querySelector('input').value
            SongListDetail = SongListDetail.concat(await hotResult(searchWord))
            console.log(SongListDetail);
            sessionStorage.setItem('SongListDetail',JSON.stringify(SongListDetail))
            sessionStorage.setItem('kw',searchWord)
            throttle(hotResult,2000).bind(this,document.querySelector('.search-s').value);
            changeUrl()
        }
    })
}
searchEnter()

//节流-部分
async function hotSearchMake(nodes){
    for(let i = 0;i<8;i++){
        const data = await hotSearch();
        const {searchWord} = await data[i]
        nodes[i].innerHTML = await searchWord;
        nodes[i].addEventListener("click",
            throttle(hotResult,2000).bind(this,searchWord)
        )
        
        nodes[i].addEventListener("click",async ()=>{
            SongListDetail = SongListDetail.concat(await hotResult(searchWord))
            console.log(SongListDetail);
            sessionStorage.setItem('SongListDetail',JSON.stringify(SongListDetail))
            sessionStorage.setItem('kw',searchWord)
            changeUrl()
        })
        
    }
}
hotSearchMake(search_li);
