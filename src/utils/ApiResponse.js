import { startSession } from "mongoose"

class ApiResponse {
    constructor (statusCode,data ,message = "success "){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = startSession <400
    }
}

export default ApiResponse