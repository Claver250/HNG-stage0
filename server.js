const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3189;

app.use(express.json());
app.use(cors());

app.get('/api/classify', async (req, res) => {
    try {
        const {name} = req.query;

        if (!name) {
            return res.status(400).json({
                status: 'error',
                message: 'No name provided',
            });
        }

        if (typeof name !== 'string') {
            return res.status(422).json({
                status: 'error',
                message: 'Name must be valid string'
            });
        }

        if (name.trim() === '') {
            return res.status(400).json({
                status: 'error',
                message: 'No prediction available for empty name',
            });
        }

        const response = await axios.get(`https://api.genderize.io?name=${name}`);
        const{gender, probability, count} = response.data;

        if (!gender || count === 0) {
            return res.json({
                status: 'error',
                message: 'No prediction available for the provided name'
            });
        }

        const is_confident = probability >= 70 && count >= 100;
        const processed_at = new Date().toISOString();

        return res.status(200).json({
            status: 'success',
            data: {
                name: name,
                gender: gender,
                probability: probability,
                sample_size: count,
                is_confident: is_confident,
                processed_at: processed_at
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'An unexpected error occurred.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
