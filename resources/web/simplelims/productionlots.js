/**
 * Created by shuozhao on 12/9/2015.
 */
ProductionLot = function()
{
    var apis =
    {
        GenerateLot:function(fullcode, currentYearCode,newcounter)
        {
            return fullcode + currentYearCode + prefixzero(newcounter,4);
        },
        GetNewCounter:function(yearcount, serveryear)
        {
            var savedCounter = JSON.parse(yearcount);
            if(serveryear > savedCounter.Stat.Year)
            {
                savedCounter.Stat.Total = 0;
            }
            var newcounter = savedCounter.Stat.Total;
            newcounter++;
            return newcounter;
        },
        GetServerTime: function(response)
        {
            return new Date(response.getResponseHeader("Date"));
        },
        YearToCode: function(currentYear) {
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            var indexCode = currentYear - 2011;

            if(indexCode >= 0 && indexCode < alphabet.length)
            {
                return alphabet[indexCode];
            }
            return 'E';
        },
        GetLabSampleDesign: function(set_name, set_description)
        {
            var domainDesign = {
                name: set_name,
                description: set_description,
                fields: [{
                    name: 'SampleName',
                    label: 'Sample Name',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string',
                    conceptURI:'http://cpas.labkey.com/Study#ParticipantId'
                },{
                    name: 'Lot',
                    label: 'Lot Number',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'Quantity',
                    label: 'Quantity',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#double'
                }, {
                    name: 'UoM',
                    label: 'Unit of Measure',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'ProductionDate',
                    label: 'Production Date',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#dateTime'
                },{
                    name: 'Operator',
                    label: 'Operator',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'Company',
                    label: 'Company',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'Batch',
                    label: 'Production Batch',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'Formulation',
                    label: 'Original Formulation',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#string'
                },{
                    name: 'Note',
                    label: 'Note',
                    rangeURI: 'http://www.w3.org/2001/XMLSchema#multiLine'
                }
                ]
            };
            return domainDesign;
        },
    };
    return  apis;
}();

function prefixzero(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};