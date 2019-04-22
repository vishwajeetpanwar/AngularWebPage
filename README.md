angularWebPage:

This project STUDENT ONBOARDING APPLICATION is a demonstration of angular application. It was generated with Angular CLI version 7.3.8.

=> The URL of github page: https://vishwajeetpanwar.github.io/AngularWebPage/ 
 
=> In order to login- Username: admin | Password: admin

#Credentials are case-sensitive.
  
Following are the assumptions for the applications:

1.) A person name would only contains alphabhets seprated by spaces. Also, minimum and maximum length of characters in a name is 1 and 20 respectively.

2.) Date of birth would not be before 1st Jan 1990 and not after 31st Dec 2016.

3.) Last Class Score would be in between 0 and 100.

4.) Different color scheme of International and Domestic students.

Application Execution:

1.) Login Page: A user cannot authenticate without credentials. Wrong URL path would lead to page not found error page. Successful login navigates a user to student onboarding form on home.

2.) Student Onboarding Form: A common form used for add, edit and view functionality. Change of student category type retrieves the relative documents required for the type. Various validation checks are applied. Successful submission navigates user to students list page. 

3). Students list: Displays the list of all students enrolled. The list can be filtered either by choosing student category type or by the student name. CLicking on a particular record opens a panel giving brief detail and actions(edit, view and delete) that can a user perform on the page. Edit and view navigates to Onboarding form with prefilled values. Delete action opens up a pop up to 

4). Log out button on top logs out the user from the app.


General, data for students is fetched from psuedo backend using InMemoryWebAPI and data for documents is fetched using LocalStorage.
Authentication gurad does not allow user to access any pages except the login page without authentication. 

