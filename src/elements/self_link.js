function SelfLink(node, mouse, directed) {
	this.node = node;
	this.anchorAngle = 0;
	this.mouseOffsetAngle = 0;
	this.text = '';

	this.directed = directed;

	if(mouse) {
		this.setAnchorPoint(mouse.x, mouse.y);
	}
}

SelfLink.prototype.setMouseStart = function(x, y) {
	this.mouseOffsetAngle = this.anchorAngle - Math.atan2(y - this.node.y, x - this.node.x);
};

SelfLink.prototype.setAnchorPoint = function(x, y) {
	var snap;
	this.anchorAngle = Math.atan2(y - this.node.y, x - this.node.x) + this.mouseOffsetAngle;

	if(typeof(this.node.type) == "undefined" || this.node.type == "ellipse") {
		// snap to 90 degrees on ellipses for now
		this.anchorAngle = Math.round(this.anchorAngle / (Math.PI / 2)) * (Math.PI / 2);
	} else {
		// snap to 45 degrees
		this.anchorAngle = Math.round(this.anchorAngle / (Math.PI / 4)) * (Math.PI / 4);
	}

	// keep in the range -pi to pi so our containsPoint() function always works
	if(this.anchorAngle < -Math.PI) this.anchorAngle += 2 * Math.PI;
	if(this.anchorAngle > Math.PI) this.anchorAngle -= 2 * Math.PI;
};

