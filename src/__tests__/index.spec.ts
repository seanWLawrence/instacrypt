import Encrypt from '../index';

describe('CLASS: Encrypt', () => {
	const password = 'password1';
	const encrypt: Encrypt = new Encrypt({});
	const hashedPasswordSync = encrypt.toHashSync(password);

	describe('METHOD: toHash', () => {
		it('outputs a string from a Promise', () => {
			encrypt
				.toHash(password)
				.then((hashedPassword) => expect(typeof hashedPassword).toBe('string'));
		});

		it('does NOT match the input string', () => {
			encrypt
				.toHash(password)
				.then((hashedPassword) => expect(password).not.toEqual(hashedPassword));
		});
	});

	describe('METHOD: toHashSync', () => {
		it('outputs a string synchronously', () => {
			expect(typeof hashedPasswordSync).toBe('string');
		});

		it('does NOT match the input string', () => {
			expect(password).not.toEqual(hashedPasswordSync);
		});
	});

	describe('METHOD: isMatch', () => {
		it('will return true if original string value is tested against a hashed string value', () => {
			encrypt
				.toHash('password1')
				.then((hashedPassword) =>
					encrypt
						.isMatch(password, hashedPassword)
						.then((isTrue) => expect(isTrue).toBe(true)),
				);
		});
	});

	it('will return FALSE if original string does NOT match the hashed string', () => {
		encrypt
			.toHash('password2')
			.then((hashedPassword) =>
				encrypt
					.isMatch(password, hashedPassword)
					.then((isTrue) => expect(isTrue).toBe(false)),
			);
	});

	describe('METHOD: isMatchSync', () => {
		it('will return true if original string value is tested against a hashed string value', () => {
			const isTrue = encrypt.isMatchSync(password, hashedPasswordSync);
			expect(isTrue).toBe(true);
		});

		it('will return FALSE if original string does NOT match the hashed string', () => {
			const isTrue = encrypt.isMatchSync('password2', hashedPasswordSync);
			expect(isTrue).toBe(false);
		});
	});

	describe('CONFIGURATION', () => {
		const encryptWithConfig = new Encrypt({
			salt: Buffer.from('exampleSalt'),
			iterations: 10000,
			algorithm: 'sha512WithRSAEncryption',
			keyLength: 128,
		});

		const hashedPasswordSyncWithConfig = encryptWithConfig.toHashSync(password);

		it('allows you to pass a custom salt, iteration, algorithm and keyLength property on initialization for a different configuration', () => {
			expect(encrypt.salt).not.toEqual(encryptWithConfig.salt);
			expect(encrypt.iterations).not.toEqual(encryptWithConfig.iterations);
			expect(encrypt.algorithm).not.toEqual(encryptWithConfig.algorithm);
			expect(encrypt.keyLength).not.toEqual(encryptWithConfig.keyLength);
			expect(hashedPasswordSync).not.toEqual(hashedPasswordSyncWithConfig);
			expect(encrypt.isMatchSync(password, hashedPasswordSyncWithConfig)).toBe(
				false,
			);
		});
	});
});
