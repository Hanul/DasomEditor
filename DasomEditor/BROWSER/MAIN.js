DasomEditor.MAIN = METHOD({

	run : (params) => {

		DasomEditor.IDE.addEditor({
			extname : 'txt',
			editor : DasomEditor.TextEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'js',
			editor : DasomEditor.JavaScriptEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'json',
			editor : DasomEditor.JSONEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'babelrc',
			editor : DasomEditor.JSONEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'html',
			editor : DasomEditor.HTMLEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'css',
			editor : DasomEditor.CSSEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'hx',
			editor : DasomEditor.HaxeEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'as',
			editor : DasomEditor.ActionScriptEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'erl',
			editor : DasomEditor.ErlangEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'md',
			editor : DasomEditor.MarkdownEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'gml',
			editor : DasomEditor.GMLEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'php',
			editor : DasomEditor.PHPEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'xml',
			editor : DasomEditor.XMLEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'java',
			editor : DasomEditor.JavaEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'nsp',
			editor : DasomEditor.NSPEditor
		});
		
		DasomEditor.IDE.addEditor({
			extname : 'less',
			editor : DasomEditor.LessEditor
		});
	}
});
