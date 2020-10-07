let baseurl = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(params => params.url = baseurl + params.url)
console.log(params.url);