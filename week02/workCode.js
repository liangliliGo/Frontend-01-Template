/** 1 写一个正则表达式 匹配所有Number 直接量 */
let numberTeg = /^[-/+]?(^0|[1-9]\d*\.?\d*?)|(^0[bB][01]+$)|(^0[oO][0-7]+$)|(^0[xX][0-9a-fA-F]+$)/
{
  // DecimalIntegerLiteral
  let reg1 = /^0|[1-9]\d*$/

  // ExponentPart
  let reg2 = /(0|[1-9]\d*)\.\d*$/

  // BinaryIntegerLiteral
  let reg3 = /^0[bB][01]+$/

  // OctalIntegerLiteral
  let reg4 = /^0[oO][0-7]+$/

  // HexIntegerLiteral
  let reg5 = /^0[xX][0-9a-fA-F]+$/

}

/** 2 写一个 UTF-8 Encoding 的函数 */
{
  function UTF8Encoding (str) {
    let arr = str.split('')
    let codeStr = ''
    arr.map(item => {
      codeStr += `\\u${item.charCodeAt().toString(16)}`
    })

    return codeStr
  }

  console.log(UTF8Encoding('努力的人注定成功'))
}

/** 3 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号 */
{
  let strReg = /[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g
}