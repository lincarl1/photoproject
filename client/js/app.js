/* register the modules the application depends upon here*/
angular.module('users', []);

angular.module('orders', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('printsApp', ['users', 'orders']);


// allows a file type input for ng-model
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

