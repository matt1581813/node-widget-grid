/**
 * Created by matt on 2017/7/10.
 */
const AbstractGrid = require('./AbstractGrid');
const GridExtent = require('./extent/GridExtent')
const cgcs2000DegreeProj = '+proj=longlat +ellps=GRS80 +no_defs';
const webMercProj = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs';
class QuadtreeGrid extends AbstractGrid{
    constructor(type,base,unit, beginLevel, maxLevel,resolutionLevelBegin) {
        super();
        this.base = base;
        this.type = type;
        this.unit = unit;
        this.name = unit + base + type
        this._init(beginLevel, maxLevel, unit,resolutionLevelBegin);
    }
    _init(beginLevel, maxLevel, unit,resolutionLevelBegin){
        switch (unit) {
            case 'degrees':// 经纬度坐标系的全球范围
                this.minX = -180;
                this.minY = -90;
                this.maxX = 180;
                this.maxY = 90;
                this.proj = cgcs2000DegreeProj;
                break;
            case 'meters':// 平面坐标的全球范围
                this.minX = -20037508.3427892;
                this.minY = -20037508.3427892;
                this.maxX = 20037508.3427892;
                this.maxY = 20037508.3427892;
                this.proj = webMercProj;
                break;
        }

        this.beginLevel = beginLevel;
        this.maxLevel = maxLevel;

        let unitpixel = this.maxY - this.minY;

        if (resolutionLevelBegin == null) {
            // 计算1级地图一张瓦片的分辨率(一张256*256像素图片的分辨率=180度/256像素或40075016米/256像素)
            this.resolutionLevelBegin =  unitpixel /  this.base;
        } else {
            // 外部传递的分辨率
            this.resolutionLevelBegin = resolutionLevelBegin;
        }
    }

    /**
     *
     * @returns {number}
     */
    getMinLevel(){
        return this.beginLevel;
    }

    getProj(){
        return this.proj;
    }
    /**
     *
     * @returns {number}
     */
    getMaxLevel(){
        return this.maxLevel;
    }

    getResolution(level) {
    // 根据初始的分辨率计算层级上每个瓦片的分辨率
        return (this.resolutionLevelBegin / (Math.pow(2, level - this.beginLevel)));//幂运算
    }


}
module.exports = exports = QuadtreeGrid;

