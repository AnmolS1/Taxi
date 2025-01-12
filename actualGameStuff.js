var _ = window,
	raf = function() {
		return _.requestAnimationFrame || _.webkitRequestAnimationFrame ||
			_.mozRequestAnimationFrame || function(c) {
				setTimeout(c, 1e3 / 60);
			};
	}(),
	M = Math,
	abs = M.abs,
	to = setTimeout;

function rd(a, b) {
	if (b === undefined) {
		b = a;
		a = 0;
	}
	return M.random() * (b - a) + a;
}

function rp(a) {
	return a[~~rd(a.length)];
}

function normalizeAngle(a) {
	while (a < -Math.PI) a += Math.PI * 2;
	while (a > Math.PI) a -= Math.PI * 2;
	return a;
}

function xt(o, x) {
	var r = {};
	for (var i in o)
		r[i] = o[i];
	for (var i2 in x)
		r[i2] = x[i2];
	return r;
}

var p = CanvasRenderingContext2D.prototype;
p.fr = p.fillRect;
p.sv = p.save;
p.rs = p.restore;
p.tr = p.translate;
p.lt = p.lineTo;
p.mt = p.moveTo;
p.sc = p.scale;
p.bp = p.beginPath;
p.clg = p.createLinearGradient;
p.rt = p.rotate;
p.ft = p.fillText;
p.$l = function(x) { this.globalAlpha = x; };
p.fs = function(p) { this.fillStyle   = p; };
p.di = function(i, x, y) {
	this.drawImage.apply(this, arguments);
};

for (var i in p) {
	_[i] = function(f) {
		return function() {
			c[f].apply(c, arguments);
		};
	}(i);
}

function shape(points, $o) {
	var tx = points[0].x,
		ty = points[0].y;
	c.sv();
	c.tr(tx, ty);
	c.fs($o);
	c.bp();
	c.moveTo(0, 0);
	for (var i = 1; i < points.length; i++)
		c.lineTo(points[i].x - tx, points[i].y - ty);
	c.closePath();
	c.fill();
	c.rs();
}

function $c(w, h, rr, t) {
	var c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	var r = c.getContext("2d");
	rr(c, r, w, h);
	if (t === "$h") {
		var p = r.createPattern(c, "repeat");
		p.width = w;
		p.height = h;
		return p;
	}
	return c;
}

function $R() { }

function $m(x, a, b) {
	return M.max(a, M.min(b, x));
}

