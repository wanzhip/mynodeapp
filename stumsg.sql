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

 Date: 15/01/2021 18:45:57
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
  `areaId` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `areaId`(`areaId`) USING BTREE,
  CONSTRAINT `stumsg_ibfk_1` FOREIGN KEY (`areaId`) REFERENCES `stuarea` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stumsg
-- ----------------------------
INSERT INTO `stumsg` VALUES (4, '宁荣荣', '4', '武魂', '1', '史莱克学院', 18, 1);
INSERT INTO `stumsg` VALUES (7, '小刚', '123', '武魂', '1', '史莱克学院', 20, 1);
INSERT INTO `stumsg` VALUES (8, '宁风致', '123', '武魂', '12', '史莱克学院', 20, 1);
INSERT INTO `stumsg` VALUES (10, '戴沐白', '2020001', '武魂', '1', '史莱克学院', 20, 1);
INSERT INTO `stumsg` VALUES (11, '朱竹青', '15263', '武魂', '1', '史莱克学院', 18, 1);
INSERT INTO `stumsg` VALUES (12, '胡列娜', '202002', '武魂', '3', '教皇殿', 18, 1);
INSERT INTO `stumsg` VALUES (14, '唐三', '1', '武魂', '1', '史莱克学院', 15, 4);

SET FOREIGN_KEY_CHECKS = 1;
