
import axios from 'axios';
export const fetchAdditionalQuestions = async (topic) => {
    try {
        const response = await fetch(`https://question-51fu.onrender.com/questions/${topic}`);
        if (!response.ok) {
            throw new Error('Topic not found');
        }
        console.log("Fk");
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error fetching questions:', error);

    }
};