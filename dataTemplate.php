<?php

$year = $_GET['year'];
$divId = "";
$months = array(
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
);

$dir_name =  'data' . '/' . $year . '/';
if(!is_dir($dir_name))
{
  if (!mkdir($dir_name,0705,true))
      die('failed to create directory :' . $dir_name);
  createFiles($dir_name,$months);

}


/************** createFiles() ******************/
function createFiles($dir_name, $months)
{
  $jsonData = getInitialData();
  foreach ($months as $month)
  {
    $fname =  $dir_name .  $month . '.json'; //data/2017/january
    $fh = fopen($fname,'w') or die("can't open file");
    fwrite($fh, $jsonData);
    fclose($fh);

  }
}




/************** getInitialData() ******************/
//get initial data to be displayed in the monthly tables
//consisting in category names and zero values.
function getInitialData()
{
    $file = 'initialData.csv';
    $csv = file_get_contents($file);
    $array = explode("\n", $csv);
    $assc_array =  [];

    foreach ($array as $item) {
        $data = explode(',',$item);
        if(strlen($data[0]) >0)
        {
            $assc_array[$data[0]]=$data[1];
          }
    }
    return(json_encode($assc_array));
}

/************** getTableData() ******************/
function getTableData($dir_name)
{
  //data is an associative array whose key is the name of the month and
  // value is the data for that month in json format.
  $data = [];
  $files = glob($dir_name . '*.json');
  if($files)
  {
      foreach($files as $file)
      {
          $filename = basename($file, '.json');
          $data[$filename] = file_get_contents($dir_name . $filename . '.json');
      }

  }

  return $data;

}



//------------------------- generate tabs
// foreach ($months as $value ) {
//   $tabs .= "<li class='tab'> <a href='#$value'>$value</a></li>";
// }

$data = getTableData($dir_name);

// generate divs
foreach ($months as $value)
{
    $listCategory = $data[$value];
    $category = json_decode($listCategory,true);
    $formInputs = "";
    $totalMonthly = 0.00;
    foreach ($category as $name => $amount)
    {
        $totalMonthly += floatval($amount);
        $formInputs.= "<tr class='dataRow'>".
                          "<td > $name </td> ".
                          "<td class = 'total'> $amount</td>".
                      "</tr>" ;
    }

  $divId .= "<div id='$value' class='col s12' >" .

            " <h5 class='center' style='margin-top:3em; font-weight:300' >$value  <span id = 'year'>$year</span> </h5>".
            "<br>".
            " <form id='form-data'>" .
              " <table id ='table_$value' class='striped table_edit'>".

                    " <tr>".
                    " <th>Category</th>".
                    " <th>Total </th> " .
                    "</tr>".
                    $formInputs .
                    "</table>". "<br>" .
                    "<input type='button'style='display:none;' name='submit' id='submit-$value' class='btn btn-info' value='Save' />".
                "</form> <br>".
                "<div class= 'total-container'>".
                "<h5 class='left 'style='display:inline;font-weight:300'> Total </h5>".
                "<h5 class='right' id = 'suma_$value' style='margin-right:1em;display:inline;font-weight:300'> ". sprintf("%.2f",$totalMonthly) ." </h5>".
                "</div>".
            "</div>" ;

}

// $container = "<div id='sumatoria'style='position:fixed;right:2em;top:5em;color:white; display:none;' class='chip pink lighten-3'>" .
//                       "$0.00" .
//              "</div>".
  //            $divId ;

    //          echo $container;


 ?>

<script>
 $(document).ready(function(){
     $('ul.tabs').tabs();
   });

</script>

 <div id='sumatoria'style="position:fixed;right:2em;top:5em;color:white; display:none;" class="chip pink lighten-3">
          $0.00
 </div>

 <?php
      $divId .= "<div id='grand-total' class='col s12' >".
                    "<h5 class='center' style='margin-top:1em; font-weight:300'> Grand Total $year</h5>".
                    "<br>".
                    "<div id='grand-total-data' > </div>".
                    "<div style='margin-top:1em;' id='chart_div'> </div>".
                " </div>";

           echo $divId ;
 ?>
