DasomEditor.Editor = CLASS({

	preset : () => {
		return SkyDesktop.Tab;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.isForFTP
		//REQUIRED: params.path
		//OPTIONAL: params.content
		
		let isForFTP = params.isForFTP;
		let path = params.path;
		let content = params.content;
		
		let originContent = content;
		
		let title = self.getTitle();
		
		let checkIsForFTP = self.checkIsForFTP = () => {
			return isForFTP;
		};
		
		let getPath = self.getPath = () => {
			return path;
		};
		
		let setPath = self.setPath = (_path) => {
			//REQUIRED: path
			
			let editorOpenedStore = DasomEditor.IDE.getEditorOpenedStore();
			
			editorOpenedStore.remove(path);
			
			path = _path;
			
			editorOpenedStore.save({
				name : path,
				value : true
			});
		};
		
		let getContent = self.getContent = () => {
			return content;
		};
		
		let setOriginContent = self.setOriginContent = (_originContent) => {
			//REQUIRED: originContent
			
			originContent = _originContent;
			
			self.fireEvent('change');
		};
		
		let setScrollTop = self.setScrollTop = (scrollTop) => {
			//REQUIRED: scrollTop
		};
		
		let setTitle;
		OVERRIDE(self.setTitle, (origin) => {
			
			setTitle = self.setTitle = (_title) => {
				//REQUIRED: title
				
				title = _title;
				
				self.fireEvent('titlechange');
			};
			
			self.on('change', () => {
				if (self.getContent() !== originContent) {
					origin('* ' + title);
				} else {
					origin(title);
				}
			});
		});
		
		self.on('close', () => {
			
			if (self.getContent() !== originContent) {
				
				SkyDesktop.Confirm({
					msg : '저장하지 않았습니다. 정말 종료 하시겠습니까?'
				}, () => {
					
					self.remove();
				});
				
				return false;
			}
		});
	}
});
