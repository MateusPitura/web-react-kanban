<h1 align="center"> 
  <p>Kanban Classroom</p> 
  <img src="https://github.com/user-attachments/assets/ef6ee043-8acf-4ad7-8589-f327b248241c"> 
</h1>

<p> 
  <img src="https://img.shields.io/badge/Release-Dec%202024-green">  
  <img src="https://img.shields.io/badge/Version-0.1.0-blue">  
  <img src="https://img.shields.io/badge/Status-Open-brightgreen">  
  <img src="https://img.shields.io/github/stars/MateusPitura/web-react-kanban?style=social"> 
</p> 

> :construction: This app is under development :construction: 

## Description

This project is designed to fetch data from Google Classroom and store it in an internal database. The data is then displayed in a Kanban view to help users manage assignments, tasks, and progress more effectively

- [Features](#features)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Authors](#authors)

## Features 

🎓 **Google Classroom Integration:** fetch your data such as assignments, due dates, and course work directly from Google Classroom

🔄 **Kanban View:** visualize your tasks in an interactive Kanban board, enabling drag-and-drop functionality

🔍 **Fiters:** filter your tasks by subject and due data

<p align="center"> 
  <video src="https://github.com/user-attachments/assets/375afc08-1541-402a-a42f-f2fdedae1b39"/>
</p> 

## How to Run

1. This project is not yet widely avaiable

**For devs:** 

1. `git clone git@github.com:MateusPitura/web-react-kanban.git app`  

2. Configure your `.dotenv` in frontend folder with your credentials from Google Classroom API obtained in GCP

3. `docker-compose up --build`

4. In backend folder: `npx prisma migrate dev --name init`

## Technologies Used

:heavy_check_mark: Docker

:heavy_check_mark: React 
 
:heavy_check_mark: Express

:heavy_check_mark: Postgres

:heavy_check_mark: GCP

## Authors 

| Mateus Pitura | 
|------| 
| <p align="center"><img src="https://user-images.githubusercontent.com/119008106/227821967-fac62c31-0d62-485b-829e-ef56c033e21a.jpeg" width="100" height="100"></p> | 
| <a href="https://www.linkedin.com/in/mateuspitura/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"> |
