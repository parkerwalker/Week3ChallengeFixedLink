console.log('js');
$(onReady)

function onReady(){
  console.log('jq');
  $('#enter').on('click', sendTask);
  $('#update').on('click', updateTask);
  $('#table').on('click', '.delete', deleteTask);
  $('#table').on('click', '.done', completedToggle);
  $('#table').on('click', '.notDone', completedToggle);

  updateTask();
}

function sendTask(){
  var userInput = $('#input').val();
  if (userInput == ''){
    alert("You can't add nothing");
  } else{
    console.log('enter button cliked', userInput);
    var dataToSend = {
      task: userInput
    }
    $.ajax({
      type: 'POST',
      url: '/addTask',
      data: dataToSend,
      success: function(response){
        console.log('woof', response);
        updateTask();
        $('#input').val('');
        $('#tableDone').empty();
      }//end success
    });//end ajax
  };//end else
};//end sendtask

function updateTask() {
  console.log('update button click');
  $.ajax({
    type:'GET',
    url: '/getTask',
    success: function(response){
      console.log('bark', response);
      displayReturn(response);
    }//end success
  });//end ajax//end else
};//end updateTask

function displayReturn(data){
  console.log('This is the data to be displayed: ', data);
  $('#tableDone').empty();
  console.log('update button click');


  for (var i = 0; i < data.length; i++) {
    var buttonDeleteUserid = '<button class="delete" value=' + data[i].user_id + '>Delete</button>';
    var isDone = '<input type="checkbox" class="done" value= true checked></input>' + buttonDeleteUserid;
    var notDone = '<input type="checkbox" class="notDone" value= false ></input>' + buttonDeleteUserid;

    if (data[i].completed === true){
      $('#tableDone').append('<div class="listItem2">' + data[i].task  + isDone)
    } else{
      $('#tableDone').prepend('<div class="listItem">' + data[i].task  + notDone)
    }
  };//end loop
}; //end displayreturn

function deleteTask(){
  console.log('delete button click', $(this).val());
  var idToDelete = {
    idToSend: $(this).val()
  };
  $(this).parent().remove();

  $.ajax({
    type: 'POST',
    url: '/deleteFromDatabase',
    data: idToDelete,
    success: function(respose){
      console.log('quak');
    }//end success
  });//end ajax
};//end deleteTask

function completedToggle(){
  var $input = $(this);
  if ($input.is(':checked')){
    $input.parent().addClass('listItem2');
    console.log('completedToggle click');
    var completedToSend = {
      doneYet: $(this).val(),
      idToSend: $(this).siblings('.delete').val()
    };//end completedButton
    console.log(completedToSend);

    $.ajax({
      type: 'POST',
      url: '/updateCompletionTrue',
      data: completedToSend,
      success: function(response){
        console.log('rat noises', response);
        updateTask();

      }//end success
    });//end ajax
  } else {
    $input.parent().removeClass('listItem2');
    console.log('completedToggle click');
    var completedToSend = {
      doneYet: $(this).val(),
      idToSend: $(this).siblings('.delete').val()
    };//end completedButton
    console.log(completedToSend);

    $.ajax({
      type: 'POST',
      url: '/updateCompletionFalse',
      data: completedToSend,
      success: function(response){
        console.log('rat noises', response);
        updateTask();
      }//end success
    });//end ajax
  };//end else
};//end completedToggle









//spacer
