-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 08 juin 2022 à 11:54
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `scrumacolytediscord`
--

-- --------------------------------------------------------

--
-- Structure de la table `response`
--

DROP TABLE IF EXISTS `response`;
CREATE TABLE IF NOT EXISTS `response` (
  `id_user` bigint(50) NOT NULL,
  `name_user` varchar(80) NOT NULL,
  `response_obj` text NOT NULL,
  `time` datetime NOT NULL,
  `step` int(11) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id_user` bigint(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `workers`
--

DROP TABLE IF EXISTS `workers`;
CREATE TABLE IF NOT EXISTS `workers` (
  `id_user` bigint(50) NOT NULL,
  `username` varchar(80) NOT NULL,
  `step` int(11) NOT NULL,
  `id_guild` bigint(50) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
