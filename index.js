var express = require('express')
var axios = require('axios')
var api = require('./api/api')
const port = 3001
app = express();

app.use('/api', api)

app.get('/', function(req, res){
	// res.send('hw')
	
}).listen(port, function(){
	console.log('server is running at ' + port)
})

function grab(n) {

}



var maxSize = 100;
var list = []
var ins = 1
function grab(n=1) {
	axios.get('https://rate.tmall.com/list_detail_rate.htm', {
		params: {
			'itemId': 570360894700,
			'sellerId':772687801,
			'order':3,
			'currentPage': n,
			'pageSize': 20,
			'callback': '_DLP_2548_der_3_currentPage_1_pageSize_10_'
		}
	}).then(function(response){
	 	var str = response.data
	  	var reg = /^[a-zA-z0-9\_\s]+\(({.+})\)$/
	  	if (typeof str === 'string') {
	 		var ret = str.match(reg)
	 		ret = JSON.parse(ret[1])
	 		var colorReg = /[a-zA-Z\+]+/
	 		var sizeReg = /尺码:\w+/
	  		ret.rateDetail.rateList.forEach(function (v) {
	  			list.push({
	  				color: v.auctionSku.match(colorReg)[0],
	  				size: v.auctionSku.match(sizeReg)[0].slice(-1)
	  			})
	  			console.log('序号', ins++,'颜色：', v.auctionSku.match(colorReg)[0], '尺码：', v.auctionSku.match(sizeReg)[0].slice(-1));
	  		})
	  		if(1){
	  			grab(n++)
	  		}else{
	  			console.log('抓取完成');
	  		}
	  	}
	})	
}

grab()
