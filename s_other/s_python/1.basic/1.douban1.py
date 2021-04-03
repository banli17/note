import requests


def get_url_name(myurl):
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
    headers = {}
    headers['user-agent'] = user_agent

    response = requests.get(myurl, headers=headers)

    print(response)  # <Response [200]>
    # print(response.text)

    from bs4 import BeautifulSoup as bs

    bs_info = bs(response.text, 'html.parser')  # bs 还可以用 lxml 引擎解析(第三方、快、容错高)
    # div = bs_info.find_all('div', attrs={'class': 'pl2'})
    # print(div)

    for tags in bs_info.find_all('div', attrs={'class': 'pl2'}):
        # 获取 a 标签
        # a_tag = tags.contents[1]
        # print(a_tag)
        # 这里 tag 也继承了 bs_info 的方法
        for atag in tags.find_all('a', ):
            # 获取所有链接
            print(atag.get('href'))
            # 获取图书名字
            print(atag.get('title'))


# 翻页 https://book.douban.com/top250?start=25
# for page in range(10):
#   key[x] = y
# 简易写法
# range(10) -> 会产生 [0, 10)
urls = tuple(f'https://book.douban.com/top250?start={page * 25}' for page in range(10))

from time import sleep

# 如果入口执行的是当前文件，则 __name__ 是 main
if __name__ == '__main__':
    for page in urls:
        get_url_name(page)
        sleep(5)
