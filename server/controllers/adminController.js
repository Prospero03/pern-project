
class adminController{
    async dashboard(req,res){
        return res.status(200).json({message: 'вы вошли как администратор'})
    }
}

module.exports = new adminController()