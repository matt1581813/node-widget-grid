/**
 * Created by matt on 2017/7/10.
 */  
const GridExtent = require("./extent/GridExtent");
class AbstractGrid {
    constructor() {
        this.maxLevel = 0;
        this.base = 0;
        this.unit = null
        this.resolutionLevelBegin = 0;
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.beginLevel = 0;
    }
    getLevels(){
        throw "虚函数";
    }
    getResolution(level){
        throw "虚函数";
    }
    getMinLevel(){
        throw "虚函数";
    }
    getMaxLevel(){
        throw "虚函数";
    }



    getBaseTileSize(){
        return this.base;
    }
    /**
     *
     * @param {number} level
     * @param {number} x
     * @param {number} y
     * @returns {GridExtent}
     */
    getGridExtent( level,  x,  y) {
        let resolution = this.getResolution(level);// 获得瓦片分辨率
        if(resolution == null){
            throw "网格没有层级" + level;
        }
        let standard = this.base * resolution;// 计算一张瓦片包含的经纬度
        // 计算瓦片空间范围
        let left = this.minX + (x * standard);
        let right = this.minX + ((x + 1) * standard);
        let top = this.maxY - (y * standard);
        let bottom = this.maxY - ((y + 1) * standard);
        // 返回一个计算好的瓦片对象
        return new GridExtent(left, bottom, right, top, level, this, x, y);
    }

    getGridExtentByLonLat(level,  lon,  lat){
        let resolution = this.getResolution(level);
        if(resolution == null){
            return null;
        }
        let standard = this.base * resolution;
        let x = parseInt((lon - this.minX) / standard);
        let y = parseInt((this.maxY - lat) / standard);
        return {
            x:x,
            y:y,
            level:level
        } ;
    }

    /**
     *
     * @param {number} level
     * @param {number} x
     * @param {number} y
     * @returns {{x: number, y: number}}
     */
    getCenterByXYLevel(level,x,y){
        let resolution = this.getResolution(level);// 获得瓦片分辨率
        let standard = this.base * resolution;// 计算一张瓦片包含的经纬度
        // 计算瓦片空间范围
        let left = this.minX + (x * standard);
        let right = this.minX + ((x + 1) * standard);
        let top = this.maxY - (y * standard);
        let bottom = this.maxY - ((y + 1) * standard);
        return {
            x : left + (right - left) / 2,
            y : bottom + (top - bottom) / 2
        }
    }

    getBBoxPointArray(){

    }

    getGridExtentsByBBox(level,minX,minY,maxX,maxY){
        let extents = [];

        //  let ratio = null;
        /*for(let level = this.minLevel ; level < this.maxLevel ; level ++){
            if(resolution >= this.getResolution(level)){
                extentLevel = level;
                ratio = resolution / this.getResolution(level)
                break;
            }
        }*/
        let leftBottomExtent = this.getGridExtentByLonLat(level,minX,minY);
        let rightTopExtent = this.getGridExtentByLonLat(level,maxX,maxY);
        let minExtentX = leftBottomExtent.x;
        let maxExtentY = leftBottomExtent.y;
        let maxExtentX = rightTopExtent.x;
        let minExtentY = rightTopExtent.y;
        let currentX;
        let currentY;
        for(let extentY = minExtentY ;extentY <= maxExtentY ; extentY ++){
            for(let extentX = minExtentX ; extentX <= maxExtentX ; extentX ++){
                currentX = extentX;
                currentY = extentY;
                let currentExtent = this.getGridExtent(level,currentX,currentY);
                extents.push(currentExtent);
            }
        }
        return extents;
    }

    getName(){
        return this.name;
    }

    calculateX(resolution, x) {
        return (x - this.minX) / resolution / this.base;
    }

    calculateY( resolution,  y) {
        return (this.maxY - y) / resolution / this.base;
    }



}

module.exports = exports = AbstractGrid;



