prov=JSON.parse('{"1101":"ACEH I","1102":"ACEH II","5101":"BALI","3601":"BANTEN I","3602":"BANTEN II","3603":"BANTEN III","1701":"BENGKULU","3401":"DAERAH ISTIMEWA YOGYAKARTA","3101":"DKI JAKARTA I","3102":"DKI JAKARTA II","3103":"DKI JAKARTA III","7501":"GORONTALO","1501":"JAMBI","3201":"JAWA BARAT I","3202":"JAWA BARAT II","3203":"JAWA BARAT III","3204":"JAWA BARAT IV","3209":"JAWA BARAT IX","3205":"JAWA BARAT V","3206":"JAWA BARAT VI","3207":"JAWA BARAT VII","3208":"JAWA BARAT VIII","3210":"JAWA BARAT X","3211":"JAWA BARAT XI","3301":"JAWA TENGAH I","3302":"JAWA TENGAH II","3303":"JAWA TENGAH III","3304":"JAWA TENGAH IV","3309":"JAWA TENGAH IX","3305":"JAWA TENGAH V","3306":"JAWA TENGAH VI","3307":"JAWA TENGAH VII","3308":"JAWA TENGAH VIII","3310":"JAWA TENGAH X","3501":"JAWA TIMUR I","3502":"JAWA TIMUR II","3503":"JAWA TIMUR III","3504":"JAWA TIMUR IV","3509":"JAWA TIMUR IX","3505":"JAWA TIMUR V","3506":"JAWA TIMUR VI","3507":"JAWA TIMUR VII","3508":"JAWA TIMUR VIII","3510":"JAWA TIMUR X","3511":"JAWA TIMUR XI","6101":"KALIMANTAN BARAT I","6102":"KALIMANTAN BARAT II","6301":"KALIMANTAN SELATAN I","6302":"KALIMANTAN SELATAN II","6201":"KALIMANTAN TENGAH","6401":"KALIMANTAN TIMUR","6501":"KALIMANTAN UTARA","1901":"KEPULAUAN BANGKA BELITUNG","2101":"KEPULAUAN RIAU","1801":"LAMPUNG I","1802":"LAMPUNG II","8101":"MALUKU","8201":"MALUKU UTARA","5201":"NUSA TENGGARA BARAT I","5202":"NUSA TENGGARA BARAT II","5301":"NUSA TENGGARA TIMUR I","5302":"NUSA TENGGARA TIMUR II","9101":"PAPUA","9201":"PAPUA BARAT","9601":"PAPUA BARAT DAYA","9501":"PAPUA PEGUNUNGAN","9301":"PAPUA SELATAN","9401":"PAPUA TENGAH","1401":"RIAU I","1402":"RIAU II","7601":"SULAWESI BARAT","7301":"SULAWESI SELATAN I","7302":"SULAWESI SELATAN II","7303":"SULAWESI SELATAN III","7201":"SULAWESI TENGAH","7401":"SULAWESI TENGGARA","7101":"SULAWESI UTARA","1301":"SUMATERA BARAT I","1302":"SUMATERA BARAT II","1601":"SUMATERA SELATAN I","1602":"SUMATERA SELATAN II","1201":"SUMATERA UTARA I","1202":"SUMATERA UTARA II","1203":"SUMATERA UTARA III"}');
prt=JSON.parse('{"1":"PKB","2":"GERINDRA","3":"PDIP","4":"GOLKAR","5":"NASDEM","6":"BURUH","7":"GELORA","8":"PKS","9":"PKN","10":"HANURA","11":"GARUDA","12":"PAN","13":"PBB","14":"DEMOKRAT","15":"PSI","16":"PERINDO","17":"PPP","24":"Partai Ummat"}');
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
// $.each(prov,function(a,b){
// 	bb=(b=='total')?'Pilih Provinsi':b;
// 	var cd = "<option value='"+b+"'>"+bb+"</option>";
// 	$("#kabss").append(cd);
// });
var tn = Date.now();
$.ajax({url:"https://ppwp.networkreverse.com/json/partai.json?"+tn,dataType:"json",success:function(res){
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
	// $("#kab").change(function(){
	// 	var ab = $(this).val();
	// 	ab=(ab==="total")?"#":ab;
	// 	p=(p!=null && p!=undefined && p!="" && p!=0)?"?p=1":"?p=0";
	// 	window.location.href=p+"&q="+ab;
	// });
	$("#kabss").change(function(){
		var ab = $(this).val();
		psk(ab);
		ab=(ab==="total")?"":ab;
		$("#pos table").dataTable().fnFilter(ab);
		tt(kabl);
	});
	tt(kabl);
	// if(p!=1){
	// 	var avc=gok(prov,cq);
	// 	clearInterval(setr);
	// 	cpk(avc);
	// 	var setr=setInterval(function () { cpk(avc) }, 75000);
	// }else{
	// 	var avc=gok(prov,cq);
	// 	clearInterval(setr);
	// 	ckp(avc);
	// 	var setr=setInterval(function () { ckp(avc) }, 75000);
	// }
});
// CANVAS JS START
var dps=[];var dpm=[];var dpp=[];
CanvasJS.addColorSet("gr",["#128","#38a","#F00"]);
var opt = {
	backgroundColor: "rgba(255,244,233,.8)",
	animationEnabled: true,
	zoomEnabled: true,
	// colorSet: "colorSet3",
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
				var ab = $("#kabss").val();
				var sum = (Object.values(kabl[e.entries[0].dataPoint.x][ab]).reduce((acc, o) => acc + o, 0)-kabl[e.entries[0].dataPoint.x][ab].persen);
				var pr=e.entries[0].dataPoint.label1;
				var content = "<center>"+CanvasJS.formatDate(e.entries[0].dataPoint.x,'DD-MMM-YYYY HH:mm')+"</center><table>";
				for (var i = 0; i < e.entries.length; i++) {
					content +="<tr style='font-weight:bold;border:1px solid #333;color:"+e.entries[i].dataSeries.color+"'><td>";
					content += e.entries[i].dataSeries.name + "</td><td>" + e.entries[i].dataPoint.y.toLocaleString('id') + "</td><td>";
					content += "("+Math.round((e.entries[i].dataPoint.y/sum)*10000)/100+"%)</td></tr>";
				}
				content +="<tr style='font-weight:bold;border:1px solid #333;background:#fda'><td>PROGRESS</td><td>"+sum.toLocaleString('id')+"</td><td>("+pr+"%)</td></tr></table>";
				return content;
			}},
	legend:{cursor:"pointer",itemclick: toggleDataSeries,fontSize:14,verticalAlign: 'top'},
	data: []
}
function psk(l){
	dpm=[];dpp=[];dpk=[];
	$.each(prt,function(a,b){
		dps=[];
		$.each(kabl,function(c,d){
			var pr=(d[l]['persen']!==undefined)?d[l]['persen']:0;
			dps.push({x: parseInt(c),y: d[l][a],label1: pr});
		});
		dpk.push({type:"spline",name:b,lineThickness:4,click:oo,showInLegend:!0,xValueType:"dateTime",
xValueFormatString:"DD/MMM/YYYYHH:mm:ss",dataPoints:dps});
	});
	opt.data=dpk;
	(new CanvasJS.Chart("chart", opt)).render();
}
function tt(k){
	$("#pos table").DataTable().clear().destroy();
	$("#pos .isin").html("");
	var ls = Object.keys(k).pop();
	var ab = $('#kabss').val();
	var ba = (cq=='ppwp')?'':$('#kab').val();
	$.each(k[ls],function(a,b){
		var bx = (Object.values(b).reduce((acc, o) => acc + o, 0)-b.persen);
		var pm=Math.max(...Object.values(b));
		if(a==='total'){
			var th;
			$.each(prt,function(c,d){
				var pa=(b[c]!=0)?((b[c]/bx)*100).toFixed(2):0;
				var qa=(b[c]==pm)?" pq":"";
				th+="<th>"+d+"<br/><span class='p"+qa+"'>"+pa+"%</span><br/>"+b[c].toLocaleString('id')+"</th>";
			});
			$("#pos thead").html("<tr><th>"+ba.toUpperCase()+"<br/><span class='p'>TOTAL</span><br/>(<i>"+new Date(parseInt(ls)).toLocaleString('nl-NL')+"</i>)</th>"+th+"</tr>");
		}else{
			var td;
			$.each(prt,function(c,d){
				var pa=(b[c]!=0)?((b[c]/bx)*100).toFixed(2):0;
				var qa=(b[c]==pm)?" pq":"";
				td+="<td data-sort='"+pa+"'><span class='p"+qa+"'>"+pa+"%</span><br/>"+b[c].toLocaleString('id')+"</td>";
			});
			$("#pos .isin").append("<tr><td><span style='cursor:pointer' onclick='ff(\""+a+"\")'>"+a+"</span></td>"+td+"</tr>");
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
		var bx = (Object.values(b).reduce((acc, o) => acc + o, 0)-b.persen);
		var pm=Math.max(...Object.values(b));
		if(a==='total'){
			var th;
			$.each(prt,function(c,d){
				var pa=(b[c]!=0)?((b[c]/bx)*100).toFixed(2):0;
				var qa=(b[c]==pm)?" pq":"";
				th+="<th>"+d+"<br/><span class='p"+qa+"'>"+pa+"%</span><br/>"+b[c].toLocaleString('id')+"</th>";
			});
			$("#pos thead").html("<tr><th>"+ba.toUpperCase()+"<br/><span class='p'>TOTAL</span><br/>(<i>"+new Date(parseInt(ls)).toLocaleString('nl-NL')+"</i>)</th>"+th+"</tr>");
		}else{
			var td;
			$.each(prt,function(c,d){
				var pa=(b[c]!=0)?((b[c]/bx)*100).toFixed(2):0;
				var qa=(b[c]==pm)?" pq":"";
				td+="<td data-sort='"+pa+"'><span class='p"+qa+"'>"+pa+"%</span><br/>"+b[c].toLocaleString('id')+"</td>";
			});
			$("#pos .isin").append("<tr><td><span style='cursor:pointer' onclick='ff(\""+a+"\")'>"+a+"</span></td>"+td+"</tr>");
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
	$.ajax({url:"https://sirekap-obj-data.kpu.go.id/wilayah/pemilu/pdpr/dapil_dpr.json?time="+tn,dataType:"json",success:function(res){
		$.each(res,function(a,b){
			wj[b.kode]=b.nama;
		});
	}}).done(function(){
		pp1=0;pp3=0;pp2=0;pc=0;pt=0;
		$.ajax({url:"https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/"+ab+".json?time="+tn,dataType:"json",success:function(res){
			$.each(res.table,function(a,b){
				var kg=wj[a];var p1=b[100025];var p2=b[100026];var p3=b[100027];var per=b['persen'];
				kj[kg]=[p1,p2,p3,per];
			})
			kj.total=[res.chart[100025],res.chart[100026],res.chart[100027],res.chart['persen']];
			var ls = Object.keys(kabl).pop();
			if(JSON.stringify(kj.total)!==JSON.stringify(kabl[ls].total)){
				kabl[tn]=kj;
				cap(kabl);tt(kabl);
			}
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
function rr(){
	if(p!=1){
		var avc=gok(prov,cq);
		cpk(avc);
	}else{
		var avc=gok(prov,cq);
		ckp(avc);
	}
}
