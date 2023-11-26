// Function which creates shader
function glInit() {
    // Shader
    let shaderVertCode = `
        attribute vec4 a_position;
        uniform mat4 u_matrix;
        void main() {
            gl_Position = u_matrix * a_position;
        }
    `
    shaderVert = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVert, shaderVertCode)
    gl.compileShader(shaderVert)

    let shaderFragCode = `
        precision mediump float;
        uniform vec4 u_color;
        void main() {
            gl_FragColor = u_color;
        }
    `
    shaderFrag = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFrag, shaderFragCode)
    gl.compileShader(shaderFrag)

    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, shaderVert)
    gl.attachShader(shaderProgram, shaderFrag)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)

    // Binding Buffer
    vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

    // Associating shaders to buffers
    let coord = gl.getAttribLocation(shaderProgram, 'a_position')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)

    // Setting color
    colorLocation = gl.getUniformLocation(shaderProgram, 'u_color')
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

// Vector Operation
function vectorAdd(vec1, vec2) {
    let result = []
        
    for (let i = 0; i < vec1.length; i++) {
        result.push(vec1[i] + vec2[i])    
    }
    
    return result
}

function vectorSub(vec1, vec2) {
    let result = []
    
    for (let i = 0; i < vec1.length; i++) {
        result.push(vec1[i] - vec2[i])    
    }
    
    return result 
}

function vectorNorm(vec) {
    sum = 0
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i]
    }
    return Math.sqrt(sum)
}

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

// Matrix operation
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

function matrixScale(x, y, z) {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]
}

function matrixTranslate(x, y, z) {
    return [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]
}
