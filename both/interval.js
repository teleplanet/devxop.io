(function() {
    var ticks = 0;

    this.Interval = function(func, wait, times) {
        //console.log("interval called!");
        ticks = times;

        var interv = function(w, t){
            return function(){
                if(ticks > 0){
                    if(typeof t === "undefined" || t-- > 0){
                        setTimeout(interv, w);
                        try{
                            func.call(null);
                        }
                        catch(e){
                            t = 0;
                            throw e.toString();
                        }
                    }
                }
                
            };
        }(wait, ticks);

        setTimeout(interv, wait);
    }

    Interval.prototype.clear = function() {
        ticks = 0;
    }

    
}());