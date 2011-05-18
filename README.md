[math.random.js](http://github.com/cjheath/math.random.js) - A better random number generator for Javascript
============================================================================================================

Rationale
---------

Most browsers have implementations of Math.random that are based on the C runtime
library's 'rand' function. This function is commonly a simple linear congruential
pseudo-random number generator, often with a period of only 2^32-1. Besides that,
the method used results in successive numbers having poor randomness (spectral
behaviour) in the least significant bits.

This module replaces Math.random with a PRNG that has more stored state, a period
of about 2^116, and which passes the BigCrush test, but is still very fast.

The core of the generator is Alea, courtesy of Johannes Baagoe <baagoe@baagoe.com>,
and you should heed the advice and warnings [here](http://baagoe.com/en/RandomMusings/javascript/).

Synopsis
--------

### Math.random() ###

Works just like the built-in, except it's more random.

### Math.random.uint32() ###

Returns a random number that's guaranteed to be a non-negative 32-bit integer

### Math.random.fract53() ###

Returns a random number that's guaranteed to be a fraction between 0 and 1, with 53 bits of entropy.

### Math.random.seed(...) ###

Adds additional seed data to the pseudo-random number generator. Any arguments
are allowed (they'll be converted to String before being processed), otherwise
Date will be used. In a Javascript application, you might occasionally call:

    Math.random.seed(event.timestamp)

### Math.random.uuid() ###

Returns a new UUID (GUID) in string form, like "0db3c449-24a8-6efe-3e8e-4c0c85ba447a".

Status
------

Stable.
