DROP TABLE IF EXISTS easystock.Location;
DROP TABLE IF EXISTS easystock.Product;
DROP TABLE IF EXISTS easystock.Production;
DROP TABLE IF EXISTS easystock.LocationProduct;
DROP TABLE IF EXISTS easystock.ProductionLot;

DROP TABLE IF EXISTS easystock.SampleInventory;
DROP TABLE IF EXISTS easystock.SampleMove;

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
    YearCount VARCHAR (200) NOT NULL DEFAULT '{"stat":{"year":2015,"total":0}}',

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_Location PRIMARY KEY (RowId)
);

-- Product Trade Name by Method
-- Sample Product CELB#
--ENUM ('Research', 'Assessment', 'Sample','Available To Market','Out of Support');
CREATE TABLE easystock.Product
(
    RowId SERIAL NOT NULL,
    Name VARCHAR (200) NOT NULL,
    CommonName VARCHAR (200)  NULL,
    FullCode VARCHAR (40) NULL,
    InternalCode VARCHAR (40) NULL,
    Category  VARCHAR (100) NULL,
    ProductionLine  VARCHAR (100) NULL,
    Description TEXT NULL,
    CurrentStatus VARCHAR (100) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_Product PRIMARY KEY (RowId)
);

CREATE TABLE easystock.LocationProduct (
  RowId SERIAL NOT NULL,
  ProductId INT NOT NULL,
  LocationId INT NOT NULL,

  -- standard labkey columns
  Container ENTITYID NOT NULL,
  Created TIMESTAMP,
  CreatedBy INTEGER,
  Modified TIMESTAMP,
  ModifiedBy INT NULL,

  CONSTRAINT PK_LocationProduct PRIMARY KEY (RowId),
  CONSTRAINT FK__LocationProduct_ProductId FOREIGN KEY (ProductId) REFERENCES easystock.Product (RowId),
  CONSTRAINT FK__LocationProduct_LocationId FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId)
);

CREATE TABLE easystock.ProductionLot
(
    RowId SERIAL NOT NULL,
    Lot VARCHAR (200) NULL,
    Reference VARCHAR (200) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_ProductionLot PRIMARY KEY (RowId),
    CONSTRAINT UQ_ProductionLot_Lot UNIQUE (Lot)
);

CREATE INDEX IX_ProductionLot_Lot ON easystock.ProductionLot (Lot);

CREATE TABLE easystock.Production
(
    RowId SERIAL NOT NULL,
    LocationId INT NOT NULL,
    LotId INT NULL,
    WorkBookId INT NULL,
    ProductionDate TIMESTAMP NOT NULL,
    ExpirationDate TIMESTAMP NULL,
    BatchName VARCHAR (40) NULL,
    ProductionBatch VARCHAR (40) NULL,
    ProductId  INT NOT NULL,
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

    CONSTRAINT PK_Production PRIMARY KEY (RowId),
    CONSTRAINT FK_Production_Location FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId),
    CONSTRAINT FK__Production_ProductionLot FOREIGN KEY (LotId) REFERENCES easystock.ProductionLot (RowId),
    CONSTRAINT FK__Production_ProductId FOREIGN KEY (ProductId) REFERENCES easystock.Product (RowId)

);

-- for each location the lot available quantity
CREATE TABLE easystock.SampleInventory
(
    RowId SERIAL NOT NULL,
    LocationId INT NOT NULL,
    LotId INT NOT NULL,
    Quantity DECIMAL (10,2) NOT NULL,
    UoM VARCHAR (10) NOT NULL,
    Room VARCHAR (140) NULL,
    Shelf VARCHAR (140) NULL,
    Box VARCHAR (140) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_SampleInventory PRIMARY KEY (RowId),
    CONSTRAINT FK_SampleInventory_Location FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId),
    CONSTRAINT FK_SampleInventory_ProductionLot FOREIGN KEY (LotId) REFERENCES easystock.ProductionLot (RowId)
);

CREATE TABLE easystock.SampleMove
(
    RowId SERIAL NOT NULL,
    LocationId INT NULL,
    DestLocationId INT NOT NULL DEFAULT 1,
    LotId INT NOT NULL,
    MoveDate TIMESTAMP NULL,
    Quantity DECIMAL (10,2) NOT NULL,
    UoM VARCHAR (10) NOT NULL,
    Operator VARCHAR (200) NULL,

    -- standard labkey columns
    Container ENTITYID NOT NULL,
    Created TIMESTAMP,
    CreatedBy INTEGER,
    Modified TIMESTAMP,
    ModifiedBy INT NULL,

    CONSTRAINT PK_SampleMove PRIMARY KEY (RowId),
    CONSTRAINT FK_SampleMove_Location FOREIGN KEY (LocationId) REFERENCES easystock.Location (RowId),
    CONSTRAINT FK_SampleMove_DestLocation FOREIGN KEY (DestLocationId) REFERENCES easystock.Location (RowId),
    CONSTRAINT FK_SampleMove_ProductionLot FOREIGN KEY (LotId) REFERENCES easystock.ProductionLot (RowId)
);
