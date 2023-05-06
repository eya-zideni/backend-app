const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const formateurRouter = require("./routes/formateur.route");
const apprenantRouter = require("./routes/apprenant.route");
const formationRouter = require("./routes/formation.route");
const quizRouter = require("./routes/quiz.route");
const courRouter = require("./routes/cour.route");



dotenv.config()
const app = express();
//BodyParser Middleware
app.use(express.json());

app.use(cors());

mongoose.set("strictQuery", false);
// Connexion à la base données

mongoose.connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("bonjour");
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/formateurs', formateurRouter);
app.use('/api/apprenants', apprenantRouter);
app.use('/api/formations', formationRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/cour', courRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});