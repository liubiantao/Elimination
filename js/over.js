/**
 * Created by wuyanc on 1/27/2015.
 */
Game.Over=function(){}
Game.Over.prototype={
    langResource:{"en":{"game.over":"Game Over!","game.performance":"Your Performance is:","game.egg":"Color Egg Found:","game.maxconclear":"Max Con-clear Count:"},
        "zh":{"game.over":"游戏结束！","game.performance":"你的表现：","game.egg":"发现彩蛋个数：","game.maxconclear":"最长连续消除次数："}},
    create:function(){

        game.add.text(16, 30, "SCORE :" , {
            font: "16px Arial",
            fill: "#333333"
        });
        game.add.text(90, 30, GlobalScore.toString(), {
            font: "bold 16px Arial",
            fill: "#333333"
        });
        var Performance = '';

        if(GlobalScore<10){
            Performance= 'D-';
        }
        else if(GlobalScore <50)
            Performance= 'D+';
        else if(GlobalScore <100)
            Performance= 'C-';
        else if(GlobalScore <500)
            Performance= 'C+';
        else if(GlobalScore <700)
            Performance= 'B-';
        else if(GlobalScore <1000)
            Performance= 'B+';

        else if(GlobalScore <3000)
            Performance= 'A--';
        else if(GlobalScore <20000)
            Performance= 'A-';
        else
            Performance= 'A';
        introText = game.add.text(game.world.centerX - 60, game.world.centerY-60, this.langResource[LANGUAGE]['game.over'], {
            font: "300 20px " +FONT,
            fill: "#999",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX - 130, game.world.centerY+20, this.langResource[LANGUAGE]['game.performance'], {
            font: "300 20px"+FONT,
            fill: "#999",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX +80, game.world.centerY, Performance, {
            font: "300 50px"+FONT,
            fill: "#45ADA8",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX - 130, game.world.centerY+80,this.langResource[LANGUAGE]["game.maxconclear"], {
            font: "300 20px"+FONT,
            fill: "#999",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX +80, game.world.centerY+60, MaxClearMovementCount.toString(), {
            font: "300 50px"+FONT,
            fill: "#45ADA8",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX - 130, game.world.centerY+140,this.langResource[LANGUAGE]["game.egg"], {
            font: "300 20px"+FONT,
            fill: "#999",
            align: "center"
        });
        introText =  game.add.text(game.world.centerX +80, game.world.centerY+130, MaxColorEggCount.toString(), {
            font: "300 40px"+FONT,
            fill: "#45ADA8",
            align: "center"
        });
        return game.input.onDown.addOnce(function() {
            GlobalScore = 0;
            MaxClearMovementCount=0;
            HasFoundEGG=false;
            MaxColorEggCount = 0;
            return game.state.start('Play');
        });
    },
    update:function(){
//        //restart
//        game.state.start('Play');
    }
}