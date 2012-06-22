// This is all so dreadfully ugly,
// it should be all be rewritten in numberscript at some point.

var bignum = require('bignum');
var vm = require('vm');

exports = module.exports = run;
exports.run = run;
function run (n, ctx, cb, base) {
    if (typeof ctx === 'function') {
        cb = ctx;
        ctx = {};
    }
    compile(n, function (err, src) {
        if (err) return cb(err)
        try {
            var res = vm.runInNewContext(src, ctx);
        }
        catch (err) { return cb(err) };
        cb(null, res);
    }, base);
}

exports.compile = compile;
function compile (n, cb, base) {
    var js;
    if (Buffer.isBuffer(n)) {
        var xs = [];
        for (var i = 0; i < n.length; i++) {
            if (/\S/.test(String.fromCharCode(n[i]))) {
                xs.push(n[i]);
            }
        }
        var buf = new Buffer(xs);
        js = String(bignum.fromBuffer(buf).toBuffer());
    }
    else if (typeof n === 'string') {
        js = String(bignum(n.replace(/\s+/g, ''), base).toBuffer());
    }
    else if (n && typeof n === 'object' && n.toBuffer) {
        js = String(n.toBuffer());
    }
    try {
        Function(js)
    }
    catch (e) {
        if (cb) cb('Invalid number.')
        return;
    }
    cb(null, js);
}

exports.decompile = decompile;
function decompile (src, cb) {
    var buf = Buffer.isBuffer(src) ? buf : new Buffer(src);
    cb(null, String(bignum.fromBuffer(buf)));
}
