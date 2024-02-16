-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 16, 2024 at 03:06 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supervisi`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_semesters`
--

CREATE TABLE `academic_semesters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `year` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_semesters`
--

INSERT INTO `academic_semesters` (`id`, `year`, `semester`, `created_at`, `updated_at`) VALUES
(1, '2023/2024', 'ganjil', NULL, NULL),
(2, '2023/2024', 'genap', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `provider` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `user_id`, `provider`, `provider_account_id`, `refresh_token`, `access_token`, `created_at`, `updated_at`) VALUES
(4, 10, 'google', '104748250407570237032', NULL, NULL, '2023-12-06 03:12:36', '2023-12-06 03:12:36'),
(5, 11, 'google', '111027804950302594250', NULL, NULL, '2023-12-06 06:20:34', '2023-12-06 06:20:34');

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` char(36) NOT NULL,
  `school_id` char(36) NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `academic_semester_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` enum('schedule','finish') NOT NULL DEFAULT 'schedule',
  `started_at` varchar(255) NOT NULL,
  `finished_at` varchar(255) NOT NULL,
  `findings` longtext DEFAULT NULL,
  `action_plan` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `school_id`, `teacher_id`, `academic_semester_id`, `title`, `status`, `started_at`, `finished_at`, `findings`, `action_plan`, `created_at`, `updated_at`) VALUES
('009c583a-56e8-4b2b-ab30-e7fcc00a8b55', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 39, 1, NULL, 'schedule', '2023-12-26 08:30:00', '2023-12-27 11:30:00', NULL, NULL, '2023-12-24 19:30:06', '2023-12-24 19:30:06'),
('43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 'acc64e5f-dc04-48e0-bf55-01fb797d3104', 31, 2, NULL, 'finish', '2023-12-23 20:23:00', '2023-12-23 20:23:00', 'ini adalah temuan', 'ini adalah tindak lanjut', '2023-12-23 06:23:20', '2024-01-10 22:09:45'),
('51355656-7ede-4b7c-869c-9f6624cabd59', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 34, 1, NULL, 'schedule', '2023-12-20 20:00:00', '2023-12-20 20:00:00', NULL, NULL, '2023-12-18 23:55:58', '2023-12-18 23:55:58'),
('60a7ea88-4811-4661-8844-1447da3aa673', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 37, 1, NULL, 'finish', '2023-12-25 21:31:00', '2023-12-26 12:00:00', NULL, NULL, '2023-12-22 23:53:59', '2023-12-24 07:24:06'),
('9ae891d4-a9b9-45f7-b476-5f9ae85bdd7c', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 35, 1, NULL, 'schedule', '2024-02-05 20:04:00', '2024-02-06 17:05:00', NULL, NULL, '2024-02-02 03:05:08', '2024-02-02 03:05:08'),
('9e8d285f-638d-4798-9eb5-05042c1f6822', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 33, 1, NULL, 'finish', '2023-12-19 08:00:00', '2023-12-20 11:30:00', 'ini adalah temuan terbaru update', 'ini adalah tindak lanjut dari kamu update', '2023-12-18 21:21:06', '2023-12-24 19:37:21'),
('a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 29, 1, NULL, 'finish', '2024-01-01 20:00:00', '2024-01-02 12:00:00', '\"Pada tanggal 15 Desember 2023, kami melakukan visitasi ke Sekolah Menengah Atas Negeri 1 Sejahtera. Selama kunjungan, kami menemukan beberapa poin penting yang perlu ditindaklanjuti.\n\nPertama, kami menemukan bahwa beberapa fasilitas, seperti laboratorium sains dan perpustakaan, memerlukan pembaruan dan perbaikan. Beberapa peralatan di laboratorium tampak usang dan tidak sesuai dengan standar pendidikan saat ini. Selain itu, koleksi buku di perpustakaan juga perlu diperbarui dengan literatur dan sumber belajar terbaru. Kami menyarankan sekolah untuk melakukan renovasi dan pembaruan pada fasilitas tersebut.\n\nKedua, kami mendengar beberapa siswa mengungkapkan kebutuhan mereka akan lebih banyak kegiatan ekstrakurikuler, terutama yang berhubungan dengan seni dan olahraga. Oleh karena itu, kami menyarankan sekolah untuk mempertimbangkan penambahan variasi dalam program ekstrakurikuler yang ditawarkan.\n\nTerakhir, kami mencatat bahwa ada kebutuhan untuk peningkatan pelatihan guru, terutama dalam penggunaan teknologi pendidikan. Hal ini sangat penting mengingat pentingnya integrasi teknologi dalam proses belajar mengajar masa kini. Kami menyarankan sekolah untuk menyediakan pelatihan profesional pengembangan bagi guru-guru.', 'Tindak lanjut ini tentu memerlukan kerja sama dan koordinasi antara pihak sekolah dan berbagai pemangku kepentingan lainnya. Dengan demikian, diharapkan temuan dan saran dari visitasi ini bisa diimplementasikan dengan baik untuk peningkatan kualitas pendidikan di sekolah tersebut.', '2023-12-19 00:08:55', '2023-12-24 07:24:28'),
('e2f65c77-32ff-43d2-8b34-91c100498f50', 'acc64e5f-dc04-48e0-bf55-01fb797d3104', 43, 2, NULL, 'finish', '2024-01-15 20:00:00', '2024-01-16 23:30:00', 'ini adalah temuan dalam proses visitasi anda', 'ini adalah tindak lanjut', '2024-01-10 22:05:04', '2024-01-10 22:09:00'),
('ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 'c2aaf1eb-b921-4a25-91a5-18236707085e', 40, 1, NULL, 'finish', '2024-02-05 17:08:00', '2024-02-06 17:08:00', 'ini temuan1', 'tindak lanjut', '2024-02-02 03:08:37', '2024-02-02 03:17:33'),
('f906b9aa-8494-49d1-9762-3d29b22cffb8', '83d70450-d4b2-4c03-9eca-5eab31a63e62', 42, 1, NULL, 'schedule', '2023-12-25 08:31:00', '2023-12-26 19:30:00', 'ini adalah temuan dari proses visitasi kamu', 'ini adalah proses tindak lanjut yang akan anda lakukan di lapangan', '2023-12-24 05:30:26', '2023-12-24 05:34:09');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_answers`
--

