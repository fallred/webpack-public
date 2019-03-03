let str = require('./a.js');
console.log(str);
document.getElementById('app').innerHTML = str;
if (module.hot) {
    module.hot.accept();
    // module.hot.accept('./a.js', function(){
    //     let str = require('./a.js');
    //     console.log(str);
    //     document.getElementById('app').innerHTML = str;
    // });
}