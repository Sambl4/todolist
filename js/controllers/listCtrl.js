angular.module('todoApp').controller('listCtrl', function (listFactory, cardFactory, $http) {
	// this.isYouSureDelete = false;

	// console.log('listCtrl', listCtrl);
	this.removeList = function (list) {
		// console.log("list.List_id" , list);
		listFactory.removeList(list);
		cardFactory.deleteCardWithList(list);
		this.isFull = listFactory.checkFullArr();
		console.log("isFull" , this.isFull);
	};

	this.getCards = function (list) {
		return cardFactory.getCards(list);
	};

	this.createCard = function (list, addFormVis) {

		if (this.cardName == null || this.cardDeadline == null || this.cardPriority == null) {
			alert("You should fill gaps!");
			
		}

		cardFactory.createCard(list, this.cardName, this.cardDescription,
			this.cardDeadline, this.cardPriority);
		this.cardName = null;
		this.cardDescription = null;
		this.cardDeadline = null;
		this.cardPriority = null;

	};


});