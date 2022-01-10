
// nav username 저장
const navUsername = document.querySelector('.nav_username')
const saveUsername = localStorage.getItem('username')
    if(saveUsername !== null){
      navUsername.innerText = `${saveUsername}님의 서재`
    }else{
     navUsername.innerText = 'BOOKLIST'
    }


$(document).ready(function () {
    recommend();
    listshow()
});

function recommend() {
    $.ajax({
        type: "GET",
        url: "/recommend",
        data: {},
        success: function (response) {
            console.log(response['msg']);
            // console.log(response['list']);
            let list = response['list']
            let title = list[0]['title']
            let url = list[0]['url']
            let img = list[0]['img']
            let author = list[0]['author']
            let comment = list[0]['comment']
            // console.log(title,url,img,author,comment)
            let temp_html =
                `<div class="book_recommend">
                  <p class="today_title">오늘,<br>추천도서</p>
                  <a href="${url}">자세히 보기</a>
                </div>
                <div class="today_img"><img src="${img}"></div>
                <div class="book_info">
                  <p class="name">${title}</p>
                  <p class="author">${author}</p>
                  <p class="text">줄거리 <p class="text_cont">${comment}</p></p>
                </div>`
            $('.today_book').append(temp_html)
        }
    })
}

function listshow() {
    $.ajax({
        type: "GET",
        url: "/listshow",
        data: {},
        success: function (response) {
            let likeList = response["result"]
            for (let i = 0; i<likeList.length; i++) {
                let title = likeList[i]['title']
                let img = likeList[i]['img']
                let url = likeList[i]['url']
                let like = likeList[i]['like']
                // console.log(title,img,url)
                let temp_html =
                    `<div class="list">
                  <a href="${url}" target="_blank">
                    <img class="list_img" src="${img}">
                    <p class="list_title">${title}</p>
                  </a>
                  <p class="list_like">좋아요
                    <button class="list_likebtn" onclick="like_btn('${title}')">
                    ${like} <i class="fas fa-heart"></i>
                    </button>
                  </p>
                </div>`
                $('.book_list').append(temp_html)
            }
        }
    })
}

function like_btn(title) {
    $.ajax({
        type: "POST",
        url: "/like",
        data: {title_give: title},
        success: function (response) { // 성공하면
            console.log(response["msg"]);
            window.location.reload()
        }
    })
}
