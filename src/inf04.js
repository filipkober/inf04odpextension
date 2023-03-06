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
var _this = this;
fetch("https://inf04.nigdit.men/api/questions").then(function (res) { return res.json(); }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
    var clickButtons, newButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, browser.storage.sync.get('clickButtons').then(function (res) { return res.clickButtons; })];
            case 1:
                clickButtons = _a.sent();
                newButton = document.querySelector('#losujnowe');
                if (!newButton)
                    throw new Error('Brak przycisku');
                setTimeout(function () { return nowePytanie(data, clickButtons || false); }, 1000);
                return [2 /*return*/];
        }
    });
}); })["catch"](function (err) { return console.error(err); });
var nowePytanie = function (odpowiedzi, clickButtons) {
    if (clickButtons === void 0) { clickButtons = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var obecnePytania, odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD, obecnePytanie, wszystkieOdp, odpowiedz, looseSearch, _i, wszystkieOdp_1, ans, htmlAns;
        return __generator(this, function (_a) {
            if (!(!!odpowiedzi))
                throw new Error('[ROZSZERZENIE]: Brak odpowiedzi');
            obecnePytania = document.querySelector('.tresc');
            odpowiedzA = document.querySelector('#odpa');
            odpowiedzB = document.querySelector('#odpb');
            odpowiedzC = document.querySelector('#odpc');
            odpowiedzD = document.querySelector('#odpd');
            if (!obecnePytania || !odpowiedzA || !odpowiedzB || !odpowiedzC || !odpowiedzD)
                throw new Error('[ROZSZERZENIE]: Brak pytania lub odpowiedzi');
            obecnePytanie = obecnePytania.textContent;
            if (!obecnePytanie)
                throw new Error('[ROZSZERZENIE]: Brak pytania');
            wszystkieOdp = [odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD];
            odpowiedz = odpowiedzi.find(function (pytanie) { return pytanie.tresc.toLowerCase().includes(obecnePytanie.toLowerCase()); });
            if (!odpowiedz && !document.querySelector('.odpgood')) {
                console.warn('[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie: ' + obecnePytanie);
                looseSearch = odpowiedzi.find(function (pytanie) { return pytanie.tresc.substring(0, 10) === obecnePytanie.substring(0, 10); });
                console.log('[ROZSZERZENIE]: Szukanie w miarę dopasowanej odpowiedzi: ' + (looseSearch === null || looseSearch === void 0 ? void 0 : looseSearch.tresc));
                if (!(looseSearch === null || looseSearch === void 0 ? void 0 : looseSearch.odpowiedz)) {
                    return [2 /*return*/, setTimeout(nowePytanie, 1000, odpowiedzi, clickButtons)];
                }
                odpowiedz = looseSearch;
            }
            for (_i = 0, wszystkieOdp_1 = wszystkieOdp; _i < wszystkieOdp_1.length; _i++) {
                ans = wszystkieOdp_1[_i];
                if (ans.textContent && ans.textContent.toLowerCase().slice(3) == (odpowiedz === null || odpowiedz === void 0 ? void 0 : odpowiedz.odpowiedz.toLowerCase()) && ans.className != 'odpgood') {
                    htmlAns = ans;
                    if (clickButtons) {
                        htmlAns.click();
                    }
                    else {
                        htmlAns.style.backgroundColor = 'green';
                        htmlAns.textContent += ' (kliknij w to)';
                    }
                }
            }
            setTimeout(nowePytanie, 1000, odpowiedzi, clickButtons);
            return [2 /*return*/];
        });
    });
};