function $V(o) {
	for (var j, x, i = o.length; i; j = ~~(M.random() * i), x = o[--i],
		o[i] = o[j], o[j] = x);
	return o;
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function createCycle(pts) {
	var l = 40,
		cur, next, prev, res = [],
		anglePrev, angleNext;
	for (var i = 0; i < pts.length; i++) {
		cur = pts[i];
		next = pts[(i + 1) % pts.length];
		prev = pts[(i - 1 + pts.length) % pts.length];
		anglePrev = Math.atan2(prev.y - cur.y, prev.x - cur.x);
		angleNext = Math.atan2(next.y - cur.y, next.x - cur.x);
		res.push( {
			x: cur.x + l * Math.cos(anglePrev),
			y: cur.y + l * Math.sin(anglePrev)
		});
		res.push( {
			x: cur.x + l * Math.cos(angleNext),
			y: cur.y + l * Math.sin(angleNext)
		});
	}
	for (var i2 = 0; i2 < res.length; i2++)
		res[i2].next = res[(i2 + 1) % res.length];
	return res[0];
}

function newCar($o, noLights) {
	return $c(52, 24, function(c, r) {
		with (r) {
			fs("rgba(0,0,0,1)");
			fr(0, 0, c.width, c.height);
			tr((c.width - 50) / 2, (c.height - 22) / 2);
			fs($o);
			fr(0, 0, 50, 22);
			fs("#000");
			fr(10, 3, 5, 16);
			fr(30, 3, 10, 16);
			fr(15, 1, 7, 1);
			fr(23, 1, 7, 1);
			fr(15, 20, 7, 1);
			fr(23, 20, 7, 1);
			if (!noLights) {
				fs("#ff0");
				fr(48, 0, 2, 3);
				fr(48, 19, 2, 3);
				fs("#f00");
				fr(0, 0, 2, 3);
				fr(0, 19, 2, 3)
			}
		}
	})
}
var P = {
	w: 700,
	h: 700,
	v: 130
};

function $E() {
	window.rotation = true;
	this.can = document.querySelector("canvas");
	with(this.can) {
		width = P.w;
		height = P.h
	}
	this.ctx = window.c = this.can.getContext("2d");
	this.start();
	this.resize();
	addEventListener("resize", this.resize, false);
	addEventListener("keydown", this.$s.bind(this), false);
	addEventListener("keyup", this.$y.bind(this), false);
	this.$K = Date.now();
	raf(function() {
		G.$a();
		raf(arguments.callee)
	});
	this.elapsedList = [];
	this.$z = 0;
	this.$S = Date.now()
}
$E.prototype = {
	start: function() {
		this.$t = new $u;
		this.$p = new $O
	},
	restart: function() {
		this.$t = new $u;
		this.$p = null
	},
	gameOver: function() {
		this.$p = new $L
	},
	$a: function() {
		sv();
		sc(this.$D, this.$D);
		var n = Date.now(), e = (n - this.$K) / 1e3;
		this.$K = n;
		this.$t.$a(e);
		if (this.$p)
			this.$p.$a(e)
		$e.$a(e);
		this.$z++;
		if (this.$z === 200) {
			var totalTime = Date.now() - this.$S;
			var fps = this.$z / (totalTime / 1e3);
			if (fps < 30)
				this.$P(.6)
		}
		rs()
	},
	$U: function() {
		this.$t = new $u
	},
	resize: function() {
		to(function() {
			var $C = innerWidth,
				$G = innerHeight,
				$J = $C / $G,
				$v = P.w / P.h,
				ratioDifference = abs($J - $v),
				width, height, s = document.getElementById("canvascontainer")
				.style;
			if ($J <= $v) {
				width = $C;
				height = width / $v
			}
			else {
				height = $G;
				width = height * $v
			}
			s.width = width + "px";
			s.height = height + "px"
		}, 100)
	},
	$s: function(e) {
		if (e.keyCode == 32 || e.keyCode == 40 || e.keyCode == 38) e.preventDefault();
		if (e.keyCode == 82) window.rotation = !window.rotation;
		if (this.$p) return this.$p.$s(e.keyCode);
		this.$t.$s(e.keyCode)
	},
	$y: function(e) {
		if (this.$p) return;
		this.$t.$y(e.keyCode)
	},
	$P: function(r) {
		this.can.width = P.w * r;
		this.can.height = P.h * r;
		this.$D = r
	}
};

function $u() {
	$_ = this;
	this.score = 0;
	this.$aHs = [];
	this.cars = [];
	this.buildings = [];
	this.clients = [];
	this.clientSpots = [];
	this.textures = [];
	this.trails = [];
	this.down = {};
	this.t = 0;
	var w = 8e3,
		h = 8e3,
		bt = 100;
	var bs = 300;
	var sw = 300;
	var cellSize = 900,
		swSize = 50,
		roadSize = 200,
		xwSize = 50;
	var building = function(x, y, w, h, b) {};
	var park = function(x, y, w, h, b) {
		var tex = new Texture(grass, x, y, w, h);
		$_.textures.push(tex);
		b.visible = false;
		b.collides = false;
		for (var i = 0; i < 10; i++) {
			var t = new Tree(tex.x + ~~rd(0, tex.w), tex.y + ~~rd(0, tex.h));
			$_.buildings.push(t)
		}
	};
	var lot = function(x, y, w, h, b) {
		var tex = new Texture(parking, x, y, w, h);
		$_.textures.push(tex);
		b.visible = false;
		b.collides = false;
		$_.textures.push(new Texture(road, tex.x - swSize, tex.y + swSize *
			2, swSize, swSize * 2));
		$_.textures.push(new Texture(road, tex.x + tex.w, tex.y + swSize *
			2, swSize, swSize * 2));
		$_.textures.push(new Texture(road, tex.x - swSize, tex.y + tex.h -
			swSize * 4, swSize, swSize * 2));
		$_.textures.push(new Texture(road, tex.x + tex.w, tex.y + tex.h -
			swSize * 4, swSize, swSize * 2));
		var positions = [];
		for (var x = tex.x + swSize / 2; x < tex.x + tex.w - swSize / 2; x +=
			swSize) {
			for (var y = tex.y + swSize; y < tex.y + tex.h; y += parking.height) {
				positions.push( {
					x: x,
					y: y
				});
				positions.push( {
					x: x,
					y: y + swSize * 4
				})
			}
		}
		for (var i = 0; i < 10; i++) {
			var ind = ~~rd(positions.length);
			var pos = positions[ind];
			positions.splice(ind, 1);
			var s = parking.width / 2;
			var c = new Enemy;
			c.x = pos.x;
			c.y = pos.y;
			c.rotation = rp([M.PI / 2, -M.PI / 2]);
			$_.addCar(c)
		}
	};
	var cell = function(x, y, w, h) {
		var tex = new Texture(sidewalk, x - swSize, y - swSize, w + 2 *
			swSize, h + 2 * swSize);
		$_.textures.push(tex);
		var b = new Building(x, y, w, h);
		$_.buildings.push(b);
		var type = rp([park, park, building, building, building, lot]);
		type(x, y, w, h, b)
	};
	var cols = 10,
		rows = 10;
	for (var row = 0; row <= rows; row++) {
		for (var col = 0; col <= cols; col++) {
			$_.textures.push(new Texture(xwalkv, col * cellSize - roadSize /
				2 - xwSize, row * cellSize - roadSize / 2, xwSize, roadSize));
			$_.textures.push(new Texture(xwalkv, col * cellSize + roadSize /
				2, row * cellSize - roadSize / 2, xwSize, roadSize));
			$_.textures.push(new Texture(xwalkh, col * cellSize - roadSize /
				2, row * cellSize - roadSize / 2 - xwSize, roadSize, xwSize));
			$_.textures.push(new Texture(xwalkh, col * cellSize - roadSize /
				2, row * cellSize + roadSize / 2, roadSize, xwSize));
			$_.textures.push(new Texture(hline, col * cellSize + roadSize / 2 +
				xwSize, row * cellSize - hline.height / 2, cellSize - roadSize -
				xwSize * 2, hline.height));
			$_.textures.push(new Texture(vline, col * cellSize - vline.width /
				2, row * cellSize + roadSize / 2 + xwSize, vline.width,
				cellSize - roadSize - xwSize * 2))
		}
	}
	var double = false;
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			double = !double && col < cols - 1 && Math.random() < .5;
			var x = col * cellSize + swSize + roadSize / 2;
			var y = row * cellSize + swSize + roadSize / 2;
			var w = cellSize - 2 * swSize - roadSize;
			var h = cellSize - 2 * swSize - roadSize;
			if (double) {
				w = w * 2 + roadSize + 2 * swSize;
				col++
			}
			cell(x, y, w, h)
		}
	}
	var sizes = [[-roadSize / 2 - swSize, -roadSize / 2 - swSize, cols *
		cellSize + 4e3, -2e3], [-roadSize / 2 - swSize, rows * cellSize +
		roadSize / 2 + swSize, cols * cellSize + 4e3, 2e3], [-roadSize /
		2 - swSize, -roadSize / 2 - 2e3, -2e3, rows * cellSize + 6e3], [
		cols * cellSize + roadSize / 2 + swSize, -roadSize / 2 - 2e3,
		2e3, rows * cellSize + 6e3]];
	sizes.forEach(function(s) {
		var b = new Building(s[0], s[1], s[2], s[3]);
		b.visible = false;
		$_.buildings.push(b);
		$_.textures.push(new Texture($N, s[0], s[1], s[2], s[3]))
	});
	this.textures.push(new Texture(sidewalk, -roadSize / 2 - swSize, -
		roadSize / 2 - swSize, cols * cellSize + 2 * swSize + roadSize,
		swSize));
	this.textures.push(new Texture(sidewalk, -roadSize / 2 - swSize,
		rows * cellSize + roadSize / 2, cols * cellSize + 2 * swSize +
		roadSize, swSize));
	this.textures.push(new Texture(sidewalk, -roadSize / 2 - swSize, -
		roadSize / 2 - swSize, swSize, rows * cellSize + 2 * swSize +
		roadSize));
	this.textures.push(new Texture(sidewalk, cols * cellSize + roadSize /
		2, -roadSize / 2 - swSize, swSize, rows * cellSize + 2 * swSize +
		roadSize));
	this.player = this.addCar(new Player);
	this.player.x = cols / 2 * cellSize, this.player.y = rows / 2 *
		cellSize;
	this.camX = this.player.x - P.w / 2;
	this.$d = this.player.y - P.h / 2;
	this.camRotation = 0;
	for (var i = 0; i < this.buildings.length - 4; i++) {
		var b = this.buildings[i];
		if (b.visible && b.collides || !b.visible && !b.collides) {
			var $a = b.getCycle();
			if ($a) {
				var enemy = this.addCar(new Enemy);
				enemy.x = $a.x;
				enemy.y = $a.y;
				enemy.follow($a)
			}
			this.clientSpots = this.clientSpots.concat(b.getCorners(25))
		}
	}
	this.nextClientSpawn = 0;
	this.timeleft = 180
}
$u.prototype = {
	$a: function(e) {
		this.t += e;
		this.nextClientSpawn -= e;
		if (this.nextClientSpawn <= 0) {
			this.re$aAClients();
			this.nextClientSpawn = 5
		}
		fs(road);
		fr(0, 0, P.w, P.h);
		for (var i in this.cars)
			this.cars[i].$a(e)
		var camSpeed = !this.player.$i ? 600 : 100;
		this.camX = $_.player.x - P.w / 2 + M.cos($_.player.moveAngle) *
			100;
		this.$d = $_.player.y - P.h / 2 + M.sin($_.player.moveAngle) *
			100;
		if (this.$QTime > 0) {
			this.camX += rd(-10, 10);
			this.$d += rd(-10, 10)
		}
		var idealRotation = -this.player.rotation - M.PI / 2;
		var $b = idealRotation - this.camRotation;
		$b = normalizeAngle($b);
		var rotationSpeed = M.max(abs($b) / M.PI, .01) * M.PI * 2;
		$b = $m($b, -rotationSpeed * e, rotationSpeed * e);
		this.camRotation += $b;
		this.$QTime -= e;
		sv();
		if (window.rotation) {
			tr(P.w / 2, P.h / 2);
			rotate(this.camRotation);
			tr(-P.w / 2, -P.h / 2)
		}
		tr(-~~this.camX, -~~this.$d);
		fs(road);
		fr(~~this.camX, ~~this.$d, P.w, P.h);
		var sw = 50;
		for (var i in this.textures)
			this.textures[i].$j()
		for (var i in this.clients)
			this.clients[i].$a(e)
		for (var i = this.cars.length - 1; i >= 0; i--)
			this.cars[i].$j()
		for (var i = this.$aHs.length - 1; i >= 0; i--)
			this.$aHs[i].$j()
		for (var i in this.buildings)
			this.buildings[i].$j()
		this.player.$j2();
		rs();
		if (!G.$p) {
			this.player.hud.$a(e);
			if (!this.player.client) {
				this.timeleft -= e;
				if (this.timeleft <= 0)
					G.gameOver()
			}
		}
		if (this.player.x < -this.roadSize / 2)
			this.player.explode()
	},
	$y: function(k) {
		this.down[k] = 0;
		this.$M()
	},
	$s: function(k) {
		this.down[k] = true;
		this.$M()
	},
	$M: function() {
		this.player.rotationDir = 0;
		this.player.accelerates = false;
		this.player.brakes = false;
		if (this.down[37])
			this.player.rotationDir = -1
		if (this.down[39])
			this.player.rotationDir = 1
		if (this.down[38])
			this.player.accelerates = true
		if (this.down[40])
			this.player.brakes = true
		if (this.down[32])
			G.start()
	},
	add$w: function(p) {
		this.$aHs.push(p)
	},
	$A: function(p) {
		var ind = this.$aHs.indexOf(p);
		if (ind >= 0) this.$aHs.splice(ind, 1)
	},
	addBuilding: function(b) {
		this.buildings.push(b);
		return b
	},
	addCar: function(c) {
		this.cars.push(c);
		return c
	},
	$TCar: function(c) {
		var i = this.cars.indexOf(c);
		if (i >= 0)
			this.cars.splice(i, 1)
	},
	addClient: function(c) {
		this.clients.push(c);
		return c
	},
	$TClient: function(c) {
		var i = this.clients.indexOf(c);
		if (i >= 0) this.clients.splice(i, 1)
	},
	getRandomDestination: function() {
		return rp(this.clientSpots)
	},
	re$aAClients: function() {
		var minD = M.max(P.w, P.h);
		var maxD = M.max(P.w, P.h) * 2;
		for (var i = this.clients.length - 1; i >= 0; i--) {
			var client = this.clients[i];
			var d = dist(client.x, client.y, this.camX + P.w / 2, this.$d +
				P.h / 2);
			if (d > maxD)
				this.clients.splice(i, 1)
		}
		var potential = [];
		for (var i = 0; i < this.clientSpots.length; i++) {
			var spot = this.clientSpots[i];
			var d = dist(spot.x, spot.y, this.camX + P.w / 2, this.$d + P.h / 2);
			if (d < maxD && d > minD)
				potential.push(spot)
		}
		var target = 10;
		while (potential.length > 0 && this.clients.length < target) {
			var ind = ~~rd(potential.length);
			var spot = potential[ind];
			potential.splice(ind, 1);
			var client = this.addClient(new Client);
			client.x = spot.x;
			client.y = spot.y
		}
	},
	findClosestClientSpot: function(x, y) {
		var spot, minDist, d, closest;
		for (var i = 0; i < this.clientSpots.length; i++) {
			spot = this.clientSpots[i];
			d = dist(spot.x, spot.y, x, y);
			if (!closest || d < minDist) {
				closest = spot;
				minDist = d
			}
		}
		return closest
	},
	$Q: function() {
		this.$QTime = .5
	}
};

