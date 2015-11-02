<script>
    _speedTiming.push(+new Date);
    var Q = {};
    Q.authsCount = 1;
    Q.isNeedLogin = false;
    Q.crtDomain = 'http://www.jikexueyuan.com';
    Q.agree = function(){
        window.isAgreed = true;
    };
    Q.logout = function(){
        window.isLogouted = true;
    };
    
    Q.isNeedLogin = true;
    Q.getParameter = function getParameter(name) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)"), m = location.href.match(r);
        return decodeURIComponent(!m ? "" : m[2]);
    };
    Q.ptlogin2 = function(){
        var s_url = 'http://openapi.qzone.qq.com/oauth/login_jump';
        s_url = 'http://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&style=23&login_text=%E6%8E%88%E6%9D%83%E5%B9%B6%E7%99%BB%E5%BD%95&hide_title_bar=1&hide_border=1&target=self&s_url=' + encodeURIComponent(s_url);

        var clientId = Q.getParameter('client_id') || '';
        clientId && (s_url += ("&pt_3rd_aid="+encodeURIComponent(clientId)));

        var dmHost = ((Q.crtDomain || Q.getParameter('redirect_uri') || '').match(/http:\/\/([^/]*)\/?/i) || [])[1] || '';
        var feed_back_link = 'http://support.qq.com/write.shtml?fid=780&SSTAG='+encodeURIComponent(dmHost) + '.appid' + clientId;
        s_url += ('&pt_feedback_link=' + encodeURIComponent(feed_back_link));
        document.getElementById('ptlogin_iframe').src = s_url;
    };
    Q.ptlogin2();
    
    
    function ptlogin2_onResize(w, h) {
    	var f = document.getElementById('ptlogin_iframe');
    	f.width = w;
    	f.height = h;
    }
    if (!window.JSON) {
    	document.write('<script type="text/javascript" src="http://qzonestyle.gtimg.cn/open/operate/mlib/widget/json-for-ie.js"><\/script>');
    }
</script>

post:
    https://graph.qq.com/oauth2.0/authorize 

param:

update_auth:"1"

openapi:"80901010"

g_tk:"1418738826"

auth_time:"1445952120733"

ui:"880251B8-C1D1-4605-8818-C17DB83C4378"

response:
    http://passport.jikexueyuan.com/connect/success?t=qq&code=62250B3008D54C0E8B8AD4D3B900882E&state=86aa6fc4647a9e5eb88654f82aa1b9ee
    
    
http://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&style=23&login_text=%E6%8E%88%E6%9D%83%E5%B9%B6%E7%99%BB%E5%BD%95&hide_title_bar=1&hide_border=1&target=self&s_url=http%3A%2F%2Fopenapi.qzone.qq.com%2Foauth%2Flogin_jump&pt_3rd_aid=101119675&pt_feedback_link=http%3A%2F%2Fsupport.qq.com%2Fwrite.shtml%3Ffid%3D780%26SSTAG%3Dwww.jikexueyuan.com.appid101119675    
