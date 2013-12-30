/* Tasklist App */

ko.bindingHandlers.starRating = {
    init: function(el, va) {
        $e = $(el);
        $e.addClass("starRating");
        for (i = 0; i < 5; i++) {
            $("span").appendTo($e);
        }
        $("span", el).each(function(index, element) {
            $(this).hover(function(e) {
                $(this).prevAll().add(this).addClass("hoverChosen"),
                        $(this).prevAll().add(this).removeClass("hoverChosen");
            }).click(function(e) {
                var observable = va();
                observable(index + 1);
            });
        });
    },
    update: function(el, va) {
        var observable = va();
        $("span", el).each(function(index) {
            $(this).toggleClass("chosen", index < observable);
        });
    }
};

var DEFAULT_TIMER = 15 * 60;
var DEFAULT_IMPORTANCE = 3;
var LAST_ID = 0;

function Task(todo, timer) {

    var self = this;

    /* what to do? */
    self.todo = ko.observable();
    /* timer */
    if (timer !== undefined) {
        self.timer = ko.observable(timer);
    } else {
        self.timer = ko.observable(DEFAULT_TIMER);
    }

    /* importance */
    self.importance = ko.observable(DEFAULT_IMPORTANCE);

    /* completed */
    self.completed = ko.observable(false);
    
    /* ID */
    self.id = LAST_ID + 1;
}

function TaskListViewModel() {
    var self = this;

    self.importance = ko.observable(4);
    self.todos = ko.observableArray();
    self.todo = ko.observable();

    self.addTask = function() {
        var newTask = new Task(self.todo());
        self.todos.push(newTask);
    };

    self.removeTask = function(task) {
        self.todos.remove(task);
    };
}

var taskListViewModel = new TaskListViewModel();

ko.applyBindings(taskListViewModel);