function $q() {
	this.$l = 0;
	$e.$f(this, "$l", 0, 1, .5)
}
$q.prototype = {
	$a: function(e) {
		$l(this.$l);
		fs("rgba(0,0,0,.7)");
		fr(0, 0, P.w, P.h)
	}
};

function $O(g) {
	$q.call(this)
}

$O.prototype = xt($q.prototype, {
	$a: function(e) {
		$q.prototype.$a.call(this, e);
		var t = "taxi drift", w = $k(t);
		$g(c, t, "white", (P.w - w) / 2, 150, 1, 1);
		t = "find customers and drive them to their destination";
		w = $k(t, .25);
		$g(c, t, "white", (P.w - w) / 2, 230, .25, 1);
		t = "press enter to start";
		w = $k(t, .5);
		$g(c, t, "white", (P.w - w) / 2, 400, .5, 1);
		t = "press r to toggle rotation";
		w = $k(t, .5);
		$g(c, t, "white", (P.w - w) / 2, 450, .5, 1);
		$l(1)
	},
	$s: function(k) {
		if (k === 13) G.$p = null
	}
});

function $L(s) {
	$q.call(this)
}
$L.prototype = xt($q.prototype, {
	$a: function(e) {
		$q.prototype.$a.call(this, e);
		var t = "game over",
			w = $k(t);
		$g(c, t, "white", (P.w - w) / 2, 200, 1, 1);
		var t = "you served " + $_.player.dropoffs + " customers",
			w = $k(t, .5);
		$g(c, t, "white", (P.w - w) / 2, 350, .5, 1);
		var t = "and collected $" + $_.player.cash,
			w = $k(t, .5);
		$g(c, t, "white", (P.w - w) / 2, 400, .5, 1);
		var t = "press enter to try again",
			w = $k(t, .5);
		$g(c, t, "white", (P.w - w) / 2, 540, .5, 1);
		$l(1)
	},
	$s: function(k) {
		if (k === 13) G.restart()
	}
});

