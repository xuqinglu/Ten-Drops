var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var leftDrop = document.getElementById('leftDrop');
var restart = document.getElementById('restartBtn');
var level = document.getElementById('level');
var bestLevel = document.getElementById('bestLevel');
var startGame = document.getElementById('startGame');
var startGameImg = document.getElementById('startGameImg1');
cvs.width = 600;
cvs.height = 600;
var cvsWidth = cvs.width;
var cvsHeight = cvs.height;
var gGame = null;
var first  = null;

function gameStart () {
    first = new Game();
    first.render();
    first.update();
}
//主逻辑
function Game () {
    var _this = this;
    this.leftDropNumber = 10;
    this.level = 1;
    this.levelCompare = [0,1];
    this.bestLevel = [];
    this.leftDropArr = ["NONE", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"];
    this.count = 0;
    this.ball = [];
    this.ball1 = [];
    this.ball2 = [];
    this.ball3 = [];
    this.ball4 = [];
    this.radioFirst = [15,30,45,50];
    this.radioSecond = null;
    this.probabilityArr = [15,30,45];
    this.color = 'rgb('+Math.random() * 255+','+Math.random() * 255+','+Math.random() * 255+')';
    this.bestLevelCompare = function () {
        _this.bestLevel = _this.levelCompare.sort(function (a,b) {
            return b - a;
        });
        bestLevel.innerHTML = _this.bestLevel[0];
    };
    this.render = function () {
        for(var i = 0; i < 6; i++) {
            for(var j = 0; j < 6; j++) {
                _this.ball.push(new Droplets(50+100*i,50+100*j,_this.radioFirst[parseInt(Math.random() * _this.radioFirst.length)],_this.radioSecond,_this.color));
            }
        }
    };
    this.update = function () {
        ctx.clearRect(0,0,cvsWidth,cvsHeight);
        _this.ball1.forEach(function (val){
            for(var i = 0; i < _this.ball.length; i++) {
                if (val.positionY == _this.ball[i].y) {
                    if (val.positionX + _this.ball[i].b + 10 == _this.ball[i].x) {
                        val.dead = true;
                        _this.judgeWay(i);
                    }
                }
            }
        });
        _this.ball1.forEach(function (val,index) {
            val.draw();
            val.updatePos();
            val.updateStatus();
            if(val.dead) {
                _this.ball1.splice(index,1);
            }
        });
        _this.ball2.forEach(function (val){
            for(var i = 0; i < _this.ball.length; i++) {
                if (val.positionY == _this.ball[i].y) {
                    if (val.positionX - _this.ball[i].b - 10 == _this.ball[i].x) {
                        val.dead = true;
                        _this.judgeWay(i);
                    }
                }
            }
        });
        _this.ball2.forEach(function (val,index) {
            val.draw();
            val.updatePos();
            val.updateStatus();
            if(val.dead) {
                _this.ball2.splice(index,1);
            }
        });
        _this.ball3.forEach(function (val){
            for(var i = 0; i < _this.ball.length; i++) {
                if (val.positionX == _this.ball[i].x) {
                    if (val.positionY + _this.ball[i].a + 10 == _this.ball[i].y) {
                        val.dead = true;
                        _this.judgeWay(i);
                    }
                }
            }
        });
        _this.ball3.forEach(function (val,index) {
            val.draw();
            val.updatePos();
            val.updateStatus();
            if(val.dead) {
                _this.ball3.splice(index,1);
            }
        });
        _this.ball4.forEach(function (val){
                for(var i = 0; i < _this.ball.length; i++) {
                    if (val.positionX == _this.ball[i].x) {
                        if (val.positionY - _this.ball[i].a - 10 == _this.ball[i].y) {
                            val.dead = true;
                            _this.judgeWay(i);
                        }
                    }
                }
        });
        _this.ball4.forEach(function (val,index) {
            val.draw();
            val.updatePos();
            val.updateStatus();
            if(val.dead) {
                _this.ball4.splice(index,1);
            }
        });
        _this.ball.forEach(function (val) {
            val.judge();
            val.draw();
        });
        setTimeout(_this.update,5);
    };
    cvs.onclick = function (e) {
        var x = e.pageX - 600;
        var y = e.pageY - 150;
        var o = 0;
        var w = 0;
        if(x > 100 && x < 200) {
             x  = x + 500;
             o = 500;
             w = 500;
         }
        if(x > 200 && x < 300) {
             x = x + 1000;
             o = 1000;
             w = 1000;
         }
        if(x > 300 && x < 400) {
             x = x + 1500;
             o = 1500;
             w = 1500;
         }
        if(x > 400 && x < 500) {
             x = x + 2000;
             o = 2000;
             w = 2000;
         }
        if(x > 500 && x < 600) {
             x = x + 2500;
             o = 2500;
             w = 2500;
         }
        var n = parseInt(x/100) ;
        var p = parseInt(y/100) ;
        var s = parseInt((x-w)/100);
        var q = n + p;                  //确定索引位置
        var t = (x - o) - _this.ball[q].x;
        var m = (y + 100 * s)- _this.ball[q].y;
        var dis = Math.sqrt(Math.pow(t,2) + Math.pow(m,2));
        if(dis <= _this.ball[q].x) {
            _this.leftDropNumber--;
            leftDrop.innerHTML = _this.leftDropArr[_this.leftDropNumber];
            if(_this.leftDropNumber == -1) {
                alert("你已经失败了！重新开始！");
                location.reload();
            }
            _this.judgeWay(q);
          }
        };

    restart.onclick = function () {
        location.reload();
    };
    startGameImg.onclick = function () {
        startGame.removeAttribute('open');
    };
    startGameImg.onmouseover = function () {
        startGameImg.style.transform = 'scale(1.5)';
        startGameImg.onmouseout = function () {
            startGameImg.style.transform = 'scale(1)';
        }
    };
    this.dropWay = function (i,j) {
            _this.ball1.push(new SmallDroplets(50 + 100 * j , 50 + 100 * i,_this.color));
            _this.ball2.push(new SmallDroplets1(50 + 100 * j , 50 + 100 * i,_this.color));
            _this.ball3.push(new SmallDroplets2(50 + 100 * j, 50 + 100 * i,_this.color));
            _this.ball4.push(new SmallDroplets3(50 + 100 * j, 50 + 100 * i,_this.color));
        };
    this.judgeWay = function(n) {
            if(_this.ball[n].a == 15) {
                _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,30,30,_this.color));
            }
            else if(_this.ball[n].a == 30) {
                _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,45,35,_this.color))
            }
            else if(_this.ball[n].a == 45) {
                _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,50,50,_this.color))
            }
            else if(_this.ball[n].a == 50) {
                _this.count++;
                if(n>=0 && n<=5) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    _this.dropWay(n,0);
                }
                if(n> 5 && n <=11) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    n = n - 6;
                    _this.dropWay(n,1);
                }
                if(n>= 12 && n <= 17) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    n = n - 12;
                    _this.dropWay(n,2);
                }
                if(n>=18 && n <= 23) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    n = n - 18;
                    _this.dropWay(n,3);
                }
                if(n>=23 && n <= 29) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    n = n - 24;
                    _this.dropWay(n,4);
                }
                if(n>=29 && n <= 35) {
                    _this.ball.splice(n,1,new Droplets(_this.ball[n].x,_this.ball[n].y,1000,1000,'rgb(0,0,0,0)'));
                    n = n - 30;
                    _this.dropWay(n,5);
                }
                if(_this.count == 36) {
                    alert("你成功点破了所有水滴！进入下一关！");
                    _this.ball = [];
                    _this.ball1 = [];
                    _this.ball2 = [];
                    _this.ball3 = [];
                    _this.ball4 = [];
                    _this.count = 0;
                    _this.radioFirst.push(_this.probabilityArr[parseInt(Math.random() * 3)]);
                    _this.color = 'rgb('+Math.random() * 255+','+Math.random() * 255+','+Math.random() * 255+')';
                    _this.render();
                    _this.update();
                    _this.level++;
                    _this.levelCompare.push(_this.level);
                    _this.bestLevelCompare();
                    _this.leftDropNumber = 11 - _this.level;
                    leftDrop.innerHTML = _this.leftDropArr[_this.leftDropNumber];
                    level.innerHTML = 'level' + _this.level;
                }
            }
        }
}
function Droplets (x,y,a,b,color) {
    var _this = this;
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;
    this.color = color;
    this.draw = function () {
        ctx.save();
        ctx.fillStyle = _this.color;
        var r = (_this.a > _this.b) ? _this.a : _this.b; //选择a,b中较大者作为arc方法的半径参数
        var radioX = _this.a / r;
        var radioY = _this.b / r;
        ctx.scale(radioX,radioY);
        ctx.beginPath();
        ctx.moveTo((_this.x + _this.a) / radioX, _this.y / radioY);
        ctx.arc(_this.x / radioX, _this.y / radioY, r , 0 , 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
    this.judge = function () {
        if(_this.a == 15) {
            _this.b = 20;
        }
        if(_this.a == 30) {
            _this.b = 30;
        }
        if(_this.a == 45) {
            _this.b = 35;
        }
        if(_this.a == 50) {
            _this.b = 50;
        }
    }
}

function SmallDroplets (positionX,positionY,color) {
    var _this = this;
    this.dead = false;
    this.positionX = positionX;
    this.positionY = positionY;
    this.v = 1;
    this.t = 0;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = _this.color;
        ctx.arc(_this.positionX,_this.positionY,10,0,Math.PI * 2);
        ctx.fill();
    };
    this.updatePos = function () {
        var dt = 1;
        _this.positionX += dt * _this.v;
    };
    this.updateStatus = function () {
        if(_this.positionX >= cvsWidth - 10 || _this.positionX < 0 || _this.positionY >= cvsHeight-10 || _this.positionY < 0) {
            _this.dead = true;
        }
    }
}

function SmallDroplets1 (positionX,positionY,color) {
    var _this = this;
    this.positionX = positionX;
    this.positionY = positionY;
    this.v = 1;
    this.dead = false;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = _this.color;
        ctx.arc(_this.positionX,_this.positionY,10,0,Math.PI * 2);
        ctx.fill();
    };
    this.updatePos = function () {
        var dt = 1;
        _this.positionX -= dt * _this.v;
    };
    this.updateStatus = function () {
        if(_this.positionX >= cvsWidth - 10 || _this.positionX < 0 || _this.positionY >= cvsHeight-10 || _this.positionY < 0) {
            _this.dead = true;
        }
    }
}

