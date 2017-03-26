angular.module('todoApp').factory('updateDBFactory', function ($http) { 
var service = {}; 

service.pushNewTodoInBD = function (lists, cards) {

    console.log("update1");
    console.log("update1 lists", lists.id);
    console.log("update1 cards", cards);


            $http.delete('/todo')
                .success(function(data) {
                    console.log(data);
                });

            $http.post('/todo', lists)
                .success(function(data) {
                    console.log(data);
                });


            cards.map(item => $http.post('/todo', item)
                                    .success(function(data) {
                                        console.log(data);
                                    }));
            
    //         listsCtrl.updateDB();
    //     }, 1000); //update every 5 minute 60000*5
    };


    return service;
});