function Car() {
	this.l = 50;
	this.w = 30;
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.speed = 0;
	this.rotationSpeed = M.PI;
	this.rotationDir = 0;
	this.vectors = [];
	this.accelerates = false;
	this.brakes = false;
	this.maxSpeed = 500;
	this.drifts = true;
	this.t = 0;
	this.maxAcceleration = 400;
	this.maxDeceleration = 1e5;
	this.maxDeceleration = 400;
	this.speedVector = {};
	this.moveAngle = 0;
	this.moveAngleSpeed = M.PI * 1.5;
	this.radius = 10;
	this.carType = rp([car.white, car.blue, car.red, car.green, car.purple,
		car.gray])
}
Car.prototype = {
	$a: function(e) {
		this.t += e;
		if (this.$i)
			return
		var oppositeAngle = this.rotation + Math.PI;
		var speedRatio = $m(1 - this.speed / this.maxSpeed, .5, 1);
		var angleDiff = normalizeAngle(this.rotation - this.moveAngle);
		var appliedDiff = $m(angleDiff, -this.moveAngleSpeed * speedRatio *
			e, this.moveAngleSpeed * speedRatio * e);
		this.moveAngle += this.drifts ? appliedDiff : angleDiff;
		var r = $m(this.speed * 3 / this.maxSpeed, -1, 1);
		this.rotation += this.rotationSpeed * e * this.rotationDir * r;
		this.x += this.speed * M.cos(this.moveAngle) * e;
		this.y += this.speed * M.sin(this.moveAngle) * e;
		var targetSpeed = 0,
			opposite = false;
		if (this.accelerates) {
			targetSpeed = this.maxSpeed;
			if (this.speed < 0) opposite = true
		}
		else if (this.brakes) {
			targetSpeed = -this.maxSpeed / 2;
			if (this.speed > 0) opposite = true
		}
		var $b = targetSpeed - this.speed;
		var acc = opposite ? this.maxAcceleration * 2 : this.maxAcceleration;
		$b = $m($b, -e * acc, e * acc);
		this.speed += $b;
		var opposition = abs(normalizeAngle(this.rotation - this.moveAngle)) /
			M.PI;
		this.speed = $m(this.speed - opposition * e * this.maxDeceleration *
			2, -this.maxSpeed, this.maxSpeed)
	},
	$j: function() {
		sv();
		tr(this.x, this.y);
		rt(this.rotation);
		var $n = this.$i ? brokenCar : this.carType;
		di($n, -$n.width / 2, -$n.height / 2);
		rs()
	},
	explode: function() {
		this.$i = true;
		for (var i = 0; i < 40; i++) {
			var c = rp(["#ff0", "#f00", "#ff8400", "#000"]);
			var p = new $w(5, c);
			p.x = this.x + rd(-5, 5);
			p.y = this.y + rd(-5, 5);
			$_.add$w(p);
			var a = rd(M.PI * 2),
				d = rd(20, 100),
				t = rd(.5, 1);
			$e.$f(p, "x", p.x, p.x + M.cos(a) * d, t);
			$e.$f(p, "y", p.y, p.y + M.sin(a) * d, t);
			$e.$f(p, "a", 1, 0, t);
			$e.$f(p, "s", p.s, p.s * rd(5, 10), t, 0, $r, function() {
				$_.$A(p)
			})
		}
	},
	collidesWith: function(c) {
		return dist(c.x, c.y, this.x, this.y) < this.radius + c.radius
	}
};

function Player() {
	Car.call(this);
	this.carType = car.yellow;
	this.client = null;
	this.hud = new HUD;
	this.lastGoodPosition = null;
	this.nextGoodPosition = null;
	this.nextGoodPositionTimer = 0;
	this.cash = 0;
	this.lives = 3;
	this.dropoffs = 0
}
Player.prototype = xt(Car.prototype, {
	$a: function(e) {
		var tmpX = this.x,
			tmpY = this.y,
			tmpAngle = this.rotation;
		this.noControlTimer -= e;
		if (this.noControlTimer >= 0) {
			this.accelerates = false;
			this.rotationDir = 0
		}
		Car.prototype.$a.call(this, e);
		if (this.$i) return;
		this.nextGoodPositionTimer -= e;
		if (this.nextGoodPositionTimer <= 0) {
			this.lastGoodPosition = this.nextGoodPosition;
			this.nextGoodPosition = {
				x: this.x,
				y: this.y
			};
			this.nextGoodPositionTimer = .1
		}
		if (this.accelerates && this.speed < 400 || this.brakes && this.speed >
			-200 || abs(this.speed) > 20 && abs(normalizeAngle(this.rotation -
				this.moveAngle)) > Math.PI / 8) {
			var posOnLine = -this.l / 2;
			var p = new $w(5, "#fff");
			p.x = this.x + M.cos(this.rotation) * posOnLine + rd(-5, 5);
			p.y = this.y + M.sin(this.rotation) * posOnLine + rd(-5, 5);
			$_.add$w(p);
			var d = 100,
				t = rd(.3, .6),
				a = this.rotation + M.PI + rd(-M.PI / 32, M.PI / 32);
			$e.$f(p, "a", 1, 0, t);
			$e.$f(p, "s", p.s, p.s * rd(5, 10), t, 0, $r, function() {
				$_.$A(this)
			})
		}
		var me = this;
		$_.buildings.forEach(function(b) {
			if (!me.$i && b.collides && b.$F(me.x, me.y))
				me.explode()
		});
		$_.cars.forEach(function(c) {
			if (!me.$i && c !== me && !c.$i && c.collidesWith(me))
				me.collided(c)
		});
		if (this.client) {
			this.clientTimeLeft = M.max(0, this.clientTimeLeft - e);
			var d = dist(this.x, this.y, this.clientSettings.destination.x,
				this.clientSettings.destination.y);
			if (d < this.clientSettings.radius && this.speed === 0)
				this.drop()
			else if (this.clientTimeLeft == 0 && this.speed < 100)
				this.drop()
		}
	},
	$j2: function() {
		if (this.clientSettings && !this.$i) {
			var r = this.t % 1 * this.clientSettings.radius;
			$l(.3);
			c.fillStyle = "#0f0";
			c.lineWidth = 4;
			c.strokeStyle = "#0f0";
			c.beginPath();
			c.arc(this.clientSettings.destination.x, this.clientSettings.destination
				.y, r, 0, 2 * M.PI, true);
			c.fill();
			c.stroke();
			$l(1);
			var d = dist(this.x, this.y, this.clientSettings.destination.x,
				this.clientSettings.destination.y);
			var angle = M.atan2(this.clientSettings.destination.y - this.y,
				this.clientSettings.destination.x - this.x);
			var arrowDist = $m(d / 1e4, 0, 1) * 200 + 100;
			if (d > 300) {
				sv();
				tr(this.x + M.cos(angle) * arrowDist, this.y + M.sin(angle) *
					arrowDist);
				c.rotate(angle);
				di(arrow, -arrow.width / 2, -arrow.height / 2);
				rs()
			}
		}
	},
	pickup: function(c){
		if (!this.client) {
			this.client = c;
			this.clientSettings = c.getDestinationSettings();
			this.clientTimeLeft = this.clientSettings.time;
			$_.$TClient(c)
		}
	},
	drop: function() {
		this.client.done = true;
		this.client.x = this.x + M.cos(this.rotation + M.PI / 2) * 40;
		this.client.y = this.y + M.sin(this.rotation + M.PI / 2) * 40;
		this.client.findSidewalk();
		$_.addClient(this.client);
		var d = dist(this.x, this.y, this.clientSettings.destination.x,
			this.clientSettings.destination.y);
		var price = d <= this.clientSettings.radius ? this.clientSettings
			.price : 0;
		if (price > 0) {
			this.hud.message("reward: $" + price);
			this.cash += price
		}
		else
			this.hud.message("too slow")
		this.client = null;
		this.clientSettings = null;
		this.dropoffs++
	},
	collided: function(c) {
		this.explode();
		c.explode();
		$_.$TCar(c);
		window.collider = c
	},
	explode: function() {
		Car.prototype.explode.call(this);
		this.lives--;
		if (this.lives > 0)
			setTimeout(this.re$aA.bind(this), 2e3)
		else
			setTimeout(G.gameOver.bind(G), 2e3)
		$_.$Q()
	},
	re$aA: function() {
		this.hud.message("cars left: " + this.lives);
		this.client = null;
		this.clientTimeLeft = 0;
		this.clientSettings = null;
		this.$i = false;
		this.x = this.lastGoodPosition.x;
		this.y = this.lastGoodPosition.y;
		this.speed = 0
	}
});

