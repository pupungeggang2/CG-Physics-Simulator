// Function which creates shader
function glInit() {
    // Shader
    let shaderVertCode = document.getElementById('ShaderVertex')
    console.log(shaderVertCode)
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
    
