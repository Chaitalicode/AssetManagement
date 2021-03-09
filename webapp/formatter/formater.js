sap.ui.define([],function(){
	return{
		StatusState: function(iState){
			debugger;
			if(iState === "Approved"){
				return "Success";
			}
			else if(iState === "In-Progress"){
				return "Warning";
			}
			else{
				return "Error";
			}
		},
		StatusState1:function(iPrice,iValue){
			debugger;
			return iPrice*iValue;
		}
	};
});