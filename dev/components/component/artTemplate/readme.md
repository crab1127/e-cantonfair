# artTemplate - 模板引擎

腾讯出品的javascript模板引擎

## 优点
* 性能好，执行速度比同类型的的都好。 [性能比较](http://blog.csdn.net/wuchengzhi82/article/details/8938122)
* 小， 只有5k
* 错误调试友好
* 模板语言类似angular

## 快速上手

html

    // 使用一个type="text/html"的script标签存放模板    
    <script id="test" type="text/html">
        <h1>{{title}}</h1>
        <ul>
            {{each list as value i}}
                <li>索引 {{i + 1}} ：{{value}}</li>
            {{/each}}
        </ul>
    </script>

js 

    var data = {
        title: '标签',
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    };
    var html = template('test', data);
    document.getElementById('content').innerHTML = html;

[演示](/dev/components/component/artTemplate/index.html) 

## 模板语法   

    {{if admin}}
        {{include 'admin_content'}}
    
        {{each list}}
            <div>{{$index}}. {{$value.user}}</div>
        {{/each}}
    {/if}

 表达式

> {{ 与 }} 符号包裹起来的语句则为模板的逻辑表达式。

输出表达式

对内容编码输出：

    {{content}}
不编码输出：

    {{#content}}
编码可以防止数据中含有 HTML 字符串，避免引起 XSS 攻击。

条件表达式

    {{if admin}}
        <p>admin</p>
    {{else if code > 0}}
        <p>master</p>
    {{else}}
        <p>error!</p>
    {{/if}}
遍历表达式

无论数组或者对象都可以用 each 进行遍历。

    {{each list as value index}}
        <li>{{index}} - {{value.user}}</li>
    {{/each}}
亦可以被简写：

    {{each list}}
        <li>{{$index}} - {{$value.user}}</li>
    {{/each}}
模板包含表达式

用于嵌入子模板。

    {{include 'template_name'}}
子模板默认共享当前数据，亦可以指定数据：

    {{include 'template_name' news_list}}
辅助方法

使用template.helper(name, callback)注册公用辅助方法：

    template.helper('dateFormat', function (date, format) {
        // ..
        return value;
    });
模板中使用的方式：

    {{time | dateFormat:'yyyy-MM-dd hh:mm:ss'}}
支持传入参数与嵌套使用：

    {{time | say:'cd' | ubb | link}}   

## api

**template(id, data)**

根据 id 渲染模板。内部会根据document.getElementById(id)查找模板。

如果没有 data 参数，那么将返回一渲染函数。

**template.compile(source, options)**

将返回一个渲染函数。演示

**template.render(source, options)**

将返回渲染结果。

**template.helper(name, callback)**

添加辅助方法。

例如时间格式器：演示

**template.config(name, value)**

## 附
[官网](https://github.com/aui/artTemplate)
