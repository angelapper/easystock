/**
 * Created by shuozhao on 11/25/2015.
 * https://www.labkey.org/wiki/home/Documentation/page.view?name=webPartConfig
 */
var Location = {
    toShowGrid:  function(){
        var qwp1 = new LABKEY.QueryWebPart({
            renderTo: 'all_location',
            schemaName: dbSchemaName,
            queryName: 'Location',
            frame: 'none',
            allowChooseQuery:false,
            allowChooseView :false,
            buttonBar: {
                includeStandardButtons: true
            }
        });
        //qwp1.on("render", this.onRender());
    },
    onRender: function ()   {

    },
    onAssignLot:function(){

    }
};

function onReceiveSample()
{

}

function onUseSample()
{

}
