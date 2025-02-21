// Loosely based on Google Prettify
// v1
(function () {
	var F = {};
	(function () {
		var b = ["abstract bool break case catch char class const const_cast continue default delete deprecated dllexport dllimport do double dynamic_cast else enum explicit extern false float for friend goto if inline int long mutable naked namespace new noinline noreturn nothrow novtable operator private property protected public register reinterpret_cast return selectany short signed sizeof static static_cast struct switch template this thread throw true try typedef typeid typename union unsigned using declaration, directive uuid virtual void volatile while typeof",
			"as base by byte checked decimal delegate descending event finally fixed foreach from group implicit in interface internal into is lock null object out override orderby params readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var", "package synchronized boolean implements import throws instanceof transient extends final strictfp native super", "debugger export function with NaN Infinity", "require sub unless until use elsif BEGIN END", "and assert def del elif except exec global lambda not or pass print raise yield False True None",
			"then end begin rescue ensure module when undef next redo retry alias defined", "done fi"];
		for(var c = 0; c < b.length; c++) {
			var a = b[c].split(" ");
			for(var d = 0; d < a.length; d++) {
				if(a[d])
					F[a[d]] = true;
			}
		}
	})
	.call(this);

	function r(b, c) {
		if(undefined === c)
			throw new Error("BAD");
		if("number" != typeof b)
			throw new Error("BAD");
		this.end = b;
		this.style = c;
	}
	r.prototype.toString = function () {
		return "[PR_TokenEnd " + this.end + (this.style ? ":" + this.style : "") + "]";
	};

	function q(b, c) {
		if(undefined === c)
			throw new Error("BAD");
		this.token = b;
		this.style = c;
	}
	q.prototype.toString = function () {
		return "[PR_Token " + this.token + (this.style ? ":" + this.style : "") + "]";
	};

	function u() {
		this.next = 0;
		this.ch = "\u0000";
	}
	var J = {
		lt: "<",
		gt: ">",
		quot: '"',
		apos: "'",
		amp: "&"
	};
	u.prototype.decode = function (b, c) {
		var a = c + 1,
			d = b.charAt(c);
		if("&" === d) {
			var f = b.indexOf(";", a);
			if (f >= 0 && f < a + 4) {
				var h = b.substring(a, f),
					i = null;
				if(h.charAt(0) === "#") {
					var e = h.charAt(1),
						g;
					if(e === "x" || e === "X") {
						g = parseInt(h.substring(2), 16);
					} else {
						g = parseInt(h.substring(1), 10);
					} if (!isNaN(g)) {
						i = String.fromCharCode(g);
					}
				}
				if(!i) {
					i = J[h.toLowerCase()];
				}
				if (i) {
					d = i;
					a = f + 1
				} else {
					a = c + 1;
					d = "\u0000"
				}
			}
		}
		this.next = a;
		this.ch = d;
		return this.ch
	};

	function x(b) {
		return b >= "a" && b <= "z" || b >= "A" && b <= "Z"
	}
	function z(b) {
		return x(b) || b == "_" || b == "$" || b == "@"
	}
	function s(b) {
		return "\t \r\n".indexOf(b) >= 0
	}
	function w(b) {
		return b >= "0" && b <= "9"
	}
	function I(b) {
		var c = 0,
			a = b.length - 1;
		while (c <= a && s(b.charAt(c))) {
			++c
		}
		while (a > c && s(b.charAt(a))) {
			--a
		}
		return b.substring(c, a + 1)
	}
	function y(b, c) {
		return b.length >= c.length && c == b.substring(0, c.length)
	}
	function L(b, c) {
		return b.length >=
			c.length && c == b.substring(b.length - c.length, b.length)
	}
	function A(b, c, a) {
		if (c < a.length) {
			return false
		}
		for (var d = 0, f = a.length; d < f; ++d) {
			if (a.charAt(d) != b[d]) {
				return false
			}
		}
		return true
	}
	function H(b) {
		return b.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/\xa0/g, "&nbsp;")
	}
	function E(b) {
		return "XMP" == b.tagName
	}
	var B = null;

	function N(b) {
		if (null == B) {
			var c = document.createElement("PRE");
			c.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
			B = !/</.test(c.innerHTML)
		}
		if (B) {
			var a =
				b.innerHTML;
			if (E(b)) {
				a = H(a)
			}
			return a
		}
		var d = [];
		for (var f = b.firstChild; f; f = f.nextSibling) {
			D(f, d)
		}
		return d.join("")
	}
	function D(b, c) {
		switch (b.nodeType) {
		case 1:
			var a = b.tagName.toLowerCase();
			c.push("<", a);
			for (var d = 0; d < b.attributes.length; ++d) {
				var f = b.attributes[d];
				if (!f.specified) {
					continue
				}
				c.push(" ");
				D(f, c)
			}
			c.push(">");
			for (var h = b.firstChild; h; h = h.nextSibling) {
				D(h, c)
			}
			if (b.firstChild || !/^(?:br|link|img)$/.test(a)) {
				c.push("</", a, ">")
			}
			break;
		case 2:
			c.push(b.name.toLowerCase(), '="', b.value.replace(/&/g, "&amp;")
				.replace(/</g,
				"&lt;")
				.replace(/>/g, "&gt;")
				.replace(/\"/g, "&quot;")
				.replace(/\xa0/, "&nbsp;"), '"');
			break;
		case 3:
		case 4:
			c.push(H(b.nodeValue));
			break
		}
	}
	function M(b, c) {
		var a = 0,
			d = new u,
			f = [];
		for (var h = 0; h < b.length; ++h) {
			var i = b[h];
			if (i.style == null) {
				f.push(i);
				continue
			}
			var e = i.token,
				g = 0,
				k = [];
			for (var l = 0, j = e.length; l < j; l = d.next) {
				d.decode(e, l);
				var o = d.ch;
				switch (o) {
				case "\t":
					k.push(e.substring(g, l));
					var m = c - a % c;
					a += m;
					for (; m >= 0; m -= "                ".length) {
						k.push("                ".substring(0, m))
					}
					g = d.next;
					break;
				case "\n":
				case "\r":
					a =
						0;
					break;
				default:
					++a
				}
			}
			k.push(e.substring(g));
			f.push(new q(k.join(""), i.style))
		}
		return f
	}
	function K(b) {
		var c = /(?:[^<]+|<\/?[a-zA-Z][^>]*>|<)/g,
			a = b.match(c),
			d = [];
		if (a) {
			var f = null;
			for (var h = 0, i = a.length; h < i; ++h) {
				var e = a[h],
					g;
				if (e.length < 2 || e.charAt(0) !== "<") {
					if (f && f.style === "pln") {
						f.token += e;
						continue
					}
					g = "pln"
				} else {
					g = null
				}
				f = new q(e, g);
				d.push(f)
			}
		}
		return d
	}
	function G(b, c) {
		var a = [],
			d = 0,
			f = 0,
			h = 0,
			i = new q("", null);
		for (var e = 0, g = c.length, k = 0; e < g; ++e) {
			var l = c[e],
				j = l.end;
			if (j === k) {
				continue
			}
			var o = j - f,
				m = i.token.length -
					h;
			while (m <= o) {
				if (m > 0) {
					a.push(new q(i.token.substring(h, i.token.length), null == i.style ? null : l.style))
				}
				f += m;
				h = 0;
				if (d < b.length) {
					i = b[d++]
				}
				o = j - f;
				m = i.token.length - h
			}
			if (o) {
				a.push(new q(i.token.substring(h, h + o), l.style));
				f += o;
				h += o
			}
		}
		return a
	}
	function R(b) {
		var c = [],
			a = 0,
			d = 0,
			f = -1,
			h = new Array(12),
			i = 0,
			e = null,
			g = new u;
		for (var k = 0, l = b.length; k < l; ++k) {
			var j = b[k];
			if ("pln" != j.style) {
				d += j.token.length;
				continue
			}
			var o = j.token;
			for (var m = 0, n = o.length; m < n;) {
				g.decode(o, m);
				var p = g.ch,
					v = g.next,
					t = null;
				switch (a) {
				case 0:
					if ("<" ==
						p) {
						a = 1
					}
					break;
				case 1:
					i = 0;
					if ("/" == p) {
						a = 7
					} else if (null == e) {
						if ("!" == p) {
							a = 2
						} else if (x(p)) {
							a = 8
						} else if ("?" == p) {
							a = 9
						} else if ("%" == p) {
							a = 11
						} else if ("<" != p) {
							a = 0
						}
					} else if ("<" != p) {
						a = 0
					}
					break;
				case 2:
					if ("-" == p) {
						a = 4
					} else if (x(p)) {
						a = 3
					} else if ("<" == p) {
						a = 1
					} else {
						a = 0
					}
					break;
				case 3:
					if (">" == p) {
						a = 0;
						t = "dec"
					}
					break;
				case 4:
					if ("-" == p) {
						a = 5
					}
					break;
				case 5:
					if ("-" == p) {
						a = 6
					}
					break;
				case 6:
					if (">" == p) {
						a = 0;
						t = "com"
					} else if ("-" == p) {
						a = 6
					} else {
						a = 4
					}
					break;
				case 7:
					if (x(p)) {
						a = 8
					} else if ("<" == p) {
						a = 1
					} else {
						a = 0
					}
					break;
				case 8:
					if (">" == p) {
						a = 0;
						t = "tag"
					}
					break;
				case 9:
					if ("?" ==
						p) {
						a = 10
					}
					break;
				case 10:
					if (">" == p) {
						a = 0;
						t = "src"
					} else if ("?" != p) {
						a = 9
					}
					break;
				case 11:
					if ("%" == p) {
						a = 12
					}
					break;
				case 12:
					if (">" == p) {
						a = 0;
						t = "src"
					} else if ("%" != p) {
						a = 11
					}
					break
				}
				if (i < h.length) {
					h[i++] = p.toLowerCase()
				}
				if (1 == a) {
					f = d + m
				}
				m = v;
				if (t != null) {
					if (null != t) {
						if (e) {
							if (A(h, i, e)) {
								e = null
							}
						} else {
							if (A(h, i, "script")) {
								e = "/script"
							} else if (A(h, i, "style")) {
								e = "/style"
							} else if (A(h, i, "xmp")) {
								e = "/xmp"
							}
						} if (e && i && "/" == h[0]) {
							t = null
						}
					}
					if (null != t) {
						c.push(new r(f, "pln"));
						c.push(new r(d + v, t))
					}
				}
			}
			d += j.token.length
		}
		c.push(new r(d, "pln"));
		return c
	}

	function V(b) {
		var c = [],
			a = 0,
			d = -1,
			f = 0;
		for (var h = 0, i = b.length; h < i; ++h) {
			var e = b[h],
				g = e.token;
			if ("pln" == e.style) {
				var k = new u,
					l = -1,
					j;
				for (var o = 0, m = g.length; o < m; l = o, o = j) {
					k.decode(g, o);
					var n = k.ch;
					j = k.next;
					if (0 == a) {
						if (n == '"' || n == "'" || n == "`") {
							c.push(new r(f + o, "pln"));
							a = 1;
							d = n
						} else if (n == "/") {
							a = 3
						} else if (n == "#") {
							c.push(new r(f + o, "pln"));
							a = 4
						}
					} else if (1 == a) {
						if (n == d) {
							a = 0;
							c.push(new r(f + j, "str"))
						} else if (n == "\\") {
							a = 2
						}
					} else if (2 == a) {
						a = 1
					} else if (3 == a) {
						if (n == "/") {
							a = 4;
							c.push(new r(f + l, "pln"))
						} else if (n == "*") {
							a = 5;
							c.push(new r(f +
								l, "pln"))
						} else {
							a = 0;
							j = o
						}
					} else if (4 == a) {
						if (n == "\r" || n == "\n") {
							a = 0;
							c.push(new r(f + o, "com"))
						}
					} else if (5 == a) {
						if (n == "*") {
							a = 6
						}
					} else if (6 == a) {
						if (n == "/") {
							a = 0;
							c.push(new r(f + j, "com"))
						} else if (n != "*") {
							a = 5
						}
					}
				}
			}
			f += g.length
		}
		var p;
		switch (a) {
		case 1:
		case 2:
			p = "str";
			break;
		case 4:
		case 5:
		case 6:
			p = "com";
			break;
		default:
			p = "pln";
			break
		}
		c.push(new r(f, p));
		return G(b, c)
	}
	function S(b, c) {
		var a = 0,
			d = 0,
			f = new u,
			h;
		for (var i = 0; i <= b.length; i = h) {
			if (i == b.length) {
				g = -2;
				h = i + 1
			} else {
				f.decode(b, i);
				h = f.next;
				var e = f.ch,
					g = d;
				switch (d) {
				case 0:
					if (z(e)) {
						g =
							1
					} else if (w(e)) {
						g = 2
					} else if (!s(e)) {
						g = 3
					}
					if (g && a < i) {
						var k = b.substring(a, i);
						c.push(new q(k, "pln"));
						a = i
					}
					break;
				case 1:
					if (!(z(e) || w(e))) {
						g = -1
					}
					break;
				case 2:
					if (!(w(e) || x(e) || e == "_")) {
						g = -1
					}
					break;
				case 3:
					if (z(e) || w(e) || s(e)) {
						g = -1
					}
					break
				}
			} if (g != d) {
				if (g < 0) {
					if (i > a) {
						var k = b.substring(a, i),
							l = new u;
						l.decode(k, 0);
						var j = l.ch,
							o = l.next == k.length,
							m;
						if (z(j)) {
							if (F[k]) {
								m = "kwd"
							} else if (j === "@") {
								m = "lit"
							} else {
								var n = false;
								if (j >= "A" && j <= "Z") {
									for (var p = l.next; p < k.length; p = l.next) {
										l.decode(k, p);
										var v = l.ch;
										if (v >= "a" && v <= "z") {
											n = true;
											break
										}
									}
									if (!n && !o && k.substring(k.length - 2) == "_t") {
										n = true
									}
								}
								m = n ? "typ" : "pln"
							}
						} else if (w(j)) {
							m = "lit"
						} else if (!s(j)) {
							m = "pun"
						} else {
							m = "pln"
						}
						a = i;
						c.push(new q(k, m))
					}
					d = 0;
					if (g == -1) {
						h = i;
						continue
					}
				}
				d = g
			}
		}
	}
	function X(b) {
		if (!(b && b.length)) {
			return b
		}
		var c = R(b);
		return G(b, c)
	}
	function W(b) {
		var c = [],
			a = 0,
			d = "tag",
			f = null,
			h = new u;
		for (var i = 0; i < b.length; ++i) {
			var e = b[i];
			if ("tag" == e.style) {
				var g = e.token,
					k = 0;
				for (var l = 0; l < g.length;) {
					h.decode(g, l);
					var j = h.ch,
						o = h.next,
						m = null,
						n = null;
					if (j == ">") {
						if ("tag" != d) {
							m = l;
							n = "tag"
						}
					} else {
						switch (a) {
						case 0:
							if ("<" ==
								j) {
								a = 1
							}
							break;
						case 1:
							if (s(j)) {
								a = 2
							}
							break;
						case 2:
							if (!s(j)) {
								n = "atn";
								m = l;
								a = 3
							}
							break;
						case 3:
							if ("=" == j) {
								m = l;
								n = "tag";
								a = 5
							} else if (s(j)) {
								m = l;
								n = "tag";
								a = 4
							}
							break;
						case 4:
							if ("=" == j) {
								a = 5
							} else if (!s(j)) {
								m = l;
								n = "atn";
								a = 3
							}
							break;
						case 5:
							if ('"' == j || "'" == j) {
								m = l;
								n = "atv";
								a = 6;
								f = j
							} else if (!s(j)) {
								m = l;
								n = "atv";
								a = 7
							}
							break;
						case 6:
							if (j == f) {
								m = o;
								n = "tag";
								a = 2
							}
							break;
						case 7:
							if (s(j)) {
								m = l;
								n = "tag";
								a = 2
							}
							break
						}
					} if (m) {
						if (m > k) {
							c.push(new q(g.substring(k, m), d));
							k = m
						}
						d = n
					}
					l = o
				}
				if (g.length > k) {
					c.push(new q(g.substring(k, g.length), d))
				}
			} else {
				if (e.style) {
					a =
						0;
					d = "tag"
				}
				c.push(e)
			}
		}
		return c
	}
	function U(b) {
		var c = [],
			a = null,
			d = new u,
			f = null;
		for (var h = 0, i = b.length;; ++h) {
			var e;
			if (h < i) {
				e = b[h];
				if (null == e.style) {
					b.push(e);
					continue
				}
			} else if (!a) {
				break
			} else {
				e = new q("", null)
			}
			var g = e.token;
			if (null == a) {
				if ("src" == e.style) {
					if ("<" == d.decode(g, 0)) {
						d.decode(g, d.next);
						if ("%" == d.ch || "?" == d.ch) {
							a = d.ch;
							c.push(new q(g.substring(0, d.next), "tag"));
							g = g.substring(d.next, g.length)
						}
					}
				} else if ("tag" == e.style) {
					if ("<" == d.decode(g, 0) && "/" != g.charAt(d.next)) {
						var k = g.substring(d.next)
							.toLowerCase();
						if (y(k, "script") || y(k, "style") || y(k, "xmp")) {
							a = "/"
						}
					}
				}
			}
			if (null != a) {
				var l = null;
				if ("src" == e.style) {
					if (a == "%" || a == "?") {
						var j = g.lastIndexOf(a);
						if (j >= 0 && ">" == d.decode(g, j + 1) && g.length == d.next) {
							l = new q(g.substring(j, g.length), "tag");
							g = g.substring(0, j)
						}
					}
					if (null == f) {
						f = []
					}
					f.push(new q(g, "pln"))
				} else if ("pln" == e.style) {
					if (null == f) {
						f = []
					}
					f.push(e)
				} else if ("tag" == e.style) {
					if ("<" == d.decode(e.token, 0) && e.token.length > d.next && "/" == d.decode(e.token, d.next)) {
						l = e
					} else {
						c.push(e)
					}
				} else if (h >= i) {
					l = e
				} else {
					if (f) {
						f.push(e)
					} else {
						c.push(e)
					}
				} if (l) {
					if (f) {
						var o =
							C(f);
						c.push(new q("<span class=embsrc>", null));
						for (var m = 0, n = o.length; m < n; ++m) {
							c.push(o[m])
						}
						c.push(new q("</span>", null));
						f = null
					}
					if (l.token) {
						c.push(l)
					}
					a = null
				}
			} else {
				c.push(e)
			}
		}
		return c
	}
	function Q(b) {
		var c = null,
			a = null;
		for (var d = 0; d < b.length; ++d) {
			if ("pln" == b[d].style) {
				c = d;
				break
			}
		}
		for (var d = b.length; --d >= 0;) {
			if ("pln" == b[d].style) {
				a = d;
				break
			}
		}
		if (null == c) {
			return b
		}
		var f = new u,
			h = b[c].token,
			i = f.decode(h, 0);
		if ('"' != i && "'" != i) {
			return b
		}
		var e = f.next,
			g = b[a].token,
			k = g.lastIndexOf("&");
		if (k < 0) {
			k = g.length - 1
		}
		var l =
			f.decode(g, k);
		if (l != i || f.next != g.length) {
			l = null;
			k = g.length
		}
		var j = [];
		for (var d = 0; d < c; ++d) {
			j.push(b[d])
		}
		j.push(new q(h.substring(0, e), "atv"));
		if (a == c) {
			j.push(new q(h.substring(e, k), "pln"))
		} else {
			j.push(new q(h.substring(e, h.length), "pln"));
			for (var d = c + 1; d < a; ++d) {
				j.push(b[d])
			}
			if (l) {
				b.push(new q(g.substring(0, k), "pln"))
			} else {
				b.push(b[a])
			}
		} if (l) {
			j.push(new q(g.substring(k, g.length), "pln"))
		}
		for (var d = a + 1; d < b.length; ++d) {
			j.push(b[d])
		}
		return j
	}
	function T(b) {
		var c = [],
			a = null,
			d = false,
			f = "";
		for (var h = 0, i = b.length; h <
			i; ++h) {
			var e = b[h],
				g = c;
			if ("tag" == e.style) {
				if (d) {
					d = false;
					f = "";
					if (a) {
						c.push(new q("<span class=embsrc>", null));
						var k = C(Q(a));
						for (var l = 0, j = k.length; l < j; ++l) {
							c.push(k[l])
						}
						c.push(new q("</span>", null));
						a = null
					}
				} else if (f && e.token.indexOf("=") >= 0) {
					var o = f.toLowerCase();
					if (y(o, "on") || "style" == o) {
						d = true
					}
				} else {
					f = ""
				}
			} else if ("atn" == e.style) {
				f += e.token
			} else if ("atv" == e.style) {
				if (d) {
					if (null == a) {
						a = []
					}
					g = a;
					e = new q(e.token, "pln")
				}
			} else {
				if (a) {
					g = a
				}
			}
			g.push(e)
		}
		return c
	}
	function C(b) {
		var c = V(b),
			a = [];
		for (var d = 0; d < c.length; ++d) {
			var f =
				c[d];
			if ("pln" === f.style) {
				S(f.token, a);
				continue
			}
			a.push(f)
		}
		return a
	}
	function O(b) {
		var c = X(b);
		c = W(c);
		c = U(c);
		c = T(c);
		return c
	}
	function P(b) {
		var c = M(K(b), 8),
			a = false;
		for (var d = 0; d < c.length; ++d) {
			if ("pln" == c[d].style) {
				if (y(I(c[d].token), "&lt;")) {
					for (var f = c.length; --f >= 0;) {
						if ("pln" == c[f].style) {
							a = L(I(c[f].token), "&gt;");
							break
						}
					}
				}
				break
			}
		}
		return a ? O(c) : C(c)
	}
	function Z(b) {
		try {
			var c = P(b),
				a = [],
				d = null;
			for (var f = 0; f < c.length; f++) {
				var h = c[f];
				if (h.style != d) {
					if (d != null) {
						a.push("</span>")
					}
					if (h.style != null) {
						a.push("<span class=",
							h.style, ">")
					}
					d = h.style
				}
				var i = h.token;
				if (null != h.style) {
					i = i.replace(/(\r\n?|\n| ) /g, "$1&nbsp;")
						.replace(/\r\n?|\n/g, "<br>")
				}
				a.push(i)
			}
			if (d != null) {
				a.push("</span>")
			}
			return a.join("")
		} catch (e) {
			if ("console" in window) {
				console.log(e);
				console.trace()
			}
			return b
		}
	}
	function Y() {
		var b = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")],
			c = [];
		for (var a = 0; a < b.length; ++a) {
			for (var d = 0; d < b[a].length; ++d) {
				c.push(b[a][d])
			}
		}
		b = null;
		var f = 0;

		function h() {
			var i =
				(new Date)
				.getTime() + 250;
			for (; f < c.length && (new Date)
				.getTime() < i; f++) {
				var e = c[f];
				if (e.className && e.className.indexOf("prettyprint") >= 0) {
					var g = false;
					for (var k = e.parentNode; k != null; k = k.parentNode) {
						if ((k.tagName == "pre" || k.tagName == "code" || k.tagName == "xmp") && k.className && k.className.indexOf("prettyprint") >= 0) {
							g = true;
							break
						}
					}
					if (!g) {
						var l = N(e);
						l = l.replace(/(?:\r\n?|\n)$/, "");
						var j = Z(l);
						if (!E(e)) {
							e.innerHTML = j
						} else {
							var o = document.createElement("PRE");
							for (var m = 0; m < e.attributes.length; ++m) {
								var n = e.attributes[m];
								if (n.specified) {
									o.setAttribute(n.name, n.value)
								}
							}
							o.innerHTML = j;
							e.parentNode.replaceChild(o, e)
						}
					}
				}
			}
			if (f < c.length) {
				setTimeout(h, 250)
			}
		}
		h()
	};
	this.prettyPrint = Y;;
})();
