#! /usr/bin/env python
# -*- coding=utf-8 -*-
# @Author pythontab.com

import urllib
import urllib2
import cookielib

import StringIO, gzip   
  
#解压gzip  
def gzdecode(data) :  
    compressedstream = StringIO.StringIO(data)  
    gziper = gzip.GzipFile(fileobj=compressedstream)    
    data2 = gziper.read()   # 读取解压缩后数据   
    return data2

'''
#获取一个保存cookie的对象
cj = cookielib.LWPCookieJar()
#将一个保存cookie对象，和一个HTTP的cookie的处理器绑定
cookie_support = urllib2.HTTPCookieProcessor(cj)
#创建一个opener，将保存了cookie的http处理器，还有设置一个handler用于处理http的URL的打开
opener = urllib2.build_opener(cookie_support, urllib2.HTTPHandler)
#将包含了cookie、http处理器、http的handler的资源和urllib2对象板顶在一起
urllib2.install_opener(opener)
'''
#http://openapi.qzone.qq.com/oauth/show?which=ConfirmPage&display=pc&response_type=code&client_id=101119675

url="http://passport.jikexueyuan.com/connect/qq"
req_header = {
'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0 Iceweasel/38.3.0',
'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
'Accept-Encoding':'gzip, deflate',
'Connection':'keep-alive',
'Referer':'http://www.jikexueyuan.com' #注意如果依然不能抓取的话，这里可以设置抓取网站的host 
}

req_timeout = 5
req = urllib2.Request(url,None,req_header)
try:
    resp = urllib2.urlopen(req,None,req_timeout)
except urllib2.HTTPError, e:
    print e.code
    

info = resp.info()

print info

print resp.url

url = resp.url


data = {'uinArea':'909066038', 'pwdArea':'vlirqin'}



req = urllib2.Request(url,None,req_header)
try:
    data = urllib.urlencode(data)
    resp = urllib2.urlopen(req,data,req_timeout)
except urllib2.HTTPError, e:
    print e.code

info = resp.info()

print info

print resp.url

html = resp.read()
print len(html)

html = gzdecode(html)
with open('qq.html', 'w') as fp:
    fp.write(html)
print len(html)
