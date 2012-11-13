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

var lictimer;

function onclickLicenseBtn() {
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
    if (typeof window.device !== "undefined") { // running in PhoneGap

        $.get('README.txt', function (data) {
            var divLicense = document.getElementById("licensetext");
            divLicense.innerText = data;
        });
    }  else {
        // running as web app from Browser, so use iframe to display the README.txt
        console.log("***Test: read README.txt iframe");

        var licPage = document.getElementById("licensepage");
        var licEle = document.getElementById("licensetext");

        var frmEle = document.createElement("iframe");

        // Web page 
        frmEle.setAttribute("src", "README.txt");

        frmEle.style.height = window.innerHeight * 0.88 + "px";
        frmEle.style.width = window.innerWidth * 0.995 + "px";

        licPage.replaceChild(frmEle, licEle);

        frmEle.setAttribute('id', "licensetext");
    }
}