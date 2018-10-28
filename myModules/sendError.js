function sendError(error, response){
	response.writeHead(400, {"Content-Type": "text/plain"});
	response.end(error.message);
}



module.exports.sendError = sendError;