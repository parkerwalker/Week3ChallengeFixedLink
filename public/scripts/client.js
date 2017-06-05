console.log('js');
$(onReady)

function onReady(){
  console.log('jq');
  $('#enter').on('click', sendTask);
  $('#update').on('click', updateTask);
  $('#table').on('click', '.delete', deleteTask);
  $('#table').on('click', '.doneOrNot', completedToggle);
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
        $('#tableNotDone').empty();
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
  $('#tableNotDone').empty();
  console.log('update button click');




  for (var i = 0; i < data.length; i++) {
    var isDone = '<input type="checkbox" class="doneOrNot" value= true checked></input><button class="delete" value=' + data[i].user_id + '>Delete</button></div';
    var notDone = '<input type="checkbox" class="doneOrNot" value= false ></input><button class="delete" value=' + data[i].user_id + '>Delete</button></div';

    if (data[i].completed === true){
      $('#tableDone').append('<div class="listItem2">' + data[i].task  + isDone)
    } else{
      $('#tableNotDone').append('<div class="listItem">' + data[i].task  + notDone)
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
      url: '/updateCompletion',
      data: completedToSend,
      success: function(response){
        console.log('rat noises', response);

      }//end success
    });//end ajax
  } else {
    $input.parent().removeClass('listItem2');
};
};//end completedToggle











//spacer
