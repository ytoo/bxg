
	define(["jquery","template","cookie"],function ($,template) {
    // 有一个漏洞，就是如果不对用户的登录状态做检测，用户可以直接登录首页，这是不对的
//      因为用户只要登录过后后台会给浏览器返回一个PHPSESSID,保存在cookie中，说以可以根据这个值是否存在，来判断用户是否已经登录过了、

    // 当不在登录界面时，才执行内部的代码
    if(location.pathname != "/dashboard/login") {
      if(!$.cookie("PHPSESSID")){
        window.location.href = "dashboard/login";
      }
// 获取到缓存在cookie中的用户数据，用$.cookie()设置的，需要再用$.cookie()获取
//      这里获取到$.cookie("userinfo")是字符串，需要用JSON.parse()转换一下成JSON对象
      var data = JSON.parse($.cookie("userinfo"));
      console.log(data);
      // 利用模板创建用户头像的结构
      $("#profile").html(template("profile_tpl",data));

    }

  });