
//% color=#0D9DDB weight=99 icon="\uf02d"
namespace cyberOrg { 
 

    /**
     * Creates a new dictionary-like object.
    */
    //% block = "new Dictionary"
    //% blockSetVariable=myDictionary
    //% group="Dictionaries"
    export function createDictionary(): Dictionary {
        let newDictionary = new Dictionary("");
        return newDictionary;
    }

    /**
     * Creates a new dictionary-like object from a JSON formatted string.
    */
    //% block = "new Dictionary"
    //% group="Dictionaries"
    //% blockSetVariable=myDictionary
    export function createDictionaryFromString(s: string): Dictionary {
        let newDictionary = new Dictionary(s);
        return newDictionary;
    }


    let _dictionaries: Dictionary[];

    export class Dictionary {
        
        public structure: { [key: string]: any } = {};


        constructor(s:string){
            init()
            if (s.length > 0){
                this.structure = JSON.parse(s);
            }
            _dictionaries.push(this)
        }


        /**
         * Set a key value pair with a string value.
         * @param key is a string, eg: "key1"
         * @param val is the value at the key, eg: "hello"
         */
        //% group="Dictionaries"
        //% block="in %myDictionary set key-value pair %key : %value"
        setKeyValueString(key: string, val: string ): void{
            this.structure[key] = val;
        }

        /**
         * Set a key value pair with a number value.
         * @param key is a string, eg: "key1"
         * @param val is the value at the key, eg: 6
         */
        //% group="Dictionaries"
        //% block="in %myDictionary set key-value pair %key : %value"
        setKeyValueNumber(key: string, val: number ): void{
            this.structure[key] = val;
        }

        //%group="Dictionaries"
        //% block="from %myDictionary get value at key %key"
        getValue(key: string): any{
            return this.structure[key]
        }


        // only support strings and numbers for now.
        // maybe support arrays of string and arrays of numbers

        toString(): string{
            return JSON.stringify(this.structure)
        }

        
    
    }  

    function init(): void {
        _dictionaries = (<Dictionary[]>[]);
    } 

}
