require.config({
  // 设置基础路径，后面的requirejs中的路径都是以这个为基础
  baseUrl:"/views/assets",
  // 给模块的路径使用别名进行设置，前面的是别名，后面的是模块路径
  paths:{
     jquery:"./jquery/jquery",
     cookie:"./jquery-cookie/jquery.cookie",
     template:"./artTemplate/template",
    // bootstrap不支持模块化，需要shim配置
     bootstrap:"./bootstrap/js/bootstrap",
     utils:"../static/js/lib/utils",
     form:"./jquery-form/jquery.form"
  },
  shim:{
    bootstrap:{
      // bootstrap不支持模块化，又依赖于jquery
      deps:["jquery"]
    }
  }
});