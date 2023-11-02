-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2023 at 09:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikeride`
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `bookingId` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `method` enum('UPI','CASH','DEBIT CARD') DEFAULT 'CASH',
  `status` enum('PAID','PENDING','REFUND','CANCLE') DEFAULT 'PENDING',
  `payment_details` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `userId`, `bookingId`, `amount`, `method`, `status`, `payment_details`, `createdAt`, `updatedAt`) VALUES
(1, 'eb2a0d77-8777-426f-b216-aa50b9788112', 0, 200, 'UPI', 'PAID', '', '2023-03-24 14:37:16', '2023-03-24 14:37:16'),
(2, '09197c61-fa12-4722-b35d-d3c6c8c45526', 9, 300, 'UPI', 'PAID', '', '2023-04-04 07:39:03', '2023-04-04 07:39:03');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230210154935-Bike.js'),
('20230210161811-Bike.js'),
('20230210163927-User.js'),
('20230211170233-User.js'),
('20230211173353-User.js'),
('20230211173835-User.js'),
('20230211173934-User.js'),
('20230212070507-Bike.js'),
('20230212070850-Bike.js'),
('20230212074046-Specification.js'),
('20230212074728-Specification.js'),
('20230212075511-Specification.js'),
('20230212093650-User.js'),
('20230213134731-Vehicle.js'),
('20230213135454-Vehicle.js'),
('20230215145827-VehicleBooking.js'),
('20230215162013-Payment.js'),
('20230215162200-Payment.js');

-- --------------------------------------------------------

--
-- Table structure for table `specification`
--

CREATE TABLE `specification` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `bikeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `mileage` int(5) NOT NULL,
  `engineType` varchar(255) NOT NULL,
  `noOfCylinders` int(2) NOT NULL DEFAULT 1,
  `Displacement` int(10) NOT NULL,
  `MaxPower` varchar(10) DEFAULT NULL,
  `MaxTorque` varchar(10) DEFAULT NULL,
  `FrontBrake` varchar(10) NOT NULL DEFAULT 'Drum Brake',
  `RearBrake` varchar(10) NOT NULL DEFAULT 'Drum Brake',
  `FuelCapacity` int(10) DEFAULT NULL,
  `ABS` varchar(20) DEFAULT 'NO',
  `Speedometer` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specification`
--

INSERT INTO `specification` (`id`, `bikeId`, `mileage`, `engineType`, `noOfCylinders`, `Displacement`, `MaxPower`, `MaxTorque`, `FrontBrake`, `RearBrake`, `FuelCapacity`, `ABS`, `Speedometer`, `createdAt`, `updatedAt`) VALUES
('06122a1b-0a29-47db-ab55-e4e5bb3544dc', '74c27fff-99c1-42e1-a9ed-a24db10a5890', 20, 'Turbo Engine', 4, 2000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-22 13:07:38', '2023-03-22 13:07:38'),
('28c1eb08-1ba9-43b5-9615-0cf2186483de', '7faf15d0-402b-4166-b4fd-d7cf59e252e8', 20, 'old', 3, 800, 'none', 'none', 'Drum Brake', 'Drum Brake', 25, 'NO', 'analog', '2023-03-22 13:16:30', '2023-03-22 13:16:30'),
('443c4a1d-8dbc-44cd-8bf4-0598a70f8c32', '929ccaeb-9b29-4fce-8e4a-c365ee875fd2', 20, 'turbo', 4, 1000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-24 12:47:13', '2023-03-24 12:47:13'),
('4555379a-f88b-4839-9a0f-0bad70c0733a', '68bbdb67-7fbd-482d-bb07-a3a9dd47d87f', 50, 'oil cooled', 1, 310, 'none', 'none', 'Drum Brake', 'Drum Brake', 13, 'NO', 'digital', '2023-03-04 15:29:28', '2023-03-04 15:29:28'),
('46c98083-6ab3-407e-8f26-0c8dc020165a', '2b62cdf8-5793-4a32-8f98-e8c4ce100c4a', 20, 'Liquid Cool', 4, 1200, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-21 07:29:32', '2023-03-21 07:29:32'),
('4ecfbb29-fd5f-4116-aa96-c51ba3fdb72a', 'b285572a-4b3b-48ac-99bf-802785c54ee8', 20, 'turbo', 4, 4000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-22 12:44:34', '2023-03-22 12:44:34'),
('61a3a3c5-f0f4-4283-bf6c-a7b51ea5bcb5', '830800cf-e657-4b93-abed-20a50a74d795', 20, 'Liquid Cool', 4, 2000, 'none', 'none', 'Drum Brake', 'Drum Brake', 40, 'NO', 'Digital', '2023-03-21 06:50:41', '2023-03-21 06:50:41'),
('8164e92f-b4f2-406a-af9b-e199724dc918', '36f5005d-66f0-4e3a-85d4-bb04f23c88f5', 50, 'oil cooled', 1, 310, 'none', 'none', 'Drum Brake', 'Drum Brake', 13, 'NO', 'digital', '2023-02-15 08:26:23', '2023-02-15 08:26:23'),
('834d44df-c4c0-4e75-93f6-d0756450b9b9', 'f76c834a-4bc7-44d3-a5b5-c09d94793866', 20, 'Liquid Cool', 4, 2000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-21 06:42:58', '2023-03-21 06:42:58'),
('c95f303d-d38e-48d3-ae14-c9fd017c5f4e', '1a0e127c-886a-4079-8f13-1a5aa38f2289', 20, 'Liquid Cool', 1, 1111, 'none', 'none', 'Drum Brake', 'Drum Brake', 12, 'NO', 'Digital', '2023-03-19 15:32:34', '2023-03-19 15:32:34'),
('d29f7c8c-f93a-429c-ad0e-d71cd76908a6', '0c3d6a96-c3e1-436e-894f-a94935618084', 20, 'Liquid Cool', 4, 2000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-21 06:59:53', '2023-03-21 06:59:53'),
('dda07d21-0809-4b32-9377-4eb4900db7e0', 'a1bfa952-3d4d-4f05-ad93-1e0893cc1b7a', 50, 'oil cooled', 1, 310, 'none', 'none', 'Drum Brake', 'Drum Brake', 13, 'NO', 'digital', '2023-03-19 15:00:26', '2023-03-19 15:00:26'),
('f62cfab6-a7a2-42fb-ac72-11068921f771', '33b0919c-cd5f-47a5-878d-8a6a4ba6a687', 20, 'Liquid Cool', 4, 2000, 'none', 'none', 'Drum Brake', 'Drum Brake', 45, 'NO', 'Digital', '2023-03-21 06:46:25', '2023-03-21 06:46:25'),
('f8ce8da8-ab68-49c8-9e3e-4446ec29d8b8', '1e73a97e-4b35-433f-84a8-bc5f48bb68a9', 50, 'oil cooled', 1, 150, 'none', 'none', 'Drum Brake', 'Drum Brake', 12, 'NO', 'digital', '2023-02-15 08:24:09', '2023-02-15 08:24:09');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `fine_id` varchar(255) DEFAULT NULL,
  `userImage` varchar(255) DEFAULT NULL,
  `documentImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `userImage` varchar(255) DEFAULT NULL,
  `documentImage` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`documentImage`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `phone`, `city`, `state`, `address`, `role`, `userImage`, `documentImage`, `createdAt`, `updatedAt`) VALUES
