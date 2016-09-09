(function($){

  var decisionTree = {

  	/* ***
  	 * Function: init()
  	 *     Sets up the change event for all questions.
  	 */

  	init: function() {
  		var _this = this;
      this.setupForm();
  		$('.decision-tree select').change(function(e) { _this.evaluateAnswer(e); });
      $('#decision-tree-reset').click(function(e) { _this.reset(e); });
  	},


    /* ***
     * Function: setupForm()
     *    Sets up the decision tree form to provide answer choices for each question.
     */

    setupForm: function() {
      $('.decision-tree .question').each(function() {
        // Add label tag around question.
        var html = '<label>' + $(this).html() + '</label>';

        // Determine targets.
        var targetYes, targetNo;
        if ($(this).hasClass('question-1'))  { targetYes = '.question-2a';   targetNo = '.question-2b'; }
        if ($(this).hasClass('question-2a')) { targetYes = '.question-3a';   targetNo = '.question-3b'; }
        if ($(this).hasClass('question-2b')) { targetYes = '.question-3c';   targetNo = '.question-3d'; }
        if ($(this).hasClass('question-3a')) { targetYes = '.answer-3a_yes'; targetNo = '.answer-3a_no'; }
        if ($(this).hasClass('question-3b')) { targetYes = '.answer-3b_yes'; targetNo = '.answer-3b_no'; }
        if ($(this).hasClass('question-3c')) { targetYes = '.answer-3c_yes'; targetNo = '.answer-3c_no'; }
        if ($(this).hasClass('question-3d')) { targetYes = '.answer-3d_yes'; targetNo = '.answer-3d_no'; }

        // Add answer options.
        html += '<select><option value=""></option>';
        html += '<option value="yes" data-target="' + targetYes + '">Yes</option>';
        html += '<option value="no" data-target="' + targetNo + '">No</option>';
        html += '</select>';

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
      var q1 = $('.question-1 select');
      q1.val('');
      this.clearFutureQuestions(q1);
    },


  	/* ***
  	 * Function: evaluateAnswer()
  	 *     Deals with the answer to the current question.
  	 *     Question is the one that triggered the change event in init().
  	 */

  	evaluateAnswer: function(e) {
  		// Get the current question.
  		var question = $(e.target);

  		// Clear out answers and hide questions after current.
  		this.clearFutureQuestions(question);

  		// If there is an answer, figure out the next step.
  		if (question.val()) {
				this.nextStep(question);
			}
  	},


  	/* ***
  	 * Function: clearFutureQuestions()
  	 *     Remove answers to and hide all questions after the passed in question.
  	 */

  	clearFutureQuestions: function(question) {
  		var futureQuestions = question.closest('fieldset').nextAll();
      if (futureQuestions) {
        $('.question', futureQuestions).removeClass('show');
        $('.question select', futureQuestions).val('');
        this.hideAnswers();
      }
  	},


  	/* ***
  	 * Function: nextStep()
  	 *     Figure out the next step based on the current answer.
  	 *     TODO: make this less clunky later.
  	 */

  	nextStep: function(question) {
  		// Figure out the target based on the current answer.
  		var answer = question.val();
  		var target = $('option[value=' + answer + ']', question).attr('data-target');

  		// If the target is a class, show the next question.
  		if (target.indexOf('.') == 0) {
  			$(target).addClass('show');
  		}
			// Otherwise show the next answer.
			else {
				this.hideAnswers();
        $(target).slideDown();
			}
  	},

    /* ***
     * Function hideAnswers()
     *    Utility function to hide all answers.
     */

    hideAnswers: function() {
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
