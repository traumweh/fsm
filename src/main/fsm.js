function checkDirected() {
	var val = document.getElementById('directed').checked;
	return val;
};

var special = [ 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'Rightarrow', 'rightarrow', 'Leftarrow', 'leftarrow', 'plus', 'circ', 'cup', 'Cup', 'cap', 'emptyset', 'blank', 'mark'];
function convertLatexShortcuts(text) {
	for(var i = 0; i < special.length; i++) {
		var name = special[i];
		if (name == "Rightarrow") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "⇒");
			continue;	
		}
		if (name == "rightarrow") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "⭢");
			continue;	
		}
		if (name == "Leftarrow") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "⇐");
			continue;	
		}
		if (name == "leftarrow") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "⭠");
			continue;	
		}
		if (name == "plus") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "⁺");
			continue;	
		}
		if (name == "circ") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "∘");
			continue;	
		}
		if (name == "cup") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "∪");
			continue;	
		}
		if (name == "Cup") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "☕");
			continue;
		}
		if (name == "cap") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "∩");
			continue;	
		}
		if (name == "emptyset") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), String.fromCharCode(8709));
			continue;
		}
		if (name == "blank") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), "␣");
			continue;
		}
		// 2091, 4958
		if (name == "mark") {
			text = text.replace(new RegExp('\\\\' + name, 'g'), String.fromCharCode(2091));
			continue;
		}
		regex1 = /(?!_\?)/;
		text = text.replace(new RegExp('\\\\' + name, 'g'), String.fromCharCode(913 + i + (i > 16)));
		text = text.replace(new RegExp('\\\\' + name.toLowerCase(), 'g'), String.fromCharCode(945 + i + (i > 16)));
	}
	
	// subscripts
	for(var i = 0; i < 10; i++) {
		text = text.replace(new RegExp('_' + i, 'g'), String.fromCharCode(8320 + i));
	}
	var subscript = ['ₐ', 'ₑ', 'ₕ', 'ᵢ', 'ⱼ', 'ₖ', 'ₗ', 'ₘ', 'ₙ', 'ₒ', 'ₚ', 'ᵣ', 'ₛ', 'ₜ', 'ᵤ', 'ᵥ', 'ₓ', 'ᵧ', 'ᵪ', '₊', '₋', '₌', '₍', '₎', 'ᵦ', 'ᵨ', 'ᵩ'];
	var subnormal = ['a', 'e', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'x', 'y', 'X', '\\+', '-', '=', '\\(', '\\)', '\\?beta', '\\?rho', '\\?phi'];
	
	for(var i = 0; i < subnormal.length; i++) {
		text = text.replace(new RegExp('_' + subnormal[i], 'g'), subscript[i])
	}
	
	// superscript
	var superscript = ['ᵃ', 'ᵇ', 'ᶜ', 'ᵈ', 'ᵉ', 'ᶠ', 'ᵍ', 'ʰ', 'ⁱ', 'ʲ', 'ᵏ', 'ˡ', 'ᵐ', 'ⁿ', 'ᵒ', 'ᵖ', 'ʳ', 'ˢ', 'ᵗ', 'ᵘ', 'ᵛ', 'ʷ', 'ˣ', 'ʸ', 'ᶻ', 'ᴬ', 'ᴮ', 'ᶜ', 'ᴰ', 'ᴱ', 'ᶠ', 'ᴳ', 'ᴴ', 'ᴵ', 'ᴶ', 'ᴷ', 'ᴸ', 'ᴹ', 'ᴺ', 'ᴼ', 'ᴾ', 'ᴿ', 'ˢ', 'ᵀ', 'ᵁ', 'ⱽ', 'ᵂ', 'ᵡ', 'ʸ', 'ᶻ', '⁺', '⁻', '⁼', '⁽', '⁾', 'ᵅ', 'ᵝ', 'ᵞ', 'ᵟ', 'ᵋ', 'ᶿ', 'ᶥ', 'ᶲ', 'ᵠ', '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
	var supernormal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '\\+', '-', '=', '\\(', '\\)', '\\?alpha', '\\?beta', '\\?gamma', '\\?delta', '\\?epsilon', '\\?theta', '\\?iota', '\\?Phi', '\\?phi', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	for(var i = 0; i < supernormal.length; i++) {
		text = text.replace(new RegExp('\\^' + supernormal[i], 'g'), superscript[i])
	}

	return text;
}

