#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var argv = require('optimist').argv;
var repl = require('repl');
var number = require('../');

if (argv.h || argv.help) {
    return fs.createReadStream(__dirname + '/usage.txt')
        .pipe(process.stdout)
    ;
}
if (argv.v || argv.version) {
    var v = require('../package.json').version;
    return console.log('NumberScript version ' + v);
}
var outfile = argv.o || argv.output;

var base;
if (argv.b || argv.base) {
    base = argv.b || argv.base;
}

if (argv.d || argv.decompile) {
    var file = argv.d || argv.decompile;
    readFile(file, function (err, src) {
        if (err) console.error(err)
        else number.decompile(src, function (err, n) {
            if (err) console.error(err)
            else writeFile(outfile, n + '\n')
        });
    });
    return;
}

if (argv.c || argv.compile) {
    var file = argv.c || argv.compile;
    readFile(file, function (err, src) {
        if (err) console.error(err)
        else number.compile(src, function (err, c) {
            if (err) console.error(err)
            else writeFile(outfile, c)
        }, base);
    });
    return;
}

if (argv.r || argv.run || argv._[0]) {
    var file = argv.r || argv.run || argv._[0] || '-';
    var ctx = {
        require : function (name) {
            if (name === 'number-script') return number
            else return require(name)
        },
        console : console,
        process : process,
        __filename : file,
        __dirname : file === '-' ? process.cwd() : path.dirname(file)
    };
    readFile(file, function (err, src) {
        if (err) console.error(err)
        else number.run(src, ctx, function (err) {
            if (err) console.error(err)
        }, base);
    });
    return;
}

if (true || argv.i || argv.interactive) {
    var ctx = {
        require : require,
        console : console,
        process : process,
    };
    repl.start('> ', null, function (cmd, _, _, cb) {
        var n = cmd.replace(/^\(|\)$/g, '');
        number.run(n, cb, null, base);
    });
}

function readFile (file, cb) {
    if (file === true || file === '-') {
        var data = '';
        process.stdin.on('data', function (buf) { data += buf });
        process.stdin.on('end', function () {
            cb(null, data);
        });
        process.stdin.resume();
    }
    else {
        fs.readFile(file, 'utf8', function (err, src) {
            if (err) cb(err)
            else cb(null, src)
        });
    }
}

function writeFile (file, src) {
    if (!file || file === true || file === '-') {
        process.stdout.write(src);
    }
    else fs.writeFile(file, src);
}
