// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../game/static/scripts/ship.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function makeShot(shipobj) {
  var spec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  function shootOne(shipobj, shot, angle, speed_scale, extra_speed) {
    var invertY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var bod = shipobj.body;
    shot.setScale(0.7);
    shot.setActive(true);
    shot.setVisible(true);
    var x_vel = Math.cos(shipobj.rotation + angle) * extra_speed;
    var y_vel = sin(shipobj.rotation + angle) * extra_speed;
    shot.setVelocityX(bod.velocity.x * speed_scale - x_vel);
    shot.setVelocityY(bod.velocity.y * speed_scale - y_vel);

    if (invertY) {
      shot.setVelocityX(shot.body.velocity.x * -1);
      shot.setVelocityY(shot.body.velocity.y * -1);
    }

    shot.setDepth(-1);
    shot.shooter = shipobj.texture.key;
  }

  var shots = badshots;

  if (shipobj.texture.key === 'player1' || shipobj.texture.key === 'player2') {
    shots = goodshots;
  }

  var bod = shipobj.body;

  if (shipobj.active && shipobj.visible) {
    if (!spec) {
      var shot = shots.get(bod.position.x + shipobj.width / 2, bod.position.y + shipobj.height / 2);

      if (shot) {
        shootOne(shipobj, shot, pi / 2, 0.3, 600);
      }
    } else {
      var vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

      for (var _i = 0, _vals = vals; _i < _vals.length; _i++) {
        var val = _vals[_i];

        var _shot = shots.get(bod.position.x + shipobj.width / 2, bod.position.y + shipobj.height / 2);

        if (_shot) {
          shootOne(shipobj, _shot, (val - 0.5) * (pi / 16), 0.1, 100, true);
        }
      }
    }
  }
}

function pointsTo(angle, x1, y1, x2, y2) {
  var inaccuracy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.5;
  var dir = pmath.Angle.Between(x1, y1, x2, y2);
  min = pmath.Angle.Normalize(angle - inaccuracy);
  max = pmath.Angle.Normalize(angle + inaccuracy);
  dir = pmath.Angle.Normalize(dir);

  if (max - min < 0) {
    var temp = min;
    min = max;
    max = min;
  }

  if (min < dir && max > dir) {
    return true;
  }

  return false;
}

function rotateToPoint(ship, x, y, amt) {
  var target = pmath.Angle.Between(ship.ph.body.position.x, ship.ph.body.position.y, x, y);
  var next = pmath.Angle.RotateTo(ship.ph.rotation, target, amt);
  ship.ph.setRotation(next + pi / 2);
  ship.ph.setAngle(180 / pi * (next + pi / 2));
}

function moveToPoint(ship, x, y, amt, max, rotamt) {
  rotateToPoint(ship, x, y, rotamt);
  ship.move(amt, 0, max, false);
}

