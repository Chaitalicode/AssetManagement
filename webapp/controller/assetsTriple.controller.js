sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.assetsTriple", {
		onInit: function () {
			debugger;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("tripleApp").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched:function(oEv){
			debugger;
			var pth = oEv.getParameters().arguments.my;
			this.getView().bindElement("main>/AssetsAlloted/"+pth);
			this.getView().byId("uiTableID").bindRows("main>/AssetsAlloted/"+pth+"/assests/");
		}
    })
})