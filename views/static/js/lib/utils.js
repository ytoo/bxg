define(function () {
  return {
    getQueryUrl:function () {
      // 获取到网页地址栏?后面的数据，比如这里是"?id=989&name=zs"
      var url = window.location.search;
      // 然后从第二个位置截取字符串，得到"id=989&name=zs"
      url = url.slice(1);
      // 下面将字符串转换成对象的形式，即{id:989,name:zs}
      var obj = {};
      // 用split（）方法将字符串变成["id=989","name=zs"]
      url = url.split("&");
      for (var i = 0; i < url.length; i++) {
          obj[url[i].split("=")[0]] = url[i].split("=")[1];
      }
      return obj;
    }
  }
});