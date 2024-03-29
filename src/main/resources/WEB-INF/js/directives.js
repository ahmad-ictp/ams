'use strict';

/* Directives */

angular.module('app.directives', []).

directive('navigationBar', function() {
	return {
		restrict: 'E',
		templateUrl: '/api/partials/navbar'
	}
}).

directive('changePassword', ['$http', 'userService', function($http, userService) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/api/partials/change-password',
		link: function(scope, element, attrs) {
			var form = scope.cpw_form;
			userService.then(function(user) {
				scope.username = user.username;
			});
			scope.changePassword = function(event) {
				event.preventDefault();
				setDirty(form.newpassword);
				setDirty(form.oldpassword);
				setDirty(form.repeatpassword);
				if(form.$valid) {
					$http.post('/api/change-password', {
						username: scope.username,
						newpassword: form.newpassword.$viewValue,
						password: form.oldpassword.$viewValue
					}).success(function(data, status) {
						scope.successMessage = data;
						scope.errorMessage = '';
						setTimeout(function() {
							angular.element('#change_password').modal('hide');
						}, 1000);
						
					}).error(function(data, status) {
						scope.successMessage = '';
						scope.errorMessage = data;
					});	
				}	
			}
			//set dirty to form field level
		  var setDirty = function(field) {
		    field.$dirty = true;
		    field.$pristine = false;
		  };
		  // register popover event
			var input_newpassword = element.find('input[name=newpassword]');
			input_newpassword.popover({
				trigger: 'focus',
				container: 'body',
				title: 'Constraints',
				content: "The length must be between 6 to 20 characters. There should be at least one number and one letter of upper case or lower case."
			});
		}
	}
}]).

directive('matchPassword', ['$parse', function($parse) {
	return {
		require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      scope.$watch(function() { 
        return $parse(attrs.matchPassword)(scope) === ngModel.$viewValue;
      }, function(currentValue) {
        ngModel.$setValidity('mismatch', currentValue);
        // fix a bug of AngularJS
        if(ngModel.$modelValue == undefined) scope.repeatpassword = ngModel.$$invalidModelValue;
      });
    }
	}
}]).

directive('leftPanel', function() {
	return  {
		restrict: 'E',
		templateUrl: '/api/partials/left-panel',
		link: function(scope, elem, attr){
			var activeli = angular.element(elem).find('li.active');
			angular.element(elem).find('a').click(function(event) {
				activeli.removeClass('active');
				activeli = angular.element(this).parent();
				activeli.addClass('active');
			})
		}
	}
});