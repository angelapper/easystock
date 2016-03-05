var catchLocation={
    SampleSetName:"",
    ServerDate: {},
    Location:1,
    YearCount:"",
    PlatCode:"",
};

function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}

var catchLot={ };
MyApp = function()
{
    return {
        init: function() {
            var picker = new Pikaday({
                field: document.getElementById('production_date'),
                onSelect: function() {
                    console.log(this.getMoment().format('Do MMMM YYYY'));
                }
            });

            LABKEY.Query.selectRows({
                schemaName: 'simplelims',
                queryName: 'Location',
                containerFilter:LABKEY.Query.containerFilter.currentAndSubfolders,
                columns:['RowId','Name','FullCode','YearCount'],
                filterArray: [
                    LABKEY.Filter.create('RowId', catchLocation.Location,LABKEY.Filter.Types.EQUAL)],
                success: getLocationInfo
            });
        }
    };
}();

function getLocationInfo(data,response,option)
{
    if(data.rows.length > 0){
        catchLocation.YearCount=data.rows[0]["yearcount"];
        catchLocation.PlatCode=data.rows[0]["fullcode"];
        var today = new Date();
        catchLocation.SampleSetName = data.rows[0]["name"]+" ("+today.getFullYear()+")";
    }
    else {
        document.sample_production_form.submit.disabled=true;
    }
}

function submitRequest() {
    document.sample_production_form.submit.disabled=true;

    var initCounter = 5;
    setInterval(function(){
        var loading="";
        for(i = 0 ;i < initCounter;i++){
            loading +=".";
        }
        document.getElementById("timer").innerHTML =loading;
        if(--initCounter < 0){ initCounter = 5;}
    },1000);
    //default sample sets submission is labYYYYMM
    LABKEY.Domain.get({
        success: onGetSampleSetsSuccess,
        failure:onGetSampleSetsFailure,
        schemaName:"Samples",
        queryName:catchLocation.SampleSetName
    });
}

function onGetSampleSetsSuccess(data,response,option)
{
    // Make sure the form contains valid data
    if (catchLocation.YearCount=="" || catchLocation.PlatCode=="" || !getResultValidForm()) {
        return;
    }
    catchLocation.ServerDate = ProductionLot.GetServerTime(response);
    createNewSample();
}

function onGetSampleSetsFailure(data,response,option)
{
    // Make sure the form contains valid data
    if (catchLocation.YearCount=="" || catchLocation.PlatCode=="" || !getResultValidForm()) {
        return;
    }

    var domainDesign = ProductionLot.GetLabSampleDesign(catchLocation.SampleSetName,"auto create by system");
    LABKEY.Exp.SampleSet.create({
        success: function () {   createNewSample(); },
        domainDesign: domainDesign,
        options: { idCols: [0, 1] }
    })

    catchLocation.ServerDate = ProductionLot.GetServerTime(response);
}

// and determining the current date.
var formSubmission={};
function createNewSample()
{
    catchLot.ServerYear = catchLocation.ServerDate.getFullYear();
    catchLot.NewCounter = ProductionLot.GetNewCounter(catchLocation.YearCount,catchLot.ServerYear);
    catchLot.NewLotNumber =ProductionLot.GenerateLot(catchLocation.PlatCode,
            ProductionLot.YearToCode(catchLot.ServerYear),  catchLot.NewCounter);

    formSubmission.Lot= catchLot.NewLotNumber;
    //create a new production using the submission
    if(catchLot.NewLotNumber)
    {
        LABKEY.Query.insertRows({
            schemaName: 'Samples',
            queryName:catchLocation.SampleSetName,
            rows: [formSubmission],
            success:onSubmitSampleSuccess,
            failure: onSubmitSampleFailure
        });
    }
}

function getResultValidForm() {
    var result = true;
    var err = document.getElementById("errorTxt");
    formSubmission={};
    err.innerHTML = '';

    formSubmission.ProductionDate= document.sample_production_form.production_date.value;
    formSubmission.Batch= document.sample_production_form.batch.value;
    formSubmission.SampleName= document.sample_production_form.sample_name.value;
    formSubmission.Quantity= document.sample_production_form.quantity.value;
    formSubmission.UoM= document.sample_production_form.uom.value;
    formSubmission.Operator= document.sample_production_form.provider_name.value;
    formSubmission.Formulation= document.sample_production_form.formulation.value;
    formSubmission.Company= document.sample_production_form.company.value;
    formSubmission.Note= document.sample_production_form.sample_note.value;

    if (formSubmission.ProductionDate == '') {
        err.innerHTML += "Production Date is required.";
        result = false;
    }

    if (formSubmission.SampleName == '') {
        if(err.innerHTML != '')
            err.innerHTML += "<br>";
        err.innerHTML += "Name is required.";
        result = false;
    }

    if (isNaN(formSubmission.Quantity)) {
        if(err.innerHTML != '')
            err.innerHTML += "<br>";
        err.innerHTML += "Quantity is invalid.";
        result = false;
    }

    if(!result)
        document.getElementById("errorTxt").style.display = "block";
    return result;
}

function onSubmitSampleSuccess(){
    LABKEY.Query.updateRows(
            {
                schemaName: 'simplelims',
                queryName: 'Location',
                rows: [{
                    RowId: catchLocation.Location,
                    YearCount: JSON.stringify( {
                        Stat: {
                            Year:catchLot.ServerYear,
                            Total:catchLot.NewCounter
                        }
                    })
                }],
                transacted: true,
                failure: function(){
                    alert("Fail:  Sample Lot Submit");
                },
                success: function(){
                    alert("Succeed:  Sample Lot Submit");
                    document.location.reload();
                }
            }
    );
}
function onSubmitSampleFailure(){
    //display failure result
}

Ext.onReady(MyApp.init, MyApp);