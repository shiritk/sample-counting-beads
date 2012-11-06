----------------------------------------------------------------------------
												
    COUNTING BEADS Modificatin Notes

----------------------------------------------------------------------------
This sample application is modified from original Tizen* Counting Beads game app. 
It is ported to work with PhoneGap* on Android* and Windows 8* UI. The app 
demonstrates the use of the jQuery and jQuery Mobile libraries and targets
young kids to teach them the basic counting.

License Information Follows
---------------------------
* abstract.txt
* app.json
* screenshot.png
* config.xml
* index.html
* css/countingBeads.css
* css/default.css
* css/deviceCheck.js
* css/license.css
* js/countingBeads.js
* js/default.js
* js/deviceCheck.js
* js/license.js
* js/mediaSound.js

License Information Follows
---------------------------
Copyright (c) 2012, Intel Corporation

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.

- Neither the name of Intel Corporation nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

----------------------------------------------------------------------------
Original Author and License
Author : Sirisha Muppavarapu <sirisha.muppavarapu@intel.com>

Technical Details: This application is written using HTML5/css3/jquery 
javascript library and is distributed under Apache2.0 license. 
Apache2.0 license: LICENSE.txt
----------------------------------------------------------------------------

License for the app is found in the file "LICENSE" and the license for 
JQuery and assets components is as below:

----------------------------------------------------------------------------
jQuery JavaScript Library v1.7.2: js\jquery-1.7.2.min.js
Copyright 2011, John Resig
Dual licensed under the MIT or GPL Version 2 licenses.
http://jquery.org/license

IMAGES: *.png; images/*.png
----------------------------------------------------------------------------
all images are created by Intel Corp.
they are licensed under the Creative Commons Attribution 3.0 license
http://creativecommons.org/licenses/by/3.0/us/

FONTS: *.ttf
----------------------------------------------------------------------------
Google web font - Slackey
http://www.google.com/webfonts#UsePlace:use/Collection:Slackey
Apache License, version 2.0


SOUNDS
----------------------------------------------------------------------------
BeginGame.ogg, .mp3
Origin: http://www.freesound.org/people/JKrint1/sounds/53440/
License: http://creativecommons.org/licenses/sampling+/1.0/
Origin: http://www.freesound.org/people/sdfalk/sounds/2509/
License: http://creativecommons.org/licenses/by/3.0/

Good_FillCup.ogg, .mp3
Origin: http://www.freesound.org/people/Pogotron/sounds/65498/
License: http://creativecommons.org/licenses/sampling+/1.0/

Good_GameWin.ogg, .mp3
Origin: http://www.freesound.org/people/Pogotron/sounds/65498/
License: http://creativecommons.org/licenses/sampling+/1.0/
Origin: http://www.freesound.org/people/joedeshon/sounds/79678/
License: http://creativecommons.org/licenses/by/3.0/
Origin: http://radarflora.com
License: http://creativecommons.org/licenses/by/3.0/

IntroMusic_Loop.ogg, .mp3
Origin: http://radarflora.com
License: http://creativecommons.org/licenses/by/3.0/

IntroMusic.ogg, .mp3
Origin: http://radarflora.com
License: http://creativecommons.org/licenses/by/3.0/

MoveBead.ogg, .mp3
Origin: http://www.freesound.org/people/batchku/sounds/10415/
License: http://creativecommons.org/publicdomain/zero/1.0/
Origin: http://www.freesound.org/people/itsallhappening/sounds/48792/
License: http://creativecommons.org/licenses/sampling+/1.0/
Origin: http://www.freesound.org/people/123jorre456/sounds/46631/
License: http://creativecommons.org/publicdomain/zero/1.0/

StartClick.ogg, .mp3
Origin: http://www.freesound.org/people/ice9ine/sounds/21695/
License: http://creativecommons.org/licenses/sampling+/1.0/
Origin: http://www.freesound.org/people/kijjaz/sounds/16737/
License: http://creativecommons.org/licenses/by/3.0/
Origin: http://www.freesound.org/people/Dalibor/sounds/34266/
License: http://creativecommons.org/publicdomain/zero/1.0/


Cordova (PhoneGap) Library
--------------------------
* cordova.js (cordova-2.0.0.js)

* source:  http://www.phonegap.com/
* license:  http://www.apache.org/licenses/LICENSE-2.0.html


Ben Alman's jquery throttle-debounce plugin: js\jquery.ba-throttle-debounce.js
--------------------------
* source: https://github.com/cowboy/jquery-throttle-debounce
* Dual licensed under the MIT and GPL licenses: http://benalman.com/about/license/ 
 

Apache License, version 2.0
--------------------------
* Original CountingBeads source https://01.org/html5webapps/webapps/counting-beads
* license: http://www.apache.org/licenses/LICENSE-2.0


KNOWN ISSUES
--------------------------------------------------------------------------------------
1) At end of a game when user asked to start over if there is no input from user in about 5 seconds 
the app will start with out the user input
2) When packaging the game with PhoneGap, the introduction music will only play once instead of looping. 