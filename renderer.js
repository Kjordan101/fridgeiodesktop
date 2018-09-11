// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtrQNUMVEtLrpMZn4FkCLSrySE2cVu2Qs",
    authDomain: "fridge-io-716a3.firebaseapp.com",
    databaseURL: "https://fridge-io-716a3.firebaseio.com",
    projectId: "fridge-io-716a3",
    storageBucket: "fridge-io-716a3.appspot.com",
    messagingSenderId: "660798288498"
  };
firebase.initializeApp(config);

let signUpButton = document.getElementById('signUpButton');
let signInButton = document.querySelector('#signInButton');
signUpButton.addEventListener('click', function(){
  let emailField = document.querySelector('#email').value;
  let passwordField = document.querySelector('#pw').value;

  firebase.auth().createUserWithEmailAndPassword(emailField,passwordField).then(function(){
    alert('User Created!')
    document.location.href = 'index.html';
  }).catch(function(error){
    if(error != null){
      console.log(error.message);
      return;
    }
  })
});
signInButton.addEventListener('click',function(){
  let emailField = document.querySelector('#email').value;
  let passwordField = document.querySelector('#pw').value;
  firebase.auth().signInWithEmailAndPassword(emailField, passwordField).then(function(){
    document.location.href = 'index.html';
  }).catch(function(error){
    if(error != null){
      console.log(error.message);
      return;
    }
  })
});
