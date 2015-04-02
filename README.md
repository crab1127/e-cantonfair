# 前端架构

## 规范

* 开发规范
  模块化开发：针对js、css，以功能或业务为单元组织代码。js方面解决独立作用域、依赖管理、api暴露、按需加载与执行、安全合并等问题，css方面解决依赖管理、组件内部样式管理等问题。是提升前端开发效率的重要基础。现在流行的模块化框架有requirejs、seajs等。
  组件化开发：在模块化基础上，以页面小部件(component)为单位将页面小部件的js、css、html代码片段放在一起进行开发、维护，组件单元是资源独立的，组件在系统内可复用。比如头部(header)、尾部(footer)、搜索框(searchbar)、导航(menu)、对话框(dialog)等，甚至一些复杂的组件比如编辑器(editor)等。通常业务会针对组件化的js部分进行必要的封装，解决一些常见的组件渲染、交互问题。

* 部署规范
  自动化部署：请求合并，压缩，校验，加md5戳，发布到指定目录

* 代码规范
  详情看[前端代码规范及最佳实践](url=http://coderlmn.github.io/code-standards/?utm_source=tuicool)


## 框架选型

网站前端的2种形态

  * 内容型，侧重seo优化
  * 操作型，侧重数据和逻辑

对于不同的产品形态，用一套框架很难去适应，总有偏颇

用户未登入的界面，偏向内容的展示效果，特效，这时使用jquery，duang～duang～duang～，就很酷很炫很酷很炫。

对于用户中心，这时肯定是要用angularjs，angularjs是采用MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入配制而成，除了有些学习难度外，构建一个CRUD（增加Create、查询Retrieve、更新Update、删除Delete）的应用更是一等一的好。


## 模块开发

> 工程师希望能像 搭积木 一样开发和维护系统，通过组装模块得到一个完整的系统。

在模块化系统的结构中，模块是可组合、可分解和更换的单元，这就要求模块本身具有一定的独立性，完整的前端模块化方案需要将js、css和模板维护在一起，保证模块的独立。

静态资源分：**模块资源**，与 **非模块资源**，其中模块资源又分 **工程模块** 和 **生态模块** 两类。

+ 模块化资源：具有独立性的模块所对应的静态资源。每个独立的模块将自己所需要的js、css、模板、图片等资源放在一起维护，使得模块具备独立性，引用模块的js即可。
  - 工程模块：当前工程所开发的模块。这些模块通常跟业务耦合较高。
  - 生态模块：从 模块生态 下载的模块，属于外部依赖。
+ 非模块化资源：虽然在模块化开发体系内，应该 一切皆模块，但总有不应该成为模块的资源，比如入口页面、模块化框架、页面启动器等。

*目录规范* 
- components_module  生态模块（第三方）通过bower安装
  - angular
  - jqeury
  ... 
- components         工程模块
  - component        组件
    - header
      - ico.png
      - header.css
      - header.tel
      - header.js 
    - dialog
    - slider
  - directive        指令 （angular）  
  - filter           过滤器
  ...
- static             非模块资源
  - less
  - css
  - js
  - images
  - fonts

*发布后的目录* 
publish
  - 0.0.0 (version)
    - object 
 
### 定义模块

> 模块规范分 AMD规范与CMD规范
> AMD 是 requirejs 在推广中对模块定义的规范化产出
> CMD 是seajs 在推广中对模块定义的规范化产出

这2者的区别请自行百度，在该项目中我就使用 **requirejs** 来做模块加载器

定义一个模块

    '
    define('dialog', ['jquery'], function(){
      function dialog() {
        ...
      }    
      return dialog    
    })
    '

### 引用模块
    '
    require(['dialog'], function(dialog){
      ...
      // 业务逻辑
    })
    '


## 项目部署

> 

## 开发工具

> 包括：nodejs， grunt， bower， git

* nodejs：js后端运行环境，也是前端工程化的基础
* grunt： 基于Node.js的项目构建工具，对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作。当你正确配置好了任务，任务运行器就会自动帮你或你的小组完成大部分无聊的工作。
* bower：Web开发的包管理器。该工具主要用来帮助用户轻松安装CSS、JavaScript、图像等相关包,并管理这些包之间的依赖，基于git
* git：免费、开源的分布式版本控制系统