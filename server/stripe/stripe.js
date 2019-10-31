

/* (async () => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt',
            images: ['https://example.com/t-shirt.png'],
            amount: 500,
            currency: 'eur',
            quantity: 1,
        }],
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel',
    });


})(); */


Meteor.methods({
    'stripe.archive': function (session) {
        session["old_id"] = session._id;
        delete session._id;

        let archived = StripeSessionsArchive.insert(session);

        if (archived) {
            let removed = StripeSessions.remove(session.old_id);
        } else {
            console.log("error occured while archiving");
        }
    },
    'stripe.session.basic': async function () {

        StripeSessions.remove({"user_id": Meteor.userId(), "validated": false});

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: 'Basic Plan',
                description: 'Devxop basic plan for management app.',
                images: ['https://image.flaticon.com/icons/svg/855/855929.svg'],
                amount: 999,
                currency: 'eur',
                quantity: 1,
            }],
            success_url: 'http://localhost:3000/plan/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/',
        });

        session['user_id'] = this.userId;
        session['validated'] = false;
        session['stamp'] = new Date().getTime();
        session["plan_id"] = "basic";
        StripeSessions.insert(session);


        return session;

    },
})