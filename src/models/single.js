/* Single Page Knockout.js application */

var folders = [
    'Inbox',
    'Archive',
    'Sent',
    'Spam',
    'Draft'
];

function WebmailViewModel() {

    /* Model */
    var self = this;

    // copy arrays
    self.setFolders = function(folders) {
        self.folders = folders.slice(0);
    };

    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();

    /* Behaviour */
    self.goToFolder = function(folder) {
        self.chosenFolderId(folder);
        // stop showing an email
        self.chosenMailData(null);
        var url = '/stub';
        var invalid = false;
        folder = folder.toLowerCase().trim();
        if (folder === "inbox") {
            url = url + '/inbox.json';
        } else if (folder === "archive") {
            url = url + '/archive.json';
        } else if (folder === "sent") {
            url = url + '/sent.json';
        } else if (folder === "draft") {
            url = url + '/draft.json';
        } else if (folder === "spam") {
            url = url + '/spam.json'
        } else {
            invalid = true;
        }
        if (!invalid) {
            $.get(url, {}, self.chosenFolderData);
        }
    };
    
    self.goToCurrentFolder = function() {
        self.goToFolder(self.chosenFolderId());
    };

    /* Input parameter is a mail print from a table view,
     * for an actual mail check the server ()stub.
     * Server tech can be NoSql database like mongoDB, replicated, sharded.
     * So retrieving of a mail mesage can be very fast operation.
     * For production an email can have an unique ID field to work with
     */
    self.goToMail = function(mail) {
        // stop showing an email folder
        self.chosenFolderData(null);
        // replace with a server-side data
        var url = "stub/mail/mail1.json";
        $.get(url, {}, self.chosenMailData);
    };
}

var webmailViewModel = new WebmailViewModel();
webmailViewModel.setFolders(folders);

ko.applyBindings(webmailViewModel);

webmailViewModel.goToFolder("Inbox");