function textToXML(text) {
	text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	var result = '';
	for(var i = 0; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if(c >= 0x20 && c <= 0x7E) {
			result += text[i];
		} else {
			result += '&#' + c + ';';
		}
	}
	return result;
}

function drawArrow(c, x, y, angle) {
	var dx = Math.cos(angle);
	var dy = Math.sin(angle);
	c.beginPath();
	c.moveTo(x, y);
	c.lineTo(x - 8 * dx + 5 * dy, y - 8 * dy - 5 * dx);
	c.lineTo(x - 8 * dx - 5 * dy, y - 8 * dy + 5 * dx);
	c.fill();
}

function canvasHasFocus() {
	return (document.activeElement || document.body) == document.body;
}

function drawText(c, originalText, x, y, angleOrNull, isSelected) {
	text = convertLatexShortcuts(originalText);
	c.font = '20px "Times New Roman", serif';
	var width = c.measureText(text).width;

	// center the text
	x -= width / 2;

	// position the text intelligently if given an angle
	if(angleOrNull != null) {
		var cos = Math.cos(angleOrNull);
		var sin = Math.sin(angleOrNull);
		var cornerPointX = (width / 2 + 5) * (cos > 0 ? 1 : -1);
		var cornerPointY = (10 + 5) * (sin > 0 ? 1 : -1);
		var slide = sin * Math.pow(Math.abs(sin), 40) * cornerPointX - cos * Math.pow(Math.abs(cos), 10) * cornerPointY;
		x += cornerPointX - sin * slide;
		y += cornerPointY + cos * slide;
	}

	// draw text and caret (round the coordinates so the caret falls on a pixel)
	if('advancedFillText' in c) {
		c.advancedFillText(text, originalText, x + width / 2, y, angleOrNull);
	} else {
		x = Math.round(x);
		y = Math.round(y);
		c.fillText(text, x, y + 6);
		if(isSelected && caretVisible && canvasHasFocus() && document.hasFocus()) {
			x += width;
			c.beginPath();
			c.moveTo(x, y - 10);
			c.lineTo(x, y + 10);
			c.stroke();
		}
	}
}

var caretTimer;
var caretVisible = true;

function resetCaret() {
	clearInterval(caretTimer);
	caretTimer = setInterval('caretVisible = !caretVisible; draw()', 500);
	caretVisible = true;
}

var canvas;
var nodes = [];
var links = [];

var cursorVisible = true;
var snapToPadding = 6; // pixels
var hitTargetPadding = 6; // pixels
var gridSnapPadding = 30; // pixels
var selectedObject = null; // either a Link or a Node
var currentLink = null; // a Link
var movingObject = false;
var originalClick;

function drawUsing(c) {
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.save();
	c.translate(0.5, 0.5);

	for(var i = 0; i < nodes.length; i++) {
		c.lineWidth = 1;
		c.fillStyle = c.strokeStyle = (nodes[i] == selectedObject) ? 'blue' : 'black';
		nodes[i].draw(c);
	}
	for(var i = 0; i < links.length; i++) {
		c.lineWidth = 1;
		c.fillStyle = c.strokeStyle = (links[i] == selectedObject) ? 'blue' : 'black';
		links[i].draw(c);
	}
	if(currentLink != null) {
		c.lineWidth = 1;
		c.fillStyle = c.strokeStyle = 'black';
		currentLink.draw(c);
	}

	c.restore();
}

function draw() {
	drawUsing(canvas.getContext('2d'));
	saveBackup();
}

