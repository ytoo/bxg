define(["jquery","template","bootstrap"],function ($,template) {

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

    // 点击查看按钮出现模态框。出现当前点击讲师的具体信息
    $(".teacher_list").on("click","#view-teacher",function () {
      var id = $(this).parent().data("id");
      $.ajax({
        url:"/api/teacher/view",
        data:{
          tc_id:id
        },
        success:function (data) {
          console.log(data);
          if(data.code == 200){
            // 根据返回的数据结合模板创建模态框的结构
            // 如果返回的data数据的result是数组（数组里面是对象），那么在模板引擎中传入data，并在创建模板时使用
            // {{each result as value index}} {{/each}}进行遍历，如果返回的data数据的result是单一的对象，那么就直接在
            // 模板引擎中传入data.result，并在创建模板时就不要使用上面的遍历方法，在模板里面直接写出result后面对象的每个属性就可以了
            $("#teacherModal>.modal-dialog").html(template("teacher_modal",data.result));

            // 创建完结构以后，让模板显示出来
            $("#teacherModal").modal("show");
          }
        }
      });

    });



  });


});