// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );



$('#deal').click(function(){
			dealcard(randomCard());
			});
	
	var carddeck = [];
	var numcarddeck = 52;
	carddeck[0] = "ca";
	carddeck[1] = "c2";
	carddeck[2] = "c3";
	carddeck[3] = "c4";
	carddeck[4] = "c5";
	carddeck[5] = "c6";
	carddeck[6] = "c7";
	carddeck[7] = "c8";
	carddeck[8] = "c9";
	carddeck[9] = "c10";
	carddeck[10] = "cj";
	carddeck[11] = "cq";
	carddeck[12] = "ck";
	carddeck[13] = "sa";
	carddeck[14] = "s2";
	carddeck[15] = "s3";
	carddeck[16] = "s4";
	carddeck[17] = "s5";
	carddeck[18] = "s6";
	carddeck[19] = "s7";
	carddeck[20] = "s8";
	carddeck[21] = "s9";
	carddeck[22] = "s10";
	carddeck[23] = "sj";
	carddeck[24] = "sq";
	carddeck[25] = "sk";
	carddeck[26] = "ha";
	carddeck[27] = "h2";
	carddeck[28] = "h3";
	carddeck[29] = "h4";
	carddeck[30] = "h5";
	carddeck[31] = "h6";
	carddeck[32] = "h7";
	carddeck[33] = "h8";
	carddeck[34] = "h9";
	carddeck[35] = "h10";
	carddeck[36] = "hj";
	carddeck[37] = "hk";
	carddeck[38] = "hq";
	carddeck[39] = "da";
	carddeck[40] = "d2";
	carddeck[41] = "d3";
	carddeck[42] = "d4";
	carddeck[43] = "d5";
	carddeck[44] = "d6";
	carddeck[45] = "d7";
	carddeck[46] = "d8";
	carddeck[47] = "d9";
	carddeck[48] = "d10";
	carddeck[49] = "dj";
	carddeck[50] = "dk";
	carddeck[51] = "dq";
	
	function dealcard(i) {
		if (numcarddeck == 0) return false;
			var card = document.createElement("img");
			card.src = "./cardfaces/" + carddeck[i]+".png";
			
			card.id = carddeck[i];
			card.alt = "Card " + carddeck[i];
			card.width = 80;
			card.height = 120;
			document.body.appendChild(card);

			$(card).draggable();
			removeCard(i);
			}
	
	function randomCard(){
		return Math.floor(Math.random()*numcarddeck);
		}
	
	function removeCard(c)
	{
		for(j=c; j<=numcarddeck -2; j++)
		{
			carddeck[j]=carddeck[j+1];
			}
		numcarddeck--;
		}
//the end of the document ready block	
});