sap.ui.define([

], function () {
	"use strict";

	return {

		OldAssetLiveValidation: function () {
			debugger;
			var empDate = this.getView().byId("dateId").getValue();	
			var asstId = this.getView().byId("asstID").getValue();	
			var asstNm = this.getView().byId("asstNm").getValue();	
			var reasonId = this.getView().byId("oldtxtID").getValue();
			var fileId = this.getView().byId("idFileuploader").getValue();
			


			var regextxt = /^[0-9a-zA-Z_ ]{10,40}$/;

			var regexId =/^[0-9a-zA-Z]{5,8}$/;

			var rname = /^[a-zA-Z]{5,18}$/;
		
			var valid = true;

// 
if (empDate === "") {
    this.getView().byId("dateId").setValueState("Error");
    this.getView().byId("dateId").setValueStateText("Please select date");

} else {
    this.getView().byId("dateId").setValueState("None");
}

if (asstId === "") {
    this.getView().byId("asstID").setValueState("Error");
    this.getView().byId("asstID").setValueStateText("Please enter the Assest ID");

} else {
    this.getView().byId("asstID").setValueState("None");

}

if (!regexId.test(asstId)) {
    this.getView().byId("asstID").setValueState("Error");
    this.getView().byId("asstID").setValueStateText("Characters Allowed.");

} else {
    this.getView().byId("asstID").setValueState("None");
}

if (asstNm === "") {
    this.getView().byId("asstNm").setValueState("Error");
    this.getView().byId("asstNm").setValueStateText("Please enter the Assest Name.");

} else {
    this.getView().byId("asstNm").setValueState("None");

}
if (!rname.test(asstNm)) {
    this.getView().byId("asstNm").setValueState("Error");
    this.getView().byId("asstNm").setValueStateText("Characters Allowed.");

} else {
    this.getView().byId("asstNm").setValueState("None");
}

if (reasonId === "") {
    this.getView().byId("oldtxtID").setValueState("Error");
    this.getView().byId("oldtxtID").setValueStateText("Please enter the Assest Name.");

} else {
    this.getView().byId("oldtxtID").setValueState("None");

}
if (!regextxt.test(reasonId)) {
    this.getView().byId("oldtxtID").setValueState("Error");
    this.getView().byId("oldtxtID").setValueStateText("Characters Allowed.");

} else {
    this.getView().byId("oldtxtID").setValueState("None");
}

if (fileId === "") {
    this.getView().byId("idFileuploader").setValueState("Error");
    this.getView().byId("idFileuploader").setValueStateText("Please enter the Assest Name.");

} else {
    this.getView().byId("idFileuploader").setValueState("None");

}



}
	};

});