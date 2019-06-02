const applicationServerPublicKey = 'BCYAArss4spVaioXaM-p--Z1-hi_N0UFEVVVOEhLgwdL9syAVIdbJYbXWh7Dcp_siXHxik6vZ9aNrqGt_8NlgDk';

let pushButton = null;

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function updateBtn() {
	if (Notification.permission === 'denied') {
		pushButton.text('Push Messaging Blocked.');
		pushButton.hide();
		updateSubscriptionOnServer(null);
		return;
	}

	if (isSubscribed) {
		pushButton.text('Disable Push Messaging');
	} else {
		pushButton.text('Enable Push Messaging');
	}

	pushButton.show();
}

function updateSubscriptionOnServer(subscription) {
	// TODO: Send subscription to application server

	const subscriptionJson = $('.js-subscription-json');
	const subscriptionDetails =
		$('.js-subscription-details');

	if (subscription) {
		let sub = JSON.stringify(subscription);


		Meteor.call("pager.subscribe", sub, function(err, data){
			if(err){}
			else{
				console.log("[ServiceWorker] Pager subscribed: " + data);
			}
		});

		subscriptionJson.text(sub);
		subscriptionDetails.removeClass('is-invisible');
	} else {
		subscriptionDetails.addClass('is-invisible');
	}
}

function subscribeUser() {
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	swRegistration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: applicationServerKey
	})
		.then(function (subscription) {
			console.log('User is subscribed.');

			
			updateSubscriptionOnServer(subscription);

			isSubscribed = true;

			updateBtn();
		})
		.catch(function (err) {
			console.log('Failed to subscribe the user: ', err);
			updateBtn();
		});
}

function unsubscribeUser() {
	swRegistration.pushManager.getSubscription()
		.then(function (subscription) {
			if (subscription) {
				let sub = JSON.stringify(subscription);

				Meteor.call("pager.unsubscribe", sub, function(err, data){
					if(err){}
					else{
						console.log("[ServiceWorker] Pager unsubscribed!");
					}
				});

				return subscription.unsubscribe();
			}
		})
		.catch(function (error) {
			console.log('Error unsubscribing', error);
		})
		.then(function (sub) {
			updateSubscriptionOnServer(null);

			console.log('User is unsubscribed.');
			isSubscribed = false;

			updateBtn();
		});
}

function initializeUI() {

	// Set the initial subscription value
	swRegistration.pushManager.getSubscription()
	.then(function (subscription) {
		isSubscribed = !(subscription === null);

		updateSubscriptionOnServer(subscription);

		if (isSubscribed) {
            console.log('User IS subscribed.');
            console.log(subscription);

            console.log(JSON.stringify(subscription));
		} else {
			console.log('User is NOT subscribed.');
		}

		updateBtn();
	});
}

Template.home.onRendered(function(){
    pushButton = $('.js-push-btn');

	//################# NOTIFICATION WORKER #######################
	if ('serviceWorker' in navigator && 'PushManager' in window) {
		console.log('Service Worker and Push is supported');

		navigator.serviceWorker.register('sw.js')
			.then(function (swReg) {
				console.log('Service Worker is registered', swReg);

				swRegistration = swReg;
				initializeUI();
			})
			.catch(function (error) {
				console.error('Service Worker Error', error);
			});
	} else {
		console.warn('Push messaging is not supported');
		pushButton.textContent = 'Push Not Supported';
	}
});

Template.home.events({
    'click .js-push-btn': function(){
        console.log("clicked!");
        pushButton.hide();
		if (isSubscribed) {
			unsubscribeUser();
		} else {
			subscribeUser();
		}
    }
})