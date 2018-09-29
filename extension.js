// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const cp = require('child_process')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "haskell-pointfree" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.pointfree', function () {

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);

        const pointfree = cp.spawn('pointfree', [text]);
        const pointful = cp.spawn('pointful', [text]);

        pointfree.stdout.on('data', (data) => {
            vscode.window.showInformationMessage('pointfree: ' + data);
        });
        pointfree.stderr.on('data', (data) => {
            vscode.window.showInformationMessage('pointfree error: ' + data);
        });
        pointfree.on('error', (err) => {
            vscode.window.showInformationMessage('child process "pointfree" error code: ' + err.message + "\n" + 'Path: ' + process.env['PATH']);
        });

        pointful.stdout.on('data', (data) => {
            vscode.window.showInformationMessage('pointful: ' + data);
        });
        pointful.stderr.on('data', (data) => {
            vscode.window.showInformationMessage('pointful error: ' + data);
        });
        pointful.on('error', (err) => {
            vscode.window.showInformationMessage('child process "pointful" error code: ' + err.message + "\n" + 'Path: ' + process.env['PATH']);
        });

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;