    export const tables = `
    

CREATE TABLE Users (
	userID			INT NOT NULL AUTO_INCREMENT,
	password			VARCHAR(255),
	phone			VARCHAR(255) NOT NULL UNIQUE,
	date			INT,
	book			VARCHAR(255),
	avatar			VARCHAR(255),
PRIMARY KEY (userID)
);


CREATE TABLE Notes (
	noteID			INT NOT NULL AUTO_INCREMENT,
	userID			INT,
	title			VARCHAR(255),
PRIMARY KEY (noteID, userID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
);


CREATE TABLE NoteImages (
	noteImageID			INT NOT NULL AUTO_INCREMENT,
	userID			INT,
	noteID			INT,
	content			VARCHAR(255),
	cover			VARCHAR(255),
PRIMARY KEY (noteImageID, userID, noteID)
, FOREIGN KEY (userID) REFERENCES Users (userID)
, FOREIGN KEY (noteID) REFERENCES Notes (noteID)
);
    `;
    