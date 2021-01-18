/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */



/**
 * Custom blocks
 */
//% weight=100 color=#00C1D4 icon="☰"
//% groups='["Shift Ciphers", "Vigenere Ciphers", "Pigpen", "Morse Code"]'
namespace encryption {

    //% block
    //% group="Shift Ciphers"
    export const shiftCipherAlphabet = "abcdefghijklmnopqrstuvwxyz"

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
    //% block="shift | %s | with shift | %k1 | to | %k2"
    //% group="Shift Ciphers"
    export function shiftAlpha(s: string, k1: string, k2: string): string {
        k1 = k1.charAt(0).toLowerCase()
        k2 = k2.charAt(0).toLowerCase()
        let n1 = shiftCipherAlphabet.indexOf(k1)
        let n2 = shiftCipherAlphabet.indexOf(k2)
        return shiftNumeric(s, n2 - n1)
    }

    /**
     * TODO: describe your function here
     * @param s describe value here, eg: "hello"
     * @param k1 describe value here, eg: Alphabet.A 
     * @param k2 describe value here, eg: Alphabet.D
    */
    //% block="shift | %s | with shift | %k1=device_letter | to | %k2=device_letter"
    //% useEnumVal=1
    //% group="Shift Ciphers"
    export function shiftAlphaTwo(s: string, k1: number, k2: number): string{
        return shiftNumeric(s, k2 - k1)
    }

    //% blockId=device_letter block="%name"
    //% useEnumVal=1
    //% name.fieldEditor="gridpicker"
    //% name.fieldOptions.columns="13"
    //% name.fieldOptions.width="380"
    //% name.fieldOptions.maxRows=3
    export function letterValue(name: Alphabet): number {
        return name;
    }

    //% block
    //% group="Pigpen"
    export function pigpenAlphabetImage(i: Alphabet): Image {
        switch (i) {
            case Alphabet.A: return images.createImage(`. . . . #\n. . . . #\n. . . . #\n. . . . #\n# # # # #`);
            case Alphabet.B: return images.createImage(`. . . . #\n. . . . #\n. . # . #\n. . . . #\n# # # # #`);
            case Alphabet.C: return images.createImage(`# . . . #\n# . . . #\n# . . . #\n# . . . #\n# # # # #`);
            case Alphabet.D: return images.createImage(`# . . . #\n# . . . #\n# . # . #\n# . . . #\n# # # # #`);
            case Alphabet.E: return images.createImage(`# . . . .\n# . . . .\n# . . . .\n# . . . .\n# # # # #`);
            case Alphabet.F: return images.createImage(`# . . . .\n# . . . .\n# . # . .\n# . . . .\n# # # # #`);
            case Alphabet.G: return images.createImage(`# # # # #\n. . . . #\n. . . . #\n. . . . #\n# # # # #`);
            case Alphabet.H: return images.createImage(`# # # # #\n. . . . #\n. . # . #\n. . . . #\n# # # # #`);
            case Alphabet.I: return images.createImage(`# # # # #\n# . . . #\n# . . . #\n# . . . #\n# # # # #`);
            case Alphabet.J: return images.createImage(`# # # # #\n# . . . #\n# . # . #\n# . . . #\n# # # # #`);
            case Alphabet.K: return images.createImage(`# # # # #\n# . . . .\n# . . . .\n# . . . .\n# # # # #`);
            case Alphabet.L: return images.createImage(`# # # # #\n# . . . .\n# . # . .\n# . . . .\n# # # # #`);
            case Alphabet.M: return images.createImage(`# # # # #\n. . . . #\n. . . . #\n. . . . #\n. . . . #`);
            case Alphabet.N: return images.createImage(`# # # # #\n. . . . #\n. . # . #\n. . . . #\n. . . . #`);
            case Alphabet.O: return images.createImage(`# # # # #\n# . . . #\n# . . . #\n# . . . #\n# . . . #`);
            case Alphabet.P: return images.createImage(`# # # # #\n# . . . #\n# . # . #\n# . . . #\n# . . . #`);
            case Alphabet.Q: return images.createImage(`# # # # #\n# . . . .\n# . . . .\n# . . . .\n# . . . .`);
            case Alphabet.R: return images.createImage(`# # # # #\n# . . . .\n# . # . .\n# . . . .\n# . . . .`);
            case Alphabet.S: return images.createImage(`. . . . .\n. . . . .\n# . . . #\n. # . # .\n. . # . .`);
            case Alphabet.T: return images.createImage(`. . . . .\n. . # . .\n# . . . #\n. # . # .\n. . # . .`);
            case Alphabet.U: return images.createImage(`. . # . .\n. . . # .\n. . . . #\n. . . # .\n. . # . .`);
            case Alphabet.V: return images.createImage(`. . # . .\n. . . # .\n. # . . #\n. . . # .\n. . # . .`);
            case Alphabet.W: return images.createImage(`. . # . .\n. # . # .\n# . . . #\n. . . . .\n. . . . .`);
            case Alphabet.X: return images.createImage(`. . # . .\n. # . # .\n# . . . #\n. . # . .\n. . . . .`);
            case Alphabet.Y: return images.createImage(`. . # . .\n. # . . .\n# . . . .\n. # . . .\n. . # . .`);
            case Alphabet.Z: return images.createImage(`. . # . .\n. # . . .\n# . . # .\n. # . . .\n. . # . .`);
            default: return images.createImage(`. .\n. .\n. .\n. .\n. .`);
        }
    }



