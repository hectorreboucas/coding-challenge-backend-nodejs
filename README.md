# Stolen Bike Cases - JOIN Coding Challenge - Backend (Node.js)
![JOIN Stolen Bike Cases](https://github.com/join-com/coding-challenge-backend-nodejs/raw/master/illustration.png)

## Context
Stolen bikes are a typical problem in Berlin. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes — the software that you're going to develop. 

## Product Requirements
- [ok] Bike owners can report a stolen bike.
- [ok] New stolen bike cases should be automatically assigned to any free police officer.  
- [ok] A police officer can only handle one stolen bike case at a time. 
- [ok] When the Police find a bike, the case is marked as resolved and the responsible police officer becomes available to take a new stolen bike case. 
- [ok] The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.

## Your Mission
Your task is to provide APIs for a frontend application that satisfies all requirements above.

Please stick to the Product Requirements. You should not implement authorisation and authentication, as they are not important for the assessment. Assume everyone can make requests to any API. 

## Tech Requirements
- Node.js
- **Tests (quality and coverage)**
- You are free to use any framework, but it’s recommended that you use one that you’re good at
- Use only SQL Database
- Typescript is a plus

## Starting Materials
For your convenience, you can use one of our service bootstrap template to help you started coding quicker without a hassle, 
but please note - it has our own opinionated Linting and Typescript by default: **https://github.com/join-com/server-template-public**

## Instructions
- Build a performant, **clean and well-structured solution**.
- Commit early and often. We want to be able to check your progress.
- Please complete your working solution within 3 days of receiving this challenge.
- Please **do not** spend more than 4 hours.
- **Send us an email with a link to repository when you finish the assesment**.
- **Optionally, send us a link to a deployed version on Vercel or any other service that will expose that API for testing**.


# RUNNING INSTRUCTION

- I used POSTGRES as my database
- SETUP THOSE ENV VARIABLES BEFORE START
- PGUSER=postgres
- PGHOST=localhost
- PGPASSWORD=password
- PGDATABASE=stolen_bikes_db
- PGPORT=5432
- *Those values are just an example

- run: "npm install" to install all necessary packages
- run: "npm run build" to compile the project
- run: "npm start" it should start a local server on localhost:3000

- access "localhost:3000" in your browser, you should see a swaggger documentation

- You should be able to interact direct with swagger

- *Obs: unfortunatelly I couldn't let the sqlite config right on time, so "npm test" wont work yet







