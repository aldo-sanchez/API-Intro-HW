console.log("Hello World!");

var topics = ['earth', 'mars', 'saturn'];

$(document).ready(function(){
  renderButtons();
})


function renderButtons(){
  var buttonsRow = $('#buttonsRow');
  var buttonsCol = $('#buttonsCol');
  buttonsCol.empty();
  for(i = 0; i < topics.length; i++){
    closeButton = $('<button></button>');
    closeButton.attr({
      class: 'btn-floating transparent closeButton',
      id: 'close' + i
    });

    closeIcon = $('<i></i>');
    closeIcon.attr({
      class: 'material-icons'      
    });
    closeIcon.text('close');
    closeIcon.appendTo(closeButton);

    gifButton = $('<button></button>');
    gifButton.attr({
      class: 'waves-effect transparent waves-mine btn-flat gifButton',
      id: 'button'+i,
    });

    if (i != topics.length-1){
      gifButton.addClass('test')
    }

    gifButton.text(topics[i]);
    closeButton.appendTo(buttonsCol);
    gifButton.appendTo(buttonsCol);
  };
};



// event listeners
$('#addButton').on('click', function(){
  var addNew = $('#addNew');
  if(addNew.val() != ''){
    var newTopic = addNew.val().trim();
    topics.push(newTopic);
    console.log(newTopic);
    console.log(topics);
    addNew.val('');
    renderButtons();
  }
  return false
});

$(document).on('click', '.gifButton', function(){
  var selectedTopic = $(this).attr('id');
  selectedTopic = topics[parseInt(selectedTopic.substring(6))];
  selectedTopic = selectedTopic.split(' ').join('+');
  console.log(selectedTopic);

  var apiKey = 'dc6zaTOxFJmzC';
  var limit = 10;
  var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + selectedTopic + '&api_key=' + apiKey + '&limit=' + limit;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response){

  });
});

$(document).on('click', '.closeButton', function(){
  var buttonToRemove = $(this).attr('id');
  index = buttonToRemove.substring(5);
  console.log(buttonToRemove);
  console.log(index);
  topics.splice(parseInt(index),1);
  renderButtons();
})




