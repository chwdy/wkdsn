
<?php
    $des=$_POST['des'];
    $userid = $_POST['id'];
    $img = $_POST['pic'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $fileData = base64_decode($img);
    //saving
    if(!file_exists('./result/pic/')){//检查文件夹是否存在
        mkdir ("./result/pic/");    //没有就创建一个新文件夹
    }
    
    $fp=fopen("./result/pic/".$userid."_".$des.".png",'a+');
    echo($fp);
    flock($fp,LOCK_EX);
    if(!$fp){
        exit;
    }
    //将数据写入到文件
    fwrite($fp,$fileData,strlen($fileData));
    flock($fp,LOCK_UN);
    //关闭文件流
    fclose($fp);
    echo "<p>数据保存完成</p>";
    
?>
