angular.module('todoApp').factory('listFactory', function ($http) {
	var service = {};

	var isFull;
	var lists = [];
	
console.log("lists.length", lists.length);
	var listsStorage = {
			id: 100000001,
            status: null,
            name: listsStorage,
            deadline: null,
            priority: null,
            priorityStat: null,
            description: lists,
            tmp: null	
		};


	


	service.getLists = function () {
		if (localStorage.length > 0) {
			
			let tmpArr = [];
			tmpArr = JSON.parse(localStorage.getItem(listsStorage.id));

	        for(var i = 0; i < tmpArr.length; i++) {
	            lists.push(tmpArr[i]);
	        }


	    } else {
			
			

	        $http.get('/todo/' + listsStorage.id)
	            .success(function(data) {
					
	            	if (data) {
						let tmpArr = [];
		                tmpArr = data.description;

		                for(var i = 0; i < tmpArr.length; i++) {
		                    lists.push(tmpArr[i]); 
		                    localStorage.setItem(listsStorage.id, JSON.stringify(lists));
		                }
	            	} else {
	            		$http.post('/todo', listsStorage)
			                .success(function(data) {
			                    console.log(data);
			                });       		
	            	}
	        });
	    }  

    	isFull = lists.length < 5 ? true : false; //проверка на количество списков (должно быть не болле 5)
console.log("isFull", isFull);
		return lists;
	};

	service.getlistsStorage = function () {
		return listsStorage;
	};


	service.addList = function (listName) {

		if ( listName != null) {
			lists.push({
				list_id: listName + '_' + Date.now(),
				listName: listName,
			});

			isFull = lists.length < 5 ? true : false;

		    localStorage.setItem(listsStorage.id, JSON.stringify(listsStorage.description));
		    // listsStorage.description = lists;

			$http.put('/todo/' + listsStorage.id, listsStorage)
	            .success(function(data) {
	                console.log(data);
	            }); 
        }
	};


	service.removeList = function (list) {

        lists.splice( lists.indexOf(list),1);

        isFull = lists.length < 5 ? true : false;
		
		localStorage.removeItem(listsStorage.id);
		localStorage.setItem(listsStorage.id, JSON.stringify(listsStorage.description));

		$http.put('/todo/' + listsStorage.id, listsStorage)
            .success(function(data) {
                console.log(data);
            });
	};

	service.checkFullArr = function () {
		isFull = lists.length < 5 ? true : false;
		return isFull;
	};

	return service;
});