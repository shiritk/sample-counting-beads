/*
* Copyright (c) 2012, Intel Corporation
* File revision: 04 October 2012
* Please see http://software.intel.com/html5/license/samples 
* and the included README.md file for license terms and conditions.
*
* This program is licensed under the terms and conditions of the 
* Apache License, version 2.0.  The full text of the Apache License is at
* http://www.apache.org/licenses/LICENSE-2.0
*
*/

var beadImages = ["./images/fruit/strawberry.png", "./images/fruit/orange.png", "./images/fruit/pear.png", "./images/fruit/lime.png", "./images/fruit/blueberry.png"];
var counterImages = ["./images/counter dots/red_counter.png", "./images/counter dots/orange_counter.png", "./images/counter dots/yellow_counter.png", "./images/counter dots/green_counter.png", "./images/counter dots/blue_counter.png"];
var numColors = ["#e7462b", "#ff8b0e", "#ffd321", "#9fca38", "#20abc4"];
var beadCount = 10;
var beadRows = 5;
var questions = [];
var fruits = [];
var gamePage = 1;
var howToPage = 2;
var beadsPos = [];
var totalCount = 0;
var gpMsg = [];
var curWinWidth=0; 
var fruiteBarPopulatedGamePage=0; 
var fruiteBarPopulatedHowtoPage=0; 
var init_done=false;

var introMusicLoop, beginGame, fillCup, gameWin, introMusic, moveBead, startClick;

function fruit(image,width,height)
{
	this.image = image;
	this.width = width;
	this.height = height;
}

function question(rowIndex,number, numColor, image, msg, answered)
{
	this.rowIndex = rowIndex;
	this.number = number;
	this.numColor = numColor;
	this.image = image;
	this.msg = msg;
	this.answered = answered;
}

function populateQuestions()
{
	var num = 0;
	var numColor = 0;
	var imgIndex = 0;
	var colorSelected = [0,0,0,0,0];
	var questCount = 0;
	if(questions.length > 0)
		questions = [];
	
	for(var i=0;questCount<3;i++) {
		
		num = Math.floor(Math.random() * beadCount)+1;
		imgIndex = Math.floor(Math.random() * beadRows);
		if(colorSelected[imgIndex] == 0) {
			colorSelected[imgIndex] = 1;
			numColor = numColors[imgIndex];
			questions.push(new question(imgIndex,num,numColor,counterImages[imgIndex],gpMsg[imgIndex],false));		
			questCount++;
		}
		
	}	
	
	for(var i=0;i<3;i++) {
		var elem = document.querySelector("#gamePage #quest"+(i+1)+"Num");
		elem.innerText = questions[i].number;
		elem.style.color = questions[i].numColor;
		elem = document.querySelector("#gamePage #quest"+(i+1)+"Bead");
		elem.style.backgroundImage = "url('"+questions[i].image+"')";
		elem = document.querySelector("#gamePage #quest"+(i+1)+"Msg");
		elem.innerText = questions[i].msg;
		elem.style.color = questions[i].numColor;
	}
}

function populateFruits()
{
	fruits.push(new fruit("url('./images/fruit/strawberry.png')",46,53));
	fruits.push(new fruit("url('./images/fruit/orange.png')",43,46));
	fruits.push(new fruit("url('./images/fruit/pear.png')",46,63));
	fruits.push(new fruit("url('./images/fruit/lime.png')",43,46));
	fruits.push(new fruit("url('./images/fruit/blueberry.png')",43,46));
}

