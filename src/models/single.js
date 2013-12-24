/* Single Page KKnockout.js application */

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
        console.log("goToFolder");
        self.chosenFolderId(folder);
        // stop showing an email
        self.chosenMailData(null);
        var url = '/stub';
        var invalid = false;
        folder = folder.toLowerCase().trim();
        console.log(folder);
        if (folder === "inbox") {
            url = url + '/inbox.json';
        } else if (folder === "archive") {
            url = url + '/archive.json';
        } else if (folder === "sent") {
            url = url + '/sent.json';
        } else if (folder === "draft") {
            url = url + '/draft.json';
        } else if (folder === "spam") {
            url = url + '/spam.json';
        } else {
            invalid = true;
        }
        console.log(invalid);
        console.log(invalid !== false);
        if (!invalid) {
            $.get(url, {}, self.chosenFolderData);
        }
    };
    
    self.goToMail = function(mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null);
        $.get('', {}, self.chosenMailData);
    };
}

var webmailViewModel = new WebmailViewModel();
webmailViewModel.setFolders(folders);

ko.applyBindings(webmailViewModel);
