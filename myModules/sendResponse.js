function sendResponse(response, data, contentType) {
	const type = contentType || "text/plain"
	response.writeHead(200, {"Content-Type": type});
	response.end(data);
}

module.exports = sendResponse;