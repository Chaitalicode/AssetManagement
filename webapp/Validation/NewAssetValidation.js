sap.ui.define([

], function () {
	"use strict";

	return {

		NewAssetValidation: function () {
			debugger;
			var dateid = this.getView().byId("dateId").getValue();
			var txtid = this.getView().byId("textAreaID").getValue();			
			var comboid = this.getView().byId("newComboID").getSelectedItem();

			// var rnum = /^[0-9]{2,5}$/;
			// var rname = /^[a-zA-Z]{5,18}$/;
			// var rmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
			// var rpwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,9}$/;
			// var rmob = /^[789]\d{9}$/;
			var rtxt = /^[0-9a-zA-Z_ ]{10,40}$/;
			var valid = true;
		
			if (dateid === "") {
				// MessageToast.show("name Can't be Empty");
				this.getView().byId("dateId").setValueState("Error");
				valid = false;
			}
			
			if (comboid === null) {
				// MessageToast.show("Please confirm your password");
				this.getView().byId("newComboID").setValueState("Error");
				valid = false;
			}

			if (txtid === "") {
				// MessageToast.show("mail Can't be Empty");
				this.getView().byId("textAreaID").setValueState("Error");
				valid = false;
			}
			if (!rtxt.test(txtid)) {
				// MessageToast.show("Invalid mail address");
				this.getView().byId("textAreaID").setValueState("Error");
				valid = false;
			}
		
			return valid;
		}

	};

});