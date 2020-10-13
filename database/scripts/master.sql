CREATE DATABASE DemoMeetings;
USE DemoMeetings;

CREATE TABLE Users (
  UserId int NOT NULL,
  UserName varchar(255),
  Email varchar(255),
  Password varchar(255),
  PRIMARY KEY (UserId)
);

CREATE TABLE Meetings (
  MeetingId int NOT NULL,
  Title varchar(255),
  MeetingDate date,
  UserId int NOT NULL,
  PRIMARY KEY (MeetingId),
  FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE Attendees (
  AttendeId int NOT NULL,
  MeetingId int,
  Email varchar(255),
  PRIMARY KEY (AttendeId),
  FOREIGN KEY (MeetingId) REFERENCES Meetings(MeetingId)
);

