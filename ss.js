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
	psk("total");$("#kabss").val("total");$("#anu").hide();
	$("#kabss").change(function(){
		var ab = $(this).val();
		psk(ab);
		if(ab==="Total"){ab="";$(".tsd").hide();}else{$(".tsd").hide().show();}
		$("#pos table").dataTable().fnFilter(ab);
		$("#odp table").dataTable().fnFilter(ab);
		$("#pdp table").dataTable().fnFilter(ab);
	});
	tt(kabl);
	// $("#pos table").DataTable({"paging": false,"dom": '<"top"fi>'});
});
// CANVAS JS START
var dps=[];var dpm=[];var dpp=[];
CanvasJS.addColorSet("gr",["#128","#38a","#F00"]);
var opt = {
	animationEnabled: false,
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
	toolTip:{shared:!0,contentFormatter: function (e) {
				var sum=e.entries[0].dataPoint.y+e.entries[1].dataPoint.y+e.entries[2].dataPoint.y;
				var content = CanvasJS.formatDate(e.entries[0].dataPoint.x,'DD-MM-YY H:mm') +"<br/>";
				for (var i = 0; i < e.entries.length; i++) {
					content +="<span style='color:"+e.entries[i].dataSeries.color+"'>";
					content += e.entries[i].dataSeries.name + ": " + "<strong>" + e.entries[i].dataPoint.y + "</strong>";
					content += " ("+Math.round((e.entries[i].dataPoint.y/sum)*10000)/100+"%)</span><br/>";
				}
				return content;
			}},legend:{cursor:"pointer",itemclick: toggleDataSeries,fontSize:14,verticalAlign: 'top'},
	data: [{
		type: "spline",
		name: "AMIN",
		showInLegend:!0,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PRAGIB",
		showInLegend:!0,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "GAMA",
		showInLegend:!0,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	}]
}
function psk(l){
	dps=[];dpm=[];dpp=[];
	$.each(kabl,function(a,b){
		dps.push({x: parseInt(a),y: b[l][0],label1: 'b'});
		dpm.push({x: parseInt(a),y: b[l][1],label1: b});
		dpp.push({x: parseInt(a),y: b[l][2],label1: 'a'});
	});
	opt.data[0].dataPoints = dps;
	opt.data[1].dataPoints = dpm;
	opt.data[2].dataPoints = dpp;
	(new CanvasJS.Chart("chart", opt)).render();
}
function tt(k){
	$("#pos table").DataTable().clear().destroy();
	$("#pos .isin").html("");
	var ls = Object.keys(k).pop();
	$.each(k[ls],function(a,b){
		var pa=Math.round((b[0]/(b[0]+b[1]+b[2]))*10000)/100;console.log(pa);
		var pp=Math.round((b[1]/(b[0]+b[1]+b[2]))*10000)/100;
		var pg=Math.round((b[2]/(b[0]+b[1]+b[2]))*10000)/100;
		$("#pos .isin").append("<tr><td>"+a+"</td><td><span data-order="+pa+" class='p'>"+pa+"%</span><br/>"+b[0]+"</td><td><span class='p'>"+pp+"%</span><br/>"+b[1]+"</td><td><span class='p'>"+pg+"%</span><br/>"+b[2]+"</td><td>"+(b[0]+b[1]+b[2])+"</td></tr>");
	});
	$("#pos table").DataTable({"paging": false,"dom": '<"top"fi>'});
}
function rr(){
	var ab = $('#kabss').val();
	const tn = Date.now();
	$.ajax({url:"https://sa.ya/squid/ppwp/ppwp.json",dataType:"json",success:function(res){
			var ls = Object.keys(res).pop();
			var amin=parseInt(res[ls][ab][0]);
			var pg=parseInt(res[ls][ab][1]);
			var gm=parseInt(res[ls][ab][2]);
			dps.push({x: tn,y: amin});
			dpm.push({x: tn,y: pg});
			dpp.push({x: tn,y: gm});
			opt.data[0].dataPoints = dps;
			opt.data[1].dataPoints = dpm;
			opt.data[2].dataPoints = dpp;
			(new CanvasJS.Chart("chart", opt)).render();
			tt(res);
		}
	});
}
setInterval(function () { rr() }, 900000);