CREATE TABLE `assessment_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assessment_id` char(36) NOT NULL,
  `component_id` bigint(20) UNSIGNED DEFAULT NULL,
  `answer` text NOT NULL,
  `notes` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessment_answers`
--

INSERT INTO `assessment_answers` (`id`, `assessment_id`, `component_id`, `answer`, `notes`, `created_at`) VALUES
(7, '60a7ea88-4811-4661-8844-1447da3aa673', NULL, 'https://ui.shadcn.com/docs/components/alert', NULL, '2023-12-23 08:04:03'),
(9, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', NULL, 'https://www.shadcn-vue.com/', NULL, '2023-12-23 13:31:10'),
(12, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', NULL, 'https://ui.shadcn.com/docs/components/alert-dialog', NULL, '2023-12-24 03:04:49'),
(13, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', NULL, 'https://ui.shadcn.com/docs', NULL, '2023-12-24 12:31:28'),
(14, 'e2f65c77-32ff-43d2-8b34-91c100498f50', NULL, 'https://www.youtube.com/watch?v=3XBbE9VbkOc&t=1', NULL, '2024-01-11 05:07:18'),
(15, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', NULL, 'http://127.0.0.1:8000/invitation?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSW5kYWggUGVybWF0YSwgTS5Qc2kiLCJlbWFpbCI6ImluZGFoQGdtYWlsLmNvbSIsImlkIjoiNDAifQ._lhkt8WULKSAiyg6l-oM--sBy4Xo2lWzysCJHy4jdQs', NULL, '2024-02-02 10:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_scores`
--

