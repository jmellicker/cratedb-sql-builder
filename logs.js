var clc = require('cli-color')

module.exports = {

    p: function(str) { p(141, str) },
    b: function(str) { p(69, str) },
    c: function(str) { p(117, str) },
    g: function(str) { p(77, str) },
    y: function(str) { p(228, str) },
    o: function(str) { p(208, str) },
    r: function(str) { p(198, str) },

    ph: function(str) { p(55, makeHeader(str)) },
    bh: function(str) { p(4, makeHeader(str)) },
    ch: function(str) { p(32, makeHeader(str)) },
    gh: function(str) { p(2, makeHeader(str)) },
    yh: function(str) { p(228, makeHeader(str)) },
    oh: function(str) { p(166, makeHeader(str)) },
    rh: function(str) { p(9, makeHeader(str)) },

    pb: function(str) { b(55, str) },
    bb: function(str) { b(4, str) },
    cb: function(str) { b(32, str) },
    gb: function(str) { b(2, str) },
    yb: function(str) { b(228, str) },
    ob: function(str) { b(166, str) },
    rb: function(str) { b(9, str) },

    pbh: function(str) { b(55, makeHeader(str)) },
    bbh: function(str) { b(4, makeHeader(str)) },
    cbh: function(str) { b(32, makeHeader(str)) },
    gbh: function(str) { b(2, makeHeader(str)) },
    ybh: function(str) { b(178, makeHeader(str)) },
    obh: function(str) { b(166, makeHeader(str)) },
    rbh: function(str) { b(9, makeHeader(str)) },

}

function p(color, str) {
    if (typeof str === 'object') {
        console.log(clc.xterm(color)(JSON.stringify(str, null, 2)))
    } else {
        console.log(clc.xterm(color)(str))
    }
}

function makeHeader(str) { return ': ======== ' + str + ' ========' }

function b(backgroundColor, str) {
    if (typeof str === 'object') {
        console.log(clc.xterm(255).bgXterm(backgroundColor)(JSON.stringify(str, null, 2)))
    } else {
        console.log(clc.xterm(255).bgXterm(backgroundColor)(str))
    }
}
