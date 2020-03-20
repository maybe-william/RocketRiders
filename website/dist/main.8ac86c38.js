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
})({"../../game/static/scripts/main.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var p1score = 0;
var p1scoreText;
var p2score = 0;
var p2scoreText;
var ships = [];
var enemies = [];
var enemies1;
var enemies2;
var enemies3;
var enemies4;
var enemies5;
var blasts;
var cursors;
var sky;
var dirt1;
var spaceheld = false;
var shiftpressed = 0;
var two_player = false;
var zeroheld = false;
var enterpressed = 0;
var goodshots;
var badshots;
var textbox;
var normal_mode = false;
var enemy1_mode = false;
var enemy2_mode = false;
var enemy3_mode = false;
var enemy4_mode = false;
var enemy5_mode = false;
var boss_mode = false;
var sin = Math.sin;
var cos = Math.cos;
var pi = Math.PI;
var pmath = Phaser.Math;

function offscreen(x, y) {
  if (x < -200 || y < -200 || x > 1000 || y > 800) {
    return true;
  }

  return false;
}

function spawnEnemy1(x, y) {
  if (enemy1_mode) {
    var ship = enemies1.get(x, y);
    ship.setBounce(0.6);
    ship.setAngle(180);
    ship.setRotation(pi);

    if (ship.casing === undefined) {
      //if full ship objectnot created already
      var enemy = new Ship(ship, x, y, 1, 0);
      enemy.update = ai1;
      ship.casing = enemy; //just to keep track of having been created already
    }

    ship.setActive(true);
    ship.setVisible(true);
    ship.casing.createTime = Date.now();
    ship.casing.nonceTime = pmath.Between(0, 6000);
  }
}

function spawnEnemy2(x, y) {
  if (enemy2_mode) {
    var ship = enemies2.get(x, y);
    ship.setBounce(0.6);
    ship.setAngle(180);
    ship.setRotation(pi);

    if (ship.casing === undefined) {
      //if full ship object not created already
      var enemy = new Ship(ship, x, y, 1, 0);
      enemy.update = ai2;
      ship.casing = enemy; //just to keep track of the object wrapper
    }

    ship.setActive(true);
    ship.setVisible(true);
    ship.casing.createTime = Date.now();
    ship.casing.nonceTime = pmath.Between(0, 6000);
    ship.casing.targetShip = ships[Math.floor(Math.random() * 2)]; //ship.casing.ptx = pmath.Between(100, 700);
    //ship.casing.pty = pmath.Between(100, 500);
  }
}

function spawnEnemy3(x, y) {
  if (enemy3_mode) {
    var ship = enemies3.get(x, y);
    ship.setBounce(0.6);
    ship.setAngle(180);
    ship.setRotation(pi);

    if (ship.casing === undefined) {
      //if full ship object not created already
      var enemy = new Ship(ship, x, y, 1, 0);
      enemy.update = ai3;
      ship.casing = enemy; //just to keep track of the object wrapper
    }

    ship.setActive(true);
    ship.setVisible(true);
    ship.casing.createTime = Date.now();
    ship.casing.nonceTime = pmath.Between(0, 6000);
    ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
    ship.casing.ptx = pmath.Between(100, 700);
    ship.casing.pty = pmath.Between(100, 500);
  }
}

function spawnEnemy4(x, y) {
  if (enemy4_mode) {
    var ship = enemies4.get(x, y);
    ship.setBounce(0.6);
    ship.setAngle(180);
    ship.setRotation(pi);

    if (ship.casing === undefined) {
      //if full ship object not created already
      var enemy = new Ship(ship, x, y, 1, 0);
      enemy.update = ai4;
      ship.casing = enemy; //just to keep track of the object wrapper
    }

    ship.setActive(true);
    ship.setVisible(true);
    ship.casing.createTime = Date.now();
    ship.casing.nonceTime = pmath.Between(0, 6000);
    ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
    ship.casing.ptx = pmath.Between(100, 700);
    ship.casing.pty = pmath.Between(100, 500);
  }
}

function spawnEnemy5(x, y) {
  if (enemy5_mode) {
    var ship = enemies5.get(x, y);
    ship.setBounce(0.6);
    ship.setAngle(180);
    ship.setRotation(pi);

    if (ship.casing === undefined) {
      //if full ship object not created already
      var enemy = new Ship(ship, x, y, 1, 0);
      enemy.update = ai5;
      ship.casing = enemy; //just to keep track of the object wrapper
    }

    ship.setActive(true);
    ship.setVisible(true);
    ship.casing.createTime = Date.now();
    ship.casing.nonceTime = pmath.Between(0, 6000);
    ship.casing.targetShip = ships[Math.floor(Math.random() * 2)];
    ship.casing.ptx = pmath.Between(100, 700);
    ship.casing.pty = pmath.Between(100, 500);
  }
}

var MainScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MainScene, _Phaser$Scene);

  _createClass(MainScene, [{
    key: "bulletHit",
    value: function bulletHit(ship, shot) {
      if (shot.active && ship.active) {
        var blast = blasts.get(shot.body.position.x, shot.body.position.y);

        if (blast) {
          blast.setActive(true);
          blast.setVisible(true);
          blast.play('blast');
          setTimeout(function () {
            blast.setActive(false);
            blast.setVisible(false);
            blast.setPosition(-200, -200);
          }, 1000);
        }

        shot.setPosition(-200, -200);
        shot.setVelocity(0, 0);
        shot.setActive(false);
        shot.setVisible(false);
        ship.setPosition(-200, -200);
        ship.setVelocity(0, 0);
        ship.setActive(false);
        ship.setVisible(false);

        if (ship.texture.key === 'player1' || ship.texture.key === 'player2' && two_player) {
          setTimeout(function () {
            ship.setActive(true);
            ship.setVisible(true);
            ship.setPosition(pmath.Between(200, 600), pmath.Between(200, 400));
            ship.setVelocity(0, 0);
          }, 1000);
        } else if (ship.texture.key !== 'player2') {
          if (ship.body.position.x > -20 && ship.body.position.x < 820) {
            if (ship.body.position.y > -20 && ship.body.position.y < 620) {
              if (shot.shooter === 'player1') {
                p1score = p1score + 10;
                p1scoreText.setText('P1 Score: ' + p1score.toString());
              }

              if (shot.shooter === 'player2') {
                p2score = p2score + 10;
                p2scoreText.setText('P2 Score: ' + p2score.toString());
              }
            }
          }
        }
      }
    }
  }]);

  function MainScene() {
    _classCallCheck(this, MainScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainScene).call(this, 'MainScene'));
  }

  _createClass(MainScene, [{
    key: "preload",
    value: function preload() {
      this.load.plugin('rextexttypingplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexttypingplugin.min.js', true);
      this.load.image('sky', 'static/assets/images/starbgv.png');
      this.load.image('player1', 'static/assets/images/blueship.png');
      this.load.image('player2', 'static/assets/images/blueship2.png');
      this.load.image('enemy1', 'static/assets/images/orangeship.png');
      this.load.image('enemy2', 'static/assets/images/orangeship2.png');
      this.load.image('enemy3', 'static/assets/images/orangeship3.png');
      this.load.image('enemy4', 'static/assets/images/orangeship4.png');
      this.load.image('enemy5', 'static/assets/images/orangeship5.png');
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
      this.load.image('null', 'static/assets/images/null.png');
    }
  }, {
    key: "create",
    value: function create() {
      sky = this.add.tileSprite(400, 300, 800, 600, 'sky');
      sky.setDepth(-999);
      p1scoreText = this.add.text(16, 16, 'P1 Score: ' + p1score.toString(), {
        fontSize: '32px',
        fill: '#a66f3c'
      });
      p2scoreText = this.add.text(400, 16, 'P2 Score: ' + p1score.toString(), {
        fontSize: '32px',
        fill: '#a66f3c'
      }); //dirt1 = this.add.particles('shapes',  new Function('return ' + this.cache.text.get('space_dirt'))());
      //dirt1.setDepth(-999);

      textbox = this.make.text({
        x: 0,
        y: 400,
        padding: {
          left: 64,
          right: 64,
          top: 20,
          bottom: 40,
          x: 32,
          // 32px padding on the left/right
          y: 16 // 16px padding on the top/bottom

        },
        text: '',
        style: {
          fontSize: '32px',
          fontFamily: 'Oxanum',
          color: '#ffffff',
          align: 'left',
          // 'left'|'center'|'right'|'justify'
          //backgroundColor: '#fffff',
          wordWrap: {
            width: 750,
            useAdvancedWrap: true
          },
          fixedWidth: 800,
          fixedHeight: 500
        },
        add: true
      });
      textbox.setDepth(99999);
      textbox = this.plugins.get('rextexttypingplugin').add(textbox, {});
      var ship = this.physics.add.sprite(100, 450, 'player1');
      ship.setBounce(0.2);
      ship.setCollideWorldBounds(true);
      ships.push(ship);
      ship = this.physics.add.sprite(200, 500, 'player2');
      ship.setBounce(0.2);
      ship.setCollideWorldBounds(true);
      ships.push(ship);
      ships[0] = new Ship(ships[0], 100, 450, 1, 0);
      ships[1] = new Ship(ships[1], 200, 500, 1, 0);
      ships[1].ph.setActive(false);
      ships[1].ph.setVisible(false);
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
      enemies1 = this.physics.add.group({
        defaultKey: 'enemy1',
        maxSize: 100
      });
      enemies2 = this.physics.add.group({
        defaultKey: 'enemy2',
        maxSize: 100
      });
      enemies3 = this.physics.add.group({
        defaultKey: 'enemy3',
        maxSize: 100
      });
      enemies4 = this.physics.add.group({
        defaultKey: 'enemy4',
        maxSize: 100
      });
      enemies5 = this.physics.add.group({
        defaultKey: 'enemy5',
        maxSize: 100
      });
      this.physics.add.collider(ships[0].ph, ships[1].ph, null, null, this);
      this.physics.add.collider(ships[1].ph, ships[0].ph, null, null, this);
      this.physics.add.collider(ships[0].ph, badshots, this.bulletHit, null, this);
      this.physics.add.collider(ships[1].ph, badshots, this.bulletHit, null, this);
      this.physics.add.collider(ships[0].ph, enemies1, null, null, this);
      this.physics.add.collider(ships[1].ph, enemies1, null, null, this);
      this.physics.add.collider(enemies1, goodshots, this.bulletHit, null, this);
      this.physics.add.collider(enemies1, enemies1, null, null, this);
      this.physics.add.collider(ships[0].ph, enemies2, null, null, this);
      this.physics.add.collider(ships[1].ph, enemies2, null, null, this);
      this.physics.add.collider(enemies2, goodshots, this.bulletHit, null, this);
      this.physics.add.collider(enemies2, enemies2, null, null, this);
      this.physics.add.collider(ships[0].ph, enemies3, this.bulletHit, null, this);
      this.physics.add.collider(ships[1].ph, enemies3, this.bulletHit, null, this);
      this.physics.add.collider(enemies3, goodshots, this.bulletHit, null, this);
      this.physics.add.collider(enemies3, enemies3, null, null, this);
      this.physics.add.collider(ships[0].ph, enemies4, null, null, this);
      this.physics.add.collider(ships[1].ph, enemies4, null, null, this);
      this.physics.add.collider(enemies4, goodshots, this.bulletHit, null, this);
      this.physics.add.collider(enemies4, enemies4, null, null, this);
      this.physics.add.collider(ships[0].ph, enemies5, null, null, this);
      this.physics.add.collider(ships[1].ph, enemies5, null, null, this);
      this.physics.add.collider(enemies5, goodshots, this.bulletHit, null, this);
      this.physics.add.collider(enemies5, enemies5, null, null, this);
      this.physics.add.collider(enemies1, enemies2, null, null, this);
      this.physics.add.collider(enemies1, enemies3, null, null, this);
      this.physics.add.collider(enemies1, enemies4, null, null, this);
      this.physics.add.collider(enemies1, enemies5, null, null, this);
      this.physics.add.collider(enemies2, enemies1, null, null, this);
      this.physics.add.collider(enemies2, enemies3, null, null, this);
      this.physics.add.collider(enemies2, enemies4, null, null, this);
      this.physics.add.collider(enemies2, enemies5, null, null, this);
      this.physics.add.collider(enemies3, enemies1, null, null, this);
      this.physics.add.collider(enemies3, enemies2, null, null, this);
      this.physics.add.collider(enemies3, enemies4, null, null, this);
      this.physics.add.collider(enemies3, enemies5, null, null, this);
      this.physics.add.collider(enemies4, enemies1, null, null, this);
      this.physics.add.collider(enemies4, enemies2, null, null, this);
      this.physics.add.collider(enemies4, enemies3, null, null, this);
      this.physics.add.collider(enemies4, enemies5, null, null, this);
      this.physics.add.collider(enemies5, enemies1, null, null, this);
      this.physics.add.collider(enemies5, enemies2, null, null, this);
      this.physics.add.collider(enemies5, enemies3, null, null, this);
      this.physics.add.collider(enemies5, enemies4, null, null, this); //enemy spawn timer

      this.time.addEvent({
        delay: 1000,
        callback: function callback() {
          spawnEnemy1(pmath.Between(100, 700), -100);
          spawnEnemy2(pmath.Between(100, 700), -100);
          spawnEnemy3(pmath.Between(100, 700), -100);
          spawnEnemy4(pmath.Between(100, 700), -100);
          spawnEnemy5(pmath.Between(100, 700), -100);
        },
        callbackScope: this,
        loop: true
      });
      this.time.addEvent({
        delay: 500,
        callback: function callback() {
          textbox.start("Chris\' text", 10);
          setTimeout(function () {
            textbox.stop();
          }, 1300);
        },
        callbackScope: this,
        loop: false
      });
      this.time.addEvent({
        delay: 2000,
        callback: function callback() {
          textbox.start("Faizan\'s text", 10);
          setTimeout(function () {
            textbox.stop();
          }, 1300);
        },
        callbackScope: this,
        loop: false
      });
      this.time.addEvent({
        delay: 3500,
        callback: function callback() {
          textbox.start("Will\'s text", 10);
          setTimeout(function () {
            textbox.start('');
            enemy1_mode = true;
          }, 1300);
        },
        callbackScope: this,
        loop: false
      }); //stage1

      setTimeout(function () {
        enemy1_mode = true;
        enemy2_mode = false;
        enemy3_mode = false;
        enemy4_mode = false;
        enemy5_mode = false;
      }, 10000); //stage2

      setTimeout(function () {
        enemy1_mode = false;
        enemy2_mode = true;
        enemy3_mode = false;
        enemy4_mode = false;
        enemy5_mode = false;
      }, 40000); //stage3

      setTimeout(function () {
        enemy1_mode = false;
        enemy2_mode = false;
        enemy3_mode = true;
        enemy4_mode = false;
        enemy5_mode = false;
      }, 70000); //stage4

      setTimeout(function () {
        enemy1_mode = false;
        enemy2_mode = false;
        enemy3_mode = false;
        enemy4_mode = true;
        enemy5_mode = false;
      }, 100000); //stage5

      setTimeout(function () {
        enemy1_mode = false;
        enemy2_mode = false;
        enemy3_mode = false;
        enemy4_mode = false;
        enemy5_mode = true;
      }, 130000); //        //stage 1 and 2
      //        setTimeout(function () {
      //            enemy1_mode = true;
      //            enemy2_mode = true;
      //            enemy3_mode = false;
      //            enemy4_mode = false;
      //            enemy5_mode = false;
      //        }, 160000);
      //        //stage 3 and 5
      //        setTimeout(function () {
      //            enemy1_mode = false;
      //            enemy2_mode = false;
      //            enemy3_mode = true;
      //            enemy4_mode = false;
      //            enemy5_mode = true;
      //        }, 220000);
      //        //stage 1, 3, 4
      //        setTimeout(function () {
      //            enemy1_mode = true;
      //            enemy2_mode = false;
      //            enemy3_mode = true;
      //            enemy4_mode = true;
      //            enemy5_mode = false;
      //        }, 280000);
      //        //stage 2,3,5
      //        setTimeout(function () {
      //            enemy1_mode = false;
      //            enemy2_mode = true;
      //            enemy3_mode = true;
      //            enemy4_mode = false;
      //            enemy5_mode = true;
      //        }, 340000);
      //        //stage 1,2,3,4,5
      //        setTimeout(function () {
      //            enemy1_mode = true;
      //            enemy2_mode = true;
      //            enemy3_mode = true;
      //            enemy4_mode = true;
      //            enemy5_mode = true;
      //        }, 400000);
      //        //clear
      //        setTimeout(function () {
      //            enemy1_mode = false;
      //            enemy2_mode = false;
      //            enemy3_mode = false;
      //            enemy4_mode = false;
      //            enemy5_mode = false;
      //        }, 430000);
    }
  }, {
    key: "update",
    value: function update() {
      // move sky
      sky.tilePositionY = sky.tilePositionY - 1; // get the movement for ship1

      var kb = this.input.keyboard;
      var four = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR).isDown;
      var six = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX).isDown;
      var eight = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT).isDown;
      var five = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE).isDown;
      var fire = kb.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO).isDown;
      var spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).isDown;

      if (!two_player && spec) {
        ships[1].ph.setActive(true);
        ships[1].ph.setVisible(true);
        ships[1].ph.setPosition(210, 300);
        ships[1].ph.setVelocity(0, 0);
        two_player = true;
        enterpressed = Date.now();
        spec = false;
      }

      if (!fire) {
        zeroheld = false;
      }

      fire = fire && !zeroheld; //only fire on the first press

      if (Date.now() - enterpressed < 6000) {
        spec = false; //only allow shift every 6 seconds
      }

      if (spec) {
        enterpressed = Date.now();
      }

      if (two_player) {
        ships[1].update(fire, spec, eight, five, six, four);
      }

      if (fire) {
        zeroheld = true;
      } // get the movement for ship2


      var w = kb.addKey('W').isDown;
      var a = kb.addKey('A').isDown;
      var s = kb.addKey('S').isDown;
      var d = kb.addKey('D').isDown;
      fire = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown;
      spec = kb.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT).isDown;

      if (!fire) {
        spaceheld = false;
      }

      fire = fire && !spaceheld; //only fire on the first press

      if (Date.now() - shiftpressed < 6000) {
        spec = false; //only allow shift every 6 seconds
      }

      if (spec) {
        shiftpressed = Date.now();
      }

      ships[0].update(fire, spec, w, s, d, a);

      if (fire) {
        spaceheld = true;
      } //destroy bullets out of range


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
      }.bind(this)); //update enemies on screen and destroy enemies out of range

      enemies1.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this));
      enemies2.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this));
      enemies3.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this));
      enemies4.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this));
      enemies5.children.each(function (enemy) {
        if (enemy.active) {
          enemy.casing.update(false, false, false, false, false, false);

          if (offscreen(enemy.body.position.x, enemy.body.position.y)) {
            enemy.setActive(false);
            enemy.setVisible(false);
            enemy.setVelocity(0, 0);
          }
        }
      }.bind(this));
    }
  }]);

  return MainScene;
}(Phaser.Scene); // set the game config


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  plugins: {
    global: [{
      key: 'rextexttypingplugin',
      start: true
    }]
  },
  scene: [TitleScene, MainScene]
}; // start the game

var game = new Phaser.Game(config);
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../../game/static/scripts/main.js"], null)
//# sourceMappingURL=/main.8ac86c38.js.map