function det(a, b, c, d, e, f, g, h, i) {
	return a*e*i + b*f*g + c*d*h - a*f*h - b*d*i - c*e*g;
}

function circleFromThreePoints(x1, y1, x2, y2, x3, y3) {
	var a = det(x1, y1, 1, x2, y2, 1, x3, y3, 1);
	var bx = -det(x1*x1 + y1*y1, y1, 1, x2*x2 + y2*y2, y2, 1, x3*x3 + y3*y3, y3, 1);
	var by = det(x1*x1 + y1*y1, x1, 1, x2*x2 + y2*y2, x2, 1, x3*x3 + y3*y3, x3, 1);
	var c = -det(x1*x1 + y1*y1, x1, y1, x2*x2 + y2*y2, x2, y2, x3*x3 + y3*y3, x3, y3);
	return {
		'x': -bx / (2*a),
		'y': -by / (2*a),
		'radius': Math.sqrt(bx*bx + by*by - 4*a*c) / (2*Math.abs(a))
	};
}

function fixed(number, digits) {
	return number.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}

function gradient(ax, ay, bx, by) {
	return (by - ay) / (bx - ax);
}

// (0|0): Ellipse Center
// m: Gradient of linear function
// h: y0 of linear function
// (cx|cy): Circle Center
// rc: Circle Radius
function intersectionCircleLine(h, m, cx, cy, cr) {
	var A = (m**2 + 1);
	var B = 2*(m*h - m*cy - cx);
	var C = cy**2 - cr**2 + cx**2 - 2*h*cy + h**2;

	var xa = (-B + Math.sqrt(B**2 - 4*A*C)) / (2*A);
	var xb = (-B - Math.sqrt(B**2 - 4*A*C)) / (2*A);

	return {'xa': xa, 'xb': xb}
}

// (0|0): Ellipse Center
// vr: Vertical Ellipse Radius
// hr: Horizontal Ellipse Radius
// m: Gradient of linear function
// h: y0 of linear function
// (cx|cy): Circle Center
// rc: Circle Radius
// pm: +- (1 || -1)
function approxEllipseCircleIntersection(vr, hr, cx, cy, cr, dir) {
	var s; // intersection points
	var check; // y-value of circle at tmp.x;
	var tmp = new Object;
	var pm = (dir.y < 0) ? -1 : 1; // plus minus 1; whether upper or bottom half of ellipse
	var h = pm * vr; // y-value of linear function at x=0; changes every iteration

	if (dir.x < 0) {
		p = {x: -hr, y: 0};
		q = {x: 0, y: pm * vr};
	} else {
		p = {x: 0, y: pm * vr};
		q = {x: hr, y: 0};
	}
	var m = gradient(p.x, p.y, q.x, q.y); // gradient of linear function; changes every iteration
	
	for (let i = 0; i < 10; i++) {
		s = intersectionCircleLine(h, m, cx, cy, cr);

		if ((p.x <= s.xa) && (s.xa <= q.x)) tmp.x = s.xa;
		else if ((p.x <= s.xb) && (s.xb <= q.x)) tmp.x = s.xb;
		else {
			break;
		}

		tmp.y = pm * ((vr * Math.sqrt(hr**2 - tmp.x**2)) / hr);
		check = m * tmp.x + h;

		if (tmp.y > 0) {
			if (tmp.x > 0) {
				if (tmp.y < check) {
					q.x = tmp.x;
					q.y = tmp.y;
				} else {
					p.x = tmp.x;
					p.y = tmp.y;
				}
			} else {
				if (tmp.y < check) {
					p.x = tmp.x;
					p.y = tmp.y;
				} else {
					q.x = tmp.x;
					q.y = tmp.y;
				}				
			}
		} else {
			if (tmp.x > 0) {
				if (tmp.y < check) {
					p.x = tmp.x;
					p.y = tmp.y;
				} else {
					q.x = tmp.x;
					q.y = tmp.y;
				}
			} else {
				if (tmp.y < check) {
					q.x = tmp.x;
					q.y = tmp.y;
				} else {
					p.x = tmp.x;
					p.y = tmp.y;
				}				
			}
		}
		
		m = gradient(p.x, p.y, q.x, q.y)
		h = p.y - m * p.x;
	}

	return tmp;
}

// (0|0): Rectangle Center
// vr: Vertical Rectangle Radius
// hr: Horizontal Rectangle Radius
// (cx|cy): Circle Center
// rc: Circle Radius
function getRectangleCircleIntersection(vr, hr, cx, cy, cr, dir) {
	var pm = (dir.y < 0) ? -1 : 1; // plus minus 1 whether upper or bottom side of rectangle
	var lr = (dir.x < 0) ? -1 : 1; // plus minus 1 whether left or right side of rectangle
	var p = {x:lr*hr, y:pm*vr};

	var xpair = getSecondAxisCircleCoordinates(cr, cx, cy, pm * vr);
	var ypair = getSecondAxisCircleCoordinates(cr, cy, cx, lr * hr);

	if ((-hr <= xpair.first) && (xpair.first <= hr)) p.x = xpair.first;
	else if ((-hr <= xpair.second) && (xpair.second <= hr)) p.x = xpair.second;
	else if ((-vr <= ypair.first) && (ypair.first <= vr)) p.y = ypair.first;
	else if ((-vr <= ypair.second) && (ypair.second <= vr)) p.y = ypair.second;

	return p;
}

// ((x + x0)² + (y + y0)²) / r = 1
// c: x or y
// if (c == x) {
// 	   a = y0;
// 	   b = x0;
// } else {
// 	   a = x0;
// 	   b = y0;
// }
function getSecondAxisCircleCoordinates(r, a, b, c) {
	var first = a + Math.sqrt(r**2 - (c - b)**2);
	var second = a - Math.sqrt(r**2 - (c - b)**2);
	return {first:first, second:second};
}