CREATE TABLE `assessment_scores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assessment_id` char(36) NOT NULL,
  `component_id` bigint(20) UNSIGNED NOT NULL,
  `component_detail_id` bigint(20) UNSIGNED NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessment_scores`
--

INSERT INTO `assessment_scores` (`id`, `assessment_id`, `component_id`, `component_detail_id`, `score`, `created_at`, `updated_at`) VALUES
(9, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 2, 1, 4, '2023-12-20 19:49:01', '2023-12-20 20:46:15'),
(10, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 2, 2, 4, '2023-12-20 19:51:09', '2023-12-20 20:40:48'),
(11, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 2, 3, 3, '2023-12-20 20:20:29', '2023-12-20 20:51:41'),
(12, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 2, 18, 2, '2023-12-20 20:20:43', '2023-12-20 20:20:43'),
(13, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 5, 3, '2023-12-20 20:23:52', '2023-12-20 20:24:19'),
(14, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 6, 2, '2023-12-20 20:36:35', '2023-12-20 20:38:01'),
(15, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 7, 2, '2023-12-20 20:38:06', '2023-12-20 20:38:12'),
(16, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 8, 3, '2023-12-20 20:38:16', '2023-12-21 18:43:02'),
(17, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 9, 3, '2023-12-20 20:39:10', '2023-12-20 20:39:12'),
(18, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 10, 4, '2023-12-20 20:39:16', '2023-12-24 05:25:59'),
(19, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 11, 4, '2023-12-20 20:40:03', '2023-12-20 20:46:00'),
(20, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 12, 4, '2023-12-20 20:46:06', '2023-12-22 23:49:58'),
(21, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 13, 3, '2023-12-20 20:46:08', '2023-12-20 20:51:50'),
(22, '9e8d285f-638d-4798-9eb5-05042c1f6822', 2, 1, 4, '2023-12-20 20:46:31', '2023-12-20 20:46:31'),
(23, '9e8d285f-638d-4798-9eb5-05042c1f6822', 2, 2, 1, '2023-12-20 20:46:36', '2023-12-20 20:46:36'),
(24, '51355656-7ede-4b7c-869c-9f6624cabd59', 2, 1, 3, '2023-12-20 20:47:24', '2023-12-22 21:48:48'),
(25, '51355656-7ede-4b7c-869c-9f6624cabd59', 2, 2, 2, '2023-12-20 20:47:28', '2023-12-20 21:09:49'),
(26, '51355656-7ede-4b7c-869c-9f6624cabd59', 2, 3, 2, '2023-12-20 20:47:33', '2023-12-20 20:47:33'),
(27, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 14, 3, '2023-12-20 20:51:48', '2023-12-20 20:51:48'),
(28, '51355656-7ede-4b7c-869c-9f6624cabd59', 2, 18, 3, '2023-12-20 21:09:46', '2023-12-20 21:09:46'),
(29, '51355656-7ede-4b7c-869c-9f6624cabd59', 4, 17, 4, '2023-12-20 21:16:09', '2023-12-20 21:16:09'),
(30, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 5, 4, '2023-12-20 21:16:30', '2023-12-20 21:16:30'),
(31, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 6, 3, '2023-12-20 21:16:31', '2023-12-20 21:16:31'),
(32, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 7, 3, '2023-12-20 21:16:58', '2023-12-20 21:16:58'),
(33, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 8, 3, '2023-12-20 21:17:01', '2023-12-20 21:17:01'),
(34, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 9, 3, '2023-12-20 21:17:02', '2023-12-20 21:17:02'),
(35, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 10, 3, '2023-12-20 21:17:10', '2023-12-20 21:17:10'),
(36, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 11, 3, '2023-12-20 21:17:11', '2023-12-22 18:33:13'),
(37, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 12, 2, '2023-12-20 21:17:11', '2023-12-20 21:17:11'),
(38, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 13, 3, '2023-12-20 21:17:12', '2023-12-20 21:17:12'),
(39, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 14, 3, '2023-12-20 21:17:26', '2023-12-20 21:17:26'),
(40, '51355656-7ede-4b7c-869c-9f6624cabd59', 3, 15, 3, '2023-12-20 21:17:27', '2023-12-20 21:59:45'),
(41, '51355656-7ede-4b7c-869c-9f6624cabd59', 4, 16, 4, '2023-12-20 21:17:28', '2023-12-24 06:11:47'),
(42, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 4, 16, 4, '2023-12-21 18:43:05', '2023-12-24 06:11:15'),
(43, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 4, 17, 3, '2023-12-21 18:45:21', '2023-12-22 22:09:25'),
(44, '9e8d285f-638d-4798-9eb5-05042c1f6822', 2, 3, 2, '2023-12-22 18:41:03', '2023-12-22 18:41:03'),
(45, 'a8efdc8e-8174-42b6-850d-aeecfbdfbb22', 3, 15, 3, '2023-12-22 23:49:53', '2023-12-22 23:49:53'),
(46, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 2, 1, 1, '2023-12-23 06:23:29', '2023-12-23 06:23:29'),
(47, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 2, 2, 2, '2023-12-23 06:23:36', '2023-12-23 06:23:36'),
(48, '60a7ea88-4811-4661-8844-1447da3aa673', 2, 1, 4, '2023-12-23 20:24:27', '2023-12-24 07:16:36'),
(49, '60a7ea88-4811-4661-8844-1447da3aa673', 2, 2, 3, '2023-12-23 20:44:45', '2023-12-23 20:44:45'),
(50, '60a7ea88-4811-4661-8844-1447da3aa673', 2, 3, 4, '2023-12-23 20:51:00', '2023-12-23 20:51:00'),
(51, '60a7ea88-4811-4661-8844-1447da3aa673', 2, 18, 4, '2023-12-23 20:51:50', '2023-12-23 20:55:42'),
(52, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 5, 1, '2023-12-23 20:52:00', '2023-12-23 20:52:00'),
(53, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 6, 1, '2023-12-23 20:55:51', '2023-12-23 20:57:36'),
(54, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 7, 4, '2023-12-23 20:55:52', '2023-12-23 20:55:52'),
(55, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 8, 4, '2023-12-23 20:55:54', '2023-12-23 20:55:54'),
(56, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 9, 3, '2023-12-23 20:55:55', '2023-12-23 20:55:55'),
(57, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 10, 1, '2023-12-23 20:55:58', '2023-12-23 20:57:34'),
(58, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 11, 4, '2023-12-23 20:55:59', '2023-12-23 20:55:59'),
(59, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 12, 4, '2023-12-23 20:56:02', '2023-12-23 20:56:02'),
(60, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 13, 4, '2023-12-23 20:56:08', '2023-12-23 20:56:08'),
(61, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 14, 4, '2023-12-23 20:56:10', '2023-12-23 20:56:10'),
(62, '60a7ea88-4811-4661-8844-1447da3aa673', 3, 15, 4, '2023-12-23 20:56:11', '2023-12-23 20:56:11'),
(63, '60a7ea88-4811-4661-8844-1447da3aa673', 4, 16, 1, '2023-12-23 20:56:12', '2023-12-23 20:56:22'),
(64, '60a7ea88-4811-4661-8844-1447da3aa673', 4, 17, 4, '2023-12-23 20:56:14', '2023-12-23 20:56:14'),
(65, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 2, 1, 4, '2023-12-24 05:33:11', '2023-12-24 05:33:11'),
(66, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 2, 2, 3, '2023-12-24 05:33:13', '2023-12-24 05:33:13'),
(67, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 2, 3, 4, '2023-12-24 05:33:14', '2023-12-24 05:33:14'),
(68, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 2, 18, 4, '2023-12-24 05:33:15', '2023-12-24 05:33:15'),
(69, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 5, 3, '2023-12-24 05:33:16', '2023-12-24 05:33:16'),
(70, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 6, 2, '2023-12-24 05:33:17', '2023-12-24 05:33:17'),
(71, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 7, 3, '2023-12-24 05:33:18', '2023-12-24 05:33:18'),
(72, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 8, 3, '2023-12-24 05:33:19', '2023-12-24 05:33:19'),
(73, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 9, 4, '2023-12-24 05:33:21', '2023-12-24 05:33:21'),
(74, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 10, 3, '2023-12-24 05:33:23', '2023-12-24 05:33:23'),
(75, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 11, 2, '2023-12-24 05:33:23', '2023-12-24 05:33:23'),
(76, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 12, 1, '2023-12-24 05:33:25', '2023-12-24 05:33:25'),
(77, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 13, 3, '2023-12-24 05:33:26', '2023-12-24 05:33:26'),
(78, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 14, 4, '2023-12-24 05:33:28', '2023-12-24 05:33:28'),
(79, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 3, 15, 4, '2023-12-24 05:33:30', '2023-12-24 05:33:30'),
(80, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 4, 16, 3, '2023-12-24 05:33:32', '2023-12-24 05:33:32'),
(81, 'f906b9aa-8494-49d1-9762-3d29b22cffb8', 4, 17, 2, '2023-12-24 05:33:33', '2023-12-24 05:33:33'),
(82, '9e8d285f-638d-4798-9eb5-05042c1f6822', 2, 18, 4, '2023-12-24 19:35:58', '2023-12-24 19:35:58'),
(83, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 5, 4, '2023-12-24 19:36:01', '2023-12-24 19:36:01'),
(84, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 8, 4, '2023-12-24 19:36:02', '2023-12-24 19:36:02'),
(85, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 7, 4, '2023-12-24 19:36:03', '2023-12-24 19:36:03'),
(86, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 6, 4, '2023-12-24 19:36:04', '2023-12-24 19:36:04'),
(87, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 15, 3, '2023-12-24 19:36:07', '2023-12-24 19:36:07'),
(88, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 14, 2, '2023-12-24 19:36:08', '2023-12-24 19:36:08'),
(89, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 13, 3, '2023-12-24 19:36:09', '2023-12-24 19:36:09'),
(90, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 12, 3, '2023-12-24 19:36:09', '2023-12-24 19:36:09'),
(91, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 10, 3, '2023-12-24 19:36:11', '2023-12-24 19:36:11'),
(92, '9e8d285f-638d-4798-9eb5-05042c1f6822', 3, 9, 3, '2023-12-24 19:36:11', '2023-12-24 19:36:11'),
(93, '9e8d285f-638d-4798-9eb5-05042c1f6822', 4, 16, 3, '2023-12-24 19:36:14', '2023-12-24 19:36:14'),
(94, '9e8d285f-638d-4798-9eb5-05042c1f6822', 4, 17, 3, '2023-12-24 19:36:14', '2023-12-24 19:36:14'),
(95, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 2, 1, 3, '2024-01-10 22:07:44', '2024-01-10 22:07:44'),
(96, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 2, 2, 3, '2024-01-10 22:07:47', '2024-01-10 22:07:47'),
(97, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 2, 3, 4, '2024-01-10 22:07:48', '2024-01-10 22:07:48'),
(98, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 2, 18, 4, '2024-01-10 22:07:49', '2024-01-10 22:07:49'),
(99, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 5, 4, '2024-01-10 22:07:52', '2024-01-10 22:07:52'),
(100, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 6, 3, '2024-01-10 22:07:54', '2024-01-10 22:07:54'),
(101, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 7, 3, '2024-01-10 22:07:56', '2024-01-10 22:07:56'),
(102, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 8, 4, '2024-01-10 22:07:56', '2024-01-10 22:07:56'),
(103, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 9, 4, '2024-01-10 22:07:57', '2024-01-10 22:07:57'),
(104, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 10, 4, '2024-01-10 22:08:02', '2024-01-10 22:08:02'),
(105, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 11, 3, '2024-01-10 22:08:07', '2024-01-10 22:08:07'),
(106, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 12, 3, '2024-01-10 22:08:07', '2024-01-10 22:08:07'),
(107, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 13, 4, '2024-01-10 22:08:08', '2024-01-10 22:08:08'),
(108, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 14, 4, '2024-01-10 22:08:11', '2024-01-10 22:08:11'),
(109, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 3, 15, 4, '2024-01-10 22:08:11', '2024-01-10 22:08:11'),
(110, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 4, 16, 4, '2024-01-10 22:08:12', '2024-01-10 22:08:12'),
(111, 'e2f65c77-32ff-43d2-8b34-91c100498f50', 4, 17, 4, '2024-01-10 22:08:13', '2024-01-10 22:08:13'),
(112, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 2, 3, 4, '2024-01-10 22:09:21', '2024-01-10 22:09:21'),
(113, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 2, 18, 4, '2024-01-10 22:09:22', '2024-01-10 22:09:22'),
(114, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 5, 4, '2024-01-10 22:09:24', '2024-01-10 22:09:24'),
(115, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 6, 3, '2024-01-10 22:09:25', '2024-01-10 22:09:25'),
(116, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 7, 3, '2024-01-10 22:09:26', '2024-01-10 22:09:26'),
(117, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 8, 3, '2024-01-10 22:09:26', '2024-01-10 22:09:26'),
(118, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 9, 4, '2024-01-10 22:09:27', '2024-01-10 22:09:27'),
(119, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 10, 4, '2024-01-10 22:09:29', '2024-01-10 22:09:29'),
(120, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 11, 4, '2024-01-10 22:09:29', '2024-01-10 22:09:29'),
(121, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 12, 4, '2024-01-10 22:09:30', '2024-01-10 22:09:30'),
(122, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 13, 4, '2024-01-10 22:09:31', '2024-01-10 22:09:31'),
(123, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 14, 3, '2024-01-10 22:09:33', '2024-01-10 22:09:33'),
(124, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 3, 15, 3, '2024-01-10 22:09:34', '2024-01-10 22:09:34'),
(125, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 4, 16, 4, '2024-01-10 22:09:36', '2024-01-10 22:09:36'),
(126, '43b8e7e8-9ff3-4b2b-aa45-01c5e9871337', 4, 17, 4, '2024-01-10 22:09:37', '2024-01-10 22:09:37'),
(127, '009c583a-56e8-4b2b-ab30-e7fcc00a8b55', 2, 1, 1, '2024-01-31 19:32:23', '2024-01-31 19:32:23'),
(128, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 2, 1, 4, '2024-02-02 03:11:40', '2024-02-02 03:11:40'),
(129, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 2, 2, 4, '2024-02-02 03:11:57', '2024-02-02 03:34:23'),
(130, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 2, 3, 4, '2024-02-02 03:11:59', '2024-02-02 03:34:25'),
(131, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 2, 18, 3, '2024-02-02 03:12:02', '2024-02-02 03:12:02'),
(132, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 5, 4, '2024-02-02 03:12:03', '2024-02-02 03:34:27'),
(133, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 6, 3, '2024-02-02 03:12:05', '2024-02-02 03:12:05'),
(134, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 7, 3, '2024-02-02 03:12:06', '2024-02-02 03:12:06'),
(135, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 8, 3, '2024-02-02 03:12:09', '2024-02-02 03:12:09'),
(136, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 9, 3, '2024-02-02 03:12:10', '2024-02-02 03:12:10'),
(137, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 10, 4, '2024-02-02 03:12:11', '2024-02-02 03:12:11'),
(138, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 11, 4, '2024-02-02 03:12:12', '2024-02-02 03:12:12'),
(139, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 12, 4, '2024-02-02 03:12:13', '2024-02-02 03:12:13'),
(140, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 13, 4, '2024-02-02 03:12:14', '2024-02-02 03:12:14'),
(141, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 14, 4, '2024-02-02 03:12:35', '2024-02-02 03:12:35'),
(142, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 3, 15, 4, '2024-02-02 03:12:37', '2024-02-02 03:12:37'),
(143, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 4, 16, 4, '2024-02-02 03:12:39', '2024-02-02 03:12:39'),
(144, 'ec2b8a9f-8fdc-4ecc-a87c-92ba455f3581', 4, 17, 4, '2024-02-02 03:12:40', '2024-02-02 03:12:40');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_stages`
--

