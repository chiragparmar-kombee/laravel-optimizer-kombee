import * as vscode from 'vscode';
import axios from 'axios';

export async function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('laravelOptimizer.optimizeCode', async function () {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage("No active file to optimize!");
			return;
		}

		const code = editor.document.getText(editor.selection.isEmpty ? undefined : editor.selection);
		const instruction = await vscode.window.showInputBox({ prompt: 'Describe optimization (e.g., reduce SQL queries)' });
		if (!instruction) { return; }

		vscode.window.showInformationMessage("Optimizing code...");

		try {
			const { data } = await axios.post('http://localhost:4000/optimize', { code, instruction });

			const optimizedCode = data.optimizedCode.trim();
			const doc = editor.document;
			const edit = new vscode.WorkspaceEdit();

			if (editor.selection.isEmpty) {
				const start = new vscode.Position(0, 0);
				const end = new vscode.Position(doc.lineCount, 0);
				edit.replace(doc.uri, new vscode.Range(start, end), optimizedCode);
			} else {
				edit.replace(doc.uri, editor.selection, optimizedCode);
			}

			await vscode.workspace.applyEdit(edit);
			vscode.window.showInformationMessage("Laravel code optimized successfully!");
		} catch (err: any) {
			vscode.window.showErrorMessage("Error optimizing code: " + err.message);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
