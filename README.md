# To-do App
## Clone the Repository
```bash
git clone https://github.com/SczSca/to-do-app.git
```

## To-do Frontend


### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/package-manager)
##### Package manager:
You may choose between one of these:
- npm (included in Node.js)
- [yarn](https://yarnpkg.com)

#### Open project directory
```bash
cd front-end/to-do_app/
```
#### Running app

##### Using npm

```bash
npm run start
```
##### Using yarn

```bash
yarn start
```
The application will start and be available at: 
```bash
http://localhost:9090
```

#### Running tests

##### Using npm

```bash
npm run tests
```
##### Using yarn

```bash
yarn tests
```

## To-do Backend

This is the backend application for the To-do list app built with Spring Boot and Maven. This guide will help you set up and run the application locally.

### Getting Started

#### Prerequisites
Make sure you have the following installed:
- [Java 11+](https://openjdk.org/install/)
  ```bash
  //this will install the latest version check: https://formulae.brew.sh/formula/openjdk
  brew install openjdk
  ```
- [Maven](https://maven.apache.org/download.cgi)

#### Open project directory
```bash
cd back-end
```
#### Running app
```bash
mvn spring-boot:run
```
#### Running tests
```bash
mvn test
```




