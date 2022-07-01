-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: beetmanager
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bed_locations`
--

DROP TABLE IF EXISTS `bed_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bed_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed_locations`
--

LOCK TABLES `bed_locations` WRITE;
/*!40000 ALTER TABLE `bed_locations` DISABLE KEYS */;
INSERT INTO `bed_locations` VALUES
(1,'Sonne'),
(2,'Halbschatten'),
(3,'Schatten');
/*!40000 ALTER TABLE `bed_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bed_types`
--

DROP TABLE IF EXISTS `bed_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bed_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed_types`
--

LOCK TABLES `bed_types` WRITE;
/*!40000 ALTER TABLE `bed_types` DISABLE KEYS */;
INSERT INTO `bed_types` VALUES
(1,'Hochbeet'),
(2,'Hügelbeet'),
(3,'Flachbeet'),
(4,'Acker');
/*!40000 ALTER TABLE `bed_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beds`
--

DROP TABLE IF EXISTS `beds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `bed_type` int(11) DEFAULT NULL,
  `orientation` int(11) DEFAULT NULL,
  `bed_location` int(11) DEFAULT NULL,
  `width` tinyint(4) DEFAULT NULL,
  `height` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `beds_bed_locations_id_fk` (`bed_location`),
  KEY `beds_orientations_id_fk` (`orientation`),
  KEY `beds_bed_types_id_fk` (`bed_type`),
  CONSTRAINT `beds_bed_locations_id_fk` FOREIGN KEY (`bed_location`) REFERENCES `bed_locations` (`id`),
  CONSTRAINT `beds_bed_types_id_fk` FOREIGN KEY (`bed_type`) REFERENCES `bed_types` (`id`),
  CONSTRAINT `beds_orientations_id_fk` FOREIGN KEY (`orientation`) REFERENCES `orientations` (`id`),
  CONSTRAINT `beds_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beds`
--

LOCK TABLES `beds` WRITE;
/*!40000 ALTER TABLE `beds` DISABLE KEYS */;
/*!40000 ALTER TABLE `beds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orientations`
--

DROP TABLE IF EXISTS `orientations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orientations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orientations`
--

LOCK TABLES `orientations` WRITE;
/*!40000 ALTER TABLE `orientations` DISABLE KEYS */;
INSERT INTO `orientations` VALUES
(1,'Norden'),
(2,'Osten'),
(3,'Süden'),
(4,'Westen'),
(5,'Nordost'),
(6,'Südost'),
(7,'Südwest'),
(8,'Nordwest');
/*!40000 ALTER TABLE `orientations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_positions`
--

DROP TABLE IF EXISTS `plant_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plant_positions` (
  `plant_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pos_x` int(11) NOT NULL,
  `pos_y` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plant_positions_fk` (`plant_id`),
  CONSTRAINT `plant_positions_fk` FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_positions`
--

LOCK TABLES `plant_positions` WRITE;
/*!40000 ALTER TABLE `plant_positions` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant_positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_relations`
--

DROP TABLE IF EXISTS `plant_relations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plant_relations` (
  `plant_id_1` int(11) NOT NULL,
  `plant_id_2` int(11) NOT NULL,
  `harmony` tinyint(4) NOT NULL,
  PRIMARY KEY (`plant_id_1`,`plant_id_2`),
  KEY `plant_relations_fk_2` (`plant_id_2`),
  CONSTRAINT `plant_relations_fk` FOREIGN KEY (`plant_id_1`) REFERENCES `plants` (`id`),
  CONSTRAINT `plant_relations_fk_2` FOREIGN KEY (`plant_id_2`) REFERENCES `plants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_relations`
--

LOCK TABLES `plant_relations` WRITE;
/*!40000 ALTER TABLE `plant_relations` DISABLE KEYS */;
INSERT INTO `plant_relations` VALUES
(1,1,0),
(1,2,-1),
(1,3,-1),
(1,4,0),
(1,5,1),
(2,2,0),
(2,3,0),
(2,4,0),
(2,5,1),
(3,3,0),
(3,4,-1),
(3,5,0),
(4,4,0),
(4,5,1),
(5,5,0);
/*!40000 ALTER TABLE `plant_relations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES
(1,'Tomato'),
(2,'Cucumber'),
(3,'Potato'),
(4,'Carrot'),
(5,'Onion');
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-30  0:12:12
