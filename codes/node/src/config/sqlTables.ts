export const tables = `

 CREATE TABLE Organizations (
	organizationID		VARCHAR(255),
	createdDate		BIGINT,
	arTitle		VARCHAR(255),
	enTitle		VARCHAR(255),
	code		VARCHAR(255),
	email		VARCHAR(255),
	domain		VARCHAR(255),
	type		VARCHAR(255),
PRIMARY KEY (organizationID)
);

CREATE TABLE Users (
	userID		VARCHAR(255),
	createdDate		BIGINT,
	modifiedDate		BIGINT,
	organizationID		VARCHAR(255)		NOT NULL,
	password		VARCHAR(255),
	name		VARCHAR(255),
	email		VARCHAR(255),
	phone		VARCHAR(255),
	status		INT,
	type		VARCHAR(255),
PRIMARY KEY (userID)
);

CREATE TABLE Admins (
	adminID		VARCHAR(255),
	createdDate		BIGINT,
	modifiedDate		BIGINT,
	name		VARCHAR(255),
	password		VARCHAR(255),
	role		VARCHAR(255),
	email		VARCHAR(255),
	status		INT,
PRIMARY KEY (adminID)
);

CREATE TABLE Books (
	bookID		VARCHAR(255),
	createdDate		BIGINT,
	createdBy		VARCHAR(255)		NOT NULL,
	modifiedDate		BIGINT,
	modifiedBy		VARCHAR(255),
	arTitle		VARCHAR(255),
	enTitle		VARCHAR(255),
	code		VARCHAR(255),
	versionNumber		INT,
	video		VARCHAR(255),
PRIMARY KEY (bookID)
);

CREATE TABLE Volumes (
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	createdDate		BIGINT,
	createdBy		VARCHAR(255)		NOT NULL,
	modifiedDate		BIGINT,
	modifiedBy		VARCHAR(255),
	arTitle		VARCHAR(255),
	enTitle		VARCHAR(255),
	versionNumber		INT,
PRIMARY KEY (volumeID)
);

CREATE TABLE Chapters (
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	chapterID		VARCHAR(255),
	createdDate		BIGINT,
	createdBy		VARCHAR(255)		NOT NULL,
	modifiedDate		BIGINT,
	modifiedBy		VARCHAR(255),
	arTitle		VARCHAR(255),
	enTitle		VARCHAR(255),
	code		VARCHAR(255),
	versionNumber		INT,
	versionDate		BIGINT,
	numberOfViews		INT,
	chapter		VARCHAR(255),
PRIMARY KEY (chapterID)
);

CREATE TABLE Documents (
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	chapterID		VARCHAR(255),
	documentID		VARCHAR(255),
	createdDate		BIGINT,
	createdBy		VARCHAR(255)		NOT NULL,
	modifiedDate		BIGINT,
	modifiedBy		VARCHAR(255),
	arTitle		VARCHAR(255),
	enTitle		VARCHAR(255),
	code		VARCHAR(255),
	versionNumber		INT,
	versionDate		BIGINT,
	link		VARCHAR(255),
	numberOfDownloads		BIGINT,
	document		VARCHAR(255),
PRIMARY KEY (documentID)
);

CREATE TABLE DocumentHistories (
	userID		VARCHAR(255),
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	chapterID		VARCHAR(255),
	documentID		VARCHAR(255),
	documentHistorieID		VARCHAR(255),
	createdDate		BIGINT,
	modifiedDate		BIGINT,
	actionType		INT,
	actionDate		BIGINT,
	ipAddress		VARCHAR(255),
PRIMARY KEY (documentHistorieID)
);

CREATE TABLE Histories (
	userID		VARCHAR(255),
	historieID		VARCHAR(255),
	createdDate		BIGINT,
	modifiedDate		BIGINT,
	actionType		INT,
	actionDate		BIGINT,
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	chapterID		VARCHAR(255),
PRIMARY KEY (historieID)
);

CREATE TABLE Glossaries (
	glossaryID		VARCHAR(255),
	createdDate		BIGINT,
	createdBy		VARCHAR(255)		NOT NULL,
	modifiedDate		BIGINT,
	term		VARCHAR(255),
	definition		VARCHAR(255),
PRIMARY KEY (glossaryID)
);

CREATE TABLE Inquiries (
	userID		VARCHAR(255),
	bookID		VARCHAR(255),
	volumeID		VARCHAR(255),
	chapterID		VARCHAR(255),
	documentID		VARCHAR(255),
	inquiryID		VARCHAR(255),
	createdDate		BIGINT,
	modifiedDate		BIGINT,
	inquiry		VARCHAR(255),
	response		VARCHAR(255),
	status		INT,
PRIMARY KEY (inquiryID)
);

 

`;