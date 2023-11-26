function drawSceneInit() {
    matrixView = matrixViewBasic()
    let matrixLocation = gl.getUniformLocation(shaderProgram, 'u_matrix')
    gl.uniformMatrix4fv(matrixLocation, false, matrixView)
}

function drawBackPlate() {
    gl.uniform4f(currentColor, 0.2, 0.8, 0.8, 1.0)
    drawCuboid([[-0.8, -0.8, -0.1], [0.8, -0.8, -0.1], [0.8, 0.8, -0.1], [-0.8, 0.8, -0.1], [-0.8, -0.8, 0.1], [0.8, -0.8, 0.1], [0.8, 0.8, 0.1], [-0.8, 0.8, 0.1]])
}

function drawCuboid(v) {
    let points = [[], [], [], [], [], [], [], [], [0, 1, 2], [0, 2, 3], [4, 5, 6], [4, 6, 7]]
    for (let i = 0; i < points.length; i++) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([v[points[i][0]][0], v[points[i][0]][1], v[points[i][0]][2], v[points[i][1]][0], v[points[i][1]][1], v[points[i][1]][2], v[points[i][2]][0], v[points[i][2]][1], v[points[i][2]][2]]), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}
