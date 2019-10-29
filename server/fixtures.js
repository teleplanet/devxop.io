

//Create default database documents
dbFixtures = function () {

    //Create roles if none exist

    if (Roles.getAllRoles().fetch().length < 1) {
        console.log('[FXT] Create permissions/group roles...');
        Roles.createRole('root');
        Roles.createRole('admin');
        Roles.createRole('staff');
    };

    Meteor.call("plans.fixtures");
    

    let companies = Companies.find().fetch();

    if (companies.length < 1) {

        console.log('[FXT] Create demo company & users...');

        //Create company
        var companyId = Companies.insert({
            name: 'GS Bistro',
            createDate: new Date(),
            active: true
        });

        //Create users
        //Daniel
        userId = Accounts.createUser({
            email: 'daniel@demo.com',
            password: '123',
            profile: {
                username: 'daniel',
                firstName: 'Daniel',
                lastName: 'Abrantes',
                company: companyId
            }
        });

        Roles.addUsersToRoles(userId, 'admin');

    }

    let devices = Devices.find().fetch();
    if (devices.length < 1) {

        console.log("devices inserted");
        Devices.insert({
            "device_id": "4fe84085-6488-4b08-941d-4286dfadd075",
            "authorization_code": "HlLH4OHd4tH1QMLn2JtHzdbEOSlziVZX8a9BZFkF941",
            "update_stamp": 1560100348116.0,
            "operating_system": "android",
            "device_type": "screen_display",
            "auth": {
                "access_token": "GMNHgFGrUt8AuvkQCqSu4DLlgkPgYH9C0tjB1n5B5AO",
                "refresh_token": "pW-IpP1vCFQvuG8GYfARTLxI03COg6penRJHjfshmpx",
                "stamp": 1560100348116.0,
                "user_id": "PWATjhtWwnihy597A"
            },
            "name": "Asus",
            "selected_display": "sZq2EoN7hcrnqyyrc"
        });
    }

}