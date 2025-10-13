# Laravel Optimizer Kombee

A VS Code extension that optimizes Laravel code using AI-powered suggestions. This extension helps developers improve their Laravel applications by providing intelligent code optimization recommendations.

## Features

- **AI-Powered Code Optimization**: Get intelligent suggestions to optimize your Laravel code
- **Custom Instructions**: Provide specific optimization instructions (e.g., "reduce SQL queries", "improve performance")
- **Selection-Based Optimization**: Optimize selected code blocks or entire files
- **Real-time Processing**: Quick optimization suggestions powered by AI

## Requirements

- VS Code 1.74.0 or higher
- Node.js and npm installed
- Laravel Optimizer AI server running on `http://localhost:4000`

## Usage

1. Open a Laravel PHP file in VS Code
2. Select the code you want to optimize (or leave empty to optimize the entire file)
3. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
4. Run the command "Laravel Optimizer: Optimize Code"
5. Enter your optimization instruction when prompted
6. The optimized code will replace your selection or file content

## Extension Settings

This extension does not contribute any VS Code settings at this time.

## Known Issues

- Requires the Laravel Optimizer AI server to be running locally
- Currently supports PHP files only

## Release Notes

### 0.0.1

Initial release of Laravel Optimizer Kombee extension.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
