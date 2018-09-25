<div align="center">
<h1>tiny-encrypt</h1>

<p>Tiny string encryption and comparison library with both asyn and sync support.
</div>

[![npm](https://img.shields.io/npm/v/tiny-encrypt.svg?style=flat-square&colorB=blue)](https://www.npmjs.com/package/tiny-encrypt)
[![Travis (.org)](https://img.shields.io/travis/seanWLawrence/tiny-encrypt.svg?style=flat-square)](https://travis-ci.org/seanWLawrence/tiny-encrypt)
[![Coveralls github branch](https://img.shields.io/coveralls/github/seanWLawrence/tiny-encrypt/master.svg?style=flat-square&colorB=brightgreen)](https://coveralls.io/github/seanWLawrence/tiny-encrypt)
[![GitHub last commit](https://img.shields.io/github/last-commit/seanwlawrence/tiny-encrypt.svg?style=flat-square)](https://github.com/seanwlawrence/tiny-encrypt/commits/master)
![GitHub issues](https://img.shields.io/github/issues-raw/seanwlawrence/tiny-encrypt.svg?style=flat-square)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/tiny-encrypt.svg?style=flat-square)
[![GitHub](https://img.shields.io/github/license/seanwlawrence/tiny-encrypt.svg?style=flat-square)](https://github.com/seanWLawrence/tiny-encrypt/blob/master/LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-blue.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

## The problem

Encrypting and testing strings is hard, unless you want to dive head first into
[Node's crypto documentation](https://nodejs.org/api/crypto.html) or use a
package like [bcrypt](https://www.npmjs.com/package/bcrypt) that will install
some extra dependencies.

## This solution

This simple class makes encrypting and testing strings a breeze. Create an
encrypted string, and then check if it's a match against an unencrypted string
with the built-in helpers. Perfect for storing sensitive-information like
passwords that you don't need to know the value of.

It's just sugar on top of Node's built-in
[pbkdf2 and pbkdf2Sync functions](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)
to make your life easier.

There's also the option to pass in your own salt, iterations, algorithm and
keylength values for full control of all the parameters. It's also made with
[TypeScript](https://www.typescriptlang.org) for awesome code completion and/or
type checking if your using TypeScript or an editor with built-in support like
[VS Code](https://code.visualstudio.com).

## What this plugin is not

- A custom algorithm, or 'hacker-proof ultra 3000' cryptography module.
- A
  [Cipher](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options)
  or decryption tool (once you create an encrypted string, you can only compare
  it to an unencrypted string to confirm that they match)

If you need something to actually decrypt (convert the encrypted string back to
it's original, unencrypted string), check out something more powerful like
Node's built-in
[Cipher](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options).

This package is simply a much more pleasant way to use Node's built-in
[pbkdf2 and pbkdf2Sync functions](https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback),
which is pretty damn secure for most applications.

## Other solutions

- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- Node's [crypto library](https://nodejs.org/api/crypto.html)

## Table of Contents

- [The problem](#the-problem)
- [This solution](#this-solution)
- [What this plugin is not](#what-this-plugin-is-not)
- [Other solutions](#other-solutions)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Importing](#importing)
- [Asynchronous usage](#asynchronous-usage)
	- [Using Promises](#using-promises)
	- [Using async/await](#using-asyncawait)
- [Synchronous examples](#synchronous-examples)
- [Configuration](#configuration)
	- [API](#api)
	- [FAQ](#faq)
- [License](#license)
  [Using Promises](#using-promises) - [Using async/await](#using-asyncawait)
- [Synchronous examples](#synchronous-examples)
- [Configuration](#configuration) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait)
- [Synchronous examples](#synchronous-examples)
- [Configuration](#configuration) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait)
- [Synchronous examples](#synchronous-examples)
- [Configuration](#configuration) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait)
- [Synchronous examples](#synchronous-examples)
- [Configuration](#configuration) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license) [Using Promises](#using-promises) -
  [Using async/await](#using-asyncawait) -
  [Synchronous examples](#synchronous-examples) - [API](#api) - [FAQ](#faq)
- [License](#license)

## Installation

`npm install tiny-encrypt`

## Importing

Using CommonJS

```javascript
const TinyEncrypt = require('tiny-encrypt');
```

Using ES6 Modules

```javascript
import TinyEncrypt from 'tiny-encrypt';
```

## Asynchronous usage

### Using Promises

Create encrypted string

```javascript
TinyEncrypt()
	.toHash('my_password_string')
	.then((hashedPassword) => {
		// save to database, etc.
	});
```

Check if encrypted string matches unencrypted string

```javascript
const userInputPassword = 'password1';
const hashedPassword = 'lkjl4j5lk2j4;l53j45lkjs;ldjflasfsd';

TinyEncrypt().isMatch(userInputPassword, hashedPassword).then((result) => {
	result === true ? // login user, etc.
});
```

### Using async/await

Create encrypted string

```javascript
async function doSomethingWithHashedPasswordAsynchronously() {
	const hashedPassword = await TinyEncrypt().toHash('my_password_string');
	// save to database, etc.
}
```

Check if encrypted string matches unencrypted string

```javascript
const userInputPassword = 'password1';
const hashedPassword = 'lkjl4j5lk2j4;l53j45lkjs;ldjflasfsd';

async function authenticateUser(userInputPassword, hashedPassword) {
	const isAuthenticated = await TinyEncrypt().isMatch(
		userInputPassword,
		hashedPassword,
	);

	isAuthenticated === true ? // login user, etc.
}
```

## Synchronous examples

Create encrypted string

```javascript
const hashedPassword = TinyEncrypt().toHashSync('my_password_string');
```

Check if encrypted string matches unencrypted string

```javascript
const userInputPassword = 'password1';
const hashedPassword = 'lkjl4j5lk2j4;l53j45lkjs;ldjflasfsd';

const isAuthenticated = TinyEncrypt().isMatchSync(
	userInputPassword,
	hashedPassword,
);
```

## Configuration

You can optionally pass in a configuration object for more control on the
algorithmn, iterations, salt and key length.

> Note: this example shows the default options.

```javascript
TinyEncrypt({
  salt: crypto.randomBytes(16)
  iterations: 1000,
  keyLength: 16,
  algorithm: 'sha512'
}).toHash(// etc...);

// or preferably for readability

const options = {
  salt: crypto.randomBytes(16)
  iterations: 1000,
  keyLength: 16,
  algorithm: 'sha512'
})

TinyEncrypt(options).toHash(// etc...)
```

### API

`toHash(password: string): Promise<string>`

Creates an encrypted string asynchronously (recommended for best performance).

`isMatch(password: string, previouslyHashedPassword: string): Promise<boolean>`

Checks if an unencrypted string matches an encrypted string asynchronously
(recommended for the best performance).

`toHashSync(password: string): string`

Creates an encrypted string synchronously.

`isMatchSync(password: string, previouslyHashedPassword: string): boolean`

Checks if an unencrypted string matches an encrypted string synchronously.

`config: Config`

Optional configuration object to pass into the TinyEncrypt instance

```typescript
interface Config {
	salt?: Buffer;
	iterations?: number;
	keyLength?: number;
	algorithm?:
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
}
```

### FAQ

<details>
<summary>Why are the async functions recommended over the sync versions?</summary>

The asynchronous functions will not tie up your resources (i.e. block the event
loop) while the encryption/checking is taking place, while the synchronous
functions will.

For simple scripts, the synchronous versions are fine and easier to work with if
you're not familiar with promises or async/await. For servers and
performance-critical applications, we strongly recommend you use the
asynchronous functions only.

</details>

<details>
<summary>Why use this over Bcrypt or another solution?</summary>

Bcrypt and all of the other solutions are great!

This package is very easy to use like Bcrypt, but also gives you more
flexibility on how many iterations, etc. so you can make it as intense/less
intense as you need for your program and squeeze evry last drop of perfromance
out of it based on your needs.

I haven't done any benchmarks yet, but it should be pretty fast since it's just
sugar on Node's built in functions.

Plus, it's extremely lightweight and you can read the souce code to see exactly
what's going on and learn a little bit about crytography yourself.

</details>

## License

MIT

Copyright 2018 Sean W. Lawrence - [visit my portfolio](https://swl.netlify.com)