    //% block
    //% group="Pigpen"
    export function Pigpen(text: string): void{
        let space = images.createImage(`. .\n. .\n. .\n. .\n. .`)
        let ending = images.createImage(`. . .\n. . .\n. . .\n. . .\n. . .`)
        for (let value of text) {
            value = value.toLowerCase()
            pigpenAlphabetImage(letterToAlphabet(value)).scrollImage(0, 250)
            space.scrollImage(0, 250)
        }
        ending.scrollImage(0, 250)
    }

    /**
     * morse
     * @param text write description here, eg: "hello"
     * @param time write description here, eg: 2
     */
    //% block
    //% time.min=1 time.max=10
    //% group="Morse Code"
    export function Morse(text: string, time: number = 8): void{
        time = 11-time
        let plainTextMessage = text
        let check = ' 0123456789abcdefghijklmnopqrstuvwxyz'
        let code: { [key: string]: String} = {
            ' ': 'xxxxx',
            '0': '-----',
            '1': '.----',
            '2': '..---',
            '3': '...--',
            '4': '....-',
            '5': '.....',
            '6': '-....',
            '7': '--...',
            '8': '---..',
            '9': '----.',
            'a': '.-',
            'b': '-...',
            'c': '-.-.',
            'd': '-..',
            'e': '.',
            'f': '..-.',
            'g': '--.',
            'h': '....',
            'i': '..',
            'j': '.---',
            'k': '-.-',
            'l': '.-..',
            'm': '--',
            'n': '-.',
            'o': '---',
            'p': '.--.',
            'q': '--.-',
            'r': '.-.',
            's': '...',
            't': '-',
            'u': '..-',
            'v': '...-',
            'w': '.--',
            'x': '-..-',
            'y': '-.--',
            'z': '--..' 
        }
        let dot = images.createImage(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
        let dash = images.createImage(`
            . . . . .
            . . . . .
            # # # # #
            . . . . .
            . . . . .
            `)
        let morseMessage = ''
        for (let value of plainTextMessage) {
            value = value.toLowerCase()
            if (check.includes(value)) {
                morseMessage = morseMessage + (code[value] + 'xx')
            }
        }
        serial.writeLine(morseMessage)
        for (let signal of morseMessage){
            if (signal == '.'){
                dot.showImage(0)
                basic.pause(100 * time)
                basic.clearScreen()
            }
            else if (signal == '-'){
                dash.showImage(0)
                basic.pause(300 * time)
                basic.clearScreen()
            }
            basic.pause(100 * time)
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


//% color=#3CDBC0 weight=101 icon="☰"
namespace pairings { 
    
    let _pairings: Pairing[];

    //% block = "new mapping"
    export function createPairing(): Pairing {
        init();
        let newMapping = new Pairing();
        return newMapping;
    }
    
    //%
    export class Pairing {
        public keys: string[];
        public values: string[];

        constructor(){
            init();
            this.keys = [];
            this.values = [];
            _pairings.push(this);
        }

        //% block="set | %pairing | %key | : | %value"
        public setPair(key: string, value: string): void{
            let index = this.keys.indexOf(key)
            if (index > -1) {
                this.values[index] = value
            }
            else{
                this.keys.push(key)
                this.values.push(value)
            }
            
        }

        //% block="%pairing | get value at key | %key"
        public getValue(key: string): string {
            let index = this.keys.indexOf(key)
            if (index > -1){
                return this.values[index]
            }
            return 'key not found'
        }

        //% block="%pairing | delete pair at key | %key"
        public delPair(key: string): void {
            let index = this.keys.indexOf(key)
            if (index > -1){
                this.keys.splice(index, 1)
                this.values.splice(index, 1)
            }
        }
    }

    function init(): void {
        _pairings = (<Pairing[]>[]);
    }
}

enum Alphabet {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z}

function letterToAlphabet(x: string): Alphabet{
    switch (x) {
        case 'a': return Alphabet.A
        case 'b': return Alphabet.B
        case 'c': return Alphabet.C
        case 'd': return Alphabet.D
        case 'e': return Alphabet.E
        case 'f': return Alphabet.F
        case 'g': return Alphabet.G
        case 'h': return Alphabet.H
        case 'i': return Alphabet.I
        case 'j': return Alphabet.J
        case 'k': return Alphabet.K
        case 'l': return Alphabet.L
        case 'm': return Alphabet.M
        case 'n': return Alphabet.N
        case 'o': return Alphabet.O
        case 'p': return Alphabet.P
        case 'q': return Alphabet.Q
        case 'r': return Alphabet.R
        case 's': return Alphabet.S
        case 't': return Alphabet.T
        case 'u': return Alphabet.U
        case 'v': return Alphabet.V
        case 'w': return Alphabet.W
        case 'x': return Alphabet.X
        case 'y': return Alphabet.Y
        case 'z': return Alphabet.Z
        default: return null
    }
}





