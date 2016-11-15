/* Code minified at: https://jscompress.com/ (ES2016 compression on) */

(function($){
  var decisionTree = {

    nextSteps: [
      { yes: '.q2a', no: '.q2b' }, // Q1 next steps
      { yes: '.q3a', no: '.q3b' }, // Q2a next steps
      { yes: '.q3c', no: '.q3d' }, // Q2b next steps
      { yes: '#a1',  no: '#a2' },  // Q3a next steps
      { yes: '#a3',  no: '#a4' },  // Q3b next steps
      { yes: '#a5',  no: '#a6' },  // Q3c next steps
      { yes: '#a7',  no: '#a8' }   // Q3d next steps
    ],

    init: function() {
      this.setup();
  		$('.decision-tree button').click( (e) => { this.progress(e); });
      $('#decision-tree-reset').click(  (e) => { this.reset(e); });
  	},


    /* ***
     * Function: setup()
     *    Sets up the decision tree form to provide answer choices for each question.
     */

    setup: function() {
      let _this = this;

      $('.decision-tree .question').each(function(i, value) {
        // Add label tag around question.
        let html = '<label>' + $(value).html() + '</label>';

        // Add answer option buttons.
        html += '<button class="btn btn-default" data-nextstep="' + _this.nextSteps[i].yes + '">Yes</button>';
        html += '<button class="btn btn-default" data-nextstep="' + _this.nextSteps[i].no + '">No</button>';

        // Update the HTML.
        $(this).html(html);
      });
    },


    /* ***
     * Function: reset()
     *     Resets the decision tree form to its original state.
     */

    reset: function(e) {
      e.preventDefault();
      this.clearFuture('.q1');
    },


  	/* ***
  	 * Function: progress()
  	 *     Deals with the answer to the current question.
  	 *     Question is the one that triggered the change event in init().
  	 */

  	progress: function(e) {
      e.preventDefault();

  		let target = $(e.target),
          question = target.closest('.question')[0],
          nextStep = target.attr('data-nextstep');

      // Clear out any future questions/answers.
      this.clearFuture(question);

      // Mark the question's selected answer.
      target.addClass('selected');

      // Show the next step.
      $(nextStep).slideDown();
  	},


  	/* ***
  	 * Function: clearFuture()
  	 *     Remove answers and hide all questions after the passed-in question.
  	 */

  	clearFuture: function(question) {
  		let futureQuestions = $(question).nextAll();

      // Hide future questions.
      $(futureQuestions).slideUp();

      // Deselect the answers of this question and all future questions.
      $('button', question).removeClass('selected');
      $('button', futureQuestions).removeClass('selected');

      // Hide any visible answers.
      $('.decision-answer .answer').slideUp();
  	}
  };


  /* ***
   * Run JS init() function on document.ready.
   */

  $(document).ready(function(){
    decisionTree.init();
  });

})(jQuery);
