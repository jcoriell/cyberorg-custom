
//% weight=100 color=#00C1D4 icon="\uf023"
//% groups='["Pigpen", "Shift Ciphers", "Vigenere", "Morse Code", "Enigma", "Other"]'
namespace encryption {

    let shiftCipherAlphabet = "abcdefghijklmnopqrstuvwxyz"

    //% block="set shift/vigenere alphabet to $alphabet"
    //% advanced=true
    //% group="Other"
    export function setAlphabet(alphabet: string): void {
        shiftCipherAlphabet = alphabet
    }
    
    //% block="Vigenere $setting message $text with key $key"
    //% group="Vigenere"
    export function vigenereEncrypt(setting: EncryptionSetting, text: string, key: string): string {
        let validKey = ''
        let message = ''
        let validKeyPosition = 0
        let validKeyLength = 0
        for (let i = 0; i < key.length; i++){
            let keyCharacter = key.charAt(i).toLowerCase()
            if (shiftCipherAlphabet.includes(keyCharacter)){
                validKey += keyCharacter
            }           
        }
        validKeyLength = validKey.length
        for (let j = 0; j < text.length; j++){
            let character = text.charAt(j).toLowerCase()
            if (shiftCipherAlphabet.includes(character)){
                let newCharacter = ''
                if (setting === EncryptionSetting.Encrypt){
                    newCharacter = shiftAlpha(character, 'a', validKey.charAt(validKeyPosition))
                    }
                else {
                    newCharacter = shiftAlpha(character, validKey.charAt(validKeyPosition), 'a')
                }
                message += newCharacter
                validKeyPosition += 1
                validKeyPosition = Math.mod(validKeyPosition, validKeyLength)
            }
            else{
                message += character
            }
        }
        return message
    }


    /**
     * Shift a message using a numeric key.
     * @param s a message to encrypt, eg: "Hello"
     * @param n a numeric shift, eg: 5
     */
    //% block="shift | %s | with key | %n"
    //% group="Shift Ciphers"
    export function shiftNumeric(s: string, n: number): string {
        n = Math.round(n)
        let result = ''
        for (let i = 0; i < s.length; i++){
            let letter = s.charAt(i).toLowerCase()
            let index = shiftCipherAlphabet.indexOf(letter)
            if (index > -1){
                let newValue = Math.mod(index + n, shiftCipherAlphabet.length)
                result = result + shiftCipherAlphabet.charAt(newValue)
            }
            else{
                result = result + s.charAt(i)
            }
        }
        return result
    }

    /**
     * Shift a message using an alphabetic key.
     * @param s describe parameter here, eg: "Hello"
     * @param k1 describe parameter here, eg: "a"
     * @param k2 describe parameter here, eg: "d"
     */
     function shiftAlpha(s: string, k1: string, k2: string): string {
        k1 = k1.charAt(0).toLowerCase()
        k2 = k2.charAt(0).toLowerCase()
        let n1 = shiftCipherAlphabet.indexOf(k1)
        let n2 = shiftCipherAlphabet.indexOf(k2)
        return shiftNumeric(s, n2 - n1)
    }

    /**
     * TODO: describe your function here
     * @param s describe value here, eg: "hello"
     * @param k1 describe value here, eg: ShiftAlphabet.A 
     * @param k2 describe value here, eg: ShiftAlphabet.D
    */
    //% block="shift | %s | with shift | %k1=device_letter | to | %k2=device_letter"
    //% useEnumVal=1
    //% group="Shift Ciphers"
    export function shiftAlphaSelection(s: string, k1: number, k2: number): string{
        return shiftNumeric(s, k2 - k1)
    }

    //% blockId=device_letter block="%name"
    //% useEnumVal=1
    //% name.fieldEditor="gridpicker"
    //% name.fieldOptions.columns="13"
    //% name.fieldOptions.width="380"
    //% name.fieldOptions.maxRows=3
    //% group="Shift Ciphers"
    export function letterValue(name: ShiftAlphabet): number {
        return name;
    }

