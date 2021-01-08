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

 Date: 08/01/2021 09:57:28
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

-- ----------------------------
-- Records of stumsg
-- ----------------------------
INSERT INTO `stumsg` VALUES (1, '唐三', '1', '武魂', '1', '史莱克学院', 20);
INSERT INTO `stumsg` VALUES (2, '小舞', '2', '武魂', '1', '史莱克学院', 18);
INSERT INTO `stumsg` VALUES (3, '三炮', '3', '修仙', '2', '史莱克学院', 8);
INSERT INTO `stumsg` VALUES (4, '宁荣荣', '4', '武魂', '1', '史莱克学院', 18);
INSERT INTO `stumsg` VALUES (7, '小刚', '123', '武魂', '1', '史莱克学院', 20);
INSERT INTO `stumsg` VALUES (8, '宁风致', '123', '武魂', '12', '史莱克学院', 20);
INSERT INTO `stumsg` VALUES (10, '戴沐白', '2020001', '武魂', '1', '史莱克学院', 20);

SET FOREIGN_KEY_CHECKS = 1;
