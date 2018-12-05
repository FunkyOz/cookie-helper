"use strict";

var Cookies = function () {
    this.cookies = this.getAll();
};

Cookies.prototype.getAll = function () {
    var cookies = document.cookie.split(";");
    var outputCookies = {};
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        cookie = cookie.split("=");
        if (cookie[1] === "true") {
            cookie[1] = true;
        } else if (cookie[1] === "false") {
            cookie[1] = false;
        } else if (!isNaN(cookie[1])) {
            cookie[1] = Number(cookie[1]);
        }
        outputCookies[cookie[0]] = cookie[1];
    }
    return outputCookies;
};

Cookies.prototype.set = function (cName, cValue, days, path) {
    if (!days) {
        days = 1;
    }
    if (!path) {
        path = "path=/";
    }
    if (typeof cName === "undefined") {
        return false;
    }
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cValue + ";" + expires + ";" + path;
    if (days > 0) {
        this.cookies[cName] = cValue;
    }
};

Cookies.prototype.get = function (cName) {
    return this.cookies[cName];
};

Cookies.prototype.exists = function (name) {
    return typeof this.getCookie(name) !== "undefined";
};

Cookies.prototype.delete = function (name) {
    if (!this.exists(name)) {
        return false;
    }
    this.setCookie(name, "", -1);
    return true;
};

Cookies.prototype.deleteAll = function () {
	document.cookie = "";
	return true;
};