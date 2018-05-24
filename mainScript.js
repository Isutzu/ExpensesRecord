// TODO
// create regular expression rule to accept only number between 0-9 and 4 digit only
// when removing a year load page again or better load the current year

$("document").ready(function(){

  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

    var chart_data = {};
    $(".button-normal").sideNav();
    $('.modal').modal();

    $('#list-year').on('click','.user-year',function(){
      var year = $(this).find('span').text();
      console.log(year);
      loadPage(year);

    });

    statistics();



    /**************** add-year() ******************/
    $('#btn-add-year').on('click',function(){
      var userYear = $('#input-user-year').val().trim(); console.log("input--->" + userYear);

      if(validate(userYear))
      {
          var newYear = $('<li id="li_' + userYear + '"' + ' class="user-year"> <a> <i class="material-icons">assessment</i> <span>' + userYear + '</span></a></li> ');
          $('#list-year').append(newYear);
          Materialize.toast(userYear + " added",2000);
      }
      else{
          Materialize.toast(userYear + " exist already",2000);
      }


    });

    /**************** remove-year() ******************/

    $('#btn-remove-year').on('click',function(){
      var userYear = $('#input-rm-user-year').val();console.log("entered " + userYear);
      $('#list-year #li_'+userYear).remove();
      $.ajax({
        url:"removeYear.php",
        data:'year='+ userYear,
        type:"GET",
        success: function(){

          Materialize.toast(userYear + " record deleted",2000);

        },
      });

    });

    /************* loadPage ********************/
    function loadPage(year)
    {
      console.log("inside loadPage function");
      var loader = " <div style='position:absolute;left:40%;top:50%' > <div class= 'preloader-wrapper big active ' >" +
                      "<div class='spinner-layer spinner-blue-only'>" +
                      "<div class='circle-clipper left'>"+
                          "<div class='circle'> </div>"+
                          "</div><div class='gap-patch'>"+
                          "<div class='circle'>  </div>"+
                        "</div><div class='circle-clipper right'>"+
                 "<div class='circle'></div></div></div></div> </div>";

      var url = "dataTemplate.php";
      var params = 'year=' + year;
      $('.button-collapse').sideNav('hide');
      $('#main-container').html(loader);

      $.ajax({
        url:url,
        data:params,
        type:"GET",

        success: function(data){
            $('#main-container').html(data);
            statistics();
            drawChart();
        },


      });

    //  $('#main-container').html(loader).load(url,params);

    }

    $("#edit").click(function(){
        $("#btn-edit").addClass('btn-floating pulse');
        $(".btn_add").css('display','inline');
        $(".btn_remove").css('display','inline');

        var editMode = $(this).hasClass('edit-mode');
        month = $(".tab").find(".active").text();
        $(".nav-content").hide();

        if(!editMode)
        {
          $("#menu-button").hide();
          table_name= 'table_'+ month;
          $(this).addClass('edit-mode');

          $("#sumatoria").show();
          $("#sumatoria").text(addNumbers().toFixed(2));
          $('#submit-'+ month).show();

          $(".total-container").hide();


          $("#" + table_name).find('tr').each(function(){
               var currentRow = $(this);
               var category = currentRow.find('td:eq(0)');
               var price = currentRow.find('td:eq(1)');
               var priceVal =  parseFloat( price.text()).toFixed(2);
               var categoryVal = category.text();
               if ((price.length > 0)||(category.length > 0))
               {
                  inputPrice = $("<input  type='number' " + "value='" + priceVal  +  "'/>" +
                                  "<input type='hidden' value = ' "+ priceVal + " '/>");

                  price.html(inputPrice);
                  inputPrice.on('click',addition);
          		    inputCategory = $("<input  type='text' " + "value='" + categoryVal+   "'/>" +
                                    "<input type='hidden' value =' "+ categoryVal + "'/>");
                  category.html(inputCategory)	;

               }

           });

        }
        else
        {
          $("#menu-button").show(); // hamburger menu button
          $(".btn_add").css('display','none');
          $(".btn_remove").css('display','none');
          $("#btn-edit").removeClass('btn-floating pulse');
          $(".nav-content").show();
          $("#sumatoria").hide();
          $(".total-container").show();
          $("#submit-"+month).hide();
          $(this).removeClass('edit-mode');
          columns =$('#' + table_name).find('td');
          columns.each(function(){
              var newName = $(this).find('input[type=hidden]').eq(0).val();

              $(this).html(newName);
            });
          $('#suma_'+month ).text(addNumbers().toFixed(2));
        }

        /*************** submit() ********************/

        $('#submit-'+month).on('click',function(){

          $("#menu-button").show();
          data = getData();
          jsonData = JSON.stringify(data);
          console.log(jsonData);

          $.ajax({
                url:"saveData.php",
                type:"POST",
                dataType:'json',
                data : {data:jsonData} ,

                success : function(data){
                    if(data.code == 200)
                    {
                      Materialize.toast("SAVED..!",2000);
                      displayDataTable();
                      statistics();
                      drawChart();
                      $("#edit").focus();
                    }
                    if(data.code == 400)
                    {
                        $('#modal1').modal('open');

                    }

                }

           });


        });

    });

 /***************** displayDataTable() *******************/
 function displayDataTable()
 {

   $(".btn_add").css('display','none');
   $(".btn_remove").css('display','none');
   $("#btn-edit").removeClass('btn-floating pulse');
   $(".nav-content").show();
   $("#sumatoria").hide();
   $(".total-container").show();
   $("#submit-"+month).hide();
   $(this).removeClass('edit-mode');
   columns =$('#' + table_name).find('td');
   columns.each(function(){
       var newName = $(this).find('input').eq(0).val();
       $(this).html(newName);
     });
     $('#suma_'+month ).text(addNumbers().toFixed(2));
 }
/******************* validation() *******************/

  function validate(y)
  { console.log(y);

      values = $("#list-year li").find('span');
      values.each(function(){
          value = $(this).text().trim(); console.log(value + "---");
         return ((value == y)? (flag = false):(flag = true));
    });
      if(!flag)
        return flag;
      else
        return true

  }
/******************* getData() *******************/
  function getData()
  {
    var data={};
    $("#" + table_name).find('tr').each(function(){
      var currentRow = $(this);
      var category = currentRow.find('td:eq(0)');
      var price = currentRow.find('td:eq(1)');
      if((price.length >0)||( category.length >0))
      {
          var categoryVal = $.trim( category.find('input').val());
          var pr = price.find('input').val();
          var priceVal =  parseFloat(pr).toFixed(2);

          data[categoryVal]=priceVal;
        }


  });
//  console.log(data);
  var year = $("#year").text();
  var month =  $(".tab").find(".active").text();
  var path = 'data' + '/' + year + '/' + month +'.json';
  data['path'] = path;
  return data;

  }

    /******************* addNumbers() *******************/
    function addNumbers()
    {
      // runs everytime the edit button is clicked
      var sum = 0.00;
        month = $(".tab").find(".active").text();
        table_name= 'table_'+ month;
      $("#" + table_name).find('tr').each(function(){

           var current= $(this);
           var price = current.find('td:eq(1)');
           var priceValue =  parseFloat( price.text());

           if($.isNumeric(priceValue))
           {
              //console.log(priceValRaw);
               sum +=  priceValue; console.log("SUMA from EDIT-MODE ="+sum);
           }


       });

       return sum;
    }

    /******************* addition() *******************/
    //runs everytime the user tap or click in the input field
    function addition()
    {
      var sum = 0.00;
      month = $(".tab").find(".active").text();
      table_name= 'table_'+ month;
      columns =$('#' + table_name).find('td');
      columns.each(function(){
          var price = parseFloat($(this).find('input').eq(0).val());
          if($.isNumeric(price))
          {

              sum+=price; console.log("SUM from tapping INPUT ="+sum);
          }


        });

      $('#sumatoria').text(sum.toFixed(2));

    }


    $(document).on('click','.btn_add',function() {

      month = $(".tab").find(".active").text();
      table_name = 'table_'+ month;
      rowPrice =  $("<td><input type='number' value='0.00'  class='validate' />");

      newRow = "<tr class='dataRow'>" +
                        "<td><input type='text' name='name[]' value='type here..'  class='validate' /></td> "+
                        "<td><input type='number' value='0.00'  class='validate newPriceRow' />"+
                "</tr>";

      $('#' + table_name).append(newRow);
      $('.newPriceRow').on('click', addition);
      Materialize.toast("New Category Added",2500);
    });

    $(document).on('click','.btn_remove',function(){
      month = $(".tab").find(".active").text();
      table_name = 'table_'+ month;
      if(!$('.btn_remove').hasClass('remove-active'))
      {
          $('.btn_remove').addClass('remove-active');
          $('.btn_add').hide();
          $('#btn-edit').hide();
          $("#sumatoria").hide();
          $('#submit-'+month).hide();
          $("#" + table_name).find('.dataRow').each(function(){
               var current= $(this);

               row = current.find('input');
               row.prop('disabled',true);
               btnRemove = "<td><a> <i class='material-icons remove-row'>clear </i></a></td>";
               current.append(btnRemove);

           });
           $('.remove-row').on('click',function(){
             $(this).parent().parent().parent().remove();
           });

      }
      else {
        $('.btn_remove').removeClass('remove-active');
        $('.btn_add').show();
        $('#btn-edit').show();
        $('#sumatoria').show();
        $('#submit-'+month).show();
        $("#" + table_name).find("tr").each(function(){
             var current= $(this);
             row = current.find('input');
             row.prop('disabled',false);
             var btnRemove = current.find('td:eq(2)');
             btnRemove.remove();

         });
      }

    });


    /************ statistics() **************/
    function statistics()
    {
        console.log("inside function statistics");
        var months = ['January',
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
                   'December'];
        var value = "";



        table_stats = " <table class='striped'>"+
                      "<tr>" +
                      " <th> Month </th> <th> Amount</th>"+
                      " </tr> ";

        var grandTotal = 0;
        for (var i = 0, len = months.length; i < len; i++)
        {
              month = months[i];
              var total = $('#suma_'+months[i]).text();
              grandTotal += parseFloat(total);
              chart_data[month]= parseFloat(total);
               table_stats += " <tr>" +
                              "<td>" + month +"</td> <td>" + total + " </td>"+
                              "</tr>";

        }
        table_stats += "</table><br><br> " +
                    "<div class='left'>"+
                    "<span style='font-weight:300;margin-right:1em;font-size:x-large;'> Grand Total </span>"+
                    "<span style='font-weight:300;margin-right:1em;font-size:x-large;'> = </span>"+
                    "<span style='font-weight:300;font-size:x-large;'> $" + grandTotal.toFixed(2) + "</span>"+
                    "</div><br>";

        $('#grand-total-data').html(table_stats);


    }
    /*********** getChartData() *************/
    function getChartData()
    {
      return chart_data;
    }

    /************ drawChart() ***************/
    function drawChart()
    {
        var chart_data = getChartData(); console.log(chart_data);
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Month');
        data.addColumn('number', 'Amount');
        for (var key in chart_data)
        {
          data.addRows([
            [key, chart_data[key]],
          ]);
        }


      // Set chart options
      var options = {'title':'Monthly expenses',
                     'width':500,
                     'height':400
                   };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }


// 
});
