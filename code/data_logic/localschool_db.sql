-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: localschool_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `employment_ID` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`employment_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (1,'delispeter19@gmail.com','testtest','12170 Louis-Jadon','Peter','Delis','(514) 296-1119','1999-11-19'),(3,'timothy@gmail.com','test','12170, Louis-Jadon','Timothy','Delis','5241232311','2022-07-13'),(29,'big.mike@gmail.com','betty','12170, Louis-Jadon','Mike','Delis','5142946699','1970-02-11'),(30,'fgdf','123','12170, Louis-Jadon','Peter','Delis','dfg','2022-10-13'),(31,'asda@gm.m','1231231231231','12170, Louis-Jadon','Peter','Smith','(514) 333-3333','2022-10-13');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_code` bigint NOT NULL AUTO_INCREMENT,
  `course_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `room_number` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instructor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `days` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `course_time` varchar(12) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=InnoDB AUTO_INCREMENT=479 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (123,'Do something class','H-123','Dr. Denis Rinfret','Monday','08:45-10:00','Winter','2022-10-18','2022-10-31'),(228,'Systems Hardware','H-823','Dr. Abbas Javadtalab ','Friday','08:45-10:00','fall','2022-11-01','2022-12-20'),(232,'Mathematics for Computer Science','H-123','Dr. Denis Rinfret','Monday','08:45-10:00','fall','2022-11-20','2022-11-26'),(249,'Object-Oriented Programming','H-512','Dr. Aimann Hanna','Monday','18:00-20:00','fall','2022-11-01','2022-12-20'),(346,'Operating Systems','H-531','Dr. Aimann Hanna','Tuesday','17:45-20:15','winter','2023-01-09','2023-05-17'),(352,'Data Structures and Algorithms','H-535','Dr. Aimann Hanna','Wednesday','16:00-18:00','fall','2022-11-01','2022-12-20'),(387,'Web Design','H-531','Hassan Hajjdiab','Monday, Wednesday','08:45-10:00','fall','2022-11-01','2022-12-11'),(445,'Networks and Communication','H-123','Dr. Aimann Hanna','Monday,Wednesday','18:00-20:00','fall','2022-11-01','2022-12-20');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=354589353780 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'student@gmail.com','qwerty','John','Kokkinos','(514) 123-4567','12170 Louis-Jadon','1999-11-19'),(2,'chiara.max@gmail.com','asdfg','Chiara','Max','(514) 123-4567','10226 Lajeunesse','2000-01-29'),(354589347543,'alex.valerio@gmail.com','1234','Sasha','Valerio','5141112223','12170 Ch. du Golf','2022-10-02'),(354589347545,'darthVader@gmail.com','sith','Darth','Vader','3747392922','Death Start Blvd.','5000-01-01'),(354589353762,'student2@gmail.com','qwerty','Harry','Potter','(514) 123-4567','Hogwarts Ave.','1999-11-19'),(354589353766,'darthPlagius@gmail.com','darkSide','Plagius','Palpatine','37473926969','Death Start Blvd.','3000-01-01'),(354589353770,'luke.skywalker@gmail.com','yoda','Luke','Skywalker','1231231234','Degoba System','5025-11-07'),(354589353771,'3242@f.ca','12345678','Peter','Smith','(514) 111-3333','12170, Louis-Jadon','2022-10-13'),(354589353772,'delispeter19@gmail.com','testtest','Peter','Delis','(514) 296-1119','12170, Louis-Jadon','2022-10-26'),(354589353773,'jobobo@gmail.com','treatsortreats','Josette','Max','(514) 123-4567','10226 Lajeunesse','2000-01-29');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_course`
--

DROP TABLE IF EXISTS `student_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_course` (
  `student_id` bigint NOT NULL,
  `course_code` bigint NOT NULL,
  PRIMARY KEY (`student_id`,`course_code`),
  KEY `course_code` (`course_code`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `course_code` FOREIGN KEY (`course_code`) REFERENCES `course` (`course_code`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_course`
--

LOCK TABLES `student_course` WRITE;
/*!40000 ALTER TABLE `student_course` DISABLE KEYS */;
INSERT INTO `student_course` VALUES (354589347545,228),(354589353766,228),(354589347545,249),(354589347545,346),(354589347545,352),(354589347543,445),(354589347545,445);
/*!40000 ALTER TABLE `student_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint NOT NULL,
  `user_type` enum('student','administrator') NOT NULL DEFAULT 'student',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('8BHmJGOsD6BLtAt6KMDWkI9wP3qmDpYX',354589353766,'student'),('Fq_lDLST24l16IQQ-OWnOcffHQ-tfiuP',1,'administrator'),('gDHLOW-9MP_3B2wZT5sL07s0Ey5XjJRs',354589353766,'student'),('k7tq0laa7op8WhA=',1,'student'),('kb9o0VuV64h3XhE1A4fCUBBX16VvQQ==',354589353766,'student'),('kb9o0VuV64h3XhE1A4fCXRdZ065nRw==',354589353766,'student'),('kb9o0VuV64h3XhE1A4fCXRZd0KFqTw==',354589353766,'student'),('kb9o0VuV64lzXBM2A4fCXhZZ16ZnQg==',354589347545,'student'),('kb9o0VuV64lzXBM2A4fCXRZZ1aVoRQ==',354589347545,'student'),('lxoKtLlj5VI8bnoys-ZFd--apu5Y2SAx',354589353773,'student'),('SY60iYppxaUb7yORO9aZKvjiVmiaBToK',354589353766,'student'),('zM64n39yrXDfv74BVQWRwRpb8NemnGnN',354589347545,'student');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-17 11:47:10
