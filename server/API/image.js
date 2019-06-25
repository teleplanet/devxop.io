Router.route('/test/test.jpg', function() {
    
    //imgContent = `<html><body><img src="${imgContent}"></body></html>`;
    let res = this.response;

    let data = Items.findOne().image;

    console.log(data.length);
  
    var img = Buffer.from(data, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img.length
    });
    res.end(img); 

  }, {where: 'server'});