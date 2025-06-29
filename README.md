# VS Code Customizer

This is a fork of https://github.com/be5invis/vscode-custom-css.

The ability to hide unnecessary elements from the context menu of the editor is integrated here.

## Getting Started

1. Install this extension.

2. Add to `settings.json`:

   ```json
       "vscode_customizer.imports": [""]
       "vscode_customizer.editor_context_selectors": [
			"Peek",
			"^Switch",
			"^Go to",
			"Show AST"
    	]
   ```

   **VERY IMPORTANT**: Items in `vscode_customizer.imports` must be **URL**s. Plain file paths are **NOT URLs**.

   - **Windows File URL Example**: `file:///C:/Users/MyUserName/Documents/custom.css`
     - The `C:/` part is **REQUIRED.**

   - **MacOS and Linux File URL Example**: `file:///Users/MyUserName/Documents/custom.css`
   - [See here](https://en.wikipedia.org/wiki/File_URI_scheme) for more details.

3. Restart Visual Studio Code with proper permission to modify itself:

   1. **Windows**: Restart with Administrator Permission.

   2. **MacOS and Linux**: See instructions below.

4. Activate command "Reload VSCode Customizer".

5. Restart.

### **SPECIAL NOTE: If Visual Studio Code complains about that it is corrupted, simply click “Don't show again” or install [Fix VSCode Checksums Next](https://marketplace.visualstudio.com/items?itemName=RimuruChan.vscode-fix-checksums-next).**
### **NOTE: Every time after Visual Studio Code is updated, please re-enable extension.**
### **NOTE: Every time you change the configuration, please re-enable extension.**

## Extension commands

As you know to access the command palette and introduce commands you can use ***F1*** (all OSes), ***Ctrl+Shift+P*** (Windows & Linux) or ***Cmd+Shift+P*** (OS X).

- ***Enable VSCode Customizer***: It enables VSCode Customizer URLs listed in “`vscode_customizer.imports`”, an array containing URLs of your VSCode Customizer files, in your user settings.
- ***Disable VSCode Customizer***: It will disable custom CSS.
- ***Reload VSCode Customizer***: Disable and then re-enable it.

## Windows users

**In Windows, make sure you run your Visual Studio Code in Administrator mode before enabling or disabling your custom style!**

## Mac and Linux users
**The extension would NOT work if Visual Studio Code cannot modify itself.** The cases include:

- Code files being read-only, like on a read-only file system or,
- Code is not started with the permissions to modify itself.

**You need to claim ownership on Visual Studio Code's installation directory, by running this command**:

```sh
sudo chown -R $(whoami) "$(which code)"
sudo chown -R $(whoami) /usr/share/code
```

The placeholder `<Path to Visual Studio Code>` means the path to VSCode installation. It is typically:

- `/Applications/Visual Studio Code.app/Contents/MacOS/Electron`, on MacOS;
- `/Applications/Visual Studio Code - Insiders.app/Contents/MacOS/Electron`, on MacOS when using Insiders branch;
- `/usr/share/code`, on most Linux;
- `/usr/lib/code/` or `/opt/visual-studio-code` on Arch Linux.

Mac and Linux package managers may have customized installation path. Please double check your path is correct.

## Variables

File URIs support VSCode variables like: `${userHome}`. It just replaces supported variables with their values before parsing into a file path. Supported variables are:

- `${cwd}`
- `${userHome}`
- `${execPath}`
- `${pathSeparator}`, `${/}`

It also supports env variables like `${env:ENV_VAR_NAME}` and you can specify a fallback value like `${env:ENV_VAR:defaultvalue}`


### Example

```json
"vscode_customizer.imports": ["file://${userHome}/.config/vscode-styles.css"]
```

# Disclaimer

This extension modifies some Visual Studio Code files so use it at your own risk.
Currently, icons are not supported by the extension functionality that Visual Studio Code provides so this extension solves this issue by injecting code into:

- `electron-browser/index.html`.

The extension will keep a copy of the original file in case something goes wrong. That's what the disable command will do for you.

As this extension modifies Visual Studio Code files, it will get disabled with every Visual Studio Code update. You will have to enable icons again via the command palette.

Take into account that this extension is still in beta, so you may find some bugs while playing with it. Please, report them to [the issues section of the Github's repo](https://github.com/be5invis/vscode-custom-css/issues).

**Please, leave a review if you can, so the Visual Studio Code Team can know that this is a very demanded feature and, maybe, they can then provide a proper way to extend the IDE regarding icons and customizations soon enough. ;D**

More file extensions will be supported shortly!
