angular.module('todoApp').directive('closeEditing', function () {
	var keys = {
		escape: 27
	};

	return {
		scope: {
			isEditing: '='
		},
		link: function (scope,element, attrs) {
			console.log('in');
			element.on('keyup', function (e) {
				if (e.keyCode == keys.escape) {
					console.log('press esc');
					// scope.isEditing = false;
					// scope.$apply();
				}
			});
		}
	};
});