module.exports = {
    op: {
        description: "accepts a request object, executes and returns a result",
        action: async(req) => {
            return 'hi ' + req
        }
    },
    b(){
        return 'b'
    }
}