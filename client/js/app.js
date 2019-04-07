/* register the modules the application depends upon here*/
angular.module('users', []);

angular.module('orders', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('printsApp', ['users', 'orders']);


// allow ng-model to take in files
/*
//https://stackoverflow.com/questions/45548472/how-to-fire-ng-change-with-filemodel-input-type-file
app.directive("filesInput", function() {
	return {
		require: "ngModel",
		link: function postLink(scope,elem,attrs,ngModel) {
			elem.on("change", function(e) {
				var files = elem[0].files;
				ngModel.$setViewValue(files);
			});
		}
	}
});
*/
//https://stackoverflow.com/questions/17063000/ng-model-for-input-type-file-with-directive-demo
/*
app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    }
}]);
*/


app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

