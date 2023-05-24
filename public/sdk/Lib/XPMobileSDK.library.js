for ("undefined" != typeof console && void 0 !== console.log && void 0 !== console.info && void 0 !== console.error && void 0 !== console.warn && XPMobileSDKSettings.EnableConsoleLog ? "error" === XPMobileSDKSettings.EnableConsoleLog ? (console.log = function () {}, console.info = function () {}, console.warn = function () {}) : "warn" === XPMobileSDKSettings.EnableConsoleLog && (console.log = function () {}, console.info = function () {}) : (console = {}, console.log = function () {}, console.info = function () {}, console.error = function () {}, console.warn = function () {}), "function" != typeof Object.assign && (Object.assign = function (e, t) {
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(e), r = 1; r < arguments.length; r++) {
            var o = arguments[r];
            if (o)
                for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
        }
        return n
    }), function () {
        if (window.localStorage && window.sessionStorage) {
            var e = ["sessionStorage", "localStorage"];
            for (var t in e) XPMobileSDK[e[t]] = {
                storage: window[e[t]],
                setItem: function (e, t, n) {
                    if (n) {
                        var r = {
                            value: t,
                            expiration: (new Date).getTime() + n
                        };
                        this.storage.setItem(e, "expiration::" + JSON.stringify(r))
                    } else "boolean" != typeof t ? "number" != typeof t ? "object" != typeof t ? this.storage.setItem(e, t) : this.storage.setItem(e, "object::" + JSON.stringify(t)) : this.storage.setItem(e, "number::" + t) : this.storage.setItem(e, "boolean::" + t)
                },
                getItem: function (e) {
                    var t = this.storage.getItem(e);
                    if (null == t) return null;
                    if (0 == t.indexOf("expiration::")) {
                        var n = JSON.parse(t.substr(t.indexOf("::") + 2));
                        return (new Date).getTime() > n.expiration ? (this.storage.removeItem(e), null) : n.value
                    }
                    return 0 == t.indexOf("boolean::") ? "boolean::true" == t : 0 == t.indexOf("number::") ? parseFloat(t.substr(t.indexOf("::") + 2)) : 0 == t.indexOf("object::") ? JSON.parse(t.substr(t.indexOf("::") + 2)) : t
                },
                removeItem: function (e) {
                    this.storage.removeItem(e)
                },
                clear: function () {
                    this.storage.clear()
                },
                key: function (e) {
                    return this.storage.key(e)
                }
            }
        }
    }(), bpe = 0, mask = 0, radix = mask + 1, digitsStr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-", bpe = 0; 1 << bpe + 1 > 1 << bpe; bpe++);

function findPrimes(e) {
    var t, n, r, o;
    for (n = new Array(e), t = 0; t < e; t++) n[t] = 0;
    for (n[0] = 2, r = 0; n[r] < e;) {
        for (t = n[r] * n[r]; t < e; t += n[r]) n[t] = 1;
        for (n[++r] = n[r - 1] + 1; n[r] < e && n[n[r]]; n[r]++);
    }
    for (o = new Array(r), t = 0; t < r; t++) o[t] = n[t];
    return o
}

function millerRabinInt(e, t) {
    return mr_x1.length != e.length && (mr_x1 = dup(e), mr_r = dup(e), mr_a = dup(e)), copyInt_(mr_a, t), millerRabin(e, mr_a)
}

