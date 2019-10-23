Template.moduleProcessingLoader.onRendered(function(){
    Session.set("module.processingLoader", false); 
});


Template.moduleProcessingLoader.helpers({
    'processing': function(){
        let bool = Session.get("module.processingLoader");

        if(bool){
            return true;
        }else{
            return false;
        }
    }
});