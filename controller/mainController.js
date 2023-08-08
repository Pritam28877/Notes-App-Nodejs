module.exports.HomepageRender = (req , res)=>{
    const locals = {
        title: "Node js Notes",
        description: " Free Node js notes apps "
    }
    res.render('index' , locals)
}