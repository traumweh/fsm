function Node(x, y) {
	this.x = x;
	this.y = y;
	this.mouseOffsetX = 0;
	this.mouseOffsetY = 0;
	this.isAcceptState = false;
	this.text = '';
}

Node.prototype.setMouseStart = function(x, y) {
	this.mouseOffsetX = this.x - x;
	this.mouseOffsetY = this.y - y;
};

Node.prototype.setAnchorPoint = function(x, y) {
	this.x = x + this.mouseOffsetX;
	this.y = y + this.mouseOffsetY;
};

Node.prototype.draw = function(c) {
	if (typeof(this.type) == "undefined" || this.type == "ellipse") {
		this.type = "ellipse";

		// draw the text
		drawText(c, this.text, this.x, this.y, null, selectedObject == this);

		// draw the ellipse
		c.beginPath();
		
		// get width of node-text
		var tx = this.text
		var special = [/\\[aA]lpha/g, /\\[bB]eta/g, /\\[gG]amma/g, /\\[dD]elta/g, /\\[eE]psilo/g, /\\[zZ]eta/g, /\\[eE]ta/g, /\\[tT]heta/g, /\\[iI]ota/g, /\\[kK]appa/g, /\\[lL]ambda/g, /\\[mM]u/g, /\\[nN]u/g, /\\[xX]i/g, /\\[oO]micron/g, /\\[pP]i/g, /\\[rR]ho/g, /\\[sS]igma/g, /\\[tT]au/g, /\\[uU]psilon/g, /\\[pP]hi/g, /\\[cC]hi/g, /\\[pP]si/g, /\\[oO]mega/g, /\\[rR]arr/g, /\\[lL]arr/g, /\\plus/g, /\\circ/g, /\\cup/g, /\\Cup/g, /\\cap/g, /\\empty/g, /\\blank/g, /\\mark/g];
		var subnormal = [/_a/g, /_e/g, /_h/g, /_i/g, /_j/g, /_k/g, /_l/g, /_m/g, /_n/g, /_o/g, /_p/g, /_r/g, /_s/g, /_t/g, /_u/g, /_v/g, /_x/g, /_y/g, /_X/g, /_\+/g, /_-/g, /_=/g, /_\(/g, /_\)/g, /_beta/g, /_rho/g, /_phi/g];
		var supernormal = [/\^a/g, /\^b/g, /\^c/g, /\^d/g, /\^e/g, /\^f/g, /\^g/g, /\^h/g, /\^i/g, /\^j/g, /\^k/g, /\^l/g, /\^m/g, /\^n/g, /\^o/g, /\^p/g, /\^r/g, /\^s/g, /\^t/g, /\^u/g, /\^v/g, /\^w/g, /\^x/g, /\^y/g, /\^z/g, /\^A/g, /\^B/g, /\^C/g, /\^D/g, /\^E/g, /\^F/g, /\^G/g, /\^H/g, /\^I/g, /\^J/g, /\^K/g, /\^L/g, /\^M/g, /\^N/g, /\^O/g, /\^P/g, /\^S/g, /\^T/g, /\^U/g, /\^V/g, /\^W/g, /\^X/g, /\^Y/g, /\^Z/g, /\^\+/g, /\^-/g, /\^=/g, /\^\(/g, /\^\)/g, /\^alpha/g, /\^beta/g, /\^gamma/g, /\^delta/g, /\^epsilon/g, /\^theta/g, /\^iota/g, /\^Phi/g, /\^phi/g, /\^0/g, /\^1/g, /\^2/g, /\^3/g, /\^4/g, /\^5/g, /\^6/g, /\^7/g, /\^8/g, /\^9/g];

		tx = tx.replace(/_\d/g, ".");
		for(var i = 0; i < special.length; i++) {
			tx = tx.replace(special[i], "x");
		}
		for(var i = 0; i < subnormal.length; i++) {
			tx = tx.replace(subnormal[i], "x");
		}
		for(var i = 0; i < supernormal.length; i++) {
			tx = tx.replace(supernormal[i], "x");
		}
		var textwidth = c.measureText(tx).width * 0.8;
		
		// create ellipse with min. horizontal radius of 30
		if(textwidth < 30) {
			c.ellipse(this.x, this.y, 30, 30, 0, 0, 2 * Math.PI, false);
			this.width = 30;
		} else {
			c.ellipse(this.x, this.y, textwidth, 30, 0, 0, 2 * Math.PI, false);
			this.width = textwidth;
		}
		c.stroke();

		// draw a second ellipse for an accept state, min. horizontal radius of 30 - 6.
		if (this.isAcceptState) {
			if(textwidth < 30) {
				c.beginPath();
				c.ellipse(this.x, this.y, 30 - 6, 24, 0, 0, 2 * Math.PI, false);
			} else {
				c.beginPath();
				c.ellipse(this.x, this.y, textwidth - 6, 24, 0, 0, 2 * Math.PI, false);
			}
			c.stroke();
		}
	} else {
		this.type = "rectangle";

		// draw the text
		drawText(c, this.text, this.x, this.y, null, selectedObject == this);

		// draw the box
		c.beginPath();
		
		// get width of node-text
		var tx = this.text
		var special = [/\\[aA]lpha/g, /\\[bB]eta/g, /\\[gG]amma/g, /\\[dD]elta/g, /\\[eE]psilo/g, /\\[zZ]eta/g, /\\[eE]ta/g, /\\[tT]heta/g, /\\[iI]ota/g, /\\[kK]appa/g, /\\[lL]ambda/g, /\\[mM]u/g, /\\[nN]u/g, /\\[xX]i/g, /\\[oO]micron/g, /\\[pP]i/g, /\\[rR]ho/g, /\\[sS]igma/g, /\\[tT]au/g, /\\[uU]psilon/g, /\\[pP]hi/g, /\\[cC]hi/g, /\\[pP]si/g, /\\[oO]mega/g, /\\[rR]arr/g, /\\[lL]arr/g, /\\plus/g, /\\circ/g, /\\cup/g, /\\Cup/g, /\\cap/g, /\\empty/g, /\\blank/g, /\\mark/g];
		var subnormal = [/_a/g, /_e/g, /_h/g, /_i/g, /_j/g, /_k/g, /_l/g, /_m/g, /_n/g, /_o/g, /_p/g, /_r/g, /_s/g, /_t/g, /_u/g, /_v/g, /_x/g, /_y/g, /_X/g, /_\+/g, /_-/g, /_=/g, /_\(/g, /_\)/g, /_beta/g, /_rho/g, /_phi/g];
		var supernormal = [/\^a/g, /\^b/g, /\^c/g, /\^d/g, /\^e/g, /\^f/g, /\^g/g, /\^h/g, /\^i/g, /\^j/g, /\^k/g, /\^l/g, /\^m/g, /\^n/g, /\^o/g, /\^p/g, /\^r/g, /\^s/g, /\^t/g, /\^u/g, /\^v/g, /\^w/g, /\^x/g, /\^y/g, /\^z/g, /\^A/g, /\^B/g, /\^C/g, /\^D/g, /\^E/g, /\^F/g, /\^G/g, /\^H/g, /\^I/g, /\^J/g, /\^K/g, /\^L/g, /\^M/g, /\^N/g, /\^O/g, /\^P/g, /\^S/g, /\^T/g, /\^U/g, /\^V/g, /\^W/g, /\^X/g, /\^Y/g, /\^Z/g, /\^\+/g, /\^-/g, /\^=/g, /\^\(/g, /\^\)/g, /\^alpha/g, /\^beta/g, /\^gamma/g, /\^delta/g, /\^epsilon/g, /\^theta/g, /\^iota/g, /\^Phi/g, /\^phi/g, /\^0/g, /\^1/g, /\^2/g, /\^3/g, /\^4/g, /\^5/g, /\^6/g, /\^7/g, /\^8/g, /\^9/g];

		tx = tx.replace(/_\d/g, ".");
		for(var i = 0; i < special.length; i++) {
			tx = tx.replace(special[i], "x");
		}
		for(var i = 0; i < subnormal.length; i++) {
			tx = tx.replace(subnormal[i], "x");
		}
		for(var i = 0; i < supernormal.length; i++) {
			tx = tx.replace(supernormal[i], "x");
		}
		var textwidth = c.measureText(tx).width * 0.8;
		
		// create rectangle with min. horizontal radius of 30
		if(textwidth < 30) {
			c.rect(this.x - 30, this.y - 30, 30 * 2, 30 * 2);
			this.width = 30;
		} else {
			c.rect(this.x - textwidth, this.y - 30, textwidth * 2, 30 * 2);
			this.width = textwidth;
		}
		c.stroke();

		// draw a second rectangle for an accept state, min. horizontal radius of 30 - 6.
		if (this.isAcceptState) {
			if(textwidth < 30) {
				c.beginPath();
				c.rect(this.x - 30 + 6, this.y - 30 + 6, (30 - 6) * 2, (30 - 6) * 2);
			} else {
				c.beginPath();
				c.rect(this.x - textwidth + 6, this.y - 30 + 6, (textwidth - 6) * 2, (30 - 6) * 2);
			}
			c.stroke();
		}
	}
};

