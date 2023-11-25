// UI initialization. Called every frame
function drawSceneUIInit() {
    contextUI.font = '32px neodgm'
    contextUI.textAlign = 'left'
    contextUI.textBaseline = 'top'
    contextUI.fillStyle = 'Black'
    contextUI.strokeStyle = 'Black'
    contextUI.lineWidth = 2
    contextUI.clearRect(0, 0, 640, 160)
}

function drawSceneInit() {

}

// Function which converts 6 cube face position into WebGL triangles
// l : Left, r : Right, d : Down, u : Up, b : Back, f : Front
function convertIntoCuboid(cuboid) {
    // Left face  l, d, b, l, u, b, l, u, f | l, d, b, l, d, f, l, u, f
    // Right face r, d, b, r, u, b, r, u, f | r, d, b, l, d, f, r, u, f
    // Up face    u, l, b, u, r, b, u, r, f | u, l, b, u, l, f, u, r, f
    // Down face  d, l, b, d, r, b, d, r, f | d, l, b, d, l, f, d, r, f
    // Back face  l, d, b, l, u, b, r, u, b | l, d, b, r, d, b, r, u, b
    // Front face l, d, f, l, u, f, r, u, f | l, d, f, r, d, f, r, u, f
    let l = cuboid[0]
    let r = cuboid[1]
    let d = cuboid[2]
    let u = cuboid[3]
    let b = cuboid[4]
    let f = cuboid[5]
    
    return [
        l, d, b, l, u, b, l, u, f,
        l, d, b, l, d, f, l, u, f,
        r, d, b, r, u, b, r, u, f,
        r, d, b, l, d, f, r, u, f,
        u, l, b, u, r, b, u, r, f,
        u, l, b, u, l, f, u, r, f,
        d, l, b, d, r, b, d, r, f,
        d, l, b, d, l, f, d, r, f,
        l, d, b, l, u, b, r, u, b,
        l, d, b, r, d, b, r, u, b,
        l, d, f, l, u, f, r, u, f,
        l, d, f, r, d, f, r, u, f
    ]
}

function generateVerticeBuffer() {
    vertices = []

    for (let i = 0; i < GLBodyListSoft.length; i++) {
        vertices = vertices.concat(convertIntoCuboid(GLBodyListSoft[i]))
    }

    for (let i = 0; i < GLBodyListStatic.length; i++) {
        vertices = vertices.concat(convertIntoCuboid(GLBodyListStatic[i]))
    }
}
