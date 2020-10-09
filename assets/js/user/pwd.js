$(() => {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: value => {
            let oldpwd = $("[name=oldPwd]").val()
            if (value === oldpwd) {
                return "新旧密码不能一致"
            }
        },
        repwd: value => {
            let newpwd = $("[name=newPwd]").val()
            if (value !== newpwd) {
                return "两次密码不一致"
            }
        }
    })
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                $(".layui-form")[0].reset()
            }
        })
    })
})