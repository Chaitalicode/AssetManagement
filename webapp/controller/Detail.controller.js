sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Detail", {
		onInit: function () {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("split").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched:function(oEv){
			debugger;
			
		}
    })
})