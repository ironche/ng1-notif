angular.module('notifications').component('notifications', {
	controller: ['notifications', function(notifications) {
		return {
			count: notifications.count,
			notifs: notifications.notifs,
			remove: notifications.remove,
			removeAll: notifications.removeAll
		};
	}],
	templateUrl: 'templates/modules/notifications/notifications.html'
});
