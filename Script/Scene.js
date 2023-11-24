function loopScene() {
    displayUI()
    display()
}

function displayUI() {
    drawSceneUIInit()
    contextUI.fillText('Soft Body Physics Simulator', UI.text1[0], UI.text1[1])
}

function display() {
    drawSceneInit()
    if (a < 1) {
        a += 0.5 * delta / 1000
    }
    
    let vertices = [
        0, 0, 0,
        a, 0, 0,
        a, a, 0
    ]

    let indices = [0, 1, 2]

    // Buffer
    let vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    let indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

    // Associating shaders to buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    let coord = gl.getAttribLocation(shaderProgram, 'coordinates')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)

    // Drawing
    gl.clearColor(0, 0, 0, 1)
    gl.enable(gl.DEPTH_TEST)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
}

function mouseUpScene(x, y, button) {
    
}

function mouseDownScene(x, y, button) {
    
}

function keyUpScene(key) {
    
}

function keyDownScene(key) {
    
}
