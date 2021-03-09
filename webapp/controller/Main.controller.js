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
					this.getView().byId("emlId").setValueState("None");
						this.getView().byId("pwdId").setValueState("None");
						this.getView().byId("emlId").setValue("");
						this.getView().byId("pwdId").setValue("");
				}

				else if(!email || !pwd){
				this.getView().byId("emlId").setValueState("Error");
				this.getView().byId("pwdId").setValueState("Error");
				MessageToast.show(oResourceBundle.getText("Enter_Credentials"));
				}

				else if(oJsonM instanceof Array){
				for (let JData of oJsonM) {
					if (JData.email === email && JData.psw === pwd) {
					var nIdx = oJsonM.indexOf(JData);
						MessageToast.show(oResourceBundle.getText("success_Login"));

						this.oRouter.navTo("Employee", {
							empID: nIdx
						});
						this.getView().byId("emlId").setValueState("None");
						this.getView().byId("pwdId").setValueState("None");
						this.getView().byId("emlId").setValue("");
						this.getView().byId("pwdId").setValue("");
					   return;
					}	
					else if (JData.email != email && JData.psw != pwd) {
						this.getView().byId("emlId").setValueState("Error");
						this.getView().byId("pwdId").setValueState("Error");
						MessageToast.show(oResourceBundle.getText("Invalid_Credentials"));
					}
					// else{
					// 	MessageToast.show(oResourceBundle.getText("Invalid_Credentials"));
					// }				
				}
			}
			
		},

		onLogin1:function(){
			var oJsonM = this.getView().getModel("main").getProperty("/EmployeeDetails");
				var email = this.getView().byId("emlId").getValue();
				var pwd = this.getView().byId("pwdId").getValue();
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

				if (email === "" && pwd === "") {

					MessageToast.show(oResourceBundle.getText("Enter_Credentials"));
					this.getView().byId("emlId").setValueState("Error");
					this.getView().byId("pwdId").setValueState("Error");
					
	
				}else if (email === "123" && pwd === "123") {
					this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","TwoColumnsMidExpanded");
					this.oRouter.navTo("split");
					    this.getView().byId("emlId").setValueState("None");
						this.getView().byId("pwdId").setValueState("None");
						this.getView().byId("emlId").setValue("");
						this.getView().byId("pwdId").setValue("");
	
				} else if (email === "") {

					MessageToast.show(oResourceBundle.getText("Enter_Email"));
					this.getView().byId("emlId").setValueState("Error");
				} else if (pwd === "") {
	
					MessageToast.show(oResourceBundle.getText("Enter_Pwd"));
					this.getView().byId("psw").setValueState("Error");
				}
				else if(oJsonM instanceof Array){
					for (let JData of oJsonM) {
						if (JData.email === email && JData.psw === pwd) {
						var nIdx = oJsonM.indexOf(JData);						
	
							this.oRouter.navTo("Employee", {
								empID: nIdx
							});
							MessageToast.show(oResourceBundle.getText("success_Login"));
							this.getView().byId("emlId").setValueState("None");
							this.getView().byId("pwdId").setValueState("None");
							this.getView().byId("emlId").setValue("");
							this.getView().byId("pwdId").setValue("");
						   return;
						}	
						else if (JData.email != email && JData.psw != pwd) {
							this.getView().byId("emlId").setValueState("Error");
							this.getView().byId("pwdId").setValueState("Error");
							MessageToast.show(oResourceBundle.getText("Invalid_Credentials"));
						}
								
					}
				}
		}

		});
	});
