$(document).ready(function(){
function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}
var kabl=[];
$.ajax({url:"https://ppwp.networkreverse.com/ppwp.json",dataType:"json",success:function(res){
	kabl.push(res);
	$.each(res,function(a,b){
		var cd = "<option value='"+a+"'>"+a+"</option>";
		$("#kabss").append(cd);
	});
}}).done(function(){
	psk("Total");$("#kabss").val("Total");
	$("#kabss").change(function(){
		var ab = $(this).val();
		psk(ab);
		if(ab==="Total"){ab="";$(".tsd").hide();}else{$(".tsd").hide().show();}
		$("#pos table").dataTable().fnFilter(ab);
		$("#odp table").dataTable().fnFilter(ab);
		$("#pdp table").dataTable().fnFilter(ab);
	});
});
// CANVAS JS START
var dps = [];
CanvasJS.addColorSet("gr",["#00F","#0F4","#844","#f00","#f80","#ff0","#444","#484",]);
var opt = {
	animationEnabled: true,
	colorSet: "gr",
	axisX:{
		valueFormatString:"D-M-Y H:mm",
		labelFontSize:12,
		crosshair:{enabled:!0},
	},
	axisY: [{
			title: "Positif",
			labelFontSize:12,
			gridDashType:"longDashDotDot"
		},{
			title: "PDP",
			labelFontSize:12,
		}],
	axisY2: {
			title: "ODP",
			labelFontSize:12,
		},
	toolTip:{shared:!0},legend:{cursor:"pointer",itemclick: toggleDataSeries,fontSize:14,verticalAlign: 'top'},
	data: [{
		type: "stackedColumn",
		name: "Positif - Dirawat",
		fillOpacity:.5,
		showInLegend:!0,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "stackedColumn",
		name: "Positif - Sembuh",
		showInLegend:!0,
		fillOpacity:.5,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "stackedColumn",
		name: "Positif - Meninggal",
		showInLegend:!0,
		fillOpacity:.5,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PDP - Dirawat",
		axisYIndex: 1,
		showInLegend:!0,
		lineThickness:4,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PDP - Sehat",
		axisYIndex: 1,
		showInLegend:!0,
		lineThickness:4,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PDP - Meninggal",
		axisYIndex: 1,
		showInLegend:!0,
		lineThickness:4,
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "line",
		name: "ODP - Proses",
		showInLegend:!0,
		lineThickness:4,
		axisYType: "secondary",
		xValueType:"dateTime",
		dataPoints: []
	},
	{
		type: "line",
		name: "ODP - Selesai",
		showInLegend:!0,
		lineThickness:4,
		axisYType: "secondary",
		xValueType:"dateTime",
		dataPoints: []
	}]
}
function psk(l){
	var dpso=[];var dppo=[];var dpsp=[];var dpdp=[];var dpmp=[];var dps=[];var dpm=[];var dpp=[];
	$.each(kabl[0][l],function(a,b){
		dpso.push({x: cdt(a),y: b.sodp});
		dppo.push({x: cdt(a),y: b.podp});
		dpsp.push({x: cdt(a),y: b.spdp});
		dpdp.push({x: cdt(a),y: b.dpdp});
		dpmp.push({x: cdt(a),y: b.mpdp});
		dps.push({x: cdt(a),y: b.spos});
		dpm.push({x: cdt(a),y: b.mpos});
		dpp.push({x: cdt(a),y: b.ppos});
	});
	opt.data[7].dataPoints = dpso;
	opt.data[6].dataPoints = dppo;
	opt.data[4].dataPoints = dpsp;
	opt.data[3].dataPoints = dpdp;
	opt.data[5].dataPoints = dpmp;
	opt.data[1].dataPoints = dps;
	opt.data[2].dataPoints = dpm;
	opt.data[0].dataPoints = dpp;
	(new CanvasJS.Chart("chart", opt)).render();
}

// CANVAS JS STOP
var rul = ["odp","pdp","pos"];$("#anu").hide();
$.each(rul, function(x,s){
	$.ajax({url:"https://cdn.software-mirrors.com/covid/"+s+".json",jsonpCallback: s, dataType:"jsonp",success:function(res){
	var oa = res.filter(value => value.status === rm(s)).length;
	var ob = res.filter(value => value.status === rm(s+"1")).length;
	var oc = res.filter(value => value.status === rm(s+"2")).length;
	var sf = (s=="odp")?"(Proses Pengawasan: "+ob+" | Selesai Pengawasan: "+oa+")":(s=="pdp")?"(Follow up: "+ob+" | Non Covid-19: "+oa+" | Meninggal: "+oc+")":"(Dirawat: "+oa+" | Sembuh: "+oc+" | Meninggal: "+ob+")";
	$("#"+s+" h2").append(Object.keys(res).length+"<br/><span class='ds'>"+sf+"</span>").click(function(){$("#"+s+" .tsd").toggle(200)});
	$.each(res, function(a,b){
		 $("#"+s+" .isin").append("<tr><td>"+rs(b.status)+"</td><td>"+b.kab+"</td><td>"+alm(b.alamat)+""+b.kec+"</td><td>"+sex(b.sex)+"</td><td>"+b.umur+"</td><td>"+b.tgg+"</td></tr>");
		 });
	}}).done(function(){
		$("#"+s+" table").DataTable({"paging": false,"dom": '<"top"fi>'});
	});
});
});
