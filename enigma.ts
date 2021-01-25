    
namespace encryption {

    export const enigmaCipherAlphabet = "abcdefghijklmnopqrstuvwxyz"

    
    let _machines: Machine[];

    //% block="Enigma Machine || Entry $initial | Reflector $reflector"
    //% group="Enigma"
    //% rotors.shadow="lists_create_with"
    //% rotors.defl="rotorBlock"
    //% blockSetVariable=machine
    export function createMachine(initial = EnigmaAlphabet.A, reflector = EnigmaAlphabet.A): Machine {
        machineinit();
        return new Machine();
    }
    
    //% autoCreate=encryption.createMachine
    export class Machine {
        public initial: EnigmaAlphabet;
        public rotors: Rotor[];
        public reflector: EnigmaAlphabet;

        constructor(){
            machineinit();
            this.initial = EnigmaAlphabet.A;
            this.rotors = []
            this.reflector = EnigmaAlphabet.A;
            _machines.push(this);
        }


        //% block="%machine add | rotor %cipher | position %position"
        //% position.fieldEditor="gridpicker"
        //% group="Enigma"
        public addRotor(cipher: RotorType, position: EnigmaAlphabet): void {
            let newRotor = new Rotor(cipher, position)
            this.rotors.push(newRotor)
        }

        //% block="use %machine on %message"
        //% group="Enigma"
        public useMachine(message: string): string {
            let count = 0
            let result = ''
            let consoleStr = ''
            let alphabetLength = enigmaCipherAlphabet.length
            for (let i = 0; i < message.length; i++){
                let character = message.charAt(i).toLowerCase()
                consoleStr += `Current Character is '${character}'\n`
                if (enigmaCipherAlphabet.includes(character)){

                    // to numbers
                    let index = enigmaCipherAlphabet.indexOf(character)
                    consoleStr += `Value of Current Character is ${index.toString()}\n`

                    let value = Math.mod(index - this.initial, alphabetLength)
                    consoleStr += `Value after initial ring ${value.toString()}\n`
                    
                    //forward
                    for (let j=0; j < this.rotors.length; j++){
                        let location = Math.mod(value + this.rotors[j].position + Math.mod(Math.floor(count/Math.pow(alphabetLength, this.rotors.length-j-1)), alphabetLength), alphabetLength)
                        value = Math.mod(value + forwardWiring[this.rotors[j].wiring][location], alphabetLength)
                        consoleStr += `Value after  Rotor ${j+1}; Forward pass.  ${value.toString()}\n`
                    }


                    //reflect
                    value = Math.mod(value + reflectorWiring[Math.mod(value + this.reflector, 26)],26)
                    consoleStr += `Value after reflector.  ${value.toString()}\n`

                    //reverse
                    for (let j=this.rotors.length-1; j >= 0; j--){
                        let location = Math.mod(value + this.rotors[j].position + Math.mod(Math.floor(count/Math.pow(alphabetLength, this.rotors.length-j-1)), alphabetLength), alphabetLength)
                        value = Math.mod(value + reverseWiring[this.rotors[j].wiring][location], alphabetLength)
                        consoleStr += `Value after  Rotor ${j+1}; Forward pass.  ${value.toString()}\n`
                    }


                    //back to letters
                    value = Math.mod(value + this.initial, alphabetLength)
                    consoleStr += `Final Value at initial ring.  ${value.toString()}\n`

                    result = result + enigmaCipherAlphabet.charAt(value)
                    consoleStr += `Character returned from final value.  ${enigmaCipherAlphabet.charAt(value)}\n-\n`

                    count = count + 1
                }
                else{
                    consoleStr += 'Character not in alphabet. Character skipped. \n-\n'
                    result = result + character                              
                }
            }
            consoleStr += `Final message.\n ${result}`
            consoleIsOn && serial.writeLine(consoleStr)

            return result;
    
        }



    }

    function machineinit(): void {
        _machines = (<Machine[]>[]);
    }



     function rotor(c1: RotorType, p1: EnigmaAlphabet): Rotor {
        rotorinit();
        let newRotor = new Rotor(c1, p1);
        return newRotor
    }

    let _rotors: Rotor[];

    class Rotor {
        public wiring: RotorType;
        public position: EnigmaAlphabet;
 
        constructor(c:RotorType, p: EnigmaAlphabet){
            rotorinit()
            this.wiring = c;
            this.position = p;
            _rotors.push(this)
        }
    }  

    function rotorinit(): void {
        _rotors = (<Rotor[]>[]);
    } 



}


const forwardWiring = [
        [2,  2,  2, -3, -3,  1,  2, -2, -1,  2, -1,  1,  2, -3,  3, -2, 3,  3, -3, -3,  2, -3, -1,  2, -1, -1],
        [1, -1,  1,  1,  1, -3,  2, -1, -1,  2,  2, -2, -2,  1, -1,  1, 1, -2,  2, -1, -1,  3,  3, -2, -2, -2],
        [3, -1, -1,  3,  3, -3, -2, -2,  1, -1,  1, -1,  3, -1, -1, -1, 2,  2, -2, -2,  3,  3,  3, -3, -3, -3]
    ];
const reverseWiring = [
        [3,  3, -2, -2, -2,  2, -1,  1, -2,  1,  3, -2, -1, 2, -2,  3,  3, -3,  3, -3, -3,  1, -2,  1,  1, -2],
        [1, -1,  3, -1, -1, -1,  1,  1, -2,  2,  2, -2, -2, 1, -1,  2, -1, -1,  1,  1, -2,  2,  2,  2, -3, -3],
        [1,  1,  3, -3,  2,  2, -3, -3,  1, -1,  1, -1,  1, 1,  1, -3,  2,  2, -2, -2,  3,  3,  3, -3, -3, -3]
    ];
const reflectorWiring = [4, 2, 5, -2, -4, 3, 5, -5, -3, 3, 4, -5, -3, 5, -4, 2, 4, -2, -5, 3, -4, 3, -3, 2, -3, -2];


enum EnigmaAlphabet {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};
enum RotorType{I,II,III}






