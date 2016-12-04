console.log("Hello World!");

var topics = ['earth', 'mars', 'saturn'];

renderButtons();

function renderButtons(){
  var buttonsRow = $('#buttonsRow');
  var buttonsCol = $('#buttonsCol');

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




