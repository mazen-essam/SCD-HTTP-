const http = require("http");
// Student array
const students = [
   {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      departmentId: 1,
   },
   {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      password: "password456",
      departmentId: 2,
   },
   // Add more students here as needed
];

// Course array
const courses = [
   {
      id: 1,
      name: "Introduction to Computer Science",
      content: "This course covers the basics of computer science.",
      departmentId: 1,
   },
   {
      id: 2,
      name: "Advanced Mathematics",
      content: "This course covers advanced topics in mathematics.",
      departmentId: 2,
   },
   // Add more courses here as needed
];

// Department array
const departments = [
   {
      id: 1,
      name: "Computer Science",
   },
   {
      id: 2,
      name: "Mathematics",
   },
   // Add more departments here as needed
];
const fs = require("fs");
const { isExternal } = require("util/types");
// fs.writeFileSync('./courses.json',JSON.stringify(courses))
http
   .createServer((req, res) => {
      if (req.url === "/" && req.method === "GET") {
         let data = JSON.parse(fs.readFileSync("./students.json"));
         res.write(JSON.stringify(data));
         res.end();
      }
      //  ADD STUDENT
      else if (req.url === "/student/add" && req.method === "POST") {
         let data = "";
         console.log("hello");
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
            console.log(data);
         });
         req.on("end", () => {
            let studData = JSON.parse(fs.readFileSync("./students.json"));
            isEmail = studData.find((email) => {
               return email.email === data.email;
            });
            if (isEmail) {
               res.write("email alredy exists");
               return res.end();
            }
            studData.push(data);
            fs.writeFileSync("./students.json", JSON.stringify(studData));
            console.log("student added succesfuly");
            res.write(JSON.stringify(studData));
            res.end();
         });
      }
      //  GET ALL STUDENTS
      else if (req.url === "/student/get" && req.method === "GET") {
         console.log("student data");
         res.write(
            JSON.stringify(JSON.parse(fs.readFileSync("./students.json")))
         );
         res.end();
      }
      //  GET STUDENT BY ID
      else if (req.url === "/student/id/get" && req.method === "GET") {
         let data = JSON.parse(fs.readFileSync("./students.json"));
         let ID = 3;
         for (let i = 0; i < data.length; i++) {
            if (data[i].id === ID) {
               res.write(JSON.stringify(data[i]));
               console.log("Found");
               console.log(data[i]);
               return res.end();
            }
         }
         console.log("Not found");
         res.end();
      }
      //  DEl STUDENT
      else if (req.url === "/student/id/del" && req.method === "DELETE") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let studData = JSON.parse(fs.readFileSync("./students.json"));
            let index = studData.findIndex((student) => {
               return student.id === data.id;
            });
            if (index !== -1) {
               studData.splice(index, 1);
               fs.writeFileSync("./students.json", JSON.stringify(studData));
               res.write("student deleted succesfuly");
            } else {
               res.write("student not found");
            }
            res.end();
         });
      }
      //  UPDATE STUDENT
      else if (req.url === "/student/update" && req.method === "PUT") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let studData = JSON.parse(fs.readFileSync("./students.json"));
            let index = studData.findIndex((student) => {
               return student.id === data.id;
            });
            if (index !== -1) {
               studData[index].name = data.name;
               studData[index].email = data.email;
               studData[index].password = data.password;
               studData[index].departmentId = data.departmentId;
               fs.writeFileSync("./students.json", JSON.stringify(studData));
               res.write("student updated successfully");
            } else {
               res.write("student not found");
            }
            res.end();
         });
      }
      //  GET STUDENT WITH DEPARTMENT AND COURSE
      else if (req.url === "/student/id/get/all" && req.method === "GET") {
         let studData = JSON.parse(fs.readFileSync("./students.json"));
         let departmentsData = JSON.parse(fs.readFileSync("./department.json"));
         let coursesData = JSON.parse(fs.readFileSync("./courses.json"));
         let newStudent = studData.map((item) => {
            let depID = departmentsData.find((index) => {
               return index.id === item.id;
            });
            let courID = coursesData.filter((index) => {
               return index.id === item.departmentId
            });
            return {
               ...item,
               depID,
               courID,
            };
         });
         res.write(JSON.stringify(newStudent));
         res.end();
      }
      //  ADD COURSE
      else if (req.url === "/course/add" && req.method === "POST") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let parseData = JSON.parse(fs.readFileSync("./courses.json"));
            parseData.push(data);
            fs.writeFileSync("./courses.json", JSON.stringify(parseData));
            res.write("course added succesfully");
            res.end();
         });
      }
      //  GET ALL COURSES
      else if (req.url === "/course/get" && req.method === "GET") {
         res.write(
            JSON.stringify(JSON.parse(fs.readFileSync("./courses.json")))
         );
         res.end();
      }
      //  DEl COURSE
      else if (req.url === "/course/id/del" && req.method === "DELETE") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let studData = JSON.parse(fs.readFileSync("./courses.json"));
            let index = studData.findIndex((student) => {
               return student.id === data.id;
            });
            if (index !== -1) {
               studData.splice(index, 1);
               fs.writeFileSync("./courses.json", JSON.stringify(studData));
               res.write("course deleted succesfuly");
            } else {
               res.write("course not found");
            }
            res.end();
         });
      }
      //  GET COURSE BY ID
      else if (req.url === "/course/id/get" && req.method === "GET") {
         let data = JSON.parse(fs.readFileSync("./courses.json"));
         let ID = 1;
         for (let i = 0; i < data.length; i++) {
            if (data[i].id === ID) {
               res.write(JSON.stringify(data[i]));
               console.log(data[i]);
               return res.end();
            }
         }
         console.log("Not found ");
         res.end();
      }
      // UPDATE COURSE
      else if (req.url === "/course/update" && req.method === "PUT") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let courseData = JSON.parse(fs.readFileSync("./courses.json"));
            let index = courseData.findIndex((course) => {
               return course.id === data.id;
            });
            if (index !== -1) {
               courseData[index].name = data.name;
               courseData[index].departmentId = data.departmentId;
               fs.writeFileSync("./courses.json", JSON.stringify(courseData));
               res.write("course updated successfully");
            } else {
               res.write("course not found");
            }
            res.end();
         });
      }
      //  ADD DEPARTMENT
      else if (req.url === "/department/add" && req.method === "POST") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let parseData = JSON.parse(fs.readFileSync("./department.json"));
            parseData.push(data);
            fs.writeFileSync("./department.json", JSON.stringify(parseData));
            res.write("department added succesfully");
            res.end();
         });
      }
      //  GET ALL DEPARTMENTS
      else if (req.url === "/department/get" && req.method === "GET") {
         res.write(
            JSON.stringify(JSON.parse(fs.readFileSync("./department.json")))
         );
         res.end();
      }
      //  DEl DEPARTMENT
      else if (req.url === "/department/id/del" && req.method === "DELETE") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            let studData = JSON.parse(fs.readFileSync("./department.json"));
            let index = studData.findIndex((student) => {
               return student.id === data.id;
            });
            if (index !== -1) {
               studData.splice(index, 1);
               fs.writeFileSync("./Department.json", JSON.stringify(studData));
               res.write("Department deleted succesfuly");
            } else {
               res.write("Department not found");
            }
            res.end();
         });
      }
      //  GET DEPARTMENT BY ID
      else if (req.url === "/department/id/get" && req.method === "GET") {
         let data = JSON.parse(fs.readFileSync("./department.json"));
         let ID = 3;
         for (let i = 0; i < data.length; i++) {
            if (data[i].id === ID) {
               res.write(JSON.stringify(data[i]));
               console.log(data[i]);
               return res.end();
            }
         }
         console.log("Not found ");
         res.end();
      }
      //  UPDATE DEPARTMENT
      else if (req.url === "/department/update" && req.method === "PUT") {
         let data = "";
         req.on("data", (chunk) => {
            data = JSON.parse(chunk);
         });
         req.on("end", () => {
            depData = JSON.parse(fs.readFileSync("./department.json"));
            isExist = depData.findIndex((index) => {
               return index.id === data.id;
            });
            if (isExist !== -1) {
               depData[isExist].id = data.id;
               depData[isExist].name = data.name;
               fs.writeFileSync("./department.json", JSON.stringify(depData));
               res.write("department updated successfully");
            } else {
               res.write("couldnot find this department");
            }
            res.end();
         });
      } else {
         console.log("Not found");
      }
   })
   .listen(5000, () => {
      console.log("server running on localhost:5200");
   });
