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

function gamesound(id, loop) {
    var me = this;
    this.id = id;
    this.enable = false;
    this.infocus = true;
    this.checkPosTimer;
    this.mediaobj = null;

    if (window.device) // if phonegap is used: 
    {
        if (phoneCheck.android) // android
            this.mediaobj = new Media("/android_asset/www/audiomp3/" + id + ".mp3", this.mediaCallSuccess, this.mediaCallError);
        else if (phoneCheck.iphone) // iPhone
            this.mediaobj = new Media("/audiomp3/" + id + ".mp3", this.mediaCallSuccess, this.mediaCallError);
        else if (phoneCheck.windows7) // windows 7.1 phone
            this.mediaobj = new Media("/app/www/audiomp3/" + id + ".mp3", this.mediaCallSuccess, this.mediaCallError);
    } else
        this.mediaobj = document.getElementById(id);

    // Media() success callback
    this.mediaCallSuccess = function onMediaCallSuccess() {
    }
    // Media() error callback
    this.mediaCallError = function onMediaCallError(error) {
        console.log("@@@@@@@@@@new Media() failed.");
    }

    this.loop = (loop == undefined) ? false : loop;
    this.focus = function () {
        if (!me.infocus) {
            me.infocus = true;
            if (me.enable && me.loop && me.mediaobj)
                me.mediaobj.play();
        }
    };
    this.blur = function () {
        if (me.infocus) {
            me.infocus = false;
            if (me.enable && me.loop && me.mediaobj)
                me.mediaobj.pause();
        }
    };

    window.addEventListener('focus', this.focus, false);
    window.addEventListener('blur', this.blur, false);

    this.play = function () {
        console.log("*****in media " + this.id + " play() function.");
        this.enable = true;
        if (this.infocus && this.mediaobj) {
            // me.mediaobj.play({ numberOfLoops: "infinite" }); // does not work in phonegap
            this.mediaobj.play();
            console.log("*****media " + this.id + " is playing");
        }
    };
    this.pause = function () {
        this.enable = false;
        if (this.mediaobj)
            this.mediaobj.pause();
    };
    this.stop = function () {
        this.enable = false;
        if (this.mediaobj)
            this.mediaobj.stop();
    }
}