function Enemy() {
	Car.call(this);
	this.path = null;
	this.maxSpeed = 100;
	this.distanceLeft = 0;
	this.drifts = false
}
Enemy.prototype = xt(Car.prototype, {
	$a: function(e) {
		this.accelerates = !!this.path;
		var a = M.atan2($_.player.y - this.y, $_.player.x - this.x);
		var d = dist($_.player.x, $_.player.y, this.x, this.y);
		if (abs(normalizeAngle(a - this.rotation)) < M.PI / 4 && d < 300)
			this.accelerates = false
		if (this.path) {
			var targetAngle = M.atan2(this.path.y - this.y, this.path.x -
				this.x);
			var $b = normalizeAngle(targetAngle - this.rotation);
			$b = $m($b, -this.rotationSpeed * e, this.rotationSpeed * e);
			this.rotation += $b;
			if (dist(this.x, this.y, this.path.x, this.path.y) < e * this.speed) {
				this.x = this.path.x;
				this.y = this.path.y;
				this.follow(this.path.next)
			}
		}
		Car.prototype.$a.call(this, e)
	},
	follow: function(p) {
		this.path = p
	}
});

function Client() {
	this.x = this.y = 0;
	this.done = false;
	this.type = rp([clientRed, clientBlue, clientBlack, clientYellow])
}
Client.prototype = {
	$a: function(e) {
		var d = dist(this.x, this.y, $_.player.x, $_.player.y);
		if (d < 200 && !$_.player.$i && $_.player.speed < 100 && !this.done &&
			!$_.player.client) {
			this.target = null;
			if (d < 30 && $_.player.speed < 50)
				$_.player.pickup(this)
			else {
				var $b = Math.min(50 * e, d);
				this.x += M.cos(this.angle) * $b;
				this.y += M.sin(this.angle) * $b
			}
		}
		else if (!this.target)
			this.findSidewalk()
		if (this.target) {
			var d = dist(this.x, this.y, this.target.x, this.target.y);
			var $b = Math.min(50 * e, d);
			if ($b > 0) {
				this.angle = M.atan2(this.target.y - this.y, this.target.x -
					this.x);
				this.x += M.cos(this.angle) * $b;
				this.y += M.sin(this.angle) * $b
			}
		}
		else
			this.angle = M.atan2($_.player.y - this.y, $_.player.x - this.x)
		var me = this;
		$_.cars.forEach(function(c) {
			var d = dist(me.x, me.y, c.x, c.y);
			if (d < 20 && abs(c.speed) > 20)
				me.die()
		});
		this.$j()
	},
	$j: function() {
		sv();
		tr(this.x, this.y);
		rt(this.angle);
		di(this.type, -this.type.width / 2, -this.type.height / 2);
		rs()
	},
	getDestinationSettings: function() {
		var dest = $_.getRandomDestination();
		var dist = abs(this.x - dest.x) + abs(this.y - dest.y);
		var exigence = ~~rd(1, 4);
		var pricePerPx = 1 / 100;
		var perfectTime = dist / $_.player.maxSpeed;
		var reasonableIdealTime = perfectTime * 4;
		var price = ~~(exigence / 3 * pricePerPx * dist);
		var time = (1 - exigence / 4) * reasonableIdealTime;
		return {
			destination: dest,
			exigence: exigence,
			time: time,
			price: M.max(5, price),
			radius: 200
		}
	},
	die: function() {
		$_.$TClient(this);
		for (var i = 0; i < 40; i++) {
			var p = new $w(4, "#950000", 1);
			var a = rd(M.PI * 2);
			var d = rd(5, 25);
			var t = rd(.05, .2);
			p.x = this.x;
			p.y = this.y;
			$_.add$w(p);
			$e.$f(p, "a", 1, 0, 1, 3, $r, p.$T.bind(p));
			$e.$f(p, "x", p.x, p.x + M.cos(a) * d, t);
			$e.$f(p, "y", p.y, p.y + M.sin(a) * d, t)
		}
		$_.player.hud.message("don't kill customers!")
	},
	findSidewalk: function() {
		var t = $_.findClosestClientSpot(this.x, this.y);
		this.target = {
			x: t.x + rd(-15, 15),
			y: t.y + rd(-15, 15)
		}
	}
};

function HUD() {
	this.msgT = 0
}
HUD.prototype = {
	$a: function(e) {
		this.msgT -= e;
		var m;
		if ($_.player.$i)
			m = "wasted"
		else if (this.msgT > 0)
			m = this.msg
		else if ($_.player.client) {
			var tl = M.ceil(M.max(0, $_.player.clientTimeLeft));
			m = "customer time left: " + tl
		}
		else
			m = "find a customer"
		var w = $k(m, .5);
		var x = (P.w - w) / 2,
			y = P.h / 2 + 200;
		$g(c, m, "white", x, y, .5, 1);
		m = "cash: $" + $_.player.cash;
		w = $k(m, .5);
		$g(c, m, "white", P.w - w - 20, 20, .5, 1);
		$g(c, "cars: " + $_.player.lives, "white", 20, 20, .5, 1);
		if (!$_.player.client) {
			m = "time: " + ~~$_.timeleft;
			w = $k(m, .5);
			$g(c, m, "white", (P.w - w) / 2, 20, .5, 1)
		}
	},
	message: function(m) {
		this.msgT = 2;
		this.msg = m.toLowerCase()
	}
};

