点击登录处理流程：

#1 验证
>>>Request
method: GET
host: check.ptlogin2.qq.com

Param: 
GET /check?regmaster=&pt_tea=1&pt_vcode=1&uin=909066038&appid=716027609&js_ver=10138&js_type=1&login_sig=6*d0PfHlaCk9wcqRt1diUu94fNStHN*zaUujdam*-Y9bAegZRbdjYmphbCgVn*B8&u1=http://openapi.qzone.qq.com/oauth/login_jump


appid=716027609
**?login_sig?**

>>>Response
JSON:
ptui_checkVC('0','!OVV','\x00\x00\x00\x00\x36\x2f\x3f\x36','95acfe9e4e59152feb350ef9065c844acb6881fc7c4915fc96ce9bc91a05b75b0e1b66838644b89cfdf95f4e17b1f657fd43b304d390b2b4','0');

pt_vcode_v1: '0'
verifycode: '!OVV'
pt_verifysession_v1: '95acfe9e4e59152feb350ef9065c844acb6881fc7c4915fc96ce9bc91a05b75b0e1b66838644b89cfdf95f4e17b1f657fd43b304d390b2b4'
u: 909066038
**?p: xxxxx?**

#2 登录
>>>Reuqest
method: GET
host: ptlogin2.qq.com

Param:
GET /login?u=909066038&verifycode=!OVV&pt_vcode_v1=0&pt_verifysession_v1=95acfe9e4e59152feb350ef9065c844acb6881fc7c4915fc96ce9bc91a05b75b0e1b66838644b89cfdf95f4e17b1f657fd43b304d390b2b4&p=YNMEEekeNoSmg9XjMRICahp6OF8iPOYcfytn7Yu
 
>>>Response
JSON:
ptuiCB('0','0','http://openapi.qzone.qq.com/oauth/login_jump','0','\347\231\273\345\275\225\346\210\220\345\212\237\357\274\201', 'Yo\/jyyo');

#2 报告？
>>>Request
method: GET
host:  ui.ptlogin2.qq.com
type: image

Param:
GET /cgi-bin/report?id=488358 HTTP/1.1\r\n

>>>Response
image/bmp:66bytes

#3 登录跳转
>>>Request
method: GET
host: openapi.qzone.qq.com

Param:
GET /oauth/login_jump HTTP/1.1\r\n

>>>Response
Line-based text data: text/html
0000   3c 21 44 4f 43 54 59 50 45 20 68 74 6d 6c 3e 0d  <!DOCTYPE html>.
0010   0a 3c 68 74 6d 6c 20 6c 61 6e 67 3d 22 7a 68 2d  .<html lang="zh-
0020   63 6e 22 3e 0d 0a 3c 68 65 61 64 3e 0d 0a 20 20  cn">..<head>..  
0030   20 20 3c 6d 65 74 61 20 63 68 61 72 73 65 74 3d    <meta charset=
0040   22 55 54 46 2d 38 22 3e 0d 0a 20 20 20 20 3c 73  "UTF-8">..    <s
0050   63 72 69 70 74 3e 0d 0a 20 20 20 20 20 20 20 20  cript>..        
0060   64 6f 63 75 6d 65 6e 74 2e 64 6f 6d 61 69 6e 20  document.domain 
0070   3d 20 27 71 71 2e 63 6f 6d 27 3b 0d 0a 20 20 20  = 'qq.com';..   
0080   20 20 20 20 20 69 66 28 70 61 72 65 6e 74 2e 61       if(parent.a
0090   67 72 65 65 29 7b 0d 0a 20 20 20 20 20 20 20 20  gree){..        
00a0   20 20 20 20 70 61 72 65 6e 74 2e 61 67 72 65 65      parent.agree
00b0   28 29 0d 0a 20 20 20 20 20 20 20 20 7d 65 6c 73  ()..        }els
00c0   65 7b 0d 0a 20 20 20 20 20 20 20 20 20 20 20 20  e{..            
00d0   70 61 72 65 6e 74 2e 69 73 41 67 72 65 65 64 20  parent.isAgreed 
00e0   3d 20 74 72 75 65 3b 0d 0a 20 20 20 20 20 20 20  = true;..       
00f0   20 7d 0d 0a 20 20 20 20 3c 2f 73 63 72 69 70 74   }..    </script
0100   3e 0d 0a 3c 2f 68 65 61 64 3e 0d 0a 3c 62 6f 64  >..</head>..<bod
0110   79 3e 0d 0a 3c 2f 62 6f 64 79 3e 0d 0a 3c 2f 68  y>..</body>..</h
0120   74 6d 6c 3e                                      tml>

