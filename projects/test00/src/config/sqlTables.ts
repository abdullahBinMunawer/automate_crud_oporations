export const tables = `

 CREATE TABLE Users (
	userID		VARCHAR(255),
	name		VARCHAR(255)		NOT NULL UNIQUE,
	password		VARCHAR(255),
	date		BIGINT,
	avatar		VARCHAR(255),
PRIMARY KEY (userID)
);

CREATE TABLE Notes (
	userID		VARCHAR(255),
	noteID		VARCHAR(255),
	title		VARCHAR(255),
	image1		VARCHAR(255),
	image2		VARCHAR(255),
PRIMARY KEY (noteID)
);

 

`;