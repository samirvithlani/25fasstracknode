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
  const users = await userModel.find().populate("roleId")
  res.json({
    message: "users fetched",
    data: users,
  });
};

const getUserById = async (req, res) => {
  //params.id
  const id = req.params.id;

  //find function array
  //1 collection object id unique --
  //single object
  //userMode.find({_id:id})
  const foundUser = await userModel.findById(id);
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found with criteria",
      data: null,
    });
  }
  // res.json({
  //   message:"user found",
  //   data:foundUser
  // })
};

const addUser = async (req, res) => {
  console.log(req.body);
  //users collection -userModel
  //userModel.insert(req.body)
  try {
    const savedUser = await userModel.create(req.body);
    res.status(201).json({
      message: "user saved successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error saving user...",
      err: err,
    });
  }
};

//delete from user where id =?
//db.users.remove({condition...})
//delete user...

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    //const deletedUser = await userModel.remove({_id:id})
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted successfully..",
        data: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to delete",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while deleting user..",
      err: err,
    });
  }
};

//update user....
//update tablename set name=?...... where id=?
//db.users.update({_id:id},{$set:{name:"req.body.name"}})

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //{new:true} -->will return updatedObject..
    //{new:false}==>will return old object(not updated..)
    if (updatedUser) {
      res.status(201).json({
        message: "user updated successfully..",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while updating user..",
      err: err,
    });
  }
};

//while adding hobby check first if hobby is already there send error message that hobby is added already...
const addHobby = async(req,res)=>{

  const id = req.params.id //where...
  const hobby = req.body.hobby; //what
  console.log(hobby)

  try{

    const updatedUser = await userModel.findByIdAndUpdate(id,{$push:{hobbies:hobby}},{new:true})
    if(updatedUser){
      res.status(200).json({
        message:"hobby added...",
        data:updatedUser
      })
    }
    else{
      res.status(404).json({
        message:"error while adding hobby.."
      })
    }

  }catch(err){
    console.log(err)
    res.status(500).json({
      message:"hobbies can not added"
    })
  }
}

//remove hobby $pull
//if hobby exisy then only remove or else send message that hobby is not listed..

module.exports = {
  getUser,
  getAllUsers,
  findUser,
  searchUser,
  getUsersFromDb,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  addHobby
};
