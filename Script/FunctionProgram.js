// Function which creates shader
function glInit() {
    // Shader
    let shaderVertCode = document.getElementById('ShaderVertex').innerHTML
    shaderVert = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVert, shaderVertCode)
    gl.compileShader(shaderVert)

    let shaderFragCode = document.getElementById('ShaderFragment').innerHTML
    shaderFrag = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFrag, shaderFragCode)
    gl.compileShader(shaderFrag)

    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, shaderVert)
    gl.attachShader(shaderProgram, shaderFrag)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
}

// Matrix View
function matrixViewBasic() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, -1, 0,
        0, 0, 0, 1
    ]
}

function matrixProjection(l, r, b, t, f, n) {
    return [
        2 * n / (r - l), 0, (r + l) / (r - l), 0,
        0, 2 * n / (t - b), (t + b) / (t - b), 0,
        0, 0, -(f + n) / (f - n), 2 * n * f / (n - f),
        0, 0, -1, 0
    ]
}

function matrixPerspective(FoV, aspect, near, far) {
    let radFoV = FoV * Math.PI / 180
    let f = Math.tan(Math.PI * 0.5 - radFoV * 0.5)
    let rangeInv = 1.0 / (near - far)

    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) / rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ]
}

function matrixLookAt(camera, target, up) {
    let zAxis = vectorNormalize(vectorSub(camera, target))
    let xAxis = vectorNormalize(vectorCross(up, zAxis))
    let yAxis = vectorNormalize(cross(zAxis, xAxis))

    return [
        xAxis[0], xAxis[1], xAxis[2], 0,
        yAxis[0], yAxis[1], yAxis[2], 0,
        zAxis[0], zAxis[1], zAxis[2], 0,
        camera[0], camera[1], camera[2], 1
   ]
}

// Matrix Operation
function vectorNormalize(vec) {
    sum = 0
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i]
    }
    norm = Math.sqrt(sum)
    
    result = []

    for (let i = 0; i < vec.length; i++) {
        result.push(vec[i] / norm)
    }

    return result
}

function vectorCross(vec1, vec2) {
    return [
        vec1[1] * vec2[2] - vec1[2] * vec2[1],
        vec1[2] * vec2[0] - vec1[0] * vec2[2],
        vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ]
}

function vectorSub(vec1, vec2) {
    let result = []
    
    for (let i = 0; i < vec1.length; i++) {
        result.push(vec1[i] - vec2[i])    
    }
    
    return result 
}

function matrixIdentity() {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function matrixMultiply(mat1, mat2) {
    let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    for (let i = 0; i < 16; i++) {
        let row = Math.floor(i / 4)
        let column = i - row * 4
        result[row * 4 + column] = mat1[row * 4 + 0] * mat2[0 * 4 + column] + mat1[row * 4 + 1] * mat2[1 * 4 + column] + mat1[row * 4 + 2] * mat2[2 * 4 + column] + mat1[row * 4 + 3] * mat2[3 * 4 + column]
    }

    return result
}

function matrixVectorMultiply(mat, vec) {
    let result = [0, 0, 0, 0]

    for (let i = 0; i < 4; i++) {
        result[i] = mat[i * 4 + 0] * vec[0] + mat[i * 4 + 1] * vec[1] + mat[i * 4 + 2] * vec[2] + mat[i * 4 + 3] * vec[3]
    }

    return result
}

function matrixRotate(axis, angle) {
    let angleRad = angle * Math.PI / 180
    let c = Math.cos(angleRad)
    let s = Math.sin(angleRad)

    if (axis === 0) {
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 1) {
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]
    } else if (axis === 2) {
        return [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    }
}
