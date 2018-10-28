class Client {
	init(wsAddr){
		this.connectionToWs(wsAddr)
	}
	connectionToWs (wsAddr) {
		this.wsInstance = new WebSocket(wsAddr);
		this.wsInstance.onopen = () => {
			console.log(`WebSocket open in ${wsAddr}`)
			document.addEventListener('mousemove', handlerMousemove);
			document.addEventListener('click', handlerClick);
			window.addEventListener('load', preperaToMagic)
		}
	}
	sendMessage (data) {
		this.wsInstance.send(JSON.stringify(data));
	}
}

const client = new Client();
client.init("ws://localhost:3001")

function handlerMousemove ({pageX, pageY, type,target}) {
	const elem = copyObj(target)
	const data = {
		pageX, pageY, type, elem
	}
	client.sendMessage(data)
}

function preperaToMagic () {
	const target = document;
	const styleSheets = target.styleSheets;
	body_content = target.body.innerHTML;
	allCSS = 
				[].slice.call(styleSheets)
					.reduce(function (prev, styleSheet) {
				            if (styleSheet.cssRules) {
				                return prev +
				                    [].slice.call(styleSheet.cssRules)
				                        .reduce(function (prev, cssRule) {
				                            return prev + cssRule.cssText;
				                        }, '');
				            } else {
				                return prev;
				            }
				        }, '');
		const data = {
			type: 'preperaToMagic',
			body_content,
			allCSS
		}
		client.sendMessage(data)
	}

function handlerClick (event) {
	const {pageX, pageY, type, target} = event;
	const elem = copyObj(target)
	const data = {
		pageX, pageY, type, elem
	}
	client.sendMessage(data)
}

function copyObj (target) {
	const copyObj = {};
	for (let key in target) {
		copyObj[key] = target[key]
	}
	return copyObj
}