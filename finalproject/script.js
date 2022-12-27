
// we will hold our objects in a lists and reach them with a loop.

let lectures = []; // created for store the lecture objects
let students = []; // created for store the student objects
let studentLectures = []; // created for store the studentLecture objects

// creating table for lectures
function createLecturesTable() {
    // reaching html elements with js and assigning it to use.
    document.querySelector(".resultHeader").innerHTML = "Lectures";

    // creation of table elements for lecture.
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Point Scale</th>
            <th>Number of Students</th>
            <th>Students Passed</th>
            <th>Students Failed</th>
            <th>GPA</th>
            <th>Students</th>
            <th>Delete</th>
        </tr>
    `;
    // creation of table rows for lecture.
    for (let i = 0; i < lectures.length; i++) {
        let lecture = lectures[i];
        document.querySelector("#resultTable").innerHTML += `
            <tr>
                <td>${lecture.id}</td>
                <td>${lecture.name}</td>
                <td>${lecture.pointScale}</td>
                <td>${lecture.students.length}</td>
                <td>${getPassedStudents(lecture)}</td>
                <td>${getFailedStudents(lecture)}</td>
                <td>${getAverageScore(lecture)}</td>
                <td><button class="btn" onclick="showStudentsOfLecture('${lecture.id}')">Students</button></td>
                <td><button class="btn" onclick="deleteLecture('${lecture.id}')">Delete</button></td>
            </tr>
        `;
    }
}

// function(constructor) to create a new lecture object
function createLecture(id, name, pointScale) {
    return {
        id: id,
        name: name,
        pointScale: pointScale,
        students: []
    };
}

// finding how many students that passed the lecture with the comparing their letter grade with FF. returns parameter.
function getPassedStudents(lecture) {
    let passedStudents = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id && studentLecture.letterGrade != "FF") {
            passedStudents++;
        }
    }
    return passedStudents;
}

// finding how many students that failed the lecture with the comparing their letter grade with FF. returns parameter.
function getFailedStudents(lecture) {
    let failedStudents = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id && studentLecture.letterGrade == "FF") {
            failedStudents++;
        }
    }
    return failedStudents;
}

// finding average score of the lecture.
function getAverageScore(lecture) {
    let totalScore = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id) {
            totalScore += getLetterGradeScore(studentLecture.letterGrade);
        }
    }
    return (totalScore / lecture.students.length).toFixed(2);           // converting number to string with toFixed.
}
// calculating the score of a letter grade of students.
function getLetterGradeScore(letterGrade) {
    switch (letterGrade) {
        case "AA":
            return 4.00;
        case "BB":
            return 3.00;
        case "CC":
            return 2.00;
        case "DD":
            return 1.00;
        case "FF":
            return 0.00;
    }
}



//----------------------------------------------------------------------
//Buttons.

//Adding Lecture Button
function addLecture(event) {
    event.preventDefault();
    // reaching the lecture id and name from the input fields
    let id = document.getElementById("lectureCode").value;
    let name = document.getElementById("lectureName").value;
    let pointScale = document.getElementById("pointScale").value;
    // if lecture is empty display message.
    if (id == "" || name == "" || pointScale == "") {
        alert("Please fill in all fields!");
        return;
    }
    //if lecture already exists, display message.
    for (let i = 0; i < lectures.length; i++) {
        if (lectures[i].id == id) {
            alert("Lecture already exists!");
            return;
        }
    }

    // if there is no problem we are creating a new lecture object



    let lecture = createLecture(id, name, pointScale);
    // adding this lecture to the lectures array
    lectures.push(lecture);
    // create a table of lectures
    createLecturesTable();
}

//same processes for update lecture button and delete lecture button.

// Adding update lecture
function updateLecture(event) {
    event.preventDefault();
    let id = document.getElementById("lectureCode").value;
    let name = document.getElementById("lectureName").value;
    let pointScale = document.getElementById("pointScale").value;
    if (id == "" || name == "") {
        alert("Please fill in all fields!");
        return;
    }
    let lecture = lectures.find(lecture => lecture.id == id);
    lecture.name = name;
    lecture.pointScale = pointScale;
    createLecturesTable();
}


// Adding delete lecture button
function deleteLecture(id) {
    let lecture = lectures.find(lecture => lecture.id == id);
    // remove from the array
    lectures.splice(lectures.indexOf(lecture), 1);
    createLecturesTable();
    for (let i = 0; i < studentLectures.length; i++) {
        if (studentLectures[i].lecture.id == id) {
            studentLectures.splice(i, 1);
        }
    }
}
 //---------------------------------------------------------------------

// Student Part.

// function(constructor) to create a new student object.
function createStudent(id, name, surname) {
    return {
        id: id,
        name: name,
        surname: surname,
        lectures: []
    };
}

// function to create a table of students
function createStudentsTable(lecture) {
    document.querySelector(".resultHeader").innerHTML = "Students";

    // create table elements
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Lecture Count</th>
            <th>GPA</th>
            <th>Lectures</th>
            <th>Delete</th>
        </tr>
    `;
    // creation of table rows
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        document.querySelector("#resultTable").innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${student.lectures.length}</td>
                <td>${getGPA(student)}</td>
                <td><button class="btn" onclick="showStudentLectures('${student.id}')">Lectures</button></td>
                <td><button class="btn" onclick="deleteStudent('${student.id}')">Delete</button></td>
            </tr>
        `;
    }
}

// function to reach GPA of student.
function getGPA(student) {
    let totalScore = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == student.id) {
            totalScore += getLetterGradeScore(studentLecture.letterGrade);
        }
    }
    return (totalScore / student.lectures.length).toFixed(2);
}


//Adding Student Button
function addStudent(event) {
    event.preventDefault();
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let surname = document.getElementById("studentSurname").value;
    
    if (id == "" || name == "" || surname == "") {
        alert("Please fill all the fields!");
        return;
    }

    //not allowing user to input negative id
    if (id < 0) {
        alert("Please enter a positive number!");
        return;
    }

    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.id == id) {
            alert("Student already exists!");
            return;
        }
    }
    // if there is no problem we will create our student.
    let student = createStudent(id, name, surname);
    students.push(student);
    // create a table of students
    createStudentsTable();
}

//updating student informations.
function updateStudent(event) {
    event.preventDefault();
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let surname = document.getElementById("studentSurname").value;
    if (id == "" || name == "" || surname == "") {
        alert("Please fill all the fields!");
        return;
    }

    if (id < 0) {
        alert("Please enter a positive number!");
        return;
    }

    // find the student object with the given id
    let student = students.find(student => student.id == id);
    student.name = name;
    student.surname = surname;
    createStudentsTable();
}

// Deleting Student Button
function deleteStudent(id) {
    // find the student object with the given id
    let student = students.find(student => student.id == id);
    students.splice(students.indexOf(student), 1);
    createStudentsTable();
    for (let i = 0; i < studentLectures.length; i++) {  
        if (studentLectures[i].student.id == id) {
            studentLectures.splice(i, 1);
        }
    }
}

// Adding students to the lecture.
// function(constructor) to create lecture of student object.
function createStudentLecture(student, lecture, midtermScore, finalScore, pointScale) {
    return {
        student: student,
        lecture: lecture,
        midtermScore: midtermScore,
        finalScore: finalScore,
        letterGrade: evaluateGrade(midtermScore, finalScore, pointScale)
    };
}

// function to evaluate the letter grade of a student for a lecture
function evaluateGrade(midtermScore, finalScore, pointScale) {
    // to calculate score elements should be integers
    midtermScore = parseInt(midtermScore);
    finalScore = parseInt(finalScore);
    let totalScore = (midtermScore + finalScore) /2;
    console.log(totalScore);
    console.log(100-pointScale);
    console.log(100-2*pointScale);
    console.log(100-3*pointScale);
    console.log(100-4*pointScale);


    //calculating letter grade

    if (totalScore >= 100-pointScale) {
        return "AA";
    } else if (totalScore >= 100-2*pointScale) {
        return "BB";
    } else if (totalScore >= 100-3*pointScale) {
        return "CC";
    } else if (totalScore >= 100-4*pointScale) {
        return "DD";
    } else {
        return "FF";
    }
}

// adding student to a lecture
function addStudentToLecture(student, lecture, midtermScore, finalScore) {
    lecture.students.push(student);
    student.lectures.push(lecture);
    // create a new object that holds both the student and lecture objects
    let studentLecture = createStudentLecture(student, lecture, midtermScore, finalScore, lecture.pointScale);
    studentLectures.push(studentLecture);
}

// adding student to lecture button
function addSTLButton(event) {
    event.preventDefault();
    let studentId = document.getElementById("add-studentId").value;
    let lectureId = document.getElementById("add-lectureCode").value;
    let midtermScore = document.getElementById("midtermScore").value;
    let finalScore = document.getElementById("finalScore").value;

    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId) {
            alert("Student already added!");
            return;
        }
    }
    let checkstudent = students.find(student => student.id == studentId);
    let checklecture = lectures.find(lecture => lecture.id == lectureId);
    

    // controls to unwanted situations.
    if (checkstudent == undefined || checklecture == undefined) {
        alert("Student or lecture not exist!");
        return;
    }

    if (studentId == "" || lectureId == "" || midtermScore == "" || finalScore == "") {
        alert("Please fill all the fields!");
        return;
    }

    if (studentId < 0 || lectureId < 0) {
        alert("Please enter a positive number!");
        return;
    }

    if (midtermScore < 0 || midtermScore > 100 || finalScore < 0 || finalScore > 100) {
        alert("Midterm score and final score must be between 0 and 100!");
        return;
    }

    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }

    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;
    }
    addStudentToLecture(student, lecture, midtermScore, finalScore, lecture.pointScale);
    createStudentsTable();
}

// updating student to lecture Button
function updateSTLButton(event) {
    event.preventDefault();
    let studentId = document.getElementById("add-studentId").value;
    let lectureId = document.getElementById("add-lectureCode").value;
    let midtermScore = document.getElementById("midtermScore").value;
    let finalScore = document.getElementById("finalScore").value;

    // controls to unwanted situations.
    if (studentId == "" || lectureId == "" || midtermScore == "" || finalScore == "") {
        alert("Please fill all the fields!");
        return;
    }
    let checkstudent = students.find(student => student.id == studentId);
    let checklecture = lectures.find(lecture => lecture.id == lectureId);
    
    if (checkstudent == undefined || checklecture == undefined) {
        alert("Student or lecture not exist!");
        return;
    }

    if (studentId < 0 || lectureId < 0) {
        alert("Please enter a positive number!");
        return;
    }

    if (midtermScore < 0 || midtermScore > 100 || finalScore < 0 || finalScore > 100) {
        alert("Midterm score and final score must be between 0 and 100!");
        return;
    }

    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }

    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;

    }

    let studentLecture = studentLectures.find(studentLecture => studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId);
    if (studentLecture == undefined) {
        alert("Student not in lecture!");
        return;
    }

    studentLecture.midtermScore = midtermScore;
    studentLecture.finalScore = finalScore;
    studentLecture.letterGrade = evaluateGrade(midtermScore, finalScore, lecture.pointScale);
    console.log(studentLecture);   
    console.log(lecture.pointScale);
    createStudentsTable();
}


// searching students with name  button
function searchStudentsByName(event) {
    event.preventDefault();
    let name = document.getElementById("search-studentName").value;
    if (name == "") {
        alert("Please fill the field!");
        return;
    }
    // creating table elements
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Lectures</th>
            <th>GPA</th>
        </tr>
    `;
    // creating table rows
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.name.toLowerCase().includes(name.toLowerCase())) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.surname}</td>
                    <td><button class="btn btn-primary" onclick="showStudentLectures(${student.id})">Show Lectures</button></td>
                    <td>${getGPA(student)}</td>
                </tr>
            `;
        }
    }
}

// searching lectures with name  button
function searchLecturesByName(event) {
    event.preventDefault();
    let name = document.getElementById("search-lectureName").value;
    if (name == "") {
        alert("Please fill the field!");
        return;
    }
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Lectures Search: " + name;

    // creating table elements
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number of Students</th>
            <th>Students Passed</th>
            <th>Students Failed</th>
            <th>GPA</th>
            <th>Students</th>
            <th>Delete</th>
        </tr>
    `;
    // creating table rows
    for (let i = 0; i < lectures.length; i++) {
        if (lectures[i].name.toLowerCase().includes(name.toLowerCase())) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${lectures[i].id}</td>
                    <td>${lectures[i].name}</td>
                    <td>${lectures[i].students.length}</td>
                    <td>${getPassedStudents(lectures[i])}</td>
                    <td>${getFailedStudents(lectures[i])}</td>
                    <td>${getAverageScore(lectures[i])}</td>
                    <td><button class="btn btn-primary" onclick="showLectureStudents(${lectures[i].id})">Students</button></td>
                    <td><button class="btn btn-danger" onclick="deleteLecture(${lectures[i].id})">Delete</button></td>
                </tr>
            `;
        }
    }
}

//show the lectures of a student
function showStudentLectures(studentId) {
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Lectures of the student:" + studentId;
    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>Lecture Code</th>
            <th>Lecture Name</th>
            <th>Passed / Failed</th>
            <th>Midterm Score</th>
            <th>Final Score</th>
            <th>Letter Grade</th>
            <th>Delete Grade</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == studentId) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${studentLecture.lecture.id}</td>
                    <td>${studentLecture.lecture.name}</td>
                    <td>${checkPassed(studentLecture)}</td>
                    <td>${studentLecture.midtermScore}</td>
                    <td>${studentLecture.finalScore}</td>
                    <td>${studentLecture.letterGrade}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudentLecture('${studentLecture.student.id}', '${studentLecture.lecture.id}')">Delete</button></td>
                </tr>
            `;
        }
    }
}

