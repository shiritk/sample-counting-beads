/*
* Copyright (c) 2012, Intel Corporation. All rights reserved.
* File revision: 04 October 2012
* Please see http://software.intel.com/html5/license/samples 
* and the included README.md file for license terms and conditions.
*
* This program is licensed under the terms and conditions of the 
* Apache License, version 2.0.  The full text of the Apache License is at
* http://www.apache.org/licenses/LICENSE-2.0
*
*/

var lictimer;

function touchScroll(id){
    if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPos=0;

		el.addEventListener("touchstart", function(event) {
			scrollStartPos=this.scrollTop+event.touches[0].pageY;
			event.preventDefault();
		},false);

		el.addEventListener("touchmove", function(event) {
			this.scrollTop=scrollStartPos-event.touches[0].pageY;
			event.preventDefault();
		},false);
	}
}

function isTouchDevice(){
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}
function onclickInfoBtn() {
    var lpage = document.getElementById("licensepage");
    var hpage = document.getElementById("introPage");

    /* display the license page, hide intro-page*/
    hpage.style.display = "none";
    lpage.style.display = "block";
}

function onclickLicBack()
{
    var lpage = document.getElementById("licensepage");
    var hpage = document.getElementById("introPage");
    hpage.style.display = "block";
    lpage.style.display = "none";
    if (lictimer) {
        clearInterval(lictimer);
        lictimer = null;
    }
}

function loadLicenseTxt() {
   $.get('README.txt', function (data) {
        var divLicense = document.getElementById("licensetext");
        divLicense.innerText = data;
    });
}