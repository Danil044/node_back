const portfolios = require('../mobels/portfolio')

exports.get = function (request, response) {
    console.log(request.user)
    if(!request.user)
    {
        return response.status(401)
            .json({message: 'Not authorized'})
    }

    portfolios.find({},
        function (err, all) {
            if(err) {
                console.error(err)
                return err
            }
            response.json(all)
        }
    )
}


exports.postJsonType = function (request, response) {
    console.error(request.body)
    const newSPortfolio = new portfolios (request.body)
    newSPortfolio.save( function (err) {
        if(err) {
            console.error(err)
            return err
        }
        response.sendStatus(201)
    })
}

//Create
exports.post = async function (request, response) {
    console.error(request)
    console.error(request.body)

    let file = request.file;

    console.log("File: ")
    console.log(file)

    if(!file)
    {
        response.sendStatus(422)
    }

    let ex = ''
    if(file.mimetype === "image/png") ex = '.png'
    else if (file.mimetype === "image/jpg"|| file.mimetype === "image/jpeg") ex = '.jpg'
    else {
        response.sendStatus(422)
        return
    }

    const fs = require('fs');
    const path = require('path');

    console.log(__dirname)

    let toFile = path.join(__dirname, "../public/storage/portfolio/") + file.filename + ex

    await fs.copyFile(file.path, toFile, function (err){
        if(err){
            console.error(err)
            response.send(err)
            return
        }
        // Write in BD
        console.log('File copy')
        response.send(201)
    })

}
