/* register the modules the application depends upon here*/
angular.module('users', []);

angular.module('orders', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('printsApp', ['users', 'orders']);