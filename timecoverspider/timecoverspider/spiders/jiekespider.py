#!python
# coding=utf-8

# import the necessary packages
import urllib
from timecoverspider.items import MagazineCover
import datetime
import scrapy
import time
import re
import qqlib

from scrapy.http.cookies import CookieJar

from bs4 import BeautifulSoup

class JikeSpider(scrapy.Spider):
	name = "jike-spider"
	start_urls = ["http://passport.jikexueyuan.com/connect/qq"]
	#start_urls = ["http://www.jikexueyuan.com"]
	dest_url = "http://ke.jikexueyuan.com/zhiye/ios/"

	STEP = 'INIT'
	is_logined = 0
	user = 909066038
	pwd = 'vlirqin'

	#BASE INFO
	appid=716027609
	action='2-7-' + str(int(time.time()))
	state=''
	client_id=101119675
	#URL

	xloginurl='http://xui.ptlogin2.qq.com/cgi-bin/xlogin'
	checkurl2='http://check.ptlogin2.qq.com/check'
	loginjumpurl='http://openapi.qzone.qq.com/oauth/login_jump'
	feedbackurl='http://support.qq.com/write.shtml?fid=780&SSTAG=www.jikexueyuan.com.appid101119675'
	loginurl2='http://ptlogin2.qq.com/login'
	authurl='https://graph.qq.com/oauth2.0/authorize'
	appsupporturl='http://appsupport.qq.com/cgi-bin/appstage/mstats_report'
	reporturl='http://cgi.connect.qq.com/report/report_vm'

	def fetch(self, url, data=None, cookies=None, **kw):
		if data is None:
			func = self.session.get
		else:
			kw['data'] = data
			func = self.session.post
		return func(url, **kw)

	def genurl(self, oriurl, params):
		url = oriurl + '?'+ urllib.urlencode(params)
		return url

	def getkeyfromcookie(self, response, key):
		cookies = response.headers.getlist('Set-Cookie')
		for item in cookies:
			reg = key + '=(.*?)\;'
			t = re.findall(reg, item)
			if len(t) > 0:
				return t[0]
		return ''

	def gettoken(self, skey):
		str = skey
		hash = 5381
		for i in str:
			t = (hash << 5) + ord(i)
			hash = hash + t
		return hash & 0x7fffffff

	def parse(self, response):

		if self.STEP == 'INIT':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			self.state = re.findall('&state=(.*?)\&', response.url)[0]
			self.client_id = re.findall('&client_id=(.*?)\&', response.url)[0]

			#?appid=716027609&style=23&login_text=授权并登录&hide_title_bar=1&hide_border=1&target=self&s_url=http://openapi.qzone.qq.com/oauth/login_jump&pt_3rd_aid=101119675&pt_feedback_link=http://support.qq.com/write.shtml?fid=780&SSTAG=www.jikexueyuan.com.appid101119675
			params = {
            'appid': self.appid,
            'style': 23,
			'login_text': '授权并登录',
            'hide_title_bar': 1,
			'target': 'self',
			's_url': self.loginjumpurl,
			'pt_3rd_aid': 101119675,
            'pt_feedback_link': self.feedbackurl,
			}
			url = self.genurl(self.xloginurl,params)
			yield scrapy.Request(url, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves

			self.STEP = 'XLOGIN'
		elif self.STEP == 'XLOGIN':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			self.pt_login_sig = self.getkeyfromcookie(response, 'pt_login_sig')
			#GET /check?regmaster=&pt_tea=1&pt_vcode=1&uin=909066038&appid=716027609&js_ver=10138&js_type=1&login_sig=6*d0PfHlaCk9wcqRt1diUu94fNStHN*zaUujdam*-Y9bAegZRbdjYmphbCgVn*B8&u1=http://openapi.qzone.qq.com/oauth/login_jump
			params = {
	            'regmaster': '',
				'pt_tea': 1,
	            'pt_vcode': 1,
				'uin': self.user,
				'appid': self.appid,
				'js_ver': 10120,
				'js_type': 0,
	            'login_sig': self.pt_login_sig,
				'u1': self.loginjumpurl,
			}
			url = self.genurl(self.checkurl2,params)
			yield scrapy.Request(url, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves

			self.STEP = 'CHECK'

		elif self.STEP == 'CHECK':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			g = response.body
			v = re.findall('\'(.*?)\'', g)
			vcode = v[1]
			uin = v[2]

			#/login?u=909066038&verifycode=!OVV&pt_vcode_v1=0&pt_verifysession_v1=95acfe9e4e59152feb350ef9065c844acb6881fc7c4915fc96ce9bc91a05b75b0e1b66838644b89cfdf95f4e17b1f657fd43b304d390b2b4&p=YNMEEekeNoSmg9XjMRICahp6OF8iPOYcfytn7Yu
			if v[0] == '1':	# verify code needed
				vcode = ''#self.getVerifyCode(vcode)

			qq=qqlib.QQ(0,'')

			p = qq.pwdencode(vcode, uin, self.pwd)

			self.ptvfsession = self.getkeyfromcookie(response, 'ptvfsession')
			params = {
			'u': self.user,
			'verifycode': vcode,
			'pt_vcode_v1': 0,
			'pt_verifysession_v1': self.ptvfsession,
			'p': p,
			'pt_randsalt': 0,
			'u1': self.loginjumpurl,
			'ptredirect': 0,
			'h': 1,
            't': 1,
			'g': 1,
			'from_ui': 1,
			'ptlang': 2052,
            'action': self.action,
			'js_ver': 10138,
            'js_type': 0,
            'login_sig': self.pt_login_sig,
            'pt_uistyle': 33,
			'aid': self.appid,
			'pt_3rd_aid': 101119675,
			}

			url = self.genurl(self.loginurl2,params)
			yield scrapy.Request(url, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves

			self.STEP = 'LOGINJUMP'
		elif self.STEP == 'LOGINJUMP':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			#http://openapi.qzone.qq.com/oauth/login_jump
			yield  scrapy.Request(self.loginjumpurl, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves
			self.STEP = 'APPSUPPORT'

		elif self.STEP == 'APPSUPPORT':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			#GET /cgi-bin/appstage/mstats_report?report_type=4&platform=8&app_id=101119675&result=0&act_type=2&uin=909066038&login_status=2&via=1&t=1445954929841 HTTP/1.1\r\n
			params = {
			'report_type': '4',
			'platform': 8,
			'app_id': '101119675',
            'result': 0,
            'act_type': 2,
            'uin': self.user,
            'login_status': 2,
            'via': 1,
            't': int(time.time()),
			}

			url = self.genurl(self.appsupporturl,params)
			yield  scrapy.Request(url, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves

			self.STEP = 'REPORT'

		elif self.STEP == 'REPORT':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			params = {
			'tag': 0,
			'log': '101119675_10613_0',
			't': int(time.time()),
			}
			url = self.genurl(self.reporturl,params)
			yield  scrapy.Request(url, self.parse, meta = {'dont_merge_cookies': True, 'cookie_jar': self.cookieJar})
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves
			self.STEP = 'AUTH'

		elif self.STEP == 'AUTH':
			self.cookieJar = response.meta.setdefault('cookie_jar', CookieJar())
			self.cookieJar.extract_cookies(response, response.request)
			token = self.gettoken(self.cookieJar._cookies['.qq.com']['/']['skey'].value)
			data = {
				'response_type': 'code',
				'client_id': '101119675',
				'redirect_uri': 'http://passport.jikexueyuan.com/connect/success?t=qq',
	            'scope': 'get_user_info',
	            'state': str(self.state),
	            'src': '1',
	            'update_auth': '1',
	            'openapi': '80901010',
	            'g_tk': str(token),
	            'auth_time': str(int(time.time())),
	            'ui': '556F791F-682E-47B7-BC66-CE179327DB04',#'DE9C804E-F36C-4680-ABD0-03895211E761',
			}
			cookies = {
				#'pgv_pvid': 3911671856,
				#'_ga': GA1.2.152333712.1445835401,
				#'ptui_loginuin': 909066038,
				#'pgv_si': s357849088,
				#'o_cookie': 909066038,
				#'pgv_pvi': 3149474816,

				'RK': self.cookieJar._cookies['.qq.com']['/']['RK'].value,
				'pt2gguin': 'o0909066038',
				'pt_clientip': self.cookieJar._cookies['.qq.com']['/']['pt_clientip'].value,
				'pt_serverip': self.cookieJar._cookies['.qq.com']['/']['pt_serverip'].value,
				'ptcz': self.cookieJar._cookies['.qq.com']['/']['ptcz'].value,
				'ptisp': 'ctc',
				'uin': 'o0909066038',
				'skey': self.cookieJar._cookies['.qq.com']['/']['skey'].value,
			}

			yield  scrapy.FormRequest(self.authurl, callback=self.parse, method='POST', formdata=data, cookies=cookies)
			#yield  scrapy.FormRequest(self.authurl, callback=self.parse, method='POST', formdata=data, cookies=cookies)
			#self.cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves
			self.STEP = 'END'

		elif self.STEP == 'END':
			g = response.body
			print g

			yield scrapy.Request(self.dest_url, self.parse_main)

		else:
			yield scrapy.Request(None, self.parse)
			STEP = 'INIT'

		body = response.body
		#print body
		#if self.is_logined == 0:
		#self._process_login( response)
		#else:
		#	yield scrapy.Request(None, self.parse_page)

		# let's only gather Time U.S. magazine covers
		#url = response.css("div.refineCol ul li").xpath("a[contains(., 'TIME U.S.')]")
		#yield scrapy.Request(url.xpath("@href").extract_first(), self.parse_page)

	def parse_main(self, response):

		soup = BeautifulSoup(response.body, "lxml")
		links = soup.find_all('a', class_="inner")

		for link in links:
			l = link['href']
			l = l.replace('.', '_1.') + "?ss=1"
			yield scrapy.Request(l,	self.parse_sub)

	def parse_sub(self, response):

		soup = BeautifulSoup(response.body, "lxml")
		source = soup.find_all('source')
		print source

		lesson_box = soup.find_all('div', class_='text-box')
		for l in lesson_box:
			print l.h2.a['href']
			#l = l.replace('.', '_1.') + "?ss=1"
			#yield scrapy.Request(l,	self.parse_sub)

	def parse_sub_to_idle(self, response):

		soup = BeautifulSoup(response.body, "lxml")
		source = soup.find_all('source')
		print source


	def parse_covers(self, response):
		# grab the URL of the cover image
		img = response.css(".art-cover-photo figure a img").xpath("@src")
		imageURL = img.extract_first()

		# grab the title and publication date of the current issue
		title = response.css(".content-main-aside h1::text").extract_first()
		year = response.css(".content-main-aside h1 time a::text").extract_first()
		month = response.css(".content-main-aside h1 time::text").extract_first()[:-2]

		# parse the date
		date = "{} {}".format(month, year).replace(".", "")
		d = datetime.datetime.strptime(date, "%b %d %Y")
		pub = "{}-{}-{}".format(d.year, str(d.month).zfill(2), str(d.day).zfill(2))

		# yield the result
		yield MagazineCover(title=title, pubDate=pub, file_urls=[imageURL])
