<?php
  //check if the folder to be deleted exists
  $year = $_GET['year'];



    $files = glob('data/'.$year.'/*.*');
    if(count($files) > 0)
    {
      array_map(unlink,glob('data/'.$year.'/*.*'));
      rmdir('data/'.$year);
    }




 ?>
