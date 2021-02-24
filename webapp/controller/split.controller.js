sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.split", {
		onInit: function () {
			debugger;
			this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","OneColumn");

		}
    })
})