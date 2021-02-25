sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageToast) {
		"use strict";

		return Controller.extend("am.assetmanagment.controller.Main", {
			onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			},
			onLogin: function () {
				debugger;
				var oJsonM = this.getView().getModel("main").getProperty("/EmployeeDetails");
				var email = this.getView().byId("emlId").getValue();
				var pwd = this.getView().byId("pwdId").getValue();
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
				

				if(email === "123" && pwd === "123"){
					this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","TwoColumnsMidExpanded");
					this.oRouter.navTo("split");
					
				}

				else if(oJsonM instanceof Array){
				for (let JData of oJsonM) {
					if (JData.email === email && JData.psw === pwd) {
					var nIdx = oJsonM.indexOf(JData);
						MessageToast.show(oResourceBundle.getText("success_Login"));

						this.oRouter.navTo("Employee", {
							empID: nIdx
						});
					   return;
					}	
					else{
						MessageToast.show(oResourceBundle.getText("Invalid_Credentials"));
					}				
				}
			}
			
		}

		});
	});
