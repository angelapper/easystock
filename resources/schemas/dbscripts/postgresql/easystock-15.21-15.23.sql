DROP TABLE IF EXISTS easystock.Location;
DROP TABLE IF EXISTS easystock.Production;
DROP TABLE IF EXISTS easystock.ProductionLot;
DROP TABLE IF EXISTS easystock.Stock;

CREATE TABLE easystock.Location
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

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_Location PRIMARY KEY (RowId)
)

CREATE TABLE easystock.Production
(
    RowId SERIAL NOT NULL,
    LocationId INT NOT NULL,
    Lot VARCHAR (200) NOT NULL,
    ProductionDate TIMESTAMP NOT NULL,
    ExpirationDate TIMESTAMP NULL,
    ProductionBatch VARCHAR (40) NULL,
    ProductName VARCHAR (200) NULL,
    InternalCode VARCHAR (10) NULL,
    ReferenceCode VARCHAR (10) NULL,
    Operator VARCHAR (200) NULL,
    Humidity DECIMAL (5,4) NULL,
    NetWeight DECIMAL (10,2) NULL,
    UoW VARCHAR (10) NULL,
    Quantity DECIMAL (10,2) NULL,
    UoM VARCHAR (10) NULL,
    PackageAmount SMALLINT NULL,
    UoP VARCHAR (14) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_Location PRIMARY KEY (RowId),
    CONSTRAINT FK_EASYSTOCK_Location FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId),
)
CREATE INDEX IX_Production_Lot ON easystock.Production (Lot);

CREATE TABLE easystock.StockInventory
(
    RowId SERIAL NOT NULL,
    LocationId INT NOT NULL,
    ProductionId INT NOT NULL,
    ReceivedDate TIMESTAMP NULL,
    ReceivedQuantity DECIMAL (10,2) NULL,
    UoM VARCHAR (10) NULL,
    AvailableQuantity DECIMAL (10,2) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_StockInventory PRIMARY KEY (RowId),
    CONSTRAINT FK_EASYSTOCK_Location FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId),
    CONSTRAINT FK_EASYSTOCK_Production FOREIGN KEY (ProductionId) REFERENCES easystock.Production (RowId),
)