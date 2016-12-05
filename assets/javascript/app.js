console.log("Hello World!");

var topics = ['earth space', 'mars space', 'saturn space'];
var selectedTopic;

$(document).ready(function(){
  $('#gifInstruction').hide();
  $('select').material_select();
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

function renderGifs(){
  var apiKey = 'dc6zaTOxFJmzC';
  var numCol = 4;
  var limitInput = $('#resultLimit')
  var limit = limitInput.val();
  if (limit == null){
    return false
  }
  console.log(limit);

  var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + selectedTopic + '&api_key=' + apiKey + '&limit=' + limit;
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .done(function(response){
    var results = response.data;
    if (results.length == 0){
      errorText = $('<h3></h3>');
      errorText.text('Sorry! No GIFs were found...Try something else');
      errorText.appendTo('.gifCol');
    }
    var numRows = limit/numCol;

    if (limit % numCol > 0){
      numRows = Math.floor(numRows)+numCol;
    }

    k = 0;
  loopRow:
    for (j = 0; j < numRows; j++){
      var gifRow = $('<div></div>');
      gifRow.attr({
        class: "row",
        id: 'gifRow' + j
      });
      gifRow.appendTo('.gifCol');
    loopCol:
      for (i = 1; i < results.length; i++){
        if (i % numCol != 0){
          i = k;
          // console.log(i)
          // console.log(k)
          var rating = results[i].rating;
          var dataStill = results[i].images.fixed_width_still.url;
          var dataAnimate = results[i].images.fixed_width.url;
          var dataState = 'still';

          var ratingText = $('<h5></h5>');
          ratingText.attr({
            class: 'gifRating',
            id: 'gifRating'+ i
          });
          ratingText.text('rated: ' + rating);

          var gifImage = $('<img>');
          gifImage.attr({
            src: dataStill,
            'data-still': dataStill,
            'data-animate': dataAnimate,
            'data-state': dataState,
            class: 'gif',
            id: 'gif'+ i
          });

          var gifDiv = $('<div></div>');
          gifDiv.attr({
            class: 'col m' + (numCol-1) + ' gifDiv',
          });

          var progressDiv = $('<div></div>');
          progressDiv.attr({
            class: 'progress',
            id: 'progressDiv' + i
          });


          var progressType = $('<div></div>')
          progressType.attr({
            class: 'indeterminate'
          });

          progressDiv.hide();

          progressType.appendTo(progressDiv);
          progressDiv.appendTo(gifDiv);
          gifDiv.appendTo(gifRow);
          ratingText.appendTo(gifDiv);
          gifImage.appendTo(gifDiv);
        } else{
          break loopCol;          
        };
          k++;
      };
    };
  });
  $('#gifInstruction').show();
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
  selectedTopic = $(this).attr('id');
  selectedTopic = topics[parseInt(selectedTopic.substring(6))];
  selectedTopic = selectedTopic.split(' ').join('+');
  renderGifs();
  return false
});

$(document).on('click', '.closeButton', function(){
  var buttonToRemove = $(this).attr('id');
  index = buttonToRemove.substring(5);
  if (topics[index].split(' ').join('+') == selectedTopic){
    $('#gifInstruction').hide();
    $('.gifCol').empty();
    errorText = $('<h3></h3>');
    errorText.text('You removed the button for these gifs :(');
    errorText.appendTo('.gifCol');
  };
  topics.splice(parseInt(index),1);
  renderButtons();  
  return false
});

$(document).on('click', '.gif', function(){
  var index = $(this).attr('id');
  index = index.substring(3);
  progressDiv = $('#progressDiv'+index);
  var state = $(this).attr('data-state');
  var animatedImage = $(this).attr("data-animate");
  var stillImage = $(this).attr("data-still");
  if (state == "still"){
    progressDiv.show();
    $(this).attr("src", animatedImage);
    $(this).attr("data-state", "animate");
    $(this).on('load',hideProgress(progressDiv));
  } else{
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  };
  return false
});

function hideProgress(progressDiv){
  console.log('im in');
  console.log(progressDiv)
  progressDiv.hide();
}




