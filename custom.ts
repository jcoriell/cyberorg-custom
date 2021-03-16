// Todo
// - add console for all encryption methods
// - 

//% color=#3CDBC0 weight=101 icon="\uf0c9"
//% block="CYBER.ORG"
namespace cyberOrg {

    export let mbpass = ""
    let useMbPass = false
    
    export let consoleIsOn = false

    //% block
    export function consoleOn(x: boolean):void{
        consoleIsOn = x
    }

    /**
     * Generate a password with a certain length.
     * @param length
     */
    //% block="generate password with %length characters"
    //% length.min=1
    //% length.max=99
    export function generatePassword(length: number): string{
        let password = ""
        for (let i=0; i < length; i++){
            let path = randint(1, 4)
            if (path === 1){
                password += randint(0, 9)
            }
            else if (path === 2){
                let alpha = "abcdefghijklmnopqrstuvwxyz"
                let alphaIndex = randint(0, alpha.length - 1)
                password += alpha[alphaIndex]
            }
            else if (path === 3){
                let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let alphaIndex = randint(0, alpha.length - 1)
                password += alpha[alphaIndex]
            }
            else {
                let symbols = "!@#$%^&*()_-+=?"
                let symbolsIndex = randint(0, symbols.length - 1)
                password += symbols[symbolsIndex]
            }
        }

        return password;
    }

    //% block
    export function generateMicrobitPassword(length: number):string{
        let choices = "AB"
        let password = ""
        for (let i = 0; i < length; i++){
            let index = randint(0,1)
            password += choices[index]
        }
        mbpass = password
        return password
    }


 
}

