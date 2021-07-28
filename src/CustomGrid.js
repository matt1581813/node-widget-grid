const GridExtent = require("./extent/GridExtent");
const AbstractGrid = require("./AbstractGrid");
class CustomGrid extends AbstractGrid{
    constructor(base,unit,lods,originPoint) {
        super();
        this.unit = unit;
        this.base = base;
        this.originPoint = originPoint;

        this.minLevel = null;
        this.maxLevel = null;
        this.minX = originPoint.x;
        this.maxY = originPoint.y;
        this.levels = {};
        this._init(lods);
    }

    /**
     *
     * @returns {number}
     */
    getMinLevel(){
        return this.minLevel;
    }

    /**
     *
     * @returns {number}
     */
    getMaxLevel(){
        return this.maxLevel;
    }

    /**
     *
     * @param {array} lods
     * @private
     */
    _init(lods){
        if(!Array.isArray(lods)){
            throw "lods必须是数组"
        }
        lods.sort( (o1,o2) =>{
            if(!(Number.isInteger(o1.level) && Number.isInteger(o2.level))){
                throw "lods中需要有属性level 且必须是整数";
            }
            return (o1.level - o2.level);
        })
        this.minLevel = lods[0].level;
        this.maxLevel = lods[lods.length - 1].level;

        for(let i = 0 ; i < lods.length ; i ++){
            if(lods[i].resolution == null){
                throw "lods要素中必须含有resolution属性,切为number型"
            }
            this.levels[lods[i].level] = {resolution:lods[i].resolution}
        }
    }

    /**
     *
     * @param {number} level
     * @returns {number}
     */
    getResolution(level) {
        let levelResolution = this.levels[level];
        if(levelResolution == null){
            return null;
        }
        return levelResolution.resolution;
    }










}
module.exports = CustomGrid;
/*const QuadtreeGrid = require("./QuadtreeGrid");

var q = new QuadtreeGrid('tdt',512,'meters',1,21);
var extent = q.getGridExtent(15,8189,8191);
console.log(extent.getWkt());
var lods = [{"level":0,"resolution":270.93387520108377,"scale":1024000},{"level":1,"resolution":135.46693760054188,"scale":512000},{"level":2,"resolution":67.73346880027094,"scale":256000},{"level":3,"resolution":33.86673440013547,"scale":128000},{"level":4,"resolution":16.933367200067735,"scale":64000},{"level":5,"resolution":8.466683600033868,"scale":32000},{"level":6,"resolution":4.233341800016934,"scale":16000},{"level":7,"resolution":2.116670900008467,"scale":8000},{"level":8,"resolution":1.0583354500042335,"scale":4000},{"level":9,"resolution":0.5291677250021167,"scale":2000},{"level":10,"resolution":0.26458386250105836,"scale":1000},{"level":11,"resolution":0.13229193125052918,"scale":500},{"level":12,"resolution":0.06614596562526459,"scale":250},{"level":13,"resolution":0.033072982812632296,"scale":125}];
var grid = new CustomGrid(512,'meters',lods,{"x":-66000,"y":75000});
let extentLevel;
for(let level = grid.getMinLevel() ; level < grid.getMaxLevel() ; level ++){
    if(extent.getResolution() >= grid.getResolution(level)){
        extentLevel = level;
       // ratio = resolution / this.getResolution(level)
        break;
    }
}


let aaa = grid.getGridExtentsByBBox(extentLevel,extent.left,extent.bottom,extent.right,extent.top);

for(let i = 0 ; i < aaa.length ; i ++){

    console.log(aaa[i].getWkt())
    console.log(aaa[i].toString())
}*/

//8189&y=8191&l=15*/
