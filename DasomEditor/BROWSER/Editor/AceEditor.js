DasomEditor.AceEditor = CLASS({

	preset : () => {
		return DasomEditor.Editor;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.mode
		//OPTIONAL: params.content
		
		let mode = params.mode;
		let content = params.content;
		
		let editor;
		
		self.append(editor = DIV({
			style : {
				height : '100%'
			},
			c : content
		}));
		
		let aceEditor = ace.edit(editor.getEl());
		aceEditor.setTheme('ace/theme/twilight');
		aceEditor.setFontSize(14);
		if (mode !== undefined) {
			aceEditor.getSession().setMode('ace/mode/' + mode);
		}
		aceEditor.getSession().setUseWrapMode(true);
		aceEditor.renderer.setScrollMargin(0, 300);
		aceEditor.commands.addCommand({
			name : 'replace2',
			bindKey : {
				win : 'Ctrl-R',
				mac : 'Command-Option-F'
			},
			exec : (editor) => {
				
				require('ace/config').loadModule('ace/ext/searchbox', (e) => {
					
					e.Search(editor, true);
					
					let kb = editor.searchBox.$searchBarKb;
					
					let command = kb.commands['Ctrl-f|Command-f|Ctrl-H|Command-Option-F'];
					
					if (command.bindKey.indexOf('Ctrl-R') === -1) {
						command.bindKey += '|Ctrl-R';
						kb.addCommand(command);
					}
				});
			}
		});
		
		let getContent;
		OVERRIDE(self.getContent, (origin) => {
			
			getContent = self.getContent = () => {
				return aceEditor.getValue();
			};
		});
	}
});
