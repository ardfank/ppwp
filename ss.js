$(document).ready(function(){
prov=JSON.parse('{"1":"total","11":"ACEH","51":"BALI","36":"BANTEN","17":"BENGKULU","34":"DAERAH ISTIMEWA YOGYAKARTA","31":"DKI JAKARTA","75":"GORONTALO","15":"JAMBI","32":"JAWA BARAT","33":"JAWA TENGAH","35":"JAWA TIMUR","61":"KALIMANTAN BARAT","63":"KALIMANTAN SELATAN","62":"KALIMANTAN TENGAH","64":"KALIMANTAN TIMUR","65":"KALIMANTAN UTARA","19":"KEPULAUAN BANGKA BELITUNG","21":"KEPULAUAN RIAU","18":"LAMPUNG","99":"Luar Negeri","81":"MALUKU","82":"MALUKU UTARA","52":"NUSA TENGGARA BARAT","53":"NUSA TENGGARA TIMUR","91":"P A P U A","92":"PAPUA BARAT","96":"PAPUA BARAT DAYA","95":"PAPUA PEGUNUNGAN","93":"PAPUA SELATAN","94":"PAPUA TENGAH","14":"RIAU","76":"SULAWESI BARAT","73":"SULAWESI SELATAN","72":"SULAWESI TENGAH","74":"SULAWESI TENGGARA","71":"SULAWESI UTARA","13":"SUMATERA BARAT","16":"SUMATERA SELATAN","12":"SUMATERA UTARA"}');
function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}
var kabl;
$.ajax({url:"https://ppwp.networkreverse.com/ppwp.json",dataType:"json",success:function(res){
	kabl=res;
	$.each(prov,function(a,b){
		var cd = "<option value='"+b+"'>"+b+"</option>";
		$("#kabss").append(cd);
	});
}}).done(function(){
	psk("total");$("#kabss").val("total");
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
CanvasJS.addColorSet("gr",["#00F","#8bF","#F00"]);
var opt = {
    theme: 'light1',
	animationEnabled: true,
	colorSet: "gr",
	axisX:{
		valueFormatString:"DD-MM-YY H:mm",
		labelFontSize:12,
		crosshair:{enabled:!0},
	},
	axisY: {
			title: "SUARA",
			labelFontSize:12,
		},
	toolTip:{shared:!0},legend:{cursor:"pointer",itemclick: toggleDataSeries,fontSize:14,verticalAlign: 'top'},
	data: [{
		type: "spline",
		name: "AMIN",
		fillOpacity:.5,
		showInLegend:!0,
        lineThickness: 5,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PRAGIB",
		showInLegend:!0,
        lineThickness: 5,
		fillOpacity:.5,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "GAMA",
		showInLegend:!0,
        lineThickness: 5,
		fillOpacity:.5,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	}]
}
function psk(l){
	var dps=[];var dpm=[];var dpp=[];
	$.each(kabl,function(a,b){
		dps.push({x: parseInt(a),y: b[l][0]});
		dpm.push({x: parseInt(a),y: b[l][1]});
		dpp.push({x: parseInt(a),y: b[l][2]});
	});
	opt.data[0].dataPoints = dps;
	opt.data[1].dataPoints = dpm;
	opt.data[2].dataPoints = dpp;
	(new CanvasJS.Chart("chart", opt)).render();
}

// CANVAS JS STOP
// var rul = ["odp","pdp","pos"];$("#anu").hide();
// $.each(rul, function(x,s){
// 	$.ajax({url:"https://cdn.software-mirrors.com/covid/"+s+".json",jsonpCallback: s, dataType:"jsonp",success:function(res){
// 	var oa = res.filter(value => value.status === rm(s)).length;
// 	var ob = res.filter(value => value.status === rm(s+"1")).length;
// 	var oc = res.filter(value => value.status === rm(s+"2")).length;
// 	var sf = (s=="odp")?"(Proses Pengawasan: "+ob+" | Selesai Pengawasan: "+oa+")":(s=="pdp")?"(Follow up: "+ob+" | Non Covid-19: "+oa+" | Meninggal: "+oc+")":"(Dirawat: "+oa+" | Sembuh: "+oc+" | Meninggal: "+ob+")";
// 	$("#"+s+" h2").append(Object.keys(res).length+"<br/><span class='ds'>"+sf+"</span>").click(function(){$("#"+s+" .tsd").toggle(200)});
// 	$.each(res, function(a,b){
// 		 $("#"+s+" .isin").append("<tr><td>"+rs(b.status)+"</td><td>"+b.kab+"</td><td>"+alm(b.alamat)+""+b.kec+"</td><td>"+sex(b.sex)+"</td><td>"+b.umur+"</td><td>"+b.tgg+"</td></tr>");
// 		 });
// 	}}).done(function(){
// 		$("#"+s+" table").DataTable({"paging": false,"dom": '<"top"fi>'});
// 	});
// });
});
