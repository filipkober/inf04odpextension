"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
fetch("https://inf04.nigdit.men/api/questions").then(function (res) { return res.json(); }).then(function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var clickButtons, highlightColor, delay;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.sync.get('clickButtons').then(function (res) { return res.clickButtons; })];
            case 1:
                clickButtons = _a.sent();
                return [4 /*yield*/, browser.storage.sync.get('highlightColor').then(function (res) { return res.highlightColor; })];
            case 2:
                highlightColor = _a.sent();
                return [4 /*yield*/, browser.storage.sync.get('delay').then(function (res) { return res.delay; })];
            case 3:
                delay = _a.sent();
                setTimeout(function () { return zaznaczPytania(data, { clickButtons: clickButtons || false, highlightColor: highlightColor || "#008000" }); }, delay || 1000);
                return [2 /*return*/];
        }
    });
}); }).catch(function (err) { return console.error(err); });
var zaznaczPytania = function (odpowiedzi, _a) {
    var _b = _a.clickButtons, clickButtons = _b === void 0 ? false : _b, _c = _a.highlightColor, highlightColor = _c === void 0 ? "#008000" : _c;
    return __awaiter(void 0, void 0, void 0, function () {
        var pytania, _loop_1, i;
        var _d, _e;
        return __generator(this, function (_f) {
            pytania = document.querySelectorAll('.trescE');
            _loop_1 = function (i) {
                var elementPytanie = pytania[i - 1];
                var odpowiedzA = document.querySelector("#odpa".concat(i));
                var odpowiedzB = document.querySelector("#odpb".concat(i));
                var odpowiedzC = document.querySelector("#odpc".concat(i));
                var odpowiedzD = document.querySelector("#odpd".concat(i));
                if (!elementPytanie || !odpowiedzA || !odpowiedzB || !odpowiedzC || !odpowiedzD)
                    throw new Error('[ROZSZERZENIE]: Brak pytania lub odpowiedzi');
                var trescPytania = (_d = elementPytanie.textContent) === null || _d === void 0 ? void 0 : _d.slice(3);
                var odpowiedzNaPytanie = odpowiedzi.find(function (p) { return trescPytania === null || trescPytania === void 0 ? void 0 : trescPytania.toLowerCase().includes(p.tresc.toLowerCase()); });
                if (!odpowiedzNaPytanie) {
                    var pierwsze10Znakow_1 = trescPytania === null || trescPytania === void 0 ? void 0 : trescPytania.substring(5, 15).toLowerCase();
                    console.warn("[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie, szukam w miarę dopasowanej odpowiedzi");
                    odpowiedzNaPytanie = odpowiedzi.find(function (q) { return q.tresc.toLowerCase().includes(pierwsze10Znakow_1 || ''); });
                }
                if (!odpowiedzNaPytanie)
                    throw new Error('[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie');
                var odpowiedziNaPytanie = [odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD];
                for (var _i = 0, odpowiedziNaPytanie_1 = odpowiedziNaPytanie; _i < odpowiedziNaPytanie_1.length; _i++) {
                    var odpowiedz = odpowiedziNaPytanie_1[_i];
                    if (((_e = odpowiedz.textContent) === null || _e === void 0 ? void 0 : _e.slice(3).toLowerCase().trim()) === odpowiedzNaPytanie.odpowiedz.toLowerCase().trim()) {
                        if (clickButtons) {
                            odpowiedz.click();
                        }
                        else {
                            odpowiedz.style.backgroundColor = highlightColor;
                        }
                    }
                }
            };
            for (i = 1; i <= pytania.length; i++) {
                _loop_1(i);
            }
            return [2 /*return*/];
        });
    });
};
