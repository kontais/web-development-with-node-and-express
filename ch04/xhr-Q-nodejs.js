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
            // ��������ʱҪ������ reject(new Error(req.statusText)); ��
            // ����һ��Error������ٽ������ֵ����ȥ�� ����reject �Ĳ���
            // Ҳû��ʲô��������ƣ�һ��ֻҪ��Error���󣨻��߼̳���Error���󣩾Ϳ��ԡ�
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
