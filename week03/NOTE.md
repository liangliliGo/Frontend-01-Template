# 每周总结可以写在这里
// 区分正零负零
function checkZero(zero){
    if(1/zero === Infinity){
        return 1
    }
    if(1/zero === -Infinity){
        return -1
    }
}
function sign(number){
    return number/Math.abs(number)
}

浮点数进行算术运算一定要考虑精度损失

Expressions 表达式
Member 成员访问   返回的是reference类型 由两部分组成 Object key   由两种操作  delete assign
    a.b
    a[b]
    foo`string`
    super.b     只能在构造函数中用
    new.target  只能在构造函数中用 (判断主体 以及 决定可以调用主体的某个函数，防止直接调用报错)
    new Foo()   带括号的优先级更高

New new Foo()
Call
    foo()           函数调用
    super()
    foo()['b']
    foo().b
    foo()`aa`

Left Handside & Right Handside  等号左边 & 等号右边
    等号左边必须是reference  运行时

    right Update
     a++    a ++ 中间不能换行
     a--
     ++a
     --a
    Unary
        delete a.b
        void 0  = undefined
        typeof a
        + a
        - a
        ~ a
        !a 

JavaScript标准里的对象
    Bound Function Exotic Objects
        [[BoundTargetFunction]]
        [[BoundThis]]
        [[BoundArguments]]
    Array Exotic Objects
        [[DefineOwnProperty]]
        ArrayCreate
        ArraySpeciesCreate
        ArraySetLength
    String Exotic Objects
    Arguments Exotic Objects
    Integer-Indexed Exotic Objects
    Module Namespace Exotic Objects
    Immutable Prototype Exotic Objects
    Proxy Object Internal Methods and Internal Slots


