/**
 * Created by wuyanc on 1/27/2015.
 */
var WIDTH=400;
var HEIGHT=490;
var BLOCKSIZE= 50;
var LineBorder =1;
var BasePostion={x:25,y:105,width:BLOCKSIZE};

var SIZE= 49; //BLCOK NUMBER 7*7
var SIZEX= 7;
var SIZEY= 7;
var MIN_CLEAR_SIZE=3;
var ScoreText=void 0 ; // equal to "undefined"
var GlobalScore =0;
var MaxClearMovementCount=0;
var HasFoundEGG = false;
var DEBUG_CURRENT_CLEAR_COUNT=0;
var DEBUG_MOVEMENT_LIST='';
var Matrix=[];
var NotUsedMatrix = [];  //  stand for not used;
var BACKGROUNDBLOCKSIZE = 48;
var COLOR={1:"blue1",2:"blue2",3:"pink2",4:"red",5:"coffee"};
var BLOCKS=void 0;
var HAS_BEEN_FILLED=1;
var NOT_FILLED=0;
var IS_MOVING=true;
var UP="1";
var DOWN="2";
var NOTUPNOTDOWN="0";
var COLOREGGLIST="110";//221122"; //1 stands for "up" 2 for "down"
console.log('↖(▔＾▔)↗  Have Fun!!');
console.log(' \\(▔▽▔)/   Advice to author: movaxeffort@163.com')
var game = new Phaser.Game(WIDTH,HEIGHT,Phaser.AUTO,"gameContainer");

game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);

game.state.start('Load');