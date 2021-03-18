
//% color=#0D9DDB weight=99 icon="\uf02d"
namespace dictionaries { 
 
    /**
     * Creates a new dictionary-like object.
    */
    //% block = "new Dictionary"
    //% blockSetVariable=myDictionary
    export function createDictionary(): Dictionary {
        let newDictionary = new Dictionary;
        return newDictionary;
    }


    let _dictionaries: Dictionary[];

    export class Dictionary {

        public structure: { [key: string]: any } = {};

        constructor(){
            init()
            _dictionaries.push(this)
        }

        /**
         * Set a key value pair for a dictionary
         * @param dictionary is a dictionary
         * @param key is a string, eg: "key1"
         * @param value is the value at the key, eg: "hello"
         */
        //% block="in %myDictionary set key-value pair %key : %value"
        setKeyValueString(key: string, val: string ): void{
            this.structure[key] = val;
        }

        /**
         * Set a key value pair for a dictionary
         * @param dictionary is a dictionary
         * @param key is a string, eg: "key1"
         * @param value is the value at the key, eg: 6
         */
        //% block="in %myDictionary set key-value pair %key : %value"
        setKeyValueNumber(key: string, val: number ): void{
            this.structure[key] = val;
        }

        //% block="from %myDictionary get value at key %key"
        getValue(key: string ): any{
            return this.structure[key];
        }
    
    }  

    function init(): void {
        _dictionaries = (<Dictionary[]>[]);
    } 

}


