# 每周总结可以写在这里
语言按语法分类
 	非形式语言
		中文、英文
	形式语言（乔姆斯基谱系）
		0型 无限制文法
		1型 上下文相关文法
		2型 上下文无关文法
		3型 正则文法

产生式（BNF）
	用尖括号括起来的名称来表示语法结构名
	语法结构分成基础结构和需要用其他语法结构定义的复合结构
		基础结构称为终结符
		复合结构称非终结符
	引号和中间的字符表示终结符
	可以有括号
	*表示重复多次
	|表示或
	+表示至少一次

图灵完备性
	命令式--图灵机
		goto
		if和while
	声明式---lambda
		递归

动态与静态
	动态：
		在用户的设备/在先服务器上
		产品实际运行时
		Runtime
	静态：
		在程序员的设备上
		产品开发时
		Compiletime
系统类型
	动态类型系统与静态类型系统
	强类型与弱类型		（有隐式转换的就是弱类型）
		String + Number
		String == Boolean
	复合类型
		结构体			对象就是结构体
		函数签名			函数的参数和返回值 
	子类型
		逆变/协变		同向的是协变  
        
"a"  "b"   终结符
```
<Program>:= "a"+ | "b"+
<Program>:= <Program> + "a"+ | <Program> + "b"+

<Number> = "0" | "1" | "2" | .... | "9"                                                 //0-9数字

<DecimalNumber> = “0” | (("1" | "2" | "3" | ... | "9") <Number>+)                       //十进制 <Number>+ 若干个数字

<AdditiveExpression> = <DecimalNumber> "+" <DecimalNumber>                              //基本的两个数相加

<AdditiveExpression> = <AdditiveExpression> "+" <DecimalNumber>                         //连加  递归调用<Expression>   加法表达式

<AdditiveExpression> = <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>       //完整的加法表达式   可以是一个单一的数 或是多个十进制数连加

<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber>       //定义完整的乘法表达式

1+2*3

// 支持乘法除法
<MultiplicativeExpression> = <DecimalNumber> | 
    <MultiplicativeExpression> "*" <DecimalNumber> |
    <MultiplicativeExpression> "/" <DecimalNumber> 

//支持加法减法
<AdditiveExpression>  = <MultiplicativeExpression> | 
    <AdditiveExpression> "+" <MultiplicativeExpression> |
    <AdditiveExpression> "-" <MultiplicativeExpression> 

//逻辑表达式
<LogicalExpression>  = <AdditiveExpression> | 
    <LogicalExpression> "||" <AdditiveExpression> |
    <LogicalExpression> "&&" <AdditiveExpression>

//带括号的逻辑表达式
<PrimaryExpression> = <DecimalNumber> |
    "(" <LogicalExpression> ")"

// 带括号的支持乘法除法
<MultiplicativeExpression> = <PrimaryExpression> | 
    <MultiplicativeExpression> "*" <PrimaryExpression> |
    <MultiplicativeExpression> "/" <PrimaryExpression>
```