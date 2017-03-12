// 'use strict';

/* controllrs */

var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoListCtrl', function($scope, $http) {
    
    var arrLocalStorage = [];
    // var checkConnection;
    var arrForNewDate = [];

/*  filters     */ 

    var date = new Date;
    $scope.today = date;













/*   CRUD   */

/*          valid http get                          */
/*--------------------------------------------------*/
/*                                                  */

    // $http.get('/todo')
    //         .success(function(data, status, headers, config) {
    //             $scope.todoCol = data;
    //             console.log("1   " + data);
    //             data = [];
    //             console.log("2   " + data);
    //         });

/*                                                  */   
/*--------------------------------------------------*/





/*  valid local http get -> localStorage -> li      */
/*--------------------------------------------------*/
/*                                                  */
    
    if (localStorage.length > 0) {

        for(var i = 0; i < localStorage.length; i++) {
            arrLocalStorage.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

    } else {

        $http.get('/todo')
                .success(function(data) {
                    $scope.todoCol = data;
                    
                    for(var i = 0; i < arguments[0].length; i++) {
                        localStorage.setItem(arguments[0][i].id, JSON.stringify(arguments[0][i]));
                        console.log(arguments[0][i].id);
                        arrLocalStorage.push(arguments[0][i]); 
                    }
                    console.log(data);
                    if (data != 500) {
                        $scope.checkConnection = true;
                    } else {
                        $scope.checkConnection = false;
                    }
                });

    }            

    $scope.todoCol = arrLocalStorage;
    console.log(arrLocalStorage);
/*                                                  */
/*--------------------------------------------------*/
    



    pushNewTodoInBD();
    
    function pushNewTodoInBD () {
       
            



        setTimeout(function() {

            $http.delete('/todo')
                .success(function(data) {
                    console.log(data);
                });

            $scope.todoCol.map(item => $http.post('/todo', item)
            .success(function(data) {
                console.log(data);
            }));
            
            pushNewTodoInBD();
        }, 3600000);
    }





    $scope.moveRight = function (todoItem) {
    	
    	if (todoItem.status === "statusdata-todo") {
            todoItem.status = "statusdata-inprogress";

    	} else if (todoItem.status === "statusdata-inprogress") {
            todoItem.status = "statusdata-test";

		} else if (todoItem.status === "statusdata-test") {
            todoItem.status = "statusdata-done";

		} else if (todoItem.status === "statusdata-done") {
            doneAndRemove(todoItem);
		} 

        updateTodo (todoItem);
    };



    $scope.moveLeft = function (todoItem) {
        
    	if (todoItem.status === "statusdata-inprogress") {
            todoItem.status = "statusdata-todo";

		} else if (todoItem.status === "statusdata-test") {
            todoItem.status = "statusdata-inprogress";

		} else if (todoItem.status === "statusdata-done") {
            todoItem.status = "statusdata-test";
		}

        updateTodo (todoItem);
    };


    function updateTodo (todoItem) {
        /*  valid http put  */
/*--------------------------------------------------*/
/*                                                  */

        $http.put('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
            });

/*                                                  */
/*--------------------------------------------------*/


/*              valid local move rigth              */
/*--------------------------------------------------*/
/*                                                  */

        localStorage.removeItem(todoItem.id);
        localStorage.setItem(todoItem.id, JSON.stringify(todoItem));

/*                                                  */
/*--------------------------------------------------*/
    }
   

    $scope.addNew = function () {

        var newData = {
            id: Date.now(),
            status: "statusdata-todo",
            name: $scope.todoName,
            deadline: $scope.todoDeadline,
            priority: $scope.todoPriority,
            description: $scope.todoDescription,
            tmp: null
        };


/*              valid http post                     */
/*--------------------------------------------------*/
/*                                                  */

        $http.post('/todo', newData)
            .success(function(data) {
                // $scope.todoCol.push(data);
                console.log(data);
            });

/*                                                  */  
/*--------------------------------------------------*/          
        
       

/* valid local push localStorage -> settimeout -> BD*/
/*--------------------------------------------------*/
/*                                                  */

        localStorage.setItem(newData.id, JSON.stringify(newData));
        $scope.todoCol.push(JSON.parse(localStorage.getItem(newData.id)));
       
/*                                                  */       
/*--------------------------------------------------*/
        
    };


    $scope.doneAndRemove = function (todoItem) {
        console.log("delete" + todoItem.id);


/*              valid http delete                   */
/*--------------------------------------------------*/
/*                                                  */

        // $scope.todoCol.splice( $scope.todoCol.indexOf(todoItem),1);

        $http.delete('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
        });



/*                                                  */            
/*--------------------------------------------------*/
        


/*              valid local delete                   */
/*--------------------------------------------------*/
/*                                                  */
        
        $scope.todoCol.splice( $scope.todoCol.indexOf(todoItem),1);

        localStorage.removeItem(todoItem.id);

/*                                                  */        
/*--------------------------------------------------*/
    };
});
