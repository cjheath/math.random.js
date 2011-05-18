/*
 * Replace the weak pseudo-random number generator in Math.
 *
 * Adds these functions:
 * - Math.random.seed(...)
 * - Math.random.uint32()
 * - Math.random.fract53()
 * - Math.random.uuid()
 *
 * Copyright Clifford Heath, 2011. MIT License, see the LICENSE.txt file.
 *
 * Adapted from Alea, http://baagoe.com/en/RandomMusings/javascript/
 * Johannes BaagÃ¸e <baagoe@baagoe.com>, 2010
 * "The period is close to 2^116, it passes BigCrush, the fastest javascript PRNG I know that does so"
 */
(function() {
  var mashState = 0xefc8249d;
  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      mashState += data.charCodeAt(i);
      var h = 0.02519603282416938 * mashState;
      mashState = h >>> 0;
      h -= mashState;
      h *= mashState;
      mashState = h >>> 0;
      h -= mashState;
      mashState += h * 0x100000000; // 2^32
    }
    return (mashState >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  // Internal state for random()
  var d = (new Date).toString();  // Seed, in lieu of any calls to Math.random.seed
  var s0 = mash(d);
  var s1 = mash(d);
  var s2 = mash(d);
  var c = 1;

  // Replace Math.random with Alea
  this.random = function() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
    s0 = s1;
    s1 = s2;
    return s2 = t - (c = t | 0);
  };

  // Some additional representations:
  this.random.uint32 = function() {
    return Math.random() * 0x100000000; // 2^32
  };

  this.random.fract53 = function() {
    return Math.random() + 
      (Math.random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };

  // Generate a UUID. Fragment nicked from plugins.jquery.com: jquery.uuid.js
  this.random.uuid = function() {
    var make4 = function () {
      return(((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return make4()+make4()+'-'+make4()+'-'+make4()+'-'+make4()+'-'+make4()+make4()+make4();
  };

  // Add some seed data to the Math.random. Any arguments may be provided, or none.
  this.random.seed = function() {
    if (arguments.length > 0)
      args = Array.prototype.slice.call(arguments);
    else
      args = [+new Date];

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0)
	s0 += 1;
      s1 -= mash(args[i]);
      if (s1 < 0)
	s1 += 1;
      s2 -= mash(args[i]);
      if (s2 < 0)
	s2 += 1;
    }
  };
}).call(Math);
