app.factory('navServe', [function () {
	return {
		adminPath: function (path, id) {
			if (path === '/adminCal') {
				return true;
			} else if (path === '/adminEvent') {
				return true;
			} else if(path === '/adminEvent/' + id) {
				return true;
			} else if(path === '/volunteerList/' + id) {
				return true;
			} else {
				return false;
			}
		},

		showSearch: function (path) {
			if (path === '/adminCal') {
				return true;
			} else {
				return false;
			}
		},

		showVolunteers: function(path, id) {
			if (path === '/adminEvent') {
				return true;
			} else if (path === '/adminEvent/' + id){
				return true;
			} else {
				return false;
			}
		},

		showBack: function(path) {
			if (path === '/volunteerList') {
				return true;
			} else {
				return false;
			}
		}
	}
}]);
