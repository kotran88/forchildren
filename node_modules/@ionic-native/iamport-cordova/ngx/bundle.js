'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var IamportCordova = /** @class */ (function (_super) {
    tslib.__extends(IamportCordova, _super);
    function IamportCordova() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IamportCordova.prototype.payment = function (paymentObject) { return core.cordova(this, "payment", {}, arguments); };
    IamportCordova.prototype.certification = function (certificationObject) { return core.cordova(this, "certification", {}, arguments); };
    IamportCordova.pluginName = "IamportCordova";
    IamportCordova.plugin = "iamport-cordova";
    IamportCordova.pluginRef = "cordova.plugins.IamportCordova";
    IamportCordova.repo = "https://github.com/iamport/iamport-cordova";
    IamportCordova.platforms = ["ios", "android"];
    IamportCordova.decorators = [
        { type: core$1.Injectable }
    ];
    return IamportCordova;
}(core.IonicNativePlugin));

exports.IamportCordova = IamportCordova;
