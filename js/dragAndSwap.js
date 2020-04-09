/**
 * @author Sal
 */

jQuery.fn.swap = function(b){ 
    // method from: http://blog.pengoworks.com/index.cfm/2008/9/24/A-quick-and-dirty-swap-method-for-jQuery
    b = jQuery(b)[0]; 
    var a = this[0]; 
    var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
   
    b.parentNode.insertBefore(a, b); 
    t.parentNode.insertBefore(b, t); 
    t.parentNode.removeChild(t);     
    return this; 
};

function vuota(){}

function drag1( ){
	$( ".dragdrop" ).draggable({ revert: true, helper: "clone" });
}

function drag2( ){
	$( ".dragdrop" ).droppable({
	    accept: ".dragdrop",
	    activeClass: "ui-state-hover",
	    hoverClass: "ui-state-active",
	    drop: function( event, ui ) {
	
	        var draggable = ui.draggable, droppable = $(this),
	            dragPos = draggable.position(), dropPos = droppable.position();
	        
	        $("#console").append( "("+draggable.text() +","+droppable.text()+")" );

	        draggable.css({
	            left: dropPos.left+'px',
	            top: dropPos.top+'px'
	        });
	
	        droppable.css({
	            left: dragPos.left+'px',
	            top: dragPos.top+'px'
	        });
	        draggable.swap(droppable);
	        
//	        window.setTimeout( vuota,1000);
	        
//	        droppable.css("background-color", "#F124bb");	//destinazione
	    }
	});
}


function checkOnKeyboard( word ){
	//1. get keyboard structure
	var res = new Array( 10 ); //lista di indici lettere da colorare
	
	//crea matrice 10 x 3
	var t = new Array( 3 );
	for( var k=0; k<3; k++ ) {
    	t[k] = new Array( 10 );
    	for( var h=0; h<10; h++ ) {
    		t[k][h]= (k+h);
    	}
	}

	var ii=0, jj=0;
	$("#keyboard ul li").each(function( i ) {	
		t[ii][jj] = $( this ).text();	
		//alert ( ii + " " + jj + " " + t[ii][jj] );
		
		//update indexes
		jj = (jj+1)%10;
		if (jj==0) ii++;
	});
	
	//2. pattern matching
	word = word.toLowerCase();
	var count=-1;
	for ( var i=0; i<3; i++ ){
		for ( var j=0; j<10; j++ ){
			//matching iniziale i,j?
			if ( t[i][j]==word[0] ) {
				//parola parte da xxx
				//alert ( "match di "+word+" trovata su "+i+","+j );
				res[++count] = i+","+j;
			}
			//else alert( "match di "+word+" NON trovato su "+i+","+j );
		}	
	}
	
	return res;
}
