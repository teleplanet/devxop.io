/* This function is used to access remote or local DB of files storage */
origins = function(){
    let data = {
        db: "",
        files: "",
    }

    if (Meteor.isProduction) {
        data.db = "http://db.devxop.com/"
    } else {
        data.db = "http://localhost/"
    }

    data.files = data.db + "files/"

    return data;
}