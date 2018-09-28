const electron = require('electron');
const {ipcRenderer} = electron;
const {getCurrentWindow, app, BrowserWindow, Menu} = require('electron').remote;
let addWindow;
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
function createAddWindow(){
  //create a new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item'
});
addWindow.loadURL(url.format({
  pathname: path.join(__dirname,'addWindow.html'),
  protocol:'file',
  slashes: true
}));
addWindow.on('close',function(e){
  addWindow = null;
});
}
signInButton.addEventListener('click', function(){
  const mainMenuTemplate = [
    {
    label: 'File',
    submenu:[
    {
      label: 'Quit',
      accelerator: process.platform === 'darwin' ? 'Cmd+Q':
      'Ctrl+Q',
      click(){
        app.quit();
      }
    },
    {
    label: 'Reload',
    accelerator: process.platform === 'darwin' ? 'Cmd+R':
    'Ctrl+R',
    click(){
      getCurrentWindow().reload()
    }
    }
      ]
    }];
  const userPower = [
    {
      label: 'Add',
      submenu:[
        {
          label:'Add Item',
          click(){
          createAddWindow();
          }
        },
        {
          label:'Clear Items',
          click(){
              mainWindow.webContents.send('item:clear');
              mainWindow.webContents.send('date:clear');
          }
        }
      ]
  }];
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  const userFunctions = Menu.buildFromTemplate(userPower);
  //let userOptions= [mainMenu, userFunctions];
  ipcRenderer.send('loginFuncTwo', mainMenu);
  ipcRenderer.send('loginFuncOne', userFunctions);
})
