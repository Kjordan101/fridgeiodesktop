let mainapp = {}
let userID = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    userID = user.userID
  }else{
    userID = null;
    location.replace('signIn.hmtl')
  }
});
function logOut(){
  firebase.auth().signOut();
}
mainapp.logOut = logOut;
