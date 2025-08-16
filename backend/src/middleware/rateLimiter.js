import ratelimit from "../config/upstash.js"


const rateLimiter = async (req, res, next) => {

try {
    const {success} = await ratelimit.limit("my-rate-limit")

    if(!success){
        return res.status().json({
            message : "too many requests"
        })
    }

    next() 

} catch (error) {
    console.log("Rte limit error", error)
    next(error)
}

}

export default rateLimiter