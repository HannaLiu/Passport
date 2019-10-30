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

// 将API返回的结果导出到的路径
var exportPath = "./passport.xlsx"

// 导出结果的第一个sheet名称
var sheetName = "passportResult"

// 将图像编码数据发送至API
rp.post(url, {
  form: {
    access_token: access_token,
    image: imageData
  }
})
.then(function(parsedBody) {
  console.log(parsedBody)
  // 处理返回结果，导出到exportPath
  parsedBody = JSON.parse(parsedBody);
  if (parsedBody !== undefined && parsedBody.words_result !== undefined) {
    let result = [];
    let wordObj = parsedBody.words_result;
    result[0] = Object.keys(wordObj);
    let resultNewArr = [];
    Object.keys(wordObj).map((v, i) => {
      resultNewArr[i] = wordObj[v].words;
    });
    result[1] = resultNewArr;
    var buffer = xlsx.build([
      {
        name: sheetName,
        data: result
      }
    ]);
    fs.writeFile(exportPath, buffer, function(err) {
      if (err) {
        console.log(err);
      }
      console.log("write over");
    });
  }
})
.catch(error => {
  console.log(error);
});