function Building(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	if (this.w < 0) {
		this.x += this.w;
		this.w = -this.w
	}
	if (this.h < 0) {
		this.y += this.h;
		this.h = -this.h
	}
	this.visible = true;
	this.collides = true
}
Building.prototype = {
	$j: function() {
		if (!this.visible) return;
		if (this.x > $_.camX + P.w + P.v || this.y > $_.$d + P.h + P.v ||
			this.x + this.w < $_.camX - P.v || this.y + this.h < $_.$d - P.v)
			return
		var topLeft1 = {
			x: this.x,
			y: this.y
		};
		var topRight1 = {
			x: this.x + this.w,
			y: this.y
		};
		var bottomRight1 = {
			x: this.x + this.w,
			y: this.y + this.h
		};
		var bottomLeft1 = {
			x: this.x,
			y: this.y + this.h
		};
		var topLeft2 = this.pointUpperPosition(this.x, this.y);
		var topRight2 = this.pointUpperPosition(this.x + this.w, this.y);
		var bottomRight2 = this.pointUpperPosition(this.x + this.w, this.y +
			this.h);
		var bottomLeft2 = this.pointUpperPosition(this.x, this.y + this.h);
		var windowWidth = 25;
		var x = topLeft2.x,
			y = topLeft2.y,
			w = bottomRight2.x - topLeft2.x,
			h = bottomRight2.y - topLeft2.y,
			r = 20;
		sv();
		tr(x, y);
		fs(roofb);
		fr(0, 0, w, h);
		fs(roof);
		fr(r, r, w - 2 * r, h - 2 * r);
		rs();
		fs("#00f");
		if (topLeft2.x > topLeft1.x) {
			shape([topLeft1, topLeft2, bottomLeft2, bottomLeft1], side1);
			var windows = this.h / (2 * windowWidth),
				stepZ = .3,
				stepY = this.h / windows;
			for (var z = stepZ / 2; z < 1; z += stepZ) {
				for (var y = this.y + stepY / 2; y < this.y + this.h; y += stepY) {
					var lower1 = this.pointUpperPosition(this.x, y - windowWidth /
						2, z);
					var upper1 = this.pointUpperPosition(this.x, y - windowWidth /
						2, z + stepZ / 2);
					var lower2 = this.pointUpperPosition(this.x, y + windowWidth /
						2, z);
					var upper2 = this.pointUpperPosition(this.x, y + windowWidth /
						2, z + stepZ / 2);
					shape([lower1, upper1, upper2, lower2], "black")
				}
			}
		}
		if (topRight2.x < topRight1.x) {
			shape([topRight2, topRight1, bottomRight1, bottomRight2], side1);
			var windows = this.h / (2 * windowWidth),
				stepZ = .3,
				stepY = this.h / windows;
			for (var z = stepZ / 2; z < 1; z += stepZ) {
				for (var y = this.y + stepY / 2; y < this.y + this.h; y += stepY) {
					var lower1 = this.pointUpperPosition(this.x + this.w, y -
						windowWidth / 2, z);
					var upper1 = this.pointUpperPosition(this.x + this.w, y -
						windowWidth / 2, z + stepZ / 2);
					var lower2 = this.pointUpperPosition(this.x + this.w, y +
						windowWidth / 2, z);
					var upper2 = this.pointUpperPosition(this.x + this.w, y +
						windowWidth / 2, z + stepZ / 2);
					shape([lower1, upper1, upper2, lower2], "black")
				}
			}
		}
		if (topLeft2.y > topLeft1.y) {
			shape([topLeft1, topLeft2, topRight2, topRight1], side2);
			var windows = this.w / (2 * windowWidth),
				stepZ = .3,
				stepX = this.w / windows;
			for (var z = stepZ / 2; z < 1; z += stepZ) {
				for (var x = this.x + stepX / 2; x < this.x + this.w; x += stepX) {
					var lower1 = this.pointUpperPosition(x - windowWidth / 2, this
						.y, z);
					var upper1 = this.pointUpperPosition(x - windowWidth / 2, this
						.y, z + stepZ / 2);
					var lower2 = this.pointUpperPosition(x + windowWidth / 2, this
						.y, z);
					var upper2 = this.pointUpperPosition(x + windowWidth / 2, this
						.y, z + stepZ / 2);
					shape([lower1, upper1, upper2, lower2], "black")
				}
			}
		}
		if (bottomLeft2.y < bottomLeft1.y) {
			shape([bottomLeft1, bottomLeft2, bottomRight2, bottomRight1],
				side2);
			var windows = this.w / (2 * windowWidth),
				stepZ = .3,
				stepX = this.w / windows;
			for (var z = stepZ / 2; z < 1; z += stepZ) {
				for (var x = this.x + stepX / 2; x < this.x + this.w; x += stepX) {
					var lower1 = this.pointUpperPosition(x - windowWidth / 2, this
						.y + this.h, z);
					var upper1 = this.pointUpperPosition(x - windowWidth / 2, this
						.y + this.h, z + stepZ / 2);
					var lower2 = this.pointUpperPosition(x + windowWidth / 2, this
						.y + this.h, z);
					var upper2 = this.pointUpperPosition(x + windowWidth / 2, this
						.y + this.h, z + stepZ / 2);
					shape([lower1, upper1, upper2, lower2], "black")
				}
			}
		}
	},
	pointUpperPosition: function(x, y, prct) {
		if (isNaN(prct)) prct = 1;
		var $agX = x - ($_.camX + P.w / 2);
		var $agY = y - ($_.$d + P.h / 2);
		return {
			x: x + $agX / P.h * 200 * prct,
			y: y + $agY / P.h * 200 * prct
		}
	},
	$F: function(x, y) {
		return x >= this.x - 10 && y >= this.y - 10 && x <= this.x + this.w +
			10 && y <= this.y + this.h + 10
	},
	getCycle: function() {
		var $a = createCycle(this.getCorners(100));
		var it = rd(8);
		for (var i = 0; i < it; i++)
			$a = $a.next
		return $a
	},
	getCorners: function(r) {
		return [ {
				x: this.x - r,
				y: this.y - r
			}, {
				x: this.x + this.w + r,
				y: this.y - r
			}, {
				x: this.x + this.w + r,
				y: this.y + this.h + r
			}, {
				x: this.x - r,
				y: this.y + this.h + r
			}
		]
	}
};

