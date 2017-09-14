

 // 因为登录其他所有页面时，都要进行登录检测，所以将这个模块放在common中，
 // 然后再在js.html中用require引入commonjs，其他所有的文件用script引入js.html,这样每个文件都可以进行登录检测了
	define(["jquery","template","nprogress","cookie"],function ($,template,NProgress) {
    // 有一个漏洞，就是如果不对用户的登录状态做检测，用户可以直接登录首页，这是不对的
//      因为用户只要登录过后后台会给浏览器返回一个PHPSESSID,保存在cookie中，所以可以根据这个值是否存在，来判断用户是否已经登录过了、

    // 这里设置页面加载之前执行开始的进度条效果
    NProgress.start();
    $(function () {
      // 由于jQuery的入口函数是在页面结构加载完之后执行，所以可以再设置一个进度条结束
      NProgress.done();
      // 当不在登录界面时，才执行内部的代码
      if(location.pathname != "/dashboard/login") {
        if(!$.cookie("PHPSESSID")){
          window.location.href = "/dashboard/login";
        }
        // 获取到缓存在cookie中的用户数据，用$.cookie()设置的，需要再用$.cookie()获取
        //      这里获取到$.cookie("userinfo")是字符串，需要用JSON.parse()转换一下成JSON对象
        var data = JSON.parse($.cookie("userinfo"));
        console.log(1);
        // 利用模板创建用户头像的结构
        $("#profile").html(template("profile_tpl",data));
      }

      //  头部的退出登录，返回登录界面的功能
      $("#return-login").on("click",function () {
        $.ajax({
          url:"/api/logout",
          type:"post",
          success:function (data) {
            if(data.code == 200){
              console.log(data);
              window.location.href = "/dashboard/login";
            }
          }
        })
      });

      //  实现侧边栏点击给标题添加active类，显示不同样式的功能
      $("#aside-title>li a").each(function (i,e) {
        // 使用prop()获取href的结果是http://studyit.com/dashboard/index的形式
        // 而使用attr()获取的结果是/dashboard/index的形式，正好a链接里写的内容
        if($(this).attr("href") == window.location.pathname) {
          $(e).addClass("active");
        }
      });

      // 实现点击课程管理时出现下方的下拉菜单
      $("#course-manage").on("click",function () {
        $(this).children("ul").stop().slideToggle();
      });
    });

    // 利用 ajax的全局方法，在所有的ajax发送开始时设置一个回调函数，执行进度条nprogress的start()方法
    $(document).ajaxStart(function () {
      NProgress.start();
    });

    // 利用 ajax的全局方法，在所有的ajax发送结束时设置一个回调函数，执行进度条nprogress的done()方法
    $(document).ajaxStop(function () {
      NProgress.done();
    });






  });