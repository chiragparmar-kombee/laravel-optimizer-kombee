"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const axios_1 = __importDefault(require("axios"));
async function activate(context) {
    let disposable = vscode.commands.registerCommand('laravelOptimizer.optimizeCode', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active file to optimize!");
            return;
        }
        const code = editor.document.getText(editor.selection.isEmpty ? undefined : editor.selection);
        const instruction = await vscode.window.showInputBox({ prompt: 'Describe optimization (e.g., reduce SQL queries)' });
        if (!instruction) {
            return;
        }
        vscode.window.showInformationMessage("Optimizing code...");
        try {
            const { data } = await axios_1.default.post('http://localhost:8000/optimize', { code, instruction });
            const optimizedCode = data.optimizedCode.trim();
            const doc = editor.document;
            const edit = new vscode.WorkspaceEdit();
            if (editor.selection.isEmpty) {
                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(doc.lineCount, 0);
                edit.replace(doc.uri, new vscode.Range(start, end), optimizedCode);
            }
            else {
                edit.replace(doc.uri, editor.selection, optimizedCode);
            }
            await vscode.workspace.applyEdit(edit);
            vscode.window.showInformationMessage("Laravel code optimized successfully!");
        }
        catch (err) {
            vscode.window.showErrorMessage("Error optimizing code: " + err.message);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map