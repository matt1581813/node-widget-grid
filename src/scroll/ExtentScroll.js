const QuadtreeGrid = require("./../QuadtreeGrid");
class ExtentScroll{
    constructor(level, bbox, grid){
        this.beginX = 0;
        this.beginY = 0;
        this.grid = grid;
        this.currentX = this.beginX;
        this.currentY = this.beginY;
        this.level = parseInt(level);
        this.bbox = bbox;
        this.init();
    }

    count(){

        return (this.endX + 1 - this.beginX) * (this.endY + 1 - this.beginY);

    }


    init() {
        let beginResolution = this.grid.getResolution(this.level);
        if (this.bbox != null) {
            let box = this.bbox.split(",");
            let left = parseFloat(box[0]);
            let bottom = parseFloat(box[1]);
            let right = parseFloat(box[2]);
            let top = parseFloat(box[3]);

            this.beginX = parseInt(this.grid.calculateX(beginResolution, left));
            this.beginY = parseInt(this.grid.calculateY(beginResolution, top));
            this.endX = parseInt(this.grid.calculateX(beginResolution, right));
            this.endY = parseInt(this.grid.calculateY(beginResolution, bottom));
            this.currentX = this.beginX;
            this.currentY = this.beginY;
        } else {
            this.beginX = parseInt(this.grid.calculateX(beginResolution, this.grid.minX));
            this.beginY = parseInt(this.grid.calculateY(beginResolution, this.grid.maxY));
            this.endX = parseInt(this.grid.calculateX(beginResolution, this.grid.maxX));
            this.endY = parseInt(this.grid.calculateY(beginResolution, this.grid.minY));
        }
    }

    hasNext() {
        if (this.currentX > this.endX || this.currentY > this.endY) {
            return false;
        }
        return true;
    }


    next() {
        let json = {level:this.level, x:this.currentX, y:this.currentY};
        this.currentX = this.currentX + 1;
        if (this.currentX > this.endX) {
            this.goNextRow();
        }
        return json;
    }

    goNextRow() {
        this.currentX = this.beginX;
        this.currentY = this.currentY + 1;
    }

}

module.exports = exports = ExtentScroll;

/*let grid = new QuadtreeGrid('tdt',256,'meters',0,21);


let scroll = new ExtentScroll(13, "13454228.944,3920854.13,13455228.944,3921854.13", grid);



while(scroll.hasNext()){
    let c = scroll.next();
    let extent = grid.getGridExtent(c.level,c.x,c.y);
    console.log(extent);
}

var webMercator2LngLat = function(x, y) {//[12727039.383734727, 3579066.6894065146]
    var lng = x / 20037508.34 * 180;
    var lat = y / 20037508.34 * 180;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    return [lng, lat]; //[114.32894001591471, 30.58574800385281]
}

console.log(webMercator2LngLat(13454228.944,3920854.13))*/