    //% block="%i"
    //% i.fieldEditor="gridpicker"
    //% i.fieldOptions.columns="6"
    //% group="Pigpen"
    export function pigpenAlphabetImage(i: PigpenAlphabet): Image {
        switch (i) {
            case PigpenAlphabet.A: return images.createImage(`. . . . #\n. . . . #\n. . . . #\n. . . . #\n# # # # #`);
            case PigpenAlphabet.B: return images.createImage(`. . . . #\n. . . . #\n. . # . #\n. . . . #\n# # # # #`);
            case PigpenAlphabet.C: return images.createImage(`# . . . #\n# . . . #\n# . . . #\n# . . . #\n# # # # #`);
            case PigpenAlphabet.D: return images.createImage(`# . . . #\n# . . . #\n# . # . #\n# . . . #\n# # # # #`);
            case PigpenAlphabet.E: return images.createImage(`# . . . .\n# . . . .\n# . . . .\n# . . . .\n# # # # #`);
            case PigpenAlphabet.F: return images.createImage(`# . . . .\n# . . . .\n# . # . .\n# . . . .\n# # # # #`);
            case PigpenAlphabet.G: return images.createImage(`# # # # #\n. . . . #\n. . . . #\n. . . . #\n# # # # #`);
            case PigpenAlphabet.H: return images.createImage(`# # # # #\n. . . . #\n. . # . #\n. . . . #\n# # # # #`);
            case PigpenAlphabet.I: return images.createImage(`# # # # #\n# . . . #\n# . . . #\n# . . . #\n# # # # #`);
            case PigpenAlphabet.J: return images.createImage(`# # # # #\n# . . . #\n# . # . #\n# . . . #\n# # # # #`);
            case PigpenAlphabet.K: return images.createImage(`# # # # #\n# . . . .\n# . . . .\n# . . . .\n# # # # #`);
            case PigpenAlphabet.L: return images.createImage(`# # # # #\n# . . . .\n# . # . .\n# . . . .\n# # # # #`);
            case PigpenAlphabet.M: return images.createImage(`# # # # #\n. . . . #\n. . . . #\n. . . . #\n. . . . #`);
            case PigpenAlphabet.N: return images.createImage(`# # # # #\n. . . . #\n. . # . #\n. . . . #\n. . . . #`);
            case PigpenAlphabet.O: return images.createImage(`# # # # #\n# . . . #\n# . . . #\n# . . . #\n# . . . #`);
            case PigpenAlphabet.P: return images.createImage(`# # # # #\n# . . . #\n# . # . #\n# . . . #\n# . . . #`);
            case PigpenAlphabet.Q: return images.createImage(`# # # # #\n# . . . .\n# . . . .\n# . . . .\n# . . . .`);
            case PigpenAlphabet.R: return images.createImage(`# # # # #\n# . . . .\n# . # . .\n# . . . .\n# . . . .`);
            case PigpenAlphabet.S: return images.createImage(`. . . . .\n. . . . .\n# . . . #\n. # . # .\n. . # . .`);
            case PigpenAlphabet.T: return images.createImage(`. . . . .\n. . # . .\n# . . . #\n. # . # .\n. . # . .`);
            case PigpenAlphabet.U: return images.createImage(`. . # . .\n. . . # .\n. . . . #\n. . . # .\n. . # . .`);
            case PigpenAlphabet.V: return images.createImage(`. . # . .\n. . . # .\n. # . . #\n. . . # .\n. . # . .`);
            case PigpenAlphabet.W: return images.createImage(`. . # . .\n. # . # .\n# . . . #\n. . . . .\n. . . . .`);
            case PigpenAlphabet.X: return images.createImage(`. . # . .\n. # . # .\n# . . . #\n. . # . .\n. . . . .`);
            case PigpenAlphabet.Y: return images.createImage(`. . # . .\n. # . . .\n# . . . .\n. # . . .\n. . # . .`);
            case PigpenAlphabet.Z: return images.createImage(`. . # . .\n. # . . .\n# . . # .\n. # . . .\n. . # . .`);
            default: return images.createImage(`. .\n. .\n. .\n. .\n. .`);
        }
    }



