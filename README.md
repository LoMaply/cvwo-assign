### Thoughts: CVWO project

## What?

This is a project submission for CVWO. `Thoughts` is a web forum in a similar format to existing forums such as Reddit, where users can create accounts, submit posts and comment on them.

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