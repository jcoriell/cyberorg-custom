    
namespace encryption {

    export const enigmaCipherAlphabet = "abcdefghijklmnopqrstuvwxyz"
    

    /**
     * Encrypt a message using a zero rotor enigma machine.
     * @param message a message to encrypt, eg: "hi"
     * @param entry the position of the entry ring, eg: EnigmaAlphabet.A
     * @param reflector the position of the reflector, eg: EnigmaAlphabet.A
     */
    //% block="use zero rotor enigma on %message || Entry %entry Reflector %reflector"
    //% group="Enigma"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=100
    export function zeroRotorMachine(message: string, entry=EnigmaAlphabet.A, reflector=EnigmaAlphabet.A):string{
        let machine = new EnigmaMachine()
        machine.setEntry(entry)
        machine.setReflector(reflector)
        return machine.useMachine(message)
    }


    /**
     * Encrypt a message using a one rotor enigma machine.
     * @param message a message to encrypt, eg: "hi"
     * @param entry the position of the entry ring, eg: EnigmaAlphabet.A
     * @param rotor1 the wiring of the first rotor, eg: RotorWiring.I
     * @param position1 the position of the first rotor, eg: EnigmaAlphabet.A
     * @param reflector the position of the reflector, eg: EnigmaAlphabet.A
     */
    //% block="use one rotor enigma on %message || Key %entry - %rotor1%position1 - %reflector"
    //% group="Enigma"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=90
    export function oneRotorMachine(
                              message: string, 
                              entry=EnigmaAlphabet.A, 
                              rotor1=RotorWiring.I, position1=EnigmaAlphabet.A,
                              reflector=EnigmaAlphabet.A
                              ):string {
        let machine = new EnigmaMachine()
        machine.setEntry(entry)
        machine.addRotor(rotor1, position1)
        machine.setReflector(reflector)
        return machine.useMachine(message)
    }

    /**
     * Encrypt a message using a two rotor enigma machine.
     * @param message a message to encrypt, eg: "hi"
     * @param entry the position of the entry ring, eg: EnigmaAlphabet.A
     * @param rotor1 the wiring of the first rotor, eg: RotorWiring.I
     * @param position1 the position of the first rotor, eg: EnigmaAlphabet.A
     * @param rotor2 the wiring of the second rotor, eg: RotorWiring.II
     * @param position2 the position of the second rotor, eg: EnigmaAlphabet.A
     * @param reflector the position of the reflector, eg: EnigmaAlphabet.A
     */
    //% block="use two rotor enigma on %message || Key %entry - %rotor1%position1 - %rotor2%position2 - %reflector"
    //% group="Enigma"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=80
    export function twoRotorMachine(
                              message: string, 
                              entry=EnigmaAlphabet.A, 
                              rotor1=RotorWiring.I, position1=EnigmaAlphabet.A,
                              rotor2=RotorWiring.II, position2=EnigmaAlphabet.A,
                              reflector=EnigmaAlphabet.A
                              ):string {
        let machine = new EnigmaMachine()
        machine.setEntry(entry)
        machine.addRotor(rotor1, position1)
        machine.addRotor(rotor2, position2)
        machine.setReflector(reflector)
        return machine.useMachine(message)
    }

    /**
     * Encrypt a message using a three rotor enigma machine.
     * @param message a message to encrypt, eg: "hi"
     * @param entry the position of the entry ring, eg: EnigmaAlphabet.A
     * @param rotor1 the wiring of the first rotor, eg: RotorWiring.I
     * @param position1 the position of the first rotor, eg: EnigmaAlphabet.A
     * @param rotor2 the wiring of the second rotor, eg: RotorWiring.II
     * @param position2 the position of the second rotor, eg: EnigmaAlphabet.A
     * @param rotor3 the wiring of the third rotor, eg: RotorWiring.III
     * @param position3 the position of the third rotor, eg: EnigmaAlphabet.A
     * @param reflector the position of the reflector, eg: EnigmaAlphabet.A
     */
    //% block="use three rotor enigma on %message || Key %entry - %rotor1%position1 - %rotor2%position2 - %rotor3%position3 - %reflector"
    //% group="Enigma"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% weight=70
    export function threeRotorMachine(
                              message: string, 
                              entry=EnigmaAlphabet.A, 
                              rotor1=RotorWiring.I, position1=EnigmaAlphabet.A,
                              rotor2=RotorWiring.II, position2=EnigmaAlphabet.A,
                              rotor3=RotorWiring.III, position3=EnigmaAlphabet.A,
                              reflector=EnigmaAlphabet.A
                              ):string {
        let machine = new EnigmaMachine()
        machine.setEntry(entry)
        machine.addRotor(rotor1, position1)
        machine.addRotor(rotor2, position2)
        machine.addRotor(rotor3, position3)
        machine.setReflector(reflector)
        return machine.useMachine(message)
    }
    
    let _machines: EnigmaMachine[];

    //% block="new EnigmaMachine"
    //% group="Enigma"
    //% blockSetVariable=enigma
    //% advanced=true
    //% weight=100
    export function createMachine(): EnigmaMachine {
        machineinit();
        return new EnigmaMachine();
    }
    
    //% autoCreate=encryption.createMachine
    export class EnigmaMachine {
        public entry: EnigmaAlphabet;
        public rotors: Rotor[];
        public reflector: EnigmaAlphabet;

        constructor(){
            machineinit();
            this.entry = EnigmaAlphabet.A;
            this.rotors = []
            this.reflector = EnigmaAlphabet.A;
            _machines.push(this);
        }

        //% block="%enigma set entry %entry"
        //% position.fieldEditor="gridpicker"
        //% group="Enigma"
        //% advanced=true
        //% weight=90
        public setEntry(entry: EnigmaAlphabet): void {
            this.entry = entry;
        }


        //% block="%enigma add | rotor %cipher | position %position"
        //% position.fieldEditor="gridpicker"
        //% group="Enigma"
        //% advanced=true
        //% weight=80
        public addRotor(cipher: RotorWiring, position: EnigmaAlphabet): void {
            let newRotor = new Rotor(cipher, position)
            this.rotors.push(newRotor)
        }

        //% block="%enigma set reflector %entry"
        //% position.fieldEditor="gridpicker"
        //% group="Enigma"
        //% advanced=true
        //% weight=70
        public setReflector(reflector: EnigmaAlphabet): void {
            this.reflector = reflector;
        }

        //% block="use %enigma on %message"
        //% group="Enigma"
        //% advanced=true
        //% weight=60
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

                    let value = Math.mod(index - this.entry, alphabetLength)
                    consoleStr += `Value after entry ring ${value.toString()}\n`
                    
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
                        consoleStr += `Value after  Rotor ${j+1}; Reverse pass.  ${value.toString()}\n`
                    }


                    //back to letters
                    value = Math.mod(value + this.entry, alphabetLength)
                    consoleStr += `Final Value at entry ring.  ${value.toString()}\n`

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
            cyberOrg.consoleIsOn && serial.writeLine(consoleStr)

            return result;
    
        }



    }

    function machineinit(): void {
        _machines = (<EnigmaMachine[]>[]);
    }



     function rotor(c1: RotorWiring, p1: EnigmaAlphabet): Rotor {
        rotorinit();
        let newRotor = new Rotor(c1, p1);
        return newRotor
    }

    let _rotors: Rotor[];

    class Rotor {
        public wiring: RotorWiring;
        public position: EnigmaAlphabet;
 
        constructor(c:RotorWiring, p: EnigmaAlphabet){
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
enum RotorWiring{I,II,III}






