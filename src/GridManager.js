/**
 * Created by matt on 2017/7/10.
 */
const QuadtreeGrid = require('./QuadtreeGrid');
const EsriQuadtreeGrid = require('./EsriQuadtreeGrid');
class GridManager{
    constructor(){
        this.GridUnit = {
            degrees:'degrees',
            meter:'meters'
        }
        this.gridMap = {};
        this.gridMap.degreesbase256tdt = new QuadtreeGrid('tdt',256,'degrees',1,21);
        this.gridMap.meterbase256tdt = new QuadtreeGrid('tdt',256,'meters',0,21);
        this.gridMap.metersbase256tdt = new QuadtreeGrid('tdt',256,'meters',0,21);
        this.gridMap.metersbase512tdt = new QuadtreeGrid('tdt',512,'meters',1,21);
        this.gridMap.degreesbase512tdt = new QuadtreeGrid('tdt',512,'degrees',2,21);
        this.gridMap.meterbase512tdt = new QuadtreeGrid('tdt',512,'meters',1,21);
        this.gridMap.degreesbase1024tdt = new QuadtreeGrid('tdt', 1024, 'degrees', 2, 21);
        this.gridMap.meterbase1024tdt = new QuadtreeGrid('tdt', 1024, 'meters', 2, 21);
        this.gridMap.degreesbase256esri = new EsriQuadtreeGrid('esri', 256, 'degrees', 1, 21);
        this.gridMap.degreesbase512esri = new EsriQuadtreeGrid('esri', 512, 'degrees', 2, 21);

    }
    getGrid(grid, origin, resolutions){
        if (!origin && !resolutions){
            return this.gridMap[grid];
        }else {
            let key = this.getGridKey(grid, origin, resolutions);
            let g = this.gridMap[key];
            if (g){
                return g;
            }
            if (grid.indexOf('256') != -1){
                g = new EsriQuadtreeGrid('esri', 256, 'degrees', 1, 21);
            }else {
                g = new EsriQuadtreeGrid('esri', 512, 'degrees', 2, 21);
            }
            g.setResolutions(resolutions);
            g.setMinX(origin[0]);
            g.setMaxY(origin[1]);
            this.gridMap[key] = g;
            return g;
        }
    }

    getGridKey(grid, origin, resolutions){
        let key = grid + '_' + origin[0]  + '_' + origin[1];
        key += '_' + resolutions.join(',');
        return key;
    }
}

module.exports = exports = new GridManager();




