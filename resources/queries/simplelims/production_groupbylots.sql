SELECT
MAX (Production.ProductionDate) as LastProduction,
Production.LotId,
Production.LocationId,
Production.ProductId,
Count(distinct Production.RowId) as TotalCount,
SUM(Production.Quantity) as TotalQuantity,
MAX (Production.UoM) as UnitofMeasure
FROM simplelims.Production
GROUP BY
Production.LotId,Production.LocationId,Production.ProductId