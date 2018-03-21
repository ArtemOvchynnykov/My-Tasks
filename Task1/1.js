class Animal {
    
        eat(){}
        sleep(){}
        run(){}
    }
class Predator extends Animal{
    constructor(){
        super();
        }
    eat(){
            return 'vegan animal'
    }
}
class Vegan extends Animal{
    constructor(){
        super();
    }
    eat(){
            return 'grass'
        }
}
class Dog extends Predator{
    constructor(){
        super();
    }
}
class Cat extends Predator{
    constructor(){
        super();
    }
}
class Cow extends Vegan{
    constructor(){
        super();
    }
}
class Mouse extends Vegan{
    constructor(){
        super();
    }
}
console.log(Cat);
