
$("document").ready(function(){
    $("#edit").click(function(){
      $("td" ).css('border','1px solid red');
      alert("h");
    });




//------------------------------------------------------------
  var a=8;
  $('#add_January').click(function(){

      a++;
      $('#table_January').append(
        '<tr id="row'+a+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_January" id="'+a+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });

  /* -------------------------------------------------- */

  var b=8;
  $('#add_Febraury').click(function(){

      b++;
      $('#table_Febraury').append(
        '<tr id="row'+b+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_Febraury" id="'+b+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove_Febraury', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });


  /* -------------------------------------------------- */

  var c=8;
  $('#add_March').click(function(){

      c++;
      $('#table_March').append(
        '<tr id="row'+c+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_March" id="'+c+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove_March', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });
  /* -------------------------------------------------- */

  var d=8;
  $('#add_April').click(function(){

      d++;
      $('#table_April').append(
        '<tr id="row'+d+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_April" id="'+d+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove_April', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });
  /* -------------------------------------------------- */

  var e=8;
  $('#add_May').click(function(){

      e++;
      $('#table_May').append(
        '<tr id="row'+e+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_May" id="'+e+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove_May', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });
  /* -------------------------------------------------- */

  var f=8;
  $('#add_June').click(function(){

      f++;
      $('#table_June').append(
        '<tr id="row'+f+'">'+
        '<td> <input type="text" name="name[]" placeholder="Bridge Tool,PG&E" class="form-control name_list" /></td>'+
        '<td> <input style="width:30%;" type="number" placeholder="$0.00"/>'+
        '<a class=" btn_remove_June" id="'+f+'"><i class="material-icons">clear </i></a></td>' +
        '</tr>');
        //var visible = $('div').is(':visible');
   });

  $(document).on('click', '.btn_remove_June', function(){
      var button_id = $(this).attr("id");
      $('#row'+button_id+'').remove();
  });
  /* -------------------------------------------------- */


});
