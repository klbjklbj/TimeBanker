
-- dropping the database if there already is one
DROP DATABASE IF EXISTS userdb;
CREATE DATABASE userdb;

use userdb;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  username VARCHAR (45),
  email VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  skill VARCHAR(45) NOT NULL,
  address VARCHAR(45),
  address2 VARCHAR(45),
  city VARCHAR(45),
  state VARCHAR(45),
  zip INT (10),
  phone VARCHAR (45),
  isLoggedOn BOOLEAN,
  personHours INT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,  
  
  PRIMARY KEY (id)
);

-- dropping the database if there already is one
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
