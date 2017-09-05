DasomEditor.IDE = OBJECT({
	
	preset : () => {
		return TABLE;
	},
	
	params : () => {
		return {
			style : {
				position : 'absolute',
				width : '100%',
				height : '100%'
			}
		};
	},

	init : (inner, self) => {
		
		let showHomeHandler;
		let loadHandler;
		let saveHandler;
		let copyHandler;
		let pasteHandler;
		let removeHandler;
		let moveHandler;
		let getInfoHandler;
		
		let workspacePath;
		
		let editorMap = {};
		let editorSettingStore = DasomEditor.STORE('editorSettingStore');
		let editorOpenedStore = DasomEditor.STORE('editorOpenedStore');
		
		let draggingShadow;
		
		let addEditor = self.addEditor = (params) => {
			//REQUIRED: params
			//REQUIRED: params.extname
			//REQUIRED: params.editor
			
			let extname = params.extname;
			let editor = params.editor;
			
			if (editorMap[extname] === undefined) {
				editorMap[extname] = [];
			}
			
			editorMap[extname].push(editor);
		};
		
		let getEditor = self.getEditor = (extname) => {
			
			let SelectedEditor = DasomEditor.TextEditor;
			
			if (editorSettingStore !== undefined) {
				
				let editorName = editorSettingStore.get(extname);
				
				if (editorMap[extname] !== undefined) {
					EACH(editorMap[extname], (editor) => {
						if (editorName === undefined || editor.getName() === editorName) {
							SelectedEditor = editor;
							return false;
						}
					});
				}
			}
			
			return SelectedEditor;
		};
		
		let getEditorOpenedStore = self.getEditorOpenedStore = () => {
			return editorOpenedStore;
		};
		
		let toolbar;
		self.append(TR({
			c : TD({
				style : {
					height : 28
				},
				c : toolbar = SkyDesktop.Toolbar({
					buttons : [SkyDesktop.ToolbarButton({
						icon : IMG({
							src : DasomEditor.R('icon/home.png')
						}),
						title : '홈',
						on : {
							tap : () => {
								showHomeHandler();
							}
						}
					}), SkyDesktop.ToolbarButton({
						icon : IMG({
							src : SkyDesktop.R('file.png')
						}),
						title : '새 파일',
						on : {
							tap : () => {
								openEditor(DasomEditor.TextEditor({
									title : '제목 없음'
								}));
							}
						}
					}), SkyDesktop.ToolbarButton({
						icon : IMG({
							src : DasomEditor.R('icon/save.png')
						}),
						title : '저장',
						on : {
							tap : () => {
								
								let activeTab = editorGroup.getActiveTab();
								
								if (activeTab.checkIsInstanceOf(DasomEditor.Editor) === true) {
									saveHandler(activeTab);
								}
							}
						}
					}), SkyDesktop.ToolbarButton({
						icon : IMG({
							src : DasomEditor.R('icon/setting.png')
						}),
						title : '에디터 설정',
						on : {
							tap : () => {
								
								let list;
								
								SkyDesktop.Confirm({
									okButtonTitle : '저장',
									style : {
										onDisplayResize : (width, height) => {
						
											if (width > 600) {
												return {
													width : 500
												};
											} else {
												return {
													width : '90%'
												};
											}
										}
									},
									msg : [H2({
										style : {
											fontWeight : 'bold'
										},
										c : '에디터 설정'
									}), list = DIV({
										style : {
											marginTop : 8,
											overflowY : 'scroll',
											padding : 8,
											backgroundColor : '#e0e1e2',
											border : '1px solid #999',
											borderRadius : 4,
											textAlign : 'left',
											onDisplayResize : (width, height) => {
							
												if (height > 500) {
													return {
														height : 300
													};
												} else {
													return {
														height : 150
													};
												}
											}
										}
									})]
								}, () => {
									
								});
								
								EACH(editorMap, (editors, extname) => {
									
									let editorList = DIV({
										style : {
											padding : '5px 8px',
											backgroundColor : '#fff',
											border : '1px solid #999',
											borderRadius : 4,
											marginBottom : 10
										},
										c : H3({
											style : {
												marginBottom : 5
											},
											c : [SPAN({
												style : {
													fontWeight : 'bold'
												},
												c : extname
											}), ' 파일 에디터 선택']
										})
									}).appendTo(list);
									
									EACH(editors, (editor, i) => {
										
										let input;
										editorList.append(P({
											c : [input = INPUT({
												style : {
													marginTop : 2,
													flt : 'left'
												},
												type : 'radio',
												name : extname,
												value : (editorSettingStore.get(extname) === undefined && i === 0) || editorSettingStore.get(extname) === editor.getName(),
												on : {
													change : () => {
														editorSettingStore.save({
															name : extname,
															value : editor.getName()
														});
													}
												}
											}), UUI.BUTTON_H({
												style : {
													marginLeft : 5,
													flt : 'left'
												},
												icon : editor.getIcon(),
												spacing : 5,
												title : editor.getName(),
												on : {
													tap : () => {
														input.toggleCheck();
													}
												}
											}), CLEAR_BOTH()]
										}));
									});
								});
							}
						}
					})]
				})
			})
		}));
		
		let addToolbarButton = self.addToolbarButton = (toolbarButton) => {
			toolbar.addButton(toolbarButton);
		};
		
		let openEditor = self.openEditor = (tab) => {
			
			editorGroup.addTab(tab);
			
			if (tab.checkIsInstanceOf(DasomEditor.Editor) === true) {
				
				tab.on('scroll', RAR((e) => {
					
					editorOpenedStore.save({
						name : tab.getPath(),
						value : tab.getScrollTop()
					});
				}));
				
				tab.on('remove', () => {
					editorOpenedStore.remove(tab.getPath());
				});
			}
			
			return tab;
		};
		
		let closeAllEditors = self.closeAllEditors = () => {
			editorGroup.removeAllTabs();
		};
		
		let loadAndOpenEditor = (path, scrollTop, next) => {
			
			loadHandler(path, {
				
				error : () => {
					editorOpenedStore.remove(path);
				},
				
				success : (content) => {
					
					let fileName = path.substring(path.lastIndexOf('/') + 1);
					
					let editor = openEditor(getEditor(fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase())({
						title : fileName,
						path : path,
						content : content
					}));
					
					if (scrollTop !== undefined) {
						editor.setScrollTop(scrollTop);
					}
					
					if (next !== undefined) {
						next();
					}
				}
			});
		};
		
		let fileTree;
		let ftpFileTree;
		
		let editorGroup;
		self.append(TR({
			c : TD({
				c : SkyDesktop.HorizontalTabList({
					tabs : [SkyDesktop.Tab({
						size : 23,
						c : SkyDesktop.TabGroup({
							activeTabIndex : 0,
							tabs : [SkyDesktop.Tab({
								isCannotClose : true,
								icon : IMG({
									src : DasomEditor.R('icon/workspace.png')
								}),
								title : '작업 폴더',
								c : fileTree = SkyDesktop.FileTree(loadAndOpenEditor),
								on : {
									contextmenu : (e) => {
										
										DasomEditor.FileContextMenu({
											folderPath : workspacePath,
											e : e
										});
										
										e.stop();
									}
								}
							}), SkyDesktop.Tab({
								isCannotClose : true,
								icon : IMG({
									src : DasomEditor.R('icon/ftp.png')
								}),
								title : 'FTP',
								c : [UUI.BUTTON_H({
									style : {
										position : 'relative',
										marginLeft : 20,
										padding : '2px 5px'
									},
									icon : IMG({
										src : DasomEditor.R('icon/ftp.png')
									}),
									title : '새 FTP 연결',
									spacing : 5,
									c : UUI.ICON_BUTTON({
										style : {
											position : 'absolute',
											left : -12,
											top : 3,
											color : BROWSER_CONFIG.SkyDesktop !== undefined && BROWSER_CONFIG.SkyDesktop.theme === 'dark' ? '#444' : '#ccc'
										},
										icon : FontAwesome.GetIcon('plus'),
										on : {
											mouseover : (e, self) => {
												self.addStyle({
													color : BROWSER_CONFIG.SkyDesktop !== undefined && BROWSER_CONFIG.SkyDesktop.theme === 'dark' ? '#666' : '#999'
												});
												e.stop();
											},
											mouseout : (e, self) => {
												self.addStyle({
													color : BROWSER_CONFIG.SkyDesktop !== undefined && BROWSER_CONFIG.SkyDesktop.theme === 'dark' ? '#444' : '#ccc'
												});
												e.stop();
											}
										}
									}),
									on : {
										tap : (e) => {
											
											let form;
											let privateKeyInput;
											
											SkyDesktop.Confirm({
												okButtonTitle : '저장',
												msg : form = UUI.VALID_FORM({
													errorMsgs : {
														name : {
															notEmpty : '사이트 이름을 입력해주세요.'
														},
														host : {
															notEmpty : '호스트를 입력해주세요.'
														},
														username : {
															notEmpty : '아이디를 입력해주세요.'
														}
													},
													errorMsgStyle : {
														color : 'red'
													},
													c : [INPUT({
														style : {
															width : 222,
															padding : 8,
															border : '1px solid #999',
															borderRadius : 4
														},
														name : 'name',
														placeholder : '사이트 이름'
													}), SELECT({
														style : {
															marginTop : 10,
															width : 240,
															padding : 8,
															border : '1px solid #999',
															borderRadius : 4
														},
														name : 'protocol',
														c : [OPTION({
												            value : 'ftp',
												            c : 'FTP'
												        }), OPTION({
												            value : 'sftp',
												            c : 'SFTP'
												        })],
												        on : {
												        	change : (e, select) => {
												        		if (select.getValue() === 'sftp') {
												        			privateKeyInput.show();
												        		} else {
												        			privateKeyInput.hide();
												        		}
												        	}
												        }
													}), INPUT({
														style : {
															marginTop : 10,
															width : 222,
															padding : 8,
															border : '1px solid #999',
															borderRadius : 4
														},
														name : 'host',
														placeholder : '호스트'
													}), INPUT({
														style : {
															marginTop : 10,
															width : 222,
															padding : 8,
															border : '1px solid #999',
															borderRadius : 4
														},
														name : 'username',
														placeholder : '로그인 아이디'
													}), INPUT({
														style : {
															marginTop : 10,
															width : 222,
															padding : 8,
															border : '1px solid #999',
															borderRadius : 4
														},
														name : 'password',
														placeholder : '비밀번호'
													}), privateKeyInput = DIV({
														style : {
															display : 'none',
															marginTop : 10
														},
														c : [H3({
															c : 'Private Key'
														}), INPUT({
															style : {
																marginTop : 5,
																width : 222,
																padding : 8,
																border : '1px solid #999',
																borderRadius : 4
															},
															name : 'privateKey',
															type : 'file'
														})]
													})]
												})
											}, () => {
												
												let data = form.getData();
												
												if (VALID.notEmpty(data.password) !== true && VALID.notEmpty(data.privateKey) !== true) {
													
													SkyDesktop.Alert({
														msg : '비밀번호를 입력해주세요.'
													});
													
													return false;
												}
												
												else {
													
													let valid = VALID({
														name : {
															notEmpty : true
														},
														host : {
															notEmpty : true
														},
														username : {
															notEmpty : true
														}
													});
													
													let validResult = valid.check(data);
													
													if (validResult.checkHasError() === true) {
														form.showErrors(validResult.getErrors());
														return false;
													}
													
													else {
														
													}
												}
											});
											
											e.stop();
										}
									}
								}), ftpFileTree = SkyDesktop.FileTree(loadAndOpenEditor)]
							})]
						})
					}), SkyDesktop.Tab({
						size : 77,
						c : editorGroup = SkyDesktop.TabGroup({
							on : {
								tap : () => {
									deselectFiles();
								}
							}
						})
					})]
				})
			})
		}));
		
		let addItem = self.addItem = (params) => {
			//REQUIRED: params
			//REQUIRED: params.key
			//REQUIRED: params.item
			
			fileTree.addItem(params);
		};
		
		let getItem = self.getItem = (key) => {
			//REQUIRED: key
			
			return fileTree.getItem(key);
		};
		
		let removeItem = self.removeItem = (key) => {
			//REQUIRED: key
			
			fileTree.removeItem(key);
		};
		
		let clearFileTree = self.clearFileTree = () => {
			fileTree.removeAllItems();
		};
		
		let editorOpenedInfos = [];
		EACH(editorOpenedStore.all(), (scrollTop, path) => {
			editorOpenedInfos.push({
				path : path,
				scrollTop : scrollTop
			});
		});
		
		let init = self.init = (params) => {
			//REQUIRED: params
			//REQUIRED: params.showHome
			//REQUIRED: params.load
			//REQUIRED: params.save
			//REQUIRED: params.copy
			//REQUIRED: params.paste
			//REQUIRED: params.remove
			//REQUIRED: params.move
			
			showHomeHandler = params.showHome;
			loadHandler = params.load;
			saveHandler = params.save;
			copyHandler = params.copy;
			pasteHandler = params.paste;
			removeHandler = params.remove;
			moveHandler = params.move;
			getInfoHandler = params.getInfo;
			
			self.appendTo(BODY);
			
			if (editorOpenedInfos.length === 0) {
				showHomeHandler();
			} else {
				
				NEXT(editorOpenedInfos, (editorOpenedInfo, next) => {
					loadAndOpenEditor(editorOpenedInfo.path, editorOpenedInfo.scrollTop, next);
				});
			}
		};
		
		let save = self.save = (activeTab) => {
			//REQUIRED: activeTab
			
			saveHandler(activeTab);
		};
		
		let copy = self.copy = (paths) => {
			//REQUIRED: paths
			
			copyHandler(paths);
		};
		
		let paste = self.paste = (folderPath) => {
			//REQUIRED: folderPath
			
			pasteHandler(folderPath);
		};
		
		let remove = self.remove = (path) => {
			//REQUIRED: path
			
			let openedEditor = getOpenedEditor(path);
			if (openedEditor !== undefined) {
				openedEditor.remove();
			}
			
			let selectedItem = fileTree.getItem(path);
			
			if (selectedItem !== undefined) {
				deselectFile(selectedItem);
			}
			
			removeHandler(path);
		};
		
		let move = self.move = (params) => {
			//REQUIRED: params
			//REQUIRED: params.from
			//REQUIRED: params.to
			
			let from = params.from;
			let to = params.to;
			
			if (to.indexOf(from) === -1) {
				
				moveHandler(from, to, () => {
					
					let openedEditor = getOpenedEditor(from);
					if (openedEditor !== undefined) {
						openedEditor.setPath(to);
						openedEditor.setTitle(to.substring(to.lastIndexOf('/') + 1));
					}
					
					let selectedItem = fileTree.getItem(to);
					
					if (selectedItem === undefined) {
						EACH(fileTree.getItems(), (item) => {
							if (item.checkIsInstanceOf(SkyDesktop.Folder) === true) {
								let _item = item.getItem(to);
								if (_item !== undefined) {
									selectedItem = _item;
									return false;
								}
							}
						});
					}
					
					if (selectedItem !== undefined) {
						selectedItem.select();
					}
				});
			}
		};
		
		let getInfo = self.getInfo = (path, callback) => {
			//REQUIRED: path
			//REQUIRED: callback
			
			getInfoHandler(path, callback);
		};
		
		let getOpenedEditor = self.getOpenedEditor = (path) => {
			//REQUIRED: path
			
			let editor;
			
			EACH(editorGroup.getAllTabs(), (tab) => {
				if (tab.checkIsInstanceOf(DasomEditor.Editor) === true && tab.getPath() === path) {
					editor = tab;
				}
			});
			
			return editor;
		};
		
		let selectedFileItems = [];
		
		let selectMultipleFile = self.selectMultipleFile = (fileItem) => {
			//REQUIRED: fileItem
			
			if (CHECK_IS_IN({
				array : selectedFileItems,
				value : fileItem
			}) !== true) {
				selectedFileItems.push(fileItem);
			}
			
			fileItem.select();
		};
		
		let deselectFiles = self.deselectFiles = () => {
			
			EACH(selectedFileItems, (selectedFileItem) => {
				if (selectedFileItem.checkIsShowing() === true) {
					selectedFileItem.deselect();
				}
			});
			
			selectedFileItems = [];
		};
		
		let selectFile = self.selectFile = (fileItem) => {
			//REQUIRED: fileItem
			
			deselectFiles();
			
			selectedFileItems.push(fileItem);
			
			fileItem.select();
		};
		
		let deselectFile = self.deselectFile = (fileItem) => {
			//REQUIRED: fileItem
			
			REMOVE({
				array : selectedFileItems,
				value : fileItem
			});
			
			fileItem.deselect();
		};
		
		let selectFileRange = self.selectFileRange = (fileItem) => {
			//REQUIRED: fileItem
			
			let last = selectedFileItems[selectedFileItems.length - 1];
			
			if (last !== undefined && fileItem !== last) {
				
				let from;
				let to;
				
				if (fileItem.getTop() < last.getTop()) {
					from = fileItem;
					to = last;
				} else {
					from = last;
					to = fileItem;
				}
				
				selectedFileItems = [];
				
				selectMultipleFile(from);
				
				let f = (fileItems) => {
					
					EACH(fileItems, (fileItem) => {
						
						if (from.getTop() < fileItem.getTop() && fileItem.getTop() < to.getTop()) {
							selectMultipleFile(fileItem);
						}
						
						if (fileItem.checkIsInstanceOf(DasomEditor.Folder) === true) {
							f(fileItem.getItems());
						}
					});
				};
				
				f(fileTree.getItems());
				
				selectMultipleFile(to);
			}
		};
		
		let getSelectedFileItems = self.getSelectedFileItems = () => {
			return selectedFileItems;
		}
		
		let isControlMode;
		
		EVENT('keydown', (e) => {
			
			if (isControlMode === true) {
				
				let key = e.getKey().toLowerCase();
				
				// 새 파일
				if (key === 'n') {
					
					openEditor(DasomEditor.TextEditor({
						title : '제목 없음'
					}));
				}
				
				// 복사
				else if (key === 'c') {
					
					let paths = [];
					
					EACH(selectedFileItems, (selectedFileItem) => {
						paths.push(selectedFileItem.getPath());
					});
					
					DasomEditor.IDE.copy(paths);
				}
				
				// 붙혀넣기
				else if (key === 'v') {
					if (selectedFileItems.length > 0) {
						DasomEditor.IDE.paste(selectedFileItems[selectedFileItems.length - 1].getFolderPath());
					}
				}
				
				// 현재 탭 종료
				else if (key === 'w') {
					
					if (editorGroup.getActiveTab() !== undefined) {
						editorGroup.getActiveTab().remove();
					}
				}
				
				// 현재 탭 저장
				else if (key === 's') {
					
					if (editorGroup.getActiveTab() !== undefined) {
						save(editorGroup.getActiveTab());
					}
				}
			}
			
			if (e.getKey() === 'Control') {
				isControlMode = true;
			}
			
			// 삭제
			if (e.getKey() === 'Delete') {
				
				if (selectedFileItems.length > 0) {
					
					SkyDesktop.Confirm({
						msg : '정말 삭제 하시겠습니까?'
					}, () => {
						
						EACH(selectedFileItems, (selectedFileItem) => {
							DasomEditor.IDE.remove(selectedFileItem.getPath());
						});
					});
				}
			}
			
			// 열기
			if (e.getKey() === 'Enter') {
				
				if (selectedFileItems.length > 0) {
					
					EACH(selectedFileItems, (selectedFileItem) => {
						if (selectedFileItem.checkIsInstanceOf(DasomEditor.Folder) === true) {
							selectedFileItem.open();
						} else if (selectedFileItem.checkIsInstanceOf(DasomEditor.File) === true) {
							selectedFileItem.fireEvent('doubletap');
						}
					});
				}
			}
			
			// 파일명 변경
			if (e.getKey() === 'F2') {
				
				if (selectedFileItems.length === 1) {
					
					let selectedFileItem = selectedFileItems[0];
					let path = selectedFileItem.getPath();
					
					SkyDesktop.Prompt({
						msg : '새 이름을 입력해주시기 바랍니다.',
						value : path.substring(path.lastIndexOf('/') + 1)
					}, (newName) => {
						
						deselectFiles();
						
						move({
							from : path,
							to : path.substring(0, path.lastIndexOf('/')) + '/' + newName
						});
					});
				}
			}
			
			// 아래 키, 위 키
			if (selectedFileItems.length > 0) {
				
				if (e.getKey() === 'ArrowUp') {
					
					let select = (lastItem) => {
						
						let brothers = lastItem.getParent().getChildren();
						
						let key = FIND({
							array : brothers,
							value : lastItem
						});
						
						if (key === 0) {
							
							if (lastItem.getParent() !== fileTree && (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true || lastItem.checkIsInstanceOf(DasomEditor.File) === true)) {
								deselectFile(lastItem);
							}
							
							select(lastItem.getParent());
						}
						
						else {
							
							if (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true || lastItem.checkIsInstanceOf(DasomEditor.File) === true) {
								deselectFile(lastItem);
							}
							
							for (let i = key - 1; i >= 0; i -= 1) {
								
								if (brothers[i].checkIsInstanceOf(DasomEditor.Folder) === true || brothers[i].checkIsInstanceOf(DasomEditor.File) === true) {
									
									if (brothers[i].checkIsInstanceOf(DasomEditor.Folder) === true && COUNT_PROPERTIES(brothers[i].getItems()) > 0) {
										
										let children = brothers[i + 1].getChildren();
										
										if (i !== key - 1 && children[children.length - 1].checkIsInstanceOf(DasomEditor.File) === true) {
											selectFile(children[children.length - 1]);
										} else {
											select(children[children.length - 1]);
										}
									}
									
									else {
										selectFile(brothers[i]);
									}
									
									break;
								}
							}
						}
					};
					
					select(selectedFileItems[selectedFileItems.length - 1]);
					
					e.stopDefault();
				}
				
				else if (e.getKey() === 'ArrowDown') {
					
					let select = (lastItem) => {
						
						let brothers = lastItem.getParent().getChildren();
						
						let key = FIND({
							array : brothers,
							value : lastItem
						});
						
						if (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true && COUNT_PROPERTIES(lastItem.getItems()) > 0) {
							
							deselectFile(lastItem);
							
							selectFile(brothers[key + 1].getChildren()[0]);
						}
						
						else {
							
							if (key === brothers.length - 1 || (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true && key === brothers.length - 2)) {
								
								if (lastItem.getParent() !== fileTree && (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true || lastItem.checkIsInstanceOf(DasomEditor.File) === true)) {
									deselectFile(lastItem);
								}
								
								select(lastItem.getParent());
							}
							
							else {
								
								if (lastItem.checkIsInstanceOf(DasomEditor.Folder) === true || lastItem.checkIsInstanceOf(DasomEditor.File) === true) {
									deselectFile(lastItem);
								}
								
								for (let i = key + 1; i < brothers.length; i += 1) {
									if (brothers[i].checkIsInstanceOf(DasomEditor.Folder) === true || brothers[i].checkIsInstanceOf(DasomEditor.File) === true) {
										selectFile(brothers[i]);
										break;
									}
								}
							}
						}
					};
					
					select(selectedFileItems[selectedFileItems.length - 1]);
					
					e.stopDefault();
				}
			}
		});
		
		EVENT('keyup', (e) => {
			if (e.getKey() === 'Control') {
				isControlMode = false;
			}
		});
		
		let setDraggingShadow = self.setDraggingShadow = (_draggingShadow) => {
			//REQUIRED: draggingShadow
			
			draggingShadow = _draggingShadow;
		};
		
		let getDraggingShadow = self.getDraggingShadow = () => {
			return draggingShadow;
		};
		
		EVENT('touchmove', (e) => {
			if (draggingShadow !== undefined) {
				draggingShadow.addStyle({
					left : e.getLeft() + 10,
					top : e.getTop() + 10
				});
			}
		});
		
		EVENT('touchend', () => {
			DELAY(() => {
				if (draggingShadow !== undefined) {
					draggingShadow.remove();
					draggingShadow = undefined;
				}
			});
		});
		
		let setWorkspacePath = self.setWorkspacePath = (_workspacePath) => {
			//REQUIRED: workspacePath
			
			workspacePath = _workspacePath;
		};
		
		let getWorkspacePath = self.getWorkspacePath = () => {
			return workspacePath;
		};
	}
});
