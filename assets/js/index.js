$(() => {
    gituserInfo();
    let layer = layui.layer
    $("#btnLogOut").on("click", () => {
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
function gituserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem("token") || "",
        },
        success: res => {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvater(res.data)
        },
        // complete: res => {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem("token");
        //         location.href = "/login.html"
        //     }
        // }
    })
}
function renderAvater(user) {
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    }
    else {
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase()
        $(".text-avatar").show().html(text);
    }
}