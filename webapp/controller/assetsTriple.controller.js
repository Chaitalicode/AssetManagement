sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet'
], function (Controller, MessageBox, MessageToast,exportLibrary, Spreadsheet) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.assetsTriple", {
		onInit: function () {
			debugger;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("tripleApp").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched:function(oEv){
			debugger;
			this.pth = oEv.getParameters().arguments.my;
			this.getView().bindElement("main>/AssetsAlloted/"+this.pth);
			this.getView().byId("uiTableID").bindRows("main>/AssetsAlloted/"+this.pth+"/assests/");
		},

		createColumnConfig: function() {
			return [
				{
					label: 'Employee_Name',
					property: 'emplName',
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
				},
				{
					label: 'Asset_Priority',
					property: 'priority',
					scale: 0
				},
				{
					label: 'Asset_Alloted',
					property: 'DOA',
					scale: 0
				},
				{
					label: 'Asset_Status',
					property: 'status',
					scale: 0
				}];
		},

		empTableExport1:function(oEv){
			debugger;
			var aCols, aProducts, oSettings, oSheet;
			aCols = this.createColumnConfig();
			var sTitl = this.getView().byId("objId").getTitle();
			var sID = this.getView().byId("objId").getNumber();
			 
			 this.getView().getModel("main").setProperty('/AssetsAlloted/'+this.pth+"/assests/emplName",sTitl);
			 aProducts = this.getView().getModel("main").getProperty('/AssetsAlloted/'+this.pth+"/assests/");
		oSettings = {
			workbook: { columns: aCols },
			dataSource: aProducts
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