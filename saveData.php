<?php

$stringData = $_POST["data"];
$json = json_decode($stringData,true);
$error = false;
$filename = $json['path'];
unset($json['path']);
$stringData =  json_encode($json);

foreach ($json as $key => $value) {
    if(empty($key) || !is_numeric($value) )
    {
      $error = true;

    }

}

if($error)
{
    echo json_encode(['code'=>400]);
}
else {
  $fh = fopen($filename, 'w') or die("can't open file");
  fwrite($fh, $stringData);
  fclose($fh);
  echo json_encode(['code'=>200]);
}



// if(!array_key_exists('',$json));
// {
//   fwrite($fh, $stringData);
//
//   echo json_encode(['code'=>200]);
// }
// else {
//   echo json_encode(['code'=>400]);
// }




 ?>