function SmallDroplets2 (positionX,positionY,color) {
    var _this = this;
    this.positionX = positionX;
    this.positionY = positionY;
    this.v = 1;
    this.dead = false;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = _this.color;
        ctx.arc(_this.positionX,_this.positionY,10,0,Math.PI * 2);
        ctx.fill();
    };
    this.updatePos = function () {
        var dt = 1;
        _this.positionY += dt * _this.v;
    };
    this.updateStatus = function () {
        if(_this.positionX >= cvsWidth - 10 || _this.positionX < 0 || _this.positionY >= cvsHeight-10 || _this.positionY < 0) {
            _this.dead = true;
        }
    }
}

function SmallDroplets3 (positionX,positionY,color) {
    var _this = this;
    this.positionX = positionX;
    this.positionY = positionY;
    this.v = 1;
    this.dead = false;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = _this.color;
        ctx.arc(_this.positionX,_this.positionY,10,0,Math.PI * 2);
        ctx.fill();
    };
    this.updatePos = function () {
        var dt = 1;
        _this.positionY -= dt * _this.v;
    };
    this.updateStatus = function () {
        if(_this.positionX >= cvsWidth - 10 || _this.positionX < 0 || _this.positionY >= cvsHeight-10 || _this.positionY < 0) {
            _this.dead = true;
        }
    }
}
