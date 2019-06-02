let catArray = [
	{
        "name" : "Entradas | Snacks",
        "name_en" : "Starters | Snacks",
        "name_es" : "Entrantes | Snacks"
    },{
        "name" : "Carne",
        "name_en" : "Meat",
        "name_es" : "Carne"
    },{
        "name" : "Peixe | Marisco",
        "name_en" : "Fish | Seafood",
        "name_es" : "Pescado | Marisco"
    },{
        "name" : "Sobremesas",
        "name_en" : "Desserts",
        "name_es" : "Postres"
    },{
        "name" : "Cafetaria | Sumos",
        "name_en" : "Coffee | Juices",
        "name_es" : "Cafetería | Zumos"
    },{
        "name" : "Cerveja",
        "name_en" : "Beer",
        "name_es" : "Cerveza"
    },{
        "name" : "Vinho Tinto",
        "name_en" : "Red Wine",
        "name_es" : "Vino Tinto"
    },{
        "name" : "Vinho Rosé",
        "name_en" : "Rose Wine",
        "name_es" : "Vino Rosé"
    },{
        "name" : "Vinho Branco",
        "name_en" : "White Wine",
        "name_es" : "Vino Blanco"
    },{
        "name" : "Aperitivos | Vinhos Especiais",
        "name_en" : "Liqueurs | Special Wines",
        "name_es" : "Aperitivos | Vinos Especiales"
    },{
        "name" : "Champagne | Espumante",
        "name_en" : "Champagne | Sparkling Wine",
        "name_es" : "Champagne | Espumante"
    },{
        "name" : "Especiais",
        "name_en" : "Specials",
        "name_es" : "Especial"
    },{
        "name" : "Vegetariano",
        "name_en" : "Vegetarian",
        "name_es" : "Vegetariano"
    }
] 


//Create default database documents
dbFixtures = function(){

	//Create roles if none exist

	if(Roles.getAllRoles().fetch().length < 1){ 
		console.log('[FXT] Create permissions/group roles...');
		Roles.createRole('root');
		Roles.createRole('admin');
		Roles.createRole('staff');
	};

	//Create superuser if none
	let rootUser = Meteor.users.findOne({
		'roles': {
			$in: ['root']
		}
	});

	if(typeof rootUser === 'undefined'){

		console.log('[FXT] Create system superuser...');

	    let userId = Accounts.createUser({
	        email: 'admin@admin.com',
	        password: 'admin',
	        profile: {
	        	username: 'admin',
	            firstName: 'Root',
	            lastName: 'Admin'
	        }
	    });

	    Roles.addUsersToRoles(userId, 'root');

	}

	let companies = Companies.find().fetch();

	if(companies.length < 1){

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

	let categories = Categories.find().fetch();
	if(categories.length < 1){
		for(var i = 0; i < catArray.length; i++){
            catArray[i]["category"] = i;
			Categories.insert(catArray[i], function(err, data){
				if(err){
					console.log(err);
				}
			});
		}
	}

}