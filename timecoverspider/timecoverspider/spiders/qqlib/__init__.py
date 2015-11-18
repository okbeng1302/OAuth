#!python
# coding=utf-8
'''
QQ Login module
Maintainer: Gerald <gera2ld@163.com>
Last change: 2015 Apr 20
'''
import os, hashlib, re, tempfile, binascii, base64
import rsa, requests
from . import tea
import time

__all__ = ['QQ', 'LogInError']

class LogInError(Exception): pass

class QQ:
	'''
	>>> qq = QQ(12345678, 'password')
	>>> qq.login()
	>>> qq.sayHi()
	'''
	appid=716027609
	action='2-7-' + str(int(time.time()))
	state=''
	client_id=101119675

	proxyurl='http://w.qq.com/proxy.html'
	checkurl='https://ssl.ptlogin2.qq.com/check'
	imgurl='http://captcha.qq.com/getimage'
	loginurl='https://ssl.ptlogin2.qq.com/login'

	jkurl='http://www.jikexueyuan.com'
	jkqqurl='http://passport.jikexueyuan.com/connect/qq'
	xloginurl='http://xui.ptlogin2.qq.com/cgi-bin/xlogin'
	checkurl2='http://check.ptlogin2.qq.com/check'
	loginjumpurl='http://openapi.qzone.qq.com/oauth/login_jump'
	feedbackurl='http://support.qq.com/write.shtml?fid=780&SSTAG=www.jikexueyuan.com.appid101119675'
	loginurl2='http://ptlogin2.qq.com/login'
	authurl='https://graph.qq.com/oauth2.0/authorize'
	appsupporturl='http://appsupport.qq.com/cgi-bin/appstage/mstats_report'
	reporturl='http://cgi.connect.qq.com/report/report_vm'

	def __init__(self, user, pwd):
		self.user = user
		self.pwd = pwd
		self.session = requests.Session()

	def fetch(self, url, data=None, cookies=None, **kw):
		if data is None:
			func = self.session.get
		else:
			kw['data'] = data
			func = self.session.post
		return func(url, **kw)

	def fetch_get(self, url, data=None, **kw):
		if data is None:
			func = self.session.get
		else:
			kw['data'] = data
			#if cookies is not None:
			#	kw['cookies'] = cookies
			func = self.session.get
		return func(url, **kw)
	def loginex(self):
		#http://passport.jikexueyuan.com/connect/qq
		response = self.fetch(self.jkurl)
		g = response.text
		print g

		#http://passport.jikexueyuan.com/connect/qq
		response = self.fetch(self.jkqqurl)
		self.state = re.findall('&state=(.*?)\&', response.url)[0]
		self.client_id = re.findall('&client_id=(.*?)\&', response.url)[0]
		g = response.text
		print g

		#?appid=716027609&style=23&login_text=授权并登录&hide_title_bar=1&hide_border=1&target=self&s_url=http://openapi.qzone.qq.com/oauth/login_jump&pt_3rd_aid=101119675&pt_feedback_link=http://support.qq.com/write.shtml?fid=780&SSTAG=www.jikexueyuan.com.appid101119675
		g = self.fetch(self.xloginurl, params = {
            'appid': self.appid,
            'style': 23,
			'login_text': '授权并登录',
            'hide_title_bar': 1,
			'target': 'self',
			's_url': self.loginjumpurl,
			'pt_3rd_aid': 101119675,
            'pt_feedback_link': self.feedbackurl,
		}).text

		v = re.findall('\'(.*?)\'', g)
		print g

		#GET /check?regmaster=&pt_tea=1&pt_vcode=1&uin=909066038&appid=716027609&js_ver=10138&js_type=1&login_sig=6*d0PfHlaCk9wcqRt1diUu94fNStHN*zaUujdam*-Y9bAegZRbdjYmphbCgVn*B8&u1=http://openapi.qzone.qq.com/oauth/login_jump
		g = self.fetch(self.checkurl2, params = {
            'regmaster': '',
			'pt_tea': 1,
            'pt_vcode': 1,
			'uin': self.user,
			'appid': self.appid,
			'js_ver': 10120,
			'js_type': 0,
            'login_sig': self.session.cookies['pt_login_sig'],
			'u1': self.loginjumpurl,
		}).text
		v = re.findall('\'(.*?)\'', g)
		vcode = v[1]
		uin = v[2]

		#/login?u=909066038&verifycode=!OVV&pt_vcode_v1=0&pt_verifysession_v1=95acfe9e4e59152feb350ef9065c844acb6881fc7c4915fc96ce9bc91a05b75b0e1b66838644b89cfdf95f4e17b1f657fd43b304d390b2b4&p=YNMEEekeNoSmg9XjMRICahp6OF8iPOYcfytn7Yu
		if v[0] == '1':	# verify code needed
			vcode = self.getVerifyCode(vcode)
		g = self.fetch(self.loginurl2, params = {
			'u': self.user,
			'verifycode': vcode,
			'pt_vcode_v1': 0,
			'pt_verifysession_v1': self.session.cookies['ptvfsession'],
			'p': self.pwdencode(vcode, uin, self.pwd),
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
            'login_sig': self.session.cookies['pt_login_sig'],
            'pt_uistyle': 33,
			'aid': self.appid,
			'pt_3rd_aid': 101119675,
		}).text
		r = re.findall('\'(.*?)\'', g)
		if r[0] != '0':
			raise LogInError(r[4])
		self.nick = r[5]

		#http://openapi.qzone.qq.com/oauth/login_jump
		g = self.fetch(self.loginjumpurl).text
		r = re.findall('\'(.*?)\'', g)
		print g

		#GET /cgi-bin/appstage/mstats_report?report_type=4&platform=8&app_id=101119675&result=0&act_type=2&uin=909066038&login_status=2&via=1&t=1445954929841 HTTP/1.1\r\n
		g = self.fetch(self.appsupporturl, params = {
			'report_type': '4',
			'platform': 8,
			'app_id': '101119675',
            'result': 0,
            'act_type': 2,
            'uin': self.user,
            'login_status': 2,
            'via': 1,
            't': int(time.time()),
		}).text
		print g

		#GET /report/report_vm?tag=0&log=101119675_10613_0&t=1445954929842 HTTP/1.1\r\n
		g = self.fetch(self.reporturl, params = {
			'tag': 0,
			'log': '101119675_10613_0',
			't': int(time.time()),
		}).text
		print g

		#https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=19325e260ec40f525abcfa2545b0c9a4&scope=get_user_info
		self.session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240'})
		token = self.gettoken()
		data = {
			'response_type': 'code',
			'client_id': 101119675,
			'redirect_uri': 'http://passport.jikexueyuan.com/connect/success?t=qq',
            'scope': 'get_user_info',
            'state': self.state,
            'src': '1',
            'update_auth': '1',
            'openapi': '80901010',
            'g_tk': token,
            'auth_time': int(time.time()),
            'ui': 'DE9C804E-F36C-4680-ABD0-03895211E761',#'556F791F-682E-47B7-BC66-CE179327DB04',
		}
		response = self.fetch(self.authurl, data = data)
		g = response.text
		print g


		#process video
		#self.session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240'})
		#g = self.fetch('http://www.jikexueyuan.com').text
		#print g

		#self.session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240'})
		#g = self.fetch('http://www.jikexueyuan.com/course/2185_1.html?ss=1').text
		#print g

		#with open('1.html', 'w+') as fp:
		#	fp.write(g)

		#self.session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240'})
		#g = self.fetch('http://www.jikexueyuan.com/course/2185_2.html?ss=1').text
		#print g

		#with open('2.html', 'w+') as fp:
		#	fp.write(g)
		#print len(g)

	def gettoken(self):
		str = self.session.cookies['skey']
		hash = 5381
		for i in str:
			t = (hash << 5) + ord(i)
			hash = hash + t
		return hash & 0x7fffffff

	def login(self):
		g = self.fetch(self.checkurl, params = {
			'pt_tea': 1,
			'uin': self.user,
			'appid': self.appid,
			'js_ver': 10120,
			'js_type': 0,
			'u1': self.proxyurl,
		}).text
		v = re.findall('\'(.*?)\'', g)
		vcode = v[1]
		uin = v[2]
		if v[0] == '1':	# verify code needed
			vcode = self.getVerifyCode(vcode)
		g = self.fetch(self.loginurl, params = {
			'u': self.user,
			'p': self.pwdencode(vcode, uin, self.pwd),
			'verifycode': vcode,
			'webqq_type': 10,
			'remember_uin': 1,
			'login2qq': 1,
			'aid': self.appid,
			'u1': self.proxyurl,
			'h': 1,
			'ptredirect': 0,
			'ptlang': 2052,
			'daid': 164,
			'from_ui': 1,
			'fp': 'loginerroralert',
			'action': self.action,
			'mibao_css': 'm_webqq',
			't': 1,
			'g': 1,
			'js_type': 0,
			'js_ver': 10120,
			'pt_randsalt': 0,
			'pt_vcode_v1': 0,
			'pt_verifysession_v1': self.session.cookies['ptvfsession'],
		}).text
		r = re.findall('\'(.*?)\'', g)
		if r[0] != '0':
			raise LogInError(r[4])
		self.nick = r[5]

	def fromhex(self, s):
		# Python 3: bytes.fromhex
		return bytes(bytearray.fromhex(s))

	pubKey=rsa.PublicKey(int(
		'F20CE00BAE5361F8FA3AE9CEFA495362'
		'FF7DA1BA628F64A347F0A8C012BF0B25'
		'4A30CD92ABFFE7A6EE0DC424CB6166F8'
		'819EFA5BCCB20EDFB4AD02E412CCF579'
		'B1CA711D55B8B0B3AEB60153D5E0693A'
		'2A86F3167D7847A0CB8B00004716A909'
		'5D9BADC977CBB804DBDCBA6029A97108'
		'69A453F27DFDDF83C016D928B3CBF4C7',
		16
	), 3)
	def pwdencode(self, vcode, uin, pwd):
		# uin is the bytes of QQ number stored in unsigned long (8 bytes)
		salt = uin.replace(r'\x', '')
		h1 = hashlib.md5(pwd.encode()).digest()
		s2 = hashlib.md5(h1 + self.fromhex(salt)).hexdigest().upper()
		rsaH1 = binascii.b2a_hex(rsa.encrypt(h1, self.pubKey)).decode()
		rsaH1Len = hex(len(rsaH1) // 2)[2:]
		hexVcode = binascii.b2a_hex(vcode.upper().encode()).decode()
		vcodeLen = hex(len(hexVcode) // 2)[2:]
		l = len(vcodeLen)
		if l < 4:
			vcodeLen = '0' * (4 - l) + vcodeLen
		l = len(rsaH1Len)
		if l < 4:
			rsaH1Len = '0' * (4 - l) + rsaH1Len
		pwd1 = rsaH1Len + rsaH1 + salt + vcodeLen + hexVcode
		saltPwd = base64.b64encode(
			tea.encrypt(self.fromhex(pwd1), self.fromhex(s2))
		).decode().replace('/', '-').replace('+', '*').replace('=', '_')
		return saltPwd

	def getVerifyCode(self, vcode):
		r = self.fetch(self.imgurl, params = {
			'r':0,
			'appid':self.appid,
			'uin':self.user,
			'vc_type':vcode,
		})
		tmp = tempfile.mkstemp(suffix = '.jpg')
		os.write(tmp[0], r.content)
		os.close(tmp[0])
		os.startfile(tmp[1])
		vcode = input('Verify code: ')
		os.remove(tmp[1])
		return vcode

	def sayHi(self):
		print('Hi, %s!' % getattr(self, 'nick') or self.user)