function millerRabin(e, t) {
    var n, r, o, i;
    for (mr_x1.length != e.length && (mr_x1 = dup(e), mr_r = dup(e), mr_a = dup(e)), copy_(mr_a, t), copy_(mr_r, e), copy_(mr_x1, e), addInt_(mr_r, -1), addInt_(mr_x1, -1), o = 0, n = 0; n < mr_r.length; n++)
        for (r = 1; r < mask; r <<= 1) e[n] & r ? (i = o < mr_r.length + bpe ? o : 0, n = mr_r.length, r = mask) : o++;
    if (i && rightShift_(mr_r, i), powMod_(mr_a, mr_r, e), !equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {
        for (r = 1; r <= i - 1 && !equals(mr_a, mr_x1);) {
            if (squareMod_(mr_a, e), equalsInt(mr_a, 1)) return 0;
            r++
        }
        if (!equals(mr_a, mr_x1)) return 0
    }
    return 1
}

function bitSize(e) {
    var t, n, r;
    for (t = e.length - 1; 0 == e[t] && t > 0; t--);
    for (n = 0, r = e[t]; r; r >>= 1, n++);
    return n += bpe * t
}

function expand(e, t) {
    var n = int2bigInt(0, (e.length > t ? e.length : t) * bpe, 0);
    return copy_(n, e), n
}

function randTruePrime(e) {
    var t = int2bigInt(0, e, 0);
    return randTruePrime_(t, e), trim(t, 1)
}

function randProbPrime(e) {
    return randProbPrimeRounds(e, e >= 600 ? 2 : e >= 550 ? 4 : e >= 500 ? 5 : e >= 400 ? 6 : e >= 350 ? 7 : e >= 300 ? 9 : e >= 250 ? 12 : e >= 200 ? 15 : e >= 150 ? 18 : e >= 100 ? 27 : 40)
}

function randProbPrimeRounds(e, t) {
    var n, r, o;
    for (3e4, n = int2bigInt(0, e, 0), 0 == primes.length && (primes = findPrimes(3e4)), rpprb.length != n.length && (rpprb = dup(n));;) {
        for (randBigInt_(n, e, 0), n[0] |= 1, o = 0, r = 0; r < primes.length && primes[r] <= 3e4; r++)
            if (0 == modInt(n, primes[r]) && !equalsInt(n, primes[r])) {
                o = 1;
                break
            } for (r = 0; r < t && !o; r++) {
            for (randBigInt_(rpprb, e, 0); !greater(n, rpprb);) randBigInt_(rpprb, e, 0);
            millerRabin(n, rpprb) || (o = 1)
        }
        if (!o) return n
    }
}

function mod(e, t) {
    var n = dup(e);
    return mod_(n, t), trim(n, 1)
}

function addInt(e, t) {
    var n = expand(e, e.length + 1);
    return addInt_(n, t), trim(n, 1)
}

function mult(e, t) {
    var n = expand(e, e.length + t.length);
    return mult_(n, t), trim(n, 1)
}

function powMod(e, t, n) {
    var r = expand(e, n.length);
    return powMod_(r, trim(t, 2), trim(n, 2), 0), trim(r, 1)
}

function sub(e, t) {
    var n = expand(e, e.length > t.length ? e.length + 1 : t.length + 1);
    return sub_(n, t), trim(n, 1)
}

function add(e, t) {
    var n = expand(e, e.length > t.length ? e.length + 1 : t.length + 1);
    return add_(n, t), trim(n, 1)
}

function inverseMod(e, t) {
    var n = expand(e, t.length);
    return inverseMod_(n, t) ? trim(n, 1) : null
}

function multMod(e, t, n) {
    var r = expand(e, n.length);
    return multMod_(r, t, n), trim(r, 1)
}

function randTruePrime_(e, t) {
    var n, r, o, i, s, a, c, l, u;
    if (0 == primes.length && (primes = findPrimes(3e4)), 0 == pows.length)
        for (pows = new Array(512), o = 0; o < 512; o++) pows[o] = Math.pow(2, o / 511 - 1);
    if (.1, 20, recLimit = 20, s_i2.length != e.length && (s_i2 = dup(e), s_R = dup(e), s_n1 = dup(e), s_r2 = dup(e), s_d = dup(e), s_x1 = dup(e), s_x2 = dup(e), s_b = dup(e), s_n = dup(e), s_i = dup(e), s_rm = dup(e), s_q = dup(e), s_a = dup(e), s_aa = dup(e)), t <= recLimit) {
        for (n = (1 << (t + 2 >> 1)) - 1, copyInt_(e, 0), r = 1; r;)
            for (r = 0, e[0] = 1 | 1 << t - 1 | Math.floor(Math.random() * (1 << t)), o = 1; o < primes.length && (primes[o] & n) == primes[o]; o++)
                if (0 == e[0] % primes[o]) {
                    r = 1;
                    break
                } carry_(e)
    } else {
        if (s = .1 * t * t, t > 40)
            for (i = 1; t - t * i <= 20;) i = pows[Math.floor(512 * Math.random())];
        else i = .5;
        for (u = Math.floor(i * t) + 1, randTruePrime_(s_q, u), copyInt_(s_i2, 0), s_i2[Math.floor((t - 2) / bpe)] |= 1 << (t - 2) % bpe, divide_(s_i2, s_q, s_i, s_rm), c = bitSize(s_i);;) {
            for (; randBigInt_(s_R, c, 0), !greater(s_i, s_R););
            for (addInt_(s_R, 1), add_(s_R, s_i), copy_(s_n, s_q), mult_(s_n, s_R), multInt_(s_n, 2), addInt_(s_n, 1), copy_(s_r2, s_R), multInt_(s_r2, 2), a = 0, o = 0; o < primes.length && primes[o] < s; o++)
                if (0 == modInt(s_n, primes[o]) && !equalsInt(s_n, primes[o])) {
                    a = 1;
                    break
                } if (a || millerRabinInt(s_n, 2) || (a = 1), !a) {
                for (addInt_(s_n, -3), o = s_n.length - 1; 0 == s_n[o] && o > 0; o--);
                for (l = 0, w = s_n[o]; w; w >>= 1, l++);
                for (l += bpe * o; randBigInt_(s_a, l, 0), !greater(s_n, s_a););
                if (addInt_(s_n, 3), addInt_(s_a, 2), copy_(s_b, s_a), copy_(s_n1, s_n), addInt_(s_n1, -1), powMod_(s_b, s_n1, s_n), addInt_(s_b, -1), isZero(s_b) && (copy_(s_b, s_a), powMod_(s_b, s_r2, s_n), addInt_(s_b, -1), copy_(s_aa, s_n), copy_(s_d, s_b), GCD_(s_d, s_n), equalsInt(s_d, 1))) return void copy_(e, s_aa)
            }
        }
    }
}

function randBigInt(e, t) {
    var n;
    return randBigInt_(n = int2bigInt(0, 0, Math.floor((e - 1) / bpe) + 2), e, t), n
}

function randBigInt_(e, t, n) {
    var r, o;
    for (r = 0; r < e.length; r++) e[r] = 0;
    for (o = Math.floor((t - 1) / bpe) + 1, r = 0; r < o; r++) e[r] = Math.floor(Math.random() * (1 << bpe - 1));
    e[o - 1] &= (2 << (t - 1) % bpe) - 1, 1 == n && (e[o - 1] |= 1 << (t - 1) % bpe)
}

function GCD(e, t) {
    var n;
    return GCD_(n = dup(e), dup(t)), n
}

function GCD_(e, n) {
    var r, o, i, s, a, c, l, u, d;
    for (T.length != e.length && (T = dup(e)), d = 1; d;) {
        for (d = 0, r = 1; r < n.length; r++)
            if (n[r]) {
                d = 1;
                break
            } if (!d) break;
        for (r = e.length; !e[r] && r >= 0; r--);
        for (o = e[r], i = n[r], s = 1, a = 0, c = 0, l = 1; i + c && i + l && (u = Math.floor((o + s) / (i + c)), qp = Math.floor((o + a) / (i + l)), u == qp);) t = s - u * c, s = c, c = t, t = a - u * l, a = l, l = t, t = o - u * i, o = i, i = t;
        a ? (copy_(T, e), linComb_(e, n, s, a), linComb_(n, T, l, c)) : (mod_(e, n), copy_(T, e), copy_(e, n), copy_(n, T))
    }
    if (0 != n[0])
        for (t = modInt(e, n[0]), copyInt_(e, n[0]), n[0] = t; n[0];) e[0] %= n[0], t = e[0], e[0] = n[0], n[0] = t
}

function inverseMod_(e, t) {
    var n = 1 + 2 * Math.max(e.length, t.length);
    if (!(1 & e[0] || 1 & t[0])) return copyInt_(e, 0), 0;
    for (eg_u.length != n && (eg_u = new Array(n), eg_v = new Array(n), eg_A = new Array(n), eg_B = new Array(n), eg_C = new Array(n), eg_D = new Array(n)), copy_(eg_u, e), copy_(eg_v, t), copyInt_(eg_A, 1), copyInt_(eg_B, 0), copyInt_(eg_C, 0), copyInt_(eg_D, 1);;) {
        for (; !(1 & eg_u[0]);) halve_(eg_u), 1 & eg_A[0] || 1 & eg_B[0] ? (add_(eg_A, t), halve_(eg_A), sub_(eg_B, e), halve_(eg_B)) : (halve_(eg_A), halve_(eg_B));
        for (; !(1 & eg_v[0]);) halve_(eg_v), 1 & eg_C[0] || 1 & eg_D[0] ? (add_(eg_C, t), halve_(eg_C), sub_(eg_D, e), halve_(eg_D)) : (halve_(eg_C), halve_(eg_D));
        if (greater(eg_v, eg_u) ? (sub_(eg_v, eg_u), sub_(eg_C, eg_A), sub_(eg_D, eg_B)) : (sub_(eg_u, eg_v), sub_(eg_A, eg_C), sub_(eg_B, eg_D)), equalsInt(eg_u, 0)) return negative(eg_C) && add_(eg_C, t), copy_(e, eg_C), equalsInt(eg_v, 1) ? 1 : (copyInt_(e, 0), 0)
    }
}

function inverseModInt(e, t) {
    for (var n = 1, r = 0;;) {
        if (1 == e) return n;
        if (0 == e) return 0;
        if (r -= n * Math.floor(t / e), 1 == (t %= e)) return r;
        if (0 == t) return 0;
        n -= r * Math.floor(e / t), e %= t
    }
}

function inverseModInt_(e, t) {
    return inverseModInt(e, t)
}

function eGCD_(e, t, n, r, o) {
    var i = 0,
        s = Math.max(e.length, t.length);
    for (eg_u.length != s && (eg_u = new Array(s), eg_A = new Array(s), eg_B = new Array(s), eg_C = new Array(s), eg_D = new Array(s)); !(1 & e[0] || 1 & t[0]);) halve_(e), halve_(t), i++;
    for (copy_(eg_u, e), copy_(n, t), copyInt_(eg_A, 1), copyInt_(eg_B, 0), copyInt_(eg_C, 0), copyInt_(eg_D, 1);;) {
        for (; !(1 & eg_u[0]);) halve_(eg_u), 1 & eg_A[0] || 1 & eg_B[0] ? (add_(eg_A, t), halve_(eg_A), sub_(eg_B, e), halve_(eg_B)) : (halve_(eg_A), halve_(eg_B));
        for (; !(1 & n[0]);) halve_(n), 1 & eg_C[0] || 1 & eg_D[0] ? (add_(eg_C, t), halve_(eg_C), sub_(eg_D, e), halve_(eg_D)) : (halve_(eg_C), halve_(eg_D));
        if (greater(n, eg_u) ? (sub_(n, eg_u), sub_(eg_C, eg_A), sub_(eg_D, eg_B)) : (sub_(eg_u, n), sub_(eg_A, eg_C), sub_(eg_B, eg_D)), equalsInt(eg_u, 0)) return negative(eg_C) && (add_(eg_C, t), sub_(eg_D, e)), multInt_(eg_D, -1), copy_(r, eg_C), copy_(o, eg_D), void leftShift_(n, i)
    }
}

function negative(e) {
    return e[e.length - 1] >> bpe - 1 & 1
}

function greaterShift(e, t, n) {
    var r, o = e.length,
        i = t.length;
    for (k = o + n < i ? o + n : i, r = i - 1 - n; r < o && r >= 0; r++)
        if (e[r] > 0) return 1;
    for (r = o - 1 + n; r < i; r++)
        if (t[r] > 0) return 0;
    for (r = k - 1; r >= n; r--) {
        if (e[r - n] > t[r]) return 1;
        if (e[r - n] < t[r]) return 0
    }
    return 0
}

function greater(e, t) {
    var n, r = e.length < t.length ? e.length : t.length;
    for (n = e.length; n < t.length; n++)
        if (t[n]) return 0;
    for (n = t.length; n < e.length; n++)
        if (e[n]) return 1;
    for (n = r - 1; n >= 0; n--) {
        if (e[n] > t[n]) return 1;
        if (e[n] < t[n]) return 0
    }
    return 0
}

function divide_(e, t, n, r) {
    var o, i, s, a, c, l, u, d;
    for (copy_(r, e), i = t.length; 0 == t[i - 1]; i--);
    for (d = t[i - 1], u = 0; d; u++) d >>= 1;
    for (leftShift_(t, u = bpe - u), leftShift_(r, u), o = r.length; 0 == r[o - 1] && o > i; o--);
    for (copyInt_(n, 0); !greaterShift(t, r, o - i);) subShift_(r, t, o - i), n[o - i]++;
    for (s = o - 1; s >= i; s--) {
        for (r[s] == t[i - 1] ? n[s - i] = mask : n[s - i] = Math.floor((r[s] * radix + r[s - 1]) / t[i - 1]); l = (c = (i > 1 ? t[i - 2] : 0) * n[s - i]) >> bpe, c &= mask, l = (a = l + n[s - i] * t[i - 1]) >> bpe, a &= mask, l == r[s] ? a == r[s - 1] ? c > (s > 1 ? r[s - 2] : 0) : a > r[s - 1] : l > r[s];) n[s - i]--;
        linCombShift_(r, t, -n[s - i], s - i), negative(r) && (addShift_(r, t, s - i), n[s - i]--)
    }
    rightShift_(t, u), rightShift_(r, u)
}

function carry_(e) {
    var t, n, r, o;
    for (n = e.length, r = 0, t = 0; t < n; t++) o = 0, (r += e[t]) < 0 && (r += (o = -(r >> bpe)) * radix), e[t] = r & mask, r = (r >> bpe) - o
}

function modInt(e, t) {
    var n, r = 0;
    for (n = e.length - 1; n >= 0; n--) r = (r * radix + e[n]) % t;
    return r
}

function int2bigInt(e, t, n) {
    var r;
    return r = n > (r = Math.ceil(t / bpe) + 1) ? n : r, buff = new Array(r), copyInt_(buff, e), buff
}

function str2bigInt(e, t, n) {
    var r, o, i, s, a, c = e.length;
    if (-1 == t) {
        for (i = new Array(0);;) {
            for (s = new Array(i.length + 1), o = 0; o < i.length; o++) s[o + 1] = i[o];
            if (s[0] = parseInt(e, 10), i = s, (r = e.indexOf(",", 0)) < 1) break;
            if (0 == (e = e.substring(r + 1)).length) break
        }
        return i.length < n ? (copy_(s = new Array(n), i), s) : i
    }
    for (i = int2bigInt(0, t * c, 0), o = 0; o < c && (r = digitsStr.indexOf(e.substring(o, o + 1), 0), t <= 36 && r >= 36 && (r -= 26), !(r >= t || r < 0)); o++) multInt_(i, t), addInt_(i, r);
    for (c = i.length; c > 0 && !i[c - 1]; c--);
    for (c = n > c + 1 ? n : c + 1, s = new Array(c), a = c < i.length ? c : i.length, o = 0; o < a; o++) s[o] = i[o];
    for (; o < c; o++) s[o] = 0;
    return s
}

function equalsInt(e, t) {
    var n;
    if (e[0] != t) return 0;
    for (n = 1; n < e.length; n++)
        if (e[n]) return 0;
    return 1
}

function equals(e, t) {
    var n, r = e.length < t.length ? e.length : t.length;
    for (n = 0; n < r; n++)
        if (e[n] != t[n]) return 0;
    if (e.length > t.length) {
        for (; n < e.length; n++)
            if (e[n]) return 0
    } else
        for (; n < t.length; n++)
            if (t[n]) return 0;
    return 1
}

function isZero(e) {
    var t;
    for (t = 0; t < e.length; t++)
        if (e[t]) return 0;
    return 1
}

function bigInt2str(e, t) {
    var n, r, o = "";
    if (s6.length != e.length ? s6 = dup(e) : copy_(s6, e), -1 == t) {
        for (n = e.length - 1; n > 0; n--) o += e[n] + ",";
        o += e[0]
    } else
        for (; !isZero(s6);) r = divInt_(s6, t), o = digitsStr.substring(r, r + 1) + o;
    return 0 == o.length && (o = "0"), o
}

function dup(e) {
    return buff = new Array(e.length), copy_(buff, e), buff
}

function copy_(e, t) {
    var n, r = e.length < t.length ? e.length : t.length;
    for (n = 0; n < r; n++) e[n] = t[n];
    for (n = r; n < e.length; n++) e[n] = 0
}

function copyInt_(e, t) {
    var n, r;
    for (r = t, n = 0; n < e.length; n++) e[n] = r & mask, r >>= bpe
}

function addInt_(e, t) {
    var n, r, o, i;
    for (e[0] += t, r = e.length, o = 0, n = 0; n < r; n++)
        if (i = 0, (o += e[n]) < 0 && (o += (i = -(o >> bpe)) * radix), e[n] = o & mask, !(o = (o >> bpe) - i)) return
}

function rightShift_(e, t) {
    var n, r = Math.floor(t / bpe);
    if (r) {
        for (n = 0; n < e.length - r; n++) e[n] = e[n + r];
        for (; n < e.length; n++) e[n] = 0;
        t %= bpe
    }
    for (n = 0; n < e.length - 1; n++) e[n] = mask & (e[n + 1] << bpe - t | e[n] >> t);
    e[n] >>= t
}

function halve_(e) {
    var t;
    for (t = 0; t < e.length - 1; t++) e[t] = mask & (e[t + 1] << bpe - 1 | e[t] >> 1);
    e[t] = e[t] >> 1 | e[t] & radix >> 1
}

function leftShift_(e, t) {
    var n, r = Math.floor(t / bpe);
    if (r) {
        for (n = e.length; n >= r; n--) e[n] = e[n - r];
        for (; n >= 0; n--) e[n] = 0;
        t %= bpe
    }
    if (t) {
        for (n = e.length - 1; n > 0; n--) e[n] = mask & (e[n] << t | e[n - 1] >> bpe - t);
        e[n] = mask & e[n] << t
    }
}

function multInt_(e, t) {
    var n, r, o, i;
    if (t)
        for (r = e.length, o = 0, n = 0; n < r; n++) i = 0, (o += e[n] * t) < 0 && (o += (i = -(o >> bpe)) * radix), e[n] = o & mask, o = (o >> bpe) - i
}

function divInt_(e, t) {
    var n, r, o = 0;
    for (n = e.length - 1; n >= 0; n--) r = o * radix + e[n], e[n] = Math.floor(r / t), o = r % t;
    return o
}

function linComb_(e, t, n, r) {
    var o, i, s, a;
    for (s = e.length < t.length ? e.length : t.length, a = e.length, i = 0, o = 0; o < s; o++) i += n * e[o] + r * t[o], e[o] = i & mask, i >>= bpe;
    for (o = s; o < a; o++) i += n * e[o], e[o] = i & mask, i >>= bpe
}

function linCombShift_(e, t, n, r) {
    var o, i, s, a;
    for (s = e.length < r + t.length ? e.length : r + t.length, a = e.length, i = 0, o = r; o < s; o++) i += e[o] + n * t[o - r], e[o] = i & mask, i >>= bpe;
    for (o = s; i && o < a; o++) i += e[o], e[o] = i & mask, i >>= bpe
}

function addShift_(e, t, n) {
    var r, o, i, s;
    for (i = e.length < n + t.length ? e.length : n + t.length, s = e.length, o = 0, r = n; r < i; r++) o += e[r] + t[r - n], e[r] = o & mask, o >>= bpe;
    for (r = i; o && r < s; r++) o += e[r], e[r] = o & mask, o >>= bpe
}

function subShift_(e, t, n) {
    var r, o, i, s;
    for (i = e.length < n + t.length ? e.length : n + t.length, s = e.length, o = 0, r = n; r < i; r++) o += e[r] - t[r - n], e[r] = o & mask, o >>= bpe;
    for (r = i; o && r < s; r++) o += e[r], e[r] = o & mask, o >>= bpe
}

function sub_(e, t) {
    var n, r, o;
    for (o = e.length < t.length ? e.length : t.length, r = 0, n = 0; n < o; n++) r += e[n] - t[n], e[n] = r & mask, r >>= bpe;
    for (n = o; r && n < e.length; n++) r += e[n], e[n] = r & mask, r >>= bpe
}

function add_(e, t) {
    var n, r, o;
    for (o = e.length < t.length ? e.length : t.length, r = 0, n = 0; n < o; n++) r += e[n] + t[n], e[n] = r & mask, r >>= bpe;
    for (n = o; r && n < e.length; n++) r += e[n], e[n] = r & mask, r >>= bpe
}

function mult_(e, t) {
    var n;
    for (ss.length != 2 * e.length && (ss = new Array(2 * e.length)), copyInt_(ss, 0), n = 0; n < t.length; n++) t[n] && linCombShift_(ss, e, t[n], n);
    copy_(e, ss)
}

function mod_(e, t) {
    s4.length != e.length ? s4 = dup(e) : copy_(s4, e), s5.length != e.length && (s5 = dup(e)), divide_(s4, t, s5, e)
}

function multMod_(e, t, n) {
    var r;
    for (s0.length != 2 * e.length && (s0 = new Array(2 * e.length)), copyInt_(s0, 0), r = 0; r < t.length; r++) t[r] && linCombShift_(s0, e, t[r], r);
    mod_(s0, n), copy_(e, s0)
}

function squareMod_(e, t) {
    var n, r, o, i, s;
    for (i = e.length; i > 0 && !e[i - 1]; i--);
    for (s = i > t.length ? 2 * i : 2 * t.length, s0.length != s && (s0 = new Array(s)), copyInt_(s0, 0), n = 0; n < i; n++) {
        for (o = s0[2 * n] + e[n] * e[n], s0[2 * n] = o & mask, o >>= bpe, r = n + 1; r < i; r++) o = s0[n + r] + 2 * e[n] * e[r] + o, s0[n + r] = o & mask, o >>= bpe;
        s0[n + i] = o
    }
    mod_(s0, t), copy_(e, s0)
}

function trim(e, t) {
    var n, r;
    for (n = e.length; n > 0 && !e[n - 1]; n--);
    return copy_(r = new Array(n + t), e), r
}

function powMod_(e, t, n) {
    var r, o, i, s;
    if (s7.length != n.length && (s7 = dup(n)), 0 != (1 & n[0])) {
        for (copyInt_(s7, 0), i = n.length; i > 0 && !n[i - 1]; i--);
        for (s = radix - inverseModInt(modInt(n, radix), radix), s7[i] = 1, multMod_(e, s7, n), s3.length != e.length ? s3 = dup(e) : copy_(s3, e), r = t.length - 1; r > 0 & !t[r]; r--);
        if (0 != t[r]) {
            for (o = 1 << bpe - 1; o && !(t[r] & o); o >>= 1);
            for (;;) {
                if (!(o >>= 1)) {
                    if (--r < 0) return void mont_(e, one, n, s);
                    o = 1 << bpe - 1
                }
                mont_(e, e, n, s), o & t[r] && mont_(e, s3, n, s)
            }
        } else copyInt_(e, 1)
    } else
        for (copy_(s7, e), copyInt_(e, 1); !equalsInt(t, 0);) 1 & t[0] && multMod_(e, s7, n), divInt_(t, 2), squareMod_(s7, n)
}

function mont_(e, t, n, r) {
    var o, i, s, a, c, l, u = n.length,
        d = t.length;
    for (sa.length != u && (sa = new Array(u)), copyInt_(sa, 0); u > 0 && 0 == n[u - 1]; u--);
    for (; d > 0 && 0 == t[d - 1]; d--);
    for (l = sa.length - 1, o = 0; o < u; o++) {
        for (s = (c = sa[0] + e[o] * t[0]) + (a = (c & mask) * r & mask) * n[0] >> bpe, c = e[o], i = 1; i < d - 4;) s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++;
        for (; i < d;) s += sa[i] + a * n[i] + c * t[i], sa[i - 1] = s & mask, s >>= bpe, i++;
        for (; i < u - 4;) s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++, s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++;
        for (; i < u;) s += sa[i] + a * n[i], sa[i - 1] = s & mask, s >>= bpe, i++;
        for (; i < l;) s += sa[i], sa[i - 1] = s & mask, s >>= bpe, i++;
        sa[i - 1] = s & mask
    }
    greater(n, sa) || sub_(sa, n), copy_(e, sa)
}
bpe >>= 1, mask = (1 << bpe) - 1, radix = mask + 1, one = int2bigInt(1, 1, 1), t = new Array(0), ss = t, s0 = t, s1 = t, s2 = t, s3 = t, s4 = t, s5 = t, s6 = t, s7 = t, T = t, sa = t, mr_x1 = t, mr_r = t, mr_a = t, eg_v = t, eg_u = t, eg_A = t, eg_B = t, eg_C = t, eg_D = t, md_q1 = t, md_q2 = t, md_q3 = t, md_r = t, md_r1 = t, md_r2 = t, md_tt = t, primes = t, pows = t, s_i = t, s_i2 = t, s_R = t, s_rm = t, s_q = t, s_n1 = t, s_a = t, s_r2 = t, s_n = t, s_b = t, s_d = t, s_x1 = t, s_x2 = t, s_aa = t, rpprb = t;
var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (e) {
            for (var t, n, r, o, i, s, a, c = "", l = 0; l < e.length;) o = (t = e.charCodeAt(l++)) >> 2, i = (3 & t) << 4 | (n = e.charCodeAt(l++)) >> 4, s = (15 & n) << 2 | (r = e.charCodeAt(l++)) >> 6, a = 63 & r, isNaN(n) ? s = a = 64 : isNaN(r) && (a = 64), c = c + this._keyStr.charAt(o) + this._keyStr.charAt(i) + this._keyStr.charAt(s) + this._keyStr.charAt(a);
            return c
        },
        encodeArray: function (e) {
            for (var t, n, r, o, i, s, a, c = "", l = 0; l < e.length;) o = (t = e[l++]) >> 2, i = (3 & t) << 4 | (n = e[l++]) >> 4, s = (15 & n) << 2 | (r = e[l++]) >> 6, a = 63 & r, isNaN(n) ? s = a = 64 : isNaN(r) && (a = 64), c = c + this._keyStr.charAt(o) + this._keyStr.charAt(i) + this._keyStr.charAt(s) + this._keyStr.charAt(a);
            return c
        },
        decode: function (e) {
            var t, n, r, o, i, s, a = "",
                c = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length;) t = this._keyStr.indexOf(e.charAt(c++)) << 2 | (o = this._keyStr.indexOf(e.charAt(c++))) >> 4, n = (15 & o) << 4 | (i = this._keyStr.indexOf(e.charAt(c++))) >> 2, r = (3 & i) << 6 | (s = this._keyStr.indexOf(e.charAt(c++))), a += String.fromCharCode(t), 64 != i && (a += String.fromCharCode(n)), 64 != s && (a += String.fromCharCode(r));
            return a = Base64._utf8_decode(a)
        },
        decodeBinary: function (e, t) {
            ! function () {
                try {
                    new Uint8Array(1);
                    return
                } catch (e) {}

                function e(e, t) {
                    return this.slice(e, t)
                }

                function t(e, t) {
                    arguments.length < 2 && (t = 0);
                    for (var n = 0, r = e.length; n < r; ++n, ++t) this[t] = 255 & e[n]
                }

                function n(n) {
                    var r;
                    if ("number" == typeof n) {
                        r = new Array(n);
                        for (var o = 0; o < n; ++o) r[o] = 0
                    } else r = n.slice(0);
                    return r.subarray = e, r.buffer = r, r.byteLength = r.length, r.set = t, "object" == typeof n && n.buffer && (r.buffer = n.buffer), r
                }
                window.Uint8Array = n, window.Uint32Array = n, window.Int32Array = n
            }();
            var n, r, o, i, s, a, c, l = this._keyStr.indexOf(e.charAt(e.length - 1)),
                u = this._keyStr.indexOf(e.charAt(e.length - 2)),
                d = e.length / 4 * 3;
            d = parseInt(d), 64 == l && d--, 64 == u && d--;
            var f = 0,
                h = 0;
            for (n = t ? new Uint8Array(t) : new Uint8Array(d), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), f = 0; f < d; f += 3) r = this._keyStr.indexOf(e.charAt(h++)) << 2 | (s = this._keyStr.indexOf(e.charAt(h++))) >> 4, o = (15 & s) << 4 | (a = this._keyStr.indexOf(e.charAt(h++))) >> 2, i = (3 & a) << 6 | (c = this._keyStr.indexOf(e.charAt(h++))), n[f] = r, 64 != a && (n[f + 1] = o), 64 != c && (n[f + 2] = i);
            return n
        },
        _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128))
            }
            return t
        },
        _utf8_decode: function (e) {
            for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;)(r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r), n++) : r > 191 && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
            return t
        }
    },
    CryptoJS = CryptoJS || function (e, t) {
        var n = {},
            r = n.lib = {},
            o = function () {},
            i = r.Base = {
                extend: function (e) {
                    o.prototype = this;
                    var t = new o;
                    return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
                        t.$super.init.apply(this, arguments)
                    }), t.init.prototype = t, t.$super = this, t
                },
                create: function () {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                },
                init: function () {},
                mixIn: function (e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
            },
            s = r.WordArray = i.extend({
                init: function (e, t) {
                    e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
                },
                toString: function (e) {
                    return (e || c).stringify(this)
                },
                concat: function (e) {
                    var t = this.words,
                        n = e.words,
                        r = this.sigBytes;
                    if (e = e.sigBytes, this.clamp(), r % 4)
                        for (var o = 0; o < e; o++) t[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8;
                    else if (65535 < n.length)
                        for (o = 0; o < e; o += 4) t[r + o >>> 2] = n[o >>> 2];
                    else t.push.apply(t, n);
                    return this.sigBytes += e, this
                },
                clamp: function () {
                    var t = this.words,
                        n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                },
                clone: function () {
                    var e = i.clone.call(this);
                    return e.words = this.words.slice(0), e
                },
                random: function (t) {
                    for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
                    return new s.init(n, t)
                }
            }),
            a = n.enc = {},
            c = a.Hex = {
                stringify: function (e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var n = [], r = 0; r < e; r++) {
                        var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                        n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                    }
                    return n.join("")
                },
                parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new s.init(n, t / 2)
                }
            },
            l = a.Latin1 = {
                stringify: function (e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                    return n.join("")
                },
                parse: function (e) {
                    for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                    return new s.init(n, t)
                }
            },
            u = a.Utf8 = {
                stringify: function (e) {
                    try {
                        return decodeURIComponent(escape(l.stringify(e)))
                    } catch (e) {
                        throw Error("Malformed UTF-8 data")
                    }
                },
                parse: function (e) {
                    return l.parse(unescape(encodeURIComponent(e)))
                }
            },
            d = r.BufferedBlockAlgorithm = i.extend({
                reset: function () {
                    this._data = new s.init, this._nDataBytes = 0
                },
                _append: function (e) {
                    "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                },
                _process: function (t) {
                    var n = this._data,
                        r = n.words,
                        o = n.sigBytes,
                        i = this.blockSize,
                        a = o / (4 * i);
                    if (t = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i, o = e.min(4 * t, o), t) {
                        for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
                        c = r.splice(0, t), n.sigBytes -= o
                    }
                    return new s.init(c, o)
                },
                clone: function () {
                    var e = i.clone.call(this);
                    return e._data = this._data.clone(), e
                },
                _minBufferSize: 0
            });
        r.Hasher = d.extend({
            cfg: i.extend(),
            init: function (e) {
                this.cfg = this.cfg.extend(e), this.reset()
            },
            reset: function () {
                d.reset.call(this), this._doReset()
            },
            update: function (e) {
                return this._append(e), this._process(), this
            },
            finalize: function (e) {
                return e && this._append(e), this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function (e) {
                return function (t, n) {
                    return new e.init(n).finalize(t)
                }
            },
            _createHmacHelper: function (e) {
                return function (t, n) {
                    return new f.HMAC.init(e, n).finalize(t)
                }
            }
        });
        var f = n.algo = {};
        return n
    }(Math);
! function () {
    var e = CryptoJS,
        t = e.lib.WordArray;
    e.enc.Base64 = {
        stringify: function (e) {
            var t = e.words,
                n = e.sigBytes,
                r = this._map;
            e.clamp(), e = [];
            for (var o = 0; o < n; o += 3)
                for (var i = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; 4 > s && o + .75 * s < n; s++) e.push(r.charAt(i >>> 6 * (3 - s) & 63));
            if (t = r.charAt(64))
                for (; e.length % 4;) e.push(t);
            return e.join("")
        },
        parse: function (e) {
            var n = e.length,
                r = this._map;
            (o = r.charAt(64)) && (-1 != (o = e.indexOf(o)) && (n = o));
            for (var o = [], i = 0, s = 0; s < n; s++)
                if (s % 4) {
                    var a = r.indexOf(e.charAt(s - 1)) << s % 4 * 2,
                        c = r.indexOf(e.charAt(s)) >>> 6 - s % 4 * 2;
                    o[i >>> 2] |= (a | c) << 24 - i % 4 * 8, i++
                } return t.create(o, i)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(),
function (e) {
    function t(e, t, n, r, o, i, s) {
        return ((e = e + (t & n | ~t & r) + o + s) << i | e >>> 32 - i) + t
    }

    function n(e, t, n, r, o, i, s) {
        return ((e = e + (t & r | n & ~r) + o + s) << i | e >>> 32 - i) + t
    }

    function r(e, t, n, r, o, i, s) {
        return ((e = e + (t ^ n ^ r) + o + s) << i | e >>> 32 - i) + t
    }

    function o(e, t, n, r, o, i, s) {
        return ((e = e + (n ^ (t | ~r)) + o + s) << i | e >>> 32 - i) + t
    }
    for (var i = CryptoJS, s = (c = i.lib).WordArray, a = c.Hasher, c = i.algo, l = [], u = 0; 64 > u; u++) l[u] = 4294967296 * e.abs(e.sin(u + 1)) | 0;
    c = c.MD5 = a.extend({
        _doReset: function () {
            this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function (e, i) {
            for (var s = 0; 16 > s; s++) {
                var a = e[c = i + s];
                e[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
            }
            s = this._hash.words;
            var c = e[i + 0],
                u = (a = e[i + 1], e[i + 2]),
                d = e[i + 3],
                f = e[i + 4],
                h = e[i + 5],
                m = e[i + 6],
                g = e[i + 7],
                p = e[i + 8],
                v = e[i + 9],
                b = e[i + 10],
                C = e[i + 11],
                S = e[i + 12],
                y = e[i + 13],
                _ = e[i + 14],
                I = e[i + 15],
                P = t(P = s[0], E = s[1], k = s[2], D = s[3], c, 7, l[0]),
                D = t(D, P, E, k, a, 12, l[1]),
                k = t(k, D, P, E, u, 17, l[2]),
                E = t(E, k, D, P, d, 22, l[3]);
            P = t(P, E, k, D, f, 7, l[4]), D = t(D, P, E, k, h, 12, l[5]), k = t(k, D, P, E, m, 17, l[6]), E = t(E, k, D, P, g, 22, l[7]), P = t(P, E, k, D, p, 7, l[8]), D = t(D, P, E, k, v, 12, l[9]), k = t(k, D, P, E, b, 17, l[10]), E = t(E, k, D, P, C, 22, l[11]), P = t(P, E, k, D, S, 7, l[12]), D = t(D, P, E, k, y, 12, l[13]), k = t(k, D, P, E, _, 17, l[14]), P = n(P, E = t(E, k, D, P, I, 22, l[15]), k, D, a, 5, l[16]), D = n(D, P, E, k, m, 9, l[17]), k = n(k, D, P, E, C, 14, l[18]), E = n(E, k, D, P, c, 20, l[19]), P = n(P, E, k, D, h, 5, l[20]), D = n(D, P, E, k, b, 9, l[21]), k = n(k, D, P, E, I, 14, l[22]), E = n(E, k, D, P, f, 20, l[23]), P = n(P, E, k, D, v, 5, l[24]), D = n(D, P, E, k, _, 9, l[25]), k = n(k, D, P, E, d, 14, l[26]), E = n(E, k, D, P, p, 20, l[27]), P = n(P, E, k, D, y, 5, l[28]), D = n(D, P, E, k, u, 9, l[29]), k = n(k, D, P, E, g, 14, l[30]), P = r(P, E = n(E, k, D, P, S, 20, l[31]), k, D, h, 4, l[32]), D = r(D, P, E, k, p, 11, l[33]), k = r(k, D, P, E, C, 16, l[34]), E = r(E, k, D, P, _, 23, l[35]), P = r(P, E, k, D, a, 4, l[36]), D = r(D, P, E, k, f, 11, l[37]), k = r(k, D, P, E, g, 16, l[38]), E = r(E, k, D, P, b, 23, l[39]), P = r(P, E, k, D, y, 4, l[40]), D = r(D, P, E, k, c, 11, l[41]), k = r(k, D, P, E, d, 16, l[42]), E = r(E, k, D, P, m, 23, l[43]), P = r(P, E, k, D, v, 4, l[44]), D = r(D, P, E, k, S, 11, l[45]), k = r(k, D, P, E, I, 16, l[46]), P = o(P, E = r(E, k, D, P, u, 23, l[47]), k, D, c, 6, l[48]), D = o(D, P, E, k, g, 10, l[49]), k = o(k, D, P, E, _, 15, l[50]), E = o(E, k, D, P, h, 21, l[51]), P = o(P, E, k, D, S, 6, l[52]), D = o(D, P, E, k, d, 10, l[53]), k = o(k, D, P, E, b, 15, l[54]), E = o(E, k, D, P, a, 21, l[55]), P = o(P, E, k, D, p, 6, l[56]), D = o(D, P, E, k, I, 10, l[57]), k = o(k, D, P, E, m, 15, l[58]), E = o(E, k, D, P, y, 21, l[59]), P = o(P, E, k, D, f, 6, l[60]), D = o(D, P, E, k, C, 10, l[61]), k = o(k, D, P, E, u, 15, l[62]), E = o(E, k, D, P, v, 21, l[63]);
            s[0] = s[0] + P | 0, s[1] = s[1] + E | 0, s[2] = s[2] + k | 0, s[3] = s[3] + D | 0
        },
        _doFinalize: function () {
            var t = this._data,
                n = t.words,
                r = 8 * this._nDataBytes,
                o = 8 * t.sigBytes;
            n[o >>> 5] |= 128 << 24 - o % 32;
            var i = e.floor(r / 4294967296);
            for (n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), t.sigBytes = 4 * (n.length + 1), this._process(), n = (t = this._hash).words, r = 0; 4 > r; r++) o = n[r], n[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8);
            return t
        },
        clone: function () {
            var e = a.clone.call(this);
            return e._hash = this._hash.clone(), e
        }
    }), i.MD5 = a._createHelper(c), i.HmacMD5 = a._createHmacHelper(c)
}(Math),
function () {
    var e, t = CryptoJS,
        n = (e = t.lib).Base,
        r = e.WordArray,
        o = (e = t.algo).EvpKDF = n.extend({
            cfg: n.extend({
                keySize: 4,
                hasher: e.MD5,
                iterations: 1
            }),
            init: function (e) {
                this.cfg = this.cfg.extend(e)
            },
            compute: function (e, t) {
                for (var n = (a = this.cfg).hasher.create(), o = r.create(), i = o.words, s = a.keySize, a = a.iterations; i.length < s;) {
                    c && n.update(c);
                    var c = n.update(e).finalize(t);
                    n.reset();
                    for (var l = 1; l < a; l++) c = n.finalize(c), n.reset();
                    o.concat(c)
                }
                return o.sigBytes = 4 * s, o
            }
        });
    t.EvpKDF = function (e, t, n) {
        return o.create(n).compute(e, t)
    }
}(), CryptoJS.lib.Cipher || function (e) {
        var t = (h = CryptoJS).lib,
            n = t.Base,
            r = t.WordArray,
            o = t.BufferedBlockAlgorithm,
            i = h.enc.Base64,
            s = h.algo.EvpKDF,
            a = t.Cipher = o.extend({
                cfg: n.extend(),
                createEncryptor: function (e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t)
                },
                createDecryptor: function (e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t)
                },
                init: function (e, t, n) {
                    this.cfg = this.cfg.extend(n), this._xformMode = e, this._key = t, this.reset()
                },
                reset: function () {
                    o.reset.call(this), this._doReset()
                },
                process: function (e) {
                    return this._append(e), this._process()
                },
                finalize: function (e) {
                    return e && this._append(e), this._doFinalize()
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: function (e) {
                    return {
                        encrypt: function (t, n, r) {
                            return ("string" == typeof n ? m : f).encrypt(e, t, n, r)
                        },
                        decrypt: function (t, n, r) {
                            return ("string" == typeof n ? m : f).decrypt(e, t, n, r)
                        }
                    }
                }
            });
        t.StreamCipher = a.extend({
            _doFinalize: function () {
                return this._process(!0)
            },
            blockSize: 1
        });
        var c = h.mode = {},
            l = function (e, t, n) {
                var r = this._iv;
                r ? this._iv = void 0 : r = this._prevBlock;
                for (var o = 0; o < n; o++) e[t + o] ^= r[o]
            },
            u = (t.BlockCipherMode = n.extend({
                createEncryptor: function (e, t) {
                    return this.Encryptor.create(e, t)
                },
                createDecryptor: function (e, t) {
                    return this.Decryptor.create(e, t)
                },
                init: function (e, t) {
                    this._cipher = e, this._iv = t
                }
            })).extend();
        u.Encryptor = u.extend({
            processBlock: function (e, t) {
                var n = this._cipher,
                    r = n.blockSize;
                l.call(this, e, t, r), n.encryptBlock(e, t), this._prevBlock = e.slice(t, t + r)
            }
        }), u.Decryptor = u.extend({
            processBlock: function (e, t) {
                var n = this._cipher,
                    r = n.blockSize,
                    o = e.slice(t, t + r);
                n.decryptBlock(e, t), l.call(this, e, t, r), this._prevBlock = o
            }
        }), c = c.CBC = u, u = (h.pad = {}).Pkcs7 = {
            pad: function (e, t) {
                for (var n, o = (n = (n = 4 * t) - e.sigBytes % n) << 24 | n << 16 | n << 8 | n, i = [], s = 0; s < n; s += 4) i.push(o);
                n = r.create(i, n), e.concat(n)
            },
            unpad: function (e) {
                e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2]
            }
        }, t.BlockCipher = a.extend({
            cfg: a.cfg.extend({
                mode: c,
                padding: u
            }),
            reset: function () {
                a.reset.call(this);
                var e = (t = this.cfg).iv,
                    t = t.mode;
                if (this._xformMode == this._ENC_XFORM_MODE) var n = t.createEncryptor;
                else n = t.createDecryptor, this._minBufferSize = 1;
                this._mode = n.call(t, this, e && e.words)
            },
            _doProcessBlock: function (e, t) {
                this._mode.processBlock(e, t)
            },
            _doFinalize: function () {
                var e = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    e.pad(this._data, this.blockSize);
                    var t = this._process(!0)
                } else t = this._process(!0), e.unpad(t);
                return t
            },
            blockSize: 4
        });
        var d = t.CipherParams = n.extend({
                init: function (e) {
                    this.mixIn(e)
                },
                toString: function (e) {
                    return (e || this.formatter).stringify(this)
                }
            }),
            f = (c = (h.format = {}).OpenSSL = {
                stringify: function (e) {
                    var t = e.ciphertext;
                    return ((e = e.salt) ? r.create([1398893684, 1701076831]).concat(e).concat(t) : t).toString(i)
                },
                parse: function (e) {
                    var t = (e = i.parse(e)).words;
                    if (1398893684 == t[0] && 1701076831 == t[1]) {
                        var n = r.create(t.slice(2, 4));
                        t.splice(0, 4), e.sigBytes -= 16
                    }
                    return d.create({
                        ciphertext: e,
                        salt: n
                    })
                }
            }, t.SerializableCipher = n.extend({
                cfg: n.extend({
                    format: c
                }),
                encrypt: function (e, t, n, r) {
                    r = this.cfg.extend(r);
                    var o = e.createEncryptor(n, r);
                    return t = o.finalize(t), o = o.cfg, d.create({
                        ciphertext: t,
                        key: n,
                        iv: o.iv,
                        algorithm: e,
                        mode: o.mode,
                        padding: o.padding,
                        blockSize: e.blockSize,
                        formatter: r.format
                    })
                },
                decrypt: function (e, t, n, r) {
                    return r = this.cfg.extend(r), t = this._parse(t, r.format), e.createDecryptor(n, r).finalize(t.ciphertext)
                },
                _parse: function (e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e
                }
            })),
            h = (h.kdf = {}).OpenSSL = {
                execute: function (e, t, n, o) {
                    return o || (o = r.random(8)), e = s.create({
                        keySize: t + n
                    }).compute(e, o), n = r.create(e.words.slice(t), 4 * n), e.sigBytes = 4 * t, d.create({
                        key: e,
                        iv: n,
                        salt: o
                    })
                }
            },
            m = t.PasswordBasedCipher = f.extend({
                cfg: f.cfg.extend({
                    kdf: h
                }),
                encrypt: function (e, t, n, r) {
                    return n = (r = this.cfg.extend(r)).kdf.execute(n, e.keySize, e.ivSize), r.iv = n.iv, (e = f.encrypt.call(this, e, t, n.key, r)).mixIn(n), e
                },
                decrypt: function (e, t, n, r) {
                    return r = this.cfg.extend(r), t = this._parse(t, r.format), n = r.kdf.execute(n, e.keySize, e.ivSize, t.salt), r.iv = n.iv, f.decrypt.call(this, e, t, n.key, r)
                }
            })
    }(),
    function () {
        for (var e = CryptoJS, t = e.lib.BlockCipher, n = e.algo, r = [], o = [], i = [], s = [], a = [], c = [], l = [], u = [], d = [], f = [], h = [], m = 0; 256 > m; m++) h[m] = 128 > m ? m << 1 : m << 1 ^ 283;
        var g = 0,
            p = 0;
        for (m = 0; 256 > m; m++) {
            var v = (v = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4) >>> 8 ^ 255 & v ^ 99;
            r[g] = v, o[v] = g;
            var b = h[g],
                C = h[b],
                S = h[C],
                y = 257 * h[v] ^ 16843008 * v;
            i[g] = y << 24 | y >>> 8, s[g] = y << 16 | y >>> 16, a[g] = y << 8 | y >>> 24, c[g] = y, y = 16843009 * S ^ 65537 * C ^ 257 * b ^ 16843008 * g, l[v] = y << 24 | y >>> 8, u[v] = y << 16 | y >>> 16, d[v] = y << 8 | y >>> 24, f[v] = y, g ? (g = b ^ h[h[h[S ^ b]]], p ^= h[h[p]]) : g = p = 1
        }
        var _ = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        n = n.AES = t.extend({
            _doReset: function () {
                for (var e = (n = this._key).words, t = n.sigBytes / 4, n = 4 * ((this._nRounds = t + 6) + 1), o = this._keySchedule = [], i = 0; i < n; i++)
                    if (i < t) o[i] = e[i];
                    else {
                        var s = o[i - 1];
                        i % t ? 6 < t && 4 == i % t && (s = r[s >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s]) : (s = r[(s = s << 8 | s >>> 24) >>> 24] << 24 | r[s >>> 16 & 255] << 16 | r[s >>> 8 & 255] << 8 | r[255 & s], s ^= _[i / t | 0] << 24), o[i] = o[i - t] ^ s
                    } for (e = this._invKeySchedule = [], t = 0; t < n; t++) i = n - t, s = t % 4 ? o[i] : o[i - 4], e[t] = 4 > t || 4 >= i ? s : l[r[s >>> 24]] ^ u[r[s >>> 16 & 255]] ^ d[r[s >>> 8 & 255]] ^ f[r[255 & s]]
            },
            encryptBlock: function (e, t) {
                this._doCryptBlock(e, t, this._keySchedule, i, s, a, c, r)
            },
            decryptBlock: function (e, t) {
                var n = e[t + 1];
                e[t + 1] = e[t + 3], e[t + 3] = n, this._doCryptBlock(e, t, this._invKeySchedule, l, u, d, f, o), n = e[t + 1], e[t + 1] = e[t + 3], e[t + 3] = n
            },
            _doCryptBlock: function (e, t, n, r, o, i, s, a) {
                for (var c = this._nRounds, l = e[t] ^ n[0], u = e[t + 1] ^ n[1], d = e[t + 2] ^ n[2], f = e[t + 3] ^ n[3], h = 4, m = 1; m < c; m++) {
                    var g = r[l >>> 24] ^ o[u >>> 16 & 255] ^ i[d >>> 8 & 255] ^ s[255 & f] ^ n[h++],
                        p = r[u >>> 24] ^ o[d >>> 16 & 255] ^ i[f >>> 8 & 255] ^ s[255 & l] ^ n[h++],
                        v = r[d >>> 24] ^ o[f >>> 16 & 255] ^ i[l >>> 8 & 255] ^ s[255 & u] ^ n[h++];
                    f = r[f >>> 24] ^ o[l >>> 16 & 255] ^ i[u >>> 8 & 255] ^ s[255 & d] ^ n[h++], l = g, u = p, d = v
                }
                g = (a[l >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[d >>> 8 & 255] << 8 | a[255 & f]) ^ n[h++], p = (a[u >>> 24] << 24 | a[d >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & l]) ^ n[h++], v = (a[d >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & u]) ^ n[h++], f = (a[f >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & d]) ^ n[h++], e[t] = g, e[t + 1] = p, e[t + 2] = v, e[t + 3] = f
            },
            keySize: 8
        });
        e.AES = t._createHelper(n)
    }();
CryptoJS = CryptoJS || function (e, t) {
    var n = {},
        r = n.lib = {},
        o = function () {},
        i = r.Base = {
            extend: function (e) {
                o.prototype = this;
                var t = new o;
                return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
                    t.$super.init.apply(this, arguments)
                }), t.init.prototype = t, t.$super = this, t
            },
            create: function () {
                var e = this.extend();
                return e.init.apply(e, arguments), e
            },
            init: function () {},
            mixIn: function (e) {
                for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        },
        s = r.WordArray = i.extend({
            init: function (e, t) {
                e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
            },
            toString: function (e) {
                return (e || c).stringify(this)
            },
            concat: function (e) {
                var t = this.words,
                    n = e.words,
                    r = this.sigBytes;
                if (e = e.sigBytes, this.clamp(), r % 4)
                    for (var o = 0; o < e; o++) t[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8;
                else if (65535 < n.length)
                    for (o = 0; o < e; o += 4) t[r + o >>> 2] = n[o >>> 2];
                else t.push.apply(t, n);
                return this.sigBytes += e, this
            },
            clamp: function () {
                var t = this.words,
                    n = this.sigBytes;
                t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
            },
            clone: function () {
                var e = i.clone.call(this);
                return e.words = this.words.slice(0), e
            },
            random: function (t) {
                for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
                return new s.init(n, t)
            }
        }),
        a = n.enc = {},
        c = a.Hex = {
            stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], r = 0; r < e; r++) {
                    var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                }
                return n.join("")
            },
            parse: function (e) {
                for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new s.init(n, t / 2)
            }
        },
        l = a.Latin1 = {
            stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                return n.join("")
            },
            parse: function (e) {
                for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                return new s.init(n, t)
            }
        },
        u = a.Utf8 = {
            stringify: function (e) {
                try {
                    return decodeURIComponent(escape(l.stringify(e)))
                } catch (e) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function (e) {
                return l.parse(unescape(encodeURIComponent(e)))
            }
        },
        d = r.BufferedBlockAlgorithm = i.extend({
            reset: function () {
                this._data = new s.init, this._nDataBytes = 0
            },
            _append: function (e) {
                "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
            },
            _process: function (t) {
                var n = this._data,
                    r = n.words,
                    o = n.sigBytes,
                    i = this.blockSize,
                    a = o / (4 * i);
                if (t = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i, o = e.min(4 * t, o), t) {
                    for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
                    c = r.splice(0, t), n.sigBytes -= o
                }
                return new s.init(c, o)
            },
            clone: function () {
                var e = i.clone.call(this);
                return e._data = this._data.clone(), e
            },
            _minBufferSize: 0
        });
    r.Hasher = d.extend({
        cfg: i.extend(),
        init: function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
        },
        reset: function () {
            d.reset.call(this), this._doReset()
        },
        update: function (e) {
            return this._append(e), this._process(), this
        },
        finalize: function (e) {
            return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (e) {
            return function (t, n) {
                return new e.init(n).finalize(t)
            }
        },
        _createHmacHelper: function (e) {
            return function (t, n) {
                return new f.HMAC.init(e, n).finalize(t)
            }
        }
    });
    var f = n.algo = {};
    return n
}(Math);
! function (e) {
    for (var t = CryptoJS, n = (o = t.lib).WordArray, r = o.Hasher, o = t.algo, i = [], s = [], a = function (e) {
            return 4294967296 * (e - (0 | e)) | 0
        }, c = 2, l = 0; 64 > l;) {
        var u;
        e: {
            u = c;
            for (var d = e.sqrt(u), f = 2; f <= d; f++)
                if (!(u % f)) {
                    u = !1;
                    break e
                } u = !0
        }
        u && (8 > l && (i[l] = a(e.pow(c, .5))), s[l] = a(e.pow(c, 1 / 3)), l++), c++
    }
    var h = [];
    o = o.SHA256 = r.extend({
        _doReset: function () {
            this._hash = new n.init(i.slice(0))
        },
        _doProcessBlock: function (e, t) {
            for (var n = this._hash.words, r = n[0], o = n[1], i = n[2], a = n[3], c = n[4], l = n[5], u = n[6], d = n[7], f = 0; 64 > f; f++) {
                if (16 > f) h[f] = 0 | e[t + f];
                else {
                    var m = h[f - 15],
                        g = h[f - 2];
                    h[f] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + h[f - 7] + ((g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10) + h[f - 16]
                }
                m = d + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & l ^ ~c & u) + s[f] + h[f], g = ((r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)) + (r & o ^ r & i ^ o & i), d = u, u = l, l = c, c = a + m | 0, a = i, i = o, o = r, r = m + g | 0
            }
            n[0] = n[0] + r | 0, n[1] = n[1] + o | 0, n[2] = n[2] + i | 0, n[3] = n[3] + a | 0, n[4] = n[4] + c | 0, n[5] = n[5] + l | 0, n[6] = n[6] + u | 0, n[7] = n[7] + d | 0
        },
        _doFinalize: function () {
            var t = this._data,
                n = t.words,
                r = 8 * this._nDataBytes,
                o = 8 * t.sigBytes;
            return n[o >>> 5] |= 128 << 24 - o % 32, n[14 + (o + 64 >>> 9 << 4)] = e.floor(r / 4294967296), n[15 + (o + 64 >>> 9 << 4)] = r, t.sigBytes = 4 * n.length, this._process(), this._hash
        },
        clone: function () {
            var e = r.clone.call(this);
            return e._hash = this._hash.clone(), e
        }
    });
    t.SHA256 = r._createHelper(o), t.HmacSHA256 = r._createHmacHelper(o)
}(Math);
CryptoJS = CryptoJS || function (e, t) {
    var n = {},
        r = n.lib = {},
        o = function () {},
        i = r.Base = {
            extend: function (e) {
                o.prototype = this;
                var t = new o;
                return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {
                    t.$super.init.apply(this, arguments)
                }), t.init.prototype = t, t.$super = this, t
            },
            create: function () {
                var e = this.extend();
                return e.init.apply(e, arguments), e
            },
            init: function () {},
            mixIn: function (e) {
                for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
            },
            clone: function () {
                return this.init.prototype.extend(this)
            }
        },
        s = r.WordArray = i.extend({
            init: function (e, t) {
                e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
            },
            toString: function (e) {
                return (e || c).stringify(this)
            },
            concat: function (e) {
                var t = this.words,
                    n = e.words,
                    r = this.sigBytes;
                if (e = e.sigBytes, this.clamp(), r % 4)
                    for (var o = 0; o < e; o++) t[r + o >>> 2] |= (n[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 24 - (r + o) % 4 * 8;
                else if (65535 < n.length)
                    for (o = 0; o < e; o += 4) t[r + o >>> 2] = n[o >>> 2];
                else t.push.apply(t, n);
                return this.sigBytes += e, this
            },
            clamp: function () {
                var t = this.words,
                    n = this.sigBytes;
                t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
            },
            clone: function () {
                var e = i.clone.call(this);
                return e.words = this.words.slice(0), e
            },
            random: function (t) {
                for (var n = [], r = 0; r < t; r += 4) n.push(4294967296 * e.random() | 0);
                return new s.init(n, t)
            }
        }),
        a = n.enc = {},
        c = a.Hex = {
            stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], r = 0; r < e; r++) {
                    var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                }
                return n.join("")
            },
            parse: function (e) {
                for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new s.init(n, t / 2)
            }
        },
        l = a.Latin1 = {
            stringify: function (e) {
                var t = e.words;
                e = e.sigBytes;
                for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(t[r >>> 2] >>> 24 - r % 4 * 8 & 255));
                return n.join("")
            },
            parse: function (e) {
                for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                return new s.init(n, t)
            }
        },
        u = a.Utf8 = {
            stringify: function (e) {
                try {
                    return decodeURIComponent(escape(l.stringify(e)))
                } catch (e) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function (e) {
                return l.parse(unescape(encodeURIComponent(e)))
            }
        },
        d = r.BufferedBlockAlgorithm = i.extend({
            reset: function () {
                this._data = new s.init, this._nDataBytes = 0
            },
            _append: function (e) {
                "string" == typeof e && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
            },
            _process: function (t) {
                var n = this._data,
                    r = n.words,
                    o = n.sigBytes,
                    i = this.blockSize,
                    a = o / (4 * i);
                if (t = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * i, o = e.min(4 * t, o), t) {
                    for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
                    c = r.splice(0, t), n.sigBytes -= o
                }
                return new s.init(c, o)
            },
            clone: function () {
                var e = i.clone.call(this);
                return e._data = this._data.clone(), e
            },
            _minBufferSize: 0
        });
    r.Hasher = d.extend({
        cfg: i.extend(),
        init: function (e) {
            this.cfg = this.cfg.extend(e), this.reset()
        },
        reset: function () {
            d.reset.call(this), this._doReset()
        },
        update: function (e) {
            return this._append(e), this._process(), this
        },
        finalize: function (e) {
            return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (e) {
            return function (t, n) {
                return new e.init(n).finalize(t)
            }
        },
        _createHmacHelper: function (e) {
            return function (t, n) {
                return new f.HMAC.init(e, n).finalize(t)
            }
        }
    });
    var f = n.algo = {};
    return n
}(Math);
! function (e) {
    var t, n = (t = CryptoJS).lib,
        r = n.Base,
        o = n.WordArray;
    (t = t.x64 = {}).Word = r.extend({
        init: function (e, t) {
            this.high = e, this.low = t
        }
    }), t.WordArray = r.extend({
        init: function (e, t) {
            e = this.words = e || [], this.sigBytes = null != t ? t : 8 * e.length
        },
        toX32: function () {
            for (var e = this.words, t = e.length, n = [], r = 0; r < t; r++) {
                var i = e[r];
                n.push(i.high), n.push(i.low)
            }
            return o.create(n, this.sigBytes)
        },
        clone: function () {
            for (var e = r.clone.call(this), t = e.words = this.words.slice(0), n = t.length, o = 0; o < n; o++) t[o] = t[o].clone();
            return e
        }
    })
}(),
function () {
    function e() {
        return r.create.apply(r, arguments)
    }
    for (var t = CryptoJS, n = t.lib.Hasher, r = (i = t.x64).Word, o = i.WordArray, i = t.algo, s = [e(1116352408, 3609767458), e(1899447441, 602891725), e(3049323471, 3964484399), e(3921009573, 2173295548), e(961987163, 4081628472), e(1508970993, 3053834265), e(2453635748, 2937671579), e(2870763221, 3664609560), e(3624381080, 2734883394), e(310598401, 1164996542), e(607225278, 1323610764), e(1426881987, 3590304994), e(1925078388, 4068182383), e(2162078206, 991336113), e(2614888103, 633803317), e(3248222580, 3479774868), e(3835390401, 2666613458), e(4022224774, 944711139), e(264347078, 2341262773), e(604807628, 2007800933), e(770255983, 1495990901), e(1249150122, 1856431235), e(1555081692, 3175218132), e(1996064986, 2198950837), e(2554220882, 3999719339), e(2821834349, 766784016), e(2952996808, 2566594879), e(3210313671, 3203337956), e(3336571891, 1034457026), e(3584528711, 2466948901), e(113926993, 3758326383), e(338241895, 168717936), e(666307205, 1188179964), e(773529912, 1546045734), e(1294757372, 1522805485), e(1396182291, 2643833823), e(1695183700, 2343527390), e(1986661051, 1014477480), e(2177026350, 1206759142), e(2456956037, 344077627), e(2730485921, 1290863460), e(2820302411, 3158454273), e(3259730800, 3505952657), e(3345764771, 106217008), e(3516065817, 3606008344), e(3600352804, 1432725776), e(4094571909, 1467031594), e(275423344, 851169720), e(430227734, 3100823752), e(506948616, 1363258195), e(659060556, 3750685593), e(883997877, 3785050280), e(958139571, 3318307427), e(1322822218, 3812723403), e(1537002063, 2003034995), e(1747873779, 3602036899), e(1955562222, 1575990012), e(2024104815, 1125592928), e(2227730452, 2716904306), e(2361852424, 442776044), e(2428436474, 593698344), e(2756734187, 3733110249), e(3204031479, 2999351573), e(3329325298, 3815920427), e(3391569614, 3928383900), e(3515267271, 566280711), e(3940187606, 3454069534), e(4118630271, 4000239992), e(116418474, 1914138554), e(174292421, 2731055270), e(289380356, 3203993006), e(460393269, 320620315), e(685471733, 587496836), e(852142971, 1086792851), e(1017036298, 365543100), e(1126000580, 2618297676), e(1288033470, 3409855158), e(1501505948, 4234509866), e(1607167915, 987167468), e(1816402316, 1246189591)], a = [], c = 0; 80 > c; c++) a[c] = e();
    i = i.SHA512 = n.extend({
        _doReset: function () {
            this._hash = new o.init([new r.init(1779033703, 4089235720), new r.init(3144134277, 2227873595), new r.init(1013904242, 4271175723), new r.init(2773480762, 1595750129), new r.init(1359893119, 2917565137), new r.init(2600822924, 725511199), new r.init(528734635, 4215389547), new r.init(1541459225, 327033209)])
        },
        _doProcessBlock: function (e, t) {
            for (var n = (d = this._hash.words)[0], r = d[1], o = d[2], i = d[3], c = d[4], l = d[5], u = d[6], d = d[7], f = n.high, h = n.low, m = r.high, g = r.low, p = o.high, v = o.low, b = i.high, C = i.low, S = c.high, y = c.low, _ = l.high, I = l.low, P = u.high, D = u.low, k = d.high, E = d.low, M = f, w = h, T = m, A = g, x = p, B = v, R = b, K = C, X = S, O = y, F = _, N = I, q = P, L = D, H = k, V = E, z = 0; 80 > z; z++) {
                var U = a[z];
                if (16 > z) var W = U.high = 0 | e[t + 2 * z],
                    j = U.low = 0 | e[t + 2 * z + 1];
                else {
                    W = ((j = (W = a[z - 15]).high) >>> 1 | (G = W.low) << 31) ^ (j >>> 8 | G << 24) ^ j >>> 7;
                    var G = (G >>> 1 | j << 31) ^ (G >>> 8 | j << 24) ^ (G >>> 7 | j << 25),
                        J = ((j = (J = a[z - 2]).high) >>> 19 | (Y = J.low) << 13) ^ (j << 3 | Y >>> 29) ^ j >>> 6,
                        Y = (Y >>> 19 | j << 13) ^ (Y << 3 | j >>> 29) ^ (Y >>> 6 | j << 26),
                        Q = (j = a[z - 7]).high,
                        Z = ($ = a[z - 16]).high,
                        $ = $.low;
                    W = (W = (W = W + Q + ((j = G + j.low) >>> 0 < G >>> 0 ? 1 : 0)) + J + ((j = j + Y) >>> 0 < Y >>> 0 ? 1 : 0)) + Z + ((j = j + $) >>> 0 < $ >>> 0 ? 1 : 0);
                    U.high = W, U.low = j
                }
                Q = X & F ^ ~X & q, $ = O & N ^ ~O & L, U = M & T ^ M & x ^ T & x;
                var ee = w & A ^ w & B ^ A & B,
                    te = (G = (M >>> 28 | w << 4) ^ (M << 30 | w >>> 2) ^ (M << 25 | w >>> 7), J = (w >>> 28 | M << 4) ^ (w << 30 | M >>> 2) ^ (w << 25 | M >>> 7), (Y = s[z]).high),
                    ne = Y.low;
                Z = H + ((X >>> 14 | O << 18) ^ (X >>> 18 | O << 14) ^ (X << 23 | O >>> 9)) + ((Y = V + ((O >>> 14 | X << 18) ^ (O >>> 18 | X << 14) ^ (O << 23 | X >>> 9))) >>> 0 < V >>> 0 ? 1 : 0), H = q, V = L, q = F, L = N, F = X, N = O, X = R + (Z = (Z = (Z = Z + Q + ((Y = Y + $) >>> 0 < $ >>> 0 ? 1 : 0)) + te + ((Y = Y + ne) >>> 0 < ne >>> 0 ? 1 : 0)) + W + ((Y = Y + j) >>> 0 < j >>> 0 ? 1 : 0)) + ((O = K + Y | 0) >>> 0 < K >>> 0 ? 1 : 0) | 0, R = x, K = B, x = T, B = A, T = M, A = w, M = Z + (U = G + U + ((j = J + ee) >>> 0 < J >>> 0 ? 1 : 0)) + ((w = Y + j | 0) >>> 0 < Y >>> 0 ? 1 : 0) | 0
            }
            h = n.low = h + w, n.high = f + M + (h >>> 0 < w >>> 0 ? 1 : 0), g = r.low = g + A, r.high = m + T + (g >>> 0 < A >>> 0 ? 1 : 0), v = o.low = v + B, o.high = p + x + (v >>> 0 < B >>> 0 ? 1 : 0), C = i.low = C + K, i.high = b + R + (C >>> 0 < K >>> 0 ? 1 : 0), y = c.low = y + O, c.high = S + X + (y >>> 0 < O >>> 0 ? 1 : 0), I = l.low = I + N, l.high = _ + F + (I >>> 0 < N >>> 0 ? 1 : 0), D = u.low = D + L, u.high = P + q + (D >>> 0 < L >>> 0 ? 1 : 0), E = d.low = E + V, d.high = k + H + (E >>> 0 < V >>> 0 ? 1 : 0)
        },
        _doFinalize: function () {
            var e = this._data,
                t = e.words,
                n = 8 * this._nDataBytes,
                r = 8 * e.sigBytes;
            return t[r >>> 5] |= 128 << 24 - r % 32, t[30 + (r + 128 >>> 10 << 5)] = Math.floor(n / 4294967296), t[31 + (r + 128 >>> 10 << 5)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash.toX32()
        },
        clone: function () {
            var e = n.clone.call(this);
            return e._hash = this._hash.clone(), e
        },
        blockSize: 32
    }), t.SHA512 = n._createHelper(i), t.HmacSHA512 = n._createHmacHelper(i)
}(), XPMobileSDK.library.SecureString = {
    sharedKey: null,
    encrypt: function (e) {
        var t = this.generateKey(),
            n = {
                iv: CryptoJS.lib.WordArray.random(16)
            };
        Settings.DefaultEncryptionPadding && CryptoJS.pad[Settings.DefaultEncryptionPadding] && (n.padding = CryptoJS.pad[Settings.DefaultEncryptionPadding]);
        var r = CryptoJS.AES.encrypt(e, CryptoJS.SHA256(t), n);
        return r.iv.toString(CryptoJS.enc.Base64) + ":" + r.ciphertext.toString(CryptoJS.enc.Base64)
    },
    decrypt: function (e) {
        var t = "";
        if (e.indexOf(":") > -1) {
            var n = this.generateKey(),
                r = e.split(":"),
                o = CryptoJS.enc.Base64.parse(r[0]),
                i = CryptoJS.enc.Base64.parse(r[1]),
                s = {
                    iv: o
                };
            Settings.DefaultEncryptionPadding && CryptoJS.pad[Settings.DefaultEncryptionPadding] && (s.padding = CryptoJS.pad[Settings.DefaultEncryptionPadding]);
            t = CryptoJS.AES.decrypt({
                ciphertext: i
            }, CryptoJS.SHA256(n), s);
            t = CryptoJS.enc.Utf8.stringify(t)
        }
        return t
    },
    generateKey: function () {
        var e = "";
        return this.sharedKey ? e = this.sharedKey : XPMobileSDK.library.Connection.dh ? e = this.sharedKey = XPMobileSDK.library.Connection.dh.getSharedKey().toUpperCase() : XPMobileSDK.library.CHAP.sharedKey && (e = this.sharedKey = XPMobileSDK.library.CHAP.sharedKey.toUpperCase()), e
    }
}, XPMobileSDK.library.CHAP = {
    challenges: [],
    monitorTime: 1e3,
    sharedKey: "",
    minChallenges: 200,
    initialize: function () {
        XPMobileSDK.library.Connection.addObserver(this)
    },
    start: function () {
        this.challengeInterval || (this.challengeInterval = setInterval(function () {
            XPMobileSDK.library.CHAP.monitor()
        }, this.monitorTime))
    },
    monitor: function () {
        if (XPMobileSDK.library.Connection.connectionId) {
            if (this.challenges.length > 0)
                for (var e = 0; e < this.challenges.length; e++) this.challenges[e].isValid() || (this.challenges[e].destroy(), this.challenges.splice(e, 1));
            if (this.challenges.length < this.minChallenges) {
                var t = {
                    NumChallenges: 100
                };
                this.challenges.length <= 5 * this.minChallenges / 100 && (t.Reset = "Yes"), XPMobileSDK.requestChallenges(t)
            }
        }
    },
    add: function (e) {
        if ("string" == typeof e) {
            var t = new XPMobileSDK.library.Challenge(e);
            this.challenges.push(t)
        } else if ("object" == typeof e && e.length > 0)
            for (var n = 0; n < e.length; n++) {
                t = new XPMobileSDK.library.Challenge(e[n]);
                this.challenges.push(t)
            }
        this.start()
    },
    takeValidChallenge: function () {
        if (!(this.challenges.length > 0)) return console.warn("No challenges in the list!"), {
            getValue: function () {},
            getTime: function () {}
        };
        for (var e = 0; e < this.challenges.length; e++) {
            var t = this.challenges.shift();
            if (t.isValid()) return t;
            t.destroy()
        }
    },
    exportAll: function () {
        var e = [];
        return this.challenges.forEach(function (t) {
            var n = t.getValue();
            n && e.push(n)
        }), e
    },
    sort: function (e, t) {
        return t.getTime() - e.getTime()
    },
    calculate: function () {
        var e = this.takeValidChallenge();
        return e ? {
            Challenge: e.getValue(),
            ChalAnswer: CryptoJS.SHA512((e.getValue() + this.sharedKey).toUpperCase()).toString(CryptoJS.enc.Base64),
            timeout: 1e3 * (e.ttl - e.getTime())
        } : {
            Challenge: void 0,
            ChalAnswer: void 0,
            timeout: void 0
        }
    },
    connectionLostConnection: function () {
        this.destroy()
    },
    connectionDidDisconnect: function () {
        this.destroy()
    },
    connectionRequestSucceeded: function (e, t) {
        "Yes" == XPMobileSDK.library.Connection.CHAPSupported && t && t.parameters && t.parameters.Challenge && XPMobileSDK.library.Connection.connectionId && this.add(t.parameters.Challenge)
    },
    destroy: function () {
        if (this.challengeInterval && (clearInterval(this.challengeInterval), this.challengeInterval = null), this.challenges.length > 0)
            for (var e = 0; e < this.challenges.length; e++) {
                this.challenges.shift().destroy()
            }
        this.challenges = [], XPMobileSDK.library.SecureString.sharedKey = null
    }
}, XPMobileSDK.library.Challenge = function (e) {
    var t = this,
        n = 1,
        r = null,
        o = !0;
    this.ttl = 3540;
    r || (r = setInterval(function () {
        i()
    }, 1e3));
    var i = function () {
        (o = !(n >= t.ttl)) ? n++ : t.destroy()
    };
    this.isValid = function () {
        return o
    }, this.getValue = function () {
        return e
    }, this.getTime = function () {
        return n
    }, this.destroy = function () {
        r && (clearInterval(r), r = null), o = !1
    }
}, XPMobileSDK.library.DiffieHellman = function (e) {
    var t = str2bigInt({
            1024: "F488FD584E49DBCD20B49DE49107366B336C380D451D0F7C88B31C7C5B2D8EF6F3C923C043F0A55B188D8EBB558CB85D38D334FD7C175743A31D186CDE33212CB52AFF3CE1B1294018118D7C84A70A72D686C40319C807297ACA950CD9969FABD00A509B0246D3083D66A45D419F9C7CBD894B221926BAABA25EC355E92F78C7",
            2048: "87A8E61DB4B6663CFFBBD19C651959998CEEF608660DD0F25D2CEED4435E3B00E00DF8F1D61957D4FAF7DF4561B2AA3016C3D91134096FAA3BF4296D830E9A7C209E0C6497517ABD5A8A9D306BCF67ED91F9E6725B4758C022E0B1EF4275BF7B6C5BFC11D45F9088B941F54EB1E59BB8BC39A0BF12307F5C4FDB70C581B23F76B63ACAE1CAA6B7902D52526735488A0EF13C6D9A51BFA4AB3AD8347796524D8EF6A167B5A41825D967E144E5140564251CCACB83E6B486F6B3CA3F7971506026C0B857F689962856DED4010ABD0BE621C3A3960A54E710C375F26375D7014103A4B54330C198AF126116D2276E11715F693877FAD7EF09CADB094AE91E1A1597"
        } [XPMobileSDKSettings.primeLength], 16, 1),
        n = str2bigInt("2", 10, 1),
        r = [],
        o = null,
        s = function (e) {
            e.length % 2 != 0 && (e = "0" + e);
            for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substring(n, n + 2), 16));
            return t.reverse(), t
        };
    this.createPublicKey = function () {
        r = randBigInt(160, 0);
        var e = s(bigInt2str(powMod(n, r, t), 16));
        return e.push(0), Base64.encodeArray(e)
    }, this.setServerPublicKey = function (e) {
        var t = Base64.decodeBinary(e),
            n = [];
        for (i = t.length - 1; i >= 0; i--) n.push(t[i]);
        o = CryptoJS.enc.Base64.parse(Base64.encodeArray(n)).toString()
    }, this.getSharedKey = function () {
        var e = s(bigInt2str(powMod(str2bigInt(o, 16, 1), r, t), 16));
        return CryptoJS.enc.Base64.parse(Base64.encodeArray(e)).toString()
    }, this.encodeString = function (e) {
        var t = this.getSharedKey().substring(0, 96),
            n = CryptoJS.enc.Hex.parse(t.substring(32, 96)),
            r = {
                iv: CryptoJS.enc.Hex.parse(t.substring(0, 32))
            };
        return XPMobileSDKSettings.defaultEncryptionPadding && CryptoJS.pad[XPMobileSDKSettings.defaultEncryptionPadding] && (r.padding = CryptoJS.pad[XPMobileSDKSettings.defaultEncryptionPadding]), CryptoJS.AES.encrypt(e, n, r).ciphertext.toString(CryptoJS.enc.Base64)
    }
}, CryptoJS.pad.Iso10126 = {
    pad: function (e, t) {
        var n = (n = 4 * t) - e.sigBytes % n;
        e.concat(CryptoJS.lib.WordArray.random(n - 1)).concat(CryptoJS.lib.WordArray.create([n << 24], 1))
    },
    unpad: function (e) {
        e.sigBytes -= 255 & e.words[e.sigBytes - 1 >>> 2]
    }
}, XPMobileSDK.library.Ajax = new function () {
    this.Request = function (e, t) {
        var n = t.timeout || 0;
        delete t.timeout, t = Object.assign({
            method: "POST",
            contentType: "plain/text",
            responseType: "text",
            encoding: "utf-8",
            postBody: null,
            asynchronous: !0,
            onLoading: function () {},
            onComplete: function () {},
            onSuccess: function () {},
            onFailure: function () {},
            onTimeout: function () {}
        }, t);
        var r = new XMLHttpRequest;
        return r.onreadystatechange = function () {
            if (1 == r.readyState) t.onLoading(r);
            else if (4 == r.readyState) {
                if (t.onComplete(r), ("" == r.responseType || "text" == r.responseType) && 0 == r.status && "" == r.responseText) return void t.onFailure(r);
                if ("arraybuffer" == r.responseType && 0 == r.status && (null == r.response || "" == r.response)) return void t.onFailure(r);
                200 == r.status || 0 == r.status ? t.onSuccess(r) : t.onFailure(r)
            }
        }, r.open(t.method, e, t.asynchronous), t.asynchronous && (r.responseType = t.responseType, r.timeout = n, r.ontimeout = t.onTimeout), r.setRequestHeader("Content-Type", t.contentType + "; charset=" + t.encoding), r.send(t.postBody), r
    }
}, XPMobileSDK.library.Bytes = new function () {
    var e = function (e, t) {
        var n = (e = e.length % 2 ? "0" + e : e).match(/../g).splice(-t),
            r = new Array(t ? t - n.length : 0);
        return r.push.apply(r, n), r.forEach(function (e, t) {
            r[t] = parseInt(e || 0, 16)
        }), r
    };
    return {
        fromInt: function (t, n) {
            return e(t.toString(16), n)
        },
        fromGuid: function (t, n) {
            return e(t.replace(/[^a-f0-9]/gi, ""), n)
        },
        fromBase64: function (e, t) {
            for (var n = atob(e.replace(/^.*?,/, "")).slice(-t), r = new Array(t ? t - n.length : 0), o = 0; o < n.length; o++) r.push(n.charCodeAt(o));
            return r
        },
        fromHex: e
    }
};
var parseXML, XMLNodeTextContent, NETWORK = {
        MIN_REQUEST_TIME_LOWER_BOUND: 100,
        MIN_REQUEST_TIME_UPPER_BOUND: 1e3,
        MAX_REQUEST_TIME: 1e4,
        MAX_REQUEST_TIME_ON_FAILURE: 4e3,
        REQUEST_TIME_GROW_PER_EMPTY_FRAME: 1.32,
        REQUEST_TIME_GROW_PER_HTTP_ERROR: 10,
        MIN_REQUEST_TIME_GROW: 1.4,
        MIN_REQUEST_TIME_DECREASE: 3e4,
        MIN_REQUEST_TIME_INCREASE: 15e3,
        VIDEO_PROTOCOL_RECOVER_PACE: 13,
        VIDEO_FAILS_MONITOR: 7e3,
        minRequestTime: 10,
        requestTime: 10,
        requestTimeOnFailure: 2e3,
        websocketSendMessage: 1e3
    },
    CommunicationStability = new function () {
        var e = 0,
            t = 0,
            n = null;

        function r(e) {
            return n && (new Date).getTime() - n.getTime() > e
        }
        setInterval(function () {
            t = Math.max(0, t - 1 - parseInt(t / NETWORK.VIDEO_PROTOCOL_RECOVER_PACE)), NETWORK.requestTime = NETWORK.minRequestTime + t * NETWORK.REQUEST_TIME_GROW_PER_HTTP_ERROR, NETWORK.requestTimeOnFailure = Math.min(NETWORK.MAX_REQUEST_TIME_ON_FAILURE, NETWORK.requestTime * NETWORK.REQUEST_TIME_GROW_PER_HTTP_ERROR)
        }, 1e3), setInterval(function () {
            r(NETWORK.MIN_REQUEST_TIME_DECREASE) && (NETWORK.minRequestTime = Math.max(NETWORK.MIN_REQUEST_TIME_LOWER_BOUND, .9 * NETWORK.minRequestTime))
        }, NETWORK.VIDEO_FAILS_MONITOR), this.addBreakDown = function (t) {
            t.brokenDown || (e++, t.brokenDown = !0)
        }, this.removeBreakDown = function (t) {
            t.brokenDown && (e--, t.brokenDown = !1)
        }, this.addVideoBreakDown = function () {
            t++, n ? r(NETWORK.MIN_REQUEST_TIME_INCREASE) && (NETWORK.minRequestTime = Math.min(NETWORK.MIN_REQUEST_TIME_UPPER_BOUND, NETWORK.minRequestTime * NETWORK.MIN_REQUEST_TIME_GROW), n = new Date) : n = new Date
        }, this.isBrokenDown = function () {
            return e > 0
        }
    };
