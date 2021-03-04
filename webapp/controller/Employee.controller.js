sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/core/routing/History",
	"am/assetmanagment/formatter/formater"
], function (Controller, MessageBox, MessageToast,History,Formatter1) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Employee", {
		formatter: Formatter1,
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
			// this.getView().byId("reqID").bindElement("main>/AssetsAlloted/"+ this.oEMpId+"/New_Request");
			this.myReqs = "main>/AssetsAlloted/"+ this.oEMpId+"/New_Request";
			this.oldAssstReqs = "main>/AssetsAlloted/"+ this.oEMpId+"/OldAsst_Request";
			var oldAsstTemplate = new sap.m.ObjectListItem({
				title:"{main>asstId}",
				intro:"{main>asstNm}",
				number:"{main>status}"
				
			})
			this.getView().byId("OldAsstId").bindItems(this.oldAssstReqs,oldAsstTemplate);

			var reqTemplate = new sap.m.ObjectListItem({
				title:"{main>nwItem}",
				intro:"{main>empDate}",
				number:"{main>status}",
				
				firstStatus: new sap.m.ObjectStatus({
					text:"{main>txtArea}"
				})
			})
			
			this.getView().byId("reqID").bindItems(this.myReqs,reqTemplate);
			var template = new sap.m.ColumnListItem({
				cells:[
					new sap.m.Text({
						text:"{main>id}"
					}),
					new sap.m.Text({
						text:"{main>name}"
					}),
					new sap.m.Text({
						text:"{main>type}"
					}),
					new sap.m.Text({
						text:"{main>priority}"
					}),
					new sap.m.Text({
						text:"{main>DOA}"
					}),
					new sap.m.Text({
						text:"{main>status}"
					})
				]
			})
            this.getView().byId("idAssetTable1").bindItems(this.assetPath,template);
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
			else{
				this.fragment = sap.ui.xmlfragment(this.getView().getId(),"am.assetmanagment.fragment.ticket",this);
				this.getView().addDependent(this.fragment);
			}
			var Eid = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/empid");
			var Fname = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/fName");
			var Lname = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/lName");
		    this.getView().byId("id").setValue(Eid);
			this.getView().byId("name").setValue(Fname+" "+Lname);
			this.getView().byId("dateId").setMinDate(new Date());
			this.getView().byId("dateId").setMaxDate(new Date());
			this.fragment.open();
		},

		onComboSelect:function(oEv){
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
        
		arr:[],
		aOld:[],
		count:[],
		onSubmitReq:function(oEv){
			debugger;
			var MJson = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			this.empID = this.getView().byId("id").getValue();
			var name = this.getView().byId("name").getValue();
			var empDate = this.getView().byId("dateId").getValue();	
			var comboItem = this.getView().byId("comiD").getSelectedItem();	
				
			if(empDate === "" && comboItem ===null){
				sap.ui.core.Fragment.byId(this.getView().getId(), "dateId").setValueState("Error");
				sap.ui.core.Fragment.byId(this.getView().getId(), "dateId").setValueStateText("This field is Mandatory");
				sap.ui.core.Fragment.byId(this.getView().getId(), "dateId").focus();

				sap.ui.core.Fragment.byId(this.getView().getId(), "comiD").setValueState("Error");
				sap.ui.core.Fragment.byId(this.getView().getId(), "comiD").setValueStateText("This field is Mandatory");
				sap.ui.core.Fragment.byId(this.getView().getId(), "comiD").focus();
			}
			else{		
			if((comboItem.getText())=== "New Asset"){
			
					
			var nwItem = this.getView().byId("newComboID").getSelectedItem();
			var txtArea = this.getView().byId("textAreaID").getValue();

			if(nwItem === null && txtArea ===""){
				sap.ui.core.Fragment.byId(this.getView().getId(), "newComboID").setValueState("Error");
				sap.ui.core.Fragment.byId(this.getView().getId(), "newComboID").setValueStateText("This field is Mandatory");
				sap.ui.core.Fragment.byId(this.getView().getId(), "newComboID").focus();

				sap.ui.core.Fragment.byId(this.getView().getId(), "textAreaID").setValueState("Error");
				sap.ui.core.Fragment.byId(this.getView().getId(), "textAreaID").setValueStateText("This field is Mandatory");
				sap.ui.core.Fragment.byId(this.getView().getId(), "textAreaID").focus();
			}
			else{
				sap.ui.core.Fragment.byId(this.getView().getId(), "dateId").setValueState("None");
				sap.ui.core.Fragment.byId(this.getView().getId(), "comiD").setValueState("None");
				sap.ui.core.Fragment.byId(this.getView().getId(), "newComboID").setValueState("None");
				sap.ui.core.Fragment.byId(this.getView().getId(), "textAreaID").setValueState("None");
			var nwItem1 = nwItem.getText();
            var that = this;
			var obj = {
				"empID":this.empID,
				"name":name,
				"empDate":empDate,
				"comboItem":comboItem,
				"nwItem":nwItem1,
				"txtArea":txtArea,
				"status":"In-Progress"
			};
			that.arr.push(obj);
            var oldRd = that.assetPath.substr(5);
			// var newJson = new sap.ui.model.json.JSONModel();
          
		   MJson.forEach(function(iValue,i){
			   if(iValue.empId === that.empID){
				that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/"+i+"/New_Request",that.arr);
				that.getOwnerComponent().getModel("main").setProperty("/xyz",that.arr);
			   }
		   })
		  
		   that.fragment.destroy();
		   that.fragment = null;
		}
	}
	}

		if(comboItem === "Old Asset"){
			var asstId = this.getView().byId("asstID").getValue();		
			var asstNm = this.getView().byId("asstNm").getValue();	
			var oldtxtID = this.getView().byId("oldtxtID").getValue();	
			var that = this;
			var obj = {
				"empId" :this.empID,
				"empName":name,
				"asstId":asstId,
				"asstNm":asstNm,
				"empDate":empDate,
				"comboItem":comboItem,
				"img":this.file,
				"reason":oldtxtID,
				"status":"In-Progress"
			}
            that.aOld.push(obj);

			var newJson = new sap.ui.model.json.JSONModel();
            that.getOwnerComponent().setModel(newJson,"dymcModel");
			MJson.forEach(function(iValue,i){
				if(iValue.empId === that.empID){
					that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/"+i+"/OldAsst_Request", that.aOld);
				//  that.getOwnerComponent().getModel("main").setProperty("/xyz",that.arr);
				that.getOwnerComponent().getModel("dymcModel").setProperty("/OldAssestReq",  that.aOld);

				var nCount = that.getOwnerComponent().getModel("dymcModel").getProperty("/OldAssestReq/" + i);
						that.count.push(nCount);
						var empRequestLength = that.count.length;
						var sRes = {
							contHr: empRequestLength++
						};
						that.getOwnerComponent().getModel("dymcModel").setProperty("/hrNotfCount", sRes);
				}
			})
			
		    that.fragment.destroy();
		   that.fragment = null; 	
		}
		},

		onEmpNotification:function(oEv){
			debugger;
			var oButton = oEv.getSource();
			var oEMpReq = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			var oEMpReq2 = this.getOwnerComponent().getModel("main").getProperty("/HRNotification") ||[];
			if(!this.Notifyfragment){
				 var myID = this.createId("myFrag");
				 this.Notifyfragment = new sap.ui.xmlfragment(myID,"am.assetmanagment.fragment.EmpNotification",this);
				 this.getView().addDependent(this.Notifyfragment);
			}
			this.Notifyfragment.openBy(oButton);
		},

		onAfterClose:function(oEv){
			debugger; 
			this.Notifyfragment.destroy();
			this.Notifyfragment = null;
		},

		UpldCollectnItem: [],
		onhandleUpload:function(oEv){
             debugger;
			var MyFiles = this.getView().byId("idFileuploader").oFileUpload.files[0];

			var sfilename = MyFiles.name;

			var nSize = MyFiles.size;

			var sFileType = MyFiles.type;

			var sType = sFileType.split('/')[1];

			if (sType === "pdf" || sType === "png" || sType === "jpeg") {
				if (nSize <= 300000) {
					this.getView().byId("idMssgStrip").setVisible(false);
					this.file = URL.createObjectURL(MyFiles);
					var obj = {
						"filename": sfilename,
						"size": nSize,
						"filetype": sType,
						"file": this.file
					};
					this.UpldCollectnItem.push(obj);
					
						this.getView().getModel("main").setProperty("/AssetsAlloted/" + this.oEMpId + "/file", this.UpldCollectnItem);
						this.getView().getModel("main").getProperty("/AssetsAlloted/" + this.oEMpId + "/file");

						this.getView().getModel("main").updateBindings(true);
						this.getView().getModel("main").refresh(true);

						this.getView().byId("upldCollId").bindItems({
							path: "main>/AssetsAlloted/" + this.oEMpId + "/file/",
							template: this.getView().byId("upldItemId")
						});
					
				}
				else {
					this.getView().byId("idMssgStrip").setVisible(true);
				}
			}

		
		},

		onDelete: function (oEv) {
			debugger;
			var oEvnt = oEv.getSource().getBindingContext("main").getObject();
			var oItems = this.getView().getModel("main").getProperty("/AssetsAlloted");
			for (var i = 0; i < oItems.length; i++) {

				if (oItems[i].file.length !== 0) {

					for (var j = 0; j <= oItems[i].file.length; j++) {

						if (oEvnt.filename === oItems[i].file[j].filename) {
							oItems[i].file.splice(j, 1);
							this.getView().getModel("main").setProperty("/AssetsAlloted", oItems);
							break;
						}
					}
				}
			}

		},

		onItemClose:function(oEvent){
			debugger;
			oEvent.getSource().getParent().removeItem(oEvent.getSource())
		},

		onCancel:function(){
			debugger;
			this.fragment.destroy();
		    this.fragment = null;
			// this.getView().byId("idDialogS2").destroy();
		},

		onLogout:function(){
			debugger;
			this.oRouter.navTo("RouteMain");
		}
	
	});
});