SkyEditor.File = CLASS({

	preset : () => {
		return SkyDesktop.File;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.ftpInfo
		//REQUIRED: params.title
		
		let ftpInfo = params.ftpInfo;
		
		let title = params.title;
		
		let path = self.getPath();
		let folderPath = path.substring(0, path.lastIndexOf('/'));
		
		let getFTPInfo = self.getFTPInfo = () => {
			return ftpInfo;
		};
		
		let getFolderPath = self.getFolderPath = () => {
			return folderPath;
		};
		
		let Editor = SkyEditor.IDE.getEditor(title.substring(title.lastIndexOf('.') + 1).toLowerCase());
		
		if (Editor !== undefined) {
			self.setIcon(Editor.getIcon());
		}
		
		let isControlMode;
		let isShiftMode;
		
		let isDragging;
		let startDraggingLeft;
		let startDraggingTop;
		
		self.on('touchstart', (e) => {
			isDragging = true;
			startDraggingLeft = e.getLeft();
			startDraggingTop = e.getTop();
		});
		
		let touchmoveEvent = EVENT('touchmove', (e) => {
			
			if (SkyEditor.IDE.getDraggingShadow() === undefined) {
				
				if (
				isDragging === true && (
					Math.abs(startDraggingLeft - e.getLeft()) > 5 ||
					Math.abs(startDraggingTop - e.getTop()) > 5)
				) {
					
					if (CHECK_IS_IN({
						array : SkyEditor.IDE.getSelectedFileItems(),
						value : self
					}) !== true) {
						SkyEditor.IDE.selectFile(self);
					}
					
					let selectedFileItemsCount = SkyEditor.IDE.getSelectedFileItems().length;
					
					SkyEditor.IDE.setDraggingShadow(DIV({
						style : {
							position : 'fixed',
							left : e.getLeft() + 10,
							top : e.getTop() + 10
						},
						c : selectedFileItemsCount > 1 ? selectedFileItemsCount + '개 파일' : self.getTitle()
					}).appendTo(BODY));
				}
			}
		});
		
		let touchendEvent = EVENT('touchend', () => {
			if (isDragging === true) {
				isDragging = false;
			}
		});
		
		self.on('touchend', () => {
			if (SkyEditor.IDE.getDraggingShadow() !== undefined) {
				
				EACH(SkyEditor.IDE.getSelectedFileItems(), (selectedFileItem) => {
					
					let from = selectedFileItem.getPath();
					
					(SkyEditor.IDE.checkIsControlMode() === true ? SkyEditor.IDE.clone : SkyEditor.IDE.move)({
						fromFTPInfo : selectedFileItem.getFTPInfo(),
						toFTPInfo : ftpInfo,
						from : from,
						to : folderPath + '/' + from.substring(from.lastIndexOf('/') + 1)
					});
				});
			}
		});
		
		self.on('tap', (e) => {
			if (isControlMode === true) {
				SkyEditor.IDE.selectMultipleFile(self);
			} else if (isShiftMode === true) {
				SkyEditor.IDE.selectFileRange(self);
			} else {
				SkyEditor.IDE.selectFile(self);
			}
		});
		
		self.on('contextmenu', (e) => {
			
			if (CHECK_IS_IN({
				array : SkyEditor.IDE.getSelectedFileItems(),
				value : self
			}) !== true) {
				SkyEditor.IDE.selectFile(self);
			}
			
			SkyEditor.FileContextMenu({
				ftpInfo : ftpInfo,
				path : path,
				folderPath : folderPath,
				e : e
			});
			
			e.stop();
		});
		
		self.on('drop', (e) => {
			SkyEditor.IDE.setDropTargetInfo({
				ftpInfo : ftpInfo,
				folderPath : folderPath
			});
		});
		
		let checkControlKeydownEvent = EVENT('keydown', (e) => {
			if (e.getKey() === 'Control') {
				isControlMode = true;
			}
			if (e.getKey() === 'Shift') {
				isShiftMode = true;
			}
		});
		
		let checkControlKeyupEvent = EVENT('keyup', (e) => {
			if (e.getKey() === 'Control') {
				isControlMode = false;
			}
			if (e.getKey() === 'Shift') {
				isShiftMode = false;
			}
		});
		
		self.on('remove', () => {
			
			touchmoveEvent.remove();
			touchmoveEvent = undefined;
			
			touchendEvent.remove();
			touchendEvent = undefined;
			
			checkControlKeydownEvent.remove();
			checkControlKeydownEvent = undefined;
			
			checkControlKeyupEvent.remove();
			checkControlKeyupEvent = undefined;
		});
	}
});
