export default class Person {
    constructor(obj) {
            this.name = obj.name;
            this.age = obj.age
        }
        //做什么
    work(doSomething) {
        console.log(`${this.name},今年${this.age},正在${doSomething}`)
    }
}