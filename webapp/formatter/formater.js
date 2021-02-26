sap.ui.define([],function(){
	return{
		StatusState: function(iState){
			if(iState === "Completed"){
				return "Success";
			}
			else if(iState === "In-Process"){
				return "Warning";
			}
			else{
				return "Error";
			}
		},
		StatusState1:function(iPrice){
			debugger;
		}
	};
});