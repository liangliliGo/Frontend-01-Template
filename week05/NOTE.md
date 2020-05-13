宏任务 微任务
每行js代码都是一个微任务 多个微任务组在一起形成了宏任务
setTimeout setInterval等并不是js提供的 而是宿主提供的api
mutationObserver会生成微任务
每一个宏任务执行完毕后会清空微任务队列然后继续进行下一轮事件循环

http报文
报文首部
空行\r\n(CR+LF)
主体

请求报文首部
    请求行
    请求方法
    PATH
    HTTP版本
        GET /path HTTP/1.1
    请求首部字段
    通用首部字段
    实体首部字段
    其他

响应报文首部
    状态行
    HTTP版本
    状态码
    原因短语
        HTTP/1.1 200 OK
    响应首部字段
    通用首部字段
    实体首部字段
    其他