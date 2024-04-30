Project: Flashcard-o-matic 

Final task for Chegg RONT_END-501 

A local school has decided to put together a flashcard application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flashcards for the subjects they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use.

Project setup
Follow the instructions below to get this project up and running on your own machine:

Download the Qualified assessment files to your computer.
Run npm install to install the project.
Note: Work on this project locally, because Qualified's online IDE and Web Preview features don't work properly for this assessment.

To run the tests, you can run the following command:

npm test
Most of the tests in this project wait for content to load via the API before continuing the test. Before the implementation is complete, the content never loads so the test fails with a timeout. As a result, the tests will initially run slowly. It may take perhaps a minute or more for all the tests run. The tests will speed up as the implementation nears completion.

You can run the application using the following command.

npm start
The start command will start two servers concurrently:

An API server, powered by json-server, running on http://localhost:5000
A React application running on http://localhost:3000
To stop the servers from running, you can press Control+C.


