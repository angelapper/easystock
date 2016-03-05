/**
 * Created by shuozhao on 11/25/2015.
 */
var Production = (function()
{
    var apis={
        showGridByLots:  function ()
        {
            var pGrid = new LABKEY.QueryWebPart({
                renderTo: 'all_production',
                schemaName: dbSchemaName,
                queryName: 'production_groupbylots',
                viewName: 'production_groupbylots',
                frame: 'none',
                showDetailsColumn: true,
                showUpdateColumn: true,
                allowChooseQuery:false,
                allowChooseView :true,
                buttonBarPosition: 'top',
                buttonBar: {
                    includeStandardButtons: true
                }
            });
            //pGrid.on("render", onRender);
        }
    };

    return apis;
}());

