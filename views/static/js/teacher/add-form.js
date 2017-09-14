define(["jquery","utils","template","form","datepicker","datepickerCN","validate"],function ($,utils,template) {
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

    // 加载数据后要进行的系列操作
    function renderData(data) {
      // 1、根据数据结合模板创建结构渲染到页面
      $(".teacher,.body").html(template("teacher_add_edit_tpl",data));

      ///2、创建表单以后，再使用datepicker日期选择插件的方法设置入职时间
      $("input[name='tc_join_date']").datepicker({
        // 设置日期的样式格式
        format:"yyyy-mm-dd",
        // 设置当点击日期日历选中后，自动关闭
        autoclose:true,
        // 设置日期日历的语言
        language:"zh-CN",
        // 设置开始可选日期为当前日期的前三天
        startDate:"-3d",
        // 设置结束可选日期为当前日期的后七天
        endDate:"+7d"
      });

      // 3、注册表单的验证事件
      $("form").validate({
        // 取消表单默认的点击发送请求的事件
        sendForm:false,
        // 设置表单失去焦点时触发事件，默认是false
        onBlur:true,
        // 设置表单内容改变时触发事件,默认为false
        onChange:true,
        // valid是当表单全部项都验证通过时，form表单调用的方法
        valid:function () {
          // 这里的this指向form表单，是js对象
          $(this).ajaxSubmit({
            success:function (data) {
              if(data.code == 200) {
                window.location.href = "/teacher/list";
              }
            }
          });
        },
        // eachValidField是当表单每一项通过验证时，input表单元素调用这个方法
        eachValidField:function () {
          // console.log("eachValidField被调用")
          // 这里的this指向调用eachValidField方法的表单元素input，是JQ对象
          this.parent().parent().addClass("has-success").removeClass("has-error");
        },
        // eachInvalidField是当表单每一项没有通过验证时，input表单元素调用这个方法
        eachInvalidField:function () {
          // console.log("eachInvalidField被调用")
          // 这里的this指向调用eachInvalidField方法的表单元素input，是JQ对象
          this.parent().parent().addClass("has-error").removeClass("has-success");
        },
        // 这里是根据表单元素的data-description=“参数”里面的“参数”对应的表单元素被设置的验证项的提示信息
        description:{
          name:{
            required:"用户名不能为空"
          },
          password:{
            required:"密码不能为空",
            pattern:"你输入的密码不是6-10位的数字或字母"
          },
          date:{
            required:"入职日期不能为空"
          }
        }

      })


    }


    // 将表单提交的事件委托到父元素上，这样就可以将上面判断中公共的表单提交方法进行提取
    // 但是这一步可以放到上面表单验证中的valid回调函数中执行，即当验证通过时，发送ajaxSubmit异步提交数据
    // $(".body,.teacher").on("submit","form",function () {
    //   $(this).ajaxSubmit({
    //     success:function (data) {
    //       if(data.code == 200) {
    //         window.location.href = "/teacher/list";
    //       }
    //     }
    //   });
    //   return false;
    // });


  });
});