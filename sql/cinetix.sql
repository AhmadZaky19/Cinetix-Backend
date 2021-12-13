-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2021 at 08:42 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinetix`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateBooking` date NOT NULL,
  `timeBooking` time NOT NULL,
  `movieId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `totalTicket` int(11) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `paymentMethod` varchar(100) NOT NULL,
  `statusPayment` varchar(100) NOT NULL,
  `statusUsed` enum('active','notActive') NOT NULL DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `userId`, `dateBooking`, `timeBooking`, `movieId`, `scheduleId`, `totalTicket`, `totalPayment`, `paymentMethod`, `statusPayment`, `statusUsed`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2021-11-13', '12:30:00', 6, 2, 3, 30, 'gopay', 'success', 'active', '2021-09-25 03:37:42', NULL),
(2, 1, '2021-11-13', '12:30:00', 6, 2, 3, 30, 'gopay', 'success', 'notActive', '2021-09-25 07:15:52', '2021-10-03 06:44:57'),
(3, 1, '2021-11-13', '12:30:00', 6, 2, 3, 30, 'gopay', 'success', 'notActive', '2021-09-25 07:23:05', '2021-10-03 06:45:02'),
(4, 2, '2021-11-13', '13:30:00', 8, 3, 3, 30, 'ovo', 'success', 'notActive', '2021-09-25 09:38:18', '2021-10-04 06:52:21'),
(5, 2, '2021-11-13', '13:30:00', 2, 3, 3, 20, 'ovo', 'success', 'active', '2021-09-25 09:43:04', '2021-10-03 06:25:46'),
(6, 2, '2021-11-13', '13:30:00', 8, 3, 3, 30, 'ovo', 'success', 'active', '2021-09-25 09:45:14', '2021-10-03 06:27:38'),
(7, 2, '2021-11-13', '13:30:00', 8, 3, 3, 90, 'ovo', 'success', 'active', '2021-09-27 02:57:54', '2021-10-03 06:31:19'),
(8, 2, '2021-11-13', '13:30:00', 8, 3, 3, 90, 'ovo', 'success', 'active', '2021-09-30 15:14:01', '2021-10-03 06:31:34'),
(9, 2, '2021-11-13', '13:30:00', 8, 3, 3, 90, 'ovo', 'success', 'active', '2021-09-30 15:14:59', '2021-10-03 06:32:40'),
(10, 2, '2021-11-13', '13:30:00', 8, 3, 3, 90, 'ovo', 'success', 'active', '2021-09-30 15:15:19', '2021-10-03 06:34:12');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `casts` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `durationHour` int(11) NOT NULL,
  `durationMinute` int(11) NOT NULL,
  `synopsis` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `name`, `category`, `director`, `casts`, `releaseDate`, `durationHour`, `durationMinute`, `synopsis`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Batman v Superman: Dawn of Justice', 'Action, Superhero', 'Zack Snyder', 'Ben Affleck, Henry Cavill', '2021-10-12', 2, 32, 'Fearing that the actions of Superman are left unchecked, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.', '2021-10-03T20-08-22.129Zb vs s.jpg', '2021-09-20 07:00:17', '2021-10-03 20:08:22'),
(2, 'Black Widow', 'Action, Adventure', 'Cate Shortland', 'Scarlet Johansson, Florence Pugh, David Harbour', '2021-09-20', 2, 14, 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.', '2021-10-03T20-08-53.352Zblack widow.jpg', '2021-09-20 07:00:17', '2021-10-03 20:08:53'),
(3, 'Spiderman Far from Home', 'Action, Adventure, Sci-fi', 'Jon Watts', 'Tom Holland, Samuel L. Jackson, Jake Gyllenhal', '2021-12-12', 2, 9, 'Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.', '2021-10-03T20-09-27.665Zspider.jpeg', '2021-09-20 08:42:06', '2021-10-03 20:09:27'),
(5, 'The Last: Naruto the Movie', 'Animation, Action, Adventure', 'Tsuneo Kobayashi', 'Junko Takeuchi, Nana Mizuki, Jun Fukuyama', '2021-12-12', 1, 52, 'Hinata Hyuga\'s younger sister has been kidnapped, so Naruto must do what he can to save her.', '2021-10-03T20-10-21.084ZTheLastNarutomovie.jpg', '2021-09-21 04:12:18', '2021-10-03 20:10:21'),
(6, 'The Avengers', 'Action, Sci-fi', 'Josh Whedon', 'Robert Downey Jr, Chris Evans, Scarlet Johansson', '2021-12-12', 2, 23, 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', '2021-10-03T20-10-58.969Zavengers.jpg', '2021-09-21 04:12:29', '2021-10-03 20:10:59'),
(7, 'Godzilla vs Kong', 'Action, Sci-fi, Thriller', 'Adam Wingard', 'Alexander Skarsgard, Millie Bobby Brown, Rebecca Hall', '2021-12-12', 1, 53, 'The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.', '2021-10-03T20-11-43.114ZG vs K.jpg', '2021-09-21 04:12:41', '2021-10-03 20:11:43'),
(8, 'Venom', 'Action, Sci-fi', 'Ruben Fleischer', 'Tom Hardy, Michelle Williams', '2021-12-14', 1, 52, 'A failed reporter is bonded to an alien entity, one of many symbiotes who have invaded Earth. But the being takes a liking to Earth and decides to protect it.', '2021-10-03T20-12-34.439Zvenom.jpg', '2021-09-21 13:32:06', '2021-10-03 20:12:34'),
(9, 'The Witcher', 'Adventure, Fantasy', 'Sean Daniel', 'Henry Cavill', '2021-12-21', 1, 2, 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', '2021-10-03T20-13-35.924Zwitcher.jpg', '2021-09-21 14:10:44', '2021-10-03 20:13:35'),
(12, 'Kimetsu no Yaiba: Mugen Ressha-Hen', 'Animation, Adventure, Action', 'Haruo Sotozaki', 'Natsuki Hanae, Akari Kito, Yoshitsugu Matsuoka', '2021-10-12', 1, 57, 'After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado\'s journey as a demon slayer began. Tanjiro and his comrades embark on a new mission aboard the Mugen Train, on track to despair.', '2021-10-03T20-16-12.191ZKny Mugen 1.jpg', '2021-09-29 07:10:25', '2021-10-03 20:16:12'),
(22, 'Kingsglaive Final Fantasy XV', 'Adventure, Action', 'Takeshi Nozue', 'Aaron Paul, Lena Headey, Sean Bean', '2021-10-12', 1, 50, 'King Regis, who oversees the land of Lucis, commands his army of soldiers to protect the kingdom from the Niflheim empire\'s plans to steal the sacred crystal which gives Lucis its magic and power.', '2021-10-04T03-43-50.197ZKingsglaive FF XV.jpg', '2021-10-01 07:05:36', '2021-10-04 03:43:50');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `premiere` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `movieId`, `premiere`, `price`, `location`, `dateStart`, `dateEnd`, `time`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'hiflix', 10, 'Bandung', '2021-10-11', '2021-10-21', '10:00,12:30,16:00', '2021-09-21 16:11:09', '2021-09-22 14:48:29'),
(2, 2, 'ebu.id', 20, 'Jakarta Selatan', '2021-12-02', '2021-12-12', '10:00,12:30,14:00,16:00', '2021-09-21 16:11:09', '2021-10-01 03:57:42'),
(3, 2, 'ebu.id', 20, 'Semarang', '2021-12-02', '2021-12-12', '11:00,13:30,15:00', '2021-09-22 14:09:26', NULL),
(5, 6, 'cineone21', 20, 'Jakarta Selatan', '2022-01-01', '2022-01-12', '11:00,12:30,15:00,16:30', '2021-09-23 16:40:04', NULL),
(6, 6, 'cineone21', 30, 'Bandung', '2021-11-11', '2021-11-25', '11:00,12:30,15:00,16:30', '2021-09-23 16:40:50', NULL),
(7, 6, 'cineone21', 10, 'Bandung', '2021-11-11', '2021-11-18', '15:00,17:00', '2021-09-23 16:42:05', NULL),
(8, 5, 'hiflix', 10, 'Bandung', '2021-12-11', '2021-12-30', '15:00,16:00,17:00,18:00,19:00,20:00', '2021-09-23 16:43:03', NULL),
(9, 7, 'cineone21', 10, 'Jakarta Utara', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-09-26 08:06:30', NULL),
(10, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 04:20:42', NULL),
(11, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 04:59:30', NULL),
(12, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 06:32:55', NULL),
(13, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 06:55:48', NULL),
(14, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 06:57:03', NULL),
(15, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 07:53:47', NULL),
(16, 8, 'cineone21', 10, 'Jakarta Timur', '2021-12-19', '2021-12-31', '18:00,20:00', '2021-10-01 08:03:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `seatbooking`
--

CREATE TABLE `seatbooking` (
  `id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `dateBooking` date NOT NULL,
  `timeBooking` time NOT NULL,
  `seat` varchar(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seatbooking`
--

INSERT INTO `seatbooking` (`id`, `bookingId`, `movieId`, `scheduleId`, `dateBooking`, `timeBooking`, `seat`, `createdAt`, `updatedAt`) VALUES
(1, 2, 6, 2, '2021-11-13', '12:30:00', 'A1', '2021-09-25 07:15:52', NULL),
(2, 2, 6, 2, '2021-11-13', '12:30:00', 'A3', '2021-09-25 07:15:52', NULL),
(3, 2, 6, 2, '2021-11-13', '12:30:00', 'A5', '2021-09-25 07:15:52', NULL),
(4, 3, 6, 2, '2021-11-13', '12:30:00', 'A1', '2021-09-25 07:23:05', NULL),
(5, 3, 6, 2, '2021-11-13', '12:30:00', 'A3', '2021-09-25 07:23:05', NULL),
(6, 3, 6, 2, '2021-11-13', '12:30:00', 'A5', '2021-09-25 07:23:06', NULL),
(7, 4, 8, 3, '2021-11-13', '13:30:00', 'A1', '2021-09-25 09:38:18', NULL),
(8, 4, 8, 3, '2021-11-13', '13:30:00', 'A5', '2021-09-25 09:38:18', NULL),
(9, 4, 8, 3, '2021-11-13', '13:30:00', 'A8', '2021-09-25 09:38:18', NULL),
(10, 5, 8, 3, '2021-11-13', '13:30:00', 'A1', '2021-09-25 09:43:04', NULL),
(11, 5, 8, 3, '2021-11-13', '13:30:00', 'A5', '2021-09-25 09:43:05', NULL),
(12, 5, 8, 3, '2021-11-13', '13:30:00', 'A8', '2021-09-25 09:43:05', NULL),
(13, 6, 8, 3, '2021-11-13', '13:30:00', 'A1', '2021-09-25 09:45:15', NULL),
(14, 6, 8, 3, '2021-11-13', '13:30:00', 'A5', '2021-09-25 09:45:15', NULL),
(15, 6, 8, 3, '2021-11-13', '13:30:00', 'A8', '2021-09-25 09:45:15', NULL),
(16, 7, 8, 3, '2021-11-13', '13:30:00', 'A6', '2021-09-27 02:57:54', NULL),
(17, 7, 8, 3, '2021-11-13', '13:30:00', 'A7', '2021-09-27 02:57:54', NULL),
(18, 7, 8, 3, '2021-11-13', '13:30:00', 'A9', '2021-09-27 02:57:54', NULL),
(19, 8, 8, 3, '2021-11-13', '13:30:00', 'A6', '2021-09-30 15:14:01', NULL),
(20, 8, 8, 3, '2021-11-13', '13:30:00', 'A7', '2021-09-30 15:14:01', NULL),
(21, 8, 8, 3, '2021-11-13', '13:30:00', 'A9', '2021-09-30 15:14:01', NULL),
(22, 9, 8, 3, '2021-11-13', '13:30:00', 'A6', '2021-09-30 15:15:00', NULL),
(23, 9, 8, 3, '2021-11-13', '13:30:00', 'A7', '2021-09-30 15:15:00', NULL),
(24, 9, 8, 3, '2021-11-13', '13:30:00', 'A9', '2021-09-30 15:15:00', NULL),
(25, 10, 8, 3, '2021-11-13', '13:30:00', 'A6', '2021-09-30 15:15:19', NULL),
(26, 10, 8, 3, '2021-11-13', '13:30:00', 'A7', '2021-09-30 15:15:19', NULL),
(27, 10, 8, 3, '2021-11-13', '13:30:00', 'A9', '2021-09-30 15:15:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(55) DEFAULT NULL,
  `lastName` varchar(55) DEFAULT NULL,
  `phoneNumber` int(55) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(25) DEFAULT NULL,
  `status` enum('active','notActive') NOT NULL DEFAULT 'notActive',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `firstName`, `lastName`, `phoneNumber`, `image`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
('09ae7977-fd2d-44b9-bd76-309a215e72e1', 'fajar@gmail.com', '$2b$10$ILXDP6vmNAD9AzsUVyteGOL6MgG15gf6xrNsts3vBW.juyevN.WY2', 'ahmad', 'fauzi', NULL, NULL, 'user', 'notActive', '2021-10-04 06:43:08', NULL),
('1e409f46-900a-4950-b378-77164660624f', 'fauzi@gmail.com', '$2b$10$n58k8zyCBwI.DEHSpRftfOhAzWBHCUV8tTOqxxJQeKqJzJRmnZ96G', 'ahmad', 'fauzi', NULL, NULL, 'user', 'notActive', '2021-10-01 06:49:44', '2021-10-01 06:50:48'),
('2147483647', 'zaky@gmail.com', '$2b$10$/yAYgzBw76sXBQblA39xkuAppAbMHchsxF1yfwfTIdoiTGkG1dyw6', 'Ahmad', 'Zaky', 800000000, '2021-10-04T06-50-01.766ZAhmad Zaky Kemeja.jpg', 'admin', 'active', '2021-09-29 17:23:41', '2021-10-04 06:55:05'),
('324d51c2-5721-4e52-b5ff-a2050356e1a1', 'ahmad@gmail.com', '$2b$10$4Zyp/HJRstdketGIK9Aabu9ezSADkB/uuQogvrJSoaOM/QfUbZ1ga', 'Ahmad', 'Ahmad', NULL, NULL, 'user', 'notActive', '2021-09-30 09:04:42', '2021-09-30 16:56:59'),
('a91419e7-5ce1-475e-af2f-7b5faf2165d7', 'az8630394@gmail.com', '$2b$10$YnqR4SCKhD4sP1Vuasm2bu4G45OZbw0AxQKk2OYA3ETzwoxaV.MYO', 'ahmad', 'fajar', NULL, NULL, 'user', 'active', '2021-11-04 04:30:59', NULL),
('bd28101f-36fc-4673-b213-3103e9dda12f', 'a.zaky32@gmail.com', '$2b$10$JV6rJWnNxXs0ZOpVnSR6.O.mgKDZstFtZbhfbRfITRPqh4PgcnpiK', 'ahmad', 'fajar', NULL, NULL, 'user', 'active', '2021-10-08 03:44:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seatbooking`
--
ALTER TABLE `seatbooking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `seatbooking`
--
ALTER TABLE `seatbooking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
