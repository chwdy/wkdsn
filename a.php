
<?php
    $des=$_POST['des'];
    $vals=$_POST['val'];
    $userid = $_POST['id'];
    
    //设置时区
    $des_slice = explode(",",$des);
    $val_slice = explode(",",$vals);

    //设置文件输出内容和格式
    $out_put_string= "";
    
    for($i = 0;$i < min(sizeof($des_slice),sizeof($val_slice)); $i++){
        $out_put_string = $out_put_string.$des_slice[$i].",".$val_slice[$i]."\n";
    }
    
    echo($out_put_string);
    //打开文件,（追加模式+二进制模式）
    $fp=fopen("./result/$userid.csv",'a+');
    echo($fp);
    flock($fp,LOCK_EX);
    if(!$fp){
        exit;
    }
    //将数据写入到文件
    fwrite($fp,$out_put_string,strlen($out_put_string));
    flock($fp,LOCK_UN);
    //关闭文件流
    fclose($fp);
    echo "<p>数据保存完成</p>";
 
?>
