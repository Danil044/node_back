const students = require('../mobels/student')

// Вернуть всех студентов
exports.get = function (request, response) {
    students.find({},
        function (err, all) {
            if(err) {
                console.log(err)
                return err
            }
            response.json(all)
        }
    )
}

// Создать студента
exports.post = function (request, response) {
    console.log(request.body)
    const newStudent = new students (request.body)
    newStudent['someFild'] = "tetete"
    newStudent.save( function (err) {
        if(err) {
            console.log(err)
            return err
        }
        response.sendStatus(201)
    })
}

//* --------------------------------------------------------------------------

// let students = []
// students[0] = {id: 1, name: "Ivanov"}
// students[1] = {id: 2, name: "Petrov"}

// Вернуть всех студентов
exports.getOld = function (request, response) {
    response.json(students)
}

// Создать студента
exports.postOld = function (request, response) {
    console.log(request.body)
    students.push(request.body)
    response.sendStatus(201)
}
