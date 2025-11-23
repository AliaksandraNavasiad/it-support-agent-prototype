-- =============================================
-- Description: Dataverse Schema Definition for IT Support Module
-- =============================================

-- 1. Create the Master Table (Categories)
-- This lookup table allows us to standardize options and run reports later.
CREATE TABLE mvp_TicketCategory (
    mvp_categoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    mvp_name NVARCHAR(100) NOT NULL,
    mvp_description NVARCHAR(MAX) NULL,
    mvp_prefix NVARCHAR(10) -- e.g., 'HW' for Hardware
);

-- 2. Create the Transaction Table (Tickets)
-- This table holds the actual requests.
CREATE TABLE mvp_ITTicket (
    mvp_ticketId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    mvp_ticketNumber NVARCHAR(20) NOT NULL, -- Autonumber handled by platform
    mvp_title NVARCHAR(200) NOT NULL,
    mvp_description NVARCHAR(MAX),
    mvp_status INT DEFAULT 0, -- 0=New, 1=In Progress, 2=Resolved
    mvp_createdOn DATETIME DEFAULT GETDATE(),
    
    -- Foreign Key Relationship (1:N)
    -- One Category can have Many Tickets
    mvp_category UNIQUEIDENTIFIER,
    CONSTRAINT FK_Ticket_Category FOREIGN KEY (mvp_category)
    REFERENCES mvp_TicketCategory (mvp_categoryId)
);

-- 3. Sample Data for Testing
INSERT INTO mvp_TicketCategory (mvp_name, mvp_prefix)
VALUES 
('Hardware', 'HW'),
('Software', 'SW'),
('Network', 'NET');

-- 4. Sample Query: Get all open tickets for 'Hardware'
SELECT 
    t.mvp_ticketNumber,
    t.mvp_title,
    c.mvp_name AS Category
FROM mvp_ITTicket t
JOIN mvp_TicketCategory c ON t.mvp_category = c.mvp_categoryId
WHERE c.mvp_name = 'Hardware' AND t.mvp_status = 0;
