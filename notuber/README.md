# About LAB 11 and 12
  The Ride-Hailing project uses NodeJS and Postgres technology. This project includes the following routes:
  - /               - GET - The home page route will return an HTML page listing vehicles and passengers.
  - /rides          - POST - The client must provide passenger data such as username, lat, and lng as param, or it will just return an error "Whoops, something is wrong with your data!". I also added the feature to store passenger data inside the table called passengers. The response would be to return all the vehicles inside the database.
  - /check-in       - POST - This route is very similar to /rides. The route will store data in the vehicles table. The result will return [] if successful.
  - /passenger.json - GET - the requirement to send "username" as a query or response will return as []. If the username matches, it will return the results; otherwise will return [].
  - /vehicles.json  - GET - similar to passenger except for return vehicle instead.


# Collaborators
  - [Loi Truong](https://github.com/loitruong)

  
# Number of working hours
  8 hours

