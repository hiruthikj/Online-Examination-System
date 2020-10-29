CREATE DATABASE IF NOT EXISTS ExamDB DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ExamDB;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(7) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `accounts` (`username`, `password`) VALUES ('test', 'test');

-- ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
-- ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
