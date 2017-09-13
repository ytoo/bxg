require.config({
  // 设置基础路径，后面的requirejs中的路径都是以这个为基础
  baseUrl:"/views/assets",
  // 给模块的路径使用别名进行设置，前面的是别名，后面的是模块路径
  paths:{
     jquery:"./jquery/jquery",
     cookie:"./jquery-cookie/jquery.cookie",
     template:"./artTemplate/template"
  }
});