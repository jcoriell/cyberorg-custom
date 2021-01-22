encryption.consoleOn(true)
let machine = encryption.createMachine(EnigmaAlphabet.A, EnigmaAlphabet.A)
machine.addRotor(RotorType.One, EnigmaAlphabet.A)
basic.showString(machine.useMachine("hello"))
