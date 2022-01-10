import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.onedayBook

# (링크 다르게해서 DB저장해놓고 보여주기 )
# 소설 : http://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028005
# 계발 : http://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028016
# 인문 : http://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028013


headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('http://book.interpark.com/display/collectlist.do?_method=BestsellerHourNew201605&bestTp=1&dispNo=028013',
    headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
books = soup.select('.rankBestContentList > ol > li')

for book in books:
    url = "http://book.interpark.com"+(book.select_one('div.coverImage > label > a')['href'])
    img = book.select_one('div.coverImage > label > a > img')['src']
    title = book.select_one('.itemName').text

    dic = {
        'title': title,
        'img': img,
        'url': url,
        'like': 0,
        'username' : 'user',
        'review' : 'review'
    }
    db.likeList.insert_one(dic)


