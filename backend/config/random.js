const CharacterGeneration = () => {
    const pair = [
        'A62', 'L3D', 'ZB1', 'H03',
        '5IT', '8TM', '6RJ', '3UZ',
        '1V2', '5A4', '7Y8', '9O2',
        'V26', '380', 'OBJ', '0D3',
    ]

    const mult = [
        'qw', 'rt', 'uo', 'gh',
        '2ws', 'za', 'g5', 'j8'
    ]

    const f = Math.ceil(Math.random() * pair.length)
    const m = Math.ceil(Math.random() * mult.length)

    const unqiueArr = []

    const add = pair[f] + mult[m]
    unqiueArr.push(add)

    //
    // for(let i = 0; i <= pair.length; i++){
    //     for(let j = 0; j <= 5; j++){
    //         const arr = pair[f]
    //         unqiueArr.push(arr)
    //     }
    // }

    console.log(unqiueArr[0])

    const result = unqiueArr[0]

    return result
}

    module.exports = CharacterGeneration