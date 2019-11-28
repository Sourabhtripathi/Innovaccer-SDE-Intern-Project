
# Entry Management Software - Innovaccer SDE Intern 2020

This is an Entry Management Software for Innovaccer. 

## Links
Hosted React app : [https://innovaccer-sde-intern-client.herokuapp.com/](https://innovaccer-sde-intern-client.herokuapp.com/)

Hosted Server : [https://innovaccer-sde-intern-server.herokuapp.com/](https://innovaccer-sde-intern-server.herokuapp.com/)

Demo Video : https://drive.google.com/open?id=1x4kAN6_OWLsUHxbogkfmXq6RxXaGYxlT

## Directory Structure

![enter image description here](https://lh3.googleusercontent.com/qRXwFMv1aMRz_6pQwGEuz1pMFgSvUs9N8q5xmc6YczASmlOs6xm1SlkkCgoXA2x32ni0INIXD64)


![enter image description here](https://lh3.googleusercontent.com/cdfh2HyfwJDYPh_j0E8QZzZDUJH-cuM_NjSrVM6d4ikGidkA-k7sp7Raj8NXKbxDgoVhMV6jRm8)


![enter image description here](https://lh3.googleusercontent.com/rAfXkVfuyhJoX6GnpMf4ew6ui6uLoUAUsbXyGbzHwrz48GPL_QpV2AvfVJZbrVDeQV4nTn3pEnU)

## Tech Stack used : 

Client Side :
 - React.js
 - Semantic UI

Server Side :
 - Node.js
 - MongoDB
 - Express.js

Hosting :

 - Heroku
 
 Mail Service :
 
 - MailJet
 

SMS Service :

 - Nexmo
 
## Installation
Either download the repository zip or clone the repository by using the following command : 

```bash
git clone https://github.com/Sourabhtripathi/Innovaccer-SDE-Intern-Project.git
```
The repository would be downloaded into your computer.
```bash
cd Innovaccer-SDE-Intern-Project
```
First setup the server :
```bash
cd server
```

Install all the dependencies
```bash
npm install
```
Now your server is ready to start. Start it by following command
```bash
npm start
```
Your would get a message "Server Running" in your terminal

To use the Mail and SMS Services you have to log in to MailJet and Nexmo and get your credentials for the same.
Then add a .env file in the root folder of the server with all the credentials with corresponding variable names.
The format of the variables is as follows :
```bash
DATABASEURL='mongodb://localhost/innovaccer'
PORT=3001
mailJetId=<Your_mailjet_id>
mailJetToken=<Your_mailjet_token>
nexmoKey=<Your_nexmo_key>
nexmoSecret=<Your_nexmo_secret>
NEXMO_FROM_NO=<Your_nexmo_registered_no>
```

Now since your server is up and running, you can now move on to the client side.
Open a new terminal and in the same directory as this repository, i.e, Innovaccer-SDE-Intern-Project

Now follow the commands : 
```bash
cd client
```
```bash
npm install
```
Now that the dependencies are intstalled, you can now start the React server.
But doing that change the api link in "/src/apis/innovaccer.js" to "http://localhost:3001" or the link to your mongoDB Database.
Start the React server :
```bash
npm start
```
Now you can use the app.

## Usage

As you enter the app you see a Landing Page greeting you on behalf of Innovaccer :
![
](https://lh3.googleusercontent.com/qZt9-tDMtcmuMft1SXw4dc1oeIIgOIyQsLH0xxlp2Psgct6PrCYqNkf4M9CVG2fJBsl7wkEfYoI "Landing")

As You Enter, you would see a Visitor Form which asks for Visitor Details(Name, Phone, Email) and same info is recorded for Host as well.


![enter image description here](https://lh3.googleusercontent.com/_wNit4uAZmDh0dX6yF6DSEqgIv2OFbIgHyhshjhWYG2Nm3lUWY1jB8OMpAZrP8Q1Le3V6MMYdSg "Add Visitor")


As the visitor checks in, he/she now cannot checkin again with the same email until he/she checks out.
Once the visitor checks in, the host would receive an email and as sms informing him/her that there's a visitor waiting.



![
](https://lh3.googleusercontent.com/z0plK7oOMx5wqyYkiMZDYyd8KVgo71xI0kGsCW-A-YA4MePB5gfavXO_CVv0ufa7oMEURYBJsEY "Checked In")



![](https://lh3.googleusercontent.com/ymHH7yLis1NCKCH-kYbmyIXQyM6c8owAN_tMCjlybCaJUfXfB9CNfnCgLUbEXkhxOwV_eMJd34A "Host email")



![](https://lh3.googleusercontent.com/e9GmyV-jAxjuR8733G5L59Sjztq3I7Uw6sZGb7JhnkwmyTGSpV7iK38rN0Np9I6_dcm_2fMWE5M "SMS")



A Floating action button is provided on the bottom right corner, by which you can toggle between Home, Visitor Form and Checkout Form.


![](https://lh3.googleusercontent.com/1gnEiEk5oVUR8ygMTGWaEUXDsoCP-RU44cpF-VlDo7Ga4-u33IPxMWd2XOUwpEScAj1kUASjTOE "FAB")



Once the visitor opens the checkout form he/she will be required to enter his/her email to verify the checkout.

![](https://lh3.googleusercontent.com/O3pvF8INdIuFj43NlRYtIW2XPkpvFfSgGLZ8cfk_K7vpOvoJhVKSwhc_1eghpG0JoyO7IyWAknE "Checkout Form")


Once the visitor checks out he/she receives an email regarding the visit details :


![](https://lh3.googleusercontent.com/ZywFizTtFlyLnrSj_z5b8O54vzKYJNikSKGPlP-4FUGsk39OtadfPzjIT6ymvK4yGhKx6ZQipkM "Visit Details")



## API Routes

### Get
 - ### "/" 
 Landing Route
	
	Required Parameters : none
 - ### "/get_visitors" 
 Get all visitors in the database
 
	 Required Parameters : none

### Post

 - ### "/visitor/checkin"
 Add a visitor. Requires body with visitor+host details :
	
	Required parameters :
	1. visitorName
	2. visitorPhone
	3. visitorEmail
	4. hostName
	5. hostPhone
	6. hostEmail
	7. checkin(time)
	8. addressVisited
 

### Update (PUT)

 
 - ### "/visitor/checkout"
 Add a visitor. Requires body with visitor+host details :
	
	Required parameters :
	1. visitorEmail
