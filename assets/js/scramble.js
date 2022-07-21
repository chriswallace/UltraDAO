var scramble = '-+'.split('');
var cursors = '+-'.split('');
var cursor = '|';

// -▌▌█◙▓

function type(el, content, duration, delay) {

    var proxy = {progress:0};
    var length = content.length;
    var output = [];
    
    for (var i = 0, n = content.length; i < n; i++) {
        output[i] = '&nbsp;';
    }
    
    Tween.to(proxy, duration || 1.0, {progress:1})
        .wait(delay || 0)
        .ease(Tween.Quad.inOut)
        .step(function(tween) {
        	
            var n1 = Math.pow(proxy.progress, 3.0) * length;
            var n2 = Math.pow(proxy.progress, 0.25) * length;
	        var n3 = Math.pow(proxy.progress, 0.1) * length;
        
        	for (var i = 0; i <= n3; i++) {
                if (i > n2) { // 3. cursor
                    output[i] = cursors[Math.floor(Math.random() * cursors.length)];
                } else if (i > n1 /*|| Math.random() > tween.progress*/) { // 2. scrambled
                    if (output[i] === '' || Math.random() < 0.1) {
                        output[i] = scramble[Math.floor(Math.random() * scramble.length)];
                    }
                } else { // 1. fixed
                    output[i] = content.substr(i, 1);
                }
            }
        
	        output[~~n3] = cursor;
        
            el.innerHTML = output.join('');
        })
        .done(function() {
            el.innerHTML = content;
        });
}

var block = document.querySelectorAll('.typer');

function addLine(a, b, c) {

    b.innerHTML = "";
    
    var duration = 1;
    var step = 0.3;
    
    var cell;
    
    cell = document.createElement('span');
    b.appendChild(cell);
    type(cell, a, duration, step * 0);
    
}

for (var i = 0; i < block.length; i++) {
    var step = 300;
    setTimeout(addLine, step * 0, block[i].innerHTML, block[i]);
}