('09197c61-fa12-4722-b35d-d3c6c8c45526', 'Alam', 'skmmalam1234@gmail.com', '$2b$11$MoytQQRbbFedc8GFCWbIe.iM0/oTUyH8APYhaMWQZO/bpDXtp6ojS', '416116165', 'Mumbai', 'Maharashtra', 'Bandra', 'user', '1680593790384wallpapersden.com_windows-10-clean-dark_2560x1440.jpg', '[\"1680593790390Free-Download-40-Dark-Wallpaper-Images-In-4k-For-Desktop-.jpg\"]', '2023-04-04 07:36:30', '2023-04-04 07:36:30'),
('33417abb-d6e2-4db3-939a-1486cd1eadb4', 'ME', 'me@gmail.com', '$2b$11$kKTH7HcF0ZHqKvP18vubcO/IMlVBUFmRdoQhUvu.yg7t3mjzQtEnK', '3223423', 'Allahbad', 'UP', 'Kasba', 'user', '1679466338757car_img3.png', '[\"1679466287258images.jpg\"]', '2023-03-22 06:24:47', '2023-03-22 06:25:38'),
('eb2a0d77-8777-426f-b216-aa50b9788112', 'admin@32', 'admin@gmail.com', '$2b$11$6O.4Q.5U7xh4tjx0FrvH1eh0foU1bS4QZvdg5b1SejNmiM1ZCOHWK', '325434321', 'Mumbai', 'maharashatra', 'Bandra Mumbai', 'admin', '1679422063454Madara.png', '[\"1676376880370download.jpg\"]', '2023-02-14 12:14:40', '2023-03-22 05:50:52'),
('f0662d26-eec7-463c-a86b-150c7d4ffdd8', 'user', 'user@gmail.com', '$2b$11$bE9rzM7CA.rcFrac9OsvzedxLU.up1SvZ7Hta47lFVLXTQQwhcoU2', '4322323', 'Mumbai', 'Maharashtra', 'Mumbai Maharashtra', 'user', '1678974785772Madara.png', '[\"1678974785784tree-736885__340.jpg\"]', '2023-03-16 13:53:05', '2023-03-16 16:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `vahiclebooking`
--

CREATE TABLE `vahiclebooking` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `vehicleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `code` int(11) NOT NULL,
  `status` enum('booked','cancle','taken','return') DEFAULT 'booked',
  `bookTime` varchar(255) DEFAULT NULL,
  `returnTime` varchar(255) DEFAULT NULL,
  `Date` varchar(55) NOT NULL,
  `returnDate` varchar(55) NOT NULL,
  `ActualReturnTime` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `totalMinute` varchar(255) DEFAULT NULL,
  `totalHours` varchar(255) DEFAULT NULL,
  `totalAmmount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vahiclebooking`
--

INSERT INTO `vahiclebooking` (`id`, `userId`, `vehicleId`, `code`, `status`, `bookTime`, `returnTime`, `Date`, `returnDate`, `ActualReturnTime`, `price`, `totalMinute`, `totalHours`, `totalAmmount`, `createdAt`, `updatedAt`) VALUES
('766bf556-5ac0-4c17-8eef-a0f64e0a3cf3', 'eb2a0d77-8777-426f-b216-aa50b9788112', '2b62cdf8-5793-4a32-8f98-e8c4ce100c4a', 2591, 'cancle', '14:02', '15:02', '2023-03-21', '2023-03-21', NULL, 90, '60', '1:00', 90, '2023-03-21 07:32:39', '2023-03-21 08:11:56'),
('7d1f036a-a580-4d36-a872-ac653a641719', 'eb2a0d77-8777-426f-b216-aa50b9788112', '74c27fff-99c1-42e1-a9ed-a24db10a5890', 8023, 'return', '20:01', '21:01', '2023-03-24', '2023-03-24', '2023-03-24T20:02:03', 300, '60', '1:00', 300, '2023-03-24 14:31:49', '2023-03-24 14:32:03'),
('9a9bb319-1389-48a8-b865-e16c6e8bafdf', '09197c61-fa12-4722-b35d-d3c6c8c45526', '74c27fff-99c1-42e1-a9ed-a24db10a5890', 3323, 'return', '13:07', '14:07', '2023-04-04', '2023-04-04', '2023-04-04T13:08:56', 300, '60', '1:00', 300, '2023-04-04 07:37:04', '2023-04-04 07:38:56'),
('d4fa2be3-c3b7-45e8-9e4e-e25ed4b9770b', 'f0662d26-eec7-463c-a86b-150c7d4ffdd8', '2b62cdf8-5793-4a32-8f98-e8c4ce100c4a', 8087, 'return', '22:41', '23:41', '2023-03-22', '2023-03-22', NULL, 90, '60', '1:00', 90, '2023-03-22 17:11:18', '2023-03-22 17:11:54'),
('da7d0f32-6470-4e26-b02a-d31ff0bc5952', 'eb2a0d77-8777-426f-b216-aa50b9788112', 'b285572a-4b3b-48ac-99bf-802785c54ee8', 9117, 'return', '21:05', '22:05', '2023-03-24', '2023-03-24', '2023-03-24T20:06:01', 200, '60', '1:00', 200, '2023-03-24 14:35:53', '2023-03-24 14:36:01'),
('f3bd1142-11b7-4a11-9523-884825574cc4', 'eb2a0d77-8777-426f-b216-aa50b9788112', '948a3483-3c17-4fcd-b8c0-dca785cc38f3', 6611, 'return', '17:52', '18:52', '2023-03-22', '2023-03-22', NULL, 300, '60', '1:00', 300, '2023-03-22 12:22:18', '2023-03-22 12:23:07'),
('f634352a-b522-4c68-bcd8-0d35ae42055b', 'eb2a0d77-8777-426f-b216-aa50b9788112', 'b285572a-4b3b-48ac-99bf-802785c54ee8', 2503, 'return', '20:03', '21:03', '2023-03-24', '2023-03-24', '2023-03-24T20:03:54', 200, '60', '1:00', 200, '2023-03-24 14:33:45', '2023-03-24 14:33:54');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `brand` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(5) NOT NULL,
  `category` varchar(55) NOT NULL,
  `year` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `type` enum('petrol','diesel','electric') DEFAULT NULL,
  `gearType` enum('manual','automatic') NOT NULL,
  `mileage` varchar(255) NOT NULL,
  `owner` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `updatedBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `locationInMap` varchar(255) NOT NULL,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`image`)),
  `available` tinyint(9) NOT NULL DEFAULT 1,
  `VehicleNumber` varchar(55) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `brand`, `name`, `price`, `category`, `year`, `model`, `type`, `gearType`, `mileage`, `owner`, `updatedBy`, `location`, `locationInMap`, `image`, `available`, `VehicleNumber`, `createdAt`, `updatedAt`) VALUES
