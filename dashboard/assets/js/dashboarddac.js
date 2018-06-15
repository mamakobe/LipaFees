
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbBDVLGgkYp3x2rw7wEwYccolxDjWCnSw",
    authDomain: "feodum-8812a.firebaseapp.com",
    databaseURL: "https://feodum-8812a.firebaseio.com",
    projectId: "feodum-8812a",
    storageBucket: "feodum-8812a.appspot.com",
    messagingSenderId: "1084241232232"
  };
  firebase.initializeApp(config);
  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

$(document).ready(function(){
     
    $('#submitschool').click(function(){ AddSchool(); return false; });
   

    
   
  });

function AddSchool() {
    var schoolname = document.getElementById('schoolname').value;
    var banktransfernumber = document.getElementById('banktransfernumber').value;

db.collection("school").add({
    school_name: schoolname,
    bank_transfer_code: banktransfernumber
   
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    //document.getElementById('message').value = "Document written with ID: " + docRef.id;
})
.catch(function(error) {
    console.error("Error adding document: ", error);
    //document.getElementById('message').value = "Error adding document: " + error;
});
}

function GetSchools(){
    var tbody = document.getElementById('tbody');
    db.collection("school").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var tr = "<tr>";
            tr += "<td>" + doc.id + "</td>" + "<td> " + doc.data().school_name + "</td>" + "<td> " + doc.data().bank_transfer_code+ "</td></tr>";

            
             /* We add the table row to the table body */
    tbody.innerHTML += tr;
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });

}


