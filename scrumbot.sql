-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 03 avr. 2022 à 04:09
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `scrumbot`
--

-- --------------------------------------------------------

--
-- Structure de la table `response`
--

CREATE TABLE `response` (
  `id_user` bigint(20) DEFAULT NULL,
  `name_user` varchar(80) DEFAULT NULL,
  `response_obj` text DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `response`
--

INSERT INTO `response` (`id_user`, `name_user`, `response_obj`, `time`) VALUES
(1, '0', 'hahaha', '2022-04-02 23:38:35'),
(2, 'oui', 'hahaha', '2022-04-02 23:38:35'),
(NULL, NULL, NULL, NULL),
(209822631900217344, 'Nyaalina ????', 'a', '0000-00-00 00:00:00'),
(209822631900217344, 'Nyaalina ????', 'je test un peu', '0000-00-00 00:00:00'),
(209822631900217344, 'Nyaalina ????', 'a', '0000-00-00 00:00:00'),
(209822631900217344, 'Nyaalina ????', 'a', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
