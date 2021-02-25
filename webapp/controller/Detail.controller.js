sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Detail", {
		onInit: function () {
			debugger;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("split").attachPatternMatched(this._onObjectMatched, this);
			this.oRouter.getRoute("split1").attachPatternMatched(this._onObjectMatched1, this);

		},
		_onObjectMatched:function(oEv){
			debugger;
			
		},
		_onObjectMatched1:function(oEv){
			debugger;
			var HrSelected = oEv.getParameters().arguments.hrData;
			if(HrSelected === "Employee Details"){
				debugger;
				this.byId("1st").setVisible(true);
				this.byId("2nd").setVisible(false);
			}
			else if(HrSelected === "Assets Details"){
				this.byId("2nd").setVisible(true);
				this.byId("1st").setVisible(false);
			}
		},

		onfilterEmpID:function(oEv){
			debugger;
			var filData = oEv.getParameters().value;
			var list = this.byId("exportTable");
			var oTBinding = list.getBinding("items");
			var aFilters = [];
			if( !filData ) {
				oTBinding.filter( [] );
			} 
			else{
			var filter = new sap.ui.model.Filter("empId", sap.ui.model.FilterOperator.EQ, filData);
			aFilters.push(filter);

			oTBinding.filter(aFilters);
			}
		},

		onfilterEpName:function(oEv){
			debugger;
			var filData = oEv.getParameters().value;
			var list = this.byId("exportTable");
			var oTBinding = list.getBinding("items");
			var aFilters = [];
            if( !filData ) {
				oTBinding.filter( [] );
			} 
			else{
			var filter = new sap.ui.model.Filter("empName", sap.ui.model.FilterOperator.EQ, filData);
			aFilters.push(filter);

			oTBinding.filter(aFilters);
			}
		},

		onShow:function(oEv){
			debugger;
			var Indx = oEv.getSource().getBindingContext("main").getPath().substr("15");
			this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","ThreeColumnsMidExpanded");
			this.oRouter.navTo("tripleApp",{
				my:Indx
			});
		},

		empTableExport:function(oEv){
			debugger;
		}
    })
})