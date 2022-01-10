import requests
from bs4 import BeautifulSoup

search_receive = '기획자의 습관'
url = 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=' + search_receive
headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(url, headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
book = soup.select_one('#Search3_Result > .ss_book_box:nth-child(1)')

img = book.select_one('.i_cover')['src']
title = book.select_one('.ss_book_list:nth-child(1) ul li .bo3').text

print(img, title)





