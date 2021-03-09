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
            this.oRouter.navTo("split1", {
                hrData: "0"
            });
            this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","TwoColumnsMidExpanded");
                

		},
        

        onList:function(oEv){
            debugger;
           var oIdx =  oEv.getSource().getBindingContext("main").getObject().name;
           this.oRouter.navTo("split1", {
            hrData: oIdx
        });
        this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","TwoColumnsMidExpanded");
        }
    })
})