function populateBars(fromPage)
{
	var prefix = "";
	
	if(fromPage == gamePage) {
        fruiteBarPopulatedGamePage = 1; 
		prefix = "gp";
	} else if(fromPage == howToPage) {
        fruiteBarPopulatedHowtoPage = 1; 
		prefix = "htp";
    }
	
	for(var i=0;i<5;i++) {
		var elem = document.getElementById(prefix+"Bar"+i);
        // set fruite image size: each bar holds 15 fruits; bar-width: window.innerWidth*0.66
        var imgwidth = (window.innerWidth*0.66)/15.0;
        var imgscale = imgwidth/fruits[(i)].width;
        var leftwidth = 0;

		for(var idx=0;idx<beadCount;idx++) {
			var child = document.createElement("div");
            child.className = "fruiteimg";
			child.style.height = fruits[(i)].height*imgscale+"px";
			child.style.width = imgwidth+"px";
            child.style.top = "0px";
            child.style.left = leftwidth+"px"; 
			child.style.backgroundImage = fruits[(i)].image;
			child.style.backgroundSize = "100% 100%";
			child.style.display = "block";
			child.style.position = "absolute"; 

            if(child.dataset) {
			    child.dataset.x = (i);
			    child.dataset.y = (idx);	
            } else {
			    child.setAttribute('data-x', (i));
			    child.setAttribute('data-y', (idx));
            }

			if(fromPage == gamePage) {
				child.addEventListener("click", handleBeadClick, false);
				child.style.cursor = "pointer";			
			}
            leftwidth += imgwidth;
			elem.appendChild(child);	
		}		
	}
	
}

function initCells()
{
	if(beadsPos.length > 0)
		beadsPos = [];
	
	var barWidth = window.innerWidth*0.66; 
	for(var i=0;i<fruits.length;i++) {
		var leftRightBead =	{
			cellsInRow : 15, 
			leftBeads : beadCount,
			rightBeads : 0,
		};
		beadsPos.push(leftRightBead);	
	}

	totalCount = 0;
}

function handleStartClick(e) 
{
	populateQuestions(); 
	introMusicLoop.pause();
	beginGame.play();
	var elem = document.getElementById("introPage");
	elem.style.display = "none";
	
	elem = document.getElementById("finishPage");
	elem.style.display = "none";
	
	elem = document.getElementById("howToPage");
	elem.style.display = "none";
	
	elem = document.getElementById("gamePage");
	elem.style.display = "block";
	
	runQuestionsAnimation();

}

function handleHowToClick(e) 
{
	populateBars(howToPage);
	var elem = document.getElementById("introPage");
	elem.style.display = "none";
	
	elem = document.getElementById("finishPage");
	elem.style.display = "none";
	
	elem = document.getElementById("gamePage");
	elem.style.display = "none";
	
	elem = document.getElementById("howToPage");
	elem.style.display = "block";

	$('#htpQuest1').fadeIn(2, function() {
		$('#htpQuest2').fadeIn(2, function() {
			$('#htpQuest3').fadeIn(2, function() {
				$('#htpQuest4').fadeIn(2, function() {
				});
			}); 
		});
	}); 
	
	runHowToAnimation();
    
}


function handleRestartClick(e) 
{
	beginGame.play();	
	moveBackBeadsToPosition();
	populateQuestions(); 	
	setKudoMsg(-1,-1,-1,true);
	runQuestionsAnimation();
}


function handleHowToRestartClick(e) 
{
	clearHowToAnimation();
	clearGame();
	
	var elem = document.getElementById("introPage");
	elem.style.display = "block";
	
	elem = document.getElementById("howToPage");
	elem.style.display = "none";
	
	elem = document.getElementById("gamePage");
	elem.style.display = "none";
	
	elem = document.getElementById("finishPage");
	elem.style.display = "none";
}

function handleNewClick(e)
{
	var elem = document.getElementById("finishPage");
	$(elem).fadeOut(50, function() {		
		elem = document.getElementById("introPage");
		$(elem).fadeIn(50,function() { 
			moveBackBeadsToPosition();
			setKudoMsg(-1,-1,-1,true);
			introMusicLoop.play();
		});
	});
}

function startNewGame(e)
{
	$('#fruitBar').animate({left: '542px'},1500,function(){
		$('#slideMsg').fadeOut(1500, function() { });	
		clearGame();
		populateQuestions();		
		handleRestartClick();
		
		var elem = document.getElementById("finishPage");
		$(elem).fadeOut(500, function() {		
			elem = document.getElementById("gamePage");
			$(elem).fadeIn(500,function() { runQuestionsAnimation(); });
		});
	});
	
}

