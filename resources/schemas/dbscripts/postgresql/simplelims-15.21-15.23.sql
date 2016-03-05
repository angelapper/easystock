DROP TABLE IF EXISTS simplelims.Location;

CREATE TABLE simplelims.Location
(
    RowId SERIAL NOT NULL,
    Name VARCHAR (200) NOT NULL,
    Code VARCHAR (10) NULL,
    FullCode VARCHAR (10) NULL,
    IsPlant BOOLEAN NOT NULL DEFAULT '0',
    CountryCode VARCHAR (2) NULL,
    CountryName VARCHAR (200) NULL,
    City VARCHAR (200) NULL,
    State VARCHAR (200) NULL,
    YearCount VARCHAR (200) NOT NULL DEFAULT '{"stat":{"year":2015,"total":0}}',

    -- standard labkey columns
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_Location PRIMARY KEY (RowId)
);
