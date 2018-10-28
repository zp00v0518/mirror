const wsLivereload  = new WebSocket("ws://localhost:8888");
wsLivereload.addEventListener("message", handlerMessage);

function handlerMessage(event){ 
	console.log(event)
	let message = event.data;
	if (message == "change"){
		location.reload();
	}
}

