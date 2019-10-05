
fingerprint = function () {

    let res;
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.

        let fingerprint = localStorage.getItem("devxop_fingerprint");


        if(!fingerprint){
            let id = uuidv4();

            localStorage.setItem("devxop_fingerprint", id);

            Session.set("fingerprint", id);
            res = id;
        }else{
            Session.set("fingerprint", fingerprint);
            res = fingerprint;
        }

    } else {
        // Sorry! No Web Storage support..
    }

    window["fingerprint"] = res;

    return res;

}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }