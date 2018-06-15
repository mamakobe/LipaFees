/**
     * Handles the sign up button press.
     */
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbBDVLGgkYp3x2rw7wEwYccolxDjWCnSw",
    authDomain: "feodum-8812a.firebaseapp.com",
    databaseURL: "https://feodum-8812a.firebaseio.com/",
    projectId: "feodum-8812a",
    storageBucket: "feodum-8812a.appspot.com",
    messagingSenderId: "1084241232232"
  };
  firebase.initializeApp(config);

  
 
    
    $( document ).ready(function() {
      $('#signup').click(function(){ handleSignUp(); return false; });
      $('#signin').click(function(){ toggleSignIn(); return false; });
      $('#signout').click(function(){ signout(); return false; });
  });
     
    
     function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var fullname = document.getElementById('fullname').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          (user)=>{
         // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
            if(user){
              user.updateProfile({
                 displayName:'fullname', 
                // photoURL: // some photo url
              })
            }
        })
        
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }
      /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('emaillogin').value;
        var password = document.getElementById('passwordlogin').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          // Sign in success
          window.location.href = 'index.html'
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          
          // [END_EXCLUDE]
        });
        // [END authwithemail]
       
      
      }
    
    }

  function signout() {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      
    }).catch(function(error) {
      // An error happened.
    });
  }

   
  