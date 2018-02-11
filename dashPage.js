
function checkerBoi(){

  if(sessionStorage.SpandanSessionValue){
    console.log(sessionStorage.SpandanSessionValue);
    updateDisplay();
  }
  else{
    console.log("no value found");
    fb_login();
  }
}

function updateDisplay(){

  document.getElementById("changeImg").src = "yourTextHere";
  document.getElementById("changeName").innerHTML = "Himank Pathak";
  document.getElementById("changeSPId").innerHTML = "yourTextHere";

}

function firebasekaAuth(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

function fb_login(){
     FB.login( function(response) {}, { scope: 'public_profile,email' } );
     checkLoginState();
 }

function checkLoginState() {
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
   console.log(response);
 });
  function statusChangeCallback(response) {
   if (response.status === 'connected') {
     // Logged into your app and Facebook.
     facebookMain();
      } else {
        console.log("Please log into Facebook");
        fb_login();
        // The person is not logged into your app or we are unable to tell.
      //document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    }
  }
}

function facebookMain() {
    firebasekaAuth();
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me','GET',{"fields":"id,name,picture.width(400).height(400),email,hometown"},
    function(response) {
      console.log('Successful login for: ' + response.name);
      var uid=response.id;
      var urlpic=response.picture.data.url;
      var name=response.name;
      var email=response.email;
      sessionStorage.SpandanSessionValue=uid;
      console.log(sessionStorage.SpandanSessionValue);
      window.location.href = "dashboard.html";
      //window.open("localhost:8000/dashboard.html", "_self")
    });
}


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAiOppk8kOawDGEp5QJ8vk4y5mOFwRKqzU",
  authDomain: "spandan-3f863.firebaseapp.com",
  databaseURL: "https://spandan-3f863.firebaseio.com",
  projectId: "spandan-3f863",
  storageBucket: "spandan-3f863.appspot.com",
  messagingSenderId: "285489957582"
};
firebase.initializeApp(config);

//FACEBOOK
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1771257743178792',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   //ENDS INITIALIZATION
   var database = firebase.database();
   var spandanId;
checkerBoi();