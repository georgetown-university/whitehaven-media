/* Code minified at: https://jscompress.com/ */

(function($){

  var decisionTree = {

    targets: [
      { yes: '.q2a', no: '.q2b' }, // Q1 targets
      { yes: '.q3a', no: '.q3b' }, // Q2a targets
      { yes: '.q3c', no: '.q3d' }, // Q2b targets
      { yes: '#a1',  no: '#a2' },  // Q3a targets
      { yes: '#a3',  no: '#a4' },  // Q3b targets
      { yes: '#a5',  no: '#a6' },  // Q3c targets
      { yes: '#a7',  no: '#a8' }   // Q3d targets
    ],

    init: function() {
  		var _this = this;
      this.setupForm();
  		$('.decision-tree button').click(function(e) { _this.evaluateAnswer(e); });
      $('#decision-tree-reset').click(function(e)  { _this.reset(e); });
  	},


    /* ***
     * Function: setupForm()
     *    Sets up the decision tree form to provide answer choices for each question.
     */

    setupForm: function() {
      var _this = this;
      $('.decision-tree .question').each(function(i, value) {
        // Add label tag around question.
        var html = '<label>' + $(value).html() + '</label>';

        // Add answer options.
        html += '<div class="options">';
        html += '<button data-target="' + _this.targets[i].yes + '">Yes</button>';
        html += '<button data-target="' + _this.targets[i].no + '">No</button>';
        html += '</div>';

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
      var q1 = $('.q1');
      this.clearFutureQuestions('.q1');
    },


  	/* ***
  	 * Function: evaluateAnswer()
  	 *     Deals with the answer to the current question.
  	 *     Question is the one that triggered the change event in init().
  	 */

  	evaluateAnswer: function(e) {
      e.preventDefault();

  		// Get the current question.
  		var target = $(e.target);

  		// Clear out answers and hide questions after current.
      var question = target.closest('.question')[0];
  		this.clearFutureQuestions(question);

  		// Figure out the next step.
  		this.nextStep(target);
  	},


  	/* ***
  	 * Function: clearFutureQuestions()
  	 *     Remove answers to and hide all questions after the passed in question.
  	 */

  	clearFutureQuestions: function(question) {
  		var futureQuestions = $(question).nextAll();

      futureQuestions.each(function() {
        $(this).hide();
      });

      this.hideAnswers();
  	},


  	/* ***
  	 * Function: nextStep()
  	 *     Figure out the next step based on the current answer.
  	 */

  	nextStep: function(current) {
  		var target = current.attr('data-target');
      this.hideAnswers();
      $(target).slideDown();
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
