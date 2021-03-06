
// 1、

// 2、基于以下代码完成下面的四个练习
const fp = require('lodash/fp');
// 数据
// horsepower 马力， dollar_value 价格，in_stock库存

const cars = [
    {
        name: 'Ferrari FF',
        horsepower: 600,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyker c12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8',
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra',
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    }
]

// 2.1 使用函数组合fp.flowRight() 重新实现下面这个函数
let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}

const fp = require('lodash/fp');

const f = fp.flowRight(fp.prop('in_stock', fp.last(cars)));
console.log(f(cars))



// 2.2 使用fp.flowRight()、fp.prop()和fp.first() 获取第一个car的name
const f = fp.flowRight(fp.prop('name', fp.first(cars)));
console.log(f(cars))



// 2.3 使用帮助函数_average 重构averageDollarValue，使用函数组合的方式实现
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <-无须改动

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}
let averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
log(averageDollarValue(cars))



// 2.4 使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：
// sanitizeNames(['Hello World']) => ['hello_world']
let _underscore = fp.replace(/\W+/g, '_') //无需改动，并在sanitizeNames中使用
const sanitizeNames = fp.flowRight(_underscore, fp.map(fp.toLower, array));
const arr = ['Hello World'];
console.log(sanitizeNames(arr))



// 3 基于下面提供的代码，完成后续的四个练习
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = { Maybe, Container }



// 3.1 使用fp.add(x, y)和map(f, x)创建一个能让functor里的值增加的函数ex1
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(x => fp.map(fp.add(1), x))
console.log(ex1)



// 3.2 实现一个函数ex2，能够使用fp.first获取列表的第一个元素
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = fp.map(fp.first)
console.log(xs.map(ex2))



// 3.3 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
const fp = require('lodash/fp');
const { Maybe, Container } = require('./support')
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = fp.flowRight(fp.map(fp.first), safeProp('name'))
console.log(ex3(user)



// 3.4 使用Maybe重写ex4，不要有if语句
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let ex4 = function (n) {
    if (n) {
        return parseInt(n)
    }
}
let ex4 = fp.flowRight(fp.map(parseInt), Maybe.of)



// 手写实现MyPromise源码
