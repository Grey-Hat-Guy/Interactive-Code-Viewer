const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

let lines = [];
let currentLine = 0;
let editor = null;
let interactiveMode = false;

function activate(context) {
  // Start Interactive Mode
  const startCommand = vscode.commands.registerCommand(
    "dev-interactive-code.interactiveCodeViewer",
    async () => {
      const filePath = await vscode.window.showInputBox({
        prompt: "Enter source file path",
        placeHolder: "C:\\Users\\GreyHat\\Desktop\\demo.js",
      });

      if (!filePath) {
        return;
      }

      try {
        const fullPath = path.resolve(filePath);

        if (!fs.existsSync(fullPath)) {
          vscode.window.showErrorMessage("File not found.");
          return;
        }

        const content = fs.readFileSync(fullPath, "utf8");

        lines = content.split(/\r?\n/);
        currentLine = 0;

        editor = vscode.window.activeTextEditor;

        if (!editor) {
          vscode.window.showErrorMessage("Open an empty file first.");
          return;
        }

        interactiveMode = true;

        vscode.window.showInformationMessage(
          `Loaded ${lines.length} lines. Press Enter to reveal code.`,
        );
      } catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    },
  );

  context.subscriptions.push(startCommand);

  // Intercept typing
  const typeCommand = vscode.commands.registerCommand("type", async (args) => {
    // If interactive mode is OFF
    // let VSCode behave normally
    if (!interactiveMode) {
      return vscode.commands.executeCommand("default:type", args);
    }

    // Only intercept ENTER
    if (args.text !== "\n" && args.text !== "\r") {
      return vscode.commands.executeCommand("default:type", args);
    }

    if (!editor) {
      interactiveMode = false;
      return;
    }

    if (currentLine >= lines.length) {
      interactiveMode = false;

      vscode.window.showInformationMessage("Finished displaying file.");

      return;
    }

    await editor.edit((edit) => {
      edit.insert(
        new vscode.Position(editor.document.lineCount, 0),
        lines[currentLine] + "\n",
      );
    });

    currentLine++;
  });

  context.subscriptions.push(typeCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
