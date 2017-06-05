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
        $('#table'). empty();
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
  $('#table').empty();

  for (var i = 0; i < data.length; i++) {
    var isDone = '<input type="checkbox" class="doneOrNot" value= true ></input><button class="delete" value=' + data[i].user_id + '>Delete</button></div';
    var notDone = '<input type="checkbox" class="doneOrNot" value= false ></input><button class="delete" value=' + data[i].user_id + '>Delete</button></div';

    if (data[i].completed === true){
      $('#table').append('<div class="listItem">' + data[i].task + ' <span class="line">Its all done</span> ' + isDone)
    } else{
      $('#table').append('<div class="listItem">' + data[i].task + ' <span class="line">Its not done yet</span> ' + notDone)
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
    $input.parent().addClass('complete');

  } else {
    $input.parent().removeClass('complete');

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
      console.log('rat noises');
      $(this).siblings('.line').text('Its all done');
    }//end success
  });//end ajax
};
};//end completedToggle











//spacer
