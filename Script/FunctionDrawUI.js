// UI initialization. Called every frame
function drawSceneUIInit() {
    contextNum.font = '32px neodgm'
    contextNum.textAlign = 'left'
    contextNum.textBaseline = 'top'
    contextNum.fillStyle = 'Black'
    contextNum.strokeStyle = 'Black'
    contextNum.lineWidth = 4
    contextNum.clearRect(0, 0, 240, 320)

    contextUI.font = '32px neodgm'
    contextUI.textAlign = 'left'
    contextUI.textBaseline = 'top'
    contextUI.fillStyle = 'Black'
    contextUI.strokeStyle = 'Black'
    contextUI.lineWidth = 2
    contextUI.clearRect(0, 0, 640, 160)
}

function drawUI() {
    if (state === 'Pause') {
        if (statePause === 'Idle') {
            contextUI.fillText('Soft Body Physics Simulator (Paused)', UI.text1[0], UI.text1[1])
        } else if (statePause === 'Rotate') {
            contextUI.fillText('Drag Mouse to Rotate', UI.text1[0], UI.text1[1])
        } else if (statePause === 'Add') {
            if (addPhase === 'Drag') {
                contextUI.fillText('Drag mouse to select area', UI.text1[0], UI.text1[1])
            } else if (addPhase === 'InputDepth') {
                contextUI.fillText('Enter Depth', UI.text1[0], UI.text1[1])
                contextUI.fillText(`Depth : ${input.numDepth}`, UI.text2[0], UI.text2[1])
                contextUI.fillText(`Angle : ${input.numAngle}`, UI.text22[0], UI.text22[1])
            } else if (addPhase === 'InputAngle') {
                contextUI.fillText('Enter Angle', UI.text1[0], UI.text1[1])
                contextUI.fillText(`Depth : ${input.numDepth}`, UI.text2[0], UI.text2[1])
                contextUI.fillText(`Angle : ${input.numAngle}`, UI.text22[0], UI.text22[1])
            }
        } else if (statePause === 'Edit') {
            contextUI.fillText('Select Object', UI.text1[1], UI.text1[1])
        } else if (statePause === 'EditMove') {
            contextUI.fillText('Move object by drag mouse.', UI.text1[0], UI.text1[1])
        }
    } else if (state === 'Running') {
        contextUI.fillText('Soft Body Physics Simulator (Running)', UI.text1[0], UI.text1[1])
    }

    for (let i = 0; i < 10; i++) {
        contextNum.strokeRect(UI.number[i][0], UI.number[i][1], UI.number[i][2], UI.number[i][3])
        contextNum.fillText(`${i}`, UI.number[i][0] + 32, UI.number[i][1] + 24)
    }

    contextNum.strokeRect(UI.numberErase[0], UI.numberErase[1], UI.numberErase[2], UI.numberErase[3])
    contextNum.fillText(`<`, UI.numberErase[0] + 32, UI.numberErase[1] + 24)

    if (state === 'Pause') {
        contextUI.drawImage(img.running, UI.pause[0], UI.pause[1])
    } else if (state === 'Running') {
        contextUI.drawImage(img.pause, UI.pause[0], UI.pause[1])
    }

    contextUI.drawImage(img.rotate, UI.rotate[0], UI.rotate[1])

    if (state === 'Pause' && statePause === 'Rotate') {
        contextUI.drawImage(img.selectFrame, UI.rotate[0], UI.rotate[1])
    }
    
    contextUI.drawImage(img.addStatic, UI.addStatic[0], UI.addStatic[1])
    contextUI.drawImage(img.addSoft, UI.addSoft[0], UI.addSoft[1])
    contextUI.drawImage(img.next, UI.next[0], UI.next[1])

    if (state === 'Pause' && statePause === 'Add') {
        if (addMode === 'Static') {
            contextUI.drawImage(img.selectFrame, UI.addStatic[0], UI.addStatic[1])
        } else if (addMode === 'Soft') {
            contextUI.drawImage(img.selectFrame, UI.addSoft[0], UI.addSoft[1])
        }
    }
    
    contextUI.drawImage(img.edit, UI.edit[0], UI.edit[1])
    contextUI.drawImage(img.move, UI.move[0], UI.move[1])
    contextUI.drawImage(img.remove, UI.remove[0], UI.remove[1])

    if (state === 'Pause') {
        if (statePause === 'Edit') {
            contextUI.drawImage(img.selectFrame, UI.edit[0], UI.edit[1])
        } else if (statePause === 'EditMove') {
            contextUI.drawImage(img.selectFrame, UI.move[0], UI.move[1])
        }
    }
}
