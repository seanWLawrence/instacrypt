"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
/**
 * Encrypt and matching helper for the Node crypto package's pbkdf2 and pbkdf2Sync functions
 */
var TinyEncrypt = /** @class */ (function () {
    function TinyEncrypt(config) {
        this.keyLength = config.keyLength || 16;
        this.salt = config.salt || crypto_1.randomBytes(this.keyLength);
        this.iterations = config.iterations || 1000;
        this.algorithm = config.algorithm || 'sha512';
    }
    /**
     * Asynchronously creates a new password hash as a HEX string
     * @param password UTF-8 string to hash
     * @example
     * TinyEncrypt().toHash('my_password_string').then(hashedPassword => saveToDatabase(hashedPassword))
     */
    TinyEncrypt.prototype.toHash = function (password) {
        return this._createHash(password);
    };
    /**
     * Asynchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
     * @param password UTF-8 string to check against the hash
     * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
     * @example
     * TinyEncrypt().isMatch('my_password_string', 'my_hashed_password_string').then(authenticated => loginUser() : redirectToLoginPage());
     */
    TinyEncrypt.prototype.isMatch = function (password, previouslyHashedPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, newlyHashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = this._getSalt(previouslyHashedPassword);
                        return [4 /*yield*/, this._createHash(password, salt)];
                    case 1:
                        newlyHashedPassword = _a.sent();
                        return [2 /*return*/, newlyHashedPassword === previouslyHashedPassword ? true : false];
                }
            });
        });
    };
    /**
     * Synchronously creates a new password hash as a HEX string
     * @param password UTF-8 string to hash
     * @example
     * const hashedPassword = TinyEncrypt().toHashSync('my_password_string');
     */
    TinyEncrypt.prototype.toHashSync = function (password) {
        return this._createHashSync(password);
    };
    /**
     * Synchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
     * @param password UTF-8 string to check against the hash
     * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
     * @example
     * const isAuthenticated = TinyEncrypt().isMatchSync('my_password_string', 'my_hashed_password_string')
     */
    TinyEncrypt.prototype.isMatchSync = function (password, previouslyHashedPassword) {
        var salt = this._getSalt(previouslyHashedPassword);
        var newlyHashedPassword = this._createHashSync(password, salt);
        return newlyHashedPassword === previouslyHashedPassword ? true : false;
    };
    TinyEncrypt.prototype._createHash = function (password, salt) {
        var _this = this;
        if (salt === void 0) { salt = this.salt; }
        return new Promise(function (resolve, reject) {
            return crypto_1.pbkdf2(password, salt, _this.iterations, _this.keyLength, _this.algorithm, function (error, derivedKey) {
                if (error) {
                    reject(error);
                }
                var saltString = salt.toString('hex');
                var derivedKeyString = derivedKey.toString('hex');
                var derivedKeyWithSaltPrefix = saltString + ":" + derivedKeyString;
                resolve(derivedKeyWithSaltPrefix);
            });
        });
    };
    TinyEncrypt.prototype._createHashSync = function (password, salt) {
        if (salt === void 0) { salt = this.salt; }
        var saltString = salt.toString('hex');
        var hashedPasswordBuffer = crypto_1.pbkdf2Sync(password, salt, this.iterations, this.keyLength, this.algorithm);
        var hashedPasswordString = Buffer.from(hashedPasswordBuffer).toString('hex');
        var hashedPasswordWithSaltPrefix = saltString + ":" + hashedPasswordString;
        return hashedPasswordWithSaltPrefix;
    };
    TinyEncrypt.prototype._getSalt = function (hashedPasswordWithSaltPrefix) {
        var salt = hashedPasswordWithSaltPrefix.split(':')[0];
        var saltBuffer = Buffer.from(salt, 'hex');
        return saltBuffer;
    };
    return TinyEncrypt;
}());
module.exports = function (options) {
    if (options === void 0) { options = {}; }
    return new TinyEncrypt(options);
};
module.exports.default = function (options) {
    if (options === void 0) { options = {}; }
    return new TinyEncrypt(options);
};
exports.default = (function (options) {
    if (options === void 0) { options = {}; }
    return new TinyEncrypt(options);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RDtBQStDekQ7O0dBRUc7QUFDSDtJQU1DLHFCQUFZLE1BQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksb0JBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDRCQUFNLEdBQWIsVUFBYyxRQUFnQjtRQUM3QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNVLDZCQUFPLEdBQXBCLFVBQ0MsUUFBZ0IsRUFDaEIsd0JBQWdDOzs7Ozs7d0JBRTFCLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7d0JBQ3pCLHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFBOzt3QkFBNUQsbUJBQW1CLEdBQUcsU0FBc0M7d0JBRWxFLHNCQUFPLG1CQUFtQixLQUFLLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQzs7OztLQUN2RTtJQUVEOzs7OztPQUtHO0lBQ0ksZ0NBQVUsR0FBakIsVUFBa0IsUUFBZ0I7UUFDakMsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFD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