Starting the derby server
C:\Development\MTN\ServiceRepository\astonicservice>C:\"Program Files"\Java\jdk1.8.0_25\db\bin\startNetworkServer.bat


Running the program 
C:\Development\MTN\ServiceRepository\astonicservice>java -jar target/astonicservice-1.0-SNAPSHOT.jar

mvn jetty:run 


Testing the program
http://localhost:8080/api/rest/application

http://localhost:8080/entry-point/test

http://localhost:8080/entry-point/students