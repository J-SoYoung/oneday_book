# oneday_book_PJ
# 오늘 독서

2022.01~
오늘은 어떤 책을 읽으면 좋을까? 
- 책 추천기능
- 내가 읽을 책 list 정리
- 읽고 난 후, 서평작성

사용한 기술
- HTML, CSS, JavaScript 
- bootstrap 
- ajax
- pymongo
- python 웹스크래핑


# 프레임워크
![image](https://user-images.githubusercontent.com/85012454/155479966-dc4d2888-940a-435b-b56e-0c01688c5e7c.png)


# 결과물

## 메인화면
 - 랜덤한 배경, 시간 / 날짜 자동입력
 - storage에 간단하게 닉네임만 저장해두고, 닉네임 맞으면 패스
![image](https://user-images.githubusercontent.com/85012454/155480329-6ce5a0bc-5ac0-4831-85b4-1b452f493f4f.png)



## 추천 페이지
- 오늘 추천도서 -> python 웹스크래핑으로 도서목록 가져와서 보여줌 
- 아래 추천도서 리스트 -> 좋아요 기능으로 숫자가 높은 순으로 정렬됨
![image](https://user-images.githubusercontent.com/85012454/155480445-79ba743e-e70d-4d6d-834c-166b4b641b71.png)



## MyBOOK 페이지
- 읽고 싶은 책 목록 -> 읽고 싶은 책을 입력 가능
- 초록 네모클릭 : 완독한 책리스트로 이동, 빨간 X : 리스트삭제 기능
- 북 리스트 : 검색기능 -> python 웹 스크래핑으로 검색한 책 데이터 가지고옴
- DB저장 -> 도서명, 작가, 책 감상평을 DB에 저장한 뒤 아래 리스트로 보여줌
![image](https://user-images.githubusercontent.com/85012454/155479904-b6ecf5bf-7987-4c13-9048-a1c218d14c52.png)

 
 
## 아쉬운 점 
- 로그인, 로그아웃 부분이 많이 어설프다. 나 혼자 테스트하는 용도로밖에 사용할 수 없음이! ㅋㅋㅋ
- 로그인방식은 어떻게 해봐야되는건지 공부를 좀 해봐야겠따..
- 읽고 싶은 책 목록ㅋㅋ 투두리스트 따라했는데. 넘 못생겼다 ㅋㅋㅋ
