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

 Date: 15/01/2021 18:46:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stuarea
-- ----------------------------
DROP TABLE IF EXISTS `stuarea`;
CREATE TABLE `stuarea`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stuarea
-- ----------------------------
INSERT INTO `stuarea` VALUES (1, '武魂殿');
INSERT INTO `stuarea` VALUES (2, '圣魂村');
INSERT INTO `stuarea` VALUES (4, '唐门');

SET FOREIGN_KEY_CHECKS = 1;