CREATE TABLE `assessment_stages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assessment_stages`
--

INSERT INTO `assessment_stages` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'pra observasi', NULL, NULL),
(2, 'observasi', NULL, NULL),
(3, 'pasca observasi', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `components`
--

CREATE TABLE `components` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `allowed_extension` text DEFAULT NULL,
  `max_size` int(11) DEFAULT NULL,
  `is_multiple` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `components`
--

INSERT INTO `components` (`id`, `name`, `description`, `type`, `allowed_extension`, `max_size`, `is_multiple`, `created_at`, `updated_at`) VALUES
(2, 'Kegiatan Pembukaan Pembelajaran', NULL, NULL, NULL, NULL, NULL, '2023-12-17 00:57:12', '2023-12-17 00:57:12'),
(3, 'Kegiatan Inti Pembelajaran', NULL, NULL, NULL, NULL, NULL, '2023-12-17 00:57:19', '2023-12-17 00:57:19'),
(4, 'Kegiatan Penutup Pembelajaran', NULL, NULL, NULL, NULL, NULL, '2023-12-17 00:57:27', '2023-12-17 00:57:27');

-- --------------------------------------------------------

--
-- Table structure for table `component_details`
--

CREATE TABLE `component_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `component_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `max_score` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `component_details`
--

INSERT INTO `component_details` (`id`, `component_id`, `name`, `max_score`, `created_at`, `updated_at`) VALUES
(1, 2, 'Menyiapkan peserta didik', 4, '2023-12-17 21:27:41', '2023-12-17 23:08:34'),
(2, 2, 'Melakukan Apersepsi', 4, '2023-12-17 21:28:34', '2023-12-17 21:28:34'),
(3, 2, 'Menyampaikan tujuan pembelajaran', 4, '2023-12-17 21:41:32', '2023-12-17 21:41:32'),
(5, 3, 'Kemampuan guru merumuskan tujuan pembelajaran\nsecara operasional', 4, '2023-12-17 21:41:52', '2023-12-17 21:41:52'),
(6, 3, 'Menguasai Materi pelajaran', 4, '2023-12-17 21:41:59', '2023-12-17 21:41:59'),
(7, 3, 'Melaksanakan pembelajaran sesuai dengan\nkompetensi yang akan dicapai', 4, '2023-12-17 21:42:05', '2023-12-17 21:42:05'),
(8, 3, 'Ketrampilan dan kreatifitas penggunaan APE serta media pembelajaran', 4, '2023-12-17 21:42:12', '2023-12-17 21:42:12'),
(9, 3, 'Menggunakan bahasa yang baik dan benar', 4, '2023-12-17 21:42:20', '2023-12-17 21:42:20'),
(10, 3, 'Ketrampilan mengelola dan memanfaatkan alam, lingkungan sebagai alat dan sumber belajar', 4, '2023-12-17 21:42:45', '2023-12-17 21:42:45'),
(11, 3, 'Sikap dan gaya mengajar guru', 4, '2023-12-17 21:43:01', '2023-12-17 21:43:01'),
(12, 3, 'Kemampuan mengorganisir siswa dan mengelola kelas.', 4, '2023-12-17 21:44:04', '2023-12-17 21:44:04'),
(13, 3, 'Menunjukkan sikap terbuka , menumbuhkan dan merespon positif partisipasi aktif siswa.', 4, '2023-12-17 21:44:11', '2023-12-17 21:44:11'),
(14, 3, 'Memahami kepribadian dan perkembangan siswa.', 4, '2023-12-17 21:44:22', '2023-12-17 21:44:22'),
(15, 3, 'Melaksanakan pembelajaran aktif, inovatif, kreatif dan menyenangkan.', 4, '2023-12-17 21:44:34', '2023-12-17 21:44:34'),
(16, 4, 'Mendiskusikan  kegiatan yang telah dan akan dilaksanakan.', 4, '2023-12-17 21:44:47', '2023-12-17 21:44:47'),
(17, 4, 'Melakukan penilaian dan\nrefleksi terhadap kegiatan pembelajaran yang sudah dilakukan.', 4, '2023-12-17 21:44:53', '2023-12-17 21:44:53'),
(18, 2, 'Penampilan Guru', 4, '2023-12-17 22:39:41', '2023-12-17 22:39:41');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assessment_stage_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `allowed_extension` text DEFAULT NULL,
  `max_size` int(11) DEFAULT NULL,
  `is_multiple` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `instruments`
--

INSERT INTO `instruments` (`id`, `assessment_stage_id`, `name`, `type`, `description`, `allowed_extension`, `max_size`, `is_multiple`, `created_at`, `updated_at`) VALUES
(4, 1, 'Upload berkas', 'upload', 'di upload file dengan baik', 'pdf, docx', 1, 0, '2023-12-08 08:11:28', '2023-12-08 23:01:07'),
(10, 1, 'Wawancara', 'streaming', 'akan dilaksanakan wawancara', '', NULL, 0, '2023-12-08 21:01:29', '2023-12-08 21:01:29'),
(11, 2, 'Wawancara', 'streaming', 'streaming di aplikasi ini', '', NULL, 0, '2023-12-08 21:03:29', '2023-12-08 21:03:29'),
(12, 3, 'Wawancara pasca', 'streaming', 'ini adalah wawancara pasca visitasi', '', NULL, 0, '2023-12-09 06:03:09', '2023-12-09 06:03:09');

-- --------------------------------------------------------

--
-- Table structure for table `instrument_assessment_schedules`
--

CREATE TABLE `instrument_assessment_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assessment_id` char(36) NOT NULL,
  `assessment_stage_id` bigint(20) UNSIGNED NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('schedule','finish') NOT NULL DEFAULT 'schedule',
  `started_at` datetime NOT NULL,
  `finished_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `instrument_criteria`
--

CREATE TABLE `instrument_criteria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `max_score` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `instrument_criteria`
--

INSERT INTO `instrument_criteria` (`id`, `instrument_id`, `title`, `max_score`, `created_at`, `updated_at`) VALUES
(1, 4, 'Menentukan identitas tema', 2, '2023-12-08 23:00:38', '2023-12-12 23:43:25'),
(2, 4, 'Menentukan kompetensi inti (KI)', 2, '2023-12-09 02:21:28', '2023-12-12 23:43:28'),
(3, 4, 'Menentukan kompetensi dasar dan indikator capaian', 2, '2023-12-09 02:22:29', '2023-12-12 23:43:31'),
(4, 4, 'Menentuka tujuan pembelajaran', 2, '2023-12-09 02:23:02', '2023-12-12 23:43:34'),
(5, 4, 'Menentukan materi pembelajaran', 2, '2023-12-09 02:24:08', '2023-12-12 23:43:39'),
(8, 10, 'CP/Indikator apa yang akan saudara sajikan!', 2, '2023-12-09 03:10:29', '2023-12-12 23:43:51'),
(9, 10, 'Metode apa Yang akan saudara gunakan dalam capaian pembelajaran ini? Apa alasannya anda memilih metode tersebut!', 2, '2023-12-09 03:11:05', '2023-12-12 23:43:54'),
(10, 10, 'Alat dan bahan (sumber belajar) apakah yang saudara siapkan? Jelaskan alasannya!', 2, '2023-12-09 03:11:17', '2023-12-12 23:43:59'),
(11, 10, 'Ceritakan tahapan pembelajaran yang akan saudara sajikan', 2, '2023-12-09 03:11:29', '2023-12-12 23:44:03'),
(12, 10, 'Persiapa tertulis apa saja yang saudara buat?', 2, '2023-12-09 03:11:38', '2023-12-12 23:44:07'),
(13, 10, 'Tema apa yang sulit oleh murid berdasarkan perkiraan saudara? Jika ada, tema apa? Jelaskan alas an saudara!', 2, '2023-12-09 03:11:47', '2023-12-12 23:44:11'),
(14, 10, 'Kompetensi apa yang bisa dimiliki murid setelah mengikuti pembelajaran sesuai dengan harapan saudara?', 2, '2023-12-09 03:11:57', '2023-12-12 23:44:15'),
(15, 10, 'Apa yang perlu mendapat perhatian khusus pada pembelajaran kali ini?', 2, '2023-12-09 03:12:06', '2023-12-12 23:44:20'),
(16, 11, 'Orientasi : Guru menyiapkan fisik dan psikis murid dengan menyapa dan memberi salam', 2, '2023-12-09 03:21:48', '2023-12-12 23:44:35'),
(17, 11, 'Orientasi : Guru menyampaikan rencana kegiatan baik, individual,  kerja  kelompok,  dan  melakukan observasi', 2, '2023-12-09 05:53:35', '2023-12-12 23:44:39'),
(18, 11, 'Motivasi : Guru mengajukan pertanyaan untuk memotivasi murid', 2, '2023-12-09 05:54:36', '2023-12-12 23:44:45'),
(19, 11, 'Motivasi :Guru menyampaikan manfaat materi pembelajaran', 2, '2023-12-09 05:54:58', '2023-12-12 23:44:49'),
(20, 11, 'Apersepsi: Guru  menyampaikan  kompetensi  yang  akan\ndicapai murid', 2, '2023-12-09 05:56:28', '2023-12-12 23:44:53'),
(21, 11, 'Apersepsi : Guru mengaitkan tema dengan dengan tema pembelajaran sebelumnya', 2, '2023-12-09 05:56:43', '2023-12-12 23:44:57'),
(22, 11, 'Apersepsi : Guru mendemonstrasikan sesuatu yang terkait dengan materi pembelajran', 2, '2023-12-09 05:57:02', '2023-12-12 23:45:01'),
(23, 11, 'Penguasaan tema pembelajaran : Guru menyesuaikan tema dengan tujuan pembelajaran', 2, '2023-12-09 05:57:32', '2023-12-12 23:45:05'),
(24, 11, 'Penguasaan tema pembelajaran : Guru mengaitkan tema dengan pengetahuan lain yang relevan, perkembangan iptek dan kehidupan nyata', 2, '2023-12-09 05:57:47', '2023-12-12 23:45:29'),
(25, 11, 'Penguasaan tema pembelajaran : Guru menyajikan pembahasan tema pembelajaran dengan tepat', 2, '2023-12-09 05:59:56', '2023-12-12 23:45:25'),
(26, 11, 'Penguasaan tema pembelajaran : Guru   menyajikan   tema   secara   sistematis (mudah kesulit, dari konkrit ke abstrak)', 2, '2023-12-09 06:00:16', '2023-12-12 23:45:21'),
(27, 11, 'Penerapan strategi pembelajaran yang mendidik :\nGuru melaksanakan pembelajaran sesuai dengan\nkompetensi yang akan dicapai', 2, '2023-12-09 06:01:23', '2023-12-12 23:45:14'),
(28, 11, 'Penerapan strategi pembelajaran yangmendidik : Guru melaksanakan pembelajaran yang menumbuhkan partisipasi aktif murid dalam mengajukan pertanyaan', 2, '2023-12-09 06:02:09', '2023-12-12 23:45:10'),
(29, 12, 'Bagaima pendapat saudarasetelah menyajikan pelajaran ini?', 3, '2023-12-09 06:03:29', '2023-12-09 06:03:29'),
(30, 12, 'Apakah proses pengembangan sudah sesuai dengan yang direncanakan?', 3, '2023-12-09 06:03:37', '2023-12-09 06:03:37'),
(31, 12, 'Dapatkah saudara menceritakan hal-hal yang dirasakan memuaskan dalam proses pembelajarannya?', 3, '2023-12-09 06:03:47', '2023-12-09 06:03:47'),
(32, 12, 'Bagaimana perkiraan saudara mengenai ketercapaian tujuan pembelajaran?', 3, '2023-12-09 06:03:58', '2023-12-09 06:03:58'),
(33, 12, 'Apa yang menjadi kesulitan murid?', 3, '2023-12-09 06:04:05', '2023-12-09 06:04:05'),
(34, 12, 'Apa yang menjadi kesulita saudara?', 3, '2023-12-09 06:04:11', '2023-12-09 06:04:11'),
(35, 12, 'Adakah alternatif lain untuk mengatasi kesulitan saudara?', 3, '2023-12-09 06:04:19', '2023-12-09 06:04:19'),
(36, 12, 'Apa hal-hal yang sudah sesuai dan hal-hal yang perlu ditingkatkan berdasarkan kegiatan pembelajaran.', 3, '2023-12-09 06:04:26', '2023-12-09 06:04:26'),
(37, 12, 'Dengan demikian, apa yang saudara lakukan untuk pertemuan berikutnya?', 3, '2023-12-09 06:04:35', '2023-12-09 06:04:35');

-- --------------------------------------------------------

--
-- Table structure for table `instrument_criteria_values`
--

CREATE TABLE `instrument_criteria_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assessment_id` char(36) NOT NULL,
  `instrument_id` bigint(20) UNSIGNED NOT NULL,
  `instrument_criteria_id` bigint(20) UNSIGNED NOT NULL,
  `response` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_11_19_052534_create_permission_tables', 1),
(6, '2023_12_06_011701_create_schools_table', 1),
(7, '2023_12_06_080429_create_accounts_table', 2),
(8, '2023_12_07_012832_add_some_field_to_user_table', 3),
(10, '2023_12_08_021634_add_school_id_to_users_table', 5),
(12, '2023_12_08_075304_create_assessment_stages_table', 6),
(13, '2023_12_08_075434_create_academic_semesters_table', 6),
(14, '2023_12_08_075702_create_instruments_table', 7),
(15, '2023_12_08_080156_create_instrument_criterias_table', 8),
(16, '2023_12_09_011748_update_instrument_table', 8),
(17, '2023_12_10_044516_create_assessments_table', 9),
(18, '2023_12_10_053750_create_assessment_steps_table', 10),
(19, '2023_12_11_141945_create_instrument_assessment_schedules', 11),
(22, '2023_12_12_011947_update_instrument_assessment_schedule_table', 12),
(23, '2023_12_13_072743_create_instrument_criteria_value_table', 13),
(26, '2023_12_17_060536_create_components_table', 14),
(27, '2023_12_17_061031_create_component_details_table', 14),
(29, '2023_12_17_082048_add_max_score_to_component_details_table', 15),
(30, '2023_12_18_062846_update_assessment_table', 16),
(32, '2023_12_20_013904_add_columns_notes_to_assessments_table', 17),
(35, '2023_12_20_014533_create_assessment_answers_table', 18),
(36, '2023_12_20_015426_create_assessment_scores_table', 18);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 10),
(1, 'App\\Models\\User', 11),
(1, 'App\\Models\\User', 12),
(1, 'App\\Models\\User', 13),
(1, 'App\\Models\\User', 14),
(1, 'App\\Models\\User', 15),
(1, 'App\\Models\\User', 19),
(1, 'App\\Models\\User', 41),
(2, 'App\\Models\\User', 16),
(2, 'App\\Models\\User', 17),
(2, 'App\\Models\\User', 18),
(2, 'App\\Models\\User', 20),
(2, 'App\\Models\\User', 29),
(2, 'App\\Models\\User', 31),
(2, 'App\\Models\\User', 33),
(2, 'App\\Models\\User', 34),
(2, 'App\\Models\\User', 35),
(2, 'App\\Models\\User', 36),
(2, 'App\\Models\\User', 37),
(2, 'App\\Models\\User', 38),
(2, 'App\\Models\\User', 39),
(2, 'App\\Models\\User', 40),
(2, 'App\\Models\\User', 42),
(2, 'App\\Models\\User', 43);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Headmaster', 'web', '2023-12-05 18:18:30', '2023-12-05 18:18:30'),
(2, 'Teacher', 'web', '2023-12-06 17:38:47', '2023-12-06 17:38:47');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `leader_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `user_id`, `name`, `leader_name`, `address`, `created_at`, `updated_at`) VALUES
('83d70450-d4b2-4c03-9eca-5eab31a63e62', 41, 'MAN 1 KENDARI', 'Dr. Abdurahman bin auf, M.Pd', 'jlan, anggalomoare kendari', '2023-12-24 05:29:00', '2023-12-24 05:29:00'),
('acc64e5f-dc04-48e0-bf55-01fb797d3104', 1, 'SDN 01 MATABUBU', 'Ardiman, S.Pd', 'Andoolo', '2023-12-06 15:47:25', '2023-12-06 15:47:25'),
('c2aaf1eb-b921-4a25-91a5-18236707085e', 11, 'SMA 15 KONSEL', 'Majid, S.Pd., M.Hum', 'Desa matabubu, kec. baito', '2023-12-06 16:21:52', '2023-12-06 16:21:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `school_id` char(36) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `nip` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `link_invite` varchar(255) DEFAULT NULL,
  `is_password_changed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `school_id`, `name`, `email`, `email_verified_at`, `password`, `gender`, `nip`, `address`, `phone_number`, `profile_picture`, `remember_token`, `link_invite`, `is_password_changed`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Ardiman', 'ardiman@umkendari.ac.id', NULL, '$2y$12$GaBUtuaV0JmNzlkDpDpvguIzxt4/rqLHO1H0XTkCQSA8TRvfs/Hfu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-05 18:19:02', '2023-12-05 18:19:02'),
