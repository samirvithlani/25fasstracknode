//database -->users collection[rep] ->userModel
const userModel = require("../model/UserModel");

const userObject = {
  id: 1,
  name: "ram",
  age: 23,
};

var users = [
  {
    id: 1,
    name: "ram",
    age: 23,
  },
  {
    id: 2,
    name: "shyam",
    age: 23,
  },

  {
    id: 3,
    name: "jay",
    age: 23,
  },
  {
    id: 4,
    name: "raj",
    age: 23,
  },
  {
    id: 5,
    name: "shyam",
    age: 23,
  },

  {
    id: 6,
    name: "jay",
    age: 23,
  },
  {
    id: 7,
    name: "raj",
    age: 23,
  },
];

const getUser = (req, res) => {
  //res.send("user api called....")
  //res.json(userObject)
  res.json({ message: "user fetched", data: userObject });
};

const getAllUsers = (req, res) => {
  res.json({
    message: "all users fetched successfully!!!",
    data: users,
  });
};

const findUser = (req, res) => {
  //console.log(req.params.id)
  const id = req.params.id;
  const foundUser = users.find((user) => user.id == id);
  //console.log(foundUser)
  // res.json({
  //     message:"user found..",
  //     data:foundUser
  // })
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found..",
    });
  }
};
const searchUser = (req, res) => {
  const name = req.params.name;
  const foundUsers = users.filter((user) => user.name == name); //[]
  if (foundUsers.length > 0) {
    res.json({
      message: "user found with name",
      data: foundUsers,
    });
  } else {
    res.json({
      message: "user not found !!",
    });
  }
};

const getUsersFromDb = async (req, res) => {
  //db.users.find()
  //find -->Promise --> then,catch -> async await
  const users = await userModel.find();
  res.json({
    message: "users fetched",
    data: users,
  });
};

const getUserById=async(req,res)=>{

  //params.id
  const id = req.params.id

  //find function array
  //1 collection object id unique --
  //single object
  //userMode.find({_id:id})
  const foundUser = await userModel.findById(id)
  if(foundUser){
    res.json({
      message:"user found",
      data:foundUser
    })
  }
  else{
    res.json({
      message:"user not found with criteria",
      data:null
    })
  }
  // res.json({
  //   message:"user found",
  //   data:foundUser
  // })



}

const addUser = async(req,res)=>{

  console.log(req.body)
  //users collection -userModel
  //userModel.insert(req.body)
  const savedUser = await userModel.create(req.body)
  res.json({
    message:"user saved successfully",
    data:savedUser
  })
  

}

module.exports = {
  getUser,
  getAllUsers,
  findUser,
  searchUser,
  getUsersFromDb,
  getUserById,
  addUser
};
