export function roleValidation(roles){
    return async (req, res, next)=>{

    const {role} = req.user
    
    const authorized = roles.includes((role))

    if(authorized){
        console.log("Usuario Autorizado:", role);
        next();
    }
    else{
        console.log("Usuario NO pertenece a:", roles);
        res.status(500).send("Usuario NO autorizado")
    }
    }
}