<template>
  <div id="map" class="map"></div>
</template>

<script>
import 'ol/ol.css' // 引入css样式
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
// import OSM from 'ol/source/OSM'
// import SOM from 'ol/source/SOM'
import XYZ from 'ol/source/XYZ' // 使用URL模板中定义的集合XYZ格式的URL平铺数据的层源
import { fromLonLat, transform, get } from 'ol/proj.js'
import 'ol/events/Event'
import 'ol/obj'
import ScaleLine from 'ol/control/ScaleLine' // 比例尺
import GeoJSON from 'ol/format/GeoJSON' // 以GeoJSON（地图数据/矢量数据）格式读取和写入数据
// import Feature from 'ol/Feature' // 具有几何和其他属性的地理要素的矢量对象
import VectorSource from 'ol/source/Vector' // 提供矢量图层的数据
import VectorLayer from 'ol/layer/Vector' // 用于显示在客户端渲染的矢量数据
import { Fill, Stroke, Style } from 'ol/style'

export default {
  name: 'Search1',
  data () {
    return {
      map: null,
      center: [108.707509278, 34.345372996],
      tempLayer: ' '
    }
  },
  mounted () {
    let view = new View({
      center: transform(fromLonLat(this.center), 'EPSG:3857', 'EPSG:4326'), // 转换坐标系
      projection: get('EPSG：4326'),
      zoom: 5
    })
    this.map = new Map({
      target: 'map', // html部分的dom元素的ID
      layers: [
        new TileLayer({
          // source: new SOM()
        })
      ],
      view: view
    })
    // eslint-disable-next-line camelcase
    let map_cva = new TileLayer({ // 底图图层
      source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d' // 注意tk就是自己调取天地图服务时，在天地图上申请的key值
      })
    })
    /* let map_vec = new TileLayer({ // 注记图层
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d'
      })
    }) */
    // this.map.addLayer(map_vec)
    this.map.addLayer(map_cva)

    // 实例化比例尺控件（ScaleLine）
    let ScaleLineControl = new ScaleLine({
      // 设置比例尺单位: degrees、imperial、us、nautical、metric（度量单位）
      units: 'metric'
    })
    this.map.addControl(ScaleLineControl)
  },
  // 以上部分为调取一个天地图的服务
  // 下面为地图界面的交互部分  动态切换地图的中心点，并画出省级行政边界
  methods: {
    drawArea (json) {
      let pointsz = [] // 存储点坐标
      let points = json.points // 获取点坐标
      // 对获取的点坐标数据进行处理，重构，得到我们需要的数据结构
      for (let i = 0; i < points.length; i++) {
        let region = points[i].region // 单个面
        let pointArr = region.split(',')
        for (let j = 0; j < pointArr.length - 1; j++) {
          let p = pointArr[j]
          let pArr = p.split(' ')
          // let pos = fromLonLat(pArr) // 将坐标转为默认投影，默认投影是EPSG：3857
          // let hdms = transform(pos, 'EPSG:3857', 'EPSG:4326') // 坐标系间坐标转换，由前面的坐标转为后面坐标系坐标
          pointsz.push(pArr) // 将转化格式后的点坐标存储起来
        }
      }
      ;
      // 自己造的地图数据（GeoJSON数据）
      let geojsonObject = {
        'type': 'FeatureCollection', // 要素集合
        'crs': {
          'type': 'name',
          'properties': { // 特性
            'name': 'EPSG:3857'
          },
          'features': [{ // 要素
            'type': 'Feature',
            'geometry': { // 几何图形
              'type': 'GeometryCollection', // 几何图形集合
              'geometries': [{ // 几何形状
                'type': 'Polygon', // 多边形
                'coordinates': [pointsz] // 坐标
              }]
            }
          }]
        }
      }
      let vectorSource = new VectorSource({ // 提供矢量图层的数据
        features: (new GeoJSON().readFeatures(geojsonObject))
      })
      let vectorLayer = new VectorLayer({
        source: vectorSource, // 来源
        style: new Style({
          stroke: new Stroke({
            color: 'yellow',
            width: 6
          }),
          fill: new Fill({
            color: 'rgba(255,255,0,0.1)'
          })
        })
      })
      if (this.tempLayer !== ' ') {
        this.map.removeLayer(this.tempLayer)
      }

      this.map.addLayer(vectorLayer)
      this.tempLayer = vectorLayer
    },
    changeCenter (name) { // 根据name传参
      // 调取天地图返回的数据
      let param = {}
      param.postStr.serachWord = name
      param.postStr.serachType = '1' // 查询类型（0：根据code查询；1：根据名称）
      param.postStr.needSunInfo = 'false' // 是否需要下一级信息
      param.postStr.needAll = 'false' //   是否需要所有子节点（包括孙子节点）
      param.postStr.needPolygon = 'true' // 是否需要行政区划范围
      param.postStr.needPre = 'true' // 是否需要上一级所有信息
      param.tk = 'd0cf74b31931aab68af181d23fa23d8d' // 自己的天地图秘钥
      this.$axios.get('http://api.tianditu.gov.cn/administrative', param).then(res => {
        let resData = res.data[0]
        let view = new View({
          center: transfrom(fromLonLat([resData.lnt, resData.lat]), 'EPSG:3857', 'EPSG:4326'), // 将中心点坐标转为EPSG：4326
          projection: get('EPSG:4326'), // 投影坐标系 EPSG：4326
          zoom: resData.level - 1
        })
        this.map.setView(view)
        this.drawArea(resData)
      })
    }
  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height: 800px;
  }
</style>
