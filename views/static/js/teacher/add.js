define(["jquery","utils","template"],function ($,utils,template) {
  $(function () {

    // 思路分析：
    // 由于添加讲师和编辑讲师需要跳转的是同一个界面（只是在细节上有稍微的不同），所以我们可以使用同一个模板去创建这个界面
    // 创建模板需要传入的数据对象需要我们自己去根据跳转后的界面具体去设置
    // 并且编辑讲师时需要传入当前讲师的ID，这样才能根据这歌ID去请求对应讲师的具体数据需要到编辑界面，然后修改讲师以后，再次进行提交操作到数据，跟新数据库
    // 但是在添加讲师操作时不需要这个id值，所以可以将这个id坠在地址栏后面，在添加/编辑界面用getQueryUrl函数去获取到id值，如果有就是编辑操作
    // 如果没有就是添加操作。在编辑界面修改数据以后，需要将修改后的数据发送到后台

    var id = utils.getQueryUrl().id;
    // 当有id时，执行编辑操作
    if(id){
      $.ajax({
        url:"/api/teacher/edit",
        data:{
          tc_id:id
        },
        success:function (data) {
          if(data.code == 200){
            // 由于编辑界面和添加界面在title和btnText，以及是否有密码项的位置不同，所以需要我们在传入数据时，
            // 自己设置title和btnText为传入的参数。是否需要密码项则需要在模板里面根据是否有id进行判断

            data.result.title = "编辑讲师";
            data.result.btnText = "保存";
            $(".teacher,.body").html(template("teacher_add_edit_tpl",data.result));

            // 然后再给保存按钮添加点击保存修改内容的事件
            $("#save-btn").on("click",function () {
              $.ajax({
                url:"/api/teacher/update",
                type:"post",
                data:$("form").serialize(),
                success:function (data) {
                  if(data.code == 200){
                    window.location.href = "/teacher/list";
                    // console.log($("form").serialize());
                  }
                }
              });
            });
          }
        }
      });

    } else {
      // 当没有Id时执行添加讲师操作
      // 先将添加讲师的页面渲染到页面
      var obj = {
        title:"添加讲师",
        btnText:"添加"
      };
      $(".teacher,.body").html(template("teacher_add_edit_tpl",obj));

      // 点击添加按钮发送添加讲师请求
       $("#save-btn").on("click",function () {
          $.ajax({
            url:"/api/teacher/add",
            type:"post",
            data:$("form").serialize(),
            success:function (data) {
              if(data.code == 200) {
                window.location.href = "/teacher/list";
              }
            }
          })

       });



    }

















  });
});