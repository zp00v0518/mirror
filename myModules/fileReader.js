const fs = require("fs"); 

function fileReader(pathName, callback){
		// console.log("**********fileReader work*********");
		var data;
		try {
			data = fs.readFileSync(pathName);
		} catch (error){
			data = fs.readFileSync("./myModules/error.html","utf-8");
			return callback(data, ".html");
		}
		return callback(data);
}

module.exports = fileReader;