-- Active: 1705231715283@@127.0.0.1@3306@fraudify_db

DROP TABLE if EXISTS user;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'DOWNLOADER', 'USER') NOT NULL DEFAULT 'USER',
    PRIMARY KEY (id),
    UNIQUE (username)
);



DROP TABLE if EXISTS music;
CREATE TABLE music (
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL DEFAULT "Unknown",
    duration INT NOT NULL,
    path VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (url)
);



DROP TABLE if EXISTS playlist;
CREATE TABLE playlist (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    private BOOLEAN NOT NULL DEFAULT TRUE,
    description VARCHAR(255) NOT NULL DEFAULT "No description",
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);



DROP TABLE if EXISTS playlist_music;

CREATE TABLE playlist_music (
    playlist_id INT NOT NULL,
    music_id INT NOT NULL,
    PRIMARY KEY (playlist_id, music_id),
    FOREIGN KEY (playlist_id) REFERENCES playlist(id),
    FOREIGN KEY (music_id) REFERENCES music(id)
);

DESCRIBE user;
DESCRIBE music;
DESCRIBE playlist;

SHOW tables;


select * from music;
select * from user;

select * from music where title = 'DiE4u';
