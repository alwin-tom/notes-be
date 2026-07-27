exports.callback = async (req, res) => {

    try {

        const code = req.query.code;

        if (!code) {
            return res.status(400).json({
                error: "Authorization code missing"
            });
        }


        const tokens = await authenticate(code);


        req.session.googleTokens = tokens;


        // Redirect to frontend
        res.redirect(
            `${process.env.FRONTEND_URL}/dashboard`
        );


    } catch (error) {

        console.error(
            "Google OAuth Error:",
            error
        );


        res.status(500).json({
            error: "Google authentication failed"
        });

    }

};