function ai1(shot, spec, up, down, right, left) {
  //lazy binding allows 'this' to refer to the enemy ships when used as their update method.
  var phase = (Date.now() - this.createTime + this.nonceTime) / 500; //this.ph.setVelocityY(200);
  //this.ph.setVelocityX(Math.cos(phase) * 200);

  this.rotate(sin(phase - pi / 4));
  this.move(10, 3, 200, false);
  var shs = ships;

  if (demoMode) {
    shs = [demoShip];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = shs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      sh = _step.value;

      if (sh.ph.active && sh.ph.visible) {
        if (pointsTo(this.ph.rotation - pi / 2, this.ph.body.position.x, this.ph.body.position.y, sh.ph.body.position.x, sh.ph.body.position.y, 0.1)) {
          if (pmath.Between(0, 20000) < 300) {
            this.shoot(false);
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function ai2(shot, spec, up, down, right, left) {
  if (this.targetShip === undefined || this.targetShip.ph.active === false) {
    this.targetShip = ships[Math.floor(Math.random(2))];

    if (this.targetShip === undefined) {
      this.targetShip = {
        "ph": {
          "active": false
        }
      };
    }

    return;
  }

  var xdist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
  var ydist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
  var dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
  rotateToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 60);

  if (dist > 100) {
    moveToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 2, 120, 60);

    if (pmath.Between(0, 6000) > 5990) {
      this.shoot(false);
    }
  } else if (dist < 80) {
    this.move(5, 0, 100, true);
  }
}

function ai3(shot, spec, up, down, right, left) {
  if (this.ph.body.position.x === this.ptx && this.ph.body.position.y === this.pty) {
    this.ptx = pmath.Between(100, 700);
    this.pty = pmath.Between(100, 500);
  }

  moveToPoint(this, this.ptx, this.pty, 5, 400, 10);
}

function ai4(shot, spec, up, down, right, left) {
  var xdist = this.targetShip.ph.body.position.x - this.ph.body.position.x;
  var ydist = this.targetShip.ph.body.position.y - this.ph.body.position.y;
  var dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
  var off = offscreen(this.ph.body.position.x, this.ph.body.position.y);

  if (this.targetShip.ph.active === false) {
    this.targetShip = ships[Math.floor(Math.random(2))];
    return;
  }

  if ((dist < 300 || off) && this.ptx == null && this.pty == null) {
    this.ptx = pmath.Between(100, 700);
    this.pty = pmath.Between(100, 500);
  }

  if (dist < 300 || off) {
    var thisx = this.ph.body.position.x;
    var thisy = this.ph.body.position.y;

    var _xdist = Math.abs(thisx - this.ptx);

    var _ydist = Math.abs(thisy - this.pty);

    if (_xdist < 30 && _ydist < 30) {
      this.ptx = pmath.Between(100, 700);
      this.pty = pmath.Between(100, 500);
    }

    moveToPoint(this, this.ptx, this.pty, 20, 300, 10);
  } else {
    this.ptx = null;
    this.pty = null;
    rotateToPoint(this, this.targetShip.ph.body.position.x, this.targetShip.ph.body.position.y, 10);
    this.move(3, 2, 20, false);

    if (pmath.Between(0, 6000) > 5990) {
      this.shoot(false);
    }
  }
}

function ai5(shot, spec, up, down, right, left) {
  if (this.targetShip.ph.active === false) {
    this.targetShip = ships[Math.floor(Math.random(2))];
    return;
  }

  if (this.ptx && this.pty) {
    moveToPoint(this, this.ptx, this.pty, 10, 400, 10);
  }

  var thisx = this.ph.body.position.x;
  var thisy = this.ph.body.position.y;
  var xdist = Math.abs(thisx - this.ptx);
  var ydist = Math.abs(thisy - this.pty);

  if (xdist < 30 && ydist < 30) {
    this.ptx = false;
    this.pty = false;
  }

  xdist = Math.abs(thisx - this.targetShip.ph.body.position.x);
  ydist = Math.abs(thisy - this.targetShip.ph.body.position.y);

  if (xdist > 300 && ydist > 300) {
    var _xdist2 = pmath.Between(-100, -50);

    if (this.targetShip.ph.body.position.x - this.ptx < 0) {
      _xdist2 = pmath.Between(50, 100);
    }

    this.ptx = this.targetShip.ph.body.position.x + _xdist2;
    this.pty = this.targetShip.ph.body.position.y;
  }

  if (!this.ptx || !this.pty) {
    rotateToPoint(this, this.targetShip.ph.body.x, this.targetShip.ph.body.y, 10);
    this.move(3, 0, 200, true);
    this.burst = this.burst || 10;

    if (this.burst < 10) {
      this.shoot(false);
      this.burst = this.burst + 1;
    }

    if (pmath.Between(0, 100000) < 300) {
      this.burst = 1;
    }
  }
}

var Ship = /*#__PURE__*/function () {
  function Ship(phship, x, y, scale, rot) {
    _classCallCheck(this, Ship);

    this.ph = phship;
    this.scale = scale;
    this.vel_max = 500;
    this.shotspeed = 1000;
    this.rotate(rot);
  }

  _createClass(Ship, [{
    key: "update",
    value: function update(fire, spec) {
      var up = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var down = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var right = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var left = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var acc = 10;
      var dec = 3;

      if (down) {
        this.move(acc, dec, this.vel_max, true);
      } else if (up) {
        this.move(acc, dec, this.vel_max, false);
      }

      if (left) {
        this.rotate(-5);
      } else if (right) {
        this.rotate(5);
      }

      if (fire || spec) {
        this.shoot(spec);
      }
    }
  }, {
    key: "move",
    value: function move() {
      var acc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var dec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var max_vel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.vel_max;
      var back = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // move forward or backwards (and decelerate)
      var ang = this.ph.rotation;
      var xacc = Math.cos(ang + Math.PI / 2) * acc;
      var yacc = Math.sin(ang + Math.PI / 2) * acc;
      var x_max = Math.cos(ang + Math.PI / 2) * max_vel;
      var y_max = Math.sin(ang + Math.PI / 2) * max_vel;

      if (back) {
        this.accel(xacc, yacc, max_vel);
      } else {
        this.accel(-xacc, -yacc, max_vel);
      }

      this.decel(dec);
    }
  }, {
    key: "accel",
    value: function accel(x, y, max) {
      var x_vel = this.ph.body.velocity.x + x + 0.000001;
      var y_vel = this.ph.body.velocity.y + y + 0.000001;
      var x_max = x_vel * max / Math.sqrt(Math.pow(x_vel, 2) + Math.pow(y_vel, 2));
      var y_max = y_vel * max / Math.sqrt(Math.pow(x_vel, 2) + Math.pow(y_vel, 2));

      if (Math.abs(x_max) < Math.abs(x_vel)) {
        x_vel = x_max;
      }

      if (Math.abs(y_max) < Math.abs(y_vel)) {
        y_vel = y_max;
      }

      this.ph.setVelocityX(x_vel);
      this.ph.setVelocityY(y_vel);
    }
  }, {
    key: "decel",
    value: function decel(amt) {
      var xvel = this.ph.body.velocity.x;
      var yvel = this.ph.body.velocity.y;
      var xvel1 = Math.abs(xvel) + 0.00001;
      var yvel1 = Math.abs(yvel) + 0.00001;
      var z = Math.sqrt(Math.pow(xvel1, 2) + Math.pow(yvel1, 2));
      var z2 = Math.max(z - amt, 0);
      var x2 = z2 * xvel / z;
      var y2 = z2 * yvel / z;
      var xfunc = Math.max;
      var yfunc = Math.max;

      if (xvel < 0) {
        xfunc = Math.min;
      }

      if (yvel < 0) {
        yfunc = Math.min;
      }

      xvel = xfunc(x2, 0);
      yvel = yfunc(y2, 0);
      this.ph.setVelocityX(xvel);
      this.ph.setVelocityY(yvel);
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var newangle = this.ph.angle + angle;

      if (newangle > 180) {
        newangle = newangle - 360;
      }

      if (newangle < -180) {
        newangle = newangle + 360;
      }

      this.ph.setAngle(newangle);
      newangle = newangle / 180 * Math.PI; //radian conversion

      this.ph.setRotation(newangle);
    }
  }, {
    key: "scale",
    value: function scale(_scale) {}
  }, {
    key: "shoot",
    value: function shoot() {
      var spec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!spec) {
        makeShot(this.ph);
      } else {
        makeShot(this.ph, spec);
      }
    }
  }]);

  return Ship;
}();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38797" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../../game/static/scripts/ship.js"], null)
//# sourceMappingURL=/ship.b7ea6d19.js.map