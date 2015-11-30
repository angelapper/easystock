/**
 * Created by shuozhao on 11/25/2015.
 */
var Production = (function()
{
    var apis={
        toShowGrid:  function ()
        {
            var pGrid = new LABKEY.QueryWebPart({
                renderTo: 'all_production',
                schemaName: dbSchemaName,
                queryName: 'Production',
                viewName: 'default_productions',
                frame: 'none',
                showDetailsColumn: false,
                showUpdateColumn: true,
                buttonBarPosition: 'top',
                buttonBar: {
                    includeStandardButtons: true,
                    items: [
                        {text: 'Assign Lot#', handler: onAssignLot}
                    ]
                }
            });

            pGrid.on("render", onRender);
        },
    };

    function onRender()
    {
        console.log("On Render");
    };

    function onGetSelected(data, response)
    {
       // console.log(data);
        //https://www.labkey.org/download/clientapi_docs/javascript-api/symbols/LABKEY.Filter.html#.create
        /*LABKEY.Query.selectRows({
         schemaName: 'easystock',
         queryName: 'Production',
         success: onSuccess,
         failure: onFailure,
         columns:['ProductName','LocationId']
         });*/
//https://www.labkey.org/wiki/home/Documentation/page.view?name=reagentRequestConfirmation
        function onFailure(errorInfo, options, responseObj)
        {
            if(errorInfo && errorInfo.exception)
                console.log("Failure: " + errorInfo.exception);
            else
                console.log("Failure: " + responseObj.statusText);
        }

        function onSuccess(data)
        {
            console.log("Success! " + data.rowCount + " rows returned.");
            console.log(data);
            if(data.rowCount >= 1)
            {
                console.log(data.rows[0].ProductName);
            }
            // console.log(localRegion);
            //calculate lots number based on plant code
            //assign lots to select items

            //country code, plant code, year
            //      LABKEY.Query.insertRows({
        }

        LABKEY.Query.executeSql({
            schemaName: 'easystock',
            sql:'SELECT LocationId FROM easystock.Production',
            success: onSuccess,
            failure: onFailure
        });
    }

    function onAssignLot(dataRegion)
    {
        var localRegion = dataRegion.getSelected({
                success: onGetSelected }
        );
    };

    return apis;
}());

