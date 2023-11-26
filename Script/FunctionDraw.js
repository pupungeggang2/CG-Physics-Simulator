function drawSceneInit() {
    matrixView = matrixViewBasic()
    let matrixLocation = gl.getUniformLocation(shaderProgram, 'u_matrix')
    gl.uniformMatrix4fv(matrixLocation, false, matrixView)

    // Binding Buffer
    vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

    // Associating shaders to buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    let coord = gl.getAttribLocation(shaderProgram, 'a_position')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)
}

function drawBackPlate() {
    
}

function drawCuboid() {
    
}
