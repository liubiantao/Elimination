/**
 * Created by wuyanc on 1/19/2015.
 */



var size= 49;
var sizex= 7;
var sizey=7;
var matrix=[];
for(var i =0;i!=size;i++)
{
    matrix[i]=0;
}

function canBeMoved(startP,destP){
    var viewedNode=[];
    viewedNode.push(startP);  //the node which has been viewed(explored).
    var cursor=0; //the pointer of viewedNode
    do{

        if(viewedNode.indexOf(destP)!== -1 )//find it
            return 0;
        var currentPosition = viewedNode[cursor];
        var leftPosition = currentPosition-1;
        if(matrix[leftPosition]!=1 &&leftPosition>=0&&currentPosition%sizex!=0) //isn't in
        {
            if(viewedNode.indexOf(leftPosition)=== -1)
                viewedNode.push(leftPosition);
        }
        var rightPosition = currentPosition +1;
        if(matrix[rightPosition]!=1 &&rightPosition < size && (rightPosition)%sizex!=0)
        {
            if(viewedNode.indexOf(rightPosition)=== -1) //hasn't contain
            {
                viewedNode.push(rightPosition)
            }
        }
        var topPosition = currentPosition - sizex;
        if(matrix[topPosition]!=1 &&topPosition>=0)
        {
            if(viewedNode.indexOf(topPosition)=== -1)
            {
                viewedNode.push(topPosition);
            }
        }
        var bottomPosition = currentPosition +  sizex;
        if(matrix[bottomPosition]!=1 && bottomPosition <   size)
        {
            if(viewedNode.indexOf(bottomPosition)=== -1){
                viewedNode.push(bottomPosition);
            }
        }
        cursor++;

    }while(cursor!=viewedNode.length)

    return -1;
}


//matrix[1]=1;
//matrix[7]=1;
//
////test
//var r =canBeMoved(0,1);
//alert(r);
//
alert(canBeMoved(0,48));
