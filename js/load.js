/**
 * Created by wuyanc on 1/27/2015.
 */
var Game = {};
Game.Load=function(game){}
Game.Load.prototype={
    preload:function(){
//        game.load.image('background','img/bk.png');
//        game.load.image('green',"img/green.png");
//        game.load.image('orange','img/orange.png');
//        game.load.image('pink','img/pink.png');
//
        game.load.image('blue1','img/blue1.png');
        game.load.image('blue2','img/blue2.png');
        game.load.image('pink2','img/pink2.png');
        game.load.image('red','img/red.png');
        game.load.image('coffee','img/coffee.png');
        game.load.audio('clear',['audio/clear.wav']);



    },
    create:function(){
        game.stage.backgroundColor = '#ffffff';
        introText = game.add.text(game.world.centerX - 60, game.world.centerY, 'Click to start', {
            font: "300 20px Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
            fill: "#999",
            align: "center"
        });


       return game.input.onDown.addOnce(function() {
            gameScore = 0;
            return game.state.start('Play');
        });

    }
}