function Texture(t, x, y, w, h) {
	this.t = t;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	if (this.w < 0) {
		this.x += this.w;
		this.w = -this.w
	}
	if (this.h < 0) {
		this.y += this.h;
		this.h = -this.h
	}
}
Texture.prototype = {
	$j: function() {
		if (this.x > $_.camX + P.w + P.v || this.y > $_.$d + P.h + P.v ||
			this.x + this.w < $_.camX - P.v || this.y + this.h < $_.$d - P.v)
			return
		sv();
		tr(this.x, this.y);
		fs(this.t);
		fr(0, 0, this.w, this.h);
		rs()
	}
};
var $I = {
	a: [[1, 1, 1],    [1, , 1],     [1, 1, 1],     [1, , 1],      [1, , 1]],
	b: [[1, 1, 1],    [1, , 1],     [1, 1],        [1, , 1],      [1, 1, 1]],
	c: [[1, 1, 1],    [1, , ],      [1, , ],       [1, , ],       [1, 1, 1]],
	d: [[1, 1, 0],    [1, , 1],     [1, , 1],      [1, , 1],      [1, 1, 1]],
	e: [[1, 1, 1],    [1, , ],      [1, 1],        [1, , ],       [1, 1, 1]],
	f: [[1, 1, 1],    [1, , ],      [1, 1],        [1, , ],       [1, , ]],
	g: [[1, 1, 1],    [1, , ],      [1, , ],       [1, , 1],      [1, 1, 1]],
	h: [[1, , 1],     [1, , 1],     [1, 1, 1],     [1, , 1],      [1, , 1]],
	i: [[1, 1, 1],    [, 1],        [, 1],         [, 1],         [1, 1, 1]],
	j: [[, , 1],      [, , 1],      [, , 1],       [1, , 1],      [1, 1, 1]],
	k: [[1, , 1],     [1, , 1],     [1, 1],        [1, , 1],      [1, , 1]],
	l: [[1, , 0],     [1, , ],      [1, , ],       [1, , ],       [1, 1, 1]],
	m: [[1, , 1],     [1, 1, 1],    [1, , 1],      [1, , 1],      [1, , 1]],
	n: [[1, 1, 1],    [1, , 1],     [1, , 1],      [1, , 1],      [1, , 1]],
	o: [[1, 1, 1],    [1, , 1],     [1, , 1],      [1, , 1],      [1, 1, 1]],
	p: [[1, 1, 1],    [1, , 1],     [1, 1, 1],     [1, , ],       [1, , ]],
	r: [[1, 1, 1],    [1, , 1],     [1, 1],        [1, , 1],      [1, , 1]],
	s: [[1, 1, 1],    [1, , ],      [1, 1, 1],     [, , 1],       [1, 1, 1]],
	t: [[1, 1, 1],    [, 1],        [, 1],         [, 1],         [, 1]],
	u: [[1, , 1],     [1, , 1],     [1, , 1],      [1, , 1],      [1, 1, 1]],
	v: [[1, , 1],     [1, , 1],     [1, , 1],      [1, , 1],      [, 1]],
	w: [[1, , , , 1], [1, , , , 1], [1, , 1, , 1], [1, , 1, , 1], [, 1, , 1]],
	x: [[1, , 1],     [1, , 1],     [, 1],         [1, , 1],      [1, , 1]],
	y: [[1, , 1],     [1, , 1],     [1, 1, 1],     [, 1],         [, 1]],
	
	"'": [[1]],
	".": [[0],       [0],     [0],      [0],    [1]],
	" ": [[, 0],     [, ],    [, ],     [, ],   [, ]],
	"-": [[, 0],     [, ],    [1, 1],   [, ],   [, ]],
	":": [[0],       [1],     [],       [1],    []],
	"?": [[1, 1, 1], [, , 1], [, 1, 1], [, , ], [, 1]],
	"!": [[, 1],     [, 1],   [, 1],    [, , ], [, 1]],
	
	1: [[1, 1, 0], [, 1],    [, 1],     [, 1],     [1, 1, 1]],
	2: [[1, 1, 1], [, , 1],  [1, 1, 1], [1, , ],   [1, 1, 1]],
	3: [[1, 1, 1], [, , 1],  [, 1, 1],  [, , 1],   [1, 1, 1]],
	4: [[1, , 0],  [1, , ],  [1, , 1],  [1, 1, 1], [, , 1]],
	5: [[1, 1, 1], [1, , ],  [1, 1],    [, , 1],   [1, 1]],
	6: [[1, 1, 1], [1, , ],  [1, 1, 1], [1, , 1],  [1, 1, 1]],
	7: [[1, 1, 1], [, , 1],  [, 1],     [, 1],     [, 1]],
	8: [[1, 1, 1], [1, , 1], [1, 1, 1], [1, , 1],  [1, 1, 1]],
	9: [[1, 1, 1], [1, , 1], [1, 1, 1], [, , 1],   [1, 1, 1]],
	0: [[1, 1, 1], [1, , 1], [1, , 1],  [1, , 1],  [1, 1, 1]],
	
	$: [[, , 1, , 0], [1, 1, 1, 1, 1], [1, , 1, , ], [1, 1, 1, 1, 1],
		[, , 1, , 1], [1, 1, 1, 1, 1], [, , 1, , ]]
};
var $x = {};
var $H = function($o) {
	$x[$o] = {};
	for (var i in $I) {
		var d = $I[i];
		$x[$o][i] = $c(d[0].length * 10 + 10, d.length * 10, function(c, r) {
			r.fs($o);
			for (var i = 0; i < d.length; i++)
				for (var j = 0; j < d[i].length; j++)
					if (d[i][j])
						r.fr(j * 10, i * 10, 10, 10)
		})
	}
};
$H("white");
$H("black");
var $g = function(r, t, c, x, y, s, b) {
	s = s || 1;
	if (b) $g(r, t, "black", x, y + 5, s, false);
	r.sv();
	r.tr(x, y);
	r.sc(s, s);
	x = 0;
	for (var i = 0; i < t.length; i++) {
		var ch = t.charAt(i),
			$n = $x[c][ch];
		if ($n) {
			r.di($n, x, 0);
			x += $n.width
		}
	}
	r.rs()
};
var $k = function(t, s) {
	var w = 0,
		i = t.length;
	while (i--) {
		var $n = $x["white"][t.charAt(i)];
		w += $n ? $n.width : 0
	}
	return w * (s || 1)
};
var s = 4,
	car = {
		white: newCar("#fff"),
		broken: newCar("#1b1b1b", true),
		yellow: newCar("#ff0"),
		blue: newCar("#00f"),
		red: newCar("#f00"),
		green: newCar("#0f0"),
		purple: newCar("#f0f"),
		gray: newCar("#6c6c6c")
	},
	client = function($o) {
		return $c(20, 30, function(c, r) {
			r.fs($o);
			var w = 14,
				h = 18;
			r.fr((c.width - w) / 2, (c.height - h) / 2, w, h);
			r.bp();
			r.arc(c.width / 2, c.height / 2 - 10, 4, 0, M.PI * 2, true);
			r.arc(c.width / 2, c.height / 2 + 10, 4, 0, M.PI * 2, true);
			r.fill();
			r.fs("#e99a79");
			r.bp();
			r.arc(c.width / 2, c.height / 2, 6, 0, M.PI * 2, true);
			r.fill();
			r.fs("#000");
			r.fr(c.width / 2 + 2, c.height / 2 - 3, 2, 2);
			r.fr(c.width / 2 + 2, c.height / 2 + 3, 2, -2)
		})
	},
	clientRed = client("#900"),
	clientBlack = client("#000"),
	clientBlue = client("#00f"),
	clientYellow = client("#880"),
	arrow = $c(40, 40, function(c, r) {
		with(r) {
			tr(c.width / 2, c.height / 2);
			rotate(Math.PI / 2);
			tr(-c.width / 2, -c.height / 2);
			tr(0, c.height);
			sc(1, -1);
			fs("#fff");
			bp();
			mt(20, 40);
			lt(40, 20);
			lt(30, 20);
			lt(30, 0);
			lt(10, 0);
			lt(10, 20);
			lt(0, 20);
			fill()
		}
	}),
	brokenCar = $c(50, 22, function(c, r) {
		with(r) {
			fs("#1b1b1b");
			fr(0, 0, 50, 22);
			fs("#000");
			fr(10, 3, 5, 16);
			fr(30, 3, 10, 16);
			fr(15, 1, 7, 1);
			fr(23, 1, 7, 1);
			fr(15, 20, 7, 1);
			fr(23, 20, 7, 1)
		}
	}),
	grass = $c(200, 200, function(c, r) {
		var s = 4;
		for (var x = 0; x < c.width; x += s) {
			for (var y = 0; y < c.height; y += s) {
				r.fs("rgb(0," + (128 + ~~rd(-50, 50)) + ", 0)");
				r.fr(x, y, s, s)
			}
		}
	}, "$h"),
	sidewalk = $c(100, 100, function(c, r) {
		var b = 8;
		for (var x = 0; x < c.width; x += s) {
			for (var y = 0; y < c.height; y += s) {
				var isBorder = x < b || y < b || x >= c.width - b || y >= c.height -
					b || x >= c.width / 2 - b && x <= c.width / 2 + b || y >= c.height /
					2 - b && y <= c.height / 2 + b;
				var v = (isBorder ? 80 : 100) + ~~rd(-10, 10);
				r.fs("rgb(" + v + ", " + v + ", " + v + ")");
				r.fr(x, y, s, s)
			}
		}
	}, "$h"),
	road = $c(200, 200, function(c, r) {
		for (var x = 0; x < c.width; x += s) {
			for (var y = 0; y < c.height; y += s) {
				var v = 40 + ~~rd(-10, 10);
				r.fs("rgb(" + v + ", " + v + ", " + v + ")");
				r.fr(x, y, s, s)
			}
		}
	}, "$h"),
	$N = $c(100, 100, function(c, r) {
		for (var x = 0; x < c.width; x += s) {
			for (var y = 0; y < c.height; y += s) {
				r.fs("rgb(0, " + ~~(168 + ~~rd(-10, 10)) + ", 255)");
				r.fr(x, y, s, s)
			}
		}
	}, "$h"),
	xwalkh = $c(25, 50, function(c, r) {
		for (var x = ~~(c.width / 4); x < c.width * .75; x += s) {
			for (var y = 0; y < c.height; y += s) {
				var v = 255 - ~~rd(10, 50);
				r.fs("rgb(" + v + ", " + v + ", " + v + ")");
				r.fr(x, y, s, s)
			}
		}
	}, "$h"),
	xwalkv = $c(50, 25, function(c, r) {
		for (var x = 0; x < c.width; x += s) {
			for (var y = ~~(c.height / 4); y < c.height * .75; y += s) {
				var v = 255 - ~~rd(10, 50);
				r.fs("rgb(" + v + ", " + v + ", " + v + ")");
				r.fr(x, y, s, s)
			}
		}
	}, "$h");
