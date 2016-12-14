/* Code minified at: https://jscompress.com/ (ES2016 compression on) */

(function($){
  var decisionTree = {

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
        let btnText1 = "Yes",
            btnText2 = "No",
            nextStep1 = $(value).attr('data-next') + 'a',
            nextStep2 = $(value).attr('data-next') + 'b';

        if ($(value).attr('data-options') == "marriage") {
          btnText1 = "Married / Widowed";
          btnText2 = "Divorced / Separated / Never Married";
        }

        // Add label tag around question.
        let html = '<label>' + $(value).html() + '</label><br>';

        // Add answer option buttons.
        html += '<button class="btn btn-default" data-nextstep="' + nextStep1 + '">' + btnText1 + '</button>';
        html += '<button class="btn btn-default" data-nextstep="' + nextStep2 + '">' + btnText2 + '</button>';

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
      $('.' + nextStep).slideDown();
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
