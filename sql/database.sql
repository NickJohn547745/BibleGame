CREATE TABLE IF NOT EXISTS visitors(
	ID INTEGER PRIMARY KEY, 
	ip_address varchar(20), 
	time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO visitors (
	ip_address
)
VALUES (
	"192.168.1.1"
)