roof = $c(100, 100, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var v = 100 + ~~rd(-10, 10);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), roofb = $c(100, 100, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var v = 50 + ~~rd(-10, 10);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), side1 = $c(100, 100, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var v = 128 + ~~rd(-5, 5);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), side2 = $c(100, 100, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var v = 153 + ~~rd(-5, 5);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), hline = $c(100, 4, function(c, r) {
	for (var x = c.width * .25; x < c.width * .75; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var v = 255 - ~~rd(10, 50);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), vline = $c(4, 100, function(c, r) {
	for (var y = c.height * .25; y < c.height * .75; y += s) {
		for (var x = 0; x < c.height; x += s) {
			var v = 255 - ~~rd(10, 50);
			r.fs("rgb(" + v + ", " + v + ", " + v + ")");
			r.fr(x, y, s, s)
		}
	}
}, "$h"), tree = $c(200, 200, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var d = dist(c.width / 2, c.height / 2, x, y);
			var f = d < c.width * .4 && Math.random() < .8;
			if (f) {
				var v = 50 + ~~rd(-25, 25);
				r.fs("rgb(0, " + v + ", 0)");
				r.fr(x, y, s, s)
			}
		}
	}
}), tree2 = $c(150, 150, function(c, r) {
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var d = dist(c.width / 2, c.height / 2, x, y);
			var f = d < c.width * .4 && Math.random() < .8;
			if (f) {
				var v = 50 + ~~rd(-25, 25);
				r.fs("rgb(0, " + v + ", 0)");
				r.fr(x, y, s, s)
			}
		}
	}
}), parking = $c(100, 300, function(c, r) {
	r.fs(road);
	r.fillRect(0, 0, c.width, c.height);
	for (var x = 0; x < c.width; x += s) {
		for (var y = 0; y < c.height; y += s) {
			var draw = y < s || y >= c.height - s || (x < s || x >= c.width -
				s || x >= c.width / 2 - s && x <= c.width / 2 + s) && (y < c.height *
				.3 || y >= c.height * .7);
			if (draw) {
				var v = 255 - ~~rd(10, 50);
				r.fs("rgb(" + v + ", " + v + ", " + v + ")");
				r.fr(x, y, s, s)
			}
		}
	}
}, "$h");
addEventListener("load", function() {
	G = new $E
});
var $fs = [];

function $r(t, b, c, d) {
	return t / d * c + b
}

function easeOutBack(t, b, c, d, s) {
	if (s == undefined) s = 1.70158;
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
}

function easeOutBounce(t, b, c, d) {
	if ((t /= d) < 1 / 2.75)
		return c * (7.5625 * t * t) + b
	else if (t < 2 / 2.75)
		return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b
	else if (t < 2.5 / 2.75)
		return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b
	else
		return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b
}
var $e = {
	$f: function(o, p, a, b, d, l, f, e) {
		$fs.push( {
			o: o,
			p: p,
			a: a,
			b: b,
			d: d,
			l: l || 0,
			f: f || $r,
			e: e || $R,
			t: 0
		})
	},
	$a: function(e) {
		var tw;
		for (var i = $fs.length - 1; i >= 0; i--) {
			tw = $fs[i];
			if (tw.l > 0) {
				tw.l -= e;
				tw.o[tw.p] = tw.a
			}
			else {
				tw.t = M.min(tw.d, tw.t + e);
				tw.o[tw.p] = tw.f(tw.t, tw.a, tw.b - tw.a, tw.d);
				if (tw.t == tw.d) {
					tw.e.call(tw.o);
					$fs.splice(i, 1)
				}
			}
		}
	}
};

function $w(s, c, a) {
	this.s = s;
	this.c = c;
	this.a = a
}
$w.prototype = {
	$j: function(e) {
		$l(this.a);
		fs(this.c);
		fr(this.x - this.s / 2, this.y - this.s / 2, this.s, this.s);
		$l(1)
	},
	$T: function() {
		$_.$A(this)
	}
};

function Tree(x, y) {
	this.x = x;
	this.y = y;
	this.collides = true
}
Tree.prototype = xt(Building.prototype, {
	$j: function() {
		if (this.x > $_.camX + P.w + 200 || this.y > $_.$d + P.h + 200 ||
			this.x < $_.camX - 200 || this.y < $_.$d - 200)
			return
		var p1 = this.pointUpperPosition(this.x, this.y, .2);
		var p2 = this.pointUpperPosition(this.x, this.y, .4);
		c.strokeStyle = "#5A3900";
		c.lineWidth = 15;
		bp();
		mt(this.x, this.y);
		lt(p2.x, p2.y);
		stroke();
		di(tree, p1.x - tree.width / 2, p1.y - tree.height / 2);
		di(tree2, p2.x - tree2.width / 2, p2.y - tree2.height / 2)
	},
	$F: function(x, y) {
		return abs(x - this.x) < 15 && abs(y - this.y) < 15
	},
	getCycle: function() {
		return null
	},
	getCorners: function(r) {
		return []
	}
});