function handleResizeWin() { 
    // set proper kudo msg after window resized
	for(var i=0;i<3;i++) {	
        var questionIndex=i+1;
		var elemNum = document.getElementById("quest"+questionIndex+"Num");
        var eleKudoMsg = document.getElementById("quest"+questionIndex+"Msg");
        if ($(window).width() > 640) { // if "*" displayed, change to kudo msg.
            if ((elemNum.innerText == "*") && (elemNum.style.display == "block") && (eleKudoMsg.style.display == "none")) {
    		    elemNum.style.display = "none";
                elemNum.innerText = questions[i].number; 
			    eleKudoMsg.style.display = "block";
            } 
        }
        if ($(window).width() <= 640) { // if kudo msg displayed, change to "*".
            if ((elemNum.innerText != "*") && (elemNum.style.display == "none") && (eleKudoMsg.style.display == "block")) {
                elemNum.innerText = "*"; 
    		    elemNum.style.display = "block";
			    eleKudoMsg.style.display = "none";
            } 
        }
	}

    // redraw bar & beads with resized window
    if (fruiteBarPopulatedGamePage == 1)
        repopulateBars(gamePage);
    if (fruiteBarPopulatedHowtoPage == 1)
        repopulateBars(howToPage);
} 

function init() 
{
    if (init_done)
        return; 
    
    init_done = true; 

    $(window).resize($.debounce(250, handleResizeWin));

    // debug music issue
    if (myDeviceSupport.HTML5_audio_mp3)
        console.log("**********HTML5_audio_mp3 is supported"); 
    else if (myDeviceSupport.HTML5_audio_ogg)
        console.log("**********HTML5_audio_ogg is supported"); 
    else if (myDeviceSupport.HTML5_audio_wav)
        console.log("**********HTML5_audio_wav is supported"); 
    else if (myDeviceSupport.HTML5_audio)
        console.log("**********audio tag is not supported"); 
    else
        console.log("**********All audio types are not supported"); 

    // license_init("license", "introPage"); 
    loadLicenseTxt(); 

	//If Chrome i18n is defined, obtain msgs from the locale file else set to default values.	
	if(window.chrome && window.chrome.i18n)
		localizeStrings();
	else {
		setGamePageMsgs();
	}

	introMusicLoop = new gamesound("introMusicLoop", true);
    
	beginGame = new gamesound("beginGame");
	fillCup = new gamesound("fillCup");
	gameWin = new gamesound("gameWin");
	introMusic = new gamesound("introMusic");
	moveBead = new gamesound("moveBead");
	startClick = new gamesound("startClick");

	introMusicLoop.play();

	populateFruits();
	initCells();
	populateBars(gamePage);
	
	var elem = document.getElementById("startBtn");
    elem.addEventListener("click", handleStartClick);
	
	elem = document.getElementById("howToBtn");
	elem.addEventListener("click", handleHowToClick);
	
	elem = document.getElementById("gpRestart");
	elem.addEventListener("click", handleRestartClick);
	
	elem = document.getElementById("fruitBar");
	elem.addEventListener("mouseup", handleDragEnd);	
	elem.addEventListener("click", startNewGame);
	
	elem = document.getElementById("newBtn");
	elem.addEventListener("click", handleNewClick);	
}

function handleDragEnd(e)
{
	startNewGame(e);
}

function localizeStrings()
{
	$("#title").text(chrome.i18n.getMessage("ipTitle"));
	$("#startBtn").text(chrome.i18n.getMessage("ipStart"));
	$("#howToBtn").text(chrome.i18n.getMessage("ipHowTo"));
	
	$("#gpRestart").text(chrome.i18n.getMessage("startOver"));
	
	$("#htpQuest1Msg").text(chrome.i18n.getMessage("htpHowManyBeads"));
	$("#moveMsg").text(chrome.i18n.getMessage("htpMoveBeads"));
	$("#countMsg").text(chrome.i18n.getMessage("htpCountBeads"));
	$("#cupFillMsg").text(chrome.i18n.getMessage("htpCupFill"));
	$("#htpRestart").text(chrome.i18n.getMessage("startOver"));
	
	$("#slideMsg").text(chrome.i18n.getMessage("fpSlideText"));
	$("#finishMsg").text(chrome.i18n.getMessage("fpGoodJob"));
	$("#newBtn").text(chrome.i18n.getMessage("fpNew"));	
	
	gpMsg.push(chrome.i18n.getMessage("gpYouDidIt"));
	gpMsg.push(chrome.i18n.getMessage("gpGoldStar"));
	gpMsg.push(chrome.i18n.getMessage("gpWayToGo"));
	gpMsg.push(chrome.i18n.getMessage("gpKeepCounting"));
	gpMsg.push(chrome.i18n.getMessage("gpAwesomeJob"));	
}

