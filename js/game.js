/**
 * Created by wuyanc on 1/27/2015.
 */
var WIDTH=700;
var HEIGHT=700;
var SIZE= 49; //BLCOK NUMBER 7*7
var SIZEX= 7;
var SIZEY= 7;
var MIN_CLEAR_SIZE=3;
var BLOCKSIZE= 100;
var Matrix=[];
var NotUsedMatrix = [];  //  stand for not used;
var COLOR={1:"green",2:"orange",3:"pink",4:"yellow"};
var BLOCKS;
var HAS_BEEN_FILLED=1;
var NOT_FILLED=0;
var IS_MOVING=true;
var game = new Phaser.Game(WIDTH,HEIGHT,Phaser.AUTO,"gameContainer");

game.state.add('Load', Game.Load);
game.state.add('Play', Game.Play);
game.state.add('Over', Game.Over);

game.state.start('Load');