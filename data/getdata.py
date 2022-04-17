import requests
import json

# list of characters
# listChars = [
#     'a', 'b', 'c', 'd', 'e',
#     'f', 'g', 'h', 'i', 'j',
#     'k', 'l', 'm', 'n', 'o',
#     'p', 'q', 'r', 's', 't',
#     'u', 'v', 'w', 'x', 'y', 'z'
# ]

# init dictionary
dictWords = {}
i = 0  # combination
j = 0  # successfully get data

with open("init.json") as infile:
    listWords = json.load(infile)

# for word in listWords:
#     link = f'https://api-kbbi.herokuapp.com/{word}'
#     resp = requests.get(link)
#     data = resp.content
#     dataJSON = json.loads(data)
#     status = dataJSON['status']
#     if status == True:
#         word = word.upper()
#         dictWords[word] = dataJSON['data'][0]
#         j += 1
#     i += 1
#     print(i, j, link, dictWords, status)

errorMsg = 'memudahkan pencarian Anda melalui berbagai fitur yang hanya tersedia bagi pengguna terdaftar'
for word in listWords:
    link = f'https://api-kbbi.herokuapp.com/{word}'
    resp = requests.get(link)
    data = resp.content
    dataJSON = json.loads(data)
    status = dataJSON['data'][0][0]['artiKata'][0]
    if status != errorMsg:
        word = word.upper()
        dictWords[word] = dataJSON['data'][0][0]
        j += 1
    i += 1
    print(i, j, word)


# combine characters
# for a in listChar:
#     for b in listChar:
#         for c in listChar:
#             for d in listChar:
#                 for e in listChar:
#                     word = a + b + c + d + e
#                     resp = requests.get(
#                         f'https://new-kbbi-api.herokuapp.com/cari/{word}')
#                     data = resp.content
#                     dataJSON = json.loads(data)
#                     status = dataJSON['status']
#                     if status == True:
#                         word = word.upper()
#                         dictWords[word] = dataJSON['data'][0]
#                         j += 1
#                     i += 1
#                     print(i, j, word)

# export to JSON file
with open('data.json', 'w') as outfile:
    json.dump(dictWords, outfile)