function selectObject(x, y) {
	for(var i = 0; i < nodes.length; i++) {
		if(nodes[i].containsPoint(x, y)) {
			return nodes[i];
		}
	}
	for(var i = 0; i < links.length; i++) {
		if(links[i].containsPoint(x, y)) {
			return links[i];
		}
	}
	return null;
}

function snapNode(node) {
	var element = document.getElementById('gridsnap');
	var gridSnap = element.checked;
	if (gridSnap) {
		var xTemp = (node.x + Math.floor(gridSnapPadding / 2));
		var yTemp = (node.y + Math.floor(gridSnapPadding / 2));
		node.x = xTemp - (xTemp % gridSnapPadding);
		node.y = yTemp - (yTemp % gridSnapPadding);
	}
	else {
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i] == node) continue;
			
			if(Math.abs(node.x - nodes[i].x) < snapToPadding) {
				node.x = nodes[i].x;
			}
			
			if(Math.abs(node.y - nodes[i].y) < snapToPadding) {
				node.y = nodes[i].y;
			}
		}
	}

}

function resizeCanvas()
{
	var canvas = document.getElementById("canvas");
	canvas.width = document.getElementById("canvaswidth").value;
	canvas.height = document.getElementById("canvasheight").value;
}

window.onload = function() {
	resizeCanvas();

	document.getElementById("clearCanvas").onclick = 
	function(){
		localStorage['fsm'] = '';
		location.reload();
	};

	document.getElementById("clearNodes").onclick = function() {
		for(var i = 0; i < nodes.length; i++) {
			nodes[i].text = '';
		}
		draw();
	};

	document.getElementById('importButton').onclick = function() {
		var element = document.getElementById('output');
		localStorage['fsm'] = element.value;
		location.reload();
	};

	canvas = document.getElementById('canvas');
	restoreBackup();
	draw();

	canvas.onmousedown = function(e) {
		var mouse = crossBrowserRelativeMousePos(e);

		selectedObject = selectObject(mouse.x, mouse.y);
		movingObject = false;
		originalClick = mouse;
		if(selectedObject != null) {
			if(shift && selectedObject instanceof Node) {
				currentLink = new SelfLink(selectedObject, mouse, checkDirected());
			} else {
				movingObject = true;
				deltaMouseX = deltaMouseY = 0;
				if(selectedObject.setMouseStart) {
					selectedObject.setMouseStart(mouse.x, mouse.y);
				}
			}
			resetCaret();
		} else if(shift) {
			currentLink = new TemporaryLink(mouse, mouse, checkDirected());
		}

		draw();

		if(canvasHasFocus()) {
			// disable drag-and-drop only if the canvas is already focused
			return false;
		} else {
			// otherwise, let the browser switch the focus away from wherever it was
			resetCaret();
			return true;
		}
	};

	canvas.ondblclick = function(e) {
		var mouse = crossBrowserRelativeMousePos(e);

		selectedObject = selectObject(mouse.x, mouse.y);
		if(selectedObject == null) {
			selectedObject = new Node(mouse.x, mouse.y);

			// standardvalue from checkbox to remember if rectangle or ellipse
			if (!document.getElementById('rectangleorellipse').checked) selectedObject.type = "ellipse";
			else selectedObject.type = "rectangle";

			nodes.push(selectedObject);
			resetCaret();
			draw();
		} else if(selectedObject instanceof Node) {
			selectedObject.isAcceptState = !selectedObject.isAcceptState;
			draw();
		}
	};

	canvas.onmousemove = function(e) {
		var mouse = crossBrowserRelativeMousePos(e);

		if(currentLink != null) {
			var targetNode = selectObject(mouse.x, mouse.y);
			if(!(targetNode instanceof Node)) {
				targetNode = null;
			}

			if(selectedObject == null) {
				if(targetNode != null) {
					currentLink = new StartLink(targetNode, originalClick, checkDirected());
				} else {
					currentLink = new TemporaryLink(originalClick, mouse, checkDirected());
				}
			} else {
				if(targetNode == selectedObject) {
					currentLink = new SelfLink(selectedObject, mouse, checkDirected());
				} else if(targetNode != null) {
					currentLink = new Link(selectedObject, targetNode, checkDirected(), mouse.x, mouse.y);
				} else {
					currentLink = new TemporaryLink(selectedObject.closestPointOnEllipse(mouse.x, mouse.y), mouse, checkDirected());
				}
			}
			draw();
		}

		if(movingObject) {
			selectedObject.setAnchorPoint(mouse.x, mouse.y);
			if(selectedObject instanceof Node) {
				snapNode(selectedObject);
			}
			draw();
		}
	};

	canvas.onmouseup = function(e) {
		movingObject = false;

		if(currentLink != null) {
			if(!(currentLink instanceof TemporaryLink)) {
				selectedObject = currentLink;
				links.push(currentLink);
				resetCaret();
			}
			currentLink = null;
			draw();
		}
	};
}

