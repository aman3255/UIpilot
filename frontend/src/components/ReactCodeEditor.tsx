import React, { useState, useEffect } from 'react';
import { Play, Download, Copy, Check, RotateCcw } from 'lucide-react';
import { Sandpack } from '@codesandbox/sandpack-react';
import Editor from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';

interface ReactCodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
  isRunning: boolean;
}

export const ReactCodeEditor: React.FC<ReactCodeEditorProps> = ({
  code,
  onCodeChange,
  onRunCode,
  isRunning
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState(code);
  const [sandpackKey, setSandpackKey] = useState(0);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Detect language from code content
  const detectLanguage = (code: string): 'tsx' | 'html' | 'javascript' | 'css' => {
    if (code.includes('import React') || code.includes('export default')) {
      return 'tsx';
    }
    if (code.includes('<html') || code.includes('<!DOCTYPE')) {
      return 'html';
    }
    if (code.includes('function') || code.includes('const') || code.includes('let')) {
      return 'javascript';
    }
    return 'tsx'; // Default to TSX for React components
  };

  const language = detectLanguage(code);

  // Get appropriate CodeMirror extension
  const getExtension = () => {
    switch (language) {
      case 'tsx':
      case 'javascript':
        return [javascript({ jsx: true, typescript: true })];
      case 'css':
        return [css()];
      case 'html':
        return [html()];
      default:
        return [javascript({ jsx: true, typescript: true })];
    }
  };

  // Simple code formatting (basic indentation)
  const formatCode = () => {
    try {
      // Basic formatting - you can enhance this later
      const formatted = code
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
      
      setFormattedCode(formatted);
      onCodeChange(formatted);
    } catch (error) {
      console.error('Formatting error:', error);
      setFormattedCode(code);
    }
  };

  // Copy code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Download code as file
  const downloadCode = () => {
    const extension = language === 'tsx' ? '.tsx' : language === 'css' ? '.css' : '.js';
    const filename = `component${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Create Sandpack files
  const createSandpackFiles = () => {
    // Clean and prepare the code for Sandpack
    let cleanCode = code;
    
    console.log('Original code:', code);
    console.log('Original code length:', code?.length);
    
    // If the code is empty or invalid, provide a default component
    if (!code || code.trim().length === 0) {
      cleanCode = `import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>No code generated yet</h1>
      <p>Generate some React code to see it here!</p>
    </div>
  );
};

export default App;`;
    } else {
      // Check if code is incomplete (missing closing braces, etc.)
      const openBraces = (code.match(/\{/g) || []).length;
      const closeBraces = (code.match(/\}/g) || []).length;
      const openParens = (code.match(/\(/g) || []).length;
      const closeParens = (code.match(/\)/g) || []).length;
      
      console.log('Code analysis:', { openBraces, closeBraces, openParens, closeParens });
      
      if (openBraces !== closeBraces || openParens !== closeParens) {
        console.log('Code appears to be incomplete, using fallback');
        cleanCode = `import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Code Generation Issue</h1>
      <p>The generated code appears to be incomplete. Please try again.</p>
      <pre style={{ textAlign: 'left', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
        {code}
      </pre>
    </div>
  );
};

export default App;`;
      } else {
        // If it's a component without proper export, add it
        if (code.includes('const') && (code.includes('React.FC') || code.includes('FC<')) && !code.includes('export default')) {
          const componentName = code.match(/const\s+(\w+):\s*React\.FC/)?.[1] || 
                               code.match(/const\s+(\w+):\s*FC/)?.[1] || 
                               'Component';
          cleanCode = code + `\n\nexport default ${componentName};`;
        }
        
        // If it's a function component without export, add it
        if (code.includes('function') && !code.includes('export default') && !code.includes('export {') && !code.includes('export const')) {
          const functionName = code.match(/function\s+(\w+)/)?.[1] || 'Component';
          cleanCode = code + `\n\nexport default ${functionName};`;
        }
        
        // If it's a const component without export, add it
        if (code.includes('const') && code.includes('=') && code.includes('(') && !code.includes('export default') && !code.includes('export {') && !code.includes('export const')) {
          const constName = code.match(/const\s+(\w+)\s*=/)?.[1] || 'Component';
          cleanCode = code + `\n\nexport default ${constName};`;
        }
        
        // If no React imports, add them
        if (!cleanCode.includes('import React')) {
          cleanCode = `import React from 'react';\n\n${cleanCode}`;
        }
      }
    }

    const files = {
      '/App.tsx': cleanCode,
      '/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    };

    console.log('Sandpack files:', files);
    return files;
  };

  useEffect(() => {
    setFormattedCode(code);
  }, [code]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'editor'
                ? 'bg-[#00FFB3] text-black'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'preview'
                ? 'bg-[#00FFB3] text-black'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={formatCode}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
            title="Format Code"
          >
            <RotateCcw size={16} />
            <span>Format</span>
          </button>
          <button
            onClick={copyCode}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
            title="Copy Code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={downloadCode}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
            title="Download Code"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
          <button
            onClick={() => {
              setSandpackKey(prev => prev + 1);
              setPreviewLoading(true);
              onRunCode();
              // Reset loading after a short delay
              setTimeout(() => setPreviewLoading(false), 1000);
            }}
            disabled={isRunning}
            className="bg-[#00FFB3] hover:bg-[#00CC8F] text-black px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
            title="Run Code"
          >
            {isRunning || previewLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-96">
        {activeTab === 'editor' ? (
          <div className="h-full">
            <Editor
              value={formattedCode}
              height="100%"
              theme={dracula}
              extensions={getExtension()}
              onChange={(value) => {
                setFormattedCode(value);
                onCodeChange(value);
              }}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                crosshairCursor: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                closeBracketsKeymap: true,
                defaultKeymap: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                completionKeymap: true,
                lintKeymap: true,
              }}
            />
          </div>
        ) : (
          <div className="h-full">
            {code && code.trim().length > 0 ? (
              <Sandpack
                key={sandpackKey}
                template="react-ts"
                files={createSandpackFiles()}
                theme="dark"
                options={{
                  showNavigator: false,
                  showTabs: false,
                  showLineNumbers: false,
                  showInlineErrors: true,
                  wrapContent: true,
                  editorHeight: '100%',
                  autorun: true,
                  recompileMode: "immediate",
                  recompileDelay: 300,
                  showConsole: true,
                  showConsoleButton: true,
                }}
                customSetup={{
                  dependencies: {
                    "react": "^18.0.0",
                    "react-dom": "^18.0.0",
                    "@types/react": "^18.0.0",
                    "@types/react-dom": "^18.0.0"
                  }
                }}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-900 text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">No Code to Preview</h3>
                  <p className="text-sm">Generate some React code first to see the preview here.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 