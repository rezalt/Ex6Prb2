var myApp = angular.module('CarApp', ['ngRoute']);

myApp.controller('ViewCarsController', function ($scope, CarFactory)
{

    $scope.cars = CarFactory.getCars();
    $scope.title = "Cars Demo App with Routes";
    $scope.predicate = "year";

    $scope.deleteCar = function (id) {
        CarFactory.deleteCar(id);
    };
    
    $scope.editCar = function (id) {
        CarFactory.addEditCar(id);
    };

});

myApp.controller('AddCarController', function ($scope, CarFactory, $routeParams)
{
    $scope.cars = {};
    
    if(!$routeParams.id)
    {
        $scope.cars.id = null;
        $scope.legend = "New Car";
    }
    else
    {
        $scope.cars = CarFactory.getCars()[$routeParams.id-1];
        $scope.legend = "Edit Car";
    }
        
    $scope.edit = function()
    {
        CarFactory.addEditCar($scope.cars);
    };
});

    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Moon roof', price: 4799}];

//Service
myApp.factory('CarFactory', function () {

    var getCars = function () {
        return cars;
    };

    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                return;
            }
        }
    };
    
    var addEditCar = function (newcar) { 
        if (newcar.id === null) {
            newcar.id = cars.length + 1;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    };
    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar
    };
});


myApp.config(function ($routeProvider)
{
    $routeProvider
            .when('/home', {
                templateUrl: 'AllCars.html',
                controller: 'ViewCarsController'
            })
            .when('/newCar/:id', {
                templateUrl: 'NewCar.html',
                controller: 'AddCarController'
            })
            .when('/newCar', {
                templateUrl: 'NewCar.html',
                controller: 'AddCarController'
            })
            .otherwise({
                redirectTo: '/AllCars.html'
            });
});