SelfLink.prototype.getEndPointsAndCircle = function() {
	// half the height of circle-opening
	var hOpen = 26.553942679135446 / 2;
	var sin = Math.sin(this.anchorAngle);
	var cos = Math.cos(this.anchorAngle);
	var circleRadius = 0.75 * 30;

	if(typeof(this.node.type) == "undefined" || this.node.type == "ellipse") {
		if(this.anchorAngle % Math.PI == 0) {
			// center of circle-opening
			var x = cos * Math.sqrt(this.node.width**2 - (this.node.width * cos * hOpen / 30)**2);

			// horizontal circle position
			var circleX = cos * Math.sqrt(circleRadius**2 - hOpen**2) + x + this.node.x;
			var circleY = this.node.y;
		} else if (this.anchorAngle % (Math.PI/2) == 0) {
			// center of circle-opening
			var y = sin * Math.sqrt(30**2 - (30 * sin * hOpen / this.node.width)**2);
	
			// vertical circle position
			var circleX = this.node.x;
			var circleY = sin * Math.sqrt(circleRadius**2 - hOpen**2) + y + this.node.y;
		} else {
			// var phi = Math.atan2(30, this.node.width);
			// var beta = Math.atan2((30**2 / this.node.width**2) * Math.tan(phi));	
			var circleX = this.node.x + 1.5 * 30 * Math.cos(this.anchorAngle);
			var circleY = this.node.y + 1.5 * 30 * Math.sin(this.anchorAngle);
		}
	
		// endpoints for pointer
		var startAngle = this.anchorAngle - Math.PI * 0.8;
		var endAngle = this.anchorAngle + Math.PI * 0.8;
		var startX = circleX + Math.cos(startAngle) * circleRadius;
		var startY = circleY + Math.sin(startAngle) * circleRadius;
		var endX = circleX + Math.cos(endAngle) * circleRadius;
		var endY = circleY + Math.sin(endAngle) * circleRadius;
	
		return {
			'hasCircle': true,
			'startX': startX,
			'startY': startY,
			'endX': endX,
			'endY': endY,
			'startAngle': startAngle,
			'endAngle': endAngle,
			'circleX': circleX,
			'circleY': circleY,
			'circleRadius': circleRadius
		};
	} else {
		if(this.anchorAngle % Math.PI == 0) {
			// horizontal circle position
			var circleX = cos * this.node.width + cos * Math.sqrt(circleRadius**2 - hOpen**2) + this.node.x;
			var circleY = this.node.y;
		} else if (this.anchorAngle % (Math.PI/2) == 0) {
			// vertical circle position
			var circleX = this.node.x;
			var circleY = sin * 30 + sin * Math.sqrt(circleRadius**2 - hOpen**2) + this.node.y;
		} else {
			var a = 2 * hOpen;
			var d = Math.sqrt(circleRadius**2 - hOpen**2); // distance: circle center to circle opening

			if(this.anchorAngle == (Math.PI / 4)) {
				var circleX = this.node.x + this.node.width - a/2 + d;
				var circleY = this.node.y + 30 - a/2 + d;
			} else if(this.anchorAngle == (3 * Math.PI / 4)) {
				var circleX = this.node.x - this.node.width + a/2 - d;
				var circleY = this.node.y + 30 - a/2 + d;
			} else if(this.anchorAngle == (- Math.PI / 4)) {
				var circleX = this.node.x + this.node.width - a/2 + d;
				var circleY = this.node.y - 30 + a/2 - d;
			} else if(this.anchorAngle == (-3 * Math.PI / 4)) {
				var circleX = this.node.x - this.node.width + a/2 - d;
				var circleY = this.node.y - 30 + a/2 - d;
			}
		}
	
		// endpoints for pointer
		var startAngle = this.anchorAngle - Math.PI * 0.8;
		var endAngle = this.anchorAngle + Math.PI * 0.8;
		var startX = circleX + Math.cos(startAngle) * circleRadius;
		var startY = circleY + Math.sin(startAngle) * circleRadius;
		var endX = circleX + Math.cos(endAngle) * circleRadius;
		var endY = circleY + Math.sin(endAngle) * circleRadius;
	
		return {
			'hasCircle': true,
			'startX': startX,
			'startY': startY,
			'endX': endX,
			'endY': endY,
			'startAngle': startAngle,
			'endAngle': endAngle,
			'circleX': circleX,
			'circleY': circleY,
			'circleRadius': circleRadius
		};
	}




	var circleRadius = 0.75 * 30;  // 22.5
	var circleX = this.node.x + 1.5 * 30 * Math.cos(this.anchorAngle);
	var circleY = this.node.y + 1.5 * 30 * Math.sin(this.anchorAngle);
	var circle = this.node.closestPointOnEllipse(circleX, circleY);
	// var distance = Math.sqrt((circleX - circle.x)**2 + (circleY - circle.y)**2);
	// console.log(distance);

	var startAngle = this.anchorAngle - Math.PI * 0.8;
	var endAngle = this.anchorAngle + Math.PI * 0.8;


	var xk = circle.x + 15 * Math.cos(this.anchorAngle) - this.node.x;
	var yk = circle.y + 15 * Math.sin(this.anchorAngle) - this.node.y;
	var r = this.node.width;

	var y1 = Math.sqrt(-(900 * xk**2 * r**2)/(r**4 - 1800 * r**2 + 810000) - (810000 * xk**2) / (r**4 - 1800 * r**2 + 810000) - (13500 * Math.sqrt(16 * xk**4 * r**2 - 64 * xk**3 * yk * r**2 + 96 * xk**2 * yk**2 * r**2 - 7 * xk**2 * r**4 + 6300 * xk**2 * r**2 - 64 * xk * yk**3 * r**2 + 14 * xk * yk * r**4 - 12600 * xk * yk * r**2 + 16 * yk**4 * r**2 - 7 * yk**2 * r**4 + 6300 * yk**2 * r**2)) / (r**4 - 1800 * r**2 + 810000) + (1800 * xk * yk * r**2) / (r**4 - 1800 * r**2 + 810000) + (1620000 * xk * yk) / (r**4 - 1800 * r**2 + 810000) - (900 * yk**2 * r**2) / (r**4 - 1800 * r**2 + 810000) - (810000 * yk**2) / (r**4 - 1800 * r**2 + 810000) + (900 * r**4) / (r**4 - 1800 * r**2 + 810000) - (1265625 * r**2) / (r**4 - 1800 * r**2 + 810000) + 410062500 / (r**4 - 1800 * r**2 + 810000));
	var y2 = -Math.sqrt(-(900 * xk**2 * r**2)/(r**4 - 1800 * r**2 + 810000) - (810000 * xk**2) / (r**4 - 1800 * r**2 + 810000) - (13500 * Math.sqrt(16 * xk**4 * r**2 - 64 * xk**3 * yk * r**2 + 96 * xk**2 * yk**2 * r**2 - 7 * xk**2 * r**4 + 6300 * xk**2 * r**2 - 64 * xk * yk**3 * r**2 + 14 * xk * yk * r**4 - 12600 * xk * yk * r**2 + 16 * yk**4 * r**2 - 7 * yk**2 * r**4 + 6300 * yk**2 * r**2)) / (r**4 - 1800 * r**2 + 810000) + (1800 * xk * yk * r**2) / (r**4 - 1800 * r**2 + 810000) + (1620000 * xk * yk) / (r**4 - 1800 * r**2 + 810000) - (900 * yk**2 * r**2) / (r**4 - 1800 * r**2 + 810000) - (810000 * yk**2) / (r**4 - 1800 * r**2 + 810000) + (900 * r**4) / (r**4 - 1800 * r**2 + 810000) - (1265625 * r**2) / (r**4 - 1800 * r**2 + 810000) + 410062500 / (r**4 - 1800 * r**2 + 810000));
	var x1 = xk + Math.sqrt(22.5^2 - (y2 - yk)^2);
	var x2 = xk - Math.sqrt(22.5^2 - (y1 - yk)^2);

	var startX = x1 + this.node.x;
	var startY = y1 + this.node.y;
	// var startX = circleX + Math.cos(startAngle) * circleRadius;
	// var startY = circleY + Math.sin(startAngle) * circleRadius;
	// var start = this.node.closestPointOnEllipse(startX, startY);

	var endX = x2 + this.node.x;
	var endY = y2 + this.node.y;
	// var endX = circleX + Math.cos(endAngle) * circleRadius;
	// var endY = circleY + Math.sin(endAngle) * circleRadius;
	// var end = this.node.closestPointOnEllipse(endX, endY);

	return {
		'hasCircle': true,
		'startX': startX, //start.x + 3 * Math.cos(startAngle),
		'startY': startY, //start.y + 3 * Math.sin(startAngle),
		'endX': endX, //end.x + 3 * Math.cos(endAngle),
		'endY': endY, //end.y + 3 * Math.sin(endAngle),
		'startAngle': startAngle,
		'endAngle': endAngle,
		'circleX': circle.x + 15 * Math.cos(this.anchorAngle),
		'circleY': circle.y + 15 * Math.sin(this.anchorAngle),
		'circleRadius': circleRadius
	};


	var circleRadius = 0.75 * 30;
	var circleX = this.node.x + 1.5 * 30 * Math.cos(this.anchorAngle);
	var circleY = this.node.y + 1.5 * 30 * Math.sin(this.anchorAngle);

	var startAngle = this.anchorAngle - Math.PI * 0.8;
	var endAngle = this.anchorAngle + Math.PI * 0.8;
	var startX = circleX + Math.cos(startAngle) * circleRadius;
	var startY = circleY + Math.sin(startAngle) * circleRadius;

	var endX = circleX + Math.cos(endAngle) * circleRadius;
	var endY = circleY + Math.sin(endAngle) * circleRadius;

	return {
		'hasCircle': true,
		'startX': startX,
		'startY': startY,
		'endX': endX,
		'endY': endY,
		'startAngle': startAngle,
		'endAngle': endAngle,
		'circleX': circleX,
		'circleY': circleY,
		'circleRadius': circleRadius
	};
};

SelfLink.prototype.draw = function(c) {
	var stuff = this.getEndPointsAndCircle();
	// draw arc
	c.beginPath();
	c.arc(stuff.circleX, stuff.circleY, stuff.circleRadius, stuff.startAngle, stuff.endAngle, false);
	c.stroke();
	// draw the text on the loop farthest from the node
	var textX = stuff.circleX + stuff.circleRadius * Math.cos(this.anchorAngle);
	var textY = stuff.circleY + stuff.circleRadius * Math.sin(this.anchorAngle);
	drawText(c, this.text, textX, textY, this.anchorAngle, selectedObject == this);
	// draw the head of the arrow
	if (this.directed) {
		drawArrow(c, stuff.endX, stuff.endY, stuff.endAngle + Math.PI * 0.4);
	}
};

SelfLink.prototype.containsPoint = function(x, y) {
	var stuff = this.getEndPointsAndCircle();
	var dx = x - stuff.circleX;
	var dy = y - stuff.circleY;
	var distance = Math.sqrt(dx*dx + dy*dy) - stuff.circleRadius;
	return (Math.abs(distance) < hitTargetPadding);
};
