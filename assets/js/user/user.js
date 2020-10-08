$(() => {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: value => {
            if (value.length > 6) return "字符长度在1-6之间"
        }
    })
    inituserinfo();
    function inituserinfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            },
        })
    }
    $("#btnReset").on('click', e => {
        e.preventDefault();
        inituserinfo();
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.gituserInfo()
            }
        })
    })
})