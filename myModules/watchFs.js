const fs  = require("fs"); 
 
function watchFs(pathWatch, callback){
	const watcher = fs.watch(pathWatch,{recursive:true},(eventType, filename)=>{
		watcher.close();
		// console.log(`Тип события: ${eventType}`);
	  if (filename) {
	    console.log(`Имя файла: ${filename}`);
	  } else {
	    console.log('Имя файла отсутствует');
	  } 
	  callback();
	});
}
   
module.exports = watchFs;
          