    //% block
    //% group="Pigpen"
    export function pigpen(text: string): void{
        let space = images.createImage(`. .\n. .\n. .\n. .\n. .`)
        let ending = images.createImage(`. . .\n. . .\n. . .\n. . .\n. . .`)
        for (let value of text) {
            value = value.toLowerCase()
            pigpenAlphabetImage(letterToPigpenAlphabet(value)).scrollImage(0, 250)
            space.scrollImage(0, 250)
        }
        ending.scrollImage(0, 250)
    }

    export const dot = images.createImage(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)


    export const dash = images.createImage(`
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            . . . . .
            `)


    function morseCodeAlphabetImage(i: MorseAlphabet): Image[]{
        switch (i){
            case MorseAlphabet.A: return [dot, dash];
            case MorseAlphabet.B: return [dash, dot, dot, dot];
            case MorseAlphabet.C: return [dash, dot, dash, dot];
            case MorseAlphabet.D: return [dash, dot, dot];
            case MorseAlphabet.E: return [dot];
            case MorseAlphabet.F: return [dot, dot, dash, dot];
            case MorseAlphabet.G: return [dash, dash, dot];
            case MorseAlphabet.H: return [dot, dot, dot, dot];
            case MorseAlphabet.I: return [dot, dot];
            case MorseAlphabet.J: return [dot, dash, dash, dash];
            case MorseAlphabet.K: return [dash, dot, dash];
            case MorseAlphabet.L: return [dot, dash, dot, dot];
            case MorseAlphabet.M: return [dash, dash];
            case MorseAlphabet.N: return [dash, dot];
            case MorseAlphabet.O: return [dash, dash, dash];
            case MorseAlphabet.P: return [dot, dash, dash, dot];
            case MorseAlphabet.Q: return [dash, dash, dot, dash];
            case MorseAlphabet.R: return [dot, dash, dot];
            case MorseAlphabet.S: return [dot, dot, dot];
            case MorseAlphabet.T: return [dash];
            case MorseAlphabet.U: return [dot, dot, dash];
            case MorseAlphabet.V: return [dot, dot, dot, dash];
            case MorseAlphabet.W: return [dot, dash, dash];
            case MorseAlphabet.X: return [dash, dot, dot, dash];
            case MorseAlphabet.Y: return [dash, dot, dash, dash];
            case MorseAlphabet.Z: return [dash, dash, dot, dot];
            default: return []
        }
    }

    /**
     * Display more code
     * @param text write description here, eg: "hello"
     * @param speed write description here, eg: 8
     */
    //% block="show | %text | as Morse code at speed | %speed"
    //% speed.min=1 speed.max=10
    //% group="Morse Code"
    export function morseTwo(text: string, speed: number): void{
        speed = 100*(11 - speed);
        let dotInterval = speed;
        let dashInterval = 3*speed;
        let letterInterval = 2*speed;
        let wordInterval = 6*speed;
        for (let letter of text){
            letter = letter.toLowerCase()
            let alphabetValue = letterToMorseAlphabet(letter)
            let images = morseCodeAlphabetImage(alphabetValue)
            for (let i of images){
                let interval = i === dot ? dotInterval : dashInterval
                i.showImage(0, interval)
                basic.clearScreen()
                basic.pause(speed)
            }
            letter === ' ' ? basic.pause(wordInterval) : basic.pause(letterInterval)
        }
    }
}


namespace Math {
    /**
     * Perform modular arithmetic that returns a positive value.
     * Returns the remainder of a divided by n.
     * @param a The value to be divided.
     * @param n The value that divides a. 
     */
    //% block="%a | mod | %n"
    export function mod(a: number, n: number): number {
        return (a % n + n) % n
    }
}



enum EncryptionSetting{
    Encrypt,
    Decrypt
}

enum ShiftAlphabet {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};

enum MorseAlphabet {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};