// show the students of a lecture
function showStudentsOfLecture(lectureId) {
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Students of the Lecture:" + lectureId;
    // creating table elements
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Surname</th>
            <th>Passed / Failed</th>
            <th>Midterm Score</th>
            <th>Final Score</th>
            <th>Letter Grade</th>
            <th>Delete Grade</th>
        </tr>
    `;
    // creating table rows
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lectureId) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${studentLecture.student.id}</td>
                    <td>${studentLecture.student.name}</td>
                    <td>${studentLecture.student.surname}</td>
                    <td>${checkPassed(studentLecture)}</td>
                    <td>${studentLecture.midtermScore}</td>
                    <td>${studentLecture.finalScore}</td>
                    <td>${studentLecture.letterGrade}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudentLecture('${studentLecture.student.id}', '${studentLecture.lecture.id}')">Delete</button></td>
                </tr>
            `;
        }
    }
}

//deletes student's lecture.
function deleteStudentLecture(studentId, lectureId) {
    // controls unwanted scenarios.
    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }
    
    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;
    }

    let studentLecture = studentLectures.find(studentLecture => studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId);
    if (studentLecture == undefined) {
        alert("Student not exist in this lecture!");
        return;
    }

    studentLectures.splice(studentLectures.indexOf(studentLecture), 1);
    student.lectures.splice(student.lectures.indexOf(lecture), 1);
    lecture.students.splice(lecture.students.indexOf(student), 1);
    createStudentsTable();
}

// checks student is succesfull.
function checkPassed (studentLecture) {
    if (studentLecture.letterGrade == "F") {
        return "Failed";
    } else {
        return "Passed";
    }
}