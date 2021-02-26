sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	"am/assetmanagment/formatter/formater"
], function (Controller, MessageBox, MessageToast,exportLibrary, Spreadsheet,formater) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Detail", {
		formater:formater,
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
				this.byId("3rd").setVisible(false);
			}
			else if(HrSelected === "Assets Details"){
				this.byId("2nd").setVisible(true);
				this.byId("1st").setVisible(false);
				this.byId("3rd").setVisible(false);
			}
			else if(HrSelected === "Expenses"){
				this.byId("3rd").setVisible(true);
				this.byId("2nd").setVisible(false);
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

		onComboYear:function(oEv){
			debugger;
		var uSelecdt =	oEv.getParameters().selectedItem;
		var oTable = this.getView().byId("uiTableID1");
		var oBindg = oTable.getBinding();
		var oFil = [];
		if(!uSelecdt){
            oBindg.filter([]);
		}
		else{
		var SelectedValue = oEv.getParameters().selectedItem.getKey();
		var myFil =	new sap.ui.model.Filter("year",sap.ui.model.FilterOperator.EQ, SelectedValue);
		oFil.push(myFil);
		// oBindg.filter(oFil);
		this.byId("uiTableID1").getBinding().filter(oFil);
		}
		},

		createColumnConfig: function() {
			return [
				{
					label: 'Employee_ID',
					property: 'empId',
					scale: 0
				},
				{
					label: 'Employee_Name',
					property: 'empName',
					width: '25'
				},
				{
					label: 'Asset_ID',
					property: 'id',
					scale: 0
				},
				{
					label: 'Assets_Name',
					property: 'name',
					scale: 0
				},
				{
					label: 'Asset_Type',
					property: 'type',
					scale: 0
				}];
		},

		empTableExport:function(oEv){
			debugger;
			var aCols, aProducts, oSettings, oSheet;
			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("main").getProperty('/AssetsAlloted');
		console.log(abc);
		oSettings = {
			workbook: { columns: aCols },
			dataSource: abc 
		};
			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
		}
    })
})