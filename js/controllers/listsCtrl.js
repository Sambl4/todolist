angular.module('todoApp').controller('listsCtrl', function (listFactory, cardFactory, $http, updateDBFactory) { 

	var date = new Date; 
	this.today = date; 



	console.log('listsCtrl'); 
	// (function () { 
	// listFactory.get 
	// })() 

	cardFactory.createCardsArr(); 
	updateDB();

	function updateDB () {
		var lists = listFactory.getlistsStorage();
		var cards = cardFactory.getCards();
		updateDBFactory.pushNewTodoInBD(lists, cards);
		// updateDBFactory.pushNewTodoInBD();
		// $timeout(updateDB, 1000);
		setTimeout (updateDB, 60000*5); //update every 5 minute 60000*5
	}

	this.lists = listFactory.getLists();

	this.addList = function () {
		listFactory.addList(this.listName);
		this.listName = null;
		this.isFull = listFactory.checkFullArr();
		console.log("isFull" , this.isFull);
	};

	this.isFull = listFactory.checkFullArr(); //проверка на количество списков (должно быть не болле 5)
	// this.isFull = true;
	this.checkFull = function () {
		this.isFull = listFactory.checkFullArr();	
	};



}); 