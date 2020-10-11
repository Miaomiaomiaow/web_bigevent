$(() => {
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable();
    function initTable() {
        $.ajax({
            method: "GET",
            url: '/my/article/list',
            data: q,
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                let str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    template.defaults.imports.dataFormat = dtSty => {
        const dt = new Date(dtSty)
        let y = dt.getFullYear();
        let m = addzero(dt.getMonth() + 1);
        let d = addzero(dt.getDate());
        let h = addzero(dt.getHours());
        let min = addzero(dt.getMinutes());
        let s = addzero(dt.getSeconds());
    }
    function addzero(x) {
        return x < 10 ? "0" + x : x
    }
    let form = layui.form;
    initCate()
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layre.msg(res.message)
                }
                let str = template('tpl-cate', res)
                $("[name=cate_id]").html(str)
                form.render()
            }
        })
    }
    $("#form-search").on("submit", e => {
        e.preventDefault()
        let state = $("[name=state]").val();
        let cate_id = $("[name=cate_id]").val();
        q.state = state;
        q.cate_id = cate_id;
        initTable()
    })
    let laypage = layui.laypage;
    function renderPage(num) {
        laypage.render({
            elem: 'pageBox'
            , count: num
            , limit: q.pagesize
            , curr: q.pagenum
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , limits: [2, 3, 5, 10]
            , jump: (obj, first) => {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) initTable();
            }
        });
    }
})