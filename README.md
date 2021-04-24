# Cake-API
This project contains a REST api for delicious cakes 
- Build using AWS Lambdas and defined with the serverless framework

## Requirements
- Node
- Docker
- Serverless Framework https://www.serverless.com/framework/docs/

## Instructions to run locally

RUN: yarn install

### Start Dynamodb Local with Docker

RUN: docker run -p 8000:8000 amazon/dynamodb-local

### Start Serverless Application

RUN: yarn start

This will run the serverless application on your local machine, and create the dynamodb table needed for the service

## deploying to AWS

yarn deploy-dvl


## Available end points: 
- GET: localhost:3004/cakes
- GET: localhost:3004/cake/{id}
- DELETE: localhost:3004/cake/{id}
- POST: localhost:3004/cake