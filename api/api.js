var express = require('express')
var axios = require('axios')
var apiRouter = express.Router()

apiRouter.use(function(req,res,next){
	next()
})
apiRouter.get('/comments', function(req, res){
	console.log('api')

})

module.exports = apiRouter