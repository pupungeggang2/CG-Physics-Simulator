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

function vectorDot(vec1, vec2) {
    let result = 0

    for (let i = 0; i < vec1.length; i++) {
        result += vec1[i] * vec2[i]
    }

    return result
}

function vectorProjection(vec1, vec2) {
    return vectorDot(vec1, vec2) / (vectorNorm(vec1) * vectorNorm(vec2))   
}

function vectorAngle(vec1, vec2) {
    return Math.acos(vectorDot(vec1, vec2) / (vectorNorm(vec1) * vectorNorm(vec2)))
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

function applyTransform(mat, vec) {
    let vecHomo = [vec[0], vec[1], vec[2], 1]
    let multipliedVec = matrixVectorMultiply(mat, vecHomo)
    return [multipliedVec[0] / multipliedVec[3], multipliedVec[1] / multipliedVec[3], multipliedVec[2] / multipliedVec[3]]
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

function convert2Dto3D(x, y) {
    let planeNormalVector = [0, 0, 1]
    planeNormalVector = applyTransform(systemTransform, planeNormalVector)
    let a = planeNormalVector[0]
    let b = planeNormalVector[1]
    let c = planeNormalVector[2]
    let z = (- a * x - b * y) / c

    let point = [x, y, z]
    let convertedCoordinate = applyTransform(systemTransformInverse, point)

    return [convertedCoordinate[0], convertedCoordinate[1]]
}