Node.prototype.closestPointOnEllipse = function(x, y) {
	if (typeof(this.type) == "undefined" || this.type == "ellipse") {
		var dx = x - this.x; // relative coordinate; x to center of node
		var dy = y - this.y; // relative coordinate; y to center of node
		var newx, newy;

		if(dx != 0) {
			var m = dy / dx;
			newx = Math.sqrt(30 ** 2 / ((30 / this.width) ** 2 + m ** 2));
			newx = dx > 0 ? newx : -newx;
			newy = m * newx;
		} else {
			newy = dy > 0 ? 30 : -30;
			newx = 0;
		}

		return {
			'x': newx + this.x,
			'y': newy + this.y,
		};
	} else {
		var dx = x - this.x;
		var dy = y - this.y;
		var m = dy / dx;
		var newx, newy, tmpy;

		if (dy >= 0 && dx >= 0) {
			tmpy = this.width * m;
			if(tmpy >= 30) {
				newy = 30;
				newx = 30 / m;
			} else {
				newy = tmpy;
				newx = this.width;
			}
		} else if (dy >= 0 && dx < 0) {
			tmpy = -this.width * m;
			if(tmpy >= 30) {
				newy = 30;
				newx = 30 / m;
			} else {
				newy = tmpy;
				newx = -this.width;
			}
		} else if (dy < 0 && dx >= 0) {
			tmpy = this.width * m;
			if(tmpy <= -30) {
				newy = -30;
				newx = -30 / m;
			} else {
				newy = tmpy;
				newx = this.width;
			}
		} else if (dy < 0 && dx < 0) {
			tmpy = -this.width * m;
			if(tmpy <= -30) {
				newy = -30;
				newx = -30 / m;
			} else {
				newy = tmpy;
				newx = -this.width;
			}
		}

		return {
			'x': newx + this.x,
			'y': newy + this.y,
		};
	}
};

Node.prototype.containsPoint = function(x, y) {
	var maxx = this.width;
	var maxy;
	
	if(Math.abs(x - this.x) <= maxx) {
		maxy = Math.sqrt((30 ** 2) - (((30 / maxx) * Math.abs(x - this.x)) ** 2))
		if(Math.abs(y - this.y) <= maxy) {
			return 1;
		}
	}
	return 0;
};
