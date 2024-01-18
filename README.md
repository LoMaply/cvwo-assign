### Thoughts: CVWO project

## What is this?

This is a project submission for CVWO. `Thoughts` is a web forum in a similar format to existing forums such as Reddit, where users can create accounts, submit posts and comment on them.

## Deployment

This application is currently deployed [here via Render](https://cvwo-frontend.onrender.com/). As I am using the free tier, the backend spins down after a period of inactivity and takes time to load when the page is visited again. As such, if you do not see any posts on the main page when visiting the page, periodically refresh the page until they load (ie. the backend has fully started).

If you still do not see posts on the main page after a while, the database may have expired as the deployment uses a Postgresql database from Render, which expires after 90 days.

## Instructions for running in development/locally

1. Open the terminal (frontend instance) and run the following commands

```
cd frontend
npm install
npm audit fix
```

2. Open another instance (backend instance) of the terminal and run the following commands

```
cd backend
rails db:migrate
rails s
```
Note that rails s starts the rails server

3. Return to the frontend instance of the terminal and run the command

```
npm run dev
```

4. `Ctrl` + `Click` the link