$(() => {
    let layer = layui.layer;
    let form = layui.form;
    initcate();
    function initcate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $("#btnChooseImage").on("click", () => $("#coverFile").click())
    $("#coverFile").on("change", e => {
        let files = e.target.files;
        if (files.length === 0) {
            return layer.msg("请选择头像")
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3. 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    let art_state = '已发布'
    $("#btnSave2").on("click", () => art_state = "草稿")
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        this.append("state", art_state);
        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            console.log(...fd);
            fd.append('cover_img', blob)
            // 6. 发起 ajax 数据请求
            publishArticle(fd)
        })
    })
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg("文件提交失败")
                }
                layer.msg("文件提交成功，跳转中 ^_^");
                setTimeout(() => {
                    window.parent.document.querySelector("#qwq").click()
                }, 2000)
            }
        })
    }
})