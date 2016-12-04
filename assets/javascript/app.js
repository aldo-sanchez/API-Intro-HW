console.log("Hello World!");

var topics = ['earth', 'mars', 'saturn'];

renderButtons();

function renderButtons(){
  var buttonsRow = $('#buttonsRow');
  var buttonsCol = $('#buttonsCol');
  buttonsCol.empty();
  for(i = 0; i < topics.length; i++){
    closeButton = $('<button></button>');
    closeButton.attr({
      class: 'btn-floating transparent closeButton'
    });

    closeIcon = $('<i></i>');
    closeIcon.attr({
      class: 'material-icons closeButton',
      id: 'close' + i
    });
    closeIcon.text('close');
    closeIcon.appendTo(closeButton);

    gifButton = $('<button></button>');
    gifButton.attr({
      class: 'waves-effect transparent waves-mine btn-flat gifButton',
      id: 'button'+i,
    });

    if(i != topics.length-1){
      gifButton.addClass('test')
    }

    gifButton.text(topics[i]);
    closeButton.appendTo(buttonsCol);
    gifButton.appendTo(buttonsCol);
  };
};

$('#addButton').on('click', function(){
  var addNew = $('#addNew');
  var newTopic = addNew.val().trim();
  topics.push(newTopic);
  console.log(newTopic);
  console.log(topics);
  addNew.val('');
  renderButtons();
  return false
});

$(document).on('click', '.closeButton', function(){
  var buttonToRemove = $(this).attr('id');
  index = buttonToRemove.charAt(5);
  console.log(buttonToRemove);
  console.log(index);
  topics.splice(parseInt(index),1);
  renderButtons();
})




