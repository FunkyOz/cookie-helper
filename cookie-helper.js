function CookieHelper(cName, cValue, days, path) {
	if (!days) days = 1;
	if (!path) path = "path=/";
	this.cookies = {};
	this.setCookie(cName, cValue, days, path);
	this.cookies = this.getCookies();
}
CookieHelper.prototype.getCookies = function() {
	var cookies = document.cookie.split(";");
	var outputCookies = {};
	for(var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		while (cookie.charAt(0) == " ") {
			cookie = cookie.substring(1);
		}
		cookie = cookie.split("=");
		if(cookie[1] == "true") {
			cookie[1] = true;
		}else if(cookie[1] == "false") {
			cookie[1] = false;
		}else if(!isNaN(cookie[1])) {
			cookie[1] = Number(cookie[1]);
		}
		outputCookies[cookie[0]] = cookie[1];
	}
	return outputCookies;
};
CookieHelper.prototype.setCookie = function(cName, cValue, days, path) {
	if (!days) days = 1;
	if (!path) path = "path=/";
	if(typeof cName === "undefined") return false;
	var d = new Date();
	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cName + "=" + cValue + ";" + expires + ";" + path;
	if(days > 0) this.cookies[cName] = cValue;
}
CookieHelper.prototype.getCookie = function(cName) {
	return this.cookies[cName];
}
CookieHelper.prototype.checkCookie = function(name) {
	return typeof this.getCookie(name) !== "undefined";
}
CookieHelper.prototype.deleteCookie = function(name) {
	if(!this.checkCookie(name)) return false;
	this.setCookie(name, "", -1);
	return true;
}