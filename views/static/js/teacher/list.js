define(["jquery","template"],function ($,template) {

  $(function () {
    //  向后台请求数据，结合模板生成讲师列表
    $.ajax({
      url:"/api/teacher",
      success:function (data) {
        if(data.code == 200){
          console.log(data);
          // 利用模板创建讲师列表
          $(".teacher_list").html(template("teacher_list_tpl",data));
        }
      }
    });

   // 设置注销/启动按钮的点击事件,利用事件委托
    $(".teacher_list").on("click","#btn-status",function () {
        var id = $(this).parent().data("id");
        var status = $(this).data("status");
        var that = $(this);
        $.ajax({
          url:"/api/teacher/handle",
          type:"post",
          data:{
            tc_id:id,
            tc_status:status
          },
          success:function (data) {
            if(data.code == 200){
              console.log(data);
              if(status == 1) {
                that.removeClass("btn-warning").addClass("btn-success").text("启 用");
              } else {
                that.removeClass("btn-success").addClass("btn-warning").text("注 销");
              }
            }
            // 点击切换样式和文字内容以后，需要将注销启用键的data-status的值改成请求数据返回后的值
            that.data("status",data.result.tc_status);
          }
        })
    });



  });


});