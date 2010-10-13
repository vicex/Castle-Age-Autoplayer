// ==UserScript==
// @name           Castle Age Autoplayer
// @namespace      caap
// @description    Auto player for Castle Age
// @version        !version!
// @dev            !dev!
// @require        http://castle-age-auto-player.googlecode.com/files/jquery-latest.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js
// @require        http://castle-age-auto-player.googlecode.com/files/farbtastic.min.js
// @require        http://castle-age-auto-player.googlecode.com/files/json2.js
// @include        http*://apps.*facebook.com/castle_age/*
// @include        http*://*.facebook.com/common/error.html
// @include        http*://apps.facebook.com/reqs.php#confirm_46755028429_0
// @include        http*://apps.facebook.com/*filter=app_46755028429*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.0+, Google Chrome 4+, Chromium 4+, Flock 2.0+
// ==/UserScript==

/*jslint white: true, browser: true, devel: true, undef: true, nomen: true, bitwise: true, plusplus: true, immed: true, regexp: true, eqeqeq: true */
/*global window,unsafeWindow,$,GM_log,console,GM_getValue,GM_setValue,GM_xmlhttpRequest,GM_openInTab,GM_registerMenuCommand,XPathResult,GM_deleteValue,GM_listValues,GM_addStyle,CM_Listener,CE_message,ConvertGMtoJSON,localStorage */

var caapVersion  = "!version!",
    devVersion   = "!dev!",
    hiddenVar    = true;

///////////////////////////
//       Prototypes
///////////////////////////

String.prototype.ucFirst = function () {
    var firstLetter = this.substr(0, 1);
    return firstLetter.toUpperCase() + this.substr(1);
};

String.prototype.stripHTML = function (html) {
    return this.replace(new RegExp('<[^>]+>', 'g'), '').replace(/&nbsp;/g, '');
};

String.prototype.regex = function (r) {
	var a = this.match(r),
        i;

	if (a) {
		a.shift();
		for (i = 0; i < a.length; i += 1) {
			if (a[i] && a[i].search(/^[\-+]?[0-9]*\.?[0-9]*$/) >= 0) {
				a[i] = parseFloat(a[i]);
			}
		}
		if (a.length === 1) {
			return a[0];
		}
	}

	return a;
};

///////////////////////////
//       Objects
///////////////////////////

var image64  = {},
    utility  = {},
    config   = {},
    state    = {},
    css      = {},
    gm       = {},
    nHtml    = {},
    sort     = {},
    schedule = {},
    general  = {},
    monster  = {},
    battle   = {},
    town     = {},
    gifting  = {},
    caap     = {};
