sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/core/routing/History"
], function (Controller, MessageBox, MessageToast,History) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Employee", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.onObjectMatched, this);
		},
        onObjectMatched:function(oEv){
            debugger;
            this.oEMpId = oEv.getParameters().arguments.empID;
			
			this.path = "main>/EmployeeDetails/" + this.oEMpId;
            this.assetPath =  "main>/AssetsAlloted/"+ this.oEMpId +"/assests";
			this.getView().byId("ObjectPageLayout").bindElement(this.path);
			var template = this.byId("columnID");
            this.getView().byId("idAssetTable").bindItems(this.assetPath,template);
        },
        onNav:function(){
            debugger;
            var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMain", {}, true);
			}
            // this.oRouter.navTo("RouteMain");
        },

		onRaiseTicket:function(oEv){
			debugger;
			if(!this.fragment){
				this.fragment = new sap.ui.xmlfragment(this.getView().getId(),"am.assetmanagment.fragment.ticket",this);
				this.getView().addDependent(this.fragment);
			}
			var Eid = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/empid");
		this.getView().byId("id").setValue(Eid);
			this.fragment.open();
		},

		onComboSelect:function(oEv){
			debugger;

			var userSlct = oEv.getParameters().value;
			if(userSlct === "New Asset"){
				this.getView().byId("newAsstID").setVisible(true);
				this.getView().byId("oldAsstID").setVisible(false);
			}
			else if(userSlct === "Old Asset"){
				this.getView().byId("oldAsstID").setVisible(true);
				this.getView().byId("newAsstID").setVisible(false);
			}
		},

		onSubmitReq:function(oEv){
			debugger;
			var empDate = this.getView().byId("dateId").getValue();		
			var comboItem = this.getView().byId("comiD").getSelectedItem().getText();
			if(comboItem === "New Asset"){
			var empID = this.getView().byId("id").getValue();
			
			var nwItem = this.getView().byId("newComboID").getSelectedItem().getText();
			var txtArea = this.getView().byId("textAreaID").getValue();

			var obj = {
				"empID":empID,
				"empDate":empDate,
				"comboItem":comboItem,
				"nwItem":nwItem,
				"txtArea":txtArea
			};

			var newJson = new sap.ui.model.json.JSONModel();
            this.getView().setModel(newJson,"dymcModel");
			this.getView().getModel("dymcModel").setProperty("/Req", obj);
		}

		if(comboItem === "Old Asset"){
			var asstId = this.getView().byId("asstID").getValue();		
			var asstNm = this.getView().byId("asstNm").getValue();	
			var oldtxtID = this.getView().byId("oldtxtID").getValue();	

			var obj = {
				"asstId":asstId,
				"asstNm":asstNm,
				"empDate":empDate,
				"comboItem":comboItem,
				"img":this.file
			}
			var newJson = new sap.ui.model.json.JSONModel();
            this.getView().setModel(newJson,"dymcModel");
			this.getView().getModel("dymcModel").setProperty("/Req", obj);
		    	
		}
		},

		onhandleUpload:function(oEv){
             debugger;
			var MyFiles = this.getView().byId("idFileuploader").oFileUpload.files[0];
			this.file = URL.createObjectURL(MyFiles);
		},

		onCancel:function(){
			this.fragment.close();
		}
	
	});
});