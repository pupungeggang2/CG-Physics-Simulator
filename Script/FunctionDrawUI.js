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

function drawUIIdle() {
    contextUI.font = '24px neodgm'
    contextUI.fillText(`[P] : Run`, UI.text2[0], UI.text2[1])
    contextUI.fillText(`[T] : Add static object [S] : Add soft object`, UI.text3[0], UI.text3[1])
}