('2b62cdf8-5793-4a32-8f98-e8c4ce100c4a', 'tata', 'Tiago', 90, 'Hatchback', '2023-03-21', 'XL', 'petrol', 'manual', '20', 'eb2a0d77-8777-426f-b216-aa50b9788112', NULL, 'Mumbai', 'Mumbai', '[\"1679383772896car_img2.png\"]', 1, '', '2023-03-21 07:29:32', '2023-03-22 17:11:54'),
('74c27fff-99c1-42e1-a9ed-a24db10a5890', 'hyndai', 'verna', 300, 'Sedan', '2023-03-16', 'xls', 'diesel', 'automatic', '20', 'eb2a0d77-8777-426f-b216-aa50b9788112', NULL, 'Pune', 'Mumbai', '[\"1679490458752car_img1.png\"]', 1, '', '2023-03-22 13:07:38', '2023-04-04 07:38:56'),
('7faf15d0-402b-4166-b4fd-d7cf59e252e8', 'maruti suzuki', 'alto', 50, 'Hatchback', '2023-03-12', 'base model', 'petrol', 'manual', '20', 'eb2a0d77-8777-426f-b216-aa50b9788112', NULL, 'Mumbai', 'Mumbai', '[\"1679490990579car_img1.png\"]', 1, '', '2023-03-22 13:16:30', '2023-03-22 13:16:30'),
('929ccaeb-9b29-4fce-8e4a-c365ee875fd2', 'tata', 'Tiago', 150, 'Hatchback', '2023-03-24', 'xls', 'petrol', 'manual', '20', 'eb2a0d77-8777-426f-b216-aa50b9788112', NULL, 'Mumbai', 'Mumbai', '[\"1679662033448car_img1.png\"]', 1, '', '2023-03-24 12:47:13', '2023-03-24 12:47:13'),
('b285572a-4b3b-48ac-99bf-802785c54ee8', 'Bmw', 'S1', 200, 'Hatchback', '2023-03-22', 'xls', 'petrol', 'manual', '20', 'eb2a0d77-8777-426f-b216-aa50b9788112', NULL, 'Mumbai', 'Mumbai', '[\"1679489074537car_img3.png\"]', 1, '', '2023-03-22 12:44:34', '2023-03-24 14:36:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `specification`
--
ALTER TABLE `specification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `Test_username_unique` (`username`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `User_username_unique` (`username`);

--
-- Indexes for table `vahiclebooking`
--
ALTER TABLE `vahiclebooking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
