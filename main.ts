let myObj = objects.createObject()
objects.setItem(myObj, "hi", "6")
objects.setItem(myObj, "hiya", 10)
basic.showString("" + (objects.getItem(myObj, "hiya")))
