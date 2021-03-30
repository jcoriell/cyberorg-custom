
//% color=#3CDBC0 weight=101 icon="\uf0c9"
//% block="CYBER.ORG"
//% groups='["Activities", "Settings", "Other"]'
namespace cyberOrg {
    
    export let consoleIsOn = false

    //% block
    //% group="Settings"
    export function consoleOn(x: boolean):void{
        consoleIsOn = x
    }

    export function error(msg: string){
        let error = msg;
        console.log(error)
        while (true){
            for (let i=0; i < 2; i++){
                basic.showIcon(IconNames.Sad)
                pause(200)
                basic.clearScreen()
                pause(200)
            }
            basic.showString(error, 100)
        }
    }

    /**
     * Generate a password with a certain length.
     * @param length
     */
    //% block="generate password with %length characters"
    //% length.min=1
    //% length.max=99
    //% group="Other"
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
    //% group="Other"
    export function generateMicrobitPassword(length: number):string{
        let choices = "AB"
        let password = ""
        for (let i = 0; i < length; i++){
            let index = randint(0,1)
            password += choices[index]
        }
        return password
    }

    //% block="guess password of length %length"
    //% group="Activities"
    export function guessPassword(length: number){
        let y_loc = 0
        let x_loc = 0
        let i = 0
        let password = generateMicrobitPassword(length)
        while (i < password.length) {
            x_loc = i % 5
            y_loc = Math.floor(i / 5)
            if (input.buttonIsPressed(Button.A)) {
                control.waitForEvent(Button.A, TouchButtonEvent.Released)
                if (password.charAt(i) == "A") {
                    led.plotBrightness(x_loc, y_loc, 150)
                    i += 1
                } 
                
                else {
                    i = 0
                    basic.clearScreen()
                    //pause(250)
                    basic.showIcon(IconNames.No)
                    pause(250)
                    basic.clearScreen()
                }
                
            } 
            else if (input.buttonIsPressed(Button.B)) {
                if (password.charAt(i) == "B") {
                    control.waitForEvent(Button.B, TouchButtonEvent.Released)
                    led.plotBrightness(x_loc, y_loc, 255)
                    i += 1
                } 
                
                else {
                    i = 0
                    basic.clearScreen()
                    //pause(250)
                    basic.showIcon(IconNames.No)
                    pause(250)
                    basic.clearScreen()
                }
                
            }
        }
        pause(500)
        basic.showIcon(IconNames.Happy)
    }

    /**
     * Displays a 5 bit binary array as pixels
     * @param nums, eg: [1,0,1,0,1]
     */
    //% block
    //% group="Other"
    export function displayBinaryPixels(nums: number[]):void{
        let row = 2;
        let brightness: number;
        for (let i=0; i < 5; i++){
            nums[i] === 1 ? brightness = 255 : brightness = 10;
            led.plotBrightness(i, row, brightness);
        }
    }

    /**
     * Takes a number and converts it to a 5 bit binary array
     * @param value, eg: 2
     */
    //% block
    //% value.min = 0
    //% value.max = 31
    //% group="Other"
    export function createBinaryArray(value: number): number[]{
        let binaryArray = [0,0,0,0,0]
        if (value/16 >= 1) {
            binaryArray[0] = 1
            value -= 16
        }
        if (value/8 >= 1) {
            binaryArray[1] = 1
            value -= 8
        }
        if (value/4 >= 1) {
            binaryArray[2] = 1
            value -= 4
        }
        if (value/2 >= 1) {
            binaryArray[3] = 1
            value -= 2
        }
        if (value >= 1) {
            binaryArray[4] = 1
        }
        return binaryArray
    }

    /**
     * This block turns the microbit into a binary counter. 
     * Hold B for more than 5 seconds to quit.
     */
    //% block 
    //% group="Activities"
    export function binaryCounter(){
        let counter = 0
        while (true){
            if (input.buttonIsPressed(Button.A)){
                control.waitForEvent(Button.A, TouchButtonEvent.Released)
                counter -= 1
            }
            else if (input.buttonIsPressed(Button.B)){
                let startCancel = control.millis()
                control.waitForEvent(Button.B, TouchButtonEvent.Released)
                if (control.millis() - startCancel > 5000){
                    basic.clearScreen()
                    break
                }
                counter += 1
            }
            if (counter > 31){
                counter = 0
            }
            if (counter < 0){
                counter = 31
            }
            displayBinaryPixels(createBinaryArray(counter));
        }
    }


 
}

