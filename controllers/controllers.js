
/* controllrs */

var todoApp = angular.module('todoApp', []);

todoApp.controller('TodoListCtrl', function($scope, $http) {
    
/*  filters     */ 

    var date = new Date;
    $scope.today = date;


/*   CRUD   */
    
    var arrLocalStorage = [];


    /*--------------------------------------------------*/
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
        });
    }            

    $scope.todoCol = arrLocalStorage;
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
        }, 60000*5); //update every 5 minute
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

        /*--------------------------------------------------*/        
        /*                  valid http put                  */
        /*--------------------------------------------------*/
        /*                                                  */

        $http.put('/todo/' + todoItem.id, todoItem)
            .success(function(data) {
                console.log(data);
            });

        /*                                                  */
        /*--------------------------------------------------*/



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
        var todoPriorityFilter;

        if ($scope.todoPriority == "Normal") {
            $scope.todoPriorityFilter = 3;
        } else if ($scope.todoPriority == "Very important") {
            $scope.todoPriorityFilter = 1;
        } else {
            $scope.todoPriorityFilter = 2;
        }

        var newData = {
            id: Date.now(),
            status: "statusdata-todo",
            name: $scope.todoName,
            deadline: $scope.todoDeadline,
            priority: $scope.todoPriority,
            priorityStat: $scope.todoPriorityFilter,
            description: $scope.todoDescription,
            tmp: null
        };

        if (newData.name != null && newData.deadline >= Date.now() && newData.priority != null) {

            /*--------------------------------------------------*/
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
                    
  


            /*--------------------------------------------------*/
            /* valid local push localStorage -> settimeout -> BD*/
            /*--------------------------------------------------*/
            /*                                                  */

            localStorage.setItem(newData.id, JSON.stringify(newData));
            $scope.todoCol.push(JSON.parse(localStorage.getItem(newData.id)));
       
            /*                                                  */       
            /*--------------------------------------------------*/
        

            $scope.infoErr = "";
            $scope.todoName = null;
            $scope.todoDeadline = null;
            $scope.todoPriority = null;
            $scope.todoDescription = null;

        } else {
           $scope.addFormVis = true;
           $scope.infoErr = "infoErrClass";
        }
    };



    $scope.doneAndRemove = function (todoItem) {
        console.log("delete" + todoItem.id);

        /*--------------------------------------------------*/
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
                


        /*--------------------------------------------------*/
        /*              valid local delete                  */
        /*--------------------------------------------------*/
        /*                                                  */
        
        $scope.todoCol.splice( $scope.todoCol.indexOf(todoItem),1);
        localStorage.removeItem(todoItem.id);

        /*                                                  */        
        /*--------------------------------------------------*/
    };
});
