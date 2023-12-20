//Before writing a code consider reading the documentation and code carefullt

const User = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");

exports.createProfile = async (req, res) => {
    try {
        // TODO: Extract the user ID from the request parameters
        // TODO: Check if a profile already exists for the user, send a 400 response if exists
        // TODO: Create a new user profile and send a success response

        const userId = req.params.userId;

        const isUserExist = await UserProfile.find({
            user: userId,
        });
        if (isUserExist) {
            return res.status(400).json({
                message: "user already exist!!!!",
            });
        }

        const userProfile = await UserProfile.create({ user: userId });

        return res.status(201).json({
            message: "User profile created successfully",
            userProfile,
        });

        // try {
        //     const isUser = await User.find({ _id: userId });
        //     if (isUser) {
        //         const isUserExist = await UserProfile.find({
        //             _id: userId });

        //         console.log(isUserExist);
        //         const userProfile = UserProfile.create({ user: userId });
        //         return res.status(201).json({
        //             message: "User profile created successfully",
        //             userProfile,
        //         });
        //     } else {
        //         res.status(400).json({ message: "User id is incorrect" });
        //     }
        //     // if (isUserExist) {
        //     //     res.status(400).json({ message: "Profile already exists" });
        //     // }
        // } catch (error) {
        //     res.status(400).json({ message: "Profile already exists", error });
        // }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.createList = async (req, res) => {
    try {
        // TODO: Extract the user ID from the request parameters and list name from the request body
        // TODO: Find the user profile, send a 404 response if not found
        // TODO: Create a new list, add it to the user profile, and send a success response
        const userId = req.params.userId;
        const { listName } = req.body;

        const userProfile = await UserProfile.user.find({ user: userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }

        const newList = {
            name: listName,
            items: [],
        };

        await UserProfile.lists.push(newList);

        await UserProfile.save();

        res.status(201).json({
            message: "List created successfully",
            list: newList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addItemToList = async (req, res) => {
    try {
        // TODO: Extract the user ID and list ID from the request parameters, item name from the request body
        // TODO: Find the user profile, send a 404 response if not found
        // TODO: Find the target list, send a 404 response if not found
        // TODO: Add the item to the list, save the user profile, and send a success response

        const { userId, listId } = req.params;
        const { itemName } = req.body;

        const user = await UserProfile.find({ user: userId });
        if (!user) {
            return res.status(404).json({ message: "User profile not found" });
        }

        const targetList = await UserProfile.lists.id(listId);
        if (!targetList) {
            return res.status(404).json({ message: "List not found" });
        }

        targetList.items.push(itemName);

        await UserProfile.save();

        res.json({
            message: "Item added to the list successfully",
            list: targetList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
