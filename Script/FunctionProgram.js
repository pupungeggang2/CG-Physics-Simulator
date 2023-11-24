function glInit() {
    // Shader
    let shaderVertCode = 
        'attribute vec3 coordinates;' +
        'void main(void) {' +
        'gl_Position = vec4(coordinates, 1.0);' +
        '}'

    shaderVert = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(shaderVert, shaderVertCode)
    gl.compileShader(shaderVert)

    let shaderFragCode = 
        'void main(void) {' +
        'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);' +
        '}'

    shaderFrag = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(shaderFrag, shaderFragCode)
    gl.compileShader(shaderFrag)

    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, shaderVert)
    gl.attachShader(shaderProgram, shaderFrag)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
}
