//% color=#0D3D56 weight=99 icon="\uf120"
//% groups='["Morse Code", "Other"]'
namespace encoding {

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

    let supportedAlphabet: string[] = []
    let supportedMorse: string[] = []
    let supportedCharacters: SupportedChar[] = []

    class SupportedChar{
        public character: string;
        public morse: string;
        public images: Image[];

        constructor(character: string, morse: string, images: Image[]){
           // init();
            this.character = character;
            this.morse = morse;
            this.images = images;
            supportedAlphabet.push(character)
            supportedMorse.push(morse)
            supportedCharacters.push(this)
        } 
    }

    new SupportedChar(' ' , ''      ,  [])
    new SupportedChar('a' , '.-'    ,  [dot, dash])
    new SupportedChar('b' , '-...'  ,  [dash, dot, dot, dot])
    new SupportedChar('c' , '-.-.'  ,  [dash, dot, dash, dot])
    new SupportedChar('d' , '-..'   ,  [dash, dot, dot])
    new SupportedChar('e' , '.'     ,  [dot])
    new SupportedChar('f' , '..-.'  ,  [dot, dot, dash, dot])
    new SupportedChar('g' , '--.'   ,  [dash, dash, dot])
    new SupportedChar('h' , '....'  ,  [dot, dot, dot, dot])
    new SupportedChar('i' , '..'    ,  [dot, dot])
    new SupportedChar('j' , '.---'  ,  [dot, dash, dash, dash])
    new SupportedChar('k' , '-.-'   ,  [dash, dot, dash])
    new SupportedChar('l' , '.-.-'  ,  [dot, dash, dot, dot])
    new SupportedChar('m' , '--'    ,  [dash, dash])
    new SupportedChar('n' , '-.'    ,  [dash, dot])
    new SupportedChar('o' , '---'   ,  [dash, dash, dash])
    new SupportedChar('p' , '.--.'  ,  [dot, dash, dash, dot])
    new SupportedChar('q' , '--.-'  ,  [dash, dash, dot, dash])
    new SupportedChar('r' , '.-.'   ,  [dot, dash, dot])
    new SupportedChar('s' , '...'   ,  [dot, dot, dot])
    new SupportedChar('t' , '-'     ,  [dash])
    new SupportedChar('u' , '..-'   ,  [dot, dot, dash])
    new SupportedChar('v' , '...-'  ,  [dot, dot, dot, dash])
    new SupportedChar('w' , '.--'   ,  [dot, dash, dash])
    new SupportedChar('x' , '-..-'  ,  [dash, dot, dot, dash])
    new SupportedChar('y' , '-.--'  ,  [dash, dot, dash, dash])
    new SupportedChar('z' , '--..'  ,  [dash, dash, dot, dot])


    /**
    * Display Morse code with (or without) sound at a set speed
    * @param text write description here, eg: "hello"
    * @param speed is in words per minute, eg: 5
    * @param sound controls if sound is produced, eg: true
    */
    //% block="show | %text | as Morse code at %speed wpm || sound %sound"
    //% speed.min=1 speed.max=30
    //% group="Morse Code"
    export function showMorseCode(text: string, speed: number, sound = true): void {
        speed = 1000 * 60/(50*speed)
        let dotInterval = speed;
        let dashInterval = 3 * speed;
        let letterInterval = 2 * speed;
        let wordInterval = 6 * speed;

        // check if the text contains any unsupported characters and loop the error if so
        for (let letter of text){
            let index = supportedAlphabet.indexOf(letter)
            if (index < 0){
                cyberOrg.error(`${letter} is not a supported character`)
            }
        }

        // if there were no errors, start blinking 
        for (let letter of text) {
            letter = letter.toLowerCase()
            let index = supportedAlphabet.indexOf(letter)
            let images = supportedCharacters[index].images
            for (let i of images) {
                let interval = i === dot ? dotInterval : dashInterval
                if (sound){
                    music.ringTone(550)
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
            let index = supportedAlphabet.indexOf(letter)
            if (index > -1){
                wordAsMorse += supportedCharacters[index].morse
            }
            else{ 
                cyberOrg.error(`${letter} is not a supported character.`) 
            }       
            wordAsMorse += ' '
        }
        return wordAsMorse;
    }

    /**
     * Turns a message of allowed alphebtical characters to a string of dots and dashes. The resulting string will separate letters by a space and words by space slash space
     * @param text is a string of characters, eg: "Hi you"
     */
    //% block="convert text %text to string of Morse code"
    //% group="Morse Code"
    export function toMorseCode(text: string):string{
        let words = text.split(" ")
        let result = words.map(word => singleWordToMorse(word))
                          .filter(word => word !== " " && word !== "")
                          .join(' / ')
        console.log(result)
        return result 
    }

    /** 
     * Turns a morse code message into alphabetical characters.
     * @param morse is a string of dots and dashes with letters separated by a space and words separated by space slash space, eg: ".... .. / -.-- --- ..-" 
     */
    //% block="convert string of Morse code %morse to text"
    //% group="Morse Code"
    export function toAlphabetCharacters(morse: string):string{
        let words = morse.split(" / ")
        console.log(words)
        let resultingText = ''
        for (let word of words){
            let letters = word.split(" ")
            let resultingWord = ''
            for (let letter of letters){
                let index = supportedMorse.indexOf(letter)
                if (index > -1){
                    resultingWord += supportedAlphabet[index]
                }
                else{
                    cyberOrg.error(`${letter} is not a supported character`)
                }
            }
            resultingText += resultingWord
            resultingText += ' '
        }
        console.log(resultingText)
        return resultingText
    }

    


    enum MorseAlphabet {
        A = 'a',
        B = 'b',
        C = 'c',
        D = 'd',
        E = 'e',
        F = 'f',
        G = 'g',
        H = 'h',
        I = 'i',
        J = 'j',
        K = 'k',
        L = 'l',
        M = 'm',
        N = 'n',
        O = 'o',
        P = 'p',
        Q = 'q',
        R = 'r',
        S = 's',
        T = 't',
        U = 'u',
        V = 'v',
        W = 'w',
        X = 'x',
        Y = 'y',
        Z = 'z',
        One = '1',
        Two = '2',
        Three = '3',
        Four = '4',
        Five = '5',
        Six = '6',
        Seven = '7',
        Eight = '8',
        Nine = '9',
        Zero = '0',
        Period = '.',
        Comma = ',',
        QuestionMark = '?',
        Apostrophe = "'",
        ExclamationPoint = '!',
        Slash = '/',
        OpenParenthesis = '(',
        CloseParenthesis = ')',
        Ampersand = '&',
        Colon = ':',
        Semicolon = ';'
    };

}

