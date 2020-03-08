vwToPx = function(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
    var result = (x*value)/100;
    //document.getElementById("result_vw_px").innerHTML = result;  // affichage du résultat (facultatif)
    return result;
  }
  
  vhToPx = function(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
    var result = (y*value)/100;
    //document.getElementById("result_vh_px").innerHTML = result;  // affichage du résultat (facultatif)
    return result;
  }
  
  pxToVw = function(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
    var result = (100*value)/x;
    //document.getElementById("result_px_vw").innerHTML = result;  // affichage du résultat (facultatif)
    return result;
  }
  
pxToVh = function(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  
    var result = (100*value)/y;
    //document.getElementById("result_px_vh").innerHTML = result;  // affichage du résultat (facultatif)
    return result;
  }