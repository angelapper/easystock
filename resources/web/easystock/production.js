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
                showDetailsColumn: true,
                showUpdateColumn: true,
                allowChooseQuery:false,
                allowChooseView :false,
                buttonBarPosition: 'top',
                buttonBar: {
                    includeStandardButtons: true,
                    items: [
                        {text: 'New Lot#', handler: onAssignLot}
                    ]
                }
            });
            //pGrid.on("render", onRender);
        }
    };
    function onAssignLot(dataRegion)
    {
        dataRegion.getSelected({
            success: onGetSelected
        });
    };

    function convertYearToCode(currentYear)
    {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var indexCode = currentYear - 2011;

        if(indexCode >= 0 && indexCode < alphabet.length)
        {
            return alphabet[indexCode];
        }
        return 'E'
    }

  /*  var xmlHttp;
    function srvTime(){
        try {
            //FF, Opera, Safari, Chrome
            xmlHttp = new XMLHttpRequest();
        }
        catch (err1) {
            //IE
            try {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (err2) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (eerr3) {
                    //AJAX not supported, use CPU time.
                    alert("AJAX not supported");
                }
            }
        }
        xmlHttp.open('HEAD',window.location.href.toString(),false);
        xmlHttp.setRequestHeader("Content-Type", "text/html");
        xmlHttp.send('');
        return xmlHttp.getResponseHeader("Date");
    }*/
    function onRender()
    {
        console.log("On Render");
    };

    var currentYearCode = "E";
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
        var allSelectedIds = data.selected.length > 1 ? data.selected.join() :  data.selected[0];

        if(allSelectedIds)
        {
            var svrDateTime = new Date(response.getResponseHeader("Date"));
            currentYearCode = convertYearToCode(svrDateTime.getFullYear());

            var querySql = 'SELECT prod.RowId, prod.LotId, prod.LocationId,prod.ProductName, loc.FullCode FROM ' +
                    'easystock.Production prod ' +
                    'LEFT JOIN ' +
                    'easystock.Location loc ON prod.LocationId = loc.RowId ' +
                    'WHERE prod.RowId  in ('+allSelectedIds+')';

            LABKEY.Query.executeSql({
                schemaName: 'easystock',
                sql: querySql,
                success: onSuccess,
                failure: onFailure
            });
        }

    }
    function onSuccess(data)
    {
        console.log("Year is "+currentYearCode+". Success Select Row Cout: " + data.rowCount );
        console.log(data);

        for (i = 0; i < data.rows.length; i++) {
            //console.log(data.rows[i].ProductName +"  "+data.rows[i].LotId);
            if(!data.rows[i].LotId){
                console.log("Need A new lot number for location "+ data.rows[i].FullCode +" year "+ currentYearCode);
            }
        }
        // console.log(localRegion);
        //calculate lots number based on plant code
        //assign lots to select items

        //country code, plant code, year
        //      LABKEY.Query.insertRows({
    }

    function onFailure(errorInfo, options, responseObj)
    {
        if(errorInfo && errorInfo.exception)
            console.log("Failure: " + errorInfo.exception);
        else
            console.log("Failure: " + responseObj.statusText);
    }
    return apis;
}());

