class adminController{
    async dashboard(req,res){
        const {user} = req
        return res.status(200).json({
            message: 'вы вошли как администратор',
            data:{
                username : user.username, 
                email : user.email,
                role : user.role
            }
        })
    }
}

module.exports = new adminController()