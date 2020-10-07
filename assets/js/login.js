$(() => {
    /* 单击去注册显示注册面板 */
    $("#link-reg").on('click', () => {
        $(".reg-box").show();
        $(".login-box").hide();
    })
    /* 单击去登录显示登录面板 */
    $("#link-login").on('click', () => {
        $(".reg-box").hide();
        $(".login-box").show();
    })
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,16}$/, "密码必须6-16位，不能出现空格"],
        repwd: value => {
            let pwd = $(".reg-box input[name=password]").val();
            if (value !== pwd) {
                return "两次输入密码不一致";
            }
        }
    })
    let layer = layui.layer;
    $("#form-reg").on('submit', e => {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                $("#link-login").click()
            }
        })
    })
    $("#form-login").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    console.log(1);
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功'); console.log(1);
                localStorage.setItem("token", res.token);
                location.href = "/index.html"
            }
        })
    })
})