
namespace encryption {
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


    function morseCodeAlphabetImage(i: MorseAlphabet): Image[] {
        switch (i) {
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
            case MorseAlphabet.One: return [dot, dash, dash, dash, dash];
            case MorseAlphabet.Two: return [dot, dot, dash, dash, dash];
            case MorseAlphabet.Three: return [dot, dot, dot, dash, dash];
            case MorseAlphabet.Four: return [dot, dot, dot, dot, dash];
            case MorseAlphabet.Five: return [dot, dot, dot, dot, dot];
            case MorseAlphabet.Six: return [dash, dot, dot, dot, dot];
            case MorseAlphabet.Seven: return [dash, dash, dot, dot, dot];
            case MorseAlphabet.Eight: return [dash, dash, dash, dot, dot];
            case MorseAlphabet.Nine: return [dash, dash, dash, dash, dot];
            case MorseAlphabet.Zero: return [dash, dash, dash, dash, dash];
            case MorseAlphabet.Period : return [];
            case MorseAlphabet.Comma: return [];
            case MorseAlphabet.QuestionMark: return [];
            case MorseAlphabet.Apostrophe: return [];
            case MorseAlphabet.ExclamationPoint: return [];
            case MorseAlphabet.Slash: return [];
            case MorseAlphabet.OpenParenthesis: return [];
            case MorseAlphabet.CloseParenthesis: return [];
            case MorseAlphabet.Ampersand: return [];
            case MorseAlphabet.Colon: return [];
            case MorseAlphabet.Semicolon: return [];
            default: return []
        }
    }

    /**
    * Display more code
    * @param text write description here, eg: "hello"
    * @param speed write description here, eg: 8
    * @param sound controls if sound is produced
    */
    //% block="show | %text | as Morse code at speed | %speed || sound %sound"
    //% speed.min=1 speed.max=10
    //% group="Morse Code"
    export function showMorseCode(text: string, speed: number, sound?: boolean): void {
        speed = 100 * (11 - speed);
        let dotInterval = speed;
        let dashInterval = 3 * speed;
        let letterInterval = 2 * speed;
        let wordInterval = 6 * speed;
        for (let letter of text) {
            letter = letter.toLowerCase()
            let alphabetValue = letterToMorseAlphabet(letter)
            let images = morseCodeAlphabetImage(alphabetValue)
            for (let i of images) {
                let interval = i === dot ? dotInterval : dashInterval
                if (sound){
                    music.ringTone(Note.C)
                }
                i.showImage(0, interval)
                basic.clearScreen()
                if (sound){
                    music.ringTone(0)
                }
                basic.pause(speed)
            }
            letter === ' ' ? basic.pause(wordInterval) : basic.pause(letterInterval)
        }
    }



    function singleWordToMorse(word: string): string {
        let wordAsMorse = ''
        for (let letter of word) {
            letter = letter.toLowerCase()
            let alphabetValue = letterToMorseAlphabet(letter)
            if (alphabetValue !== null){
                let dotAndDashImages = morseCodeAlphabetImage(alphabetValue)
                wordAsMorse += dotAndDashImages.map(blip => blip === dot ? '.' : '-').join('')
            }
            else{ 
                cyberOrg.error(`${letter} is not a supported character.`) 
            }       
            wordAsMorse += ' '
        }
        return wordAsMorse;
    }


    //% block
    export function morseCode(text: string):string{
        let words = text.split(" ")
        let result = words.map(word => singleWordToMorse(word))
                          .filter(word => word !== " " && word !== "")
                          .join(' / ')
        console.log(result)
        return result 
    }
}

enum MorseAlphabet {
    A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,
    One,Two,Three,Four,Five,Six,Seven,Eight,Nine,Zero,
    Period,
    Comma,
    QuestionMark,
    Apostrophe,
    ExclamationPoint,
    Slash,
    OpenParenthesis,
    CloseParenthesis,
    Ampersand,
    Colon,
    Semicolon
};


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
        case '1': return MorseAlphabet.One
        case '2': return MorseAlphabet.Two
        case '3': return MorseAlphabet.Three
        case '4': return MorseAlphabet.Four
        case '5': return MorseAlphabet.Five
        case '6': return MorseAlphabet.Six
        case '7': return MorseAlphabet.Seven
        case '8': return MorseAlphabet.Eight
        case '9': return MorseAlphabet.Nine
        case '0': return MorseAlphabet.Zero
        case '.': return MorseAlphabet.Period
        case ',': return MorseAlphabet.Comma
        case '?': return MorseAlphabet.QuestionMark
        case "'": return MorseAlphabet.Apostrophe
        case '!': return MorseAlphabet.ExclamationPoint
        case '/': return MorseAlphabet.Slash
        case '(': return MorseAlphabet.OpenParenthesis
        case ')': return MorseAlphabet.CloseParenthesis
        case '&': return MorseAlphabet.Ampersand
        case ':': return MorseAlphabet.Colon
        case ';': return MorseAlphabet.Semicolon
        default: return null
    }
}

