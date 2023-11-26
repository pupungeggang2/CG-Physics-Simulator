function loopScene() {
    displayUI()
    display()
}

function displayUI() {
    drawSceneUIInit()

    if (state === 'Pause') {
        contextUI.fillText('Soft Body Physics Simulator (Paused)', UI.text1[0], UI.text1[1])

        if (statePause === 'Idle') {
            drawUIIdle()
        }
    } else if (state === 'Running') {
        contextUI.fillText('Soft Body Physics Simulator (Running)', UI.text1[0], UI.text1[1])
    }
}

function display() {
    drawSceneInit()
    // Drawing
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, canvas.width, canvas.height)

    // Drawing objects
    drawBackPlate()   
}

function mouseUpScene(x, y, button) {
    
}

function mouseDownScene(x, y, button) {
    
}

function keyUpScene(key) {
    
}

function keyDownScene(key) {
    
}
