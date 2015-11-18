from scrapy import cmdline 

import sys
reload(sys)
sys.setdefaultencoding('gb18030')

#import qqlib
#import re
#url = 'http://openapi.qzone.qq.com/oauth/show?which=Login&display=pc&response_type=code&client_id=101119675&redirect_uri=http://passport.jikexueyuan.com/connect/success?t=qq&state=4ad5e47360b133f1f95e125200128071&scope=get_user_info'
#v = re.findall('&state=(.*?)\&scope', url)[0]
#print v

#qq=qqlib.QQ(909066038,'vlirqin')
#p = qq.pwdencode('', 100, 1)
#qq.loginex()

cmdline.execute('scrapy crawl jike-spider'.split())
