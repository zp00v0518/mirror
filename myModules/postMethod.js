const fs = require("fs");
const path = require("path");
const reqOn = require ("./tube").reqOn;

function postMethod(req,res, urlParse) {
	// console.log("********** PostMethod Work ************");
	if (urlParse.pathname == "/index.html") {
		var data ="";
		req.on('data', function(chunk){
			data += chunk;
		})
		req.on("end", function(){
			console.log(data)
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("Very good");

		})
	} else if (urlParse.pathname == "/subCategory") {
		var data ="";
		req.on('data', function(chunk){
			data += chunk;
		})
		req.on("end", function(){
			searchDB(data, function(result){
				// console.log("***************Вывод в коллбаке***********");
				res.writeHead(200, {"Content-Type": "application/json"});
				res.end(result);
			});
		

		})
	}
}

module.exports = postMethod;

