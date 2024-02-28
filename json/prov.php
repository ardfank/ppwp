<?php
$path=realpath(__DIR__);
$prov='{"11":"ACEH","51":"BALI","36":"BANTEN","17":"BENGKULU","34":"DAERAH ISTIMEWA YOGYAKARTA","31":"DKI JAKARTA","75":"GORONTALO","15":"JAMBI","32":"JAWA BARAT","33":"JAWA TENGAH","35":"JAWA TIMUR","61":"KALIMANTAN BARAT","63":"KALIMANTAN SELATAN","62":"KALIMANTAN TENGAH","64":"KALIMANTAN TIMUR","65":"KALIMANTAN UTARA","19":"KEPULAUAN BANGKA BELITUNG","21":"KEPULAUAN RIAU","18":"LAMPUNG","99":"Luar Negeri","81":"MALUKU","82":"MALUKU UTARA","52":"NUSA TENGGARA BARAT","53":"NUSA TENGGARA TIMUR","91":"P A P U A","92":"PAPUA BARAT","96":"PAPUA BARAT DAYA","95":"PAPUA PEGUNUNGAN","93":"PAPUA SELATAN","94":"PAPUA TENGAH","14":"RIAU","76":"SULAWESI BARAT","73":"SULAWESI SELATAN","72":"SULAWESI TENGAH","74":"SULAWESI TENGGARA","71":"SULAWESI UTARA","13":"SUMATERA BARAT","16":"SUMATERA SELATAN","12":"SUMATERA UTARA"}';
$prov=json_decode($prov,TRUE);
$cpp=0;
function ppwp(){
    global $path,$prov,$cpp;
	$tm = time()*1000;
    echo "\n====".date('r')." ppwp ";
	$pp=file_get_contents("https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json");
	$pp=json_decode($pp,TRUE);
	$file=file_get_contents($path."/ppwp.json");
	$ppwp=json_decode($file,true);
	$tol=$pp['chart'][100025]+$pp['chart'][100026]+$pp['chart'][100027];
	$tlo=end($ppwp)['total'][0]+end($ppwp)['total'][1]+end($ppwp)['total'][2];
	if($tol!==$tlo || $pp['chart'][100025]!==end($ppwp)['total'][0] || $pp['chart'][100026] !== end($ppwp)['total'][1] || $pp['chart'][100027] !== end($ppwp)['total'][2]){
        echo "✅";$cpp=1;
        $ppwp[$tm]['total']=array($pp['chart'][100025],$pp['chart'][100026],$pp['chart'][100027],$pp['chart']['persen']);
        foreach($pp['table'] as $a => $b){
                $ppwp[$tm][$prov[$a]]=array($b[100025],$b[100026],$b[100027],$b['persen']);
        }
        if(isset($pp['table']) && isset($pp['chart'])){
                file_put_contents($path."/ppwp.json", json_encode($ppwp,TRUE));
        }
	}
}
for($i=0;$i<1;$i++){
    echo "== Kawal Pemilu START ==\n";
    $tm = time()*1000;
    echo "\n====".date('r')." KP ppwp ";
    $pp=file_get_contents("https://kp24-fd486.et.r.appspot.com/h?id=");
    $pp=json_decode($pp,TRUE);
    $file=file_get_contents($path."/kp/ppwp.json");
    $ppwp=json_decode($file,true);
    $ppwp[$tm]['total']=array(end($ppwp)['total'][0],end($ppwp)['total'][1],end($ppwp)['total'][2],end($ppwp)['total'][3]);
    $tlo=end($ppwp)['total'][0]+end($ppwp)['total'][1]+end($ppwp)['total'][2];
    $pp1=0;$pp2=0;$pp3=0;$ppt=0;$ppt=0;$ppc=0;
    foreach($pp['result']['aggregated'] as $a => $b){
        $per=number_format((float)($b[0]['totalCompletedTps']/$b[0]['totalTps']*100),2,'.','');
        $ppwp[$tm][$prov[$a]]=array($b[0]['pas1'],$b[0]['pas2'],$b[0]['pas3'],$per);
        $pp1+=$b[0]['pas1'];$pp2+=$b[0]['pas2'];$pp3+=$b[0]['pas3'];
        $ppt+=$b[0]['totalTps'];$ppc+=$b[0]['totalCompletedTps'];
    }
    $per=number_format((float)($ppc/$ppt*100),2,'.','');
    $tol=$pp1+$pp2+$pp3;
    if($tol!==$tlo || $pp1!==end($ppwp)['total'][0] || $pp2 !== end($ppwp)['total'][1] || $pp3 !== end($ppwp)['total'][2]){
        echo "✅";
        $ppwp[$tm]['total']=array($pp1,$pp2,$pp3,$per);
        if(isset($pp['result']['aggregated'])){
                file_put_contents($path."/kp/ppwp.json", json_encode($ppwp,TRUE));
        }
    }
    foreach($prov as $c => $d){
        $tm = time()*1000;
        echo "\n====".date('r')." $d ";
        $pp=file_get_contents("https://kp24-fd486.et.r.appspot.com/h?id=$c");
        $pp=json_decode($pp,TRUE);
        $file=file_get_contents($path."/kp/$d.json");
        // $ppwp=[];
        $ppwp=json_decode($file,true);
        $ppwp[$tm]['total']=array(end($ppwp)['total'][0],end($ppwp)['total'][1],end($ppwp)['total'][2],end($ppwp)['total'][3]);
        $tlo=end($ppwp)['total'][0]+end($ppwp)['total'][1]+end($ppwp)['total'][2];
        $pp1=0;$pp2=0;$pp3=0;$ppt=0;$ppt=0;$ppc=0;
        foreach($pp['result']['aggregated'] as $a => $b){
            $per=number_format((float)($b[0]['totalCompletedTps']/$b[0]['totalTps']*100),2,'.','');
            $ppwp[$tm][$b[0]['name']]=array($b[0]['pas1'],$b[0]['pas2'],$b[0]['pas3'],$per);
            $pp1+=$b[0]['pas1'];$pp2+=$b[0]['pas2'];$pp3+=$b[0]['pas3'];
            $ppt+=$b[0]['totalTps'];$ppc+=$b[0]['totalCompletedTps'];
        }
        $per=number_format((float)($ppc/$ppt*100),2,'.','');
        $tol=$pp1+$pp2+$pp3;
        if($tol!==$tlo || $pp1!==end($ppwp)['total'][0] || $pp2 !== end($ppwp)['total'][1] || $pp3 !== end($ppwp)['total'][2]){
            echo "✅";
            $ppwp[$tm]['total']=array($pp1,$pp2,$pp3,$per);
            if(isset($pp['result']['aggregated'])){
                    file_put_contents($path."/kp/$d.json", json_encode($ppwp,TRUE));
            }
        }
    }
    echo "\n\n== Kawal Pemilu END ==\n\n== KPU START ==\n";
    ppwp();
    foreach($prov as $c => $d){
        echo "\n====".date('r')." $d ";
        $tm = time()*1000;
        $pp=file_get_contents("https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp/$c.json");
        $pp1=file_get_contents("https://sirekap-obj-data.kpu.go.id/wilayah/pemilu/ppwp/$c.json");
        $pp=json_decode($pp,TRUE);
        $pp1=json_decode($pp1,TRUE);
        foreach($pp1 as $e){
            $pro[$e['kode']]=$e['nama'];
        }
        $file=file_get_contents("$path/$d.json");
        $ppwp=json_decode($file,true);
        $tol=$pp['chart'][100025]+$pp['chart'][100026]+$pp['chart'][100027];
        $tlo=end($ppwp)['total'][0]+end($ppwp)['total'][1]+end($ppwp)['total'][2];
        if($tol!==$tlo || $pp['chart'][100025]!==end($ppwp)['total'][0] || $pp['chart'][100026] !== end($ppwp)['total'][1] || $pp['chart'][100027] !== end($ppwp)['total'][2]){
            echo "✅";
            $ppwp[$tm]['total']=array($pp['chart'][100025],$pp['chart'][100026],$pp['chart'][100027],$pp['chart']['persen']);
            foreach($pp['table'] as $a => $b){
                    $ppwp[$tm][$pro[$a]]=array((isset($b[100025]))?$b[100025]:0,(isset($b[100026]))?$b[100026]:0,(isset($b[100027]))?$b[100027]:0,$b['persen']);
            }
            if(isset($pp['table']) && isset($pp['chart'])){
                    file_put_contents("$path/$d.json", json_encode($ppwp,TRUE));
            }
            if($cpp==0){ppwp();}
        }
    }
	echo "\n== KPU END ==\n\n";
}
?>
