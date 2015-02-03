/**
 * Created by wuyanc on 1/27/2015.
 */
Game.Over=function(){}
Game.Over.prototype={
    create:function(){
        //
    },
    update:function(){
        //restart
        game.state.start('Play');
    }
}