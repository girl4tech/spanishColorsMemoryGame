//what can user see?
//user can see 10 cards, 2 that are matching, 5 colors, cards flip over to reveal their color and if they match
//what can user do?
//user can click on two cards to see if they match
//what does user expect?
//user expects that when they click a card, it will flip over to reveal their color and when they click on another card
//it will determine if they match or not. if cards do not match, they will flip over once again,
//if cards do match they stay flipped. Game finishes when all cards are flipped over



/*Shuffle function*/
$(document).ready(function() {
  var app = {
    cards: ["Rosa", "Verde", "Azul", "Café", "amarillo", "violeta", "anaranjado", "dorado", "crema", "gris"],
    init: function() {
      app.shuffle();
    },

/*shuffle functioln*/
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log('Shuffled Card Array: ' + app.cards);
},

//     clickShuffle: function () {
//       var random = 0;
//       var temp = 0;
//     $("#shuffle").click(function () {
//     for (i = 1; i <= app.cards.length; i++) {
//     random = Math.round(Math.random() * i);
//     temp = app.cards[i];
//     app.cards[i] = app.cards[random];
//     app.cards[random] = temp;
//   }
// })
// },

    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index]);
      });
      app.clickHandlers();
    },

    /*on click functions show text*/
      clickHandlers: function() {
      $('.card').on('click', function() {
        $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
        app.checkMatch();
      });

    },
    /*check value*/
    checkMatch: function() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') === $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).css("background", "#7ce6e6").animate({
              opacity: 0
            }).removeClass('unmatched');
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          app.checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 1000);
        }
      }
    },
    /*when game is done*/
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.win').html('<h1>You Won!</h1>');
      }
    }
  };
  app.init();
});
