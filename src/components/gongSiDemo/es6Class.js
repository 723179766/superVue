class Point {
  constructor (x, y) {
    this.x = x || '帅气的'
    this.y = y || '七七小鱼'
  }

  toString () {
    console.log(12)
    this.sayHello()
    return '(' + this.x + ', ' + this.y + ')'
  }

  sayHello () {
    console.log('i m sayHello')
  }
}

export default Point
