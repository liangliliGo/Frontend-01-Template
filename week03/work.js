// StringToNumber
function convertStringToNumber(string, radix = 10) {
    if (radix > 10) {
      return;
    }
    let flag = /e|E/.test(string);
    if (!flag) {
      let chars = string.split('');
      let number = 0;
      let i = 0;
      while (i < chars.length && chars[i] != '.') {
        number = number * radix;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
      }
      if (chars[i] === '.') {
        i++;
      }
      let fraction = 1;
      while (i < chars.length) {
        fraction /= radix;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i++;
      }
      return number;
    } else {
      let logNumber = Number(string.match(/\d+$/)[0]);
      let number = string.match(/^[\d\.]+/)[0].replace(/\./, '');
      if (/e-|E-/.test(string)) {
        return Number(number.padEnd(logNumber + 1, 0));
      } else {
        return Number(number.padStart(logNumber + number.length, 0).replace(/^0/, '0.'));
      }
    }
  }


function convertNumberToString(number, radix = 10) {
    const maxFractionLength = 10
    let integer = Math.floor(number), fraction = number - integer, str = ''
    let 
    let 
  
    while (integer > 0) {
      str = String(integer % radix) + str
      integer = Math.floor(integer / radix)
    }
  
    let fractionStr = ''
    while ((fraction !== 1 || fraction !== 0) && fractionStr.length <= maxFractionLength) {
      const computed = fraction * radix
      const integer = computed > 1 ? Math.floor(computed) : 0
      fractionStr += integer
      fraction = computed > 1 ? computed - Math.floor(computed) : fraction
    }
    return fraction ? `${str}.${fractionStr}` : str
  }