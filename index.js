var express = require('express')
var axios = require('axios')
var api = require('./api/api')
const port = 3001
app = express();

app.use('/api', api)

app.get('/', function(req, res){
	res.send('hw')
}).listen(port, function(){
	console.log('server is running at ' + port)
})

axios.get('https://rate.tmall.com/list_detail_rate.htm', {
	params: {
		'itemId': 570360894700,
		'sellerId':772687801,
		'order':3,
		'currentPage':1,
		'pageSize': 1,
		'callback': '_DLP_2548_der_3_currentPage_1_pageSize_10_'
	}
}).then(function(res){
 	var ret = res.data
    // 返回的是JSONP格式的话
    if (typeof ret === 'string') {
      var reg = /^\w+\(({.+})\)$/i
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    console.log(ret, matches)
})