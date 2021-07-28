/**
 * Created by matt on 2017/7/10.
 */
class Extent{


    static createByBBOX(BBOX){
        let boxs = BBOX.split(",");
        let left = parseFloat(boxs[0]);
        let bottom = parseFloat(boxs[1]);
        let right = parseFloat(boxs[2]);
        let top = parseFloat(boxs[3]);
        return new Extent(left, bottom, right, top);
    }

    constructor(left, bottom, right, top) {
        this.BBOX = left + "," + bottom + "," + right + "," + top;
        this._init(left, bottom, right, top);
    }

    getBBox(){
        return this.bbox;
    }
    getMinX(){
        return this.left;
    }
    getMaxX(){
        return this.right;
    }
    getMinY(){
        return this.bottom;
    }
    getMaxY(){
        return this.top;
    }

    _init(left,bottom,right,top) {
        this.left = left;
        this.bottom = bottom;
        this.right = right;
        this.top = top;
        this.bbox = [left,bottom,right,top]
        this.wkt = this._doWkt(left, bottom, right, top);
    }
    _doWkt(left, bottom,right,top) {
        let wkt = "POLYGON ((";
            wkt += left + " " + bottom + ",";
            wkt += right + " " + bottom + ",";
            wkt += right + " " + top + ",";
            wkt += left + " " + top + ",";
            wkt += left + " " + bottom + "))";
        return wkt;
    }
    getCenter(){
        return {
            x : left + (right - left) / 2,
            y : bottom + (top - bottom) / 2
        }
    }

    getWkt(){
        return this._doWkt(this.left,this.bottom,this.right,this.top);
    }

}

module.exports = exports = Extent;



//console.log(Extent.createByBBOX("116.40308,36.07416,116.45258,36.11448").getWkt())
//console.log(Extent.createByBBOX('121.366,29.735,121.727,30.039').getWkt())

//121.366，30.039

//121.727,29.735
