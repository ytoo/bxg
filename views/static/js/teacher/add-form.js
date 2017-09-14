define(["jquery","utils","template","form","datepicker","datepickerCN"],function ($,utils,template) {
  $(function () {

    // 使用jquery-form插件完成表单提交的功能
    // jQuery-form插件可以将表单需要提交的地址，方式写在form的action和method属性里面，而需要传入的数据则写在表单元素的name属性里面
    // 然后再调用插件的.ajaxSubmit()方法，就可以完成表单提交

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
            // 由于编辑界面和添加界面在title和btnText，以及是否有密码项的不同，所以需要我们在传入数据时，
            // 自己设置title和btnText为传入的参数。是否需要密码项则需要在模板里面根据是否有id进行判断

            data.result.title = "编辑讲师";
            data.result.btnText = "保存";
            data.result.url = "/api/teacher/update";
            // 根据数据结合模板创建结构渲染到页面
            renderData(data.result);

            // 点击事件利用表单提交，使用事件委托

          }
        }
      });

    } else {
      // 当没有Id时执行添加讲师操作
      // 先将添加讲师的页面渲染到页面
      var obj = {
        title:"添加讲师",
        btnText:"添加",
        url:"/api/teacher/add"
      };
      renderData(obj);

      // 点击事件利用表单提交，使用事件委托

    }

    // 根据数据结合模板创建结构渲染到页面的函数封装
    function renderData(data) {
      $(".teacher,.body").html(template("teacher_add_edit_tpl",data));

      // 创建表单以后，在使用datepicker插件的方法设置入职时间
      $("input[name='tc_join_date']").datepicker({
        format:"yyyy-mm-dd",
        autoclose:true,
        language:"zh-CN",
        startDate:"-3d",
        endDate:"+7d"
      });


    }


    // 将表单提交的事件委托到父元素上，这样就可以将上面判断中公共的表单提交方法进行提取
    $(".body,.teacher").on("submit","form",function () {
      $(this).ajaxSubmit({
        success:function (data) {
          if(data.code == 200) {
            window.location.href = "/teacher/list";
          }
        }
      });
      return false;
    });


  });
});