namespace encryption {
    
    //% block="Vigenere $setting message $text with key $key"
    //% group="Vigenere"
    export function vigenereEncrypt(setting: EncryptionSetting, text: string, key: string): string {
        let validKey = ''
        let message = ''
        let validKeyPosition = 0
        let validKeyLength = 0
        for (let i = 0; i < key.length; i++){
            let keyCharacter = key.charAt(i).toLowerCase()
            if (shiftCipherAlphabet.includes(keyCharacter)){
                validKey += keyCharacter
            }           
        }
        validKeyLength = validKey.length
        for (let j = 0; j < text.length; j++){
            let character = text.charAt(j).toLowerCase()
            if (shiftCipherAlphabet.includes(character)){
                let newCharacter = ''
                if (setting === EncryptionSetting.Encrypt){
                    newCharacter = shiftAlpha(character, 'a', validKey.charAt(validKeyPosition))
                    }
                else {
                    newCharacter = shiftAlpha(character, validKey.charAt(validKeyPosition), 'a')
                }
                message += newCharacter
                validKeyPosition += 1
                validKeyPosition = Math.mod(validKeyPosition, validKeyLength)
            }
            else{
                message += character
            }
        }
        return message
    }
}

enum EncryptionSetting{
    Encrypt,
    Decrypt
}