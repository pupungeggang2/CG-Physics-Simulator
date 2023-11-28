// UI initialization. Called every frame
function drawSceneUIInit() {
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
    contextUI.drawImage(img.edit, UI.edit[0], UI.edit[1])
    contextUI.drawImage(img.move, UI.move[0], UI.move[1])
    contextUI.drawImage(img.remove, UI.remove[0], UI.remove[1])
}
