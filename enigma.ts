    
namespace encryption {
    let consoleIsOn = false

    //% block
    export function consoleOn(x: boolean):void{
        consoleIsOn = x
    }

    //% block="message %message initial %initial || rotor %rotor position %position \n reflector %reflector"
    //% useEnumVal=1
    //% initial.fieldEditor="gridpicker"
    //% initial.fieldOptions.columns="13"
    //% initial.fieldOptions.maxRows=3
    //% position.fieldEditor="gridpicker"
    //% position.fieldOptions.columns="13"
    //% position.fieldOptions.maxRows=3  
    //% reflector.fieldEditor="gridpicker"
    //% rPosition.fieldOptions.columns="13"
    //% rPosition.fieldOptions.maxRows=3  
    //% group="Enigma"
    //% advanced=false
    export function oneRotorEnigma(s: string, initial: EnigmaAlphabet, rotor: RotorType, position: EnigmaAlphabet, rPosition: EnigmaAlphabet): string {
        let count = 0
        let result = ''
        let consoleStr = ''
        for (let i = 0; i <s.length; i++){
            let character = s.charAt(i).toLowerCase()
            consoleStr += `Current Character is '${character}'\n`
            count = Math.mod(count,26)
            if (shiftCipherAlphabet.includes(character)){

                let index = shiftCipherAlphabet.indexOf(character)
                consoleStr += `Value of Current Character is ${index.toString()}\n`

                let value = Math.mod(index - initial, 26) //can the other 26 be a descriptive variable instead? Is it just the length of our alphabet?
                consoleStr += `Value after initial ring ${value.toString()}\n`
                
                value = Math.mod(value + forward[rotor][Math.mod(value + position + count,26)], 26) //can the other 26 be a descriptive variable instead?
                consoleStr += `Value after first rotor; Forward pass.  ${value.toString()}\n`

                value = Math.mod(value + reflector[Math.mod(value + rPosition, 26)],26) // can the other 26 be a descriptive variable instead?
                consoleStr += `Value after reflector.  ${value.toString()}\n`

                value = Math.mod(value + reverse[rotor][Math.mod(value + position + count,26)], 26) //can the other 26 be a descriptive variable instead?
                consoleStr += `Value after first rotor; Returning pass.  ${value.toString()}\n`

                value = Math.mod(value + initial, 26) // can the other 26 be a descriptive variable instead?
                consoleStr += `Final Value at initial ring.  ${value.toString()}\n`

                result = result + shiftCipherAlphabet.charAt(value)
                consoleStr += `Character returned from final value.  ${shiftCipherAlphabet.charAt(value)}\n-\n`

                count = count + 1
            }
            else{
                consoleStr += 'Character not in alphabet. Character skipped. \n-\n'
                result = result + character                              
            }
        }

        consoleIsOn && serial.writeLine(consoleStr)

        return result;
    }



    
    let _machines: Machine[];

    //% block="create machine | initial $initial | rotors $rotors | reflector $reflector"
    //% group="Enigma"
    //% rotors.shadow="lists_create_with"
    //% rotors.defl="rotorBlock"
    export function createMachine(initial: EnigmaAlphabet, rotors: Rotor[], reflector: EnigmaAlphabet): Machine {
        machineinit();
        let machine = new Machine(rotors);
        return machine;
    }
    
    
    export class Machine {
        public initial: EnigmaAlphabet;
        public rotors: Rotor[];
        public reflector: EnigmaAlphabet;

        constructor(rotors: Rotor[]){
            machineinit();
            this.initial = EnigmaAlphabet.A;
            this.rotors = rotors
            this.reflector = EnigmaAlphabet.A;
            _machines.push(this);
        }


        //% block="use %machine on %message"
        //% group="Enigma"
        public useMachine(message: string): void {
            serial.writeLine(`Machine used on ${message}`)
        }



    }

    function machineinit(): void {
        _machines = (<Machine[]>[]);
    }


    //% block="$c1 position $p1"
    //% blockId=rotorBlock
    //% inlineInputMode=inline
    //% group="Enigma"
    export function rotor(c1: RotorType, p1: EnigmaAlphabet): Rotor {
        rotorinit();
        let newRotor = new Rotor(c1, p1);
        return newRotor
    }

    let _rotors: Rotor[];

    class Rotor {
        public c1: RotorType;
        public p1: EnigmaAlphabet;
 
        constructor(c:RotorType, p: EnigmaAlphabet){
            rotorinit()
            this.c1 = c;
            this.p1 = p;
            _rotors.push(this)
        }
    }  

    function rotorinit(): void {
        _rotors = (<Rotor[]>[]);
    } 



}


const forward = [
        [2,  2,  2, -3, -3,  1,  2, -2, -1,  2, -1,  1,  2, -3,  3, -2, 3,  3, -3, -3,  2, -3, -1,  2, -1, -1],
        [1, -1,  1,  1,  1, -3,  2, -1, -1,  2,  2, -2, -2,  1, -1,  1, 1, -2,  2, -1, -1,  3,  3, -2, -2, -2],
        [3, -1, -1,  3,  3, -3, -2, -2,  1, -1,  1, -1,  3, -1, -1, -1, 2,  2, -2, -2,  3,  3,  3, -3, -3, -3]
    ];
const reverse = [
        [3,  3, -2, -2, -2,  2, -1,  1, -2,  1,  3, -2, -1, 2, -2,  3,  3, -3,  3, -3, -3,  1, -2,  1,  1, -2],
        [1, -1,  3, -1, -1, -1,  1,  1, -2,  2,  2, -2, -2, 1, -1,  2, -1, -1,  1,  1, -2,  2,  2,  2, -3, -3],
        [1,  1,  3, -3,  2,  2, -3, -3,  1, -1,  1, -1,  1, 1,  1, -3,  2,  2, -2, -2,  3,  3,  3, -3, -3, -3]
    ];
const reflector = [4, 2, 5, -2, -4, 3, 5, -5, -3, 3, 4, -5, -3, 5, -4, 2, 4, -2, -5, 3, -4, 3, -3, 2, -3, -2];


enum EnigmaAlphabet {A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z};
enum RotorType{One,Two,Three}