function setGamePageMsgs() 
{
	gpMsg.push("you did it!");
	gpMsg.push("gold star!");
	gpMsg.push("way to go!");
	gpMsg.push("keep counting!");
	gpMsg.push("awesome job!");	
}

function handleBeadClick(event)
{
	var target = event.target;
	var row;
	var col;
    if(target.dataset) {
	    row = target.dataset.x;
	    col = target.dataset.y;
    } else {
	    row = target.getAttribute('data-x');
	    col = target.getAttribute('data-y');
    }
	var fromPos = col;
	var toPos = 0;
	var cellsInRow = beadsPos[row].cellsInRow;
	var validClick = false;
	var questionIndex = 0;
		
	if(row < 0 || col<0 ) return;
		
	for(var i=0;i<3;i++) {
		if(row == questions[i].rowIndex) {
			validClick = true;
			questionIndex = (i+1);	
			break;
		}
	}
	if(!validClick) return;
	
	var beadsToMove = 0;	
	var leftBeads = beadsPos[row].leftBeads;
	var rightBeads = beadsPos[row].rightBeads;
	var fromIndex = 0;
	var toIndex = 0;
	var moveLeft = false;
	var moveRight = false;
	var totalElem = document.querySelector("#gamePage #gpTotal");
		
	if(fromPos >= (cellsInRow-rightBeads)) {
		moveLeft = true;
		beadsToMove = (rightBeads) - (cellsInRow-1-fromPos);	
	} else if((leftBeads-fromPos)>0) {
		moveRight = true;
		beadsToMove = (leftBeads-fromPos);
	} else {
		return;
	}

	for(var i=1;i<beadsToMove;i++) 
	{
		if(moveRight) {
			target = $(target).next();
		} else if(moveLeft){
			target = $(target).prev();
		}
	}
	
	for(var i=1;i<=beadsToMove;i++) 
	{
		fromIndex = 0;
		toIndex = 0;
		if(moveRight && leftBeads>0) {
			fromIndex = (leftBeads-i);
			toIndex = (cellsInRow-rightBeads-i);
			beadsPos[row].leftBeads--;
			beadsPos[row].rightBeads++;			
			totalCount++;
		} else if(moveLeft && rightBeads>0) {
			toIndex = (leftBeads);
			fromIndex = (cellsInRow-rightBeads);
			beadsPos[row].leftBeads++;
			beadsPos[row].rightBeads--;
			if(totalCount>0) {
				totalCount--;
			}
			leftBeads = beadsPos[row].leftBeads;
			rightBeads = beadsPos[row].rightBeads;
		}

		toPos = toIndex*((window.innerWidth*0.66)/15.0);
		
        if($(target)[0].dataset)
		    $(target)[0].dataset.y = (toIndex);	
        else
		    $(target)[0].setAttribute('data-y', (toIndex));	

		moveBead.play();		
		$(target).animate({
			left: toPos
		},1000,'linear',function(){
			totalElem.innerText = totalCount;			
		});
				
		if(moveRight) {
			target = $(target).prev();			
		} else if(moveLeft){
			target = $(target).next();
		}
	}
	setKudoMsg(beadsPos[row].rightBeads,row,questionIndex,false);	
}

