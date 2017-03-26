angular.module('todoApp').factory('cardFactory', function ($http) { 
var service = {}; 

var cards = []; 



service.createCardsArr = function () { 
	if (localStorage.length > 0) { 
		for(var i = 0; i < localStorage.length; i++) { 
			cards.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); 
			// console.log("indexOF", cards[i].id); 
			if ( Array.isArray(cards[i]) == true ) {
					cards.pop();
				console.log("yes");
			}
		}

// console.log("1111", localStorage.getItem(localStorage.key([1]))); 
// console.log("2222", JSON.parse(localStorage.getItem(localStorage.key([0])))); 
	} else {

		$http.get('/todo')
            .success(function(data) {
                for(var i = 0; i < data.length; i++) { 
					if (data[i].id != 100000001) {
						cards.push(data[i]);
						localStorage.setItem(data[i].id, JSON.stringify(data[i]));
					}
				}
		});
	}

console.log("cards", cards); 

return console.log(111115555111111); 

}; 


service.getCards = function (list) { 
// console.log("listsStorage.id", listFactory.listsStorage); 
// if (localStorage.length > 0) { 
// for(var i = 0; i < localStorage.length; i++) { 
// // cards.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); 
// } 
// } 
console.log("localStorage.length ", localStorage.length ); 



return cards;
}; 


	service.createCard = function (list, cardName, cardDescription, cardDeadline, cardPriority) {
		var cardPriorityFilter;

		if (cardPriority == "Normal") {
            cardPriorityFilter = 3;
        } else if (cardPriority == "Very important") {
            cardPriorityFilter = 1;
        } else if (cardPriority == "Important") {
            cardPriorityFilter = 2;
        }

		var newData = {
			id: Date.now(),
			name: cardName,
			description: cardDescription,
			status: 'stat' + list.list_id,
			deadline: cardDeadline,
            priority: cardPriority,
            priorityStat: cardPriorityFilter,
            tmp: null
		};

		if (newData.name != null || newData.deadline >= Date.now() || newData.priority != null) {
			cards.push(newData);
        	console.log(777777777);
			localStorage.setItem(newData.id, JSON.stringify(newData));
			$http.post('/todo', newData)
	                .success(function(data) {
	                    // $scope.todoCol.push(data);
	                    console.log(data);
	                });
	        addFormVis = false;
        } else {
        	console.log(99999999999999);
           addFormVis = true;
           infoErr = "infoErrClass";
        }
	};


	service.deleteCard = function (card) {

		localStorage.removeItem(card.id);

		$http.delete('/todo/' + card.id, card)
            .success(function(data) {
                console.log(data);
        });

		return  cards.splice( cards.indexOf(card),1);
	};

	service.deleteCardWithList = function (list) {
		console.log("list_id", list.list_id);
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].status == 'stat' + list.list_id ) {
				console.log("before del", cards);
				localStorage.removeItem(cards[i].id);

				$http.delete('/todo/' + cards[i].id, cards[i])
		            .success(function(data) {
		                console.log(data);
		        });
					cards.splice( cards[i],1);
		        console.log("after  del", cards);

			}
			console.log("cardsARR", cards[i].status);
		}
	};


	service.updateCard = function (updatingCard) {
		console.log('service updateCard', updatingCard);

		var cardPriorityFilter;

		if (updatingCard.priority == "Normal") {
            cardPriorityFilter = 3;
        } else if (updatingCard.priority == "Very important") {
            cardPriorityFilter = 1;
        } else {
            cardPriorityFilter = 2;
        }
		
		var cardID = updatingCard.id;

		if (!updatingCard.list_id) {
			updatingCard.list_id = updatingCard.status;
		}

		var card = cards.find( function (cards) {
			return cards.id == cardID;
		});
		card.name = updatingCard.name;
		card.description = updatingCard.description;
		card.deadline = updatingCard.deadline;
		card.priority = updatingCard.priority;
		card.priorityStat = cardPriorityFilter;
		card.list_id = updatingCard.list_id;
		card.status = 'stat' + updatingCard.list_id;

		updateTodo (card);
	};


	service.moveLeftCard = function (card, index, previousList) {
		
		console.log('cards length', cards.length );
		console.log('card', card );
		if (index == 0) {
			console.log('i can`t move to left');
		} else {
			card.status = 'stat' +  previousList;
			card.list_id = null;
		}

		updateTodo (card);
	};


	service.moveRightCard = function (card, index, nextList, listsLength) {
		
		console.log('cards length', cards.length );
		console.log('card', card );
		if (index + 1 == listsLength) {
			console.log('i can`t move to right');
		} else {
			card.status = 'stat' +  nextList;
			card.list_id = null;
		}

		updateTodo (card);
	};

	function updateTodo (card) {


        $http.put('/todo/' + card.id, card)
            .success(function(data) {
                console.log(data);
            });

        localStorage.removeItem(card.id);
        localStorage.setItem(card.id, JSON.stringify(card));
    }



	return service;
});