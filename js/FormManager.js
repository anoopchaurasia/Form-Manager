
(function($) {
     var rCRLF = /\r?\n/g,
             COMMA = ",";

    function hasElem( o ){

        for(var t in o ){
            return true;
        }
        return false;
         
    }
     function convertStringToObject() {
        var a = arguments, o = null, j, d;
        d = ("" + a[1]).split(".");
        o = a[0];

        for (j = 0; j < d.length - 1; j = j + 1) {

            if( !isNaN(d[ j + 1 ]) &&  !hasElem( o ) ){
              o[d[j]] = o[d[j]] || [];
            }else{
                o[d[j]] = o[d[j]] || {};
            }
            o = o[d[j]];
        }
        o[ d[ j ] ] = a[ 2 ];
    }
    function handleCondition( elem, type){

          var elem = list[i];
				    $(elem).bind("click", function() {
					$(this).css("border", "1px solid #cccccc");
				}).css("border", "1px solid red");
    }
    function isAddable(){
        return this.name && !this.disabled;
    }

    function isConditionMet( conditions, value ){
        for( var k in conditions ){
            switch( conditions[k] ){
                case "mandatory" : {
                    return !( !value );
                }
            }
        }
        return true;
    }
    function getAttribute(){

        return this.getAttribute( "fm" )? this.getAttribute( "fm" ) : "";
    }

    function getData( elem, callback){

            if( !isAddable.call( elem ) ){
                return {};
            }
        
            var fm = getAttribute.call(elem).split( COMMA );
            var value = elem.value;
            if( !isConditionMet.call( elem, fm, value ) ){
                return {};
            }
           var ret = convertStringToObject( this, $.trim(elem.name),  $.trim( elem.value ) );
        callback.call( elem, elem.value, elem.type, elem.name );
    }
	$.fn.getForm = function( cb ) {
        var callback = cb ? cb : function(){};
        var ret = {};
        var elems = $(this)[0];
		for ( var i = 0, len = elems.length; i < len; i++ ) {
            getData.call( ret, elems[i], callback);
        }
        return ret;
	};
	

	$.fn.fillForm = function( fields, cb ) {

        var callback = cb ? cb : function(){};
		if (!fields){
            return false;
        }
		var self =  $(this)[0];
		for ( var k in fields) {
			fillThisField( fields[k], k );
		}
        
		function fillThisField( field, index ) {
            
            switch( typeof field ){
                case "object":{
                    for ( var i in field) {
                        fillThisField( field[i], index + "." + i );
                    }
                     break;
                }
                
                case "function":{
                    break;
                }
                default:{
                     var elem = self[index];
                    if( elem ){
                        assignValue.call( elem, field );
                    }
                }
            }
        }
        function assignValue( value ){

            switch( this.type ){

                case "checkbox":{

                    this.checked = value;
                    callback.call( this, value, this.type,  this.name );
                    break;
                }
                case undefined :{
                    if( typeof this  == "object" ){
                        for ( var key = 0; key < this.length; key++) {
                            if( this[key].value == value ){
                                this[key].checked = true;
                                callback.call( this[key], value, this[key].type,  this[key].name );
                            }
							else{
                                this[key].checked = false ;
                            }
					    }
                    }
                    break;
                }
                default :{
                    this.value = value;
                    callback.call( this, value, this.type, this.name );
                }
            }
		}
	};
})(jQuery);