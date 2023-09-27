


## Setup & Configuration
Clone the repository:
```bash
git clone https://github.com/eskoimex/zacrac.git
```

---

## Running locally

```bash
# Install all Dev-included dependencies
npm install
# Generates Prisma cliente metadata/types stuff
npx prisma generate
```

Running the project is simple as:

```bash
npm run start
```


## API deployed public using postman
https://documenter.getpostman.com/view/8425786/2s9YJZ3jMR

## Live Host URL
https://zacrac-t475.onrender.com/


## END POINTS

# Ping 
https://zacrac-t475.onrender.com/ping

# Authentication
https://zacrac-t475.onrender.com/api/v1/signup
https://zacrac-t475.onrender.com/api/v1/login

# User
- Create User - POST - https://zacrac-t475.onrender.com/api/v1/signup
- List Users - GET - https://zacrac-t475.onrender.com/api/v1/signup
- Fetch A User(By email,id, username) - GET - https://zacrac-t475.onrender.com/api/v1/signup/{param}
- Update A User(By email,id, username) - PUT - https://zacrac-t475.onrender.com/api/v1/signup/{param}
- Delete A User(By email,id, username) - DELETE - https://zacrac-t475.onrender.com/api/v1/signup/{param}





