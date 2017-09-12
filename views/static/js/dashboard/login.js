define(["jquery","cookie"],function($){
  $(function () {
    // 取消掉button按钮提交的功能，而改用form表单提交注册事件,改用JQ给表单提供的submit方式提交
    $("form").submit(function () {
      // 表单提交数据时，需要获取到表单里面用户输入的内容
      var userName = $("#tc_name").val();
      var pass = $("#tc_pass").val();

//             由于数据库中有个空的用户名和空的密码，当二者为空的时候也可以登录，所以需要做判断，当输入为空时需要输入内容
      if(userName.trim() == ""){
        alert("请输入用户名");
        return false;
      }
      if (pass.trim() == "") {
        alert("请输入密码");
        return false;
      }

      // 注意重点三！！！
      // 然后根据拿到的输入数据向后台提交，使用ajax的post方式提交
      // 原本的接口文档提供的数据接口为http://api.botue.com/login
      // 但是在跨域请求时设置了反向代理，在浏览器同源的web服务器上用api代替了http://api.botue.com,
      // 即原本接口请求数据的地址简化成api/login,但又由于请求是浏览器发出的，需要使用到浏览器网页的绝对地址，
      // 即数据接口要变成是http://studyit.com/api/login，所以在写相关的ajax请求数据的url时，地址要写成/api/login这种绝对路径写法



      $.ajax({
        url:"/api/login",
        type:"post",
        data:{
          tc_name:userName,
          tc_pass:pass
        },
        success:function (data) {
          console.log(data);
//                 当请求成功，数据成功返回时，执行跳转到首页
          if(data.code == 200){
//                   JSON.stringify()将对象转换成JSON字符串，因为cookie只能存储字符串，
//                   $.cookie(键,值,{expires:数据存储有效天数,path:存储路径}) "/"表示根目录
            $.cookie("userinfo",JSON.stringify(data.result),{expires:365,path:"/"});

//                   将数据保存到根目录下的cookie中以后，在首页中也可以访问到
            window.location.href = "index";
          }
        }
      });



      return false;
    });
  });
});