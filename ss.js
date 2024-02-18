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
		ab=(ab==="total")?"":ab;
		$("#pos table").dataTable().fnFilter(ab);
	});
	tt(kabl);
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
		crosshair:{enabled:!0},
		labelFontSize:12,
	},
	toolTip:{shared:!0,contentFormatter: function (e) {
				var sum=e.entries[0].dataPoint.y+e.entries[1].dataPoint.y+e.entries[2].dataPoint.y;
				var content = CanvasJS.formatDate(e.entries[0].dataPoint.x,'DD-MMM-YYYY HH:mm') +"<table>";
				for (var i = 0; i < e.entries.length; i++) {
					content +="<tr style='border:1px dashed #333;color:"+e.entries[i].dataSeries.color+"'><td>";
					content += e.entries[i].dataSeries.name + "</td><td><strong>" + e.entries[i].dataPoint.y.toLocaleString() + "</strong></td><td>";
					content += "("+Math.round((e.entries[i].dataPoint.y/sum)*10000)/100+"%)</td></tr>";
				}
				content +="</table>";
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
		b0=b[0]??0;b1=b[1]??0;b2=b[2]??0;
		var pa=(b0!=0)?((b0/(b0+b1+b2))*100).toFixed(2):0;
		var pp=(b1!=0)?((b1/(b0+b1+b2))*100).toFixed(2):0;
		var pg=(b2!=0)?((b2/(b0+b1+b2))*100).toFixed(2):0;
		if(a==='total'){
			$("#pos thead").html("<tr><th>PROVINSI<br/><br/>"+a+"</th><th>AMIN<br/><span class='p'>"+pa+"%</span><br/>"+b0.toLocaleString()+"</th><th>PRAGIB<br/><span class='p'>"+pp+"%</span><br/>"+b1.toLocaleString()+"</th><th>GAMA<br/><span class='p'>"+pg+"%</span><br/>"+b2.toLocaleString()+"</th><th>TOTAL<br/><br/>"+(b0+b1+b2).toLocaleString()+"</th></tr>");
		}else{
			$("#pos .isin").append("<tr><td>"+a+"</td><td><span class='p'>"+pa+"%</span><br/>"+b0.toLocaleString()+"</td><td><span class='p'>"+pp+"%</span><br/>"+b1.toLocaleString()+"</td><td><span class='p'>"+pg+"%</span><br/>"+b2.toLocaleString()+"</td><td>"+(b0+b1+b2).toLocaleString()+"</td></tr>");
		}
	});
	$("#pos table").DataTable({"paging": false,"dom": '<"top">'});
	var ab = $('#kabss').val();
	ab=(ab==="total")?"":ab;
	$("#pos table").dataTable().fnFilter(ab);
}
function rr(){
	var ab = $('#kabss').val();
	const tn = Date.now();
	$.ajax({url:"https://ppwp.networkreverse.com/ppwp.json",dataType:"json",success:function(res){
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
function cc(l){
	opt.data[0].type = l;
	opt.data[1].type = l;
	opt.data[2].type = l;
	(new CanvasJS.Chart("chart", opt)).render();
}
