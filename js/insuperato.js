/**
 * @author Sal
 */

    var keyboard = new Array(
    	"Q","W","E","R","T","Y","U","I","O","P",
    	"A","S","D","F","G","H","J","K","L","b1",
    	"b1","Z","X","C","V","B","N","M","b3","b4"
    );


// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

/**
 * estra e crea la parola
 * @param lunghezza = 4 <= l <= 10
 */
function chooseWord ( l ) {
	if (l<4 || l>10) return -1;
	
	var words = new Array();
		
	words[0] = new Array(
  "CASO", "PALO", "DURO", "PELO",    // parole originali valide
  "BANE", "FILO", "GATO", "LAMP", "REMO", "VITA", "MURA", "SENO", "ROTA", "CIMA"
); // 4 lettere

words[1] = new Array(
  "PARTE", "CIELO", "LIBRO",          // originali valide
  "PLUMA", "TORCE", "SUELO", "VENDO", "FANGO", "SALTO", "MURAS"
); // 5 lettere

words[2] = new Array(
  "CAMION",                         // originale valida
  "BRONCA", "PLATOS", "FUMARE", "DANGER"  // 6 lettere (DANGER è inglese)
);

words[3] = new Array(
	"PUTRIDO",
  "FANTASY", "GLACIER", "JOCKHAM"  // 7 lettere inglesi valide, italiane molto difficili senza ripetizioni
);

words[4] = new Array(
	"UNIVERSO",
  "FOREHAND", "CHROMATE", "FLYBOATS"  // 8 lettere inglesi
);

words[5] = new Array(
  "FLASHBOND", "PERGOLATI"  // 9 lettere inglese
);

words[6] = new Array(
  "HOUSEMARKS", "INSUPERATO" // 10 lettere inglese
);
	
	var rand = getRandomArbitrary( 0, words[l-4].length-1 );
	
	return words[l-4][rand];
}

function checkWordEverywhere(){
	
}

/**
 * start a new game
 */
function newGame(){}

//function draggableKeys(){}

//just for test
var c = new Cell( 50,50 );
var w = chooseWord(4);

//keyboard resizable
$( window ).resize(function() {
	var viewport = $( window ).width();
	var docu = $( document ).width();
	//$( keyboard ).width(docu);
	
	$( "#console" ).append( "size = "+viewport );
});



window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var start = null;
//var d = document.getElementById("SomeElementYouWantToAnimate");
function step(timestamp) {
  var progress;
  if (start === null) start = timestamp;
  progress = timestamp - start;
  
  //to-do

  //to-do
    
  //d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}

function mySwipeHandler(){
	alert(this);
}

$( document ).ready(function() {		
	//fastclick on
	FastClick.attach(document.body);
	$("#console").append( "FastClick abilitato.");

	//abilita animazioni / aggiornamenti pseudo-real time
	requestAnimationFrame(step);
	//$("#console").append( "requestAnimationFrame attivato.");
	
	//start timer
	var now = new Date();
	var deadline = now.setSeconds(now.getSeconds() + 10);
	deadline = new Date(deadline);
	
	/**
	$('#timer').mbComingsoon(
		{ 
			expiryDate: deadline, 
			speed:100,
			localization: {
				days: "",
                hours: "",
				minutes: "",
                seconds: "secondi"
			},
		}
	);
	**/
	//$("#console").append( "set Timer ON.");

	//start

	$("#parola").html( "<h3>"+w+"</h3>");

	//rendi draggable tutti i buttuni
/**	for ( var k=0; k<keyboard.length; k++ ){
		$( "#"+keyboard[ k ] ).draggable();
		drag1( );
		drag2( );
		//$("#console").append( keyboard[ k ] +" draggable().");
	}**/

//do not scroll
document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

	
var g = new Grid( 10,3 );
g.init();
g.show();
	
	
var indici_colorati = checkOnKeyboard( w );	
for (var j=0; j<indici_colorati.length; j++){
	//draggable.css("color", "blue");
	//draggable.css("background-color", "white");
	//to do?
}

//window.addEventListener('load', function() { 	
//	alert("eventListener ok");
//hammer per il touch	
//for ( var k=0; k<keyboard.length; k++ ){
	//alert("key ["+k+"]="+jQuery( "#"+keyboard[ k ] ).attr('id') );
	//var mc = Hammer( $( "#"+keyboard[ k ] ) );
	//mc.on("dragleft dragright dragup dragdown", mySwipeHandler);	
//}
//}, false);

/**
 * 
 
 // new game controller
$( "input#start" ).click(function() {
	alert("start"); //non va
});

	$( "span" ).click(function() {
		alert("ciao");
	    draggable.css("color", "#000000");
		draggable.css("background-color", "#04FB14");
	});

 * 
 *  **/

});
