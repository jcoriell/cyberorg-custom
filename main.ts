let myDictionary = dictionaries.createDictionary()
dictionaries.setKeyValue(myDictionary, "key1", 5146)
dictionaries.setKeyValue(myDictionary, "hello", "g")
basic.showString("" + (dictionaries.getValue(myDictionary, "hello")))
