//loads the javascript when the page opens
$(document).ready(function() {  
	//global variables
	var last;
	
//creating the deck of cards  
function makeDeck() {
  //variables for the cards
	var deck = []; //array to hold the cards
	var suits = ["Heart", "Club", "Diamond", "Spade"]; //array for the suits
	var numerals = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]; //array to hold the card values
  var imgPath = '/cop4813/img/cards/'; // holds the image path
  
// a nested for loop creates each combination of suit and value one time (52 cards)
	for (let suit = 0; suit < suits.length; suit++)
	{
		for (let numeral = 0; numeral < numerals.length; numeral++)
    {
      // via push function the generated cards are added to the deck array
			deck.push({card: numerals[numeral]+suits[suit][0],
      		suit: suits[suit],
          numeral: numerals[numeral],
          img: imgPath+numerals[numeral]+suits[suit][0]+".png",//image path is prefixed and since pictures are in png format .png is added to the end 
        })
		}
	}

	deck.shuffle = function() {
		this.sort( function(){
			return (Math.random()*2 < 1) ? -1 : 1;
		});
		return this;
	}

	return deck;
}
//this function is responsible for displaying the cards as div containers
function cardVisual(card) {
	return $(`<div class='card' suit='${card.suit}' numeral=${card.numeral}>
  	<img src='${card.img}' height='100px' width='60px'>
    
 </div>`)

}
//this function randomizes the order of the cards in the deck
var deck = makeDeck().shuffle();

var players = [ "player1", "player2" ];
var playerTurn = 0;

function outOfCards()
{
	$("#stack").addClass("empty")
	throw new Error("todo:shuffle discard pile back in to the draw pile");
}

function newGame()
{
	$("#board .card").remove();
	deck = makeDeck().shuffle();

	// each player starts with 7 cards
	players.forEach(function(player){
		for (x = 0; x < 7; x++)
			drawCard().appendTo("#"+player);
	});

	drawCard().appendTo("#discard-pile");
}

function drawCard( )
	{
		var card;
		var count;
		if (!deck.length){ 			
			return outOfCards();
		}else if(count ==0){
			card = cardVisual(deck.pop());			
			count +1;
		}else if(count==1){
			setPlayerTurn();
			count -1;
		}
		card = cardVisual(deck.pop());			
			count =1;
		
		
		return card;
}

/*function discardCard( card ){
	var discards = $("#discard-pile");
	
	
	if ($(ui.item).attr("suit") != last.attr("suit")&&$(ui.item).attr("numeral") != last.attr("numeral")
		 ){
		$(card).appendTo(discards);
		setPlayerTurn();
	} else if( $(ui.item).attr("numeral") == 7 ){
		throw new Error("todo: implement draw 2 ");
	} else if( $(ui.item).attr("numeral") == 8 ){
		throw new Error("skip next player ");
	} else if( $(ui.item).attr("numeral") == 9 ){
		throw new Error("todo: change direction ");
	} else if( $(ui.item).attr("numeral") == "J" ){
		throw new Error("todo: choose suit ");
	} else if( $(ui.item).attr("numeral") == "A" ){
		throw new Error("todo: drop another ");
	} else {
		alert("something weird just happened !!!")
	}
	
}*/
function discardCard( card ){
	var discards = $("#discard-pile");
	$(card).appendTo(discards);
	setPlayerTurn();
}

function setPlayerTurn( n )
{
	if (typeof(n) == "undefined")
		playerTurn = (playerTurn + 1 ) % players.length;
	else playerTurn = n % players.length;

  $(".is-turn").removeClass("is-turn");
  $("#"+players[playerTurn]+"Container,.player.player-container[player="+(playerTurn+1)+"]").addClass("is-turn");
	$("#"+players[playerTurn]).addClass("is-turn");
}


function initializeGameUI() {
	$("#reset-game").click( newGame ).click();
	//alert("test");
	/* $("#board").on("click", ".hand .card", function() {
		discardCard(this);
		event.preventDefault();
	});
*/
	players.forEach(function(id) {
		var hand = $("#"+id);
		hand.sortable({ connectWith: "#discard-pile", helper: "clone", revert: true, tolerance: "intersect", receive: function(event, ui){
			if (ui.item.is(".card-placeholder")) {
				ui.sender.sortable("cancel");
				if ($(this).is(".is-turn")){
					drawCard().appendTo( $( this) );
				}
			}
				
		} });

	});

	$("#discard-pile").sortable({
		connectWith: ".hand",
		helper: "clone",
		revert: true,
		tolerance: "intersect",
		receive: function(event, ui) {
			 last = $("#discard-pile > .card").not(ui.item).last();

console.log("Discard pile receive by: ", ui.item.attr("suit"), ui.item.attr("numeral"));
console.log("Discard pile face card: ", last.attr("suit"), last.attr("numeral"));

			if ($(ui.item).attr("suit") != last.attr("suit")	&& $(ui.item).attr("numeral") != last.attr("numeral") && $(ui.item).attr("numeral") != "J"
			)
			{	ui.sender.sortable("cancel");
			 alert("You have to either match the suit or the value to drop a card !", ui, ui.sender);
				return;
			}else if( $(ui.item).attr("numeral") == 7 ){
				discardCard(ui.item);
				drawCard().appendTo( $( "#penalty-pile") );				
				drawCard().appendTo( $( "#penalty-pile") );
				setPlayerTurn();	
				
			} else if( $(ui.item).attr("numeral") == 8 ){				
				discardCard(ui.item);
				alert("Next Player is skipped");				
			} else if( $(ui.item).attr("numeral") == 9 ){				
				discardCard(ui.item);
				setPlayerTurn();
				//throw new Error("todo: change direction ");
			} else if( $(ui.item).attr("numeral") == "J" ){				
				discardCard(ui.item);
				setPlayerTurn();
				//throw new Error("todo: choose suit ");
			} else if( $(ui.item).attr("numeral") == "A" ){					
				discardCard(ui.item);
				alert("You can drop another card");
				
			
				
			}
			discardCard(ui.item);
			
			
		},	
	});

	//here is the handler for the deal button and a pop function to remove the dealt cards from the deck
	/*$("#stack").on("click", function(){
		drawCard().appendTo( $( "#"+players[playerTurn%players.length]+".hand") );
		
	})*/
	
	$("#stack").sortable({ connectWith: ".hand", revert: true});


	setPlayerTurn(0);
}

	// this is already running in a document.ready handler:
	initializeGameUI();

});