function setKudoMsg(rightBeads,row,questionIndex,resetMsgs) 
{
	for(var i=0;i<3;i++) {	
		
		if(resetMsgs) {
			var elem = document.getElementById("quest"+(i+1));
			elem.style.display = "none";
			elem = document.getElementById("quest"+(i+1)+"Msg");
			elem.style.display = "none";
			elem = document.getElementById("quest"+(i+1)+"Num");
			elem.style.display = "block";
			elem = document.getElementById("quest"+(i+1)+"Bead");
			elem.style.display = "block";
			questions[i].answered = false;
		} else if(questions[i].rowIndex == row) {
			if(questions[i].number == rightBeads) {
				var elem;
                console.log("window.width: " + $(window).width());
                if ($(window).width() <= 640) {
                    // do not display msg - too long for the small screen
                    elem = document.getElementById("quest"+questionIndex+"Msg");
				    elem.style.display = "none"; 
				    elem = document.getElementById("quest"+questionIndex+"Num");
                    elem.innerText = "*"; 
    				elem.style.display = "block";
                } else {
                    elem = document.getElementById("quest"+questionIndex+"Msg");
				    elem.style.display = "block";
				    elem = document.getElementById("quest"+questionIndex+"Num");
    				elem.style.display = "none";
                }
				elem = document.getElementById("quest"+questionIndex+"Bead");
				elem.style.display = "none";
				questions[i].answered = true;
			} else {
				var elem;
                elem = document.getElementById("quest"+questionIndex+"Msg");
				elem.style.display = "none";
				elem = document.getElementById("quest"+questionIndex+"Num");
				elem.style.display = "block";
                if ($(window).width() <= 640) {
                    elem.innerText = questions[i].number; 
                } 
				elem = document.getElementById("quest"+questionIndex+"Bead");
				elem.style.display = "block";
				questions[i].answered = false;
			}
			break;
		}
		
	}
	if(resetMsgs) 
		setCupLevels(true);
	else 
		setCupLevels(false);
}

function setCupLevels(clearCup)
{
	var correctAns = 0;
	for(var i=0;i<3;i++) {	
		if(questions[i].answered) 
			correctAns++;
	}
	
	if((correctAns == 0) || clearCup) {
		$('#gpCup').removeClass('quarterCup halfCup fullCup').addClass('emptyCup');
		return;
	} else if(correctAns == 1) {
		$('#gpCup').removeClass('emptyCup halfCup fullCup').addClass('quarterCup');
		fillCup.play();
	} else if(correctAns == 2) {
		$('#gpCup').removeClass('emptyCup fullCup quarterCup').addClass('halfCup');			
		fillCup.play();
	} else if(correctAns == 3) {
		$('#gpCup').removeClass('emptyCup quarterCup halfCup').addClass('fullCup');
		fillCup.play();
		if(!clearCup) {
			setTimeout("showFinalScreen()",7000);			
		}
	}
	
}	

function showFinalScreen()
{
	var correctAns = 0;
	for(var i=0;i<3;i++) {	
		if(questions[i].answered) 
			correctAns++;
	}
	if(correctAns<3) return;
		
	$('#gamePage').delay(500).fadeOut(500,function(){
		$('#fruitBar')[0].style.left = 0;
		$('#slideMsg')[0].style.display = "block";
		gameWin.play();
		$('#finishPage').fadeIn(500,function(){});
	});
}

function moveBackBeadsToPosition()
{
	var beadsToMove = 0;	
	var leftBeads = 0;
	var rightBeads = 0; 
	var fromIndex = 0;
	var toIndex = 0;
	var fromPos = 0;
	var cellsInRow = 0;
	var row = 0;
	var totalElem = document.querySelector("#gamePage #gpTotal");
				
	for(var idx=0;idx<5;idx++) {
		row = idx;
		cellsInRow = beadsPos[row].cellsInRow;
		fromPos = cellsInRow-1;
		leftBeads = beadsPos[row].leftBeads;
		rightBeads = beadsPos[row].rightBeads;		
		beadsToMove = (rightBeads) - (cellsInRow-1-fromPos);
		
		if(rightBeads == 0) continue;
			
		var elem = document.getElementById("gpBar"+idx);
		var children = $(elem).children();
		var lastChild =  $(children).eq(children.length - 1);
		var target = $(lastChild)[0];
		
		for(var i=1;i<beadsToMove;i++) 
		{
			target = $(target).prev();
		}
		for(var i=1;i<=beadsToMove;i++) 
		{
			fromIndex = 0;
			toIndex = 0;
			if(rightBeads>0) {
				toIndex = (leftBeads);
				fromIndex = (cellsInRow-rightBeads);
				beadsPos[row].leftBeads++;
				beadsPos[row].rightBeads--;
				if(totalCount>0) {
					totalCount--;
				}
				leftBeads = beadsPos[row].leftBeads;
				rightBeads = beadsPos[row].rightBeads;
			}

    		toPos = toIndex*((window.innerWidth*0.66)/15.0);
			
            if($(target)[0].dataset)
		        $(target)[0].dataset.y = (toIndex);	
            else
		        $(target)[0].setAttribute('data-y', (toIndex));	
			
			$(target).animate({
				left: toPos
			},1000,'linear',function(){
				totalElem.innerText = totalCount;
			});
			
			target = $(target).next();		
		}
		
	}
	moveBead.play();
}


