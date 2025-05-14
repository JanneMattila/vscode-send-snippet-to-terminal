import { start } from 'repl';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposable1 = vscode.commands.registerCommand('send-snippet-to-terminal.send-multiline', async () => {
        const editor = vscode.window.activeTextEditor;
        let terminal = vscode.window.activeTerminal;

        if (!editor) {
            vscode.window.showWarningMessage("Send snippet to Terminal: No document open");
            return;
        }

        if (!terminal) {
            terminal = vscode.window.createTerminal();
            if (!terminal) {
                vscode.window.showWarningMessage("Send snippet to Terminal: No Terminal available");
                return;
            }
            terminal.show(true);
        }

        let text = "";
        if (editor.selection.isEmpty) {
            // No text selection, so let's expand the selection automatically
            let startLineNumber = editor.selection.start.line;
            let currentLineNumber = startLineNumber - 1;
            while (currentLineNumber >= 0) {
                let currentLineText = editor.document.lineAt(currentLineNumber);
                if (currentLineText.isEmptyOrWhitespace) {
                    // Empty
                    break;
                }

                if (!currentLineText.text.endsWith("`") &&
                    !currentLineText.text.endsWith("\\")) {
                    // No PowerShell ` (backtick) or Bash \ as indicating new line
                    break;
                }

                startLineNumber = currentLineNumber;
                currentLineNumber--;
            }

            let endLineNumber = editor.selection.end.line;
            currentLineNumber = endLineNumber;
            while (currentLineNumber < editor.document.lineCount) {
                let currentLineText = editor.document.lineAt(currentLineNumber);
                if (currentLineText.isEmptyOrWhitespace) {
                    // Empty
                    break;
                }

                endLineNumber = currentLineNumber;
                if (!currentLineText.text.endsWith("`") &&
                    !currentLineText.text.endsWith("\\")) {
                    // No PowerShell ` (backtick) or Bash \ as indicating new line
                    break;
                }

                currentLineNumber++;
            }

            const expandedRange = editor.document.validateRange(new vscode.Range(startLineNumber, 0, endLineNumber + 1, 0));
            text = editor.document.getText(expandedRange);
        }
        else {
            // There is already text selection, so let's use that
            text = editor.document.getText(editor.selection);
        }

        if (text.length > 0) {
            terminal.sendText(text);
        }
    });

    let disposable2 = vscode.commands.registerCommand('send-snippet-to-terminal.send-clear', async () => {
        const editor = vscode.window.activeTextEditor;
        let terminal = vscode.window.activeTerminal;

        if (!editor) {
            vscode.window.showWarningMessage("Send snippet to Terminal: No document open");
            return;
        }

        if (!terminal) {
            terminal = vscode.window.createTerminal();
            if (!terminal) {
                vscode.window.showWarningMessage("Send snippet to Terminal: No Terminal available");
                return;
            }
            terminal.show(true);
        }

        terminal.sendText("clear");
    });

    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
}

export function deactivate() { }
