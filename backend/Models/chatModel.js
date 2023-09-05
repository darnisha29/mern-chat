// chatname
// isgroupchat
// users
// latestmessage
// groupadmin

const mongoose = require("mongoose")

const chatModel = mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{ty0pe:Boolean, default:false},
        users: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Messge",
    },
    groupAdmin: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    },
    {
        timestamps:true,
    }

);

const Chat = mongoose.model("chat",chatModel) ;

module.exports = Chat;

