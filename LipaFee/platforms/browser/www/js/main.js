'use strict';



$$(document).on('page:init', function (e) {
    // Or we can trigger it manually:
    contactsCallback.trigger(); 
    
     
     
   })
   var contactsCallback = myApp.onPageInit('student-info', function (page) {
    addOption();
    CreateTableFromJSON();
    console.log('student-info page initialized');
    console.log(page);
  });
// Initializes FriendlyChat.
function FriendlyChat() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.submitstudentButton = document.getElementById('submitstudent');
  this.studentForm = document.getElementById('student-form');
  this.userName = document.getElementById('user-name');
  
  

  // Saves message on form submit.
  //this.submitstudentButton.addEventListener('click',  this.saveMessage.bind(this));
   /*this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  this.submitImageButton.addEventListener('click', function(e) {
    e.preventDefault();
    this.mediaCapture.click();
  }.bind(this));
  this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));*/

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  };


// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
    if (user) { // User is signed in!
      // Get profile pic and user's name from the Firebase user object.
      var profilePicUrl = user.photoURL;
      var userName = user.displayName;
  
      // Set the user's profile pic and name.
      //this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
     // this.userName.textContent = userName;
  
      // Show user's profile and sign-out button.
      //this.userName.removeAttribute('hidden');
      //this.userPic.removeAttribute('hidden');
      //this.signOutButton.removeAttribute('hidden');
  
      // Hide sign-in button.
      //this.signInButton.setAttribute('hidden', 'true');
  
      // We load currently existing chant messages.
      //this.loadMessages();
  
      // We save the Firebase Messaging Device token and enable notifications.
      //this.saveMessagingDeviceToken();
    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      //this.userName.setAttribute('hidden', 'true');
      //this.userPic.setAttribute('hidden', 'true');
      //this.signOutButton.setAttribute('hidden', 'true');
  
      // Show sign-in button.
      //this.signInButton.removeAttribute('hidden');
    }
  };
// Returns true if user is signed-in. Otherwise false and displays a message.
function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    var auth = firebase.auth();
    if (auth.currentUser) {
      return true;
    }
  
    // Display a message to the user using a Toast.
    var data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
   // this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return false;
  };
// Saves the messaging device token to the datastore.
FriendlyChat.prototype.saveMessagingDeviceToken = function() {
    firebase.messaging().getToken().then(function(currentToken) {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        firebase.database().ref('/fcmTokens').child(currentToken)
            .set(firebase.auth().currentUser.uid);
      } else {
        // Need to request permissions to show notifications.
        this.requestNotificationsPermissions();
      }
    }.bind(this)).catch(function(error){
      console.error('Unable to get messaging token.', error);
    });
  };

  // Requests permissions to show notifications.
FriendlyChat.prototype.requestNotificationsPermissions = function() {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
      // Notification permission granted.
      this.saveMessagingDeviceToken();
    }.bind(this)).catch(function(error) {
      console.error('Unable to get permission to notify.', error);
    });
  };
// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.loadMessages = function() {
    // Reference to the /messages/ database path.
    this.messagesRef = this.database.ref('students');
    // Make sure we remove all previous listeners.
    this.messagesRef.off();
  
    // Loads the last 12 messages and listen for new ones.
   // var setMessage = function(data) {
     // var val = data.val();
      //this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
   // }.bind(this);
    //this.messagesRef.limitToLast(12).on('child_added', setMessage);
    //this.messagesRef.limitToLast(12).on('child_changed', setMessage);
  };

 
  // Saves a new message on the Firebase DB.
function saveMessage() {
    console.log('SaveMessage function');
   // e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (checkSignedInWithMessage()) {
      var  auth = firebase.auth();
      var currentUser = auth.currentUser;
      var studentname = document.getElementById('studentname');
      var admissionnumber = document.getElementById('admissionnumber');
      var e = document.getElementById("schools-select");
      var selectedbankcode = e.options[e.selectedIndex].value;
      var selectedschool = e.options[e.selectedIndex].text;
      // Add a new message entry to the Firebase Database.
      //firebase.database().ref('students/' + currentUser.uid + "/" + admissionnumber.value).set({
      //  stundent_name: studentname.value,
        //student_admision_number: admissionnumber.value,
       // bank_transfer_code: selectedbankcode
      //});
      
 // A post entry.
 var postData = {
    stundent_name: studentname.value,
    student_admision_number: admissionnumber.value,
    school: selectedschool,
    bank_transfer_code: selectedbankcode
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('students').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  //updates['/posts/' + newPostKey] = postData;
  updates['/students/' + currentUser.uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);





      
      /*this.messagesRef.push({
        name: currentUser.email,
        stundent_name: this.studentname,
        student_admision_number: this.admissionnumber,
        bank_transfer_code: this.selectedbankcode
        //text: this.messageInput.value,
        //photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
      }).then(function() {
        // Clear message text field and SEND button state.
        //FriendlyChat.resetMaterialTextfield(this.messageInput);
        //this.toggleButton();
      }.bind(this)).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });*/
    }
  };


  function SaveandReload()
  {
    saveMessage();
    
       // app.dialog.alert('Student added sucessfully.');
       mainView.router.refreshPage();
      
  }
// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
      window.alert('You have not configured and imported the Firebase SDK. ' +
          'Make sure you go through the codelab setup instructions and make ' +
          'sure you are running the codelab using `firebase serve`');
    }
  };
  

  function addOption(){
    var select = document.getElementById("schools-select");
    select.options[select.options.length] = new Option('New Element', '0', false, false);
}

function GetStudentsByLoggedinUser()
{
    var userId = firebase.auth().currentUser.uid;
    //Debuging
    console.log(userId);
return firebase.database().ref('/students/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  var log = snapshot.val();
  console.log(log);
  
  // Get the first key in log
var uid = Object.keys(log); 
console.log(uid);
var table = document.getElementById("students-table");

// Get the kit object
var i;
for (i = 0; i < uid.length; i++) { 
  console.log(log[uid[i]].stundent_name);
  console.log(log[uid[i]].student_admision_number);
  console.log(log[uid[i]].bank_transfer_code);
 
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = log[uid[i]].stundent_name;
    cell2.innerHTML = log[uid[i]].bank_transfer_code;
}  

var header = table.createTHead();
var row = header.insertRow(0);
var cell = row.insertCell(0);
var row1 = header.insertRow(1);
var cell1 = row.insertCell(1);
cell.innerHTML = "Name";
cell1.innerHTML = "School";
});
}

function CreateTableFromJSON() {
    GetStudentsByLoggedinUser();
  /*  var myBooks = [
        {
            "Book ID": "1",
            "Book Name": "Computer Architecture",
            "Category": "Computers",
            "Price": "125.60"
        },
        {
            "Book ID": "2",
            "Book Name": "Asp.Net 4 Blue Book",
            "Category": "Programming",
            "Price": "56.00"
        },
        {
            "Book ID": "3",
            "Book Name": "Popular Science",
            "Category": "Science",
            "Price": "210.40"
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("students-table");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);*/
}

  window.onload = function() {
    window.friendlyChat = new FriendlyChat();
  };