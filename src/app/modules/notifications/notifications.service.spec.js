describe('notifications.service', function() {

	var notifications;

	beforeEach(function() {
		module('notifications');

		inject(function(_notifications_){
			notifications = _notifications_;
		});
	});

	it('Notification list starts empty', function() {
		expect(notifications.count()).toBe(0);
	});

	it('Adding first notification increments list', function() {
		notifications.add();
		expect(notifications.count()).toBe(1);
	});

	it('Allows max 5 notifications at a time', function() {
		var notifsToAdd = 10, count = notifsToAdd;
		while (count--) {
			notifications.add();
		}
		expect(notifications.count()).toBe(5);
	});

	it('Can remove all notifications', function() {
		var count = 5;
		while (count--) {
			notifications.add();
		}
		notifications.removeAll();
		expect(notifications.count()).toBe(0);
	});

	it('Can remove any single notification', function() {
		var count = 5;
		while (count--) {
			notifications.add();
		}
		notifications.remove(notifications.notifs()[0]);
		expect(notifications.count()).toBe(4);
	});

	it('Adding notification without arguments sets default values', function() {
		var count = 5;
		while (count--) {
			notifications.add();
		}
		var third = notifications.notifs()[2];
		expect(third.id).toBe(3);
		expect(third.type).toBe('info');
		expect(third.title).toBe('3 info');
		expect(third.text).toBe('Lorem ipsum dolor sit amet 3');
		expect(third.clazz).toBe('notification notification--info');
	});
});
