const {
    getAuthUrl,
    authenticate
} = require("../googleClient");



/**
 * Redirect user to Google OAuth consent page
 */
exports.login = (req, res) => {

    const url = getAuthUrl();

    res.redirect(url);

};



/**
 * Google OAuth callback
 */
exports.callback = async (req, res) => {

    try {

        const code = req.query.code;


        if (!code) {

            return res.status(400).json({
                error: "Authorization code missing"
            });

        }


        // Exchange code for tokens
        const tokens = await authenticate(code);



        // Store tokens in session
        req.session.googleTokens = tokens;



        res.json({

            success: true,

            message: "Google authentication successful",

            redirect: "/api/tasks/lists"

        });


    } catch (error) {


        console.error(
            "Google OAuth Error:",
            error
        );


        res.status(500).json({

            error:"Google authentication failed"

        });

    }

};
