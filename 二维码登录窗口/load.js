
let timer0
//登录弹窗样式
let step = (time) => {
   
    return new Promise((resolve) =>{
        setTimeout(() => {
            resolve('二维码扫码登录');
        },time)
    })
}
async function pic_change(){
   
    let a = await step(3000);
    document.querySelector('.right_pic_new').classList.add('right_pic_old');
    document.querySelector('.right_pic_new').classList.remove('right_pic_new');
    document.querySelector('.main_img_new').classList.add('main_img_old');
    document.querySelector('.main_img_new').classList.remove('main_img_new');
    document.querySelector('.left_pic_new').classList.add('left_pic_old');
    document.querySelector('.left_pic_new').classList.remove('left_pic_new');
    document.querySelector('.right_pic_old').addEventListener('mouseover',()=>{
        document.querySelector('.right_pic_old').classList.add('right_pic_new');
        document.querySelector('.right_pic_old').classList.remove('right_pic_old');
        document.querySelector('.main_img_old').classList.add('main_img_new');
        document.querySelector('.main_img_old').classList.remove('main_img_old');
        document.querySelector('.left_pic_old').classList.add('left_pic_new');
        document.querySelector('.left_pic_old').classList.remove('left_pic_old');
        document.querySelector('.left_pic_new').addEventListener('mouseover',()=>{
            document.querySelector('.right_pic_old').classList.add('right_pic_new');
            document.querySelector('.right_pic_old').classList.remove('right_pic_old');
            document.querySelector('.main_img_old').classList.add('main_img_new');
            document.querySelector('.main_img_old').classList.remove('main_img_old');
            document.querySelector('.left_pic_old').classList.add('left_pic_new');
            document.querySelector('.left_pic_old').classList.remove('left_pic_old');
        })
        document.querySelector('.left_pic_new').addEventListener('mouseleave',()=>{
            document.querySelector('.right_pic_new').classList.add('right_pic_old');
            document.querySelector('.right_pic_new').classList.remove('right_pic_new');
            document.querySelector('.main_img_new').classList.add('main_img_old');
            document.querySelector('.main_img_new').classList.remove('main_img_new');
            document.querySelector('.left_pic_new').classList.add('left_pic_old');
            document.querySelector('.left_pic_new').classList.remove('left_pic_new');
        })
        
    });
    document.querySelector('.right_pic_old').addEventListener('mouseleave',()=>{
        document.querySelector('.right_pic_new').classList.add('right_pic_old');
        document.querySelector('.right_pic_new').classList.remove('right_pic_new');
        document.querySelector('.main_img_new').classList.add('main_img_old');
        document.querySelector('.main_img_new').classList.remove('main_img_new');
        document.querySelector('.left_pic_new').classList.add('left_pic_old');
        document.querySelector('.left_pic_new').classList.remove('left_pic_new');
    });
}
pic_change();

document.querySelector('.over').addEventListener('click',()=>{
    document.querySelector('.load').style.display = 'none';
})

//检查二维码状态
async function checkStatus(key) {
    const res = await axios({
      url: `http://localhost:3000/login/qr/check?key=${key}&timerstamp=${Date.now()}`,
    })
    return res.data
  }
  //登录状态查询
  async function getLoginStatus(cookie = '') {
    const res = await axios({
      url: `http://localhost:3000/login/status?timerstamp=${Date.now()}`,
      method: 'post',
      data: {
        cookie,
      },
    })
    console.log(res.data);
    //判断是否处于登录状态
    if(res.data.data.profile !== null){
      clearInterval(timer0);
      timer0 = null;
      // const res3 = await axios({
      //   url: `http://localhost:3000/user/subcount?timerstamp=${Date.now()}`,
      // })
      // console.log(res3.data);
      await this.left_change(res.data.data.account.id);
    }
    this.user_cg(res.data.data);
    
    
    document.querySelector('.load').classList.remove('load');
  }
  
  //登录二维码

  async function login() {
    

    const cookie = sessionStorage.getItem('cookie');
    this.getLoginStatus(cookie);
    
    const res = await axios({
      url: `http://localhost:3000/login/qr/key?timerstamp=${Date.now()}`,
    })
    const key = res.data.data.unikey
    const res2 = await axios({
      url: `http://localhost:3000/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`,
    })
    document.querySelector('.pic_load').src = res2.data.data.qrimg

    timer0 = setInterval(async () => {
      const statusRes = await this.checkStatus(key)
      if (statusRes.code === 800) {
        clearInterval(timer0);
        timer0 = null;
        login();
     
      }
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        console.log(1);
        clearInterval(timer0);
        timer0 = null;
        document.querySelector('.load').style.display = 'none';
        await this.getLoginStatus(statusRes.cookie);
        sessionStorage.setItem('cookie', statusRes.cookie);
        
      }
    }, 3000)
  }
login()


//弹窗获得
document.querySelector('.name').addEventListener('click',()=>{
    document.querySelector('.load').style.display = 'flex';
})



//登录后页面改变
function user_cg(data){
    document.querySelector('.user_pic').src = data.profile.avatarUrl;
    document.querySelector('.name').innerHTML = data.profile.nickname;
}

//用户歌单查询
async function getUserDetial(id){
    const res1 = await axios({url:`http://localhost:3000/user/playlist?uid=${id}&timerstamp=${Date.now()}`});
    console.log(res1.data);
    return res1.data.playlist;
}
//侧边栏改变
async function left_change(id){
    let playList = await getUserDetial(id);
    console.log(playList);
    document.querySelector('.mk').addEventListener(('click'),()=>{
        sessionStorage.setItem('Id',playList[0].id);
      })
    //创建歌单节点
    for(let i = 1;i<playList.length;i++){
      let my_list = document.createElement('div'); //我的歌单
      my_list.className = 'mylike';
      let my_list_pic = document.createElement('img');
      my_list_pic.src = "/图片/歌单.png";
      my_list_pic.className = 'mylike0';
      let my_list_name = document.createElement('a')
      my_list_name.href = '/歌单详情页/歌单详情页.html';
      my_list_name.innerHTML = playList[i].name;
      my_list_name.className = 'Mylist';
      my_list_name.addEventListener(('click'),()=>{
        sessionStorage.setItem('Id',playList[i].id);
      })
      my_list.appendChild(my_list_pic);
      my_list.appendChild(my_list_name);
      document.querySelector('.left_box3').appendChild(my_list)
    }
}
