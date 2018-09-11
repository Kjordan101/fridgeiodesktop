const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow,Menu, ipcMain} = require('electron');

let mainWindow;
let addWindow;
//listen for app to be ready
app.on('ready', function(){
  //create a new window
  mainWindow = new BrowserWindow({});
  // load HTML file
  /*
  file://dirname(name of the directory)/index.HTML
  this way when a user downloads a program and the index is in a
  different file errors won't occur
  */
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'signIn.html'),
    protocol:'file',
    slashes: true
  }));
  //closes application when X button is pressed
  mainWindow.on('closed',function(){
    app.quit();
  })
  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//create New Windows

function createAddWindow(){
  //create a new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item'
  });
  // load HTML file
  /*
  file://dirname(name of the directory)/index.HTML
  this way when a user downloads a program and the index is in a
  different file errors won't occur
  */
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname,'addWindow.html'),
    protocol:'file',
    slashes: true
  }));
  addWindow.on('close',function(){
    addWindow = null;
  });
}
//catch item:add
ipcMain.on('item:add', function(e,item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close()
});
ipcMain.on('date:add', function(e,date){
  mainWindow.webContents.send('date:add', date);
});
//Create menu template
const mainMenuTemplate = [

  {
  label: 'File',
  submenu:[
    {
    label: 'Add Item',
    click(){
      createAddWindow();
    }
  },
  {
    label: 'Clear Items',
    click(){
      mainWindow.webContents.send('item:clear');
      mainWindow.webContents.send('date:clear');
    }
  },
  {
    label: 'Quit',
    accelerator: process.platform === 'darwin' ? 'command+Q':
    'Ctrl+Q',
    click(){
      app.quit();
    }
  }
    ]
  }
];
//create empty space for mac users
if(process.platform === 'darwin'){
  mainMenuTemplate.unshift({});
}
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu:[{
      label: 'Toggle DevTools',
      accelerator: process.platform === 'darwin' ? 'command+I':
      'Ctrl+I',
      click(item, focusedWindow){
        focusedWindow.toggleDevTools();
      }
    },
    {
      role: 'reload'
    }
  ]
});
}
