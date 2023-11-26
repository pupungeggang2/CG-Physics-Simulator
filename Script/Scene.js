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
    let colorLocation = gl.getUniformLocation(shaderProgram, 'u_color')
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, canvas.width, canvas.height)

    // Drawing objects
    for (let i = 0; i < 3; i++) {
        gl.uniform4f(colorLocation, 0.0, i * 0.3, 1.0 - i * 0.3, 1.0)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 0, -1 + 0.3 * i, 0, 0, -0.7 + 0.3 * i, 0]), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}

function mouseUpScene(x, y, button) {
    
}

function mouseDownScene(x, y, button) {
    
}

function keyUpScene(key) {
    
}

function keyDownScene(key) {
    
}
