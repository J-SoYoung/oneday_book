const titleDay = document.querySelector('.main_title .title_day')
const titleWeekend = document.querySelector('.main_title .title_weekend')
const clock = document.querySelector('.main_clock .clock')
const AMPM = document.querySelector('.main_clock .AMPM') 

//달력-----------------------
function today(){
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()

  titleDay.textContent = (`${month}월 ${day}일` )
}
today()


function weekend(){
  const date = new Date()
  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const weekDay = week[date.getDay()] 

  titleWeekend.textContent = (weekDay)
}
weekend()

//시계-----------------------
function timeAMPM(){
  const today = new Date().getHours
    if (today < 12){
      AMPM.textContent = 'am'
    } else {
      AMPM.textContent = 'pm'
    }  
}
timeAMPM()


function getTime(){
  const date = new Date()
  const hours = String(date.getHours()).padStart(2,'0')
  const minutes = String(date.getMinutes()).padStart(2,'0') 
  const second = String(date.getSeconds()).padStart(2,'0') 

  clock.textContent = (`${hours} : ${minutes} : ${second}`)
}
getTime()
setInterval(getTime, 1000)


//랜덤한 메인이미지-----------------------
const mainImg = document.querySelector('.main_bg')
const images = [ 
  'bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 
  'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg' 
];
const randomImg = images[Math.floor(Math.random()*images.length)];
const bgImage = document.createElement("img");
bgImage.src = `../static/img/${randomImg}`;
mainImg.appendChild(bgImage)


// 로그인 창 생성-----------------------
// function loginHandler() {
//   if ($("#login").css("display") == "none") {
//       $("#login").show();
//   } else {
//       $("#login").hide();
//   }
// }

// 간단 로그인 -----------------------
const loginFrom = document.querySelector('#login');
const userid = document.querySelector('.userid');
const loginSubmit = document.querySelector('.login_submit');
const welcomeBox = document.querySelector('.welcome');
const welcomeTitle = document.querySelector('.welcome .wel_title');

const HIDDEN = 'hidden'


function loginHandler() {
  loginFrom.classList.remove(HIDDEN)
  welcomeBox.classList.add(HIDDEN)
}

const saveUsername = localStorage.getItem('username')
if(saveUsername !== null){
  welcomeBox.classList.remove(HIDDEN)
  welcomeTitle.innerText = `welcome ${saveUsername}`
}


function handleSubmit(e){
  const username = userid.value;
  e.preventDefault();

  if(username === ''){
    alert('닉네임을 입력해주세요');
  }else if (username.length > 12){
    alert('닉네임은 12자 이내로 작성해주세요');
    userid.focus();
  }else{
    loginFrom.classList.add(HIDDEN)
    console.log(username)
    welcomeBox.classList.remove(HIDDEN)
    localStorage.setItem('username', username)
    welcomeTitle.innerText = `welcome ${username}`
    }
}
loginSubmit.addEventListener('click',handleSubmit)


