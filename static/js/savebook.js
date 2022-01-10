// nav username 저장
const navUsername = document.querySelector('.nav_username')
const saveUsername = localStorage.getItem('username')
    if(saveUsername !== null){
      navUsername.innerText = `${saveUsername}님의 서재`
    }else{
     navUsername.innerText = 'BOOKLIST'
    }

// search
function searchBar() {
    let search = $('.searchBar_input').val()
    $.ajax({
        type: "GET",
        url: "/search?search_give="+search,
        data: {},
        success: function (response) {
            console.log(response["msg"]);
            // console.log(response["search_result"]);
            let result = response["search_result"][0];
            let title = result['title']
            let temp_title = `<span class="info_title_text">${title}</>`
            $('.info_title').append(temp_title)

            let img = result['img']
            let temp_img = `<img class="input_img_result" src="${img}">`
            $('.input_img').append(temp_img)
        }
    })
}

// review
$(document).ready(function () {
    reviewShow();
});

function reviewSave() {
    let bookImg = $('.input_img_result').attr('src')
    let title = $('.info_title_text').text()
    let review = $('.info_review').val()

    $.ajax({
        type: "POST",
        url: "/save",
        data: {img_give:bookImg, title_give:title, review_give:review},
        success: function (response) { // 성공하면
            alert(response["msg"]);
            window.location.reload();
        }
    })
}

function reviewShow() {
    $.ajax({
        type: "GET",
        url: "/save",
        data: {},
        success: function (response) {
            // console.log(response["review"]);
            let saveReview = response["review"]
            for (let i=0; i<=saveReview.length; i++){
                let title = saveReview[i]['title']
                let img = saveReview[i]['img']
                let review = saveReview[i]['review']
                // console.log(title,img,review)
                let temp_html =
                    `<div class="card">
                    <img src="${img}">
                    <div class="card_cont">
                      <div class="card_info">
                        <div class="card_book">
                          <p class="title">${title}</p>
                          <p class="score">평점</p>
                        </div>
                        <button class="card_del" onclick="deleteCard('${title}')">del</button>
                      </div>
                      <div class="card_review">
                        <p class="review_tit">한줄평</p>
                        <p class="review_text">${review}</p>
                      </div>
                    </div>
                  </div>`
                $('.review_card').append(temp_html)
            }
        }
    })
}

function deleteCard(title) {
    $.ajax({
        type: "POST",
        url: "/delete",
        data: {del_title: title},
        success: function (response) { // 성공하면
            alert(response["msg"]);
            window.location.reload()
        }
    })
}


// 읽고싶은 책 목록
const wishInput = document.querySelector('#wish_list input');
const listPlus = document.querySelector('#wish_list .plus');
const todoBooklist = document.querySelector('.todo_booklist')

let wishList = [];

function saveBooklist(){
    localStorage.setItem('wishBook',JSON.stringify(wishList))
}
function handleDelete(e){
    const li = e.target.parentElement;
    li.remove();
    wishList = wishList.filter((wish) => wish.id !== parseInt(li.id))
    console.log(li)
    saveBooklist()
}
function handleSuccess(e){
    const successBook = document.querySelector('#success_list .todo_booklist')
    const li = e.target.parentElement;
    li.classList.add('list');
    successBook.appendChild(li)
    // li.style.textDecoration = 'line-through';
}

function paintWish(wishNew){
  const li =document.createElement('li');
  li.id = wishNew.id
  const span =document.createElement('span');
  const BTN_X = document.createElement('button');
  const BTN_LIST = document.createElement('button');

    BTN_X.innerText = '❌';
    BTN_LIST.innerText = '✅';
    BTN_X.classList.add('XBtn')
    BTN_LIST.classList.add('listBtn')
    li.appendChild(BTN_LIST);
    li.appendChild(span);
    span.innerText = wishNew.wishBook;
    li.appendChild(BTN_X);
    todoBooklist.appendChild(li);
    li.classList.add('list');
    // console.log(todoBook);

    BTN_X.addEventListener('click', handleDelete)
    BTN_LIST.addEventListener('click', handleSuccess)
}

function listAdd(){
    const wishNew = wishInput.value;
    if (wishNew === ""){
        alert('읽고 싶은 책을 써 주세요')
        return
        wishInput.focus();
    }
    wishInput.value = "";
    wishInput.focus();
    const wishNewObj={
        wishBook: wishNew,
        id: Date.now()
    };
    wishList.push(wishNewObj);
    paintWish(wishNewObj);
    saveBooklist();
}
listPlus.addEventListener("click",listAdd)
wishInput.addEventListener('keyup',(e)=>{
    const ENTER = 13
    if (e.keyCode === ENTER){
        listAdd()
    }
})

const savedList = localStorage.getItem('wishBook')
if (savedList !== null){
    const parseList = JSON.parse(savedList);
    wishList = parseList;
    // console.log(parseList)
    parseList.forEach(paintWish)
}