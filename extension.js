const vscode = require('vscode');
const fs = require('fs');

function activate(context) {
    console.log('Extension activated.');

    let disposable = vscode.commands.registerCommand('dev-interactive-code.interactiveCodeViewer', async () => {
        const filePath = await vscode.window.showInputBox({
            prompt: 'Enter the file path',
            value: '', // Default value
            placeHolder: 'e.g., ./style.css',
        });

        if (filePath) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            let lines = fileContents.split(/\r?\n/);
            console.log('Lines:', lines);

            let currentLineIndex = 0;
            let insertedLines = [];
            let undoneLines = [];

            const editor = vscode.window.activeTextEditor;
            if (editor) {
                // Bind Enter key press event
                let disposable = vscode.commands.registerCommand('type', () => {
                    if (currentLineIndex < lines.length) {
                        const lineText = lines[currentLineIndex];
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(editor.document.lineCount, 0), lineText + '\n');
                        }).then(() => {
                            insertedLines.push(lineText);
                            currentLineIndex++;
                        });
                    } else {
                        vscode.window.showInformationMessage('All lines inserted.');
                    }
                });
                context.subscriptions.push(disposable);

                // Bind text document change event to track undoing of insertions
                let disposable2 = vscode.workspace.onDidChangeTextDocument(event => {
                    if (event.contentChanges.length === 1 && event.contentChanges[0].text === '') {
                        // Undo action detected
                        if (insertedLines.length > 0) {
                            let undoneLine = insertedLines.pop();
                            undoneLines.push(undoneLine);
                            currentLineIndex--;
                        }
                    }
                });
                context.subscriptions.push(disposable2);

                // Bind Enter key press event to re-display the last inserted line
                vscode.commands.registerCommand('extension.reInsertLastLine', () => {
                    if (undoneLines.length > 0) {
                        let reInsertedLine = undoneLines.pop();
                        editor.edit(editBuilder => {
                            editBuilder.insert(new vscode.Position(editor.document.lineCount, 0), reInsertedLine + '\n');
                        }).then(() => {
                            insertedLines.push(reInsertedLine);
                            currentLineIndex++;
                        });
                    }
                });
            }
        }
    });

    context.subscriptions.push(disposable);
}

module.exports = {
    activate
};