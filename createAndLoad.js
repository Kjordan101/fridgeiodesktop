const electron = require('electron');
const path = require('path');
const url = require('url');
const firebase = require('firebase');
const {getCurrentWindow, app, BrowserWindow, Menu} = require('electron').remote;
let addWindow;
  function createAddWindow(){
    //create a new window
    addWindow = new BrowserWindow({
      width: 300,
      height: 200,
      title: 'Add Shopping List Item'
  })
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname,'addWindow.html'),
    protocol:'file',
    slashes: true
  }));
  addWindow.on('close',function(e){
    addWindow = null;
  });
};
