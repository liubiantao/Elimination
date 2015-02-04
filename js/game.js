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
var Matrix=[];
var NotUsedMatrix = [];  //  stand for not used;
var COLOR1={1:"green",2:"orange",3:"pink",4:"yellow"};
var COLOR={1:"blue1",2:"blue2",3:"pink2",4:"red",5:"coffee"};
var BLOCKS=void 0;
var HAS_BEEN_FILLED=1;
var NOT_FILLED=0;
var IS_MOVING=true;
var game = new Phaser.Game(WIDTH,HEIGHT,Phaser.AUTO,"gameContainer");

game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);

game.state.start('Load');