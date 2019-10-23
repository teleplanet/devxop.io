Template.publicBase.onRendered(function () {

    let route = Router.current().route.getName();
    $(".nav-button").removeClass("active");
    if (route === "landing") {
        $("#nav-button-overview").toggleClass("active");
        Router.go('landing');
    } else if (route === "landing.app") {
        $("#nav-button-app").toggleClass("active");
        Router.go('landing.app');
    } else {
        console.log("couldnt find route to set selected nav button state");
    }

});

Template.publicBase.events({
    'click .nav-button': function (event) {

        let route = $(event.currentTarget).data("route");

        $(".nav-button").removeClass("active");
        if (route === "landing") {
            $("#nav-button-overview").toggleClass("active");
            Router.go('landing');
        } else if (route === "landing.app") {
            $("#nav-button-app").toggleClass("active");
            Router.go('landing.app');
        } else {
            console.log("couldnt find route to set selected nav button state");
        }
    }
})
