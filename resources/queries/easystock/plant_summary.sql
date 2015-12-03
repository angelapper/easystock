SELECT
production.LocationId ,
COUNT(CASE WHEN  production.LotId is NULL THEN 1 END) AS New,
COUNT(CASE WHEN  production.LotId IS NOT NULL THEN 1 END) AS History
FROM easystock.Production AS production
LEFT JOIN easystock.Location AS loc ON production.LocationId = loc.RowId
GROUP BY production.LocationId