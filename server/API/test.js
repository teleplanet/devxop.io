Router.route('/test', { where: 'server' }).get(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    //console.log(params.device_id);

    let template = TemplatesImageText.find().fetch()[1];

    let html = '<html><header><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/></header><body style="margin: 0; padding: 0"> '+ template.DOM +'</body></html>'


    res.end(html)


});