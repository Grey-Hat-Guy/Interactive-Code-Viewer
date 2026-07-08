# Interactive Code Viewer

Interactive Code Viewer is a Visual Studio Code extension that lets you reveal the contents of a source code file one line at a time. Instead of displaying an entire file at once, the extension inserts each line into the active editor whenever you press **Enter**.

This makes it useful for live coding sessions, classroom demonstrations, presentations, and explaining code step by step without exposing the complete implementation immediately.

## Features

- Reveal source code one line at a time.
- Display code progressively by pressing **Enter**.
- Works with any plain text or source code file.
- Lightweight with no additional configuration required.
- Ideal for teaching, presentations, interviews, and interactive code walkthroughs.

## Requirements

- Visual Studio Code **1.87.0** or later.

## How to Use

1. Open an empty file (or the file where you want the code to be displayed).
2. Open the Command Palette (`Ctrl + Shift + P`).
3. Run **Interactive Code**.
4. Enter the path of the source file you want to display.
5. Press **Enter** repeatedly to reveal each line of the source file.

## Example Workflow

Source file:

```javascript
function greet(name) {
  console.log(`Hello, ${name}`);
}

greet("World");
```

After starting the extension:

**First Enter**

```javascript
function greet(name) {
```

**Second Enter**

```javascript
function greet(name) {
    console.log(`Hello, ${name}`);
```

Continue pressing **Enter** until the entire file has been displayed.

## Known Limitations

- The extension currently appends each revealed line to the end of the active editor.
- The source file must exist and be accessible from the provided path.

## Release Notes

### 0.0.2

- Fixed an issue where the extension could not be started more than once without restarting the Extension Development Host.
- Improved command registration to prevent duplicate command errors.
- Improved file loading and error handling.
- Enhanced extension stability and overall user experience.

### 0.0.1

- Initial release of Interactive Code Viewer.
- Supports progressive line-by-line code display using the Enter key.

## Repository

GitHub: https://github.com/Grey-Hat-Guy/Interactive-Code-Viewer

---

If you find this extension useful or have suggestions for improvements, feel free to open an issue or contribute to the project.
