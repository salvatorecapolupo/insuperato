/**
 * @author Salvatore Capolupo
 * 
 * Versione 0.5 di INSUPERATO
 * 
 */

//THE GAME

var newGame;
var Game = function() {
	var gameover = false; //se è true, il gioco non va più avanti
	var livelloCorrente = -1;
	
	//dimensioni default singolo bottone
	var cellWidth = 38//34;
	var cellHeight = 35//31;
	
	//margini css
	const XX = 4, YY=32;
	var margin_x = XX;
	var margin_y = YY;
	
	//offset di spostamento bottoni
//	var offset_w=52;
//	var offset_h=68;
	var offset_w=cellWidth + margin_x;
	var offset_h=cellHeight + margin_y;
	
	// 3 righe di bottoni x 10 colonne
	var righe = 3;
	var colonne = 10;
	
	//dimensione delle celle, ammesso che sia settata dall'esterno
	var cellw = -1; //not set
	var cellh = -1; //not set
	
	//turni di modifica direzione
	var flag = true;
	
	var count=0;	
	var posX=-1, posY=-1, lastPosX=-1, lastPosY=-1;
	var startX=-1, startY=-1;
	var vel = 1.2;
	
	var xA = lastPosX;
	var yA = lastPosY;
	var xB = posX;
	var yB = posY;
	
	var magic_index=-1;
	
	var indici = { 
		"q":"1,1", 
		"w":"1,2", 
		"e":"1,3", 
		"r":"1,4", 
		"t":"1,5", 
		"y":"1,6", 
		"u":"1,7", 
		"i":"1,8", 
		"o":"1,9", 
		"p":"1,10", 
		
		"a":"2,1", 
		"s":"2,2", 
		"d":"2,3", 
		"f":"2,4", 
		"g":"2,5", 
		"h":"2,6", 
		"j":"2,7", 
		"k":"2,8", 
		"l":"2,9", 
		
		"z":"3,2", 
		"x":"3,3", 
		"c":"3,4", 
		"v":"3,5", 
		"b":"3,6", 
		"n":"3,7", 
		"m":"3,8"
	};

	//var keyboard 
	this.keyboard = new Array(
	     "q","w","e","r","t","y","u","i","o" ,"p", // i>=0 && i<=9
	     "a","s","d","f","g","h","j","k","l" ,"b1",// i>=10 && i<=19
		"b2","z","x","c","v","b","n","m","b3","b4" // i>=20 && i<=29
	);	
	
	
	this.checkIfAlive = function () {
		if ( this.gameover ) console.log ("checkIfAlive true, FINE DEL GIOCO");
		else console.log("checkIfAlive false");
	}
	
	this.endGame = function () {
		this.gameover = true;	
		console.log("endGame, gameover = "+this.gameover);		
	}
		
	this.checkWord = function( ) {
		var that = this;
		//var size = this.size;
		
		var word = this.w;
		var size = word.length;
		var k = this.keyboard;

		console.log("[checkword] "+word+" è lunga "+size);
			
		//trova inizio stringa
		var index_inizio = -1;
		for ( var j=0; j<k.length; j++ ) {
			if ( k[j]== word[0] ) 
				index_inizio=j;
			else
				$("#"+k[i]+"_key").css( "color", "black" );	 //normalizza colori
		}
		
		console.log("[checkword] inizia match a "+index_inizio );
		if ( index_inizio>=0 ){
			//colora iniziale
			$("#"+k[index_inizio]+"_key").css( "color", "red" );
			
			var c=0;
			for ( var i =index_inizio; i<k.length; i++ ){
				console.log( "confronta "+ word[c]+" con "+k[i] );
				
				if ( word[c]==k[i] ){ //pattern matching
					$("#"+k[i]+"_key").css( "color", "red" );
					c++;
					
					//check fine gioco / livello successivo
					if ( size == c ) return "FINITO";

				}
				else break;
			}
		}
		
		console.log("[checkword] fine ");
	}		
	
	this.animateButton = function ( id, brother, panWhere ){	
//		console.log( " animateButton // offset_h ="+offset_h );
//		console.log( " animateButton // offset_w ="+offset_w );
		var that = this;
				
		var x = id, y = brother;
			 id = "#" + id;
		brother = "#" + brother;
		
		//update per zoom corretto
		cellWidth 	= 	$(".key:first-of-type").width();
		cellHeight 	= 	$(".key:first-of-type").height();
		
		var alpha=3.9;		
		if (margin_x == XX)
			margin_x 	*= 	alpha * screen.width/screen.height;
		if (margin_y == YY)
			margin_y 	*= 	1.5/alpha * screen.width/screen.height;		
					
		offset_w	=	cellWidth + margin_x;
		offset_h	=	cellHeight + margin_y;
				
		console.log("animateButton("+id+","+brother+","+panWhere+")");		
		//info: http://ricostacruz.com/jquery.transit/
		if ( panWhere=='panup' ) {
			if ( flag ) {
				$( id ).transition({  y: '-='+offset_h  }, 200);
				$( brother ).transition({  y: '+='+offset_h  }, 200);
				that.swapKeyboard (x, y);
			}
		}
		else if ( panWhere=='panright' ) {
			if ( flag ) {
				$( id ).transition({  x: '+='+offset_w+'px'  }, 200);
				$( brother ).transition({  x: '-='+offset_w+'px'  }, 200);
				that.swapKeyboard (x, y);
			}
		}
		else if ( panWhere=='pandown' ) {
			if ( flag ) {
				$( id ).transition({  y: '+='+offset_h  }, 200);
				$( brother ).transition({  y: '-='+offset_h  }, 200);
				that.swapKeyboard (x, y);
			}
		}
		else if ( panWhere=='panleft' ) {
			if ( flag ) {
				$( id ).transition({  x: '-='+offset_w+'px'  }, 200);
				$( brother ).transition({  x: '+='+offset_w+'px'  }, 200);
				that.swapKeyboard (x, y);
			}
		}	
	}	

	/**
	 * 
	 * restituisce l'indice corrispondente 
	 * alla coppia i,j 
	 * 
	 */
	
	this.elementAt = function( i,j ){
		for( k in indici ){
			var my_i= indici[k].split(",")[0];
			var my_j= indici[k].split(",")[1];
			if ( i == my_i && j == my_j ){			
				return k;
			}
		}
		
		return "NESSUNO";
	}	

	this.adjFind = function ( id ) {
		var hack = this;
		var up="NESSUNO", down="NESSUNO", left="NESSUNO", right="NESSUNO";
		
		var real_id = id.replace("_key","");
		//patch
		real_id = real_id.replace("#","");

		var where_id = indici[real_id];
		var i = parseInt( where_id.split(",")[0] );
		var j = parseInt( where_id.split(",")[1] );

		if ( i>1 ) 													
			up    = hack.elementAt( i-1,j );
		if ( 
			!(i==1 && j==10) &&
			!(i==2 && j==9) &&
			!(i==3 && j==8)
			 ) 				
			right = hack.elementAt( i,j+1 );
		if ( i<3 || 
			!(i==1 && j==10) &&
			!(i==2 && j==9)
			) 					
			down  = hack.elementAt( i+1,j );
		if ( 
			!(i==1 && j==1) &&
			!(i==2 && j==1) &&
			!(i==3 && j==2)
			) 		
			left  = hack.elementAt( i,j-1 );
		
		var res=[];
		res.push( up );
		res.push( right );
		res.push( down );
		res.push( left );
		
		console.log( "adjFind ("+real_id+") = "+up+","+right+","+down+","+left );
		
		return res;
	}

	this.swapKeyboard = function ( id, brother ){		
		var that = this;
		
		console.log( "swapKeyboard # "+(++count) );
		var real_id = id.replace("_key","");
		var real_brother = brother.replace("_key","");

		//alert ( "indici :"+real_id+" , "+real_brother );
		//alert ( indici[real_id]+" , "+indici[real_brother] );
		
		var h = that.keybat( real_id );
		var k = that.keybat( real_brother );
				
		//swap tra keyboard[h] , keyboard[k]
		var tmp = that.keyboard[h];
		that.keyboard[h] = that.keyboard[k];
		that.keyboard[k] = tmp;
				
		//aggiorna indici
		tmp = indici[real_brother];
		indici[real_brother] = indici[real_id];
		indici[real_id] = tmp;
		
		//alert ("dopo lo scambio: "+real_id+":"+indici[real_id]+" , "+real_brother+":"+indici[real_brother]);
	}


	/**
	 * 
	 * prende lettera e restituisce indice numerico
	 * 
	 * 
	 * */
	
	this.keybat = function ( id ){
		var that = this;
		var res=0;
		while ( res<that.keyboard.length ){
			if ( that.keyboard[res]==id ) return res;
			else 
				res++;
		}
			
		return -1;  //not found
	}

	/**
	 *  Returns a random number between min and max
	 *  @param min<max
	 * 
	 */
	this.getRandomArbitrary = function (min, max) {
	  return parseInt(Math.random() * (max - min) + min);
	}


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


	/**
	 * 
	 * estra e crea la parola
	 * @param lunghezza = 4 <= l <= 10
	 * 
 	 */	
 	
	this.chooseWord = function  ( l ) {
		if (l<4 || l>10) return -1;
		var rand = this.getRandomArbitrary( 0, words[l-4].length-1 );
		return words[l-4][rand];
	}
	
	this.dictionarySize = function () {
		var size=0;
		for ( var i=0; i<words.length; i++ ){
			for ( var j=0; j<words[i].length; j++ ){
				size++;
			}	
		}
		
		return size;
	}

	this.init = function( base, ui, w ) {	
		//versione
		$("#versione").append("0.8b");
		
		this.base = base;
		this.ui = ui;
		this.w = w.toLowerCase();
        this.iniziale = this.w[0];
		
		console.log( "word = "+this.w);
		
		//screen site adjust
		//var curr_screen_width = $(window).width();
		//var curr_keyb_width = $(".keyboard").width();
		//console.log("curr_screen_width = "+curr_screen_width+", curr_keyb_width = "+curr_keyb_width);
		
		//$( this ).css( "background-color" );
		
		this.originalSize = colonne;
		this.originalHeight = righe;
		this.size = this.originalSize * this.originalHeight; // 3 righe x 10 colonne		
		this.caseWidth = cellWidth;
		this.caseHeight = cellHeight;
		this.level = [];
		this.typesOfGems = 5;  //non serve
		this.fillEnd = true;
		this.switchEnd = true;

		//for (var i = 0; i < this.size; i++) {
			//not use 0
		//	this.level[i] = keyboard[i];// Math.round(Math.random() * this.typesOfGems + 1);
		//}

		this.score = 0;
		//this.combo = 0;
		//this.bestCombo = 0;
		
		//illumina il tasto con la lettera iniziale
		$("#"+this.iniziale+"_key").css( "color", "red" );
		this.bindDraggableEvent();
		
		// Execute this.checkLines() in the context of this object
		// setTimeout( $.proxy( this.checkWord, this ), 150 );
	};

	/**
	 * rendi i bottoni draggable 
	 * (pan è la dicitura corretta)
	 * 
	 */
	
	this.bindDraggableEvent = function() {
		var that = this;
		var position;
		var buttons = document.getElementsByClassName("key");
		console.log( buttons.length+" tasti.");
						
		var hammertime = new Array();
		var counter=0;
		var mythreshold = 5;
			
		for ( var j=0; j<that.keyboard.length; j++ ){
			//var elem = "div#"+keyboard[j]+"_key";
			var elem = "#"+that.keyboard[j]+"_key";
			var area = document.querySelector( elem );
			counter++;
					
			hammertime[j] = new Hammer( area );
			hammertime[j].get('pan').set({ direction: Hammer.DIRECTION_ALL });
			//hammertime[j].get('pan').set({ threshold: mythreshold }); //soglia per avviare l'animazione'

			//flag 1-time
			hammertime[j].on('panstart', function(ev){
				flag=false; 
			});
			hammertime[j].on('panend', function(ev){
				flag=true;
			});

			hammertime[j].on('tap', function(ev) {
				//nothing
			});
			
			//check if game is alive every 500 ms...
			setInterval( that.checkIfAlive, 500, that.gameover );
					
			hammertime[j].on('panleft panright panup pandown', function(ev) {
				ev.preventDefault();
				var curr = ev.target;
				
				var adj_list = that.adjFind(curr.id );
				
				if ( flag ) {
					if ( ev.type =='panup' && adj_list[0]!="NESSUNO" ){
						that.animateButton( curr.id, adj_list[0]+"_key", 'panup' );
					}
					else if ( ev.type =='panright' && adj_list[1]!="NESSUNO" ){
						that.animateButton( curr.id, adj_list[1]+"_key", 'panright' );
					}
					else if ( ev.type =='pandown' && adj_list[2]!="NESSUNO" ){
						that.animateButton( curr.id, adj_list[2]+"_key", 'pandown' );
					}
					else if ( ev.type =='panleft' && adj_list[3]!="NESSUNO" ){
						that.animateButton( curr.id, adj_list[3]+"_key", 'panleft' );
					}	
					
					//colora parole
					var finito = that.checkWord();
					
					if ( finito =="FINITO") {
							var nextLevel = parseInt( that.livelloCorrente );
							nextLevel++;
							if ( nextLevel>10 )
								alert("CAMPIONE di insuperato: tè pigliate chissu!");
							else 
							{
								setTimeout(function(){}, 800);
								alert( "yu-uuh! Vai al livello: "+nextLevel );
								location.href = "version2.html?level="+nextLevel;
							}
					}
						
					//setTimeout( $.proxy( 
					//	this.checkWord;
					//, this ), 150 );	
				}										
			});
		}			
	};


};
