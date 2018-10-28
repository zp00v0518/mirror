class Mirror {
	init(wsAddr){
		this.connectionToWs(wsAddr)
		this.cursor = this.createCursor();
		this.dispatcherEvent = {
			mousemove: (eventData) => this.handleMousemove(eventData),
			preperaToMagic: (eventData) => this.preperaToMagic(eventData),
			click:  (eventData) => this.handlerClick(eventData)
		}
	}
	connectionToWs (wsAddr) {
		this.wsInstance = new WebSocket(wsAddr);
		this.wsInstance.onopen = () => console.log(`WebSocket open in ${wsAddr}`)
		this.wsInstance.onmessage = (event) => {
			const data = JSON.parse(event.data)
			this.dispatcherEvent[data.type](data)
		}
	}
	preperaToMagic (eventData) {
		const style = document.createElement('style');
		style.innerText = eventData.allCSS;
		document.head.appendChild(style);
		document.body.innerHTML = eventData.body_content;
		this.cursor = this.createCursor();
	}

	handleMousemove (eventData) {
		const {pageX, pageY, elem} = eventData;
		this.cursor.style.top = pageY+'px';
		this.cursor.style.left = pageX+'px';
		const mousemove = new MouseEvent("mousemove")		
		const d = getElemNode(elem, document.body)
		 if (d){
			d.dispatchEvent(mousemove)
			console.log(mousemove)
		 }
	}

	handlerClick (eventData) {
		const {pageX, pageY, elem} = eventData;
		const click = new MouseEvent('click',{pageX, pageY, target: elem})
		const d = getElemNode(elem, document.body)
		 if (d){
			d.dispatchEvent(click)
		 }
	}

	createCursor () {
		const cursor = document.createElement('div')
		setStyle(cursor, {
			border: '1px solid',
			width: '10px',
			height: '10px',
			top: '0',
			left: '0',
			position: 'fixed'
		})
		document.body.appendChild(cursor)
		return cursor
	}
}

document.addEventListener('DOMContentLoaded',() => {
	const mirror = new Mirror();
	mirror.init("ws://localhost:3001")
})

document.addEventListener('click', (event) => {
	console.log(event)
})


function getElemNode (testElem, base) {
	let node;
	const flag = checkElem(testElem, base);
	if (flag){
		node = base
		return node
	} else {
		const children = base.children;
		if (children){
			for (let elem in children) {
				let d = getElemNode(testElem, children[elem])
				if (d){
					node = d;
					return node
				}
			}
		} else {
			return node
		}
		return node
	}

	function checkElem(testElem, elem) {
		if (testElem.className === elem.className && testElem.id === elem.id) {
			return true;
		}
	}
}