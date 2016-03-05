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
        GetNewCounter:function(yearcount)
        {
            var savedCounter = JSON.parse(yearcount);
            var newcounter = savedCounter.stat.total;
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
        }
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