resp = function (res, code, data) {
    //create response data
    var resp = {
        code: code,
        status: codeStatus[code],
    };

    if (codeError[code]) {
        resp["reason"] = codeReason[code];
    } else {
        //if data exists -> add to response body object
        if (data && typeof data != "undefined") {
            resp["data"] = data;
        }
    }

    res.status = code;
    return res.end(JSON.stringify(resp));
}