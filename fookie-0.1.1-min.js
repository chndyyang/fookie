﻿/**
 * @Script:     Fookie.js 
 * @Licence:	MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @Author: 	xushengs@gmail.com
 * @Website: 	http://code.google.com/p/fookie/
 * @Version: 	0.1.1
 * @Creation: 	Jan 8, 2009
 * @Modified: 	July 20, 2009
 * @Description:
 *		A tool class to user swf to save data to local
 */
var Fookie = { isReady: false, swf: null, swfId: 'fookie_swf_' + Math.round(Math.random() * 100), swfUrl: 'fookie.swf', application: 'fookie_data', path: '/', expires: 1000, secure: false, onready: function() { },  imReady: function() { this.isReady = true; this.swf = document[this.swfId] ? document[this.swfId] : window[this.swfId]; this.onready()}, init: function(url, options) {                if (url) { this.swfUrl = url} options = options || {}; this.onready = options.onready ? options.onready : this.onready; this.application = options.application ? options.application : this.application; this.path = options.path ? options.path : this.path; this.expires = options.expires ? options.expires : this.expires; this.secure = options.secure ? true : this.secure; this._waitDomReady()}, write: function(key, dat, options) {                options = options || {}; var a = options.application ? options.application : this.application; var p = options.path ? options.path : this.path; var e = options.expires ? options.expires : this.expires; var s = options.secure ? true : this.secure; if (this.swf && this.swf.write) { return this.swf.write(key, dat, a, p, e, s)} return null}, read: function(key, options) {            options = options || {}; var a = options.application ? options.application : this.application; var p = options.path ? options.path : this.path; var s = options.secure ? true : this.secure; if (this.swf && this.swf.read) { return this.swf.read(key, a, p, s)} }, remove: function(key, options) {            options = options || {}; var a = options.application ? options.application : this.application; var p = options.path ? options.path : this.path; var s = options.secure ? true : this.secure; if (this.swf && this.swf.remove) { return this.swf.remove(key, a, p, s)} }, clear: function(options) {           options = options || {}; var a = options.application ? options.application : this.application; var p = options.path ? options.path : this.path; var s = options.secure ? true : this.secure; if (this.swf && this.swf.clear) { return this.swf.clear(a, p, s)} }, _writeSwf: function() { var s = [ '<object id="', this.swfId, '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="215" height="138">', '<param name="movie" value="', this.swfUrl, '" />', '<param name="quality" value="high" />', '<param name="allowscriptaccess" value="samedomain" />', '<embed name="', this.swfId, '" src="', this.swfUrl, '" allowscriptaccess="samedomain" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="215" height="138"></embed>', '</object>'].join(''); var div = document.createElement('div'); div.style.cssText = 'display:block;border:none;width:1px;height:1px;overflow:hidden;'; document.body.appendChild(div); div.innerHTML = s}, _waitDomReady: function() { var ua = navigator.userAgent.toLowerCase(); var bs = { safari:/webkit/.test(ua), opera:/opera/.test(ua), msie:/msie/.test(ua) && !/opera/.test(ua), mozilla:/mozilla/.test(ua) && !/(compatible|webkit)/.test(ua) }; if (bs.mozilla || bs.opera) { document.addEventListener("DOMContentLoaded", Fookie._domready, false)} else if (bs.msie) { document.write("<script id=__ie_onload defer=true src=javascript:void(0)></script>"); var script = document.getElementById("__ie_onload"); if (script) { script.onreadystatechange = function() { if (this.readyState == "complete") { Fookie._domready()} }} script = null} else if (bs.safari) { Fookie.safariTimer = setInterval(function() { if (document.readyState == "loaded" || document.readyState == "complete") { clearInterval(Fookie.safariTimer); Fookie.safariTimer = null; Fookie._domready()} }, 10)} }, _domready: function() { Fookie._writeSwf()} }; 