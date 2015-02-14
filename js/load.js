/**
 * Created by wuyanc on 1/27/2015.
 */
var Game = {};
Game.Load=function(game){

}
Game.Load.prototype={
    langResource:{"en":{"game.start":"Click to start"},"zh":{"game.start":"点击开始游戏"}},
    preload:function(){

        game.load.image('blue1','img/blue1.png');
        game.load.image('blue2','img/blue2.png');
        game.load.image('pink2','img/pink2.png');
        game.load.image('red','img/red.png');
        game.load.image('coffee','img/coffee.png');
        game.load.image('egg1','img/coloregg1.png');
        game.load.audio('clear',['audio/clear.mp3']);



    },
    initLang:function(){

        var type=navigator.appName;
        if (type=="Netscape"){
            var lang = navigator.language;
        }
        else{
            var lang = navigator.userLanguage;
        }
        var lang = lang.substr(0,2);
        switch (lang){
            case 'en':
                LANGUAGE="en";
                break;
            case 'zh':
                LANGUAGE="zh";
                break;
            default :
                LANGUAGE="en";
                break;
        }
    },
    create:function(){
        game.stage.backgroundColor = '#ffffff';


        try{
            this.initLang();//get and set language
        }
        catch(err){
            LANGUAGE='en'; //set default to english
        }
        introText = game.add.text(game.world.centerX - 70, game.world.centerY-150,'Elimination', {

            font: "300 30px "+FONT,
            fill: "#222",
            align: "center"
        });
        var block = game.add.sprite(game.world.centerX - 120-20, game.world.centerY-60,'red');
        var block = game.add.sprite(game.world.centerX - 60-20, game.world.centerY-60,'blue1');

        var block = game.add.sprite(game.world.centerX -20, game.world.centerY-60,'blue2');
        var block = game.add.sprite(game.world.centerX +60-20, game.world.centerY-60,'pink2');
        var block = game.add.sprite(game.world.centerX +120-20, game.world.centerY-60,'coffee');
        introText = game.add.text(game.world.centerX - 60, game.world.centerY+60,this.langResource[LANGUAGE]['game.start'], {

            font: "300 20px "+FONT,
            fill: "#999",
            align: "center"
        });


       return game.input.onDown.addOnce(function() {
            gameScore = 0;
            return game.state.start('Play');
        });

    }
}