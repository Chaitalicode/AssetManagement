sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	"am/assetmanagment/formatter/formater"
], function (Controller, MessageBox, MessageToast,exportLibrary, Spreadsheet,formatter) {
	"use strict";

	return Controller.extend("am.assetmanagment.controller.Detail", {
		formatter:formatter,
		onInit: function () {
			debugger;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("split").attachPatternMatched(this._onObjectMatched, this);
			this.oRouter.getRoute("split1").attachPatternMatched(this._onObjectMatched1, this);

            var JSNData = new sap.ui.model.json.JSONModel();
			this.getOwnerComponent().setModel(JSNData,"JSONViz");
			var sd = this.getOwnerComponent().getModel("main").getProperty("/Assets_Details");
            var Marr = [];
			sd.forEach(function(oValue,i){
                debugger;
				var Mcost = oValue.item_cost;
				var Mquan = oValue.quantity;
				var totl = Mcost * Mquan;
				var obj1 = {
					"total-cost":totl,
					"year":oValue.year
				};
                Marr.push(obj1);
				

			});

			this.getOwnerComponent().getModel("JSONViz").setProperty("/VizModel",Marr);

			var oVizFrame = this.getView().byId("idVizFrame");
            var vizPopover = new sap.viz.ui5.controls.Popover({});
            vizPopover.connect(oVizFrame.getVizUid());

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
				this.byId("4th").setVisible(false);
			}
			else if(HrSelected === "Assets Details"){
				this.byId("2nd").setVisible(true);
				this.byId("1st").setVisible(false);
				this.byId("3rd").setVisible(false);
				this.byId("4th").setVisible(false);
			}
			else if(HrSelected === "Expenses"){
				this.byId("3rd").setVisible(true);
				this.byId("2nd").setVisible(false);
				this.byId("1st").setVisible(false);
				this.byId("4th").setVisible(false);
			}
			else if(HrSelected === "Requests"){
				this.byId("4th").setVisible(true);
				this.byId("3rd").setVisible(false);
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

		arrAdminNoti: [],
		

		onNotification:function(oEv){
			debugger;
			var oButton = oEv.getSource();
			if(!oButton.getText()){
				MessageToast.show("You Don't have any Notifications");
				return;
			}
			var oEMpReq = this.getOwnerComponent().getModel("main").getProperty("/AssetsAlloted");
			var NewAssests = this.getOwnerComponent().getModel("main").getProperty("/xyz") ||[];
			if(!this.Notifyfragment){
				 var myID = this.createId("myFrag");
				 this.Notifyfragment = new sap.ui.xmlfragment(myID,"am.assetmanagment.fragment.Notification",this);
				 this.getView().addDependent(this.Notifyfragment);
			}
			else{
				var myID1 = this.createId("myFrag1");
				this.Notifyfragment = sap.ui.xmlfragment(myID1,"am.assetmanagment.fragment.Notification",this);
				this.getView().addDependent(this.Notifyfragment);
			}
			
			this.Notifyfragment.openBy(oButton);
		},
		
		onAfterClose:function(oEv){
			debugger; 
			// this.Notifyfragment.close();
			this.Notifyfragment.destroy();
			this.Notifyfragment = null;
		},

		empReq:[],
		count: [],
	
	 onOldAcceptPress:function(oEv){
		debugger;
		var oStatus = this.getOwnerComponent().getModel("main").getProperty("/OldAssestReq");
		var oEmpDetails = this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails");
		var oItm = oEv.getSource();
		var oList = oItm.getParent().getParent().getParent();
		// var Uid =  oEv.getSource().getParent().getParent().getTitle();
		var Uid = oEv.getSource().getBindingContext("main").getObject().empId;
		var oItmSelected = oEv.getSource().getBindingContext("main").getObject();	
		// var IDU = Uid.substr(17,3);
		var that = this;
	   
		for(let i=0; i<oStatus.length; i++){
			if(oStatus[i] === oItmSelected){
			 that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/" + i+"/oldAsst/status","Approved");
			 that.getOwnerComponent().getModel("main").setProperty("/OldAssestReq/" + i+"/status","Approved");
			 var req = that.getOwnerComponent().getModel("main").getProperty("/OldAssestReq/"+i);
			//  this.empReq.push(req);
			//  that.getOwnerComponent().getModel("main").setProperty("/EmpFrag2",this.empReq);

			oEmpDetails.forEach((oEmp)=>{
				if(oEmp.empid === Uid){
					if(!oEmp.notify){
						oEmp.notify=[];
						oEmp.notify.push(req);
						oEmp.notiCount = oEmp.notify.length;
					}
					else{
						oEmp.notify.push(req);
						oEmp.notiCount = oEmp.notify.length;
					}				
				}
	
		  });
		  this.getOwnerComponent().getModel("main").setProperty("/EmployeeDetails",oEmpDetails);
		  var rt =  that.getOwnerComponent().getModel("main").getProperty("/hrNotfCount");
		  var yu = rt.contHr -1;
		  if(yu>0){
		  that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",yu);
		  }
		  else{
			  that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",null);	
		  }
		  

			 oStatus.splice(i,1);
			 this.getView().getModel("main").refresh();
			}
		}
	 
 },

 onOldRejectPress:function(oEv){
	debugger;
	var oStatus = this.getOwnerComponent().getModel("main").getProperty("/OldAssestReq");
	var oEmpDetails = this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails");
	var oItm = oEv.getSource();
	var oList = oItm.getParent().getParent().getParent();
	// var Uid =  oEv.getSource().getParent().getParent().getTitle();
	var Uid = oEv.getSource().getBindingContext("main").getObject().empId;
	var oItmSelected = oEv.getSource().getBindingContext("main").getObject();	
	// var IDU = Uid.substr(17,3);
	var that = this;
   
	for(let i=0; i<oStatus.length; i++){
		if(oStatus[i] === oItmSelected){
		 that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/" + i+"/oldAsst/status","Rejected");
		 that.getOwnerComponent().getModel("main").setProperty("/OldAssestReq/" + i+"/status","Rejected");
		 var req = that.getOwnerComponent().getModel("main").getProperty("/OldAssestReq/"+i);
		//  this.empReq.push(req);
		//  that.getOwnerComponent().getModel("main").setProperty("/EmpFrag2",this.empReq);

		oEmpDetails.forEach((oEmp)=>{
			if(oEmp.empid === Uid){
				if(!oEmp.notify){
					oEmp.notify=[];
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}
				else{
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}				
			}

	  });
	  this.getOwnerComponent().getModel("main").setProperty("/EmployeeDetails",oEmpDetails);
	  var rt =  that.getOwnerComponent().getModel("main").getProperty("/hrNotfCount");
	  var yu = rt.contHr -1;
	  if(yu>0){
	  that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",yu);
	  }
	  else{
		  that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",null);	
	  }
	  

		 oStatus.splice(i,1);
		 this.getView().getModel("main").refresh();
		}
	}
 
},
 

 onLog:function(){

	this.getOwnerComponent().getModel("flexibleLayout").setProperty("/layout","OneColumn");
	this.oRouter.navTo("RouteMain");
},

onAcceptNew:function(oEv){
	debugger;
	var oStatus = this.getOwnerComponent().getModel("main").getProperty("/NewReqAsst");
	var oEmpDetails = this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails");
	var oItmSelectsd =  oEv.getSource().getBindingContext("main").getObject();	
	var Uid =  oItmSelectsd.empID;
	var that = this;
   
	for(let i=0; i<oStatus.length; i++){
		if(oStatus[i] === oItmSelectsd){
			
		 that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/" + i+"/requests/status","Approved");
		 that.getOwnerComponent().getModel("main").setProperty("/NewReqAsst/" + i+"/status","Approved");
		 var req = that.getOwnerComponent().getModel("main").getProperty("/NewReqAsst/"+i);
		//  this.empReq.push(req);
		//  that.getOwnerComponent().getModel("main").setProperty("/EmpFrag",this.empReq);

		 oEmpDetails.forEach((oEmp)=>{
			if(oEmp.empid === Uid){
				if(!oEmp.notify){
					oEmp.notify=[];
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}
				else{
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}				
			}

	  });
	  this.getOwnerComponent().getModel("main").setProperty("/EmployeeDetails",oEmpDetails);



		 //For Notification Count
		//  var nCount = that.getOwnerComponent().getModel("main").getProperty("/EmpFrag"+i);
		// 	 that.count.push(nCount);
		// 	 var empRequestLength = that.count.length;
		// 	 var sRes = {
		// 		 contHr: empRequestLength++
		// 	 };
			// that.getOwnerComponent().getModel("main").setProperty("/EmpNotfCount", sRes);


			var rt =  that.getOwnerComponent().getModel("main").getProperty("/hrNotfCount");
			var yu = rt.contHr -1;
			if(yu>0){
			that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",yu);
			}
			else{
				that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",null);	
			}
			
				
			
			// 

		 oStatus.splice(i,1);
		// oEv.getSource().setEnabled(false);
		 that.getView().getModel("main").refresh();
		}
	}
 
},

onRejectNew:function(oEv){
	debugger;
	var oStatus = this.getOwnerComponent().getModel("main").getProperty("/NewReqAsst");
	var oEmpDetails = this.getOwnerComponent().getModel("main").getProperty("/EmployeeDetails"); 
	var oItmSelectsd =  oEv.getSource().getBindingContext("main").getObject();	
	var Uid =  oItmSelectsd.empID;
	var that = this;
   
	for(let i=0; i<oStatus.length; i++){
		if(oStatus[i] === oItmSelectsd){
		 that.getOwnerComponent().getModel("main").setProperty("/AssetsAlloted/" + i+"/requests/status","Rejected");
		 that.getOwnerComponent().getModel("main").setProperty("/NewReqAsst/" + i+"/status","Rejected");
		 var req = that.getOwnerComponent().getModel("main").getProperty("/NewReqAsst/"+i);
		//  this.empReq.push(req);
		//  that.getOwnerComponent().getModel("main").setProperty("/EmpFrag",this.empReq);
		 


		 //For Notification Count
		//  var nCount = that.getOwnerComponent().getModel("main").getProperty("/EmpFrag");
		// 	 that.count.push(nCount);
		// 	 var empRequestLength = that.count.length;
		// 	 var sRes = {
		// 		 contHr: empRequestLength++
		// 	 };
		// 	that.getOwnerComponent().getModel("main").setProperty("/EmpNotfCount", sRes);
		oEmpDetails.forEach((oEmp)=>{
			if(oEmp.empid === Uid){
				if(!oEmp.notify){
					oEmp.notify=[];
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}
				else{
					oEmp.notify.push(req);
					oEmp.notiCount = oEmp.notify.length;
				}				
			}

	  });
	  this.getOwnerComponent().getModel("main").setProperty("/EmployeeDetails",oEmpDetails);
	  
			var rt =  that.getOwnerComponent().getModel("main").getProperty("/hrNotfCount");
			var yu = rt.contHr -1;
			that.getOwnerComponent().getModel("main").setProperty("/hrNotfCount/contHr",yu);
			// 

		 oStatus.splice(i,1);
		 this.getView().getModel("main").refresh();
		}
	}
 
},
	 

		onItemClose:function(oEv){
			debugger;
			oEv.getSource().getParent().removeItem(oEv.getSource());
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
				}];
		},

		empTableExport:function(oEv){
			debugger;
			var aCols, aProducts, oSettings, oSheet;
			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel("main").getProperty('/AssetsAlloted');
		
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