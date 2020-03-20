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
})({"../../game/static/scripts/title.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var demoShip = null;
var demoBadShips;
var demoEnemies = [];
var demoMode;
var title;
var topScore = 0;
var scoreText = '';

var TitleScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(TitleScene, _Phaser$Scene);

  _createClass(TitleScene, [{
    key: "bulletHit",
    value: function bulletHit(ship, shot) {
      var blast = blasts.get(shot.body.position.x, shot.body.position.y);
      blast.setActive(true);
      blast.setVisible(true);
      blast.play('blast');
      shot.setPosition(-100, -100);
      shot.setVelocity(0, 0);
      shot.setActive(false);
      shot.setVisible(false);
      ship.setPosition(-200, 0);
      ship.setVelocity(0, 0);
      ship.setActive(false);
      ship.setVisible(false);
      setTimeout(function () {
        blast.setActive(false);
        blast.setVisible(false);
        blast.setPosition(-100, -100);
      }, 1000);

      if (ship.texture.key == 'player1' || ship.texture.key == 'player2' && two_player) {
        setTimeout(function () {
          ship.setActive(true);
          ship.setVisible(true);
          ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
          ship.setVelocity(0, 0);
        }, 1000);
      }
    }
  }]);

  function TitleScene() {
    _classCallCheck(this, TitleScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(TitleScene).call(this, 'TitleScene'));
  }

  _createClass(TitleScene, [{
    key: "preload",
    value: function preload() {
      this.load.image('sky', 'static/assets/images/starbgv.png');
      this.load.image('player1', 'static/assets/images/blueship.png');
      this.load.image('player2', 'static/assets/images/blueship2.png');
      this.load.image('player3', 'static/assets/images/orangeship.png');
      this.load.atlas('shapes', 'static/assets/images/shapes.png', 'static/assets/images/shapes.json');
      this.load.text('space_dirt', 'static/assets/images/space_dirt.json');
      this.load.image('goodshot', 'static/assets/images/goodshot.png');
      this.load.image('badshot', 'static/assets/images/badshot.png');
      this.load.image('blast1', 'static/assets/images/blast1.png');
      this.load.image('blast2', 'static/assets/images/blast2.png');
      this.load.image('blast3', 'static/assets/images/blast3.png');
      this.load.image('blast4', 'static/assets/images/blast4.png');
      this.load.image('blast5', 'static/assets/images/blast5.png');
      this.load.image('blast6', 'static/assets/images/blast6.png');
      this.load.image('title', 'static/assets/images/RocketTitle.png');
      this.load.image('null', 'static/assets/images/null.png');
    }
  }, {
    key: "create",
    value: function create() {
      demoMode = true;
      sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
      sky.setDepth(-999);
      scoreText = this.add.text(16, 16, 'High Score: ' + topScore.toString(), {
        fontSize: '32px',
        fill: '#a66f3c'
      });
      title = this.add.tileSprite(400, 300, 800, 600, 'title');
      title.setDepth(999); //dirt1 = this.add.particles('shapes',  new Function('return ' + this.cache.text.get('space_dirt'))());
      //dirt1.setDepth(-999);

      var ship = this.physics.add.sprite(100, 500, 'player1');
      ship.setBounce(0.2);
      ship.setCollideWorldBounds(true);
      demoShip = ship;
      demoShip = new Ship(demoShip, 100, 500, 1, 0);
      demoShip.update = ai2;
      this.anims.create({
        key: 'blast',
        frames: [{
          key: 'blast1'
        }, {
          key: 'blast2'
        }, {
          key: 'blast3'
        }, {
          key: 'blast4'
        }, {
          key: 'blast5'
        }, {
          key: 'blast6'
        }, {
          key: 'null'
        }]
      });
      blasts = this.physics.add.group({
        defaultKey: 'blast1',
        maxSize: 200
      });
      goodshots = this.physics.add.group({
        defaultKey: 'goodshot',
        maxSize: 200
      });
      badshots = this.physics.add.group({
        defaultKey: 'badshot',
        maxSize: 200
      });
      demoBadShips = this.physics.add.group({
        defaultKey: 'player3',
        maxSize: 20
      });
      this.physics.add.collider(demoShip.ph, badshots, this.bulletHit, null, this); //enemy spawn timer

      this.time.addEvent({
        delay: 500,
        callback: function callback() {
          if (demoMode) {
            var randx = pmath.Between(200, 600);

            var _ship = demoBadShips.get(randx, -100); //this.physics.add.sprite(pmath.Between(0, 800), -100, 'player3');


            _ship.setBounce(0.6);

            _ship.setAngle(180);

            _ship.setRotation(pi);

            if (_ship.casing === undefined) {
              //if not created already
              var enemy = new Ship(_ship, _ship.body.position.x, _ship.body.position.y, 1, 0);
              this.physics.add.collider(demoShip.ph, _ship, null, null, this);
              this.physics.add.collider(_ship, goodshots, this.bulletHit, null, this);
              demoBadShips.children.each(function (fellow) {
                this.physics.add.collider(_ship, fellow, null, null, this);
              }.bind(this));
              enemy.update = ai1;
              _ship.casing = enemy; //just to keep track of having been created already
            }

            _ship.setActive(true);

            _ship.setVisible(true);

            _ship.casing.createTime = Date.now();
            _ship.casing.nonceTime = pmath.Between(0, 6000); //enemy.update = ai2;
            //enemy.targetShip = ships[Math.floor(Math.random() * 2)];
            //enemy.ptx = pmath.Between(100, 700);
            //enemy.pty = pmath.Between(100, 500);
            //enemy.update = ai3;
            //enemy.update = ai4;

            demoEnemies.push(_ship.casing);
          }
        },
        callbackScope: this,
        loop: true
      });
    }
  }, {
    key: "update",
    value: function update() {
      // move sky
      sky.tilePositionY = sky.tilePositionY - 1; // get the movement for ship1

      var kb = this.input.keyboard;
      var spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;

      if (spec) {
        spec = false;

        demoShip.update = function () {};

        demoShip.ph.setActive(false);
        demoShip.ph.setVisible(false);
        demoMode = false;
        normal_mode = true; //load next scene

        this.scene.start('MainScene');
      }

      demoEnemies = demoEnemies.filter(function (item) {
        return item.ph.active && item.ph.body.position.y < 550;
      }); //update the demoShip

      if (demoShip.targetShip === undefined || !demoShip.targetShip.ph.active || demoShip.targetShip.ph.body.position.y < -20 || demoShip.targetShip.ph.body.position.y > 500) {
        demoShip.targetShip = demoEnemies[Math.floor(Math.random(demoEnemies.length))];
      }

      demoShip.update(false, false, false, false, false, false);

      if (pmath.Between(0, 1000) < 30 && demoShip.targetShip.ph.body && demoShip.targetShip.ph.body.position.y > 0) {
        demoShip.shoot(false);
      }

      if (pmath.Between(0, 1000000) < 500 && demoShip.ph.active) {
        demoShip.shoot(true);
      } // update and destroy enemies


      demoBadShips.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this)); //destroy bullets out of range

      goodshots.children.each(function (shot) {
        if (shot.active) {
          if (offscreen(shot.x, shot.y)) {
            shot.setActive(false);
            shot.setVisible(false);
          }
        }
      }.bind(this)); //destroy bullets out of range

      badshots.children.each(function (shot) {
        if (shot.active) {
          if (offscreen(shot.x, shot.y)) {
            shot.setActive(false);
            shot.setVisible(false);
          }
        }
      }.bind(this));
    }
  }]);

  return TitleScene;
}(Phaser.Scene);
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../../game/static/scripts/title.js"], null)
//# sourceMappingURL=/title.5a1a9cf2.js.map