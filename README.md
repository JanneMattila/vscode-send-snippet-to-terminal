# VS Code Send snippet to Terminal

Send code snippet to Terminal by automatically expanding the code block to cover the multiline command.

## Features

This extension expands code block automatically before sending it to Terminal.
It works both with **Bash** and with **PowerShell**.

Example multiline command in **Bash**:

```bash
curl \
  -X GET \
  https://bing.com
```

Example multiline command in **PowerShell**:

```powershell
curl `
  -X GET `
  https://bing.com
```

Now if you execute `send-snippet-to-terminal.send-multiline` in VS Code
when your cursor is anywhere in those lines in your editor, then
extension will automatically select the entire block and then sends it to Terminal
for execution. This makes your script development _much_ faster.
Here is example 

To enable this command with handy keyboard shortcut like e.g., `Shift-Enter`,
then follow these instructions:

1. Open `Show all commands` (Windows: `Ctrl-shift-p` or `F1`).
2. Open `Preferences: Open keyboard shortcuts`.
3. Find `Send snippet to Terminal` and set that be your preferred shortcut e.g., `shift-enter`.

*Note:* You need to then search with that shortcut to remove other shortcuts
that might overlap with your selection.

## Extension Settings

* `send-snippet-to-terminal.send-multiline`: Send multiline command to Terminal.

## Release Notes

### 0.0.1

Initial release
