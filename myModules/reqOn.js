function reqOn(req, callback){
	// console.log("******reqOn*****")
	var data = "";
	req.on("data",  chunk => {data += chunk});
	req.on("end", () => {
		return callback(data);

	});	 
}
module.exports = reqOn;
