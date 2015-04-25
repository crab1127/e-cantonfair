# highcharts 图表库

Highcharts是一个用纯 JavaScript编写的一个图表库，能够很简单便捷的在web网站或是web应用程序添加有交互性的图表，并且免费提供给个人学习、个人网站和非商业用途使用。

Highcharts 支持的图表类型有直线图、曲线图、区域图、柱状图、饼状图、散状点图、仪表图、气泡图、瀑布流图等多达20种图表，其中很多图表可以集成在同一个图形中形成综合图。

> 依赖 jquery

## 优点
* 兼容性好
* 简单易用
* 图表类型丰富

## 快速上手

html

    <div id="content" style="min-width:700px;height:400px"></div>

js

    //设置别名   
    require.config({
        paths: {
          'jquery': '/components_module/jquery/dist/jquery',
          'highcharts' : '/components_module/highcharts/highcharts'
        },
        shim: {
          'highcharts' : {
            deps: ['jquery'],
            exports: 'highcharts'
          }
        }
      })
        
      // 引用
      require(['jquery', 'highcharts'], function($){
        $('#content').highcharts({
          title: {
              text: 'Monthly Average Temperature',
              x: -20 //center
          },
          subtitle: {
              text: 'Source: WorldClimate.com',
              x: -20
          },
          xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
              title: {
                  text: 'Temperature (°C)'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: '°C'
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },
          series: [{
              name: 'Tokyo',
              data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
              name: 'New York',
              data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          }, {
              name: 'Berlin',
              data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
          }, {
              name: 'London',
              data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          }]
        })
    })  

[演示](/dev/components/component/highcharts/index.html)

## 参数说明

    lang   语言文字对象 所有Highcharts文字相关的设置  
    chart   图表 图表区、图形区和通用图表配置选项    
    colors 颜色 图表数据列颜色配置，是一个颜色数组   
    credits 版权信息    Highcharts在图表的右下方放置的版权信息及链  
    drilldown   向下钻取    向下钻取数据，深入到其中的具体数据   
    exporting   导出模块    导出功能配置，导出即将图表下载为图片或打印图表 
    labels  标签  可以放置到图表区域内任何位置的HTML标签  
    legend  图例  用不同形状、颜色、文字等标示不同数据列，通过点击标示可以显示或隐藏该数据列  
    loading 加载中 加载选项控制覆盖绘图区的加载屏的外观和文字  
    navigation  导航  导出模块按钮和菜单配置选项组  
    noData  没有数据    没有数据时显示的内容  
    pane    分块  针对仪表图和雷达图专用的配置，主要设置弧度及背景色  
    plotOptions 数据点配置  针对不同类型图表的配置。Highcharts所有图表类型请看下表 
    series  数据列 图表上一个或多个数据系列，比如图表中的一条曲线，一个柱形   
    title  标题 包括即标题和副标题，其中副标题为非必须的    
    tooltip 据点提示框 当鼠标滑过某点时，以框的形式提示改点的数据，比如该点的值，数据单位等  
    Axis    坐标轴 包括x轴和y轴。多个不同的数据列可共用同一个X轴或Y轴，当然，还可以有两个X轴或Y轴，分别显示在图表的上下或左右。
**详细API** 
[api文档](http://www.hcharts.cn/api/index.php)

## 附
[中文官网](http://www.hcharts.cn/)  
[例子2](/dev/components/component/highcharts/bar.html)