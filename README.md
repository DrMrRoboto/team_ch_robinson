#Volunteer Application

##General Description:

CH Robinson (CHR) makes community outreach and employee engagement top priorities for their work environment. This goal is accomplished through company­organized volunteer events and employee­organized social events. CHR is in need of an easy way to keep track of the event calendar as well as an easy way for employees to volunteer for events.

###Authentication:
This app requires integration into CHR’s internal network, upon which administration authentication relies. CHR will be responsible for both integration and authentication when the app is deployed to their network.

###Features

####User:
####Navigation Bar

The Navigation Bar will persist through all pages, allowing the User to return to the Calendar View page or sign into the Admin View.

####Calendar View

An employee navigating to the site will be greeted by a calendar for the current month containing all of the events for that month. They will be able to look forward to the coming months and view the events scheduled ahead, as well. As shown below, they will also be able to view a list of upcoming events to the right of the calendar.

The employee will be able to click on an event in the calendar or list, taking them to that event page that will allow them to volunteer for the event.

####Event View

When the employee has selected the event they’re interested in, they will see the event name, description, date, and below a list of the various tasks for which one can volunteer. A sign­up button will open a modal window containing a list of available shifts. When the user selects a shift, a form for the user’s information will drop down. From there the user will be required to enter their name and email address. Additionally, they can include a number of guests as allowed by the capacity of the shift.

###Admin:
####Navigation Bar

Much like the User View, the Admin Navigation Bar will persist through all pages and give the Admin the option of returning to the Calendar View or Logging Out. Additionally, there will be a sub­Navigation Bar for the Admin, allowing them to create an event or view the volunteers that have signed up for that event.

####Calendar View

The Admin Calendar View, again like the User View, includes the Calendar of Events, the List of Future Events, and ­ unlike the User View ­ allows the Admin to view a List of Past Events. In doing this, the Admin can easily resurrect a past event.

The Admin can also click on an event within the Calendar and choose to Edit said event.

####Event View

In the Admin Event View administrators will use the same screen for creating and editing events. A save button will save the new/updated event to the database. The copy button will allow the admin to use the current event as a template for a new one. A delete button will of course delete the event and all associated data.

Below that section will be a list of the tasks for the event, with one button opening a modal window to edit the task name and description, and another opening a modal to edit the shifts needed for that task.

#####Modal 1: “Edit”

Modal 1 contains options for making edits to the task name and description.

#####Modal 2: “Shifts”

Modal 2 Allows the admin to edit the shifts needed for the indicated task. This second modal will have a selector for the days based on the dates selected on the main event view. A list will populate based on the days selected, allowing the admin to select the time range for the event as well as how long they want the shifts to be.

####Volunteer View

When the admin has clicked the “Volunteers” button on an event’s page, it will bring them to a list of all employees that have signed up for the event, along with their shift, guests, and shirt size. The admin will be able to click on the field they would like to edit, and click the “save” button to write any changes to the database. The delete button will remove that volunteer from the list and database. The list will be exportable to csv with a click of a button.