function createCursor () {
	const cursor = document.createElement('div')
	setStyle(cursor, {
		border: '1px solid',
		width: '10px',
		height: '10px'
	})
	return cursor
};

function setStyle (elem, styleObj) {
	Object.keys(styleObj).forEach((key) => {
		elem.style[key] = styleObj[key]
	})
}
