点击QQ登录处理流程

#1 请求登录
<<<
GET /connect/qq HTTP/1.1\r\n
Host: passport.jikexueyuan.com\r\n
Referer: http://www.jikexueyuan.com/\r\n

>>>
HTTP/1.1 302 Moved Temporarily\r\n
Location: https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=19325e260ec40f525abcfa2545b0c9a4&scope=get_user_info\r\n

#2
<<<
GET /oauth/show?which=ConfirmPage&display=pc&response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=19325e260ec40f525abcfa2545b0c9a4&scope=get_user_info HTTP/1.1\r\n
Host: openapi.qzone.qq.com\r\n
Referer: http://www.jikexueyuan.com/\r\n

>>>
HTTP/1.1 200 OK\r\n

#3
<<<
GET /oauth/show?which=ConfirmPage&display=pc&response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=19325e260ec40f525abcfa2545b0c9a4&scope=get_user_info HTTP/1.1\r\n
Host: openapi.qzone.qq.com\r\n
Referer: http://www.jikexueyuan.com/\r\n

>>>
HTTP/1.1 200 OK\r\n

#
POST

response_type:"code"
client_id:"101119675"
redirect_uri:"http://passport.jikexueyuan.com/connect/success?t=qq"
scope:"get_user_info"
state:"12560f9f809620ce6ad02fbfe6c4d175"

src:"1"
update_auth:"1"
openapi:"80901010"
g_tk:"693520788"    1596591018
auth_time:"1446131730212"
auth_time:"1446137946742"
ui:"DE9C804E-F36C-4680-ABD0-03895211E761"
ui:"DE9C804E-F36C-4680-ABD0-03895211E761"

556F791F-682E-47B7-BC66-CE179327DB04