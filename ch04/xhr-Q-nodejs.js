var http = require('http');
var Q = require('q');

function getURL(URL) {
    return Q.Promise(function(resolve, reject, notify) {

        http.get(URL, (res) => {
          const { statusCode } = res;

          let error;
          if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                              `Status Code: ${statusCode}`);
          }

          if (error) {
            reject(error);
            return;
          }

          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            resolve('OK');
          });
        }).on('error', (e) => {
            reject(e);
            // 发生错误时要像这样 reject(new Error(req.statusText)); ，
            // 创建一个Error对象后再将具体的值传进去。 传给reject 的参数
            // 也没有什么特殊的限制，一般只要是Error对象（或者继承自Error对象）就可以。
        });

    });
}

// var URL = "http://httpbin.org/get";
var URL = "http://httpbin.org/status/500";
getURL(URL).then(function (value){
    console.log(value);
}, function (error){
    console.error(error.message);
}, function (progress){
    console.error(progress);
});
