# Axios API Service

## Setup
1. Install dependencies `npm install`
2. Start server `npm run server`
3. Start app `npm start`

## Structure
The file `/src/store/hooks/useAPI.js` contains the Axios API service along with comments providing notes about the concepts used.

On the page, "Foods" shows examples of `GET`, `PUT`, `POST`, and `DELETE` HTTP calls being made using the API service. The "API Actions" section shows examples of a variety of error messages and scenarios including examples of suppressing the global error notifications, adding local error notifications, and adding custom error messages.

The `Notifications` component is a single global Component rendered once at the root that is controlled by a redux store. The global HTTP handler dispatches updates to the redux state that opens the Dialog and sets the content to be displayed in the UI. This could easily be changed to whatever notification system is desired (the Material Dialog here is just an example)

### Server
The server is just a simple Express API for demo purposes. It's configured to return specitic responses to show examples of these responses being handled in the front end app.
