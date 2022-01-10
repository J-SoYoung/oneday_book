from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.onedayBook

title = '우리는 지금 문학이 필요하다 '
username = '정소영2'
review = '리뷰테스트2'


# db.likeList.update_one({'title': title},{'$set':{'username': username, 'review':review}})
# db.likeList.insert_one({'title': title, 'username': username, 'review':review}) #이렇게 하면 todaybook에 빈..내용보임.


# db.review.insert_one({'title': title, 'username': username, 'review':review})
same_ages = list(db.review.find({'title': title },{'_id':False}))


print((same_ages)[0]['title'])
print((same_ages)[0]['username'])
print((same_ages)[0]['review'])
print((same_ages)[1]['title'])
print((same_ages)[1]['username'])
print((same_ages)[1]['review'])

