import { randomBytes, pbkdf2, pbkdf2Sync } from 'crypto';
export type Algorithm =
	| 'sha512'
	| 'RSA-MD4'
	| 'RSA-MD5'
	| 'RSA-MDC2'
	| 'RSA-RIPEMD160'
	| 'RSA-SHA1'
	| 'RSA-SHA1-2'
	| 'RSA-SHA224'
	| 'RSA-SHA256'
	| 'RSA-SHA384'
	| 'RSA-SHA512'
	| 'blake2b512'
	| 'blake2s256'
	| 'md4'
	| 'md4WithRSAEncryption'
	| 'md5'
	| 'md5-sha1'
	| 'md5WithRSAEncryption'
	| 'mdc2'
	| 'mdc2WithRSA'
	| 'ripemd'
	| 'ripemd160'
	| 'ripemd160WithRSA'
	| 'rmd160'
	| 'sha1'
	| 'sha1WithRSAEncryption'
	| 'sha224'
	| 'sha224WithRSAEncryption'
	| 'sha256'
	| 'sha256WithRSAEncryption'
	| 'sha384'
	| 'sha384WithRSAEncryption'
	| 'sha512'
	| 'sha512WithRSAEncryption'
	| 'ssl3-md5'
	| 'ssl3-sha1'
	| 'whirlpool';

export interface Config {
	salt?: Buffer;
	keyLength?: number;
	iterations?: number;
	algorithm?: Algorithm;
}

/**
 * Encrypt and matching helper for the Node crypto package's pbkdf2 and pbkdf2Sync functions
 */
class TinyEncrypt implements Config {
	readonly salt: Buffer;
	readonly iterations: number;
	readonly keyLength: number;
	readonly algorithm: Algorithm;

	constructor(config: Config) {
		this.keyLength = config.keyLength || 16;
		this.salt = config.salt || randomBytes(this.keyLength);
		this.iterations = config.iterations || 1000;
		this.algorithm = config.algorithm || 'sha512';
	}

	/**
	 * Asynchronously creates a new password hash as a HEX string
	 * @param password UTF-8 string to hash
	 * @example
	 * TinyEncrypt().toHash('my_password_string').then(hashedPassword => saveToDatabase(hashedPassword))
	 */
	public toHash(password: string): Promise<string> {
		return this._createHash(password);
	}

	/**
	 * Asynchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
	 * @param password UTF-8 string to check against the hash
	 * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
	 * @example
	 * TinyEncrypt().isMatch('my_password_string', 'my_hashed_password_string').then(authenticated => loginUser() : redirectToLoginPage());
	 */
	public async isMatch(
		password: string,
		previouslyHashedPassword: string,
	): Promise<boolean> {
		const salt = this._getSalt(previouslyHashedPassword);
		const newlyHashedPassword = await this._createHash(password, salt);

		return newlyHashedPassword === previouslyHashedPassword ? true : false;
	}

	/**
	 * Synchronously creates a new password hash as a HEX string
	 * @param password UTF-8 string to hash
	 * @example
	 * const hashedPassword = TinyEncrypt().toHashSync('my_password_string');
	 */
	public toHashSync(password: string): string {
		return this._createHashSync(password);
	}

	/**
	 * Synchronously checks that a previously hashed HEX string from this class matches the raw UTF-8 version
	 * @param password UTF-8 string to check against the hash
	 * @param previouslyHashedPassword previously-hashed HEX string to check against the new UTF-8 string password
	 * @example
	 * const isAuthenticated = TinyEncrypt().isMatchSync('my_password_string', 'my_hashed_password_string')
	 */
	public isMatchSync(
		password: string,
		previouslyHashedPassword: string,
	): boolean {
		const salt = this._getSalt(previouslyHashedPassword);
		const newlyHashedPassword = this._createHashSync(password, salt);

		return newlyHashedPassword === previouslyHashedPassword ? true : false;
	}

	private _createHash(
		password: string,
		salt: Buffer = this.salt,
	): Promise<string> {
		return new Promise((resolve, reject) =>
			pbkdf2(
				password,
				salt,
				this.iterations,
				this.keyLength,
				this.algorithm,
				(error, derivedKey) => {
					if (error) {
						reject(error);
					}
					const saltString = salt.toString('hex');
					const derivedKeyString = derivedKey.toString('hex');
					const derivedKeyWithSaltPrefix = `${saltString}:${derivedKeyString}`;

					resolve(derivedKeyWithSaltPrefix);
				},
			),
		);
	}
	private _createHashSync(password: string, salt: Buffer = this.salt): string {
		const saltString = salt.toString('hex');
		const hashedPasswordBuffer = pbkdf2Sync(
			password,
			salt,
			this.iterations,
			this.keyLength,
			this.algorithm,
		);

		const hashedPasswordString = Buffer.from(hashedPasswordBuffer).toString(
			'hex',
		);
		const hashedPasswordWithSaltPrefix = `${saltString}:${hashedPasswordString}`;

		return hashedPasswordWithSaltPrefix;
	}

	private _getSalt(hashedPasswordWithSaltPrefix: string): Buffer {
		const salt = hashedPasswordWithSaltPrefix.split(':')[0];
		const saltBuffer = Buffer.from(salt, 'hex');

		return saltBuffer;
	}
}

module.exports = (options: Config = {}) => new TinyEncrypt(options);
module.exports.default = (options: Config = {}) => new TinyEncrypt(options);
export default (options: Config = {}) => new TinyEncrypt(options);
