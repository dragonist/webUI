var startclientX;
var srartclientY;

var endclientX;
var endclientY;

var leftPoint=0;


var targetEle = document.getElementById("bookSelf");
targetEle.addEventListener("touchstart",function(e){
	startclientX=e.targetTouches[0].clientX;
	startclientY=e.targetTouches[0].clientY;
},false);
// targetEle.addEventListener("touchmove",function(e){
// 	startclientX=e.targetTouches[0].clientX;
// 	startclientY=e.targetTouches[0].clientY;
// },false);
targetEle.addEventListener("touchend",function(e){
	endclientX=e.changedTouches[0].clientX;
	endclientY=e.changedTouches[0].clientY;
	canMove();
},false);

function canMove(){
	var moveLineX=endclientX-startclientX;
	var moveLineY=endclientY-startclientY;
	if(Math.abs(moveLineY)>200){
		return;
	}
	if(Math.abs(moveLineX)<50){
		return;
	}
	if(moveLineX>0){
		showLeft();
	}
	if(moveLineX<0){
		showRight();
	}
}
function showLeft(){
	leftPoint+=100;
	targetEle.style.position="relative";
	targetEle.style.left=leftPoint;
}
function showRight(){
	leftPoint-=100;
	targetEle.style.position="relative";
	targetEle.style.left=leftPoint;
}