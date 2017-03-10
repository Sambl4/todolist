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
    

    // var arr = [];
    //     for(var i = 0; i < localStorage.length; i++) {
    //         arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    //     }
    
    // $scope.todoCol = arr;






    $scope.moveRight = function (todoItem) {
    	console.log("moveRight     "+ todoItem.status + "   " + todoItem.id + "  " + todoItem);

    	
    	if (todoItem.status === "statusdata-todo") {
    		// return todoItem = "inprogress";
    		console.log("1 => 2");
            todoItem.status = "statusdata-inprogress";

    	} else if (todoItem.status === "statusdata-inprogress") {
    		// return todoItem = "inprogress";
    		console.log("2 => 3");
            todoItem.status = "statusdata-test";

		} else if (todoItem.status === "statusdata-test") {
    		// return todoItem = "inprogress";
    		console.log("3 => 4");
            todoItem.status = "statusdata-done";
		} else if (todoItem.status === "statusdata-done") {
    		// return todoItem = "inprogress";
    		console.log("4 => remove");
            doneAndRemove(todoItem);
		} 

        $http.put('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
            });
    };

    $scope.moveLeft = function (todoItem) {
    	console.log("moveLeft   " + todoItem.status + "   " + todoItem.id);

        
    	if (todoItem.status === "statusdata-inprogress") {
    		// return todoItem = "inprogress";
    		console.log("2 => 1");
            todoItem.status = "statusdata-todo";

		} else if (todoItem.status === "statusdata-test") {
    		// return todoItem = "inprogress";
    		console.log("3 => 2");
            todoItem.status = "statusdata-inprogress";

		} else if (todoItem.status === "statusdata-done") {
    		// return todoItem = "inprogress";
    		console.log("4 => 3");
            todoItem.status = "statusdata-test";
		}

        $http.put('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
            });
    };

   

    $scope.addNew = function () {
        console.log("BUTTON NEW DATA");
        var newData = {
            id: Date.now(),
            status: "statusdata-todo",
            name: $scope.todoName,
            deadline: $scope.todoDeadline,
            priority: $scope.todoPriority,
            description: $scope.todoDescription
        };

        $http.post('/todo', newData)
            .success(function(data) {
                $scope.todoCol.push(data);
                console.log(data);
            });
        
        // localStorage.setItem(newData.id, JSON.stringify(newData));
        // arr.push(JSON.parse(localStorage.getItem(newData.id)));
        // $scope.todoCol = arr;
        
    };
    // $scope.doneAndFilter = function (phoneItem) {
    //  return phoneItem.name && phoneItem.priority > 1 &&  phoneItem.status === true;
    // };

    $scope.doneAndRemove = function (todoItem) {
        console.log("delete" + todoItem.id);
        // arr.indexOf(todoItem.id);
        // localStorage.removeItem(todoItem.id);
        // // console.log(arr[arr.indexOf(todoItem)]);
        //  console.log(arr[arr.indexOf(todoItem)]);
        
        $scope.todoCol.splice( $scope.todoCol.indexOf(todoItem),1);

        $http.delete('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
        });

        // $http.get('/todo')
        //     .success(function(data, status, headers, config) {
        //         $scope.todoCol = data;
        //         console.log(data);
        //     });
    };
});
