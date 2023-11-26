function drawSceneInit() {
    let matrixLocation = gl.getUniformLocation(shaderProgram, 'u_matrix')
    gl.uniformMatrix4fv(matrixLocation, false, matrixView)
}

function drawBackPlate() {
    let v = [[-0.8, -0.8, -0.8], [0.8, -0.8, -0.8], [0.8, 0.8, -0.8], [-0.8, 0.8, -0.8], [-0.8, -0.8, 0.8], [0.8, -0.8, 0.8], [0.8, 0.8, 0.8], [-0.8, 0.8, 0.8]]
    let c = [
        [0.2, 0.8, 0.8, 1.0],
        [0.2, 0.8, 0.8, 1.0],
        [0.8, 0.2, 0.8, 1.0],
        [0.8, 0.2, 0.8, 1.0],
        [0.8, 0.8, 0.2, 1.0],
        [0.8, 0.8, 0.2, 1.0]
    ]
    drawCuboid(v, c)
}

function drawCuboid(v, c) {
    let points = [[4, 0, 3], [4, 3, 7], [5, 1, 2], [5, 2, 6], [4, 5, 1], [4, 1, 0], [7, 6, 2], [7, 2, 3], [0, 1, 2], [0, 2, 3], [4, 5, 6], [4, 6, 7]]
    for (let i = 0; i < points.length; i++) {
        let colorIndex = Math.floor(i / 2)
        gl.uniform4f(currentColor, c[colorIndex][0], c[colorIndex][1], c[colorIndex][2], c[colorIndex][3])
        let tempBuffer = []
        
        for (let j = 0; j < 3; j++) {
            let tempVec = applyTransform(systemTransform, [v[points[i][j]][0], v[points[i][j]][1], v[points[i][j]][2]])
            tempBuffer = tempBuffer.concat(tempVec)
        }
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}