(10, NULL, 'Umkendari SSO', 'ssoumkendari@gmail.com', NULL, '$2y$12$C9HCnrKCeXTD09nLryoMaO/9TtuNB8WR0exKAxaYdI2iuVPui/fk.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-06 03:12:36', '2023-12-06 03:12:36'),
(11, NULL, 'Ardiman Developer', 'pc.ardiman98@gmail.com', NULL, '$2y$12$2HAmySse2itaw3s798kOEugad/Gb1QqIOIhLkU02adc0REIF48Z8S', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-06 06:20:34', '2023-12-06 06:20:34'),
(15, NULL, 'Renita Setiawati', 'renita@umkendari.ac.id', NULL, '$2y$12$D86QJqYO7.VyEgqmA0AufO1PdGma1HR/1XWQjrS9bVO0JP35TchqG', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-06 07:33:22', '2023-12-06 07:33:22'),
(16, NULL, 'Reni febriani', 'renifebriani@gmail.com', NULL, '$2y$12$SSpdSvdaRVD0iSEb4KwDheB/EumjrOEbNF33X/xiTxv0mHDWBKjeG', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiUmVuaSBmZWJyaWFuaSIsImVtYWlsIjoicmVuaWZlYnJpYW5pQGdtYWlsLmNvbSIsImlkIjoiMTYifQ.ywuJzmAb7Z-5d-06VWTOb30brxY1igkvyjUO5po6wmQ', NULL, '2023-12-06 17:46:28', '2023-12-06 19:59:25'),
(17, NULL, 'Siti nurfitri abdullah, S.Pd', 'sitti@umkendari.ac.id', NULL, '$2y$12$0HOqA4.7vv/GWlG39nHM/Olb4g0lmUwgqBwzPo/59Y/eFheYEDH5W', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2l0aSBudXJmaXRyaSBhYmR1bGxhaCwgUy5QZCIsImVtYWlsIjoic2l0dGlAdW1rZW5kYXJpLmFjLmlkIiwiaWQiOiIxNyJ9.mZUnwlfb69x2B9a_1iRKSVxVrmwK933wLMEus3FR5ms', NULL, '2023-12-06 18:17:15', '2023-12-07 07:11:16'),
(29, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Renita setiawati', 'renita.setiawati98@gmail.com', NULL, '$2y$12$puPsSGeX.zbQHSEHcs3o0OgL25QnEF4L3/j3BKZ1qxljtoB1x/she', 'female', '090', 'kendari', '082293696251', 'teachers/avatars/1703423693.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiRW1tYW51ZWwgRG90c29uIiwiZW1haWwiOiJzdWtveGl3ZWtAbWFpbGluYXRvci5jb20iLCJpZCI6IjI5In0.X-zzIc-WCg1GwaqcOcT_jQei9lCcIUOI16UHUBa8Q2M', 0, '2023-12-07 19:45:27', '2023-12-24 06:14:53'),
(31, 'acc64e5f-dc04-48e0-bf55-01fb797d3104', 'Asizah sri septiani, S.Pd', 'asizah@umkendar.ac.id', NULL, '$2y$12$kjaEZuk7mUuc.sydUvY9Zen2fyMXKvXYxP7ZoDMiVP0GRtmc660va', 'female', '435346', 'kendari', '095674564567', 'teachers/avatars/1704949992.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQXNpemFoIHNyaSBzZXB0aWFuaSwgUy5QZCIsImVtYWlsIjoiYXNpemFoQHVta2VuZGFyLmFjLmlkIiwiaWQiOiIzMSJ9.fxMFiFrso3DnrHgiUmXN5GXHKCR5ugHCRAs2ELqak-k', 1, '2023-12-08 15:54:29', '2024-01-10 22:13:12'),
(33, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Budi Santoso, M.Pd', 'budi@contoh.com', NULL, '$2y$12$f9CYYfT2HPePsXyrXl3Upeq.CZESd0bkzp/zEB2KWTr4khOfUE1f6', NULL, NULL, NULL, NULL, 'teachers/avatars/1702592579.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQnVkaSBTYW50b3NvLCBNLlBkIiwiZW1haWwiOiJidWRpQGNvbnRvaC5jb20iLCJpZCI6IjMzIn0.Gh2UPrYI8thBKdPDwZDMjESMdYZ-OJN_JnOoObQnvHM', 1, '2023-12-10 02:48:25', '2023-12-14 15:22:59'),
(34, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Siti Rahayu, S.Pd', 'siti@contoh.com', NULL, '$2y$12$cb9EYJVm1pzj18kz/dUzkuCeoBk2O/5/jRJviRua6RRhROSb9Uuoq', NULL, NULL, NULL, NULL, 'teachers/avatars/1702883584.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2l0aSBSYWhheXUsIFMuUGQiLCJlbWFpbCI6InNpdGlAY29udG9oLmNvbSIsImlkIjoiMzQifQ.5HZs-uWfbuhSoNXxEqZDZTc1L1JFMn9EA8rh0M0TbPU', 1, '2023-12-10 02:48:44', '2023-12-18 00:13:04'),
(35, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Agus Prabowo, S.Kom', 'agus@contoh.com', NULL, '$2y$12$uZmbAe/aNCfi9jbT2sdeA.hxHqJucfQXz1jl10ExmGOD8PEhTjeHa', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQWd1cyBQcmFib3dvLCBTLktvbSIsImVtYWlsIjoiYWd1c0Bjb250b2guY29tIiwiaWQiOiIzNSJ9.bFIJSE7AOUZFsOckFo7sZtxhJ9XSy3H73LqWDyR6aiU', 1, '2023-12-10 02:49:01', '2023-12-18 00:11:59'),
(36, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Dewi Lestari, M.A', 'dewi@contoh.com', NULL, '$2y$12$EZERbTbeJ9JKC3h.HZKcs.H1wKJO6W9Gu.g07/TF6XM5Wima0fww.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-10 02:49:20', '2023-12-10 02:49:20'),
(37, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Eko Susanto, S.Pd', 'eko@contoh.com', NULL, '$2y$12$Z3kWwhe6iB.iloSnvd04.u4dYJRU48s69MjjAIjs3lMwDq7xrkkvK', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-10 02:49:36', '2023-12-10 02:49:36'),
(38, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Rina Wijaya, Ph.D', 'rina@contoh.com', NULL, '$2y$12$v628CSxlmGRaL4Xlxe6s3Or437BRnPmehkEUHaoQAiD6VeKRN4zw2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-10 02:50:15', '2023-12-10 02:50:15'),
(39, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Ahmad Yani, S.T', 'ahmad@gmail.com', NULL, '$2y$12$2rhVqXlSd/khoSItvsVjD.kVGap2zbBCgQqhA3UOKn7iUUg8VUqx.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-10 03:18:03', '2023-12-10 03:18:03'),
(40, 'c2aaf1eb-b921-4a25-91a5-18236707085e', 'Indah Permata, M.Psi', 'indah@gmail.com', NULL, '$2y$12$Z3Zoy9J4DCmkgZeI9MxPJe8kJH63UlsSA4eNxPLJdQ2Rh0Ik5RkuG', NULL, NULL, NULL, NULL, 'teachers/avatars/1706869196.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSW5kYWggUGVybWF0YSwgTS5Qc2kiLCJlbWFpbCI6ImluZGFoQGdtYWlsLmNvbSIsImlkIjoiNDAifQ._lhkt8WULKSAiyg6l-oM--sBy4Xo2lWzysCJHy4jdQs', 1, '2023-12-10 03:18:23', '2024-02-02 03:19:56'),
(41, NULL, 'Muhammad Nasrullah', 'nasrullah@gmail.com', NULL, '$2y$12$P9/VGyRdC4WYaFZFvnZ7fe2WsesSYCXklEWz/RnFvpp81tY6S8yQa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-24 05:28:04', '2023-12-24 05:28:04'),
(42, '83d70450-d4b2-4c03-9eca-5eab31a63e62', 'Asizah sri septiani, S.Pd', 'asizah.sri@gmail.com', NULL, '$2y$12$8c2P6fnFr.cl7P1lfHNmwOhkGcXbWgiDjdpism2s2oMibob/OzaK.', 'female', NULL, NULL, NULL, 'teachers/avatars/1703421156.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQXNpemFoIHNyaSBzZXB0aWFuaSwgUy5QZCIsImVtYWlsIjoiYXNpemFoLnNyaUBnbWFpbC5jb20iLCJpZCI6IjQyIn0.OShdkL5kmSTxGJ2oqivjX-GjN_YL3FizbRlcFvXUgLo', 1, '2023-12-24 05:29:46', '2023-12-24 05:32:43'),
(43, 'acc64e5f-dc04-48e0-bf55-01fb797d3104', 'Rahmat Nasrullah, S.Pd, M.Hum', 'rahmatnasrulah@umkendari.ac.id', NULL, '$2y$12$5iBKVjwYUwjnq6IG6YhTs.8R779Hga/qQMya.mh7DJ5kQukeuKWpu', 'male', '43563456', 'kernasri', '082293696251', 'teachers/avatars/1704949806.png', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiUmFobWF0IE5hc3J1bGxhaCwgUy5QZCwgTS5IdW0iLCJlbWFpbCI6InJhaG1hdG5hc3J1bGFoQHVta2VuZGFyaS5hYy5pZCIsImlkIjoiNDMifQ.mTZykqFOtBlKwR4_5nxkQxplOpqzyfs3y5uxa5hSjJw', 1, '2024-01-10 22:02:21', '2024-01-10 22:10:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_semesters`
--
ALTER TABLE `academic_semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_provider_account_id_unique` (`provider_account_id`),
  ADD KEY `accounts_user_id_foreign` (`user_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessments_school_id_foreign` (`school_id`),
  ADD KEY `assessments_teacher_id_foreign` (`teacher_id`),
  ADD KEY `assessments_academic_semester_id_foreign` (`academic_semester_id`);

--
-- Indexes for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_answers_assessment_id_foreign` (`assessment_id`),
  ADD KEY `assessment_answers_component_id_foreign` (`component_id`);

--
-- Indexes for table `assessment_scores`
--
ALTER TABLE `assessment_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_scores_assessment_id_foreign` (`assessment_id`),
  ADD KEY `assessment_scores_component_id_foreign` (`component_id`),
  ADD KEY `assessment_scores_component_detail_id_foreign` (`component_detail_id`);

--
-- Indexes for table `assessment_stages`
--
ALTER TABLE `assessment_stages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `components`
--
ALTER TABLE `components`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `component_details`
--
ALTER TABLE `component_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `component_details_component_id_foreign` (`component_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instruments_assessment_stage_id_foreign` (`assessment_stage_id`);

--
-- Indexes for table `instrument_assessment_schedules`
--
ALTER TABLE `instrument_assessment_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrument_assessment_schedules_assessment_id_foreign` (`assessment_id`),
  ADD KEY `instrument_assessment_schedules_assessment_stage_id_foreign` (`assessment_stage_id`),
  ADD KEY `instrument_assessment_schedules_instrument_id_foreign` (`instrument_id`);

--
-- Indexes for table `instrument_criteria`
--
ALTER TABLE `instrument_criteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrument_criteria_instrument_id_foreign` (`instrument_id`);

--
-- Indexes for table `instrument_criteria_values`
--
ALTER TABLE `instrument_criteria_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instrument_criteria_values_assessment_id_foreign` (`assessment_id`),
  ADD KEY `instrument_criteria_values_instrument_id_foreign` (`instrument_id`),
  ADD KEY `instrument_criteria_values_instrument_criteria_id_foreign` (`instrument_criteria_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schools_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_school_id_foreign` (`school_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_semesters`
--
ALTER TABLE `academic_semesters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `assessment_scores`
--
ALTER TABLE `assessment_scores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `assessment_stages`
--
ALTER TABLE `assessment_stages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `components`
--
ALTER TABLE `components`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `component_details`
--
ALTER TABLE `component_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `instrument_assessment_schedules`
--
ALTER TABLE `instrument_assessment_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `instrument_criteria`
--
ALTER TABLE `instrument_criteria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `instrument_criteria_values`
--
ALTER TABLE `instrument_criteria_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_academic_semester_id_foreign` FOREIGN KEY (`academic_semester_id`) REFERENCES `academic_semesters` (`id`),
  ADD CONSTRAINT `assessments_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`),
  ADD CONSTRAINT `assessments_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `assessment_answers`
--
ALTER TABLE `assessment_answers`
  ADD CONSTRAINT `assessment_answers_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`),
  ADD CONSTRAINT `assessment_answers_component_id_foreign` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`);

--
-- Constraints for table `assessment_scores`
--
ALTER TABLE `assessment_scores`
  ADD CONSTRAINT `assessment_scores_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`),
  ADD CONSTRAINT `assessment_scores_component_detail_id_foreign` FOREIGN KEY (`component_detail_id`) REFERENCES `component_details` (`id`),
  ADD CONSTRAINT `assessment_scores_component_id_foreign` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`);

--
-- Constraints for table `component_details`
--
ALTER TABLE `component_details`
  ADD CONSTRAINT `component_details_component_id_foreign` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`);

--
-- Constraints for table `instruments`
--
ALTER TABLE `instruments`
  ADD CONSTRAINT `instruments_assessment_stage_id_foreign` FOREIGN KEY (`assessment_stage_id`) REFERENCES `assessment_stages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `instrument_assessment_schedules`
--
ALTER TABLE `instrument_assessment_schedules`
  ADD CONSTRAINT `instrument_assessment_schedules_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`),
  ADD CONSTRAINT `instrument_assessment_schedules_assessment_stage_id_foreign` FOREIGN KEY (`assessment_stage_id`) REFERENCES `assessment_stages` (`id`),
  ADD CONSTRAINT `instrument_assessment_schedules_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`);

--
-- Constraints for table `instrument_criteria`
--
ALTER TABLE `instrument_criteria`
  ADD CONSTRAINT `instrument_criteria_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `instrument_criteria_values`
--
ALTER TABLE `instrument_criteria_values`
  ADD CONSTRAINT `instrument_criteria_values_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`),
  ADD CONSTRAINT `instrument_criteria_values_instrument_criteria_id_foreign` FOREIGN KEY (`instrument_criteria_id`) REFERENCES `instrument_criteria` (`id`),
  ADD CONSTRAINT `instrument_criteria_values_instrument_id_foreign` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`);

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