function runHowToAnimation()
{	
	$('#htpCup').removeClass('fullCup').addClass('emptyCup');
	$('#quest1Hint').fadeIn(250, function() {	
		$('#quest1Hint').delay(4000).fadeOut(250, function() {
				$('#moveBeadsHint').fadeIn(250, function() {
					$('#moveBeadsHint').delay(4000).fadeOut(250, function() {
							$('#countHint').fadeIn(250, function() {
								$('#countHint').delay(4000).fadeOut(250, function() {
										$('#cupFillHint').fadeIn(250, function() {
											runCupAnimation();
											$('#cupFillHint').delay(4000).fadeOut(250, function() {	
												introMusicLoop.pause();	
												beginGame.play();
												handleStartClick(null);
											});
										});
								});
							});
					});	
				});
		});
	});	
}

function runCupAnimation()
{	
	$('#htpCup').queue( function(){
		$(this).delay(500).removeClass('emptyCup').addClass('quarterCup');
		$(this).dequeue();
	});
	
	$('#htpCup').queue( function(){
		$(this).delay(500).removeClass('quarterCup').addClass('halfCup');
		$(this).dequeue();
	});
	$('#htpCup').queue( function(){
		$(this).delay(500).removeClass('halfCup').addClass('fullCup');
		$(this).dequeue();
	});
	fillCup.play();
}

function clearHowToAnimation()
{
	$('#quest1Hint').stop(true, false);
	$('#moveBeadsHint').stop(true, false);
	$('#countHint').stop(true, false);
	$('#cupFillHint').stop(true, false);
	$('#quest1Hint').fadeOut(5, function() {});
	$('#moveBeadsHint').fadeOut(5, function() {});
	$('#countHint').fadeOut(5, function() {});
	$('#cupFillHint').fadeOut(5, function() {});
}

function runQuestionsAnimation()
{
	$('#quest1').fadeIn(500, function() {
		$('#quest2').fadeIn(500, function() {
			$('#quest3').fadeIn(500, function() {
				$('#quest4').fadeIn(500, function() {
				});
			});
		});
	});
}


function clearGame()
{
	$('#quest1').stop(true, false);
	$('#quest2').stop(true, false);
	$('#quest3').stop(true, false);
	$('#quest4').stop(true, false);
	$('#quest1').fadeOut(5, function() {});
	$('#quest2').fadeOut(5, function() {});
	$('#quest3').fadeOut(5, function() {});
	$('#quest4').fadeOut(5, function() {});	
}

function onDeviceReady() {
    console.log("onDeviceReady: Phonegap version " + window.device.cordova);
	init();
}

$(document).ready(function()
{
    console.log("*****document.ready and init.");

    // call init() to initialize data
    // it should be called only once. 
    // But when using PhoneGap, "DeviceReady" event is usually fired after this call. So use setTimeout().
    setTimeout("init()", 1000);
});

function repopulateBars(fromPage)
{
	var prefix = "";
	
	if(fromPage == gamePage)
		prefix = "gp";
	else if(fromPage == howToPage) 
		prefix = "htp";
	
    var imgwidth = (window.innerWidth*0.66)/15.0;

	for(var i=0;i<5;i++) {
		var elem = document.getElementById(prefix+"Bar"+i);
        // set fruite image size: each bar holds 15 fruits; bar-width: window.innerWidth*0.66
        var imgscale = imgwidth/fruits[(i)].width;

		for(var idx=0;idx<beadCount;idx++) {
			var child = elem.childNodes[idx+1]; // document.createElement("div");
			child.style.height = fruits[(i)].height*imgscale+"px";
			child.style.width = imgwidth+"px";

            if(child.dataset)
                child.style.left = child.dataset.y * imgwidth+"px";
            else
                child.style.left = child.getAttribute('data-y') * imgwidth+"px";
		}		
	}
}

window.onblur = function () {
    if (introMusicLoop)
        introMusicLoop.blur(); 
};

window.onfocus = function () {
    if (introMusicLoop)
        introMusicLoop.focus(); 
};
