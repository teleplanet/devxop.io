Router.route('/admin',{
	name: 'admin',
    controller: 'AdminController',
	action: function(){

		//Render dashboards according to user role
		if(Meteor.user()){
			//Session.set("route", "Dashboard");
            this.render('admin');
        }
        
        this.next();

	},
});


Router.route('/admin/users',{
	name: 'admin.users',
    controller: 'AdminController',
	action: function(){     
        this.render('adminUsers');
	},
});

Router.route('/admin/collections',{
	name: 'admin.collections',
    controller: 'AdminController',
	action: function(){     
        this.render('adminCollections');
	},
});

Router.route('/admin/devices',{
	name: 'admin.devices',
    controller: 'AdminController',
	action: function(){     
        this.render('adminDevices');
	},
});


Router.route('/admin/messages',{
	name: 'admin.messages',
    controller: 'AdminController',
	action: function(){     
        this.render('adminMessages');
	},
});