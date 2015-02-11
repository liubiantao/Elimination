/**
 * Created by wuyanc on 1/27/2015.
 */
Game.Over=function(){}
Game.Over.prototype={
    create:function(){

        game.add.text(16, 30, "SCORE :" , {
            font: "16px Arial",
            fill: "#333333"
        });
        game.add.text(90, 30, GlobalScore.toString(), {
            font: "bold 16px Arial",
            fill: "#333333"
        });
        introText = game.add.text(game.world.centerX - 60, game.world.centerY-60, 'Game Over!', {
            font: "300 20px Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
            fill: "#999",
            align: "center"
        });
        introText = game.add.text(game.world.centerX-85, game.world.centerY+60, 'Click to play again.', {
            font: "300 20px Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
            fill: "#999",
            align: "center"
        });

        return game.input.onDown.addOnce(function() {
            GlobalScore = 0;
            return game.state.start('Play');
        });
    },
    update:function(){
//        //restart
//        game.state.start('Play');
    }
}