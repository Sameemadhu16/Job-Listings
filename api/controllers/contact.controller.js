export const addContact = async (req, res, next) => {
   try {
    const {name , email, message}= req.body;

    const newContact = new Contact({
        name,
        email,
        message
    });
    await newContact.save();
    res.status(200).json(newContact);


   } catch (error) {
    next(error);
   }
}

