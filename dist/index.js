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
 * Encrypt/decrypt helper for the Node crypto package's pbkdf2 and pbkdf2Sync functions
 */
var Encrypt = /** @class */ (function () {
    function Encrypt(config) {
        this.keyLength = config.keyLength || 16;
        this.salt = config.salt || crypto_1.randomBytes(this.keyLength);
        this.iterations = config.iterations || 1000;
        this.algorithm = config.algorithm || 'sha512';
    }
    Encrypt.prototype.createHash = function (password, salt) {
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
    Encrypt.prototype.createHashSync = function (password, salt) {
        if (salt === void 0) { salt = this.salt; }
        var saltString = salt.toString('hex');
        var hashedPasswordBuffer = crypto_1.pbkdf2Sync(password, salt, this.iterations, this.keyLength, this.algorithm);
        var hashedPasswordString = Buffer.from(hashedPasswordBuffer).toString('hex');
        var hashedPasswordWithSaltPrefix = saltString + ":" + hashedPasswordString;
        return hashedPasswordWithSaltPrefix;
    };
    Encrypt.prototype.getSalt = function (hashedPasswordWithSaltPrefix) {
        var salt = hashedPasswordWithSaltPrefix.split(':')[0];
        var saltBuffer = Buffer.from(salt, 'hex');
        return saltBuffer;
    };
    /**
     * Asynchronously creates a new password hash as a HEX string
     * @param password UTF-8 string to hash
     * @example
     * const Encrypt = new Encrypt();
     *
     * Encrypt.toHash('my_password_string').then(hashedPassword => saveToDatabase(hashedPassword))
     */
    Encrypt.prototype.toHash = function (password) {
        return this.createHash(password);
    };
    /**
     * Asynchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
     * @param password UTF-8 string to check against the hash
     * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
     * @example
     * const Encrypt = new Encrypt();
     *
     * Encrypt.isMatch('my_password_string', 'my_hashed_password_string').then(authenticated => loginUser() : redirectToLoginPage());
     */
    Encrypt.prototype.isMatch = function (password, previouslyHashedPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, newlyHashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = this.getSalt(previouslyHashedPassword);
                        return [4 /*yield*/, this.createHash(password, salt)];
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
     * const Encrypt = new Encrypt();
     *
     * const hashedPassword = Encrypt.toHashSync('my_password_string');
     */
    Encrypt.prototype.toHashSync = function (password) {
        return this.createHashSync(password);
    };
    /**
     * Synchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
     * @param password UTF-8 string to check against the hash
     * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
     * @example
     * const Encrypt = new Encrypt();
     *
     * const isAuthenticated = Encrypt.isMatchSync('my_password_string', 'my_hashed_password_string')
     */
    Encrypt.prototype.isMatchSync = function (password, previouslyHashedPassword) {
        var salt = this.getSalt(previouslyHashedPassword);
        var newlyHashedPassword = this.createHashSync(password, salt);
        return newlyHashedPassword === previouslyHashedPassword ? true : false;
    };
    return Encrypt;
}());
exports.default = Encrypt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUF5RDtBQStDekQ7O0dBRUc7QUFDSDtJQU1DLGlCQUFZLE1BQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksb0JBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQy9DLENBQUM7SUFFTyw0QkFBVSxHQUFsQixVQUNDLFFBQWdCLEVBQ2hCLElBQXdCO1FBRnpCLGlCQXVCQztRQXJCQSxxQkFBQSxFQUFBLE9BQWUsSUFBSSxDQUFDLElBQUk7UUFFeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2xDLE9BQUEsZUFBTSxDQUNMLFFBQVEsRUFDUixJQUFJLEVBQ0osS0FBSSxDQUFDLFVBQVUsRUFDZixLQUFJLENBQUMsU0FBUyxFQUNkLEtBQUksQ0FBQyxTQUFTLEVBQ2QsVUFBQyxLQUFLLEVBQUUsVUFBVTtnQkFDakIsSUFBSSxLQUFLLEVBQUU7b0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNkO2dCQUNELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLElBQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsSUFBTSx3QkFBd0IsR0FBTSxV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