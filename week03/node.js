function foo(){
    console.log(new.target)
}
foo()
new foo()

class Parent {
    constructor(){
        this.a = 1
    }
}
class Child extends Parent{
    constructor(){
        super()
        console.log(this.a)
    }
}

var name='lili'
function foo1(){
    console.log(arguments)
}
foo`Hello ${name} !`

class Reference {
    constructor(object, property){
        this.object = object
        this.property = property
    }
}