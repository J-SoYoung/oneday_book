from flask import Flask, render_template, jsonify, request, json

app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://test:test@localhost', 27017)
db = client.onedayBook



## html 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/saveBook')
def saveBook():
    return render_template('savebook.html')

@app.route('/todayBook')
def todayBook():
    return render_template('todaybook.html')




#todayBook API
@app.route('/recommend', methods=['GET'])
def recommend():
    recommend_list = []

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(
        'http://book.interpark.com/display/TodayWeekOpenReview.do?_method=recommendedBookNew&bid1=17_main&bid2=recomm&bid3=inter&bid4=more',
        headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    book = soup.select_one('.ivListWrap')

    url = book.select_one('.imgWrap > .img > a')['href']
    img = book.select_one('.imgWrap > .img > a > img')['src']
    title = book.select_one('.txtWrap > .tit > p').text
    author = book.select_one('.txtWrap > .writer > span').text
    comment = book.select_one('.txtWrap > .txt_box_1 > p').text
    # print(url, img, title, author, comment)

    # 딕셔너리에 담기
    dic = {'title': title, 'url': url, 'img': img, 'author':author, 'comment':comment}

    # 리스트에 dic추가
    recommend_list.append(dic)
    # print(recommend_list)

    return jsonify({'msg':'data가져오기 성공', 'list': recommend_list})

@app.route('/listshow', methods=['GET'])
def listShow():
    likeList = list(db.likeList.find({}, {'_id': False}).sort('like',-1))
    # print(likeList)

    return jsonify({'msg':'DB 가져오기 성공', 'result':likeList})

@app.route('/like', methods=['POST'])
def likeBtn():
    title_receive = request.form['title_give']
    target_book = db.likeList.find_one({'title': title_receive})
    current_like = target_book['like']
    new_like = current_like + 1

    db.likeList.update_one({'title':title_receive}, {'$set': {'like':new_like}})
    return jsonify({'msg':'좋아요 update'})




#saveBook API
@app.route('/search', methods=['GET'])
def search():
    search_receive = request.args.get('search_give')
    search_list = []

    url = 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=' + search_receive
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    book = soup.select_one('#Search3_Result > .ss_book_box:nth-child(1)')

    img = book.select_one('.i_cover')['src']
    title = book.select_one('.ss_book_list:nth-child(1) ul li .bo3').text
    # print(img, title)

    dic = {'title':title, 'img':img}

    search_list.append(dic)
    return jsonify({'msg':'search성공', 'search_result':search_list})

@app.route('/save', methods=['POST'])
def reviewSave():

    img_receive = request.form['img_give']
    title_receive = request.form['title_give']
    review_receive = request.form['review_give']
    # print(img_receive,title_receive,review_receive)

    dic = {'img':img_receive, 'title':title_receive, 'review':review_receive}
    db.book_review.insert_one(dic)
    return jsonify({'msg':'DB저장'})

@app.route('/save', methods=['GET'])
def reviewShow():
    reviewCard = list(db.book_review.find({}, {'_id': False}))
    # print(likeList)

    # print(reviewCard)
    return jsonify({'review':reviewCard})

@app.route('/delete', methods=['POST'])
def delete():
    del_title = request.form['del_title']
    db.book_review.delete_one({'title': del_title})
    # print(del_title)
    return jsonify({'msg':'DB삭제'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)