var shift = false;

document.onkeydown = function(e) {
	var key = crossBrowserKey(e);

	if(key == 16) {
		shift = true;
	} else if(!canvasHasFocus()) {
		// don't read keystrokes when other things have focus
		return true;
	} else if(key == 8) { // backspace key
		if(selectedObject != null && 'text' in selectedObject) {
			selectedObject.text = selectedObject.text.substr(0, selectedObject.text.length - 1);
			resetCaret();
			draw();
		}

		// backspace is a shortcut for the back button, but do NOT want to change pages
		return false;
	} else if(key == 46) { // delete key
		if(selectedObject != null) {
			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i] == selectedObject) {
					nodes.splice(i--, 1);
				}
			}
			for(var i = 0; i < links.length; i++) {
				if(links[i] == selectedObject || links[i].node == selectedObject || links[i].nodeA == selectedObject || links[i].nodeB == selectedObject) {
					links.splice(i--, 1);
				}
			}
			selectedObject = null;
			draw();
		}
	} else if(key == 17) { // control key
		if(selectedObject instanceof Node) {
			if (selectedObject.type == 'ellipse' || (typeof(selectedObject.type) == 'undefined' && document.getElementById('rectangleorellipse').checked)) selectedObject.type = 'rectangle';
			else selectedObject.type = 'ellipse';
		}
	}
};

document.onkeyup = function(e) {
	var key = crossBrowserKey(e);

	if(key == 16) {
		shift = false;
	}
};

document.onkeypress = function(e) {
	// don't read keystrokes when other things have focus
	var key = crossBrowserKey(e);
	if(!canvasHasFocus()) {
		// don't read keystrokes when other things have focus
		return true;
	} else if(key >= 0x20 && key <= 0x7E && !e.metaKey && !e.altKey && !e.ctrlKey && selectedObject != null && 'text' in selectedObject) {
		selectedObject.text += String.fromCharCode(key);
		resetCaret();
		draw();

		// don't let keys do their actions (like space scrolls down the page)
		return false;
	} else if(key == 8) {
		// backspace is a shortcut for the back button, but do NOT want to change pages
		return false;
	}
};

function crossBrowserKey(e) {
	e = e || window.event;
	return e.which || e.keyCode;
}

