CS4550: Web Development

Project Title: NUBAY

Repository Purpose: Frontend Client for users

Authors: Saif Billah, Andre Dahan, and Ronit Sharma

Technologies used: React, HTML, CSS, Javascript, Ebay API, Heroku

## 1. State the problem you are trying to solve. Include a description of at least two types of users that would use your Web application. For each of the types of users, provide two goals the user would like to achieve with your Web application.

The problem that we want to solve is that there isn't an easy to use, Northeastern-only marketplace. We want to allow anyone with access to a husky email to buy and sell products and services. Our goal is to make our website a one-stop-shop for any Northeastern student looking to purchase a product or service.

The two types of signed-in users that would use our Web Application are buyers and sellers. The sellers in this case are verified by signing up with a husky email. Sellers can CRUD postings; they can create a posting regarding a product to sell, then have the ability to change their descriptions and prices while also having the ability to delete postings. Seller should have access to their profile and be able to add/edit contact information in case the buyer would like to contact him/her.

The buyers can message sellers, but do not need a husky email to sign up. One goal that a buyer would have is to find products to buy, and a second goal would be to contact a seller for a given product. Buyers can also update their profile information and bookmark products. 

Our application will be open to anonymous (non-signed-in) users as well. These non-signed-in users can search for products, but can’t post their own products to sell or message buyers unless they make an account. 

## 2. State the overall strategy of how you intend to solve the problem

We intend to solve the problem by creating a web application that provides a dynamic navigation that is easy to interpret by any type of users. Our web app will consist of 5 distinct screens: home page, profile page, search/results page, details page, and login/register page. We will first use our favorite UML Editor to create a UML diagram of what our data model of the posting information that interacts with a MongoDB database or JPA will look like. We will create a RESTful Web Service which will use the data model created to interact with our data. We also would like to set rigid architectural requirements to ensure that our web app is as structured as possible. We will use dynamic content loading to avoid reloading the entire page, controllers/event handlers to handle user interaction from buyers/sellers, encode state as part of the URL, and global variables/functions to avoid littering of namespace. We will also use the eBay browse api to allow buyers to search for similar content to the post created by the seller. This api will allow for readonly operations of items and we will use our local database to store information regarding postings. All in all this overall strategy of developing the web app will provide us with a good roadmap to creating a finished product.

Our web app users will fall into 3 different roles. The first role will be an anonymous user, which does not require the user to be signed in. This user will be able to search for products, but not contact sellers, bookmark products, or sell their own products. 

The second role will be a seller, who needs to sign up with a husky email. This will ensure that all of the sellers are verified students or are affiliated with the university. Sellers can CRUD postings; they can create a posting regarding a product to sell, then have the ability to change their descriptions and prices while also having the ability to delete postings. Seller should have access to their profile and be able to add/edit contact information in case the buyer would like to contact him/her.

The third role will be a buyer. The buyers can message sellers, but do not need a husky email to sign up. One goal that a buyer would have is to find products to buy, and a second goal would be to contact a seller for a given product. Buyers can also update their profile information and bookmark products. 

## 3. One of the main requirements is to work with data available from some public, free, Web API. Provide a brief description of the Web API you intend to use

The web API that we plan on using is the eBay browse API. We will use this API to match a buyers search to search eBay postings.  The browse API can allow a user to see a rich selection of elements with a simple keyword or category search. The browse API returns a list of items as well as an item summary for each item. The eBay API allows users to have 5,000 free API requests a day which should be enough for our application. 
