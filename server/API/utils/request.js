getParams = function(req){
    let query = req.query,
        body = req.body,
        params = {};

    if(Object.keys(query).length === 0 && query.constructor === Object){
        //query does not exist
        
        if(Object.keys(body).length === 0 && body.constructor === Object){
            //body does not exist
        }else{
            //body params exist
            params = body;
        }
    }else{
        //query params exist
        params = query;
    }

    return params;
}   