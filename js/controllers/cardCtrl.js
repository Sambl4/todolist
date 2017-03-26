angular.module('todoApp').controller('cardCtrl', function (cardFactory) {
	this.isEditing = false;
	this.editingCard = null;
	this.isShortForm = true;
	

	this.deleteCard = function (card) {
		cardFactory.deleteCard(card);
	};

	this.editCard = function (card) {
		this.isEditing = true;
		this.editingCard = angular.copy(card);
	};

	this.updateCard = function (card) {
		cardFactory.updateCard(this.editingCard);
		this.isEditing = false;
		this.editingCard = null;
	};

	this.cancelEditCard = function (card) {
		this.isEditing = false;
		this.editingCard = null;
	};

	this.moveLeftCard = function (card, index, previousList) {
		cardFactory.moveLeftCard(card, index, previousList);
		console.log('card', card);
	};

	this.moveRightCard = function (card, index, nextList, listsLength) {
		cardFactory.moveRightCard(card, index, nextList, listsLength);
		console.log('card', card);
	};

});    