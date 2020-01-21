Meteor.publish('revenues', function () {

    return Revenues.find({"user_id": this.userId });

});


Meteor.publish('invoices', function (query) {

    //console.log(query);

    if(query){
        if(query.day && query.year && query.month){
            console.log("full query");
            return Invoices.find({"user_id": this.userId, "day": query.day.toString(), "month": query.month.toString(), "year": query.year.toString()});
        }else if (query.year && query.month){
            console.log("year and month");
            return Invoices.find({"user_id": this.userId, "month": query.month.toString(), "year": query.year.toString()});
        }else if (query.year){
            console.log("year query");
            return Invoices.find({"user_id": this.userId, "year": query.year.toString()});
        }
    }else{
        return Invoices.find({"user_id": this.userId});
    }

    

});
