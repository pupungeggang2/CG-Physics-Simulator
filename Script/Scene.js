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
    drawAxis()
    drawBackPlate()   
}

function mouseUpScene(x, y, button) {
    if (button === 0) {
        input.mousePressed = false
    }
}

function mouseDownScene(x, y, button) {
    if (button === 0) {
        input.mousePressed = true
    }
}

function mouseMoveScene(x, y, button) {
    let gPosition = [(x - canvas.width / 2) / (canvas.width / 2), (-(y - canvas.height / 2)) / (canvas.height / 2)]
    
    if (input.cameraPressed === true && input.mousePressed === true) {
        let diff = [input.mousePrevious[0] - gPosition[0], input.mousePrevious[1] - gPosition[1]]
        systemTransform = matrixMultiply(matrixRotate(1, diff[0] * -40), systemTransform)
        systemTransform = matrixMultiply(matrixRotate(0, diff[1] * 40), systemTransform)
    }
    
    input.mousePrevious = gPosition
}

function keyUpScene(key) {
    if (state === 'Pause') {
        if (key === 'c') {
            input.cameraPressed = false
        } else if (key === 'e') {
            input.selectPressed = false
        }
    }
}

function keyDownScene(key) {
    if (state === 'Pause') {
        if (key === 'c') {
            input.cameraPressed = true
        } else if (key === 'e') {
            input.selectPressed = true
        }
    }
}
