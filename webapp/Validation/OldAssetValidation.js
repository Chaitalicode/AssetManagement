sap.ui.define([

], function () {
	"use strict";

	return {

		OldAssetValidation: function () {
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
		
			if (empDate === "") {
				this.getView().byId("dateId").setValueState("Error");
				valid = false;
			}

			if (asstId === "") {
				this.getView().byId("asstID").setValueState("Error");
				valid = false;
			}
			if (!regexId.test(asstId)) {
				// MessageToast.show("Invalid mail address");
				this.getView().byId("asstID").setValueState("Error");
				valid = false;
			}

			if (asstNm === "") {
				this.getView().byId("asstNm").setValueState("Error");
				valid = false;
			}
			if (!rname.test(asstNm)) {
				this.getView().byId("asstNm").setValueState("Error");
				valid = false;
			}
		
			if (reasonId === "") {
				this.getView().byId("oldtxtID").setValueState("Error");
				valid = false;
			}
			if (!regextxt.test(reasonId)) {
				this.getView().byId("oldtxtID").setValueState("Error");
				valid = false;
			}

			if (fileId === "") {
				this.getView().byId("idFileuploader").setValueState("Error");
				valid = false;
			}
		
			return valid;
		}

	};

});