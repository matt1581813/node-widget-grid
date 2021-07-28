/**
 * Created by matt on 2017/7/10.
 */
const Extent = require('./Extent');
class GridExtent extends Extent{
    constructor(left, bottom, right, top, level, grid, x, y){
        super(left, bottom, right, top);
        this.x = x;
        this.y = y;
        this.level = level;
        this.resolution = grid.getResolution(level);
        this.grid = grid;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getLevel(){
        return this.level;
    }

    getResolution(){
        return this.resolution;
    }

    toString() {
        return "x = " + this.x + " y = " + this.y + " level = " + this.level;
    }

    getBuffer(percent) {
        let buffer = this.grid.getBase() * this.resolution * percent / 100;
        return buffer;
    }

    getExtentByBuffer( percent) {
        let buffer = this.getBuffer(percent);
        let left = this.left - buffer;
        let bottom = this.bottom - buffer;
        let right = this.right + buffer;
        let top = this.top + buffer;
        return new Extent(left, bottom, right, top);
    }

    getRealCoordinate(xPix,yPix){
        let Lng = xPix * this.resolution + this.left;
        let Lat = this.top - yPix * this.resolution;
        return [Lng,Lat]
    }
}
module.exports = exports = GridExtent;
