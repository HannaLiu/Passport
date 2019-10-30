var request = require('request');
var rp = require("request-promise");
var xlsx = require("node-xlsx");
var fs = require("fs");
var url = "https://aip.baidubce.com/rest/2.0/ocr/v1/passport";

// 此处填写从百度云API获取的access_token
var access_token = "";

// 此处填写要识别的护照图片路径
var imageUrl = "";

// 将该图像进行base64编码
var imageData = fs.readFileSync(imageUrl).toString("base64");

// 将图像编码数据发送至API
rp.post(url, {
  form: {
    access_token: access_token,
    image: imageData
  }
}).then(function(parsedBody) {
  // 在此处处理返回的结果
  console.log(parsedBody)
})
.catch(error => {
  console.log(error);
});