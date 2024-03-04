prov=JSON.parse('{"1":"total","11":"ACEH","51":"BALI","36":"BANTEN","17":"BENGKULU","34":"DAERAH ISTIMEWA YOGYAKARTA","31":"DKI JAKARTA","75":"GORONTALO","15":"JAMBI","32":"JAWA BARAT","33":"JAWA TENGAH","35":"JAWA TIMUR","61":"KALIMANTAN BARAT","63":"KALIMANTAN SELATAN","62":"KALIMANTAN TENGAH","64":"KALIMANTAN TIMUR","65":"KALIMANTAN UTARA","19":"KEPULAUAN BANGKA BELITUNG","21":"KEPULAUAN RIAU","18":"LAMPUNG","99":"Luar Negeri","81":"MALUKU","82":"MALUKU UTARA","52":"NUSA TENGGARA BARAT","53":"NUSA TENGGARA TIMUR","91":"P A P U A","92":"PAPUA BARAT","96":"PAPUA BARAT DAYA","95":"PAPUA PEGUNUNGAN","93":"PAPUA SELATAN","94":"PAPUA TENGAH","14":"RIAU","76":"SULAWESI BARAT","73":"SULAWESI SELATAN","72":"SULAWESI TENGAH","74":"SULAWESI TENGGARA","71":"SULAWESI UTARA","13":"SUMATERA BARAT","16":"SUMATERA SELATAN","12":"SUMATERA UTARA"}');
var q=new URLSearchParams(window.location.search).get("q");
var p=new URLSearchParams(window.location.search).get("p");
var cq=(q!=null && q!=undefined && q!="")?q:'ppwp';
var cp=(p!=null && p!=undefined && p!="" && p!=0)?"kp/"+cq:cq;
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
$.each(prov,function(a,b){
	bb=(b=='total')?'Pilih Provinsi':b;
	var cd = "<option value='"+b+"'>"+bb+"</option>";
	$("#kab").append(cd);
});
var tn = Date.now();
$.ajax({url:"https://ppwp.networkreverse.com/json/"+cp+".json?"+tn,dataType:"json",success:function(res){
	kabl=res;
	$.each(kabl[Object.keys(res)[0]],function(a,b){
		aa=(cq=='Luar Negeri' && a=='total')?'Pilih Negara':((cq=='ppwp' && a=='total')?'TOTAL':((a=='total')?'Pilih Kabupaten':a));
		var cd = "<option value='"+a+"'>"+aa+"</option>";
		if(cq=='ppwp'){
			$("#kab").val('total');
		}else{
			$("#kab").val(cq);
		}
		$("#kabss").append(cd);
	});
},error:function(){
	window.location.href="./";
}}).done(function(){
	psk("total");$("#kabss").val("total");$("#anu").hide();
	$("#kab").change(function(){
		var ab = $(this).val();
		ab=(ab==="total")?"#":ab;
		p=(p!=null && p!=undefined && p!="" && p!=0)?"?p=1":"?p=0";
		window.location.href=p+"&q="+ab;
	});
	$("#kabss").change(function(){
		var ab = $(this).val();
		psk(ab);
		ab=(ab==="total")?"":ab;
		$("#pos table").dataTable().fnFilter(ab);
		tt(kabl);
	});
	tt(kabl);
	if(p!=1){
		var avc=gok(prov,cq);
		clearInterval(setr);
		cpk(avc);
		var setr=setInterval(function () { cpk(avc) }, 150000);
	}else{
		var avc=gok(prov,cq);
		clearInterval(setr);
		ckp(avc);
		var setr=setInterval(function () { ckp(avc) }, 150000);
	}
});
// CANVAS JS START
var dps=[];var dpm=[];var dpp=[];
CanvasJS.addColorSet("gr",["#128","#38a","#F00"]);
var opt = {
	backgroundColor: "rgba(255,244,233,.8)",
	animationEnabled: true,
	zoomEnabled: true,
	colorSet: "gr",
	axisX:{
		valueFormatString:"DD-MM-YY H:mm",
		labelFontSize:12,
		crosshair:{snapToDataPoint:true,enabled:!0},
	},
	axisY: {
		crosshair:{snapToDataPoint:true,enabled:!0},
		interlacedColor: "rgba(255,233,211,.5)",
		labelFontSize:12,
	},
	toolTip:{shared:!0,contentFormatter: function (e) {
				var sum=e.entries[0].dataPoint.y+e.entries[1].dataPoint.y+e.entries[2].dataPoint.y;
				var pr=e.entries[0].dataPoint.label1;
				var content = "<center>"+CanvasJS.formatDate(e.entries[0].dataPoint.x,'DD-MMM-YYYY HH:mm')+"</center><table>";
				for (var i = 0; i < e.entries.length; i++) {
					content +="<tr style='font-weight:bold;border:1px solid #333;color:"+e.entries[i].dataSeries.color+"'><td>";
					content += e.entries[i].dataSeries.name + "</td><td>" + e.entries[i].dataPoint.y.toLocaleString('id') + "</td><td>";
					content += "("+Math.round((e.entries[i].dataPoint.y/sum)*10000)/100+"%)</td></tr>";
				}
				content +="<tr style='font-weight:bold;border:1px solid #333;background:#fda'><td>PROGRESS</td><td>"+sum.toLocaleString('id')+"</td><td>("+pr+"%)</td></tr></table>";
				return content;
			}},legend:{cursor:"pointer",itemclick: toggleDataSeries,fontSize:14,verticalAlign: 'top'},
	data: [{
		type: "spline",
		name: "AMIN",
		lineThickness: 4,
		showInLegend:!0,
		click: oo,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "PRAGIB",
		lineThickness: 4,
		click: oo,
		showInLegend:!0,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	},
	{
		type: "spline",
		name: "GAMA",
		lineThickness: 4,
		click: oo,
		showInLegend:!0,
		xValueType:"dateTime",
        xValueFormatString: "DD/MMM/YYYY HH:mm:ss",
		dataPoints: []
	}]
}
function psk(l){
	dps=[];dpm=[];dpp=[];
	$.each(kabl,function(a,b){
		var pr=(b[l][3]!==undefined)?b[l][3]:0;
		dps.push({x: parseInt(a),y: b[l][0],label1: pr});
		dpm.push({x: parseInt(a),y: b[l][1],label1: pr});
		dpp.push({x: parseInt(a),y: b[l][2],label1: pr});
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
	var ab = $('#kabss').val();
	var ba = (cq=='ppwp')?'':$('#kab').val();
	$.each(k[ls],function(a,b){
		b0=b[0]??0;b1=b[1]??0;b2=b[2]??0;b3=b[3]??0;
		var pa=(b0!=0)?((b0/(b0+b1+b2))*100).toFixed(2):0;
		var pp=(b1!=0)?((b1/(b0+b1+b2))*100).toFixed(2):0;
		var pg=(b2!=0)?((b2/(b0+b1+b2))*100).toFixed(2):0;
		var pm=Math.max(pa,pg,pp);
		qa=(pa==pm)?" pq":"";
		qp=(pp==pm)?" pq":"";
		qg=(pg==pm)?" pq":"";
		if(a==='total'){
			$("#pos thead").html("<tr><th>"+ba.toUpperCase()+"<br/><span class='p'>TOTAL</span><br/>(<i>"+new Date(parseInt(ls)).toLocaleString('nl-NL')+"</i>)</th><th>AMIN<br/><span class='p"+qa+"'>"+pa+"%</span><br/>"+b0.toLocaleString('id')+"</th><th>PRAGIB<br/><span class='p"+qp+"'>"+pp+"%</span><br/>"+b1.toLocaleString('id')+"</th><th>GAMA<br/><span class='p"+qg+"'>"+pg+"%</span><br/>"+b2.toLocaleString('id')+"</th><th>PROGRESS<br/><span class='p'>"+b3+"%</span><br/>"+(b0+b1+b2).toLocaleString('id')+"</th></tr>");
		}else{
			$("#pos .isin").append("<tr><td><span style='cursor:pointer' onclick='ff(\""+a+"\")'>"+a+"</span></td><td data-sort='"+pa+"'><span class='p"+qa+"'>"+pa+"%</span><br/>"+b0.toLocaleString('id')+"</td><td data-sort='"+pp+"'><span class='p"+qp+"'>"+pp+"%</span><br/>"+b1.toLocaleString('id')+"</td><td data-sort='"+pg+"'><span class='p"+qg+"'>"+pg+"%</span><br/>"+b2.toLocaleString('id')+"</td><td data-sort='"+b3+"'><span class='p'>"+b3+"%</span><br/>"+(b0+b1+b2).toLocaleString('id')+"</td></tr>");
		}
	});
	$("#pos table").DataTable({"paging": false,"dom": '<"top">'});
	ab=(ab==="total")?"":ab;
	$("#pos table").dataTable().fnFilter(ab);
}
function gok(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}
function cc(l){
	opt.data[0].type = l;
	opt.data[1].type = l;
	opt.data[2].type = l;
	(new CanvasJS.Chart("chart", opt)).render();
}
function oo(e){
	$("#pos table").DataTable().clear().destroy();
	var ls=e.dataPoint.x;
	ls=(kabl[ls] !== undefined && kabl[ls] !== null )?ls:Object.keys(kabl).pop();
	$("#pos .isin").html("");
	var ab = $('#kabss').val();
	var ba = (cq=='ppwp')?'':$('#kab').val();
	$.each(kabl[ls],function(a,b){
		b0=b[0]??0;b1=b[1]??0;b2=b[2]??0;b3=b[3]??0;
		var pa=(b0!=0)?((b0/(b0+b1+b2))*100).toFixed(2):0;
		var pp=(b1!=0)?((b1/(b0+b1+b2))*100).toFixed(2):0;
		var pg=(b2!=0)?((b2/(b0+b1+b2))*100).toFixed(2):0;
		var pm=Math.max(pa,pg,pp);
		qa=(pa==pm)?" pq":"";
		qp=(pp==pm)?" pq":"";
		qg=(pg==pm)?" pq":"";
		if(a==='total'){
			$("#pos thead").html("<tr><th>"+ba.toUpperCase()+"<br/><span class='p'>TOTAL</span><br/>(<i>"+new Date(parseInt(ls)).toLocaleString('nl-NL')+"</i>)</th><th>AMIN<br/><span class='p"+qa+"'>"+pa+"%</span><br/>"+b0.toLocaleString('id')+"</th><th>PRAGIB<br/><span class='p"+qp+"'>"+pp+"%</span><br/>"+b1.toLocaleString('id')+"</th><th>GAMA<br/><span class='p"+qg+"'>"+pg+"%</span><br/>"+b2.toLocaleString('id')+"</th><th>PROGRESS<br/><span class='p'>"+b3+"%</span><br/>"+(b0+b1+b2).toLocaleString('id')+"</th></tr>");
		}else{
			$("#pos .isin").append("<tr><td><span style='cursor:pointer' onclick='ff(\""+a+"\")'>"+a+"</span></td><td data-sort='"+pa+"'><span class='p"+qa+"'>"+pa+"%</span><br/>"+b0.toLocaleString('id')+"</td><td data-sort='"+pp+"'><span class='p"+qp+"'>"+pp+"%</span><br/>"+b1.toLocaleString('id')+"</td><td data-sort='"+pg+"'><span class='p"+qg+"'>"+pg+"%</span><br/>"+b2.toLocaleString('id')+"</td><td data-sort='"+b3+"'><span class='p'>"+b3+"%</span><br/>"+(b0+b1+b2).toLocaleString('id')+"</td></tr>");
		}
	});
	ab=(ab==="total")?"":ab;
	$("#pos table").DataTable({"paging": false,"dom": '<"top">'});
	$("#pos table").dataTable().fnFilter(ab);
}
function ff(ab){
	event.preventDefault();
	var ac=$("#kabss").val();
	if(ab==ac){
		$("#kabss").val("total");
		$("#kabss").trigger('change');
		psk("total");
	}else{
		$("#kabss").val(ab);
		$("#kabss").trigger('change');
		psk(ab);
	}
}
function kp(a){
	window.location.href="?p="+a+"&q="+cq;
}
function gbv(value) {
  return Object.keys(prov).find(key => prov[key] === value);
}
function ckp(ab){
	ab=(ab==undefined)?"":ab;
	var tn = Date.now();
	var kj={};
	pp1=0;pp3=0;pp2=0;pc=0;pt=0;
	$.ajax({url:"https://kp24-fd486.et.r.appspot.com/h?id="+ab+"&time="+tn,dataType:"json",success:function(res){
		$.each(res.result.aggregated,function(a,b){
			var kg=b[0].name;var p1=b[0].pas1;var p2=b[0].pas2;var p3=b[0].pas3;
			per=(b[0].totalCompletedTps/b[0].totalTps)*100;
			kj[kg]=[p1,p2,p3,per.toFixed(2)];
			pp1+=p1;pp3+=p3;pp2+=p2;pc+=b[0].totalCompletedTps;pt+=b[0].totalTps;
		})
		per=(pc/pt)*100;
		kj.total=[pp1,pp2,pp3,per.toFixed(2)];
		var ls = Object.keys(kabl).pop();
		if(JSON.stringify(kj.total)!==JSON.stringify(kabl[ls].total)){
			kabl[tn]=kj;
			cap(kabl);tt(kabl);
		}
	}});
}
function cpk(ac){
	ab=(ac==undefined)?"ppwp":"ppwp/"+ac;
	ad=(ab=="ppwp")?0:ac;
	var tn = Date.now();
	var kj={};var wj={};
	$.ajax({url:"https://sirekap-obj-data.kpu.go.id/wilayah/pemilu/ppwp/"+ad+".json?time="+tn,dataType:"json",success:function(res){
		$.each(res,function(a,b){
			wj[b.kode]=b.nama;
		});
	}}).done(function(){
		pp1=0;pp3=0;pp2=0;pc=0;pt=0;
		$.ajax({url:"https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/"+ab+".json?time="+tn,dataType:"json",success:function(res){
			$.each(res.table,function(a,b){
				var kg=wj[a];var p1=b[100025];var p2=b[100026];var p3=b[100027];var per=b['persen'];
				kj[kg]=[p1,p2,p3,per];
				// pp1+=p1;pp3+=p3;pp2+=p2;pc+=b[0].totalCompletedTps;pt+=b[0].totalTps;
			})
			kj.total=[res.chart[100025],res.chart[100026],res.chart[100027],res.chart['persen']];
			var ls = Object.keys(kabl).pop();
			if(JSON.stringify(kj.total)!==JSON.stringify(kabl[ls].total)){
				kabl[tn]=kj;
				cap(kabl);tt(kabl);
			}
			// console.log(kj);
		}});
	});
}
function cap(kabl){
	var abc = $('#kabss').val();
	var ls = Object.keys(kabl).pop();
	var amin=parseInt(kabl[ls][abc][0]);
	var pg=parseInt(kabl[ls][abc][1]);
	var gm=parseInt(kabl[ls][abc][2]);
	var pr=kabl[ls][abc][3];
	dps.push({x: tn,y: amin,label1: pr});
	dpm.push({x: tn,y: pg,label1: pr});
	dpp.push({x: tn,y: gm,label1: pr});
	opt.data[0].dataPoints = dps;
	opt.data[1].dataPoints = dpm;
	opt.data[2].dataPoints = dpp;
	(new CanvasJS.Chart("chart", opt)).render();
}
