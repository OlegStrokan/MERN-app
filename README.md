# First fullstack app

### V_2.4.1

First app with completely frontend and backend

Available endpoints: 

Auth functional:
- POST */auth/registration - for register new account*
- POST */auth/login - for login if you already have account*
- POST */auth/logout - for logout (stop session)*
- GET */auth/activate/:link - for get activation link*
- GET */auth/me - for refresh session*

Users functional:
- GET */users - get all users*
- PATCH */profile - update your own profile*

Posts functional
- GET */posts - get all posts*
- POST */posts - create new post*
- PATCH */posts/:id - update existed post*
- DELETE */posts/:id - deleted existed post*

## Frontend stack:
### - *React*
### - *Mobx*
### - *Material UI*

## Backend stack:
### - *Express*
### - *Mongodb*



## Available Scripts for frontend

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts for backend

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

