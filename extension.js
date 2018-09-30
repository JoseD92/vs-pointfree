const vscode = require('vscode');
const cp = require('child_process')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    console.log('Congratulations, your extension "haskell-pointfree" is now active!');

    let disposable = vscode.commands.registerCommand('extension.pointfree', function () {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);

        const pointfree = cp.spawn('pointfree', [text]);
        const pointful = cp.spawn('pointful', [text]);

        pointfree.stdout.on('data', (pointfreeData) => {
            
            pointful.stdout.on('data', (pointfulData) => {
                
                vscode.window.showQuickPick([pointfreeData.toString(),pointfulData.toString()]).then(userSelection => {
                    // the user canceled the selection
                    if (!userSelection) {
                      return;
                    }
                    editor.edit((editBuilder)=>{
                        editBuilder.replace(selection,userSelection.replace(/(\r\n\t|\n|\r\t)/gm,""))
                    });
                  });

            });
            pointful.stderr.on('data', (data) => {
                vscode.window.showInformationMessage('pointful error: ' + data);
            });
            pointful.on('error', (err) => {
                vscode.window.showInformationMessage('child process "pointful" error code: ' + err.message + "\n" + 'Path: ' + process.env['PATH']);
            });

        });
        pointfree.stderr.on('data', (data) => {
            vscode.window.showInformationMessage('pointfree error: ' + data);
        });
        pointfree.on('error', (err) => {
            vscode.window.showInformationMessage('child process "pointfree" error code: ' + err.message + "\n" + 'Path: ' + process.env['PATH']);
        });

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;