const config = require('./config.js');
const url = require("url");
const {getMethod, postMethod, watchFs} = require('./myModules/tube.js')
const http = require('http');
const ws = require('ws');
const developerOnline = {};
const liveReloadOnline = {}

function CreateServer (port, baseFile) {
	const httpServer = http.createServer();
	httpServer.listen(port, () => {console.log(`Базовый сервер запущен на порту ${port}`)});
	httpServer.on('request', (req, res) => {
		const urlParse = url.parse(req.url);
		if (req.method == "GET") {
			getMethod(req,res, urlParse, port, __dirname);
		} else if (req.method == "POST") {
			res.end("Такие запросы сервер не обрабатывает")
		}
	})
}

CreateServer(config.port.base)
CreateServer(config.port.mirror)

var wsServer = new ws.Server({
	port: 8888
}, ()=>{
	console.log("**************Сервер Websocket запущен на порту:", 8888, "**************")
});
wsServer.on("connection", (ws, req)=>{
	let port = req.headers.origin.split(":")[2]
  liveReloadOnline[port] = ws;
  watchFs(__dirname,()=>{
  	  for (let key in liveReloadOnline){
  	  	liveReloadOnline[key].send("change")
  	  }
  })
	ws.on('close', function(ws, qw) {
		delete liveReloadOnline[port];
  });
});


class WSServer {
	init(port, message) {
		this.server = new ws.Server({port: port}, () => {console.log(message)})
		this.server.on('connection', this.handlerConnection);
		// this.server.on('message', this.handlerMessage);
		// this.server.on('close', this.handlerClose);
	}

	handlerConnection (ws, req) {
		let port = req.headers.origin.split(":")[2]
 		developerOnline[port] = ws;
 		ws.on('message', (data) => {
 			handlerMessage(data)
 		});
 		ws.on('close', () => {
 			handlerClose(ws, req)
 		});
	}
}

const wss1 = new WSServer();
wss1.init(config.port.ws, `WS Server запущен на порту ${config.port.ws}`)

	function handlerMessage (data) {
		 developerOnline[config.port.mirror].send(data)
	}

	function handlerClose (ws, req){
		let port = req.headers.origin.split(":")[2]
		delete developerOnline[port]
	}