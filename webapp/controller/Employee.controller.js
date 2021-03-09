sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
    "sap/ui/core/routing/History",
	"am/assetmanagment/formatter/formater",
	"am/assetmanagment/Validation/NewAssetValidation",
	"am/assetmanagment/Validation/NewAssetLiveValidation",
	"am/assetmanagment/Validation/OldAssetValidation",
	"am/assetmanagment/Validation/OldAssetLiveChangeValidation",
], function (Controller, MessageBox, MessageToast,History,Formatter1,NewAssetValidation,NewAssetLiveValidation,OldAssetValidation,OldAssetLiveChangeValidation) {
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

			
			//   this.getOwnerComponent().getModel("main").getProperty(this.path+"/notify");

			 var empCount= this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails/"+ this.oEMpId+"/notiCount");
			// var empLength = empCount.length;
			
			if(empCount == 0 || empCount === undefined){
                this.getView().byId("btnIdN").setText(null);
				this.getView().byId("btnIdN").setType("Transparent");
			}
			else{
				this.getView().byId("btnIdN").setText(empCount);
				this.getView().byId("btnIdN").setType("Accept");
			}
			
			// Old Asset Req...........................................................
			this.oldAssstReqs = "main>/AssetsAlloted/"+ this.oEMpId+"/oldAsst";
			    debugger;
			var oldAsstTemplate = new sap.m.ObjectListItem({
				title:"{main>asstId}",
				intro:"{main>asstNm}",
				firstStatus: new sap.m.ObjectStatus({
					text: "{main>status}",
					state:{path:'main>status', formatter:this.formatter.StatusState.bind(this)},
				}),
				secondStatus:new sap.m.ObjectStatus({
					text: "{main>reason}",			
				}),
				
			})
			
			this.getView().byId("OldAsstId").bindItems(this.oldAssstReqs,oldAsstTemplate);

			// ------------------------------------------------------------------------

			// New Assets Req............................................
			this.myReqs = "main>/AssetsAlloted/"+ this.oEMpId+"/requests";
			var reqTemplate = new sap.m.ObjectListItem({
				title:"{main>nwItem}",
				intro:"{main>name}",
				
				firstStatus: new sap.m.ObjectStatus({
					text: "{main>status}",
					state:{path:'main>status', formatter:this.formatter.StatusState.bind(this)},
				
				
				}),

				secondStatus:new sap.m.ObjectStatus({
					text: "{main>reason}",			
				}),
			})
			
			this.getView().byId("reqID").bindItems(this.myReqs,reqTemplate);

			// ---------------------------------------------------
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

		

		onRaiseTicketNew:function(oEv){
			if(!this.fragment){
				this.fragment = new sap.ui.xmlfragment(this.getView().getId(),"am.assetmanagment.fragment.Newticket",this);
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

		onRaiseTicketOld:function(oEv){
			debugger;
			if(!this.OldAsstfragment){
				this.OldAsstfragment = new sap.ui.xmlfragment(this.getView().getId(),"am.assetmanagment.fragment.OldTicket",this);
				this.getView().addDependent(this.OldAsstfragment);
			}
			var Eid = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/empid");
			var Fname = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/fName");
			var Lname = this.getView().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/lName");
		    this.getView().byId("id").setValue(Eid);
			this.getView().byId("name").setValue(Fname+" "+Lname);
			this.getView().byId("dateId").setMinDate(new Date());
			this.getView().byId("dateId").setMaxDate(new Date());
			this.OldAsstfragment.open();
		},
        
		
		validate: function () {
			NewAssetLiveValidation.NewAssetLiveChangevalidate.call(this);
		},

		validateOld:function(){
			debugger;
			OldAssetLiveChangeValidation.OldAssetLiveValidation.call(this);
		},

		arr:[],
		aOld:[],
		count:[],
		onSubmitReq:function(oEv){
			debugger;
			var aLocal = [];
			var validation = NewAssetValidation.NewAssetValidation.call(this);
			var MJson = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			var UsrImg =   this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/imgEmp");
			this.empID = this.getView().byId("id").getValue();
			var name = this.getView().byId("name").getValue();
			var empDate = this.getView().byId("dateId").getValue();	
			var nwItem = this.getView().byId("newComboID").getSelectedItem();
			
			
			var txtArea = this.getView().byId("textAreaID").getValue();
			if (validation === true) {
			var nwItem1 = nwItem.getText();
            var that = this;
			var obj = {
				"empID":this.empID,
				"name":name,
				"empDate":empDate,
				"nwItem":nwItem1,
				"reason":txtArea,
				"img":UsrImg,
				"status":"In-Progress"
			};

		
			
			that.arr.push(obj);
           

			MJson.forEach(function(iValue,i){
				if(iValue.empId === that.empID){
				//  let aFilterReq = aLocal.filter((item)=>{
                //       return item.empId = iValue.empId;
				//  });

				 
				 var aReqs = that.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted/"+i+"/requests");
				 aReqs.push(obj);
				 that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/"+i+"/requests",aReqs);
				 that.getOwnerComponent().getModel("main").setProperty("/NewReqAsst",that.arr);
				 

				 var nCount = that.getOwnerComponent().getModel("main").getProperty("/NewReqAsst/" + i);
						that.count.push(nCount);
						var empRequestLength = that.count.length;
						var sRes = {
							contHr: empRequestLength++
						};
						that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount", sRes);
				}
			})
		   
			that.fragment.destroy();
			that.fragment = null;
		}
		},

		onSubmitReqAsstOld:function(oEv){
			debugger;
			var validation = OldAssetValidation.OldAssetValidation.call(this);
			var MJson = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			var UsrImg1 =   this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails/"+this.oEMpId+"/imgEmp");
			this.empID = this.getView().byId("id").getValue();
			var name = this.getView().byId("name").getValue();
			var empDate = this.getView().byId("dateId").getValue();	
			var asstId = this.getView().byId("asstID").getValue();	
			var asstNm = this.getView().byId("asstNm").getValue();	
			var reasonId = this.getView().byId("oldtxtID").getValue();

			if (validation === true) {
			var that = this;
			var obj = {
				"empId" :this.empID,
				"empName":name,
				"usrImg":UsrImg1,
				"empDate":empDate,
				"asstId":asstId,
				"asstNm":asstNm,
				"img":this.file,
				"reason":reasonId,
				"status":"In-Progress"
			}
            that.aOld.push(obj);

		
			MJson.forEach(function(iValue,i){
				if(iValue.empId === that.empID){
					var aReqs = that.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted/"+i+"/oldAsst");
					aReqs.push(obj);
					that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/"+i+"/oldAsst", aReqs);
				that.getOwnerComponent().getModel("main").setProperty("/OldAssestReq",  that.aOld);

				var nCount = that.getOwnerComponent().getModel("main").getProperty("/OldAssestReq/" + i);
						that.count.push(nCount);
						var empRequestLength = that.count.length;
						var sRes = {
							contHr: empRequestLength++
						};
						that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount", sRes);
				}
			})
			
		    that.OldAsstfragment.destroy();
		   that.OldAsstfragment = null; 	
			
		}

		},

		onEmpNotification:function(oEv){
			debugger;
			var oButton = oEv.getSource();
			if(!oButton.getText()){
				MessageToast.show("You Don't have any Notifications");
				return;
			}
			var oEMpReq = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			if(!this.Notifyfragment){
				 var myID = this.createId("myFrag");
				 this.Notifyfragment = new sap.ui.xmlfragment(myID,"am.assetmanagment.fragment.EmpNotification",this);
			
			}
			// this.Notifyfragment.bindElement(this.path+"/notify");
			this.getView().addDependent(this.Notifyfragment);
			
			this.Notifyfragment.getContent()[0].getItems()[0].bindItems(this.path+"/notify",this.Notifyfragment.getContent()[0].getItems()[0].getItems()[0]);
			this.Notifyfragment.getContent()[0].getItems()[1].bindItems(this.path+"/notify",this.Notifyfragment.getContent()[0].getItems()[1].getItems()[0]);
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
			// oEvent.getSource().getParent().removeItem(oEvent.getSource());
			var oDeleteObj = oEvent.getSource().getBindingContext("main").getObject();
			var sPath = oEvent.getSource().getParent().getBinding("items").getPath();
			var oNotiftions =  this.getOwnerComponent().getModel("main").getProperty(sPath);
			oNotiftions.forEach(function(item,i){
				if(item === oDeleteObj){
					oNotiftions.splice(i,1);
			
				}
			});
			this.getOwnerComponent().getModel("main").setProperty(sPath,oNotiftions);
			var oCount = oNotiftions.length;
			this.getOwnerComponent().getModel("main").setProperty(this.path+"/notiCount",oCount);
			this.getView().byId("btnIdN").setText(oCount);
			var btn = this.getView().byId("btnIdN");
			if(btn.getText() == 0){
                btn.setText(null);
				btn.setType("Transparent");
			}
			else{
				btn.setText(oCount);
				btn.setType("Accept");
			}
		},

		onCancel:function(){
			debugger;
			this.fragment.destroy();
		    this.fragment = null;
		
		},

		onClose:function(){
			this.OldAsstfragment.destroy();
		    this.OldAsstfragment = null;
		},

		onLogout:function(){
			debugger;
			this.oRouter.navTo("RouteMain");
		}
	
	});
});