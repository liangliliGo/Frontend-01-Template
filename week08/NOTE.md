分类

    简单选择器
        div svg|a
        .cls
        [attr=value]
        :hover
        ::before

    复合选择器
        <简单选择器><简单选择器><简单选择器>
        *或者div必须写在最前面

    复杂选择器
        <复合选择器><复合选择器>
        <复合选择器>">"<复合选择器> 子选择符
        <复合选择器>"~"<复合选择器> 一般同辈选择符
        <复合选择器>"+"<复合选择器> 相邻同辈选择符
        <复合选择器>"||"<复合选择器> table里选择一列（不推荐使用）
        优先级 [inline, id, .cls/[id=x], div] #id div.a#id [0, 2, 1, 1]

        div#a.b .c[id=x] [0, 1, 3, 1]
        #a:not(#b) [0, 2, 0, 0] 注， not不参与优先级计算
        *.a [0, 0, 1, 0] 注， *不参与优先级计算
        div.a [0, 0, 1, 1]
    伪类

    链接/行为
        :any-link
        :link :visited
        :hover
        :active
        :focus
        :target

    树结构
        :empty
        :nth-child()
        :nth-last-child()
        :first-child :last-child

    伪元素
        ::before
        ::after
        ::first-line
        ::first-letter