enum PigpenAlphabet {
    //% jres=customIcons.pigpenA
    A,
    //% jres=customIcons.pigpenB
    B,
    //% jres=customIcons.pigpenC
    C,
    //% jres=customIcons.pigpenD
    D,
    //% jres=customIcons.pigpenE
    E,
    //% jres=customIcons.pigpenF
    F,
    //% jres=customIcons.pigpenG
    G,
    //% jres=customIcons.pigpenH
    H,
    //% jres=customIcons.pigpenI
    I,
    //% jres=customIcons.pigpenJ
    J,
    //% jres=customIcons.pigpenK
    K,
    //% jres=customIcons.pigpenL
    L,
    //% jres=customIcons.pigpenM
    M,
    //% jres=customIcons.pigpenN
    N,
    //% jres=customIcons.pigpenO
    O,
    //% jres=customIcons.pigpenP
    P,
    //% jres=customIcons.pigpenQ
    Q,
    //% jres=customIcons.pigpenR
    R,
    //% jres=customIcons.pigpenS
    S,
    //% jres=customIcons.pigpenT
    T,
    //% jres=customIcons.pigpenU
    U,
    //% jres=customIcons.pigpenV
    V,
    //% jres=customIcons.pigpenW
    W,
    //% jres=customIcons.pigpenX
    X,
    //% jres=customIcons.pigpenY
    Y,
    //% jres=customIcons.pigpenZ
    Z 
}

function letterToPigpenAlphabet(x: string): PigpenAlphabet{
    switch (x) {
        case 'a': return PigpenAlphabet.A
        case 'b': return PigpenAlphabet.B
        case 'c': return PigpenAlphabet.C
        case 'd': return PigpenAlphabet.D
        case 'e': return PigpenAlphabet.E
        case 'f': return PigpenAlphabet.F
        case 'g': return PigpenAlphabet.G
        case 'h': return PigpenAlphabet.H
        case 'i': return PigpenAlphabet.I
        case 'j': return PigpenAlphabet.J
        case 'k': return PigpenAlphabet.K
        case 'l': return PigpenAlphabet.L
        case 'm': return PigpenAlphabet.M
        case 'n': return PigpenAlphabet.N
        case 'o': return PigpenAlphabet.O
        case 'p': return PigpenAlphabet.P
        case 'q': return PigpenAlphabet.Q
        case 'r': return PigpenAlphabet.R
        case 's': return PigpenAlphabet.S
        case 't': return PigpenAlphabet.T
        case 'u': return PigpenAlphabet.U
        case 'v': return PigpenAlphabet.V
        case 'w': return PigpenAlphabet.W
        case 'x': return PigpenAlphabet.X
        case 'y': return PigpenAlphabet.Y
        case 'z': return PigpenAlphabet.Z
        default: return null
    }
}


function letterToMorseAlphabet(x: string): MorseAlphabet{
    switch (x) {
        case 'a': return MorseAlphabet.A
        case 'b': return MorseAlphabet.B
        case 'c': return MorseAlphabet.C
        case 'd': return MorseAlphabet.D
        case 'e': return MorseAlphabet.E
        case 'f': return MorseAlphabet.F
        case 'g': return MorseAlphabet.G
        case 'h': return MorseAlphabet.H
        case 'i': return MorseAlphabet.I
        case 'j': return MorseAlphabet.J
        case 'k': return MorseAlphabet.K
        case 'l': return MorseAlphabet.L
        case 'm': return MorseAlphabet.M
        case 'n': return MorseAlphabet.N
        case 'o': return MorseAlphabet.O
        case 'p': return MorseAlphabet.P
        case 'q': return MorseAlphabet.Q
        case 'r': return MorseAlphabet.R
        case 's': return MorseAlphabet.S
        case 't': return MorseAlphabet.T
        case 'u': return MorseAlphabet.U
        case 'v': return MorseAlphabet.V
        case 'w': return MorseAlphabet.W
        case 'x': return MorseAlphabet.X
        case 'y': return MorseAlphabet.Y
        case 'z': return MorseAlphabet.Z
        default: return null
    }
}