// 'use strict';

/* controllrs */

var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoListCtrl', function($scope, $http) {
    
/* filters*/ 
    var date = new Date;
    $scope.today = date;
    $http.get('/todo')
            .success(function(data, status, headers, config) {
        $scope.todoCol = data;
            console.log(data);
    });

    // $http.get('http://www.json-generator.com/api/json/get/cvmbnAPuKW?indent=2')
    //         .success(function(data, status, headers, config) {
    //     $scope.todoCol = data;
    // });

            // console.log();
    $scope.moveRight = function (e) {
    	console.log("moveRight" + e);
    	
    	if (e === "todo") {
    		// return e = "inprogress";
    		console.log("1 => 2");
    	} else if (e === "inprogress") {
    		// return e = "inprogress";
    		console.log("2 => 3");
		} else if (e === "test") {
    		// return e = "inprogress";
    		console.log("3 => 4");
		} else if (e === "done") {
    		// return e = "inprogress";
    		console.log("4 => remove");
		} 
    };

    $scope.moveLeft = function (e) {
    	console.log("moveLeft" + e);

    	if (e === "inprogress") {
    		// return e = "inprogress";
    		console.log("2 => 1");
		} else if (e === "test") {
    		// return e = "inprogress";
    		console.log("3 => 2");
		} else if (e === "done") {
    		// return e = "inprogress";
    		console.log("4 => 3");
		} 
    };

   

    $scope.addNew = function () {
        console.log("BUTTON NEW DATA");
        var newData = {
            id: Date.now(),
            status: "done",
            name: "qwerty"
        };

        $http.post('/todo', newData)
            .success(function(data) {
        console.log(data);
    });
    };
    // $scope.doneAndFilter = function (phoneItem) {
    //  return phoneItem.name && phoneItem.priority > 1 &&  phoneItem.status === true;
    // };
});

