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
        for(var i=0;i<SIZE;i++) //init one 7*7 matrix value to 0;
        {
            Matrix[i]= NOT_FILLED;

        }


    },
    create:function(){
        game.stage.backgroundColor = '#fff';
        introText = game.add.text(game.world.centerX - 60, game.world.centerY, 'Click to start', {
            font: "300 20px Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
            fill: "#999",
            align: "center"
        });
        scoreTextBefore = game.add.text(16, 30, "SCORE :", {
            font: "16px Arial",
            fill: "#333333"
        });
        scoreText = game.add.text(90, 30, "0", {
            font: "bold 16px Arial",
            fill: "#333333"
        });
        scoreTextBefore.visible = false;
        scoreText.visible = false;

       // return game.input.onDown.addOnce(function() {
            //gameScore = 0;
            return game.state.start('Play');
        //});

    }
}