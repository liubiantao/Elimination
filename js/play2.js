/**
 * Created by wuyanc on 1/27/2015.
 */
"use strict";
Game.Play = function () {
    this.result = "";
    this.isInMovingAction = true;
}
Game.Play.prototype = {

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.stage.backgroundColor = '#34495e';
        BLOCKS = game.add.group();

        this.init(10);

    },

    updateGame: function (item) {
        this.isInMovingAction = true;
        var hasMoved = false;
        if (this.canBeMoved(item.lastMatrixValue, item.y / BLOCKSIZE * SIZEX + item.x / BLOCKSIZE) === -1) { // -1 standard for can not moved, so backto last position
            item.x = item.lastPostionX;
            item.y = item.lastPostionY;
        }
        else { //could move
            //1.record last position property

            item.lastPostionX = item.x;
            item.lastPostionY = item.y;
            Matrix[item.lastMatrixValue] = NOT_FILLED;
            //new point
            item.lastMatrixValue = item.y / BLOCKSIZE * SIZEX + item.x / BLOCKSIZE;
            Matrix[item.lastMatrixValue] = item.color;
            var clearList =this.getClearBlockList(item.lastMatrixValue, item.color);
            if (clearList.length === 0) {
                this.init(3);
            }
        }
        this.isInMovingAction = false;

    },
    init: function (num, level) {//level 0 =hard,level -1=normal
        if (typeof level === "undefined") {
            level = -2;
        }

        var blankMatrix = [];
        for (var k = 0; k < SIZE; k++) {
            if (Matrix[k] === NOT_FILLED)
                blankMatrix.push(k);
        }
        for (var i = 0; i < num; i++) {
            var id = game.rnd.pick(blankMatrix); //pick a blank block
            var colorIndex = game.rnd.integerInRange(1, Object.keys(COLOR).length + level);
            var block = this.createOneBlock(colorIndex, this.getX(id), this.getY(id), this.getPosX(id), this.getPosY(id));
            blankMatrix.splice(blankMatrix.indexOf(id), 1); // remove it

        }

    },
    getX: function (id) {
        return Math.floor(id % SIZEX);
    },
    getY: function (id) {
        return Math.floor(id / SIZEX);
    },
    getPosX: function (id) {
        return this.getX(id) * BLOCKSIZE;
    },
    getPosY: function (id) {
        return this.getY(id) * BLOCKSIZE;
    },
    createOneBlock: function (colorIndex, x, y, posx, posy) {
        var block = BLOCKS.create(posx, posy, COLOR[colorIndex]); //TODO make it fake show
        game.physics.arcade.enable(block);
        block.body.collideWorldBounds = true;
        block.inputEnabled = true;
        block.input.enableDrag(true);
        block.input.enableSnap(100, 100, false, true);
        block.events.onDragStop.add(this.updateGame, this);
        game.add.tween(block).to({ alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0).start();
        //add customer property
        // last position
        block.lastPostionX = posx;
        block.lastPostionY = posy;
        block.lastMatrixValue = y * SIZEX + x;
        block.color = colorIndex;
        Matrix[y * SIZEX + x] = HAS_BEEN_FILLED * colorIndex;
        return block;
    },
    //check whether can be go to the destination point from start point
    canBeMoved: function (startP, destP) {
        if (Matrix[destP] !== NOT_FILLED) {
            return -1;
        }
        var viewedNode = [];
        viewedNode.push(startP);  //the node which has been viewed(explored).
        var cursor = 0; //the pointer of viewedNode
        do {

            if (viewedNode.indexOf(destP) !== -1)//find it
                return 0;
            var currentPosition = viewedNode[cursor];
            var leftPosition = currentPosition - 1;
            if (Matrix[leftPosition] === NOT_FILLED && leftPosition >= 0 && currentPosition % SIZEX != 0) //isn't in
            {
                if (viewedNode.indexOf(leftPosition) === -1)
                    viewedNode.push(leftPosition);
            }
            var rightPosition = currentPosition + 1;
            if (Matrix[rightPosition] === NOT_FILLED && rightPosition < SIZE && (rightPosition) % SIZEX != 0) {
                if (viewedNode.indexOf(rightPosition) === -1) //hasn't contain
                {
                    viewedNode.push(rightPosition)
                }
            }
            var topPosition = currentPosition - SIZEX;
            if (Matrix[topPosition] === NOT_FILLED && topPosition >= 0) {
                if (viewedNode.indexOf(topPosition) === -1) {
                    viewedNode.push(topPosition);
                }
            }
            var bottomPosition = currentPosition + SIZEX;
            if (Matrix[bottomPosition] === NOT_FILLED && bottomPosition < SIZE) {
                if (viewedNode.indexOf(bottomPosition) === -1) {
                    viewedNode.push(bottomPosition);
                }
            }
            cursor++;

        } while (cursor != viewedNode.length)

        return -1;
    },
    getClearBlockList: function (pos, color) {
        if (typeof pos !== "number" || typeof color !== "number") {
            console.log("function clear:parameter is not valid");
        }
        var horizontalList = [];
        var verticalList = [];
        var currentPosition = pos;
        var leftPosition = pos - 1;
        if (Matrix[leftPosition] === color && leftPosition >= 0 && currentPosition % SIZEX !== 0) {
            horizontalList.push(leftPosition);
            var leftTwoPos = leftPosition - 1;
            if (Matrix[leftTwoPos] === color && leftTwoPos >= 0 && leftPosition % SIZEX !== 0) {
                horizontalList.push(leftTwoPos);
            }
        }
        var rightPosition = currentPosition + 1;
        if (Matrix[rightPosition] === color && rightPosition < SIZE && (rightPosition) % SIZEX != 0) {
            horizontalList.push(rightPosition);
            var rightTwoPosition = rightPosition + 1;
            if (Matrix[rightTwoPosition] === color && rightTwoPosition < SIZE && (rightTwoPosition) % SIZEX != 0) {
                horizontalList.push(rightTwoPosition);
            }
        }
        var topPosition = currentPosition - SIZEX;
        if (Matrix[topPosition] === color && topPosition >= 0) {
            verticalList.push(topPosition);
            var top2Position = topPosition - SIZEX;
            if (Matrix[top2Position] === color && top2Position >= 0) {
                verticalList.push(top2Position);
            }
        }
        var bottomPosition = currentPosition + SIZEX;
        if (Matrix[bottomPosition] === color && bottomPosition < SIZE) {
            verticalList.push(bottomPosition);
            var bottom2Position = bottomPosition + SIZEX;
            if (Matrix[bottom2Position] === color && bottom2Position < SIZE) {
                verticalList.push(bottom2Position);
            }
        }
        var clearList = [currentPosition];
        if (verticalList.length >= MIN_CLEAR_SIZE - 1) {
            clearList = clearList.concat(verticalList)
        }
        if (horizontalList.length >= MIN_CLEAR_SIZE - 1) {
            clearList = clearList.concat(horizontalList);
        }

        return clearList.length > 1 ? clearList : [];//if only one , then return blank ;
    },
    clearBlock2:function(clearList){
        if (typeof clearList !== "object") {
            console.log("clearBlock function: parameter is not valid");
        }
        clearList.sort();
        var _len = clearList.length;
        BLOCKS.forEach(function(item){
            for(var _i=0;i<_len;i++){
                if ( clearList[i] === item.lastMatrixValue) {
                    item.needToRemove = true;
                    var fade = game.add.tween(item);
                    fade.to({alpha: 0}, 500).to({alpha: 10}, 500);
                    fade.to({ alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0);
                    fade.start();
                    clearList.splice(i,1);
                    break;
                }
            }
        },this,true);
    },
    clearBlock: function (clearList) {
        if (typeof clearList !== "object") {
            console.log("clearBlock function: parameter is not valid");
        }
        var len = clearList.length;
        for (var i = 0; i < len; i++) {
            Matrix[clearList[i]] = NOT_FILLED;

            BLOCKS.forEach(function (item) {
                console.log(item.lastMatrixValue);
                if ( clearList[i] === item.lastMatrixValue) {
                    var fade = game.add.tween(item);
                    fade.to({alpha: 0}, 500).to({alpha: 10}, 500);
                    fade.to({ alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0);

//                    fade.onComplete.add(function () {
//                        BLOCKS.remove(item);
//                    });
                    fade.start();
                    BLOCKS.remove(item);
                    return;
                }
            },this,true)
        }
    },
    x:function(){
      return [];
    },
    render: function () {
        //game.debug.text(this.result,300,300);
    },
    update: function () {

        if (!this.isInMovingAction) {

            BLOCKS.sort("lastMatrixValue", Phaser.Group.SORT_ASCENDING);
            var clearList = [];
            BLOCKS.forEach(function (item) {
                    var list =this.getClearBlockList(item.lastMatrixValue, item.color);
                    list.forEach(function(value){
                        if(clearList.indexOf(value)===-1){
                            clearList.push(value);
                        }
                    });
            },this,true);
            if (clearList.length != 0) {
                this.clearBlock(clearList);
            }

        }
    }

}