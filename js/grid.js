/**
 * @author Sal
 */

function Grid ( righe,colonne ) {
	//consts
	this.w = 41; //px
	this.h = 44; //px
	this.margin = 5; //px
	
	//vars
	this.righe=righe;
	this.colonne=colonne;
    this.grid = [];
    this.elem = new Array(
    	"Q","W","E","R","T","Y","U","I","O","P",
    	"A","S","D","F","G","H","J","K","L","-",
    	"-","Z","X","C","V","B","N","M","-","-"
    );
    
    //functions
	this.init = function() {
        for(var i=0; i<this.righe; i++) {
        	for(var j=0; j<this.colonne; j++) {
    			this.grid[i] = new Array(this.colonne);
			}		
		}
    };
    
    this.show = function() {
    	var c=0;
        for(var i=0; i<this.righe; i++) {
        	for(var j=0; j<this.colonne; j++) {
    			$("#mygrid").append( this.elem [c++] );
			}		
		}
    };

}