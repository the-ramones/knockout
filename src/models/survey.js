/* Custom Bindings */

ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function(element, valueAccessor) {
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }

};


function Answer(text) {
    var self = this;
    self.answerText = text;
    self.points = ko.observable(1);
}

function SurveyViewModel(question, pointsBudget, answers) {
    var self = this;

    self.question = question;
    self.pointsBudget = pointsBudget;
    self.answers = $.map(answers, function(text) {
        return new Answer(text);
    });

    self.save = function() {
        alert("To do");
    };
    self.pointsUsed = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < self.answers.length; i++) {
            total = total + self.answers[i].points();
        }
        return total;
    });
}

var survey = new SurveyViewModel("What do you expext from a new attendee?", 10, [
    "Patience",
    "Matureness",
    "Knowledge",
    "Hard-working",
    "Stubborness"
]);

ko.applyBindings(survey);

