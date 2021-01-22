//% color=#3CDBC0 weight=101 icon="☰"
namespace pairings { 
    
    let _pairings: Pairing[];

    //% block = "new mapping"
    export function createPairing(): Pairing {
        init();
        let newMapping = new Pairing();
        return newMapping;
    }
    
    //% autoCreate=pairings.createPairing
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