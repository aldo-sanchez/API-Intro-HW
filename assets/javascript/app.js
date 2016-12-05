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
  $('.gifCol').empty();
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
    var results = response.data;

    var numRows = limit/3;
    if (limit % 3 > 0){
      numRows = Math.floor(numRows)+1;
    }

    k = 0;
  loop1:
    for (j = 0; j < numRows; j++){
      console.log("did this")
      var gifRow = $('<div></div>');
      gifRow.attr({
        class: "row",
        id: 'gifRow' + j
      });
      gifRow.appendTo('.gifCol');
    loop2:
      for (i = 1; i < results.length; i++){
        if (i % 3 != 0){
          i = k;
          console.log(i)
          // console.log(k)
          var rating = results[i].rating;
          var dataStill = results[i].images.fixed_width_still.url;
          var dataAnimate = results[i].images.fixed_width.url;
          var dataState = 'still';

          var ratingText = $('<h3></h3>');
          ratingText.attr({
            class: 'gifRating',
            id: 'gifRating'+ i
          });

          var gifImage = $('<img>');
          gifImage.attr({
            src: dataStill,
            'data-still': dataStill,
            'data-animate': dataAnimate,
            'data-state': dataState
          });

          var gifDiv = $('<div></div>');
          gifDiv.attr({
            class: 'col m4 gif',
            id: 'gif'+ i
          });
          
          gifDiv.appendTo(gifRow);
          gifImage.appendTo(gifDiv);
          }
        else{
          console.log("continue", k);
          break loop2;          
        }
          k++;
      }
    }
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