#4 统计报告
>>>Request
method: GET
host: appsupport.qq.com

Param:
GET /cgi-bin/appstage/mstats_report?report_type=4&platform=8&app_id=101119675&result=0&act_type=2&uin=909066038&login_status=2&via=1&t=1445954929841 HTTP/1.1\r\n

>>>Response
0000   7b 22 72 65 74 22 3a 30 2c 0a 22 6d 73 67 22 3a  {"ret":0,."msg":
0010   22 e6 88 90 e5 8a 9f 22 7d                       "......"}

#4 报告

>>>Request
method: GET
host: cgi.connect.qq.com

Param:
GET /report/report_vm?tag=0&log=101119675_10613_0&t=1445954929842 HTTP/1.1\r\n

>>>Response
**????**

#5 跳转
>>>Request
method: GET
host: passport.jikexueyuan.com

Param:
GET /connect/success?t=qq&code=463FC8133B91F60CF2C5A14493A6FBA2&state=86aa6fc4647a9e5eb88654f82aa1b9ee HTTP/1.1\r\n

**?code=?**

>>>Response
0000   3c 21 44 4f 43 54 59 50 45 20 68 74 6d 6c 3e 0a  <!DOCTYPE html>.
0010   3c 68 74 6d 6c 20 6c 61 6e 67 3d 22 7a 68 2d 63  <html lang="zh-c
0020   6e 22 3e 0a 3c 68 65 61 64 3e 0a 09 3c 6d 65 74  n">.<head>..<met
0030   61 20 63 68 61 72 73 65 74 3d 22 75 74 66 2d 38  a charset="utf-8
0040   22 3e 0a 20 20 20 20 3c 6d 65 74 61 20 6e 61 6d  ">.    <meta nam
0050   65 3d 22 72 65 6e 64 65 72 65 72 22 20 63 6f 6e  e="renderer" con
0060   74 65 6e 74 3d 22 77 65 62 6b 69 74 22 3e 0a 20  tent="webkit">. 
0070   20 20 20 3c 6d 65 74 61 20 68 74 74 70 2d 65 71     <meta http-eq
0080   75 69 76 3d 22 58 2d 55 41 2d 43 6f 6d 70 61 74  uiv="X-UA-Compat
0090   69 62 6c 65 22 20 63 6f 6e 74 65 6e 74 3d 22 49  ible" content="I
00a0   45 3d 65 64 67 65 2c 63 68 72 6f 6d 65 3d 31 22  E=edge,chrome=1"
00b0   3e 0a 09 3c 74 69 74 6c 65 3e e6 9e 81 e5 ae a2  >..<title>......
00c0   e5 ad a6 e9 99 a2 2d 41 6e 64 72 6f 69 64 2f 43  ......-Android/C
00d0   6f 63 6f 73 32 64 78 2f 69 4f 53 2f 73 77 69 66  ocos2dx/iOS/swif
00e0   74 2f e5 ae 89 e5 8d 93 e8 bd af e4 bb b6 e5 ba  t/..............
00f0   94 e7 94 a8 e6 b8 b8 e6 88 8f e5 bc 80 e5 8f 91  ................
0100   e6 8a 80 e6 9c af e8 a7 86 e9 a2 91 e6 95 99 e7  ................
0110   a8 8b 3c 2f 74 69 74 6c 65 3e 0a 09 3c 6c 69 6e  ..</title>..<lin
0120   6b 20 72 65 6c 3d 22 69 63 6f 6e 22 20 68 72 65  k rel="icon" hre
0130   66 3d 22 2f 66 61 76 69 63 6f 6e 2e 69 63 6f 22  f="/favicon.ico"
0140   20 74 79 70 65 3d 22 69 6d 61 67 65 2f 78 2d 69   type="image/x-i
0150   63 6f 6e 22 20 2f 3e 0a 09 3c 6c 69 6e 6b 20 72  con" />..<link r
0160   65 6c 3d 22 73 74 79 6c 65 73 68 65 65 74 22 20  el="stylesheet" 
0170   74 79 70 65 3d 22 74 65 78 74 2f 63 73 73 22 20  type="text/css" 
0180   68 72 65 66 3d 22 68 74 74 70 3a 2f 2f 73 70 31  href="http://sp1
0190   2e 6a 69 6b 65 78 75 65 79 75 61 6e 2e 63 6f 6d  .jikexueyuan.com
01a0   2f 73 74 61 74 69 63 2f 76 32 2e 30 2f 63 73 73  /static/v2.0/css
01b0   2f 70 61 73 73 70 6f 72 74 2e 6d 69 6e 2e 63 73  /passport.min.cs
01c0   73 22 2f 3e 0a 09 3c 73 63 72 69 70 74 20 73 72  s"/>..<script sr
01d0   63 3d 22 68 74 74 70 3a 2f 2f 73 70 31 2e 6a 69  c="http://sp1.ji
01e0   6b 65 78 75 65 79 75 61 6e 2e 63 6f 6d 2f 73 74  kexueyuan.com/st
01f0   61 74 69 63 2f 76 32 2e 30 2f 73 63 72 69 70 74  atic/v2.0/script
0200   73 2f 6a 71 75 65 72 79 2e 6d 69 6e 2e 6a 73 22  s/jquery.min.js"
0210   3e 3c 2f 73 63 72 69 70 74 3e 0a 09 3c 73 63 72  ></script>..<scr
0220   69 70 74 20 73 72 63 3d 22 68 74 74 70 3a 2f 2f  ipt src="http://
0230   73 70 31 2e 6a 69 6b 65 78 75 65 79 75 61 6e 2e  sp1.jikexueyuan.
0240   63 6f 6d 2f 73 74 61 74 69 63 2f 76 32 2e 30 2f  com/static/v2.0/
0250   73 63 72 69 70 74 73 2f 76 65 72 69 66 79 2e 6a  scripts/verify.j
0260   73 22 3e 3c 2f 73 63 72 69 70 74 3e 0a 09 3c 73  s"></script>..<s
0270   63 72 69 70 74 20 73 72 63 3d 22 68 74 74 70 3a  cript src="http:
0280   2f 2f 73 70 31 2e 6a 69 6b 65 78 75 65 79 75 61  //sp1.jikexueyua
0290   6e 2e 63 6f 6d 2f 73 74 61 74 69 63 2f 76 32 2e  n.com/static/v2.
02a0   30 2f 73 63 72 69 70 74 73 2f 66 6f 72 67 65 74  0/scripts/forget
02b0   2e 6a 73 22 3e 3c 2f 73 63 72 69 70 74 3e 0a 3c  .js"></script>.<
02c0   2f 68 65 61 64 3e 0a 0a 09 3c 62 6f 64 79 3e 0a  /head>...<body>.
02d0   09 09 3c 64 69 76 20 63 6c 61 73 73 3d 22 70 61  ..<div class="pa
02e0   73 73 70 6f 72 74 2d 77 72 61 70 70 65 72 22 3e  ssport-wrapper">
02f0   0a 20 20 20 20 3c 68 65 61 64 65 72 20 69 64 3d  .    <header id=
0300   22 68 65 61 64 65 72 22 20 63 6c 61 73 73 3d 22  "header" class="
0310   70 61 73 73 70 6f 72 74 2d 68 65 61 64 65 72 22  passport-header"
0320   3e 0a 20 20 20 20 20 20 20 20 3c 64 69 76 20 69  >.        <div i
0330   64 3d 22 6c 6f 67 6f 22 3e 3c 61 20 68 72 65 66  d="logo"><a href
0340   3d 22 68 74 74 70 3a 2f 2f 77 77 77 2e 6a 69 6b  ="http://www.jik
0350   65 78 75 65 79 75 61 6e 2e 63 6f 6d 22 20 6a 6b  exueyuan.com" jk
0360   74 61 67 3d 22 30 30 30 31 7c 30 2e 31 7c 39 31  tag="0001|0.1|91
0370   30 30 36 22 3e 3c 69 6d 67 20 73 72 63 3d 22 68  006"><img src="h
0380   74 74 70 3a 2f 2f 73 70 31 2e 6a 69 6b 65 78 75  ttp://sp1.jikexu
0390   65 79 75 61 6e 2e 63 6f 6d 2f 73 74 61 74 69 63  eyuan.com/static
03a0   2f 76 32 2e 30 2f 69 6d 61 67 65 73 2f 6c 6f 67  /v2.0/images/log
03b0   6f 2e 70 6e 67 22 2f 3e 3c 2f 61 3e 3c 2f 64 69  o.png"/></a></di
03c0   76 3e 0a 20 20 20 20 3c 2f 68 65 61 64 65 72 3e  v>.    </header>
03d0   0a 09 09 3c 21 2d 2d 66 65 67 2d 62 6f 78 2d 2d  ...<!--feg-box--
03e0   20 2d 2d 3e 0a 09 0a 09 09 3c 64 69 76 20 73 74   -->.....<div st
03f0   79 6c 65 3d 22 74 65 78 74 2d 61 6c 69 67 6e 3a  yle="text-align:
0400   63 65 6e 74 65 72 3b 66 6f 6e 74 2d 73 69 7a 65  center;font-size
0410   3a 32 34 70 78 3b 6d 61 72 67 69 6e 2d 74 6f 70  :24px;margin-top
0420   3a 35 30 70 78 3b 63 6f 6c 6f 72 3a 23 33 33 33  :50px;color:#333
0430   3b 22 20 63 6c 61 73 73 3d 27 63 6f 6e 74 65 6e  ;" class='conten
0440   74 27 3e 0a 09 09 09 e5 b7 b2 e7 bb 91 e5 ae 9a  t'>.............
0450   e6 ad a4 e7 94 a8 e6 88 b7 ef bc 8c e6 97 a0 e9  ................
0460   9c 80 e5 86 8d e6 ac a1 e7 bb 91 e5 ae 9a 09 09  ................
0470   3c 2f 64 69 76 3e 0a 09 09 09 09 3c 64 69 76 20  </div>.....<div 
0480   73 74 79 6c 65 3d 22 74 65 78 74 2d 61 6c 69 67  style="text-alig
0490   6e 3a 63 65 6e 74 65 72 3b 63 6f 6c 6f 72 3a 23  n:center;color:#
04a0   39 39 39 3b 66 6f 6e 74 2d 73 69 7a 65 3a 31 34  999;font-size:14
04b0   70 78 3b 6d 61 72 67 69 6e 2d 74 6f 70 3a 32 30  px;margin-top:20
04c0   70 78 3b 22 3e 0a 09 09 09 3c 73 70 61 6e 20 69  px;">....<span i
04d0   64 3d 22 77 61 69 74 22 3e 33 3c 2f 73 70 61 6e  d="wait">3</span
04e0   3e e7 a7 92 e5 90 8e e8 87 aa e5 8a a8 3c 61 20  >............<a 
04f0   69 64 20 3d 22 68 72 65 66 22 20 68 72 65 66 3d  id ="href" href=
0500   22 68 74 74 70 3a 2f 2f 77 77 77 2e 6a 69 6b 65  "http://www.jike
0510   78 75 65 79 75 61 6e 2e 63 6f 6d 22 20 73 74 79  xueyuan.com" sty
0520   6c 65 3d 22 63 6f 6c 6f 72 3a 23 38 32 62 35 34  le="color:#82b54
0530   38 3b 22 3e e8 b7 b3 e8 bd ac 3c 2f 61 3e 0a 09  8;">......</a>..
0540   09 3c 2f 64 69 76 3e 0a 09 09 09 09 3c 21 2d 2d  .</div>.....<!--
0550   66 65 67 2d 62 6f 78 20 65 6e 64 2d 2d 3e 0a 09  feg-box end-->..
0560   09 09 09 3c 73 63 72 69 70 74 20 74 79 70 65 3d  ...<script type=
0570   22 74 65 78 74 2f 6a 61 76 61 73 63 72 69 70 74  "text/javascript
0580   22 3e 0a 09 09 09 28 66 75 6e 63 74 69 6f 6e 28  ">....(function(
0590   29 7b 0a 09 09 09 76 61 72 20 6a 75 6d 70 55 72  ){....var jumpUr
05a0   6c 20 3d 20 27 68 74 74 70 3a 2f 2f 77 77 77 2e  l = 'http://www.
05b0   6a 69 6b 65 78 75 65 79 75 61 6e 2e 63 6f 6d 27  jikexueyuan.com'
05c0   3b 0a 09 09 09 69 66 28 27 27 20 21 3d 20 6a 75  ;....if('' != ju
05d0   6d 70 55 72 6c 29 7b 0a 09 09 09 09 76 61 72 20  mpUrl){.....var 
05e0   77 61 69 74 20 3d 20 64 6f 63 75 6d 65 6e 74 2e  wait = document.
05f0   67 65 74 45 6c 65 6d 65 6e 74 42 79 49 64 28 27  getElementById('
0600   77 61 69 74 27 29 2c 68 72 65 66 20 3d 20 64 6f  wait'),href = do
0610   63 75 6d 65 6e 74 2e 67 65 74 45 6c 65 6d 65 6e  cument.getElemen
0620   74 42 79 49 64 28 27 68 72 65 66 27 29 2e 68 72  tById('href').hr
0630   65 66 3b 0a 09 09 09 09 76 61 72 20 69 6e 74 65  ef;.....var inte
0640   72 76 61 6c 20 3d 20 73 65 74 49 6e 74 65 72 76  rval = setInterv
0650   61 6c 28 66 75 6e 63 74 69 6f 6e 28 29 7b 0a 09  al(function(){..
0660   09 09 09 09 76 61 72 20 74 69 6d 65 20 3d 20 2d  ....var time = -
0670   2d 77 61 69 74 2e 69 6e 6e 65 72 48 54 4d 4c 3b  -wait.innerHTML;
0680   0a 09 09 09 09 09 69 66 28 74 69 6d 65 20 3d 3d  ......if(time ==
0690   20 30 29 20 7b 0a 09 09 09 09 09 09 6c 6f 63 61   0) {.......loca
06a0   74 69 6f 6e 2e 68 72 65 66 20 3d 20 68 72 65 66  tion.href = href
06b0   3b 0a 09 09 09 09 09 09 63 6c 65 61 72 49 6e 74  ;.......clearInt
06c0   65 72 76 61 6c 28 69 6e 74 65 72 76 61 6c 29 3b  erval(interval);
06d0   0a 09 09 09 09 09 7d 3b 0a 09 09 09 09 7d 2c 20  ......};.....}, 
06e0   31 30 30 30 29 3b 0a 09 09 09 7d 0a 09 09 09 7d  1000);....}....}
06f0   29 28 29 3b 0a 09 09 3c 2f 73 63 72 69 70 74 3e  )();...</script>
0700   0a 3c 2f 62 6f 64 79 3e 0a 3c 2f 68 74 6d 6c 3e  .</body>.</html>

qq: 909066038
openid: 80901010



https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=a6bbeeb12450ea5e70acc76b7b0ae555&scope=get_user_info

http://openapi.qzone.qq.com/oauth/show?which=ConfirmPage&display=pc&response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=a6bbeeb12450ea5e70acc76b7b0ae555&scope=get_user_info


