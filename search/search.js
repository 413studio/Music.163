document.querySelector('.search-s').addEventListener('focus',()=>{

    document.querySelector('.searchBox').style.display = 'flex';
})
document.querySelector('.search-s').addEventListener('blur',()=>{

    document.querySelector('.searchBox').style.display = 'none';
})