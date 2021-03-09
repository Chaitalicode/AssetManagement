sap.ui.define([

], function () {
	"use strict";

	return {
		NewAssetLiveChangevalidate: function () {

			var dateid = this.getView().byId("dateId").getValue();
			var txtid = this.getView().byId("textAreaID").getValue();			
			var comboid = this.getView().byId("newComboID").getSelectedItem();

			var regtxt = /^[0-9a-zA-Z_ ]{10,40}$/;
			
			if (dateid === "") {
				this.getView().byId("dateId").setValueState("Error");
				this.getView().byId("dateId").setValueStateText("Please select date");

			} else {
				this.getView().byId("dateId").setValueState("None");
			}

			if (comboid === "") {
				this.getView().byId("newComboID").setValueState("Error");
				this.getView().byId("newComboID").setValueStateText("Have to select Item");

			} else {
				this.getView().byId("newComboID").setValueState("None");

			}

			if (txtid === "") {
				this.getView().byId("textAreaID").setValueState("Error");
				this.getView().byId("textAreaID").setValueStateText("Reason Required.");

			} else {
				this.getView().byId("textAreaID").setValueState("None");

			}
			if (!regtxt.test(txtid)) {
				this.getView().byId("textAreaID").setValueState("Error");
				this.getView().byId("textAreaID").setValueStateText("Exceeding Characters.");

			} else {
				this.getView().byId("textAreaID").setValueState("None");
			}
		

		}
	};
});