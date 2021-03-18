
//% color=#0D9DDB weight=99 icon="\uf00b"
namespace dictionaries { 
    
    //% block = "new JS Object"
    //% blockSetVariable=myDictionary
    export function createDictionary(): {} {
        let newDictionary: { [key: string]: any } = {};
        return newDictionary;
    }

    /**
     * Set a key value pair for a dictionary
     * @param dictionary is a dictionary
     * @param key is a string, eg: "key1"
     * @param value is the value at the key, eg: 6
     */
    //% block="%dictionary set key %key value %value"
    export function setKeyValue(dictionary: any,  key: string, val: any ): void{
        dictionary[key] = val;
    }

    //% block="%dictionary get value at key %key"
    export function getValue(dictionary: any,  key: string ): any{
        return dictionary[key];
    }

}


