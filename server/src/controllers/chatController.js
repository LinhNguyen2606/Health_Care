import db from '../models/index';

let newConversation = async (req, res) => {
    try {
        let createConversation = await db.Conversation.create({
            patientId: req.body.patientId,
            doctorId: req.body.doctorId,
        });
        await createConversation.save();

        let conversation = await db.Conversation.findAll({
            where: {
                patientId: createConversation.dataValues.patientId,
            },
        });
        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

//tim chat theo 1 id user
let patientChat = async (req, res) => {
    try {
        let conversation = await db.Conversation.findAll({
            where: {
                patientId: req.params.patientId,
            },
        });
        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let doctorChat = async (req, res) => {
    try {
        let conversation = await db.Conversation.findAll({
            where: {
                doctorId: req.params.doctorId,
            },
        });
        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

//tim chat theo 2 id cua user
let usersChats = async (req, res) => {
    try {
        let conversation = await db.Conversation.findOne({
            where: { patientId: req.params.patientId, doctorId: req.params.doctorId },
        });
        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let newMessage = async (req, res) => {
    try {
        let newMessage = await db.Message.create(req.body);

        let savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

let messageChat = async (req, res) => {
    try {
        let messages = await db.Message.findAll({
            where: {
                conversationId: req.params.conversationId,
            },
        });
        return res.status(200).json(messages);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        });
    }
};

module.exports = {
    newConversation,
    patientChat,
    doctorChat,
    usersChats,
    newMessage,
    messageChat,
};
