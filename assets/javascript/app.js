console.log("Hello World!");

var topics = ['earth', 'mars', 'saturn'];

renderButtons();

function renderButtons(){
  var buttonsRow = $('#buttonsRow');
  var buttonsCol = $('#buttonsCol');
  buttonsCol.empty();
  for(i = 0; i < topics.length; i++){
    button = $('<a></a>');
    button.attr({
      class: 'waves-effect waves-mine btn-flat',
      id: 'button'+i,
    });
    button.text(topics[i]);
    button.appendTo(buttonsCol);
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




