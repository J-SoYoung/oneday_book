import requests
from bs4 import BeautifulSoup


headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('http://book.interpark.com/display/TodayWeekOpenReview.do?_method=recommendedBookNew&bid1=17_main&bid2=recomm&bid3=inter&bid4=more',
    headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
book = soup.select_one('.ivListWrap')

url = book.select_one('.imgWrap > .img > a')['href']
img = book.select_one('.imgWrap > .img > a > img')['src']
title = book.select_one('.txtWrap > .tit > p').text
author = book.select_one('.txtWrap > .writer > span').text
comment = book.select_one('.txtWrap > .txt_box_1 > p').text

# print(url, img, title, author, comment)
print(f'링크 : {url}')
print(f'이미지 : {img}')
print(f'제목 : {title}')
print(f'작가 : {author}')
print(f'코멘트 : {comment}')

    # dic = {'img': img, 'title': title, 'writer': writer, 'url': (f"http://book.interpark.com{url}")}
    # booklist.append(dic)
    # print(book.text)

# return jsonify({'booklist': booklist})