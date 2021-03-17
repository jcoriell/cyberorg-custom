//% color=#0D9DDB weight=99 icon="\uf00b"
namespace pairings { 
    
    let _pairings: Pairings[];

    //% block = "new Pairings"
    //% blockSetVariable=pairings
    export function createPairings(): Pairings {
        init();
        let newMapping = new Pairings();
        return newMapping;
    }
    
    //% autoCreate=pairings.createPairings
    export class Pairings {
        public keys: string[];
        public values: string[];

        constructor(){
            init();
            this.keys = [];
            this.values = [];
            _pairings.push(this);
        }

        //% block="set | %pairings | %key | : | %value"
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

        //% block="%pairings | get value at key | %key"
        public getValue(key: string): string {
            let index = this.keys.indexOf(key)
            if (index > -1){
                return this.values[index]
            }
            return 'key not found'
        }

        //% block="%pairings | delete pair at key | %key"
        public delPair(key: string): void {
            let index = this.keys.indexOf(key)
            if (index > -1){
                this.keys.splice(index, 1)
                this.values.splice(index, 1)
            }
        }
    }

    function init(): void {
        _pairings = (<Pairings[]>[]);
    }
}

//% color=#0D9DDB weight=99 icon="\uf00b"
namespace objects { 
    
    //% block = "new JS Object"
    //% blockSetVariable=pairings
    export function createObject(): {} {
        let newObject:any = {};
        return newObject;
    }

    //% block
    export function setItem(obj: any,  str: string, val: any ): void{
        obj[str] = val;
    }

    //% block
    export function getItem(obj: any,  str: string ): any{
        return obj[str];
    }

}


