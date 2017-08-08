DasomEditor.JavaScriptEditor = CLASS({

	preset : () => {
		return DasomEditor.AceEditor;
	},
	
	params : () => {
		return {
			mode : 'javascript',
			icon : IMG({
				src : DasomEditor.R('icon/js.png')
			})
		}
	}
});