function crossBrowserElementPos(e) {
	e = e || window.event;
	var obj = e.target || e.srcElement;
	var x = 0, y = 0;
	while(obj.offsetParent) {
		x += obj.offsetLeft;
		y += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return { 'x': x, 'y': y };
}

function crossBrowserMousePos(e) {
	e = e || window.event;
	return {
		'x': e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
		'y': e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop,
	};
}

function crossBrowserRelativeMousePos(e) {
	var element = crossBrowserElementPos(e);
	var mouse = crossBrowserMousePos(e);
	return {
		'x': mouse.x - element.x,
		'y': mouse.y - element.y
	};
}


function output(text, showInput) {
	var element = document.getElementById('output');
	element.style.display = 'block';
	element.value = text;
	setInputButtonHidden(!showInput);
}

function saveAsPNG() {
	// First, re-render the image with nothing selected.
	var oldSelectedObject = selectedObject;
	selectedObject = null;
	drawUsing(canvas.getContext('2d'));
	selectedObject = oldSelectedObject;

	// Second, crop the image to only the part with content.
	var bounds = getBoundingRect();
	var croppedWidth = bounds[2] - bounds[0];
	var croppedHeight = bounds[3] - bounds[1];
	var croppedData = canvas.getContext('2d').getImageData(bounds[0], bounds[1], croppedWidth, croppedHeight);

	// Finally, create a temporary canvas to generate PNG data.
	var tmp = document.createElement("canvas");
	tmp.width = croppedWidth;
	tmp.height = croppedHeight;
	tmp.getContext('2d').putImageData(croppedData, 0, 0);

	var pngData = tmp.toDataURL('image/png');
	document.location.href = pngData;
}

// Returns a bounding rectangle that contains all non-empty pixels. Returns an
// array: [min x, min y, max x, max y].
function getBoundingRect() {
	var context = canvas.getContext('2d');
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	var indexToLocation = function(i) {
		var pixelIndex = Math.floor(i / 4);
		var col = Math.floor(pixelIndex % canvas.width);
		var row = Math.floor(pixelIndex / canvas.width);
		return [col, row];
	};

	// Search for non-blank pixels and keep track of the outermost locations to
	// form the rectangle.
	var maxX = -1;
	var minX = canvas.width + 1;
	var maxY = -1;
	var minY = canvas.height + 1;
	for (var i = 0; i < imageData.data.length; i++) {
		if (imageData.data[i] != 0) {
			var loc = indexToLocation(i);
			var x = loc[0];
			var y = loc[1];
			if (x < minX) {
				minX = x;
			}
			if (x > maxX) {
				maxX = x;
			}
			if (y < minY) {
				minY = y;
			}
			if (y > maxY) {
				maxY = y;
			}
		}
	}
	// Return the full canvas if all pixels were blank.
	if (minX >= maxX) {
		return [0, 0, canvas.width, canvas.height];
	}
	// Add some padding around the image.
	var padding = 2;
	minX -= padding;
	minY -= padding;
	maxX += padding;
	maxY += padding;
	if (minX < 0) minX = 0;
	if (minY < 0) minY = 0;
	if (maxX > canvas.width) maxX = canvas.width;
	if (maxY > canvas.width) maxY = canvas.width;
	return [minX, minY, maxX, maxY];
}

function saveAsSVG() {
	var bounds = getBoundingRect();
	var exporter = new ExportAsSVG(bounds);
	var oldSelectedObject = selectedObject;
	selectedObject = null;
	drawUsing(exporter);
	selectedObject = oldSelectedObject;
	var svgData = exporter.toSVG();
	output(svgData);
}

function saveAsSVGWhite() {
	var bounds = getBoundingRect();
	var exporter = new ExportAsSVGWhite(bounds);
	var oldSelectedObject = selectedObject;
	selectedObject = null;
	drawUsing(exporter);
	selectedObject = oldSelectedObject;
	var svgData = exporter.toSVG();
	output(svgData);
}

function saveAsLaTeX() {
	var exporter = new ExportAsLaTeX();
	var oldSelectedObject = selectedObject;
	selectedObject = null;
	drawUsing(exporter);
	selectedObject = oldSelectedObject;
	var texData = exporter.toLaTeX();
	output(texData);
}

function saveAsJSON() {
	if(!JSON) {
		return;
	}
	var backup = backupData();
	output(JSON.stringify(backup));
}

function setInputButtonHidden(isHidden) {
	var importButton = document.getElementById('importButton');
	importButton.hidden = isHidden;
}

function loadFromJSON() {
	output('', true);
}
