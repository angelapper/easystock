/**
 * Created by shuozhao on 11/25/2015.
 */
var SampleInventory = {
    toShowGrid:  function(){
        var qwp1 = new LABKEY.QueryWebPart({
            renderTo: 'all_inventory',
            schemaName: dbSchemaName,
            queryName: 'SampleInventory',
            frame: 'none',
            showDetailsColumn: true,
            showRecordSelectors: true,
            buttonBar: {
                includeStandardButtons: true,
                items:[
                    {text: 'Item 2', handler: this.onAssignLot}
                ]
            }
        });
        qwp1.on("render", this.onRender());
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
