const express = require('express');
const router = express.Router();
const MenuIteam = require('../modules/MenuIteam');



// POST route to add a MenuIteam 
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using  the Mongoose model
        const newMenuIteam = new MenuIteam(data);

        // Save the new person to the databse
        const savedMenuIteam = await newMenuIteam.save();
        console.log('data saved');
        res.status(200).json(savedMenuIteam);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

// whole menu data view by db 
router.get('/', async (req, res) => {
    try {
        const data = await MenuIteam.find();
        console.log('data fetched');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server' });

    }
})



// specific data view by MenuIteam in db

router.get('/:spcefic', async (req, res) => {
    try {
        const spcefic = req.params.spcefic // Extract the work type from the url parameter
        if (spcefic == 'water' || spcefic == 'sugar' || spcefic == 'chef') {
            const response = await MenuIteam.find({ ingredients: spcefic });
            console.log('response fetched');
            res.status(200).json(response);

        }
        else {
            res.status(404).json({ error: 'Invalid spcefic type' })
        }
    }

    catch (error) {
        console.log(error);
        res.status(5000).json({ error: 'Invalid server Error' })
    }
})



// here Menu data update 
router.put('/:id', async (req, res)=>{
    try {
        const menuId = req.params.id; // Extract the id from the URL parameter
        const updatemenuId = req.body; // Update data for the perosn

        const response = await MenuIteam.findByIdAndUpdate(menuId, updatemenuId,{
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

    if (!response){
        return res.status(404).json({error: 'Page not found'});
    }

        console.log('Data Updated');
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'})
        
    }
})


// here Delete the Menu data
router.delete('/:id', async (req, res)=>{
    try {
        const menuId = req.params.id; // Extract the id from the URL parameter

        // Assuming you have a Person model
        const response = await MenuIteam.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person Deleted Success'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'})
    }
})



module.exports = router;