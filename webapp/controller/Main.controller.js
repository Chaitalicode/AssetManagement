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
				var em = this.getView().byId("emlId").getValue();
				var pwd = this.getView().byId("pwdId").getValue();
				var abc;

				if(em === "surya@signiwis.com" && pwd === "surya"){
					this.oRouter.navTo("Admin");
				}

				else if(oJsonM instanceof Array){
				for (abc of oJsonM) {
					if (abc.email === em && abc.psw === pwd) {
					var nIdx = oJsonM.indexOf(abc);
						MessageToast.show("Successfully Logged In");

						this.oRouter.navTo("Employee", {
							empID: nIdx
						});
					   return;
					}
				
					
				}
			}
			
		}
				// if(em === "surya@gmail.com" && pwd === "surya"){
				// 	this.oRouter.navTo("Admin");
				//   }
				// else if(oJsonM instanceof Array)
				// {
				// 	oJsonM.forEach(function(ovalue,i){
                //           debugger;
						
				// 		  if(ovalue.email === em && ovalue.psw === pwd){
				// 				this.oRouter.navTo("Employee", {
				// 								empID: i
				// 							}); 
				// 			  }

						  
				// 	});
				// }
			
		});
	});
