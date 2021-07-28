/**
 * Created by matt on 2017/7/10.
 */
const QuadtreeGrid = require('./QuadtreeGrid');
const GridExtent = require('./extent/GridExtent')
class EsriQuadtreeGrid extends QuadtreeGrid{
    constructor(type,base,unit, beginLevel, maxLevel,resolutionLevelBegin) {
        super();
        this.base = base;
        this.type = type;
        this.unit = unit;
        this.name = unit + base + type;
        this.resolutions = [];
        this._init(beginLevel, maxLevel, unit,resolutionLevelBegin);
    }

    _init(beginLevel, maxLevel, unit,resolutionLevelBegin){
        this.minX = -400;
        this.minY = -90;
        this.maxX = 180;
        this.maxY = 400;
        this.beginLevel = beginLevel;
        this.maxLevel = maxLevel;

    }

    getResolution(level) {
    // 根据初始的分辨率计算层级上每个瓦片的分辨率
        return this.resolutions[level];
    }



    setResolutions(resolutions){
        this.resolutions = resolutions;
    }

    setMinX(minX){
        this.minX = minX;
    }

    setMaxY(maxY){
        this.minY = maxY;
    }


}
module.exports = exports = EsriQuadtreeGrid;

