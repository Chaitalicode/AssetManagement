sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Master", {
		onInit: function () {
			debugger;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		},
        onNav:function(){

            this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","OneColumn");
            this.oRouter.navTo("RouteMain");
        }
    })
})