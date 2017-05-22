angular.module('notifications').factory('notifications', function() {
	var count = 0;
	var notifs = [];

	function add(type, title, text) {
		count++;
		type = type || 'info';
		title = title || (count + ' ' + type);
		text = text || ('Lorem ipsum dolor sit amet ' + count);

		var clazz = '';
		switch (type) {
			case 'info':
			case 'warning':
			case 'error':
				clazz = 'notification notification--' + type;
				break;
			default:
				clazz = 'notification';
		}
		notifs.push({
			id: count,
			type: type,
			title: title,
			text: text,
			clazz: clazz
		});

		// Keep only most recent 5 notifications
		if (notifs.length > 5) {
			remove(notifs[0]);
		}
	}

	function remove(notif) {
		notifs = notifs.filter(function(item) {
			return item.id != notif.id;
		});
	}

	function removeAll() {
		notifs.length = 0;
	}

	return {
		count: function() {
			return notifs.length;
		},
		notifs: function() {
			return notifs;
		},
		add: add,
		remove: remove,
		removeAll: removeAll
	};
});
