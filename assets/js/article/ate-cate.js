$(() => {
    initArtCatelist();
    function initArtCatelist() {
        $.ajax({
            url: '/my/article/cates',
            success: res => {
                let str = template("tpl-table", res);
                $("tbody").html(str)
            }
        })
    }
    let layer = layui.layer;
    let form = layui.form
    $("#btnAdd").on("click", () => {
        layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: "添加文章分类",
            content: $("#dialogadd").html()
        })
    });
    $("body").on("click", '#btn-edit', () => {
        layer.open({
            type: '1',
            area: ['500px', '260px'],
            title: "修改文章分类",
            content: $("#dialogedit").html()
        })
        let id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            data: $(this).serialize(),
            success: res => {
                form.val("form-edit", res.data)
            }
        })
    })
    let indexEdit = null
    $("body").on('submit', "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCatelist();
                layer.msg(res.message);
                layer.close(indexadd)
            }
        })
    })
    $("body").on('submit', "#form-edit", function (e) {
        e.preventDefault();
        let Id = $(this).attr('data-id');
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCatelist();
                layer.msg(res.message);
                //layer.close(indexEdit);
            }
        })
    })
    $(".tbody").on('chick', ".closer", function () {
        let id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
    $('body').on("click", ".btn-delete", () => {
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, index => {
            $.ajax({
                method: "get",
                url: '/my/article/deldete' + id,
                success: res => {
                    if (res.status !== 0) {
                        return layer.msg("删除失败");
                    }
                    initArtCatelist();
                    layer.msg("删除成功")
                    if ($(".btn-delete").length === 1 && q.pagenum > 1) q.pagenum--
                    layer.close(index)
                }
            })

        })
    })
})