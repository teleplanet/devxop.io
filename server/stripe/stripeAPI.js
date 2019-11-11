Router.route('/stripe/session/completed', { where: 'server' }).get(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req),
        headers = req.headers;
    
    
    resp(res, 200, "OK")
});
