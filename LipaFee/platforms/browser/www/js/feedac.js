var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

var db = firebase.firestore();
var jsonString;


$(document).ready(function(){
    
    $('#submitschool').click(function(){ AddSchool(); return false; });
    $('#submitstudent').click(function(){ AddStudent(); return false; });

    /*var selectField = $('#schools');
    var empIds = [101, 102, 103];
    var empNames = ['X', 'Y', 'Z'];
    var options = '';
    selectField.empty();
    for ( var i = 0, len = empIds.length; i < len; i++) {
        options += '<option value="' + empIds[i] + '">' + empNames[i] + '</option>';
    }
    selectField.append(options);*/

  });


  function GetSchools(){
    var tbody = document.getElementById('schools');
    var foo = {}; //NEW Object
    db.collection("school").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           
        foo.bank_transfer_code = doc.data().bank_transfer_code;
        foo.schoolname = doc.data().school_name ;
        jsonString = JSON.stringify(foo);
        console.log(jsonString);
 
//jsonString is now a "JSON Object" that holds the data found in object foo.
 //To see what it looks like.
          //  var option = "<option>";
           //var option = "<option value =" + doc.data().bank_transfer_code + ">" + doc.data().school_name  + "</option>";
    //tbody.innerHTML += option;
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
  
}

function AddStudent() {
    var studentname = document.getElementById('studentname').value;
    var admissionnumber = document.getElementById('admissionnumber').value;
    var e = document.getElementById("schools");
    var selectedbankcode = e.options[e.selectedIndex].value;
db.collection("student").add({
    user: email,
    stundent_name: studentname,
    student_admision_number: admissionnumber,
    bank_transfer_code: selectedbankcode,
   
})
}