if (XPMobileSDK.library.ConnectionStates = {
        idle: 1,
        connecting: 2,
        loggingIn: 3,
        working: 4,
        lostConnection: 5
    }, XPMobileSDK.library.ConnectionObserverInterface = {
        connectionStateChanged: function () {},
        connectionDidConnect: function (e) {},
        connectionFailedToConnect: function (e) {},
        connectionFailedToConnectWithId: function (e) {},
        connectionRequiresCode: function (e) {},
        connectionCodeError: function () {},
        connectionDidLogIn: function () {},
        connectionFailedToLogIn: function (e) {},
        connectionLostConnection: function () {},
        connectionProcessingDisconnect: function () {},
        connectionDidDisconnect: function () {},
        connectionSwitchedToPull: function () {},
        connectionRequestSucceeded: function (e, t) {},
        connectionVersionChanged: function () {},
        connectionReloadConfiguration: function () {},
        connectionReloadCameraConfiguration: function () {},
        closeStreamFinished: function () {}
    }, Connection = function () {
        var e = this;
        this.connectionId = null, this.currentUserName = null, this.serverTimeout = 30, this.state = XPMobileSDK.library.ConnectionStates.idle, this.DSServerStatus = {
            NotAvailable: 0,
            DoNotEnforce: 1,
            EnforceWheneverPossible: 2,
            Enforce: 3
        };
        var t = [],
            n = [],
            r = 0,
            o = 0;
        this.initialize = function (t) {
            (e.storage = t) && (XPMobileSDK.features = e.storage.getItem("features"), e.resizeAvailable = e.storage.getItem("resizeAvailable"), e.webSocketServer = e.storage.getItem("webSocketServer"), e.webSocketBrowser = e.storage.getItem("webSocketBrowser"), e.directStreamingClient = e.storage.getItem("directStreamingClient"), e.directStreamingServer = e.storage.getItem("directStreamingServer"), e.diagnosticsOverlay = e.storage.getItem("diagnosticsOverlay")), e.server = XPMobileSDKSettings.MobileServerURL || window.location.origin, e.dh = new XPMobileSDK.library.DiffieHellman
        }, this.addObserver = function (e) {
            -1 == n.indexOf(e) && n.push(e)
        }, this.removeObserver = function (e) {
            var t = n.indexOf(e);
            t < 0 ? console.error("Error removing observer. Observer does not exist.") : n.splice(t, 1)
        }, this.cancelRequest = function (e) {
            console.log("Cancelling request: ", e), e.cancel(), ge(e)
        }, this.Connect = function (t, n, r) {
            return t = t || {}, ve(XPMobileSDK.library.ConnectionStates.connecting), t.ProcessingMessage = "No", e.sendCommand("Connect", t, {
                successCallback: n
            }, s, r)
        };
        var s = function (t) {
            ge(t);
            var n = t.response;
            if (!n || n.isError) {
                var r = n && n.error;
                be("connectionFailedToConnect", r), t.options.failCallback && t.options.failCallback(r)
            } else {
                e.connectionId = n.outputParameters.ConnectionId, e.serverTimeout = parseInt(n.outputParameters.Timeout), e.storage && ("boolean" == typeof e.storage.getItem("resizeAvailable") ? e.resizeAvailable = e.storage.getItem("resizeAvailable") : (e.resizeAvailable = !0, e.storage.setItem("resizeAvailable", e.resizeAvailable)), e.webSocketServer = "Yes" == n.outputParameters.WebSocketSupport, e.storage.setItem("webSocketServer", e.webSocketServer), "boolean" == typeof e.storage.getItem("webSocketBrowser") && window.WebSocket ? e.webSocketBrowser = e.storage.getItem("webSocketBrowser") : (e.webSocketBrowser = !!window.WebSocket, e.storage.setItem("webSocketBrowser", e.webSocketBrowser)), "boolean" == typeof e.storage.getItem("directStreamingClient") ? e.directStreamingClient = e.storage.getItem("directStreamingClient") : (e.directStreamingClient = !!XPMobileSDKSettings.DirectStreaming, e.storage.setItem("directStreamingClient", e.directStreamingClient)), "boolean" == typeof e.storage.getItem("diagnosticsOverlay") ? e.diagnosticsOverlay = e.storage.getItem("diagnosticsOverlay") : (e.diagnosticsOverlay = !1, e.storage.setItem("diagnosticsOverlay", e.diagnosticsOverlay))), n.outputParameters.SecurityEnabled && (e.SecurityEnabled = n.outputParameters.SecurityEnabled), n.outputParameters.PublicKey && (e.PublicKey = n.outputParameters.PublicKey, e.dh && e.dh.setServerPublicKey(n.outputParameters.PublicKey)), n.outputParameters.CHAPSupported && "Yes" == n.outputParameters.CHAPSupported && (e.CHAPSupported = n.outputParameters.CHAPSupported, XPMobileSDK.library.CHAP.sharedKey = e.dh && e.dh.getSharedKey()), n.outputParameters.ServerProductCode && (e.ServerProductCode = n.outputParameters.ServerProductCode), console.info("Established connection"), Ce();
                var o = n.outputParameters;
                be("connectionDidConnect", o), t.options.successCallback && t.options.successCallback(o)
            }
        };
        this.connectWithId = function (t, n) {
            e.server = t, e.connectionId = n, console.log("Connecting with Id " + e.connectionId), ve(XPMobileSDK.library.ConnectionStates.connecting), e.sendLiveMessage(), e.connectingViaExternalConnectionID = !0
        }, this.Login = function (t, n, r) {
            return t = t || {}, console.log("Log in with username " + t.Username + " password " + t.Password), ve(XPMobileSDK.library.ConnectionStates.loggingIn), e.sendCommand("LogIn", t, {
                successCallback: n
            }, a, r)
        };
        var a = function (t) {
                ge(t);
                var n = t.response;
                if (!n || n.isError)
                    if (n && n.error.code == XPMobileSDK.library.ConnectionError.SecondStepAuthenticationRequired) {
                        var r = n.outputParameters.SecondStepAuthenticationProvider;
                        be("connectionRequiresCode", r), t.options.successCallback && t.options.successCallback(r)
                    } else {
                        e.connectionId = null, ye();
                        var o = n && n.error;
                        be("connectionFailedToLogIn", o), t.options.failCallback && t.options.failCallback(o)
                    }
                else c(n, t.options.successCallback)
            },
            c = function (t, n) {
                var r = XPMobileSDK.features && XPMobileSDK.features.ServerVersion;
                e.directStreamingServer = "Yes" == t.outputParameters.DirectStreamingLive, e.storage.setItem("directStreamingServer", e.directStreamingServer), console.info("Logged in"), De(t.outputParameters), ve(XPMobileSDK.library.ConnectionStates.working), be("connectionDidLogIn"), n && n(), r && r != XPMobileSDK.features.ServerVersion && be("connectionVersionChanged")
            };
        this.requestCode = function (t, n) {
            return e.sendCommand("RequestSecondStepAuthenticationPin", {}, {
                successCallback: t
            }, l, n)
        };
        var l = function (e) {
            me(e, "Error requesting validation code.", e.options.successCallback)
        };
        this.verifyCode = function (t) {
            var n = {
                SecondStepAuthenticationPin: t
            };
            return e.sendCommand("VerifySecondStepAuthenticationPin", n, null, u)
        };
        var u = function (t) {
            ge(t);
            var n = t.response;
            !n || n.isError ? n && n.error.code == XPMobileSDK.library.ConnectionError.SecondStepAuthenticationCodeError ? be("connectionCodeError") : (e.connectionId = null, ye(), be("connectionFailedToLogIn", n && n.error)) : c(n)
        };
        this.Disconnect = function (t, n, r) {
            be("connectionProcessingDisconnect"), ye(), ve(XPMobileSDK.library.ConnectionStates.idle), XPMobileSDK.library.VideoConnectionPool.clear();
            t = t || {};
            var o = e.sendCommand("Disconnect", t, {
                successCallback: n
            }, d, r);
            return e.connectionId = null, o
        };
        var d = function (t) {
            ge(t), be("connectionDidDisconnect"), e.destroy()
        };
        this.getViews = function (t, n, r) {
            return e.sendCommand("GetViews", {
                ViewId: t
            }, {
                successCallback: n,
                ViewId: t
            }, f, r)
        };
        var f = function (e) {
            me(e, null, function () {
                for (var t = [], n = e.response.subItems.getElementsByTagName("Item"), r = 0, o = n.length; r < o; r++) {
                    for (var i = n[r], s = {}, a = 0; a < i.attributes.length; a++) s[i.attributes[a].name] = i.attributes[a].value;
                    t.push(s)
                }
                var c = {
                    id: e.options.ViewId,
                    subViews: t
                };
                e.options.successCallback && e.options.successCallback(c)
            })
        };
        this.getAllViews = function (t, n) {
            return e.sendCommand("GetAllViewsAndCameras", {}, {
                successCallback: t
            }, h, n)
        };
        var h = function (e) {
            me(e, "Error executing GetAllViewsAndCameras on the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getOsmServerAddresses = function (t, n) {
            return e.sendCommand("GetOsmServerAddresses", {}, {
                successCallback: t
            }, m, n)
        };
        var m = function (e) {
            me(e, "Error getting OSM server addresses from the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getGisMapCameras = function (t, n) {
            return e.sendCommand("GetGisMapCameras", {}, {
                successCallback: t
            }, g, n)
        };
        var g = function (e) {
            me(e, "Error getting GIS map cameras from the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getGisMapLocations = function (t, n) {
            return e.sendCommand("GetGisMapLocations", {}, {
                successCallback: t
            }, p, n)
        };
        var p = function (e) {
            me(e, "Error getting GIS map cameras from the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.requestPushStream = function (t, n) {
            return e.RequestStream({
                SignalType: "Upload",
                ByteOrder: "Network"
            }, t, n)
        };
        this.requestStream = function (t, n, r, o, i) {
            r = r || {};
            var s = {
                CameraId: t,
                DestWidth: Math.round(n.width),
                DestHeight: Math.round(n.height),
                SignalType: r.signal === XPMobileSDK.interfaces.VideoConnectionSignal.playback ? "Playback" : "Live",
                MethodType: "Push",
                Fps: 15,
                ComprLevel: r.jpegCompressionLevel ? r.jpegCompressionLevel : 70,
                KeyFramesOnly: r.keyFramesOnly ? "Yes" : "No",
                RequestSize: "Yes",
                StreamType: r.streamType == XPMobileSDK.library.VideoConnectionStream.FragmentedMP4 ? "FragmentedMP4" : "Transcoded"
            };
            r.fragmentDurationMs && (s.FragmentDurationMs = r.fragmentDurationMs), r.time && (s.SeekType = "Time", s.Time = r.time), r.motionOverlay && (s.MotionOverlay = "Yes"), XPMobileSDK.features.SupportNoScaledImages && (s.ResizeAvailable = "Yes"), XPMobileSDK.features.MultiCameraPlayback && r.playbackControllerId && (s.PlaybackControllerId = r.playbackControllerId);
            r = {
                successCallback: o,
                cameraId: t,
                signal: r.signal === XPMobileSDK.interfaces.VideoConnectionSignal.playback ? "Playback" : "Live",
                reuseConnection: !!r.reuseConnection
            };
            return e.sendCommand("RequestStream", s, r, v, i)
        }, this.RequestStream = function (t, n, r) {
            return e.sendCommand("RequestStream", t, {
                successCallback: n
            }, v, r)
        };
        var v = function (e) {
            me(e, "Error starting stream for camera " + e.options.cameraId, function () {
                var t = e.response.outputParameters.VideoId;
                console.log("Server prepared video ID " + t + " for camera " + e.options.cameraId);
                let n = new VideoStream(t, e);
                e.options.reuseConnection && XPMobileSDK.library.VideoConnectionPool.addCamera(e.options.cameraId, n), e.options.successCallback && e.options.successCallback(n)
            })
        };
        this.RequestAudioStreamIn = function (t, n, r) {
            return e.sendCommand("RequestAudioStreamIn", t, {
                successCallback: n
            }, b, r)
        }, this.requestAudioStreamIn = function (t, n, r, o) {
            var i = {
                ItemId: t,
                AudioEncoding: "Pcm",
                AudioSamplingRate: 8e3,
                AudioBitsPerSample: 16,
                AudioChannelsNumber: 1,
                StreamDataType: "Audio",
                SignalType: "Live",
                MethodType: "Push",
                StreamHeaders: "AllPresent",
                ByteOrder: "Network"
            };
            (n = n || {}).AudioSamplingRate && (i.AudioSamplingRate = n.AudioSamplingRate), n.AudioBitsPerSample && (i.AudioBitsPerSample = n.AudioBitsPerSample), n.AudioChannelsNumber && (i.AudioChannelsNumber = n.AudioChannelsNumber);
            n = {
                successCallback: r
            };
            return e.sendCommand("RequestAudioStreamIn", i, n, b, o)
        };
        var b = function (e) {
            me(e, "Error requesting video push stream from the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.RequestAudioStream = function (t, n, r) {
            return e.sendCommand("RequestAudioStream", t, {
                successCallback: n
            }, C, r)
        }, this.requestAudioStream = function (t, n, r, o) {
            var i = {
                ItemId: t,
                MethodType: "Push",
                SignalType: (n = n || {}).signal === XPMobileSDK.interfaces.VideoConnectionSignal.playback ? "Playback" : "Live",
                StreamType: "Transcoded",
                StreamDataType: "Audio",
                AudioEncoding: "Mp3",
                CloseConnectionOnError: "Yes"
            };
            n.playbackControllerId && (i.PlaybackControllerId = n.playbackControllerId), n.AudioCompressionLevel ? i.ComprLevel = n.AudioCompressionLevel : XPMobileSDKSettings.AudioCompressionLevel && (i.ComprLevel = XPMobileSDKSettings.AudioCompressionLevel);
            n = {
                successCallback: r,
                microphoneId: t
            };
            return e.sendCommand("RequestAudioStream", i, n, C, o)
        };
        var C = function (e) {
            me(e, "Error starting stream for microphone " + e.options.microphoneId, function () {
                var t = e.response.outputParameters.StreamId;
                console.log("Server prepared stream ID " + t + " for microphone " + e.options.microphoneId), e.options.successCallback && e.options.successCallback(e)
            })
        };
        this.toggleDirectStreaming = function (t) {
            e.directStreamingClient = !!t, e.storage && e.storage.setItem("directStreamingClient", e.directStreamingClient), XPMobileSDK.library.VideoConnection.instances.forEach(function (e) {
                e.getState() == XPMobileSDK.library.VideoConnectionState.running && e.close()
            })
        }, this.toggleDiagnosticsOverlay = function (t) {
            e.diagnosticsOverlay = !!t, e.storage && e.storage.setItem("diagnosticsOverlay", e.diagnosticsOverlay)
        };
        this.changeStream = function (t, n, r, o, i) {
            var s = {
                VideoConnection: t,
                VideoId: t.videoId,
                DestWidth: Math.round(r.width),
                DestHeight: Math.round(r.height)
            };
            return void 0 !== n.top && (s.SrcTop = Math.round(n.top)), void 0 !== n.left && (s.SrcLeft = Math.round(n.left)), void 0 !== n.right ? s.SrcRight = Math.round(n.right) : void 0 !== n.width && (s.SrcRight = Math.round(n.width) + Math.round(n.left)), void 0 !== n.bottom ? s.SrcBottom = Math.round(n.bottom) : void 0 !== n.height && (s.SrcBottom = Math.round(n.height) + Math.round(n.top)), e.ChangeStream(s, o, i)
        }, this.ChangeStream = function (t, n, r) {
            return e.sendCommand("ChangeStream", t, {
                successCallback: n
            }, S, r)
        };
        var S = function (e) {
            me(e, "Error changing stream.", function () {
                XPMobileSDK.features.SupportTimeBetweenFrames && e.VideoConnection.resetCommunication(), e.options.successCallback && e.options.successCallback()
            })
        };
        this.motionDetection = function (t, n) {
            var r = {
                    VideoId: t.videoId,
                    VideoConnection: t
                },
                o = n.motion || n.MotionAmount;
            o && (r.MotionAmount = Math.round(o));
            var i = n.sensitivity || n.SensitivityAmount;
            i && (r.SensitivityAmount = Math.round(i));
            var s = n.cpu || n.CPUImpactAmount;
            s && (r.CPUImpactAmount = Math.round(s));
            var a = n.grid || n.RegionGrid;
            return /^\d+x\d+(;\d+)+$/.test(a) && (r.RegionGrid = a), e.ChangeStream(r)
        }, this.getPtzPresets = function (t, n, r) {
            var o = {
                CameraId: t
            };
            return e.sendCommand("GetPtzPresets", o, {
                successCallback: n
            }, y, r)
        };
        var y = function (e) {
            me(e, "Error getting PTZ presets.", function () {
                delete e.response.outputParameters.Challenge, e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.closeStream = function (t) {
            return e.CloseStream({
                VideoId: t
            })
        }, this.closeAudioStream = function (t) {
            return e.sendCommand("CloseStream", {
                VideoId: t
            }, {
                successCallback: null
            }, I)
        }, this.CloseStream = function (t, n, r) {
            return e.sendCommand("CloseStream", t, {
                successCallback: n
            }, _, r)
        };
        var _ = function (e) {
                P(e), be("closeStreamFinished")
            },
            I = function (e) {
                P(e)
            },
            P = function (e) {
                ge(e);
                var t = e.response;
                t && !t.isError || Ee(e) && Me()
            },
            D = new function () {
                var t = !1,
                    n = !1,
                    r = 15,
                    o = 1,
                    i = 0;
                this.manage = function (e) {
                    e ? (i = 0, e > 1 && this.decrease()) : ++i > 5 && (this.increase(), i = 0)
                }.bind(this), this.decrease = function () {
                    t || 1 == r || (t = !0, r = r > o ? o : 1, console.warn("Decreasing FPS to " + r), s(r, function () {
                        t = !1
                    }.bind(this)))
                }.bind(this), this.increase = function () {
                    n || 15 == r || (n = !0, o = r++, console.warn("Increasing FPS to " + r), s(r, function () {
                        n = !1
                    }.bind(this)))
                }.bind(this);
                var s = function (t, n, r) {
                    for (var o, i = 0; o = XPMobileSDK.library.VideoConnectionPool.cameras[i]; i++)
                        if (o.videoConnection && o.videoConnection.videoId) {
                            var s = {
                                VideoId: o.videoConnection.videoId,
                                Fps: t,
                                VideoConnection: o.videoConnection
                            };
                            e.ChangeStream(s, n, r)
                        }
                }.bind(this)
            };
        this.ptzPreset = function (t, n) {
            var r = {
                CameraId: t.cameraId,
                PtzPreset: n
            };
            return e.sendCommand("ControlPTZ", r, null, E)
        }, this.ptzMove = function (t, n) {
            var r = {
                CameraId: t.cameraId,
                PtzMove: n,
                VideoConnection: t
            };
            return e.sendCommand("ControlPTZ", r, null, E)
        }, this.ptzTapAndHold = function (t, n, r) {
            return t.Type = "TapAndHold", t.GestureTimeout = 2e3, e.sendCommand("ControlPTZ", t, {
                successCallback: n
            }, k, r)
        };
        var k = function (e) {
            me(e, "Error controlling PTZ", function () {
                e.options.successCallback && e.options.successCallback()
            })
        };
        this.ptzSwipe = function (t, n) {
            return t.Type = "Swipe", t.GestureDuration = n, e.sendCommand("ControlPTZ", t, null, E)
        };
        var E = function (e) {
            me(e, "Error controlling PTZ")
        };
        this.playbackSpeed = function (t, n) {
            var r = {
                VideoId: t.videoId,
                Speed: n,
                VideoConnection: t
            };
            return e.ChangeStream(r)
        }, this.playbackSeek = function (t, n) {
            var r = {
                VideoId: t.videoId,
                SeekType: n,
                VideoConnection: t
            };
            return e.ChangeStream(r)
        }, this.playbackGoTo = function (t, n, r, o, i) {
            var s = {
                VideoId: t.videoId,
                SeekType: r || "Time",
                Time: n,
                VideoConnection: t
            };
            return e.ChangeStream(s, o, i)
        }, this.getThumbnail = function (t, n, r) {
            var o = {
                CameraId: t,
                ComprLevel: 70
            };
            return e.sendCommand("GetThumbnail", o, {
                successCallback: n
            }, M, r)
        };
        var M = function (e) {
            me(e, "Error getting thumbnail.", function () {
                e.response.thumbnailBase64 && e.options.successCallback && e.options.successCallback(e.response.thumbnailBase64)
            })
        };
        this.getThumbnailByTime = function (t, n, r) {
            var o = {
                CameraId: t.cameraId,
                Time: t.time,
                SeekType: "Time"
            };
            return t.width && (o.DestWidth = t.width), t.height && (o.DestHeight = t.height), e.sendCommand("GetThumbnailByTime", o, {
                successCallback: n
            }, w, r)
        };
        var w = function (e) {
            me(e, "Error getting thumbnail by time", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters.Thumbnail, e.response.outputParameters.Timestamp)
            })
        };
        this.getDBStartTime = function (t, n, r) {
            var o = {
                CameraId: t,
                SeekType: "DbStart"
            };
            return e.sendCommand("GetRecordingTime", o, {
                successCallback: n
            }, T, r)
        };
        var T = function (e) {
            me(e, "Error getting recording time", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters.Time)
            })
        };
        this.getNextSequence = function (t, n, r, o) {
            var i = parseInt(((new Date).getTime() - n) / 1e3),
                s = {
                    CameraId: t,
                    SeqType: "Recording",
                    Time: n,
                    AfterTime: i = i < 0 ? 0 : i,
                    AfterCount: 1
                };
            return e.sendCommand("GetSequences", s, {
                successCallback: r
            }, A, o)
        };
        var A = function (e) {
            me(e, "Error getting sequences", function () {
                e.response.sequences.length > 0 ? e.options.successCallback && e.options.successCallback(e.response.sequences[0]) : e.options.successCallback && e.options.successCallback(null)
            })
        };
        this.getPrevSequence = function (t, n, r, o) {
            var i = {
                CameraId: t,
                SeqType: "Recording",
                Time: n,
                BeforeTime: Date.daysToSeconds(30),
                BeforeCount: 1
            };
            return e.sendCommand("GetSequences", i, {
                successCallback: r
            }, x, o)
        };
        var x = function (e) {
            me(e, "Error getting sequences", function () {
                e.response.sequences.length > 0 ? e.options.successCallback && e.options.successCallback(e.response.sequences[0]) : e.options.successCallback && e.options.successCallback(null)
            })
        };
        this.getSequencesInInterval = function (t, n, r, o, i, s) {
            var a = {
                CameraId: t,
                SeqType: "Recording",
                Time: n,
                AfterTime: parseInt((r - n) / 1e3),
                AfterCount: 1e4,
                InvestigationId: o
            };
            return e.sendCommand("GetSequences", a, {
                successCallback: i
            }, B, s)
        };
        var B = function (e) {
            me(e, "Error getting sequences", function () {
                e.options.successCallback && e.options.successCallback(e.response.sequences)
            })
        };
        this.startVideoExport = function (t, n, r, o, i) {
            var s = {
                CameraId: t,
                StartTime: n,
                EndTime: r,
                Type: "Avi"
            };
            return e.sendCommand("StartExport", s, {
                successCallback: o
            }, R, i)
        }, this.startImageExport = function (t, n, r, o) {
            var i = {
                CameraId: t,
                StartTime: n,
                Type: "Jpeg"
            };
            return e.sendCommand("StartExport", i, {
                successCallback: r
            }, R, o)
        }, this.restartErroneousExport = function (t, n, r) {
            var o = {
                ExportId: t
            };
            return e.sendCommand("StartExport", o, {
                successCallback: n
            }, R, r)
        };
        var R = function (e) {
            me(e, "Error starting export.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters.ExportId)
            })
        };
        this.getUserExports = function (t, n) {
            return e.sendCommand("GetExport", {
                ExportId: "00000000-0000-0000-0000-000000000000"
            }, {
                successCallback: t
            }, K, n)
        };
        var K = function (e) {
            me(e, "Error getting user exports", function () {
                e.options.successCallback && e.options.successCallback(e.response.exports)
            })
        };
        this.getAllExports = function (t, n) {
            return e.sendCommand("GetExport", {
                ExportId: "{A3B9C5FB-FAAD-42C8-AB73-B79D6FFFDBC1}"
            }, {
                successCallback: t
            }, X, n)
        };
        var X = function (e) {
            me(e, "Error getting all exports", function () {
                e.options.successCallback && e.options.successCallback(e.response.exports)
            })
        };
        this.getExport = function (t, n, r) {
            var o = {
                ExportId: t
            };
            return e.sendCommand("GetExport", o, {
                successCallback: n
            }, O, r)
        };
        var O = function (e) {
            me(e, "Error getting export", function () {
                0 != e.response.exports.length ? e.options.successCallback && e.options.successCallback(e.response.exports[0]) : e.options.successCallback && e.options.successCallback(null)
            })
        };
        this.deleteExport = function (t, n, r) {
            var o = {
                ExportId: t
            };
            return e.sendCommand("DeleteExport", o, {
                successCallback: n
            }, F, r)
        };
        var F = function (e) {
            me(e, "Error deleting export.", function () {
                e.options.successCallback && e.options.successCallback()
            })
        };
        this.getOutputsAndEvents = function (t, n) {
            return e.sendCommand("GetOutputsAndEvents", {
                CameraId: ""
            }, {
                successCallback: t
            }, N, n)
        };
        var N = function (e) {
            me(e, "Error getting outputs and events", function () {
                e.options.successCallback && e.options.successCallback(e.response.actions)
            })
        };
        this.getServerStatus = function (t, n) {
            return e.sendCommand("GetServerStatus", {}, {
                successCallback: t
            }, q, n)
        };
        var q = function (e) {
            me(e, "Error getting server status", function () {
                e.options.successCallback && e.options.successCallback(e.response.ServerStatus)
            })
        };
        this.triggerOutputOrEvent = function (t, n, r, o) {
            var i = {
                ObjectId: t,
                TriggerType: n
            };
            return e.sendCommand("RequestActivation", i, {
                successCallback: r
            }, L, o)
        };
        var L = function (e) {
            me(e, "Error triggering output or event.", function () {
                e.options.successCallback && e.options.successCallback()
            })
        };
        this.getCameraCapabilities = function (t, n, r) {
            var o = {
                CameraId: t
            };
            return e.sendCommand("GetCapabilities", o, {
                successCallback: n
            }, H, r)
        };
        var H = function (e) {
            me(e, "Error getting camera capabilities", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.prepareUpload = function (t, n, r) {
            return e.sendCommand("PrepareUpload", t, {
                successCallback: n
            }, V, r)
        };
        var V = function (e) {
            me(e, "Error preparing upload", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.getUploadStatus = function (t, n, r) {
            return e.sendCommand("GetUploadStatus", t, {
                successCallback: n
            }, z, r)
        };
        var z = function (e) {
            me(e, "Error getting upload status", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.requestChallenges = function (t, n, r) {
            return e.sendCommand("RequestChallenges", t, {
                successCallback: n
            }, U, r)
        };
        var U = function (e) {
            me(e, "Error getting challenges.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };

        
        this.createPlaybackController = function (t, n, r) {
            return t.MethodType = "Push", /*t.CloseOldControllers = "No",*/ e.sendCommand("CreatePlaybackController", t, {
                successCallback: n
            }, W, r)
        };
        var W = function (e) {
            var t = e.response,
                n = new XPMobileSDK.library.VideoConnection(t.outputParameters.PlaybackControllerId, e, {
                    onClose: function () {},
                    onRestart: function () {},
                    onPushFailed: function () {}
                });
            me(e, "Error creating playback controller", function () {
                e.options.successCallback && e.options.successCallback(n)
            })
        };
        this.changeMultipleStreams = function (t, n, r) {
            return e.sendCommand("ChangeMultipleStreams", t, {
                successCallback: n
            }, j, r)
        };
        var j = function (e) {
            me(e, "Error getting multiple stream data", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.getAllInvestigations = function (t, n) {
            return e.sendCommand("GetInvestigation", {
                ItemId: "{A3B9C5FB-FAAD-42C8-AB73-B79D6FFFDBC1}"
            }, {
                successCallback: t
            }, G, n)
        }, this.getUserInvestigations = function (t, n) {
            return e.sendCommand("GetInvestigation", {
                ItemId: "00000000-0000-0000-0000-000000000000"
            }, {
                successCallback: t
            }, G, n)
        };
        var G = function (e) {
            me(e, "Error getting investigations", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getInvestigation = function (t, n, r) {
            var o = {
                ItemId: t
            };
            return e.sendCommand("GetInvestigation", o, {
                successCallback: n
            }, J, r)
        };
        var J = function (e) {
            me(e, "Error getting investigation", function () {
                e.options.successCallback && e.options.successCallback(e.response.items[0])
            })
        };
        this.createInvestigation = function (t, n, r) {
            return e.sendCommand("CreateInvestigation", t, {
                successCallback: n
            }, Y, r)
        };
        var Y = function (e) {
            me(e, "Error creating investigation to the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.updateInvestigation = function (t, n, r) {
            return e.sendCommand("UpdateInvestigation", t, {
                successCallback: n
            }, Q, r)
        }, this.updateInvestigationData = function (t, n, r) {
            return e.sendCommand("UpdateInvestigationData", t, {
                successCallback: n
            }, Q, r)
        };
        var Q = function (e) {
            me(e, "Error updating investigation to the server.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters)
            })
        };
        this.deleteInvestigation = function (t, n, r) {
            return e.sendCommand("DeleteInvestigation", {
                ItemId: t
            }, {
                successCallback: n
            }, Z, r)
        };
        var Z = function (e) {
            me(e, "Error deleteing investigation from the server.", function () {
                e.options.successCallback && e.options.successCallback(!e.response.isError)
            })
        };
        this.cancelInvestigation = function (t) {
            return e.sendCommand("CancelInvestigationUpdate", {
                ItemId: t
            }, null, ee)
        };
        var ee = function (e) {
            me(e, "Error canceling investigation update")
        };
        this.startInvestigationExport = function (t, n, r, o, i) {
            var s = {
                InvestigationId: t,
                ExportType: n,
                IncludeAudio: r
            };
            return e.sendCommand("StartInvestigationExport", s, {
                successCallback: o
            }, te, i)
        };
        var te = function (e) {
            me(e, "Error starting investigation export.", function () {
                e.options.successCallback && e.options.successCallback(e.response.outputParameters.ExportId)
            })
        };
        this.deleteInvestigationExport = function (t, n, r, o) {
            var i = {
                InvestigationId: t,
                ExportType: n
            };
            return e.sendCommand("DeleteInvestigationExport", i, {
                successCallback: r
            }, ne, o)
        };
        var ne = function (e) {
            me(e, "Error deleting investigation export.", e.options.successCallback)
        };
        this.getAlarmList = function (t, n, r) {
            t = {
                MyAlarms: t.MyAlarms || "No",
                Timestamp: t.Timestamp,
                Operator: "LessThan",
                Count: t.Count,
                Priority: t.Priority,
                State: t.State
            };
            return e.sendCommand("GetAlarmList", t, {
                successCallback: n
            }, re, r)
        };
        var re = function (e) {
            me(e, "Error getting alarms", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getAlarm = function (t, n, r) {
            var o = {
                AlarmId: t
            };
            return e.sendCommand("GetAlarmList", o, {
                successCallback: n
            }, oe, r)
        };
        var oe = function (e) {
            me(e, "Error getting alarm", function () {
                e.options.successCallback && e.options.successCallback(e.response.items[0])
            })
        };
        this.updateAlarm = function (t, n, r) {
            return e.sendCommand("UpdateAlarm", t, {
                successCallback: n
            }, ie, r)
        };
        var ie = function (e) {
            me(e, "Error updating alarms", function () {
                e.options.successCallback && e.options.successCallback()
            })
        };
        this.getAlarmDataSettings = function (t, n) {
            return e.sendCommand("GetAlarmDataSettings", {}, {
                successCallback: t
            }, se, n)
        };
        var se = function (e) {
            me(e, "Error getting alarm data settings", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.getAlarmUsers = function (t, n, r) {
            return e.sendCommand("GetPermittedUsers", {
                SourceId: t
            }, {
                successCallback: n
            }, ae, r)
        };
        var ae = function (e) {
            me(e, "Error getting permitted users for alarm", function () {
                e.options.successCallback && e.options.successCallback(e.response.items)
            })
        };
        this.acknowledgeAlarm = function (t, n, r) {
            return e.sendCommand("AcknowledgeAlarm", {
                Id: t
            }, {
                successCallback: n
            }, ce, r)
        };
        var ce = function (e) {
            me(e, "Error acknowledging alarm", function () {
                e.options.successCallback && e.options.successCallback()
            })
        };
        this.prevCarouselCamera = function (t) {
            return e.sendCommand("ControlCarousel", {
                VideoId: t,
                CarouselCommand: "PreviousCamera"
            }, null, le)
        };
        var le = function (e) {
            me(e, "Error getting prev camera from carousel")
        };
        this.nextCarouselCamera = function (t) {
            return e.sendCommand("ControlCarousel", {
                VideoId: t,
                CarouselCommand: "NextCamera"
            }, null, ue)
        };
        var ue = function (e) {
            me(e, "Error getting next camera from carousel")
        };
        this.pauseCarousel = function (t) {
            return e.sendCommand("ControlCarousel", {
                VideoId: t,
                CarouselCommand: "PauseCarousel"
            }, null, de)
        };
        var de = function (e) {
            me(e, "Error pausing carousel")
        };
        this.resumeCarousel = function (t) {
            return e.sendCommand("ControlCarousel", {
                VideoId: t,
                CarouselCommand: "ResumeCarousel"
            }, null, fe)
        };
        var fe = function (e) {
            me(e, "Error resuming carousel")
        };
        this.registerForNotifications = function (t, n, r) {
            var o = $.getBrowser(),
                i = o.name + " " + o.version + ", " + o.os,
                s = {
                    Settings: t,
                    DeviceName: XPMobileSDK.library.Connection.dh.encodeString(i),
                    DeviceId: XPMobileSDK.library.Connection.connectionId
                };
            return e.RegisterForNotifications(s, n, r)
        }, this.RegisterForNotifications = function (t, n, r) {
            return e.sendCommand("RegisterForNotifications", t, {
                successCallback: n
            }, he, r)
        };
        var he = function (e) {
                me(e, "Error register for notifications.", function () {
                    e.options.successCallback && e.options.successCallback(e.response.items)
                })
            },
            me = function (e, t, n) {
                ge(e);
                var r = e.response;
                !r || r.isError ? Ee(e) ? (console.error("The application has lost connection due to connectionRequestResponseIsTerminal"), console.log(t), Me()) : (console.error(t), e.options.failCallback ? e.options.failCallback(r.error, r) : e.options.successCallback && e.options.successCallback(null, r.error, r)) : n && n()
            };
        this.sendCommand = function (n, r, o, i, s) {
            if (r = r || {}, XPMobileSDKSettings.supportsCHAP && "Yes" == e.SecurityEnabled && "Yes" == e.CHAPSupported) {
                var a = XPMobileSDK.library.CHAP.calculate();
                a.Challenge && a.ChalAnswer && (r.Challenge = a.Challenge, r.ChalAnswer = a.ChalAnswer)
            }
            o = o || {}, s && (o.failCallback = s), console.log("Sending " + n + " on " + new Date + "with ", r);
            var c = new XPMobileSDK.library.ConnectionRequest(n, pe(), r, o, i);
            return t.push(c), c
        };
        var ge = function (e) {
                var n = t.indexOf(e);
                n > -1 && t.splice(n, 1);
                var r = {
                        parameters: e.params,
                        options: e.options
                    },
                    o = e.response && {
                        parameters: e.response.outputParameters
                    };
                be("connectionRequestSucceeded", r, o)
            },
            pe = function () {
                return ++r
            },
            ve = function (t) {
                e.state = t, be("connectionStateChanged")
            },
            be = function () {
                if (!(arguments.length < 1)) {
                    var e = arguments[0],
                        t = Array.prototype.slice.call(arguments, 1);
                    n.forEach(function (n) {
                        if (n[e]) try {
                            n[e].apply(n, t)
                        } catch (e) {
                            console.error(e), console.log(e.stack)
                        }
                    })
                }
            },
            Ce = function () {
                e.liveMessageTimer || (e.liveMessageTimer = setInterval(e.sendLiveMessage, 1e3 * e.serverTimeout / 3))
            };
        this.updateLiveMessageTimer = function (t) {
            var n = 1e3 * e.serverTimeout / 3;
            t && "number" == typeof t && (n = Math.min(n, t)), clearTimeout(e.liveMessageTimer), e.liveMessageTimer = setInterval(e.sendLiveMessage, n)
        };
        var Se, ye = function () {
            e.liveMessageTimer && (clearTimeout(e.liveMessageTimer), e.liveMessageTimer = null)
        };
        this.sendLiveMessage = function () {
            e.LiveMessage(), e.webSocketServer && e.webSocketBrowser && D.manage(o), o++
        };
        var _e = function () {
                ye(), ve(XPMobileSDK.library.ConnectionStates.idle), XPMobileSDK.library.VideoConnectionPool.clear(), be("connectionProcessingDisconnect"), e.connectionId = null, be("connectionDidDisconnect"), e.destroy()
            },
            Ie = function () {
                Se || (Se = setTimeout(_e, 1e3 * e.serverTimeout))
            };
        this.LiveMessage = function (t, n, r) {
            t = t || {}, r = r || Ie, e.sendCommand("LiveMessage", t, {
                successCallback: n
            }, Pe, r)
        };
        var Pe = function (t) {
                o--, ge(t), clearTimeout(Se), Se = void 0;
                var n = t.response;
                if ((!n || n.isError) && Ee(t)) return e.connectingViaExternalConnectionID ? (e.connectingViaExternalConnectionID = !1, console.warn("Old connection ID has expired"), be("connectionFailedToConnectWithId", n && n.error), e.connectionId = null) : Me(), void ye();
                if (e.connectingViaExternalConnectionID && (e.connectingViaExternalConnectionID = !1, console.log("Started connection from external connection ID"), ve(XPMobileSDK.library.ConnectionStates.working), be("connectionDidLogIn")), "Yes" != n.outputParameters.FolderDefinitionsChanged && "Yes" != n.outputParameters.ViewDefinitionsChanged || be("connectionReloadConfiguration"), "Yes" == n.outputParameters.CameraDefinitionsChanged && be("connectionReloadCameraConfiguration"), n.items && n.items.length > 0)
                    for (var r = 0; r < n.items.length; r++) "Notification" == n.items[r].Type && be("receivedNotification", n.items[r]);
                Ce()
            },
            De = function (t) {
                if (t) {
                    t.SupportNoScaledImages || (t.SupportNoScaledImages = "Yes");
                    var n = {};
                    for (i in t) switch (i) {
                        case "Challenge":
                            n.CHAPSupported = !0;
                            break;
                        case "ServerVersion":
                            n.ServerVersion = t[i];
                            break;
                        default:
                            var r = isNaN(Number(t[i])) ? "Yes" == t[i] : Number(t[i]);
                            n[i] = r
                    }
                    ke(n), e.storage && e.storage.setItem("features", n), XPMobileSDK.features = n
                }
            },
            ke = function (t) {
                t.NativeStreamingAvailable ? t.TranscodedStreamingAvailable ? t.NativeStreamingSuggested ? t.DirectStreaming = e.DSServerStatus.EnforceWheneverPossible : t.DirectStreaming = e.DSServerStatus.DoNotEnforce : t.DirectStreaming = e.DSServerStatus.Enforce : t.DirectStreaming = e.DSServerStatus.NotAvailable
            },
            Ee = function (e) {
                var t = e.response;
                return null == t || t.errorCode == XPMobileSDK.library.ConnectionError.WrongID || t.errorCode == XPMobileSDK.library.ConnectionError.ChallengesLimitReached || "Wrong connection ID" == t.errorString
            },
            Me = function () {
                e.state != XPMobileSDK.library.ConnectionStates.lostConnection && (ve(XPMobileSDK.library.ConnectionStates.lostConnection), e.connectionId = null, XPMobileSDK.library.VideoConnectionPool.clear(), e.destroy(), be("connectionLostConnection"))
            };
        this.destroy = function () {
            t = [], e.storage && (e.storage.removeItem("features"), e.storage.removeItem("webSocketServer"), e.storage.removeItem("directStreamingServer"))
        }
    }, XPMobileSDK.library.ConnectionError = {
        NotImplemented: 1,
        NotFullyImplemented: 2,
        BadCommandType: 10,
        BadCommandKind: 11,
        WrongID: 12,
        MissingInputParameter: 13,
        WrongInputParameter: 14,
        InvalidCredentials: 15,
        IncorrectPublicKey: 16,
        SurveillanceServerDown: 17,
        InvalidLicense: 18,
        SecurityError: 19,
        UnknownCameraID: 20,
        UnknownItemID: 21,
        NoPresetsAvailable: 22,
        NotAllowedInThisState: 23,
        FeatureIsDisabled: 24,
        InsufficientUserRights: 25,
        TooManySessions: 26,
        NewConfigurationNotAvailable: 27,
        AddressesNotReachable: 28,
        PlaybackStreamsLimitReached: 29,
        Redirection: 30,
        MovingInvestigations: 31,
        NoRecordingsFound: 32,
        NoRecordingsInInterval: 33,
        SecondStepAuthenticationRequired: 34,
        SecondStepAuthenticationEnabledUsersOnly: 35,
        SecondStepAuthenticationCodeError: 36,
        SecondStepAuthenticationCodeExpired: 37,
        InputParameterTooLong: 43,
        ChallengesLimitReached: 51,
        UknownIdOrInsufficientRightForSomeItems: 52,
        UknownIdOrInsufficientRightForAllItems: 53,
        ItemNotPlayable: 54,
        Unknown: 2147483647,
        IncorrectServerResponse: this.Unknown - 21,
        SdkNotConnected: this.Unknown - 20,
        HttpResponseError: this.Unknown - 11,
        HttpRequestError: this.Unknown - 10,
        CommandProcessingError: this.Unknown - 3,
        CommandTimedOut: this.Unknown - 2,
        InternalError: this.Unknown - 1
    }, function (e) {
        var t = 0;
        XPMobileSDK.library.ConnectionRequest = function (n, r, o, i, s) {
            var a = this;
            XPMobileSDK.addObserver(this), a.options = i || {}, a.response = null, o.VideoConnection && (a.VideoConnection = o.VideoConnection, delete o.VideoConnection), a.params = o || {};
            var c, l, u = !1,
                d = 0,
                f = function () {
                    var t = "";
                    for (key in o) {
                        var i = function (t, n) {
                            return n = (n = n !== e && n.toString ? n.toString() : "").replace('"', '"'), '<Param Name="' + t + '" Value="' + n + '" />'
                        };
                        o[key] !== e && o[key] instanceof Array ? o[key].forEach(function (e) {
                            t += i(key, e)
                        }) : t += i(key, o[key])
                    }
                    return '<?xml version="1.0" encoding="utf-8"?><Communication xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' + (XPMobileSDK.library.Connection.connectionId ? "<ConnectionId>" + XPMobileSDK.library.Connection.connectionId + "</ConnectionId >" : "") + '<Command SequenceId="' + r + '"><Type>Request</Type><Name>' + n + "</Name><InputParams>" + t + "</InputParams></Command></Communication>\r\n\r\n"
                }(),
                h = function (e) {
                    if (/^http(s)?:/i.test(e)) return e;
                    var t = window.location.protocol + "//",
                        n = document.location.hostname,
                        r = document.location.port && !/^:\d+/.test(e) ? ":" + document.location.port : "";
                    return t + n + r + e
                }(XPMobileSDK.library.Connection.server) + XPMobileSDKSettings.communicationChanel,
                m = !1;

            function g() {
                "LiveMessage" == n && (t = Date.now()), /*console.log(f),*/ c = XPMobileSDK.library.Ajax.Request(h, {
                    contentType: "text/xml",
                    postBody: f,
                    onSuccess: v,
                    onComplete: p,
                    onFailure: a.options.failCallback || function () {
                        b()
                    }
                })
            }

            function p(e) {
                4 == e.readyState && 200 != e.status && ("LiveMessage" == n && Date.now() - t < XPMobileSDKSettings.liveMessageMinimumInterval || function () {
                    m || (console.error("Command " + n + " failed"), ("LiveMessage" == n || "CloseStream" == n || "RequestStream" == n || "Disconnect" == n) && (console.warn("Restarting " + n), CommunicationStability.addBreakDown(a), setTimeout(function () {
                        u = !1, g()
                    }.bind(this), 1e3)))
                }())
            }

            function v() {
                CommunicationStability.removeBreakDown(a), l && (clearTimeout(l), l = null), u || (b(), u = !0), c = null
            }

            function b() {
                var e = 0;
                try {
                    var t = c.responseText
                } catch (e) {
                    return
                }
                for ("<?xml" != t.trim().substr(0, 5) && (a.response = {
                        isError: !0,
                        errorCode: "The response from the server is not well-formatted",
                        outputParameters: []
                    }, s && s(a));
                    (e = t.indexOf("\r\n\r\n", d)) > 0;) {
                    var n = t.substring(d, e);
                    if (n) {
                        var r = new XPMobileSDK.library.ConnectionResponse(n);
                        r.isProcessing || (a.response = r, u = !0, s && s(a))
                    }
                    d = e + 4
                }
            }
            g(), this.cancel = function () {
                l && (clearTimeout(l), l = null), c && (c.onreadystatechange = function () {}, c.abort(), c = null, XPMobileSDK.library.Ajax.activeRequestCount--)
            }, this.connectionDidDisconnect = function () {
                m = !0
            }
        }
    }(), XPMobileSDK.library.ConnectionResponse = function (e) {
        var t = this;
        t.sequenceID = 0, t.command = "", t.isResponse = !1, t.isProcessing = !1, t.isError = !1, t.outputParameters = null, t.subItems = null, t.thumbnailBase64 = null, t.exports = [], t.sequences = [], t.actions = [], t.items = [], t.errorCode = 0, t.errorString = "";
        var n, r, o = parseXML(e).getElementsByTagName("Communication")[0].getElementsByTagName("Command")[0],
            i = o.getElementsByTagName("Type")[0];
        if ("Processing" == XMLNodeTextContent(i)) console.log("Processing..."), t.isProcessing = !0;
        else if ("Response" == XMLNodeTextContent(i)) {
            var s;
            if (t.isResponse = !0, (s = o.getElementsByTagName("OutputParams")).length > 0) {
                t.outputParameters = {};
                for (var a = s[0].getElementsByTagName("Param"), c = 0, l = a.length; c < l; c++) {
                    for (var u = "", d = "", f = a[c].attributes, h = 0; h < f.length; h++) {
                        var m = f[h];
                        "Name" == m.name ? u = m.value : "Value" == m.name && (d = m.value)
                    }
                    if (u && d)
                        if (this.outputParameters[u] && "string" == typeof this.outputParameters[u]) {
                            var g = this.outputParameters[u];
                            this.outputParameters[u] = new Array, this.outputParameters[u].push(g)
                        } else "object" == typeof this.outputParameters[u] ? this.outputParameters[u].push(d) : this.outputParameters[u] = d
                }
            }
            if ((s = o.getElementsByTagName("SubItems")).length > 0 && (t.subItems = s[0]), (s = o.getElementsByTagName("ServerStatus")).length > 0) {
                t.ServerStatus = {};
                var p = s[0].getElementsByTagName("CpuUsage");
                p.length > 0 && (t.ServerStatus.CPU = XMLNodeTextContent(p[0]));
                var v = s[0].getElementsByTagName("DiskUsage");
                if (v.length > 0) {
                    t.ServerStatus.HDD = {};
                    var b = v[0].getElementsByTagName("RecordingDiskUsageInBytes");
                    b.length > 0 && (t.ServerStatus.HDD.recorded = XMLNodeTextContent(b[0]));
                    var C = v[0].getElementsByTagName("ExportsDiskUsageInBytes");
                    C.length > 0 && (t.ServerStatus.HDD.exports = XMLNodeTextContent(C[0]));
                    var S = v[0].getElementsByTagName("UserDiskUsageInBytes");
                    S.length > 0 && (t.ServerStatus.HDD.user = XMLNodeTextContent(S[0]));
                    var y = v[0].getElementsByTagName("OtherDiskUsageInBytes");
                    y.length > 0 && (t.ServerStatus.HDD.other = XMLNodeTextContent(y[0]));
                    var _ = v[0].getElementsByTagName("FreeSpaceInBytes");
                    _.length > 0 && (t.ServerStatus.HDD.free = XMLNodeTextContent(_[0]))
                }
            }! function (e) {
                var n = e.getElementsByTagName("Thumbnail")[0];
                if (n) return void(t.thumbnailBase64 = "data:image/jpeg;base64," + XMLNodeTextContent(n));
                var r = e.getElementsByTagName("ThumbnailJSON")[0];
                if (r) t.thumbnailJSON = XMLNodeTextContent(r)
            }(o),
            function (e) {
                var n = e.getElementsByTagName("Exports");
                if (n.length > 0) {
                    t.exports = [];
                    for (var r = n[0].getElementsByTagName("Export"), o = 0; o < r.length; o++) {
                        var i = D(r[o], {
                            numbers: ["Size", "State"],
                            dates: ["StartTime", "EndTime", "CompletedTime", "QueuedTime"]
                        });
                        t.exports.push(i)
                    }
                }
            }(o),
            function (e) {
                var n = e.getElementsByTagName("Sequences");
                if (n.length > 0) {
                    t.sequences = [];
                    for (var r = n[0].getElementsByTagName("Sequence"), o = 0; o < r.length; o++) {
                        var i = D(r[o], {
                            dates: ["StartTime", "EndTime"]
                        });
                        t.sequences.push(i)
                    }
                }
            }(o),
            function (e) {
                var n = "00000000-0000-0000-0000-000000000000";
                t.actions = [];
                var r = e.getElementsByTagName("OEHeaderGroup");
                if (0 == r.length) return;
                Array.prototype.forEach.call(r, function (e) {
                    var n = e.getElementsByTagName("OEItem");
                    Array.prototype.forEach.call(n, function (n) {
                        var r = D(n);
                        r.Type = e.getAttribute("Name"), t.actions.push(r)
                    })
                }), t.actions.sort(function (e, t) {
                    return "Outputs" == e.Type && "Events" == t.Type ? -1 : "Events" == e.Type && "Outputs" == t.Type ? 1 : e.CameraId != n && t.CameraId == n ? -1 : e.CameraId == n && t.CameraId != n ? 1 : e.Name < t.Name ? -1 : e.Name > t.Name ? 1 : 0
                })
            }(o),
            function (e) {
                var n = function (e) {
                    for (var t = [], r = e.childNodes, o = 0; o < r.length; o++)
                        if ("Item" == r[o].nodeName) {
                            var i = {};
                            if (r[o].attributes.length > 0)
                                for (var s = 0; s < r[o].attributes.length; s++) i[r[o].attributes[s].name] = k(r[o].attributes[s].value);
                            for (var s = 0; s < r[o].childNodes.length; s++)
                                if ("Properties" == r[o].childNodes[s].nodeName)
                                    for (var a = 0; a < r[o].childNodes[s].attributes.length; a++) i[r[o].childNodes[s].attributes[a].name] = k(r[o].childNodes[s].attributes[a].value);
                                else "Items" == r[o].childNodes[s].nodeName && (i.Items = n(r[o].childNodes[s]));
                            t.push(i)
                        } return t
                };
                ! function (e) {
                    for (var r = e.childNodes, o = null, i = 0; i < r.length; i++) "Items" == r[i].nodeName && (o = r[i]);
                    o && (t.items = n(o))
                }(e)
            }(o);
            var I = o.getElementsByTagName("Result")[0];
            if ("OK" != XMLNodeTextContent(I)) {
                t.isError = !0, (s = o.getElementsByTagName("ErrorString")).length > 0 && (t.errorString = XMLNodeTextContent(s[0])), (s = o.getElementsByTagName("ErrorCode")).length > 0 && (t.errorCode = parseInt(XMLNodeTextContent(s[0]))), t.error = {
                    code: t.errorCode || XPMobileSDK.library.ConnectionError.Unknown,
                    message: t.errorString || ""
                };
                var P = o.getElementsByTagName("Name");
                P.length > 0 && "CloseStream" !== XMLNodeTextContent(P[0]) && console.error("Response error " + (t.errorString || (n = t.errorCode, Object.keys(XPMobileSDK.library.ConnectionError).forEach(function (e) {
                    XPMobileSDK.library.ConnectionError[e] == n && (r = e)
                }), r)) + " " + (t.errorCode || "") + " Complete response: " + e)
            }
        }

        function D(e, t) {
            for (var n = {}, r = 0; r < e.attributes.length; r++) {
                var o = e.attributes[r];
                t && t.numbers && -1 != t.numbers.indexOf(o.name) ? n[o.name] = parseInt(o.value) : t && t.dates && -1 != t.dates.indexOf(o.name) ? n[o.name] = new Date(parseInt(o.value)) : n[o.name] = k(o.value)
            }
            return n
        }

        function k(e) {
            for (var t = ["<", ">"], n = 0, r = t.length; n < r; ++n) e = e.replace(new RegExp(t[n], "g"), "");
            return e
        }
    }, void 0 !== window.DOMParser) parseXML = function (e) {
    return (new window.DOMParser).parseFromString(e, "text/xml")
}, XMLNodeTextContent = function (e) {
    return e.textContent
};
else {
    if (void 0 === window.ActiveXObject || !new window.ActiveXObject("Microsoft.XMLDOM")) throw new Error("No XML parser found");
    parseXML = function (e) {
        var t = new window.ActiveXObject("Microsoft.XMLDOM");
        return t.async = "false", t.loadXML(e), t
    }, XMLNodeTextContent = function (e) {
        return e.text
    }
}
XPMobileSDK.library.PullConnectionObserverInterface = {
    onError: function (e) {},
    onHTTPError: function (e) {},
    onPushFailed: function () {},
    notifyChannel: function (e) {},
    notifyObservers: function (e) {},
    videoConnectionTemporaryDown: function (e) {},
    restart: function () {}
}, XPMobileSDK.library.PullConnection = function (e, t) {
    var n = {
        method: "post",
        contentType: "text/xml",
        onLoading: function (e) {
            if (c()) {
                d();
                var t = XPMobileSDKSettings.videoConnectionTimeout;
                r.ajaxRequestTimeout = setTimeout(function () {
                    e && (console.warn("aborting video request for " + r.videoId), e.onreadystatechange = function () {}, e.abort(), XPMobileSDK.library.Ajax.activeRequestCount--, f("onError", e))
                }.bind(this), t)
            }
        },
        onSuccess: function (e) {
            if (0 == e.status && (!e.response || 0 === e.response.byteLength)) return void f("onHTTPError", e);
            if (a()) {
                f("notifyChannel", !0), d();
                try {
                    var t = e.response,
                        n = new XPMobileSDK.library.VideoHeaderParser(t);
                    if (n.duration) var o = 1e3 * n.duration * .8;
                    f("notifyObservers", n), d(), r.videoConnectionState == XPMobileSDK.library.VideoConnectionState.running && (n.stream && n.stream.timeBetweenFrames ? (i = 2 * n.stream.timeBetweenFrames / 3, r.requestNextFrameInterval = i) : i ? r.requestNextFrameInterval = i : n.dataSize || r.signalType != XPMobileSDK.interfaces.VideoConnectionSignal.live ? r.requestNextFrameInterval = o || NETWORK.requestTime : r.requestNextFrameInterval = Math.min(NETWORK.MAX_REQUEST_TIME, r.requestNextFrameInterval * (c = 100 * NETWORK.REQUEST_TIME_GROW_PER_EMPTY_FRAME, l = c - 10, u = c + 10, Math.floor(Math.random() * (u - l + 1)) + l) / 100), s(r.requestNextFrameInterval)), n
                } catch (t) {
                    console.error("Exception in video connection ajax response", t), console.error(t.stack), f("onHTTPError", e)
                }
            }
            var c, l, u
        },
        onFailure: function (t) {
            console.error("ERROR in ajax request for frame for video channel " + e), f("onHTTPError", t)
        }
    };
    t.signalType;
    "undefined" != typeof ArrayBuffer && (n.responseType = "arraybuffer");
    var r = this;
    r.videoConnectionState = XPMobileSDK.library.VideoConnectionState.running;
    var o = [],
        i = 0;

    function s(t) {
        (c() || a() || l()) && function (e) {
            return !CommunicationStability.isBrokenDown() || (setTimeout(function () {
                s(e)
            }, 200), !1)
        }(t) && l() && function (t) {
            r.nextFrameTimeout = setTimeout(function () {
                u(), r.videoConnectionState != XPMobileSDK.library.VideoConnectionState.closed && (r.ajaxRequest = new XPMobileSDK.library.Ajax.Request(e, n))
            }, t || 1)
        }(t)
    }

    function a() {
        return r.videoConnectionState != XPMobileSDK.library.VideoConnectionState.closed
    }

    function c() {
        return !r.ajaxRequest
    }

    function l() {
        return !r.nextFrameTimeout
    }

    function u() {
        r.nextFrameTimeout && (clearTimeout(r.nextFrameTimeout), r.nextFrameTimeout = null)
    }

    function d() {
        r.ajaxRequestTimeout && (clearTimeout(r.ajaxRequestTimeout), r.ajaxRequestTimeout = null)
    }

    function f(e, t) {
        o.forEach(function (n) {
            n && n[e] && n[e](t)
        })
    }
    this.restartConnection = function (e) {
        try {
            if (f("videoConnectionTemporaryDown", e ? e.status : -2), r.videoConnectionState == XPMobileSDK.library.VideoConnectionState.closed) return;
            f("restart")
        } catch (e) {
            f("videoConnectionTemporaryDown", -1)
        }
    }, this.cleanupCommunication = function () {
        u(), d(), r.ajaxRequest && (4 == r.ajaxRequest.readyState && 200 == r.ajaxRequest.status || r.ajaxRequest.abort(), delete r.ajaxRequest, r.ajaxRequest = null), i = 0
    }, this.startCommunication = function (e) {
        this.cleanupCommunication(), s(e)
    }, this.videoConnectionChangedState = function (e) {
        r.videoConnectionState = e
    }, this.addObserver = function (e) {
        o.push(e)
    }, this.removeObserver = function (e) {
        var t = o.indexOf(e); - 1 != t && o.splice(t, 1)
    }
}, XPMobileSDK.library.PushConnectionObserverInterface = {
    onError: function (e) {},
    onHTTPError: function (e) {},
    onPushFailed: function () {},
    notifyChannel: function (e) {},
    notifyObservers: function (e) {},
    videoConnectionTemporaryDown: function (e) {},
    restart: function () {}
}, XPMobileSDK.library.PushConnection = function (e, t) {
    t.signalType;
    var n, r = null;
    this.videoConnectionState = XPMobileSDK.library.VideoConnectionState.notOpened;
    var o = [],
        i = null;
    this.startCommunication = function () {
        n || (i ? Date.now() - i < XPMobileSDKSettings.videoStreamRestartMinimumInterval ? setTimeout(function () {
            console.warn("Restarting socket."), s()
        }.bind(this), XPMobileSDKSettings.socketRestartMinimumInterval) : d("restart") : s())
    }.bind(this);
    var s = function () {
        try {
            n = new WebSocket(e)
        } catch (e) {
            if (this.videoConnectionState == XPMobileSDK.library.VideoConnectionState.closed) return;
            return console.error("WebSocket initialization failed. Falling back to AJAX..."), void d("onPushFailed")
        }
        n.binaryType = "arraybuffer", n.onerror = function (e) {
            d("onError", n)
        }, n.onopen = a, n.onclose = function () {
            var e = {
                readyState: n.readyState,
                status: n.status
            };
            n = null, i || (i = new Date), d("onError", e)
        }.bind(this)
    }.bind(this);
    this.restartConnection = function (e) {
        console.warn("Restarting socket."), this.startCommunication()
    }.bind(this), this.close = function () {
        n && (n.onopen = null, n.onmessage = null, n.onerror = null, n.onclose = null, n.close(), n = null, this.messageInterval && (clearInterval(this.messageInterval), this.messageInterval = null), console.log("WebSocket closed"))
    }.bind(this);
    var a = function (e) {
            n.onmessage = c, n.onerror = l, n.onclose = u, window.addEventListener("beforeunload", this.close), this.messageInterval = setInterval(function () {
                n && n.send("")
            }, NETWORK.websocketSendMessage), d("notifyChannel", !0), console.log("WebSocket open")
        }.bind(this),
        c = function (e) {
            r && (delete r, r = null), r = new XPMobileSDK.library.VideoHeaderParser(e.data), d("notifyObservers", r)
        }.bind(this),
        l = function (e) {
            console.error("WebSocket error", e), this.messageInterval && (clearInterval(this.messageInterval), this.messageInterval = null)
        }.bind(this),
        u = function (e) {
            n.onopen = null, n.onmessage = null, n.onerror = null, n.onclose = null, n = null, this.messageInterval && (clearInterval(this.messageInterval), this.messageInterval = null), this.videoConnectionState == XPMobileSDK.library.VideoConnectionState.running && XPMobileSDK.library.Connection.connectionId && (this.restartConnection(), d("videoConnectionTemporaryDown"))
        }.bind(this);
    this.cleanupCommunication = function () {
        this.close()
    }, this.videoConnectionChangedState = function (e) {
        this.videoConnectionState = e
    }, this.addObserver = function (e) {
        o.push(e)
    }, this.removeObserver = function (e) {
        var t = o.indexOf(e); - 1 != t && o.splice(t, 1)
    };
    var d = function (e, t) {
        o.forEach(function (n) {
            n && n[e] && n[e](t)
        })
    }.bind(this)
}, XPMobileSDK.library.VideoConnectionSignal = {
    live: 1,
    playback: 2
}, XPMobileSDK.library.VideoConnectionState = {
    notOpened: 0,
    running: 1,
    closed: 2,
    closing: 3
}, XPMobileSDK.library.VideoConnectionStream = {
    native: 1,
    transcoded: 3,
    FragmentedMP4: 4
}, XPMobileSDK.library.VideoConnectionObserverInterface = {
    videoConnectionReceivedFrame: function (e) {},
    videoConnectionFailed: function () {},
    videoConnectionTemporaryDown: function (e) {},
    videoConnectionRecovered: function () {},
    videoConnectionChangedState: function () {},
    videoConnectionStreamingError: function () {}
}, XPMobileSDK.library.VideoConnection = function (e, t, n) {
    if (XPMobileSDK.library.VideoConnection.instances.push(this), !n) n = {};
    n.onClose = n.onClose || function (e) {}, n.onRestart = n.onRestart || function (e) {}, n.onPushFailed = n.onPushFailed || function () {};
    var r = this,
        o = [],
        i = XPMobileSDK.library.VideoConnectionState.notOpened;
    r.request = {
        parameters: t.params,
        options: t.options
    }, r.response = {
        parameters: t.response.outputParameters
    }, r.videoId = e, r.request.options && (r.cameraId = r.request.options.cameraId, r.signalType = r.request.options.signal, r.isReusable = r.request.options.reuseConnection), r.isPush = "Push" == r.request.parameters.MethodType, r.isDirectStreaming = "FragmentedMP4" == r.request.parameters.StreamType, r.supportsPTZ = "Yes" == r.response.parameters.PTZ, r.supportsPTZPresets = "Yes" == r.response.parameters.Preset, r.supportsPlayback = "Yes" == r.response.parameters.Playback, r.supportsExport = "Yes" == r.response.parameters.ExportAvi;
    var s = null,
        a = new function (e) {
            this.connected = !1, this.current;
            for (var t, n = [], r = 0; t = e["VideoChannel" + r]; r++) n.push(g(t));
            n.length || n.push(g(XPMobileSDKSettings.MobileServerURL + XPMobileSDKSettings.videoChanel));
            console.log("Available video channels: ", n), this.getNext = function () {
                return this.connected || (this.current = n.shift()), this.current
            }.bind(this), this.hasNext = function () {
                return !this.connected && n.length
            }.bind(this), this.getNext()
        }(r.response.parameters),
        c = a.current,
        l = null;
    this.open = function () {
        switch (i) {
            case XPMobileSDK.library.VideoConnectionState.notOpened:
                p(XPMobileSDK.library.VideoConnectionState.running), window.Worker && XPMobileSDKSettings.supportsMultiThreaded ? (console.info("Opening multithreaded video connection " + r.videoId + " with Web Worker"), r.worker = new Worker("js/ThreadConnection.js"), r.worker.addEventListener("message", function (e) {
                    "onPushFailed" == e.data.message ? n.onPushFailed() : y(e.data.message, e.data.result)
                }, !1), r.worker.postMessage({
                    message: "startCommunication",
                    arguments: {
                        url: c + "/" + r.videoId + "/",
                        signalType: r.signalType,
                        isPush: r.isPush
                    }
                })) : (r.isPush ? (console.info("Opening WebSocket video connection " + r.videoId), r.communication = new XPMobileSDK.library.PushConnection(c + "/" + r.videoId + "/", {
                    signalType: r.signalType
                })) : (console.info("Opening AJAX video connection " + r.videoId), r.communication = new XPMobileSDK.library.PullConnection(c + "/" + r.videoId + "/", {
                    signalType: r.signalType
                })), r.communication.addObserver({
                    onError: C,
                    onHTTPError: b,
                    onPushFailed: v,
                    notifyChannel: h,
                    notifyObservers: f,
                    videoConnectionTemporaryDown: S,
                    restart: r.restart
                }), r.addObserver(r.communication), r.communication.startCommunication()), y("videoConnectionChangedState", i), i == XPMobileSDK.library.VideoConnectionState.running && u();
                break;
            case XPMobileSDK.library.VideoConnectionState.running:
                r.isReusable ? console.info("Opening a reusable video connection from the pool " + r.videoId) : console.warn("WARNING: Attempting to open a running connection!"), u();
                break;
            case XPMobileSDK.library.VideoConnectionState.closed:
                console.warn("WARNING: Attempting to re-open a closed connection!"), d()
        }
    };
    var u = function () {
            l && clearTimeout(l), l = setTimeout(function () {
                y("noVideoTimeout")
            }, XPMobileSDKSettings.NoVideoTimeout)
        },
        d = function () {
            l && clearTimeout(l)
        };

    function f(e) {
        if (e.stream && e.stream.error) switch (e.stream.error) {
            case XPMobileSDK.library.ItemHeaderParser.Error.NonFatal:
                r.request.parameters.StreamType = "Transcoded", r.restart();
                break;
            case XPMobileSDK.library.ItemHeaderParser.Error.Fatal:
                y("videoConnectionStreamingError"), r.close()
        } else {
            if (!(o.length > 0)) return console.warn("Video connection received an item but doesn't have observer to send it to!"), void r.close();
            y("videoConnectionReceivedFrame", e), u(), r.wasConnectionDown && (r.wasConnectionDown = !1, y("videoConnectionRecovered"))
        }
    }

    function h(e) {
        a.connected = e
    }

    function m() {
        y("cleanupCommunication"), r.worker && XPMobileSDKSettings.supportsMultiThreaded && (r.worker.terminate(), r.worker = null)
    }

    function g(e) {
        /^(http|ws)(s)?:/i.test(e) || (e = window.location.protocol + "//" + document.location.hostname + (document.location.port && !/^:\d+/.test(e) ? ":" + document.location.port : "") + e);
        return r.isPush ? e.replace(/^http(s)?:/i, "ws$1:") : e.replace(/^ws(s)?:/i, "http$1:")
    }

    function p(e) {
        i != e && y("videoConnectionChangedState", i = e)
    }

    function v() {
        n.onPushFailed()
    }

    function b(e) {
        a.connected && CommunicationStability.addVideoBreakDown(), C(e)
    }

    function C(e) {
        if (i != XPMobileSDK.library.VideoConnectionState.closed && null != XPMobileSDK.library.Connection.connectionId) {
            if (a.connected)
                if (e.status) {
                    if (410 == e.status) return void y("restartConnection", e);
                    S(e.status)
                } else e.readyState && e.readyState == WebSocket.CLOSED || 0 != e.status || e.response && 0 !== e.response.byteLength || S(e.status);
            else {
                if (!a.hasNext()) return void y("videoConnectionNotAvailable");
                console.log("Try next video channel."), c = a.getNext()
            }
            y("startCommunication", NETWORK.requestTimeOnFailure)
        }
    }

    function S(e) {
        r.wasConnectionDown = !0, y("videoConnectionTemporaryDown", e)
    }

    function y(e, t) {
        o.forEach(function (n) {
            n && n[e] && n[e](t), r.worker && r.worker.postMessage({
                message: e,
                arguments: t
            })
        })
    }
    this.restart = function () {
        i != XPMobileSDK.library.VideoConnectionState.closed && (console.warn("Restarting video connection " + r.videoId + " for camera " + r.cameraId), p(XPMobileSDK.library.VideoConnectionState.closed), n.onRestart(r), m())
    }, this.close = function () {
        d(), i != XPMobileSDK.library.VideoConnectionState.closed && i != XPMobileSDK.library.VideoConnectionState.closing && (p(XPMobileSDK.library.VideoConnectionState.closing), r.worker && XPMobileSDKSettings.supportsMultiThreaded && r.worker.terminate(), console.log("Closing video connection " + r.videoId + " for camera " + r.cameraId), p(XPMobileSDK.library.VideoConnectionState.closed), n.onClose(r), m())
    }, this.addObserver = function (e) {
        o.push(e)
    }, this.removeObserver = function (e) {
        var t = o.indexOf(e); - 1 != t && o.splice(t, 1)
    }, this.resetCommunication = function () {
        y("startCommunication")
    }, this.destroy = function () {
        r.close(), s && (s.destroy(), s = null), o = [], r.isPush || (onAjaxComplete = null, onAjaxFailure = null, onAjaxLoading = null, frameRequestParams = null, -1 != XPMobileSDK.library.VideoConnection.indexOf(this) && XPMobileSDK.library.VideoConnection.splice(XPMobileSDK.library.VideoConnection.indexOf(this), 1))
    }, this.getState = function () {
        return i
    }
}, XPMobileSDK.library.VideoConnection.instances = [];
let VideoStreamState = {
    new: 0,
    open: 1,
    closed: 2
};
class VideoStream {
    constructor(e, t, n) {
        this.videoConnectionElement = document.createElement("video-connection"), this.videoConnectionElement.videoId = this.videoId = e, this.videoConnectionElement.location = XPMobileSDKSettings.MobileServerURL + XPMobileSDKSettings.videoChanel, this.videoConnectionElement.addEventListener("onReceivedFrame", this.onReceivedFrame.bind(this));
        let r = document.getElementsByTagName("videos-video-connection-manager")[0];
        r && r.appendChild(this.videoConnectionElement), this.request = {
            parameters: t.params,
            options: t.options
        }, this.response = {
            parameters: t.response.outputParameters
        }, this.request.options && (this.cameraId = this.request.options.cameraId, this.signalType = this.request.options.signal, this.isReusable = this.request.options.reuseConnection), this.isPush = "Push" == this.request.parameters.MethodType, this.isDirectStreaming = "FragmentedMP4" == this.request.parameters.StreamType, this.supportsPTZ = "Yes" == this.response.parameters.PTZ, this.supportsPTZPresets = "Yes" == this.response.parameters.Preset, this.supportsPlayback = "Yes" == this.response.parameters.Playback, this.supportsExport = "Yes" == this.response.parameters.ExportAvi, this.callbacks = n || {}, this.callbacks.onClose = this.callbacks.onClose || function (e) {}, this.callbacks.onRestart = this.callbacks.onRestart || function (e) {}, this.callbacks.onPushFailed = this.callbacks.onPushFailed || function () {}, this.observers = [], this.state = VideoStreamState.new
    }
    open() {
        this.state !== VideoStreamState.closed && (this.videoConnectionElement.dispatchEvent(new CustomEvent("start")), this.state = VideoStreamState.closed)
    }
    close() {
        let e = document.getElementsByTagName("videos-video-connection-manager")[0];
        e && e.contains(this.videoConnectionElement) && e.removeChild(this.videoConnectionElement), this.videoConnectionElement.dispatchEvent(new CustomEvent("destroy")), XPMobileSDK.closeStream(this.videoId), this.state = VideoStreamState.close
    }
    onReceivedFrame(e) {
        if (!(this.observers.length > 0)) return console.warn("Video connection received an item but doesn't have observer to send it to!"), void this.close();
        this.callMethodOnObservers("videoConnectionReceivedFrame", e.detail.frame)
    }
    addObserver(e) {
        this.observers.push(e)
    }
    removeObserver(e) {
        let t = this.observers.indexOf(e); - 1 != t && this.observers.splice(t, 1)
    }
    callMethodOnObservers(e, t) {
        this.observers.forEach(function (n) {
            n && n[e] && n[e](t)
        })
    }
}! function (e) {
    var t = function (e) {
        var n = this,
            r = 0,
            o = function (e) {
                return e
            },
            i = function (e) {
                return Array.prototype.reverse.call(e)
            };

        function s(e) {
            r += e
        }

        function a(t) {
            var n = new Uint8Array(e, r, t),
                o = 0;
            r += t;
            for (var i = 0; i < t; i++) o += n[i] * Math.pow(2, 8 * i);
            return o
        }

        function c(e) {
            var t = "",
                n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
            return t += n[(240 & e) >> 4], t += n[15 & e]
        }

        function l(t, n) {
            for (var o = n(new Uint8Array(e, r, t)), i = "", s = 0; s < t; s++) i += c(o[s]);
            return r += t, i
        }

        function u(e) {
            return l(e, o)
        }

        function d(e) {
            return l(e, i)
        }

        function f() {
            var e = "";
            return e += d(4), e += "-", e += d(2), e += "-", e += d(2), e += "-", e += u(2), e += "-", e += u(6)
        }
        n.readBytes = a, n.skipBytes = s, n.getGUID = f, n.parseSizeInformation = function () {
            n.sizeInfo = {
                sourceSize: {},
                sourceCrop: {},
                destinationSize: {}
            }, n.sizeInfo.sourceSize.width = a(4), n.sizeInfo.sourceSize.height = a(4), n.sizeInfo.sourceCrop.left = a(4), n.sizeInfo.sourceCrop.top = a(4), n.sizeInfo.sourceCrop.right = a(4), n.sizeInfo.sourceCrop.bottom = a(4), n.sizeInfo.sourceCrop.width = n.sizeInfo.sourceCrop.right - n.sizeInfo.sourceCrop.left, n.sizeInfo.sourceCrop.height = n.sizeInfo.sourceCrop.bottom - n.sizeInfo.sourceCrop.top, n.sizeInfo.destinationSize.width = a(4), n.sizeInfo.destinationSize.height = a(4), n.sizeInfo.destinationSize.resampling = a(4), n.sizeInfo.destinationSize.top = a(4), n.sizeInfo.destinationSize.right = a(4), n.sizeInfo.destinationSize.bottom = a(4)
        }, n.parseLiveInformation = function () {
            n.currentLiveEvents = a(4), n.changedLiveEvents = a(4)
        }, n.parsePlaybackInformation = function () {
            n.currentPlaybackEvents = a(4), n.changedPlaybackEvents = a(4)
        }, n.parseStreamInfo = function () {
            n.stream = {}, n.stream.headerSize = a(4), n.stream.headerVesion = a(4), n.stream.reserved = a(4), n.stream.validFields = a(4), n.stream.timeBetweenFrames = a(4), n.stream.dataType = function (e, t) {
                for (var n = [], r = 0; r < e; r++) n.push(String.fromCharCode(a(1)));
                return t ? n.reverse().join("") : n.join("")
            }(4, !0), n.stream.flags = a(4), n.stream.profile = a(4), n.stream.level = a(4), n.stream.compatibility = a(4), n.stream.constrains = a(8), n.stream.frameCount = a(4), n.stream.hasKeyFrame = (n.stream.flags & t.StreamInfoFlags.HasKeyFrame) === t.StreamInfoFlags.HasKeyFrame
        }, n.retrieveData = function () {
            n.data = new Uint8Array(e, n.headerSize, n.dataSize)
        }, n.parseDynamicInformation = function () {
            var e;
            s(8), e = a(4), a(4) == t.DynamicInfoDataType.HeaderTypeDeviceStateInfo && function (e) {
                var t, r;
                n.errorCodes = [];
                for (var o = 0; o < e; o++) r = f(), t = a(8), n.errorCodes.push({
                    code: t,
                    guid: r
                })
            }(e)
        }
    };
    t.Type = {}, t.Type.Frame = 1, t.Type.Fragment = 2, t.Error = {}, t.Error.NonFatal = 1, t.Error.Fatal = 2, t.MainHeaderLength = 36, t.SizeInfoHeaderLength = 32, t.LiveInfoHeaderLength = 8, t.PlaybackInfoHeaderLength = 8, t.HeaderExtensionSize = 1, t.HeaderExtensionLiveEvents = 2, t.HeaderExtensionPlaybackEvents = 4, t.HeaderExtensionNative = 8, t.HeaderExtensionMotionEvents = 16, t.HeaderExtensionLocationInfo = 32, t.HeaderExtensionStreamInfo = 64, t.HeaderExtensionCarouselInfo = 128, t.HeaderExtensionDynamicInfo = 256, t.LiveFlags = {}, t.LiveFlags.LiveFeed = 1, t.LiveFlags.Motion = 2, t.LiveFlags.Recording = 4, t.LiveFlags.Notification = 8, t.LiveFlags.CameraConnectionLost = 16, t.LiveFlags.DatabaseFail = 32, t.LiveFlags.DiskFull = 64, t.LiveFlags.ClientLiveStopped = 128, t.PlaybackFlags = {}, t.PlaybackFlags.Stopped = 1, t.PlaybackFlags.Forward = 2, t.PlaybackFlags.Backward = 4, t.PlaybackFlags.DatabaseStart = 16, t.PlaybackFlags.DatabaseEnd = 32, t.PlaybackFlags.DatabaseError = 64, t.DynamicInfoDataType = {}, t.DynamicInfoDataType.HeaderTypeDeviceStateInfo = 0, t.StreamInfoFlags = {}, t.StreamInfoFlags.HasKeyFrame = 1, XPMobileSDK.library.ItemHeaderParser = t
}(), XPMobileSDK.library.VideoHeaderParser = function (e) {
    var t = this;
    XPMobileSDK.library.ItemHeaderParser.call(t, e), t.parseMotionInformation = function () {
            t.motionHeaderSize = readBytes(4), t.motionAmount = readBytes(4)
        }, t.convertToImage = function () {
            t.type = XPMobileSDK.library.ItemHeaderParser.Type.Frame, t.blob = new Blob([t.data], {
                type: "image/jpeg"
            })
        }, t.parseCarouselInfo = function () {
            t.carousel = {}, t.carousel.headerSize = readBytes(4), t.carousel.headerVesion = readBytes(4), t.carousel.itemId = getGUID()
        },
        function () {
            t.uuid = t.getGUID(), t.timestamp = new Date(t.readBytes(8)), t.frameNumber = t.readBytes(4), t.dataSize = t.readBytes(4), t.headerSize = t.readBytes(2);
            var e = t.readBytes(2);
            t.hasSizeInformation = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionSize, t.hasLiveInformation = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionLiveEvents, t.hasPlaybackInformation = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionPlaybackEvents, t.hasNativeData = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionNative, t.hasMotionInformation = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionMotionEvents, t.hasLocationData = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionLocationInfo, t.hasStreamInfo = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionStreamInfo, t.hasCarouselInfo = e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionCarouselInfo, t.hasSizeInformation && t.parseSizeInformation(), t.hasLiveInformation && t.parseLiveInformation(), t.hasPlaybackInformation && t.parsePlaybackInformation(), t.hasNativeData && t.readBytes(readBytes(4)), t.hasMotionInformation && t.parseMotionInformation(), t.hasLocationData && t.readBytes(readBytes(4)), t.hasStreamInfo && t.parseStreamInfo(), t.hasCarouselInfo && t.parseCarouselInfo()
        }(),
        function () {
            if (!(t.dataSize <= 0))
                if (t.retrieveData(), t.stream) switch (t.stream.dataType) {
                    case "JPEG":
                        t.convertToImage()
                } else t.convertToImage()
        }()
}, XPMobileSDK.library.AudioHeaderParser = function (e) {
    var t = this;
    XPMobileSDK.library.ItemHeaderParser.call(t, e),
        function () {
            t.uuid = t.getGUID(), t.skipBytes(18);
            var e = t.readBytes(2);
            t.skipBytes(4), e & XPMobileSDK.library.ItemHeaderParser.HeaderExtensionDynamicInfo && t.parseDynamicInformation()
        }()
}, XPMobileSDK.library.VideoConnectionPool = new function () {
    var e = function (e, t) {
        this.id = e, this.videoConnection = t, this.response = void 0, this.count = 1, this.pendingCallbacks = []
    };
    this.cameras = [], this.containsCameraByVideoId = function (e, t) {
        return this.cameras.some(n => n.id === e && n.videoConnection && n.videoConnection.videoId === t)
    }, this.addCamera = function (t, n) {
        this.cameras.push(new e(t, n))
    }, this.removeCamera = function (e, t) {
        var n = this.cameras.findIndex(n => n.id == e && n.videoConnection && n.videoConnection.videoId == t);
        this.cameras.splice(n, 1)
    }, this.clear = function () {
        this.cameras = []
    }, this.getCameraByVideoId = function (e, t) {
        return this.cameras.find(n => n.id === e && n.videoConnection && n.videoConnection.videoId == t)
    }.bind(this)
}, XPMobileSDK.library.VideoPushConnection = function (e, t, n) {
    this.open = function (e, t) {
        if (l.onStreamSuccess = e || l.onStreamSuccess, l.onStreamError = t || l.onStreamError, f()) return;
        o = XPMobileSDK.requestPushStream(d)
    }, this.close = u, this.send = function (e) {
        var t = XPMobileSDK.library.Bytes.fromBase64(e),
            n = new ArrayBuffer(a + t.length),
            o = new Uint8Array(n);
        o.set(XPMobileSDK.library.Bytes.fromGuid(r.videoId, 16)), o.set(XPMobileSDK.library.Bytes.fromInt((new Date).getTime(), 8), 16), o.set(XPMobileSDK.library.Bytes.fromInt(++c, 4), 24), o.set(XPMobileSDK.library.Bytes.fromInt(t.length, 4), 28), o.set(XPMobileSDK.library.Bytes.fromInt(a, 2), 32), o.set(XPMobileSDK.library.Bytes.fromInt(0, 2), 34), o.set(t, a);
        var i = XPMobileSDKSettings.MobileServerURL + XPMobileSDKSettings.videoChanel + "/" + r.videoId + "/",
            s = {
                method: "post",
                contentType: "arraybuffer",
                postBody: n,
                onLoading: h,
                onSuccess: m,
                onFailure: g
            };
        new XPMobileSDK.library.Ajax.Request(i, s)
    }, this.destroy = function () {
        if (u(), !i) return;
        i.getTracks().forEach(function (e) {
            e.stop()
        }), i = null
    }, this.isOpen = f, this.getMediaStream = function () {
        return i
    };
    var r, o, i, s = this,
        a = 36,
        c = 0,
        l = {
            onSuccess: function (e) {},
            onError: function (e) {},
            onStreamSuccess: function (e) {},
            onStreamError: function (e) {}
        };

    function u() {
        f() && (o && (XPMobileSDK.cancelRequest(o), o = null), r && (XPMobileSDK.closeStream(r.videoId), r = null))
    }

    function d(e, t) {
        o = null, e ? (r = e, l.onStreamSuccess(s)) : l.onStreamError(t)
    }

    function f() {
        return r || o
    }

    function h(e) {}

    function m(e) {}

    function g(e) {
        console.error("ERROR in ajax request for video push with videoId " + r.videoId)
    }! function () {
        if (l.onSuccess = e || l.onSuccess, l.onError = t || l.onError, n) return void l.onSuccess(s);
        navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({
            video: !0,
            audio: !1
        }).then(r).catch(o) : (navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, navigator.getUserMedia ? navigator.getUserMedia({
            video: !0,
            audio: !1
        }, r, o) : console.warn("Video push not supported!"));

        function r(e) {
            i = e, l.onSuccess(s)
        }

        function o(e) {
            console.error(e.name), l.onError(e)
        }
    }()
}, XPMobileSDK.library.AudioPushConnection = function (e, t, n, r) {
    this.open = function (n, r, o) {
        if (l.onStreamSuccess = n || l.onStreamSuccess, l.onStreamError = r || l.onStreamError, h()) return;
        var s = {
            AudioSamplingRate: t || 8e3,
            AudioBitsPerSample: 16
        };
        i = XPMobileSDK.requestAudioStreamIn(e, s, d, f)
    }, this.close = u, this.send = function (e) {
        var t = new ArrayBuffer(a + e.length),
            n = new Int8Array(t);
        n.set(XPMobileSDK.library.Bytes.fromGuid(o.StreamId, 16)), n.set(XPMobileSDK.library.Bytes.fromInt((new Date).getTime(), 8), 16), n.set(XPMobileSDK.library.Bytes.fromInt(++c, 4), 24), n.set(XPMobileSDK.library.Bytes.fromInt(e.length, 4), 28), n.set(XPMobileSDK.library.Bytes.fromInt(a, 2), 32), n.set(XPMobileSDK.library.Bytes.fromInt(0, 2), 34), n.set(e, a);
        var r = XPMobileSDKSettings.MobileServerURL + XPMobileSDKSettings.audioChannel + "/" + o.StreamId,
            i = {
                method: "post",
                "Transfer-Encoding": "chunked",
                contentType: "arraybuffer",
                postBody: t,
                timeout: 2e3,
                responseType: "arraybuffer",
                onLoading: l.onAjaxLoading,
                onSuccess: l.onAjaxSuccess,
                onFailure: l.onAjaxFailure,
                onTimeout: l.onAjaxFailure
            };
        new XPMobileSDK.library.Ajax.Request(r, i)
    }, this.destroy = function () {
        u()
    }, this.isOpen = h;
    var o, i, s = this,
        a = 36,
        c = 0,
        l = {
            onStreamSuccess: function (e) {},
            onStreamError: function (e) {},
            onAjaxLoading: function () {},
            onAjaxSuccess: function (e) {},
            onAjaxFailure: function () {
                console.error("ERROR in ajax request for audio push")
            }
        };

    function u() {
        h() && (i && (XPMobileSDK.cancelRequest(i), i = null), o && (XPMobileSDK.closeStream(o.StreamId), o = null))
    }

    function d(e, t) {
        i = null, e ? (o = e, l.onStreamSuccess(s)) : l.onStreamError(t)
    }

    function f(e) {
        i = null, o = null, l.onStreamError(e)
    }

    function h() {
        return o || i
    }
    l.onAjaxSuccess = n || l.onAjaxSuccess, l.onAjaxFailure = r || l.onAjaxFailure
};
//# sourceMappingURL=../maps/XPMobileSDK.library.js.map
