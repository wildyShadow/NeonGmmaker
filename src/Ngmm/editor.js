var blocklyWorkspace;
const editor = document.createElement('div');
editor.style = "opacity: 1; position: absolute; top: calc(50% - 40%); left: calc(50% - 45%); width: 90%; height: 80%; background-color: #212121; border-radius: 7px;";
const topBar = document.createElement('div');
topBar.classList.add("topBar");
topBar.textContent = "Editor";
editor.appendChild(topBar);
document.getElementById("appContainer").appendChild(editor);
const editorBox = document.createElement(`div`);
editorBox.style = "color-scheme: only light; background: #ffffff; overflow: hidden; border-radius: 8px; width: calc(100% - 90px); right: 40px; height: calc(100% - 60px); top: 50px; position: absolute;";
editor.appendChild(editorBox);
editorBox.style.display = 'none';
const blocklyBox = document.createElement(`div`);
blocklyBox.style = "overflow: hidden; border-radius: 8px; width: calc(100% - 90px); right: 40px; height: calc(100% - 60px); top: 50px; position: absolute;";
editor.appendChild(blocklyBox);
editor.style.display = 'none';
const checkButton = document.createElement('div');
checkButton.classList.add("crossButton");
editor.appendChild(checkButton);
const exportButton = document.createElement('div');
exportButton.classList.add("crossButton");
exportButton.style.left = "15px";
exportButton.style.top = "50px";
exportButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmeexport.png?raw=true)";
editor.appendChild(exportButton);
const jsButton = document.createElement('div');
jsButton.classList.add("crossButton");
jsButton.style.right = "15px";
jsButton.style.top = "50px";
jsButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmejavascript.png?raw=true)";
editor.appendChild(jsButton);
const importButton = document.createElement('div');
importButton.classList.add("crossButton");
importButton.style.left = "15px";
importButton.style.top = "80px";
importButton.style.backgroundImage = "url(https://github.com/SneezingCactus/gmmaker/blob/master/src/gmWindow/images/gmedownload.png?raw=true)";
editor.appendChild(importButton);
exportButton.onclick = () => {
    if (window.monacoEditor) {
        let text = `
  {
  jsSwitch: ${jsSwitch};
  [CODE]
  > \`\`\`;${jsSwitch ? window.monacoEditor.getValue() : '// no js'}> \`\`\`;
  [BLOCKLY]
  > \`\`\`;${(new XMLSerializer().serializeToString(Blockly.Xml.workspaceToDom(blocklyWorkspace)))}> \`\`\`;
  }
  `
        let element = document.createElement('a');
        let file = new Blob([text], { type: "text/plain" })

        let url = URL.createObjectURL(file);
        element.setAttribute('href', url);
        element.setAttribute('download', (prompt("Name of the file") || "ngmm export") + ".ngmm");
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}
jsButton.onclick = () => {
    jsSwitch = !jsSwitch;
    if (jsSwitch) {
        blocklyBox.style.display = 'none';
        editorBox.style.display = 'block';
    } else {
        blocklyBox.style.display = 'block';
        editorBox.style.display = 'none';
    }
}
importButton.onclick = () => {
    if (window.monacoEditor) {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.ngmm';

        input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                let content = readerEvent.target.result;
                let decoded = content;
                try {
                    decoded = decodeURIComponent(window.atob(content));
                } catch (err) {

                }
                let firstStep = decoded.match(/\[CODE\](.*?)> ```;(.*?)> ```;/gims)[0].split('> ```;');
                let finalCode = '';
                let switchTxt = decoded.match(/jsSwitch\: (.*?);/ig);
                if (switchTxt) {
                    try {
                        switchTxt = switchTxt[0];
                        let switcc = switchTxt.split(": ")[1].split(";")[0];
                        jsSwitch = switcc == "true";
                        if (jsSwitch) {
                            blocklyBox.style.display = 'none';
                            editorBox.style.display = 'block';
                        } else {
                            blocklyBox.style.display = 'block';
                            editorBox.style.display = 'none';
                        }
                    } catch (error) {

                    }
                }
                for (let i in firstStep) {
                    if (i > 0 && i < firstStep.length) {
                        finalCode += firstStep[i];
                    }
                }
                let firstStep2 = decoded.match(/\[BLOCKLY\](.*?)> ```;(.*?)> ```;/gims);
                if (firstStep2) {
                    firstStep2 = firstStep2[0].split('> ```;');
                    let finalCode2 = '';
                    for (let i in firstStep2) {
                        if (i > 0 && i < firstStep2.length) {
                            finalCode2 += firstStep2[i];
                        }
                    }
                    blocklyWorkspace.clear();
                    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(finalCode2), blocklyWorkspace)
                }
                window.monacoEditor.setValue(finalCode);
            }
        }

        input.click();
    }
}
checkButton.onclick = () => {
    if (window.monacoEditor) {
        let markers = monaco.editor.getModelMarkers({ owner: "javascript" }).filter(a => a.severity >= 5);
        if (markers[0] && jsSwitch) {
            //console.log(markers[0]);
            window.monacoEditor.revealLine(markers[0].endLineNumber);
            window.monacoEditor.setPosition({ lineNumber: markers[0].endLineNumber, column: markers[0].endColumn });
            return;
        }
        else {
            document.getElementsByClassName("lobbyContainer")[0].style.display = "block";
            let code = window.monacoEditor.getValue();
            if (!jsSwitch) {
                code = javascript.javascriptGenerator.workspaceToCode(blocklyWorkspace)
                console.log(code);
            }
            defineGMM(code);
        }
    }
    editor.style.display = "none";
}
new Promise(async (r) => {
    let fetched = await fetch('https://raw.githubusercontent.com/wildyShadow/NeonGmmaker/main/shared/typescript.ts');
    let libSource = await fetched.text();
    const thisId = setInterval(() => {
        if (window.monaco) {
            let libUri = "ts:filename/facts.d.ts";
            monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
            monaco.editor.createModel(libSource, "typescript", monaco.Uri.parse(libUri));

            monaco.editor.setTheme('vs')

            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: false,
            });

            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES6,
                allowNonTsExtensions: true
            });

            window.monacoEditor = monaco.editor.create(editorBox, {
                value: `
// Sword replaces Bat gmm

// insert id, then url
game.graphics.loadTexture("sus","https://upload.wikimedia.org/wikipedia/commons/d/df/Sword_Pixel_art_-_Radin.png");
game.events.add("step4each",(id) => {
	let cube = game.state.cubes[id];
	if (cube) {
		let g = game.graphics.drawings[game.vars[id]];
		let add = cube.bf <= 8? 0 : Math.PI;
		g.shapes[0].alpha = cube.bf > 0? 1 : 0;
		g.a = cube.ba+add;
	}
})

game.events.add("init4each",(id) => {
		game.vars[id] = game.graphics.create({
			p: [0,0],
			attach: "cube",
			attachId: id,
			scale: [1,1],
            fixedAngle: true,
			a: 0,
			shapes: [
				{
					type: "im",
					text: (id == game.clientId? "YOU" : "OTHER")+(game.clientId == game.hostId? " HOST" : " NOT HOST"),
					color: 0xffffff,
					a: 45*Math.PI/180+Math.PI,
					p: [-1,0],
					size: [1.4,1.4],
					// set the id of the image to the id of the url you set
					id: "sus"
				}
			]
		})
})`,
                automaticLayout: true,
                language: 'javascript'
            });
            clearInterval(thisId);
            r();
        }
    }, 10);
})
    .then(r => {
        console.log("monaco loaded");
        //  appendScript("https://unpkg.com/blockly/blocks_compressed.js");
        //  appendScript("https://unpkg.com/blockly/javascript_compressed.js");
        new Promise(async (r) => {
            const thisId = setInterval(async () => {
                if (window.Blockly) {
                    let jsb = javascript.javascriptGenerator;
                    let js = Blockly.JavaScript;
                    let theme = Blockly.Theme.defineTheme('dark', {
                        base: Blockly.Themes.Classic,
                        componentStyles: {
                            workspaceBackgroundColour: '#1e1e1e',
                            toolboxBackgroundColour: 'blackBackground',
                            toolboxForegroundColour: '#fff',
                            flyoutBackgroundColour: '#252526',
                            flyoutForegroundColour: '#ccc',
                            flyoutOpacity: 1,
                            scrollbarColour: '#797979',
                            insertionMarkerColour: '#fff',
                            insertionMarkerOpacity: 0.3,
                            scrollbarOpacity: 0.4,
                            cursorColour: '#d0d0d0',
                            blackBackground: '#333',
                        },
                    });
                    blocklyWorkspace = Blockly.inject(blocklyBox, {
                        toolbox: blocklyDefs,
                        trashcan: true,
                        theme: theme,
                        renderer: 'zelos',
                        grid:
                        {
                            spacing: 50,
                            length: 4,
                            colour: '#ccc',
                            snap: false
                        },
                        zoom: {
                            controls: true,
                            wheel: true,
                            startScale: 1.0,
                            maxScale: 3,
                            minScale: 0.3,
                            scaleSpeed: 1.2,
                            pinch: true
                        },
                    });
                    clearInterval(thisId);
                    r();
                }
            }, 10);
        })
            .then(r => {
                console.log("blockly loaded");
            })
    })
//<textarea class="scrollBox" wrap="soft" spellcheck="false" style="border: none; outline: none; -webkit-box-shadow: none; -moz-box-shadow: none; box-shadow: none; resize: none; position: absolute; overflow-y: scroll; overflow-x: hidden; background-color: #2f2f2f; height: calc(100% - 60px); width: calc(100% - 80px); left: 80px; top: 50px; box-sizing: border-box; border-bottom-left-radius: 7px; border-bottom-right-radius: 7px; white-space: nowrap;"></textarea>