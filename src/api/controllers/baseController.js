export default class BaseController {
    static errorResponse(err, res) {
        console.log("error", err)
        let errorMessage;
        if (!err.name) {
            errorMessage = err.message;
        } else if (err.name.toLowerCase().includes("sequelize")) {
            errorMessage = err.parent ? err.parent.sqlMessage : err.toString();
        } else if (err.name.toLowerCase().includes("swagger")) {
            errorMessage = err.message;
        } else {
            errorMessage = err.mapped
                ? Object.values(err.mapped())
                : `an error occurred ${err}`;
        }

        res
            .status(503)
            .json(Object.assign({}, { success: false }, { error: errorMessage }));
    }

    static successResponse(statusCode, data, res) {
        res.status(statusCode).json({ success: true, data })
    }
    static failureResponse(statusCode, data, res) {
        res.status(statusCode).json({ success: false, data })
    }
}

