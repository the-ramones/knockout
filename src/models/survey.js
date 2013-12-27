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

ko.bindingHandlers.jqButton = {
    init: function(element, vakueAccessor) {
        $(element).button();
    },
    update: function(element, valueAccessor) {
        var currentValue = valueAccessor();
        $(element).button("option", "disabled", currentValue.enable === false);
    }
};

ko.bindingHandlers.starRating = {
    init: function(element, valueAcessor) {
        $(element).addClass("startRating");
        for (i = 0; i < 5; i++) {
            $("<span>").appendTo(element);
        }
        $("span", element).each(function(index) {
            $(this).hover(
                    function() {
                        $(this).prevAll().add(this).addClass("hoverChosen")
                    },
                    function() {
                        $(this).prevAll().add(this).removeClass("hoverChosen")
                    }
            ).click(function() {
                var observable = valueAccessor();    // Get the associated observable
                observable(index + 1);               // Write the new rating to it
            });
        });
    },
    update: function(element, valueAccessor) {
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).toggleClass("chosen", index < observable());
        });
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

