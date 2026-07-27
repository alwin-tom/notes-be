require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");


const app = express();

const PORT = process.env.PORT || 3000;


// Middleware

app.use(
    cors({
        origin: true,
        credentials: true
    })
);


app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


// Session
// Required if storing Google tokens per user

app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie:{
            httpOnly:true,
            secure:false, // true in HTTPS production
            maxAge:1000*60*60*24
        }

    })
);



// Routes

app.use(
    "/auth",
    authRoutes
);


app.use(
    "/api/tasks",
    taskRoutes
);



// Health check

app.get(
    "/",
    (req,res)=>{

        res.json({
            application:"Google Tasks API Wrapper",
            status:"running"
        });

    }
);



// Error handler

app.use(
    (err,req,res,next)=>{

        console.error(err);

        res.status(500).json({

            error:"Internal server error"

        });

    }
);



app.listen(
    PORT,
    ()=>{
        console.log(
            `Server running on port ${PORT}`
        );
    }
);
