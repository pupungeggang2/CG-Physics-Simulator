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
    currentColor = gl.getUniformLocation(shaderProgram, 'u_color')

    // Associating shaders to buffers
    let coord = gl.getAttribLocation(shaderProgram, 'a_position')
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(coord)
}

function addObject() {
    let i1 = input.mouseRect1
    let i2 = input.mouseRect2

    let vertex = [
        [Math.min(i1[0], i2[0]), Math.min(i1[1], i2[1]), 0],
        [Math.max(i1[0], i2[0]), Math.min(i1[1], i2[1]), 0],
        [Math.max(i1[0], i2[0]), Math.max(i1[1], i2[1]), 0],
        [Math.min(i1[0], i2[0]), Math.max(i1[1], i2[1]), 0],
        [Math.min(i1[0], i2[0]), Math.min(i1[1], i2[1]), input.numDepth * 0.01],
        [Math.max(i1[0], i2[0]), Math.min(i1[1], i2[1]), input.numDepth * 0.01],
        [Math.max(i1[0], i2[0]), Math.max(i1[1], i2[1]), input.numDepth * 0.01],
        [Math.min(i1[0], i2[0]), Math.max(i1[1], i2[1]), input.numDepth * 0.01],
    ]

    if (addMode === 'Static') {
        GLBodyListStatic.push(vertex)
    } else if (addMode === 'Soft') {
        GLBodyListSoft.push(vertex)
    }
}

function insertBody() {
    
}
