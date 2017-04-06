const fs = require('fs')
const r = require('ramda');
const assert = require('assert');
const zero = [' _ ',
              '| |',
              '|_|'];
const one = ['   ',
             '  |',
             '  |'];
const two = [' _ ',
             ' _|',
             '|_ '];
const three = [' _ ',
               ' _|',
               ' _|'];
const four = ['   ',
              '|_|',
              '  |'];
const five = [' _ ',
              '|_ ',
              ' _|'];
const six = [' _ ',
             '|_ ',
             '|_|'];
const seven = [' _ ',
               '  |',
               '  |'];
const eight = [' _ ',
               '|_|',
               '|_|'];
const nine = [' _ ',
              '|_|',
              ' _|'];

function chunk(n, array) {
  return r.range(0, array.length/n).map(i => array.slice(i*n, i*n+n))
}

function toNumber(ledMatrix) {
  return r.indexOf(ledMatrix, [zero, one, two, three, four, five, six, seven, eight, nine]);
}

var readLedMatrixLine = r.pipe(r.map(r.splitEvery(3)),
                               r.transpose,
                               r.map(toNumber),
                               r.join(''));

var readLedMatrixLines = r.pipe(r.partial(chunk, [4]),
                                r.map(r.compose(readLedMatrixLine, r.dropLast(1))));

fs.readFile('l33t.txt', 'utf8', function(err, input) {
  fs.readFile('treasure.txt', 'utf8', function(err, expected) {
    var output = readLedMatrixLines(input.split('\n'));
    assert.deepEqual(output, expected.split('\n'));
  });
});
