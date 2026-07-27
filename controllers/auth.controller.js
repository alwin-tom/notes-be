const {
    getAuthUrl,
    authenticate
} = require("../googleClient");


exports.login = (req, res) => {

    const url = getAuthUrl();

    res.redirect(url);

};


exports.callback = async (req, res) => {

    try {

        const code = req.query.code;

        const tokens = await authenticate(code);


        req.session.googleTokens = tokens;


        res.redirect(
            `${process.env.FRONTEND_URL}/dashboard`
        );


    } catch(error) {

        console.error(error);

        res.status(500).json({
            error:"Authentication failed"
        });

    }

};
