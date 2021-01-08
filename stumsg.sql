/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : localhost:3306
 Source Schema         : students

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 08/01/2021 09:59:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stumsg
-- ----------------------------
DROP TABLE IF EXISTS `stumsg`;
CREATE TABLE `stumsg`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `major` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `grade` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `school` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `age` int(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
