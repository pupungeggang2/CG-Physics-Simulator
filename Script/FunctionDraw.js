function drawSceneInit() {
    currentMatrix = gl.getUniformLocation(shaderProgram, 'u_matrix')
    gl.uniformMatrix4fv(currentMatrix, false, matrixView)
    gl.lineWidth(3)
}

function drawAxis() {
    let transform = matrixMultiply(matrixTranslate(-0.9, -0.9, 0), systemTransform)
    let transformedOrigin = applyTransform(transform, [0, 0, 0])
    let transformedX = applyTransform(transform, [0.1, 0, 0])
    let transformedY = applyTransform(transform, [0, 0.1, 0])
    let transformedZ = applyTransform(transform, [0, 0, 0.1])

    gl.uniform4f(currentColor, 1.0, 0.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(transformedOrigin.concat(transformedX)), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    gl.uniform4f(currentColor, 0.0, 1.0, 0.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(transformedOrigin.concat(transformedY)), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)

    gl.uniform4f(currentColor, 0.0, 0.0, 1.0, 1.0)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(transformedOrigin.concat(transformedZ)), gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, 2)
}

function drawBackPlate() {
    let v = [
        [-0.8, -0.8, -0.05], [0.8, -0.8, -0.05], [0.8, 0.8, -0.05], [-0.8, 0.8, -0.05], [-0.8, -0.8, 0.05], [0.8, -0.8, 0.05], [0.8, 0.8, 0.05], [-0.8, 0.8, 0.05]
    ]
    let c = [
        [0.5, 0.9, 0.9, 1.0], [0.5, 0.9, 0.9, 1.0], [0.5, 0.9, 0.9, 1.0], [0.5, 0.9, 0.9, 1.0], [0.1, 0.1, 0.1, 1.0], [0.5, 0.9, 0.9, 1.0]
    ]
    drawCuboid(v, c)
}

function drawBodies() {
    let colorStatic = [0.9, 0.9, 0.9, 1.0]
    let colorSoft = [0.9, 0.1, 0.5, 1.0]
}

function drawCuboid(v, c) {
    let pointFace = [[0, 3, 7], [7, 4, 0], [1, 5, 6], [6, 2, 1], [1, 0, 4], [4, 5, 1], [2, 6, 7], [7, 3, 2], [3, 0, 1], [1, 2, 3], [5, 4, 7], [7, 6, 5]]
    let pointLine = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
    let directionLightRev = [0, 0, 1]

    // Drawing Faces
    for (let i = 0; i < pointFace.length; i++) {
        let colorIndex = Math.floor(i / 2)
        let tempVec = [[],[],[]]
        let tempBuffer = []

        for (let j = 0; j < 3; j++) {
            tempVec[j] = applyTransform(systemTransform, v[pointFace[i][j]])
            tempBuffer = tempBuffer.concat(tempVec[j])
        }
        
        let normal = vectorCross(vectorSub(tempVec[0], tempVec[1]), vectorSub(tempVec[2], tempVec[1]))
        let colorFactor = Math.max(vectorProjection(directionLightRev, normal), 0.1)
        gl.uniform4f(currentColor, c[colorIndex][0] * colorFactor, c[colorIndex][1] * colorFactor, c[colorIndex][2] * colorFactor, c[colorIndex][3])

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), gl.STATIC_DRAW)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Drawing Lines
    for (let i = 0; i < pointLine.length; i++) {
        gl.uniform4f(currentColor, 0.0, 0.0, 0.0, 1.0)
        let tempBuffer = []

        for (let j = 0; j < 2; j++) {
            let tempVec = applyTransform(systemTransform, [v[pointLine[i][j]][0], v[pointLine[i][j]][1], v[pointLine[i][j]][2]])
            tempBuffer = tempBuffer.concat(tempVec)
        }
        
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tempBuffer), gl.STATIC_DRAW)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1]), gl.STATIC_DRAW)
        gl.drawArrays(gl.LINES, 0, 2)
    }
}
