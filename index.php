
<?php

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


$year = date('Y');
$dir_name =  'data' . '/' . $year . '/';
$options_year="";
$tabs="";
$divId="";
$current_year_dir = glob($dir_name);


 if (count($current_year_dir) === 0) //first time acces or new year started
 {
   if (!mkdir($dir_name,0705,true))
     die('failed to create directory :' . $dir_name);
   createFiles($dir_name,$months);
  // $options_year = "<li id='li_$year' class='user-year'>  <a href='#!'> <i class='material-icons'>assessment </i> <span>$year</span></a></li>";
 }
 // retrieve directories to be display in sideNav
   $options = [];
   $directories = glob("data/*");
   foreach ($directories as $value) {
     array_push($options,str_replace('data/','',$value));
   }

   foreach ($options as $value) {
     $options_year .= "<li id='li_$value' class='user-year'>  <a href='#!'> <i class='material-icons'>assessment </i> <span>$value </span></a></li>";
   }



/************** createFiles() ******************/
function createFiles($dir_name, $months)
{
  $jsonData = getInitialData();
  foreach ($months as $month)
  {
    $fname =  $dir_name .  $month . '.json'; //data/201X/january
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




// generate tabs
foreach ($months as $value ) {
  $tabs .= "<li class='tab'> <a href='#$value'>$value</a></li>";
}
 $tabs.= "<li id='grand-total-tab' class='tab'> <a href='#grand-total'>grand total</a></li>";

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

?>
<!DOCTYPE html>
 <html>
   <head>
     <!--Import Google Icon Font-->
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <!--Import materialize.css-->
     <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

     <!--Let browser know website is optimized for mobile-->
     <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0" />
     <!--Import jQuery before materialize.js-->
     <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
     <script type="text/javascript" src="js/materialize.min.js"></script>

     <!--Load the AJAX API-->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <!-- <script type="text/javascript">
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);
    </script> -->


     <style>
     .biz-title{
        font-family: 'Tangerine', serif;
        font-weight:italic;
        margin-left:15px;
        color:#fff;
        font-size:1.4em;
      }

    </style>



   </head>

   <body>
<!-- <div class="navbar-fixed"> -->
     <nav class="nav-extended">

       <div class="nav-wrapper ">
           <a href="#" style="margin-left:2em;font-weight:300;font-size:1.7em" class="brand-logo left">Expenses</a>

           <ul id="nav-mobile" class="right">
             <li><a href="#"> <i class='btn_add material-icons small' style="display:none;">add</i>  </a></li>
             <li><a href="#"><i class='btn_remove material-icons small' style="display:none;">remove</i></a></li>
             <li><a id="btn-edit" href="#"><i id="edit" class="material-icons small ">edit</i></a></li>
          </ul>

          <ul id="slide-out" class="side-nav">
            <li>
              <div style="height:180px;" class="user-view pink lighten-3">

                <h4> Expenses </h4>
                  <h5> book </h5>

              </div>

              <!-- <div class="user-view">
                  <div class="background">
                      <img src="images/office.jpg">
                    </div>
                    <a href="#!user"><img class="circle" src="images/yuna.jpg"></a>
                    <a href="#!name"><span class="white-text name">John Doe</span></a>
                    <a href="#!email"><span class="white-text email">jdandturk@gmail.com</span></a>
             </div> -->

            </li>

            <li>
                <ul id='list-year'>
                    <?php echo $options_year ?>
              </ul>
            </li>


            <li> <div class="divider"></div></li>


            <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">add/remove <i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li id="add-year"> <a class="waves-effect waves-light btn modal-trigger" href="#modal-add-year">add year</a></li>
                <li id="remove-year"> <a class="waves-effect waves-light btn red modal-trigger" href="#modal-remove-year">remove year</a></li>

              </ul>
            </div>
          </li>
        </ul>
      </li>
          </ul>
          <a href="#" data-activates="slide-out" class="button-normal">
              <i style="margin-left:0.5em" class="material-icons">menu</i>
          </a>

      </div>


      <div class="nav-content pink ligthen-3 ">
        <ul id="tabs-swipe-demo" class="tabs tabs-transparent">
            <?php echo $tabs ?>
        </ul>
      </div>

    </nav>
<!-- </div> -->



    <div id="main-container" class="container">

      <!-- <div class="nav-content pink ligthen-3 ">
        <ul id="tabs-swipe-demo" class="tabs tabs-transparent">

        </ul>
      </div> -->

      <div id='sumatoria'style="position:fixed;right:2em;top:5em;color:white; display:none;" class="chip pink lighten-3">
               $0.00
      </div>
    <?php

    //   $card = "<div style='margin-top:1em;overflow:auto;width:500px;' class='row'>".
    //         "<div class='col s12 m5'>".
    //     "<div class='card-panel '>".
    //       "<span id='chart_div'>I am a very simple card. I am good at containing small bits of information.</span>".
    //   "  </div>".
    //   "</div>".
    // "</div>";
      $divId .= "<div id='grand-total' class='col s12' >".
                    "<h5 class='center' style='margin-top:1em; font-weight:300'> Grand Total $year</h5>".
                    "<br>".
                        "<div id='grand-total-data' > </div> ".
                        "<div style='margin-top:1em;' id='chart_div'> </div>".
                " </div>";
      echo $divId;

      ?>
  </div>

  <!-- Modal Add  Year -->
  <div id="modal-add-year" class="modal">
      <form>
          <div class="modal-content">
              <h5>Add Year</h5>
              <input id='input-user-year' type='number'  />
          </div>
          <div class="modal-footer">
              <a id='btn-add-year' href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">add</a>
          </div>
    </form>
  </div>

  <!-- Modal Remove  Year -->
  <div id="modal-remove-year" class="modal">
      <form>
          <div class="modal-content">
              <h5>Remove Year</h5>
              <input id='input-rm-user-year' type='number'  />
          </div>
          <div class="modal-footer">
              <a id='btn-remove-year' href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">remove</a>
          </div>
    </form>
  </div>

  <script src='mainScript.js'>

   </script>

   <!-- Modal Message -->
  <div id="modal1" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Message</h4>
      <p> Enter the category name and value</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">OK</a>
    </div>
  </div>


   </body>

 </html>
