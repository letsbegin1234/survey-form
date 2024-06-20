import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import useValidation from '../hooks/useValidation';
import { fetchAdditionalQuestions } from '../utils/api'; // Ensure the correct path to your api file

const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
        errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.surveyTopic) {
        errors.surveyTopic = 'Survey Topic is required';
    }

    if (values.surveyTopic === 'Technology') {
        if (!values.favoriteLanguage) {
            errors.favoriteLanguage = 'Favorite Programming Language is required';
        }
        if (!values.yearsOfExperience) {
            errors.yearsOfExperience = 'Years of Experience is required';
        } else if (values.yearsOfExperience <= 0) {
            errors.yearsOfExperience = 'Years of Experience must be greater than 0';
        }
    }

    if (values.surveyTopic === 'Health') {
        if (!values.exerciseFrequency) {
            errors.exerciseFrequency = 'Exercise Frequency is required';
        }
        if (!values.dietPreference) {
            errors.dietPreference = 'Diet Preference is required';
        }
    }

    if (values.surveyTopic === 'Education') {
        if (!values.highestQualification) {
            errors.highestQualification = 'Highest Qualification is required';
        }
        if (!values.fieldOfStudy) {
            errors.fieldOfStudy = 'Field of Study is required';
        }
    }

    if (!values.feedback) {
        errors.feedback = 'Feedback is required';
    } else if (values.feedback.length < 50) {
        errors.feedback = 'Feedback must be at least 50 characters';
    }

    return errors;
};

const SurveyForm = () => {
    const initialValues = {
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    };

    const [values, handleChange] = useForm(initialValues);
    const [submitted, setSubmitted] = useState(false);
    const [errors, handleSubmit] = useValidation(values, validate, setSubmitted);
    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    useEffect(() => {
        if (submitted && values.surveyTopic) {
            const fetchQuestions = async () => {
                try {
                    const questions = await fetchAdditionalQuestions(values.surveyTopic);
                    console.log("hlo");
                    console.log(questions);
                    setAdditionalQuestions(questions || []);
                } catch (error) {
                    console.error('Error fetching additional questions:', error);
                    // Optionally handle error state or display a message to the user
                }
            };
            fetchQuestions();
        }
    }, [submitted, values.surveyTopic]);

    const displaySummary = (values) => (
        <div className="summary">
            <h3>Summary</h3>
            <p>Full Name: <span className="highlight">{values.fullName}</span></p>
            <p>Email: <span className="highlight">{values.email}</span></p>
            <p>Survey Topic: <span className="highlight">{values.surveyTopic}</span></p>
            {values.surveyTopic === 'Technology' && (
                <>
                    <p>Favorite Programming Language: <span className="highlight">{values.favoriteLanguage}</span></p>
                    <p>Years of Experience: <span className="highlight">{values.yearsOfExperience}</span></p>
                </>
            )}
            {values.surveyTopic === 'Health' && (
                <>
                    <p>Exercise Frequency: <span className="highlight">{values.exerciseFrequency}</span></p>
                    <p>Diet Preference: <span className="highlight">{values.dietPreference}</span></p>
                </>
            )}
            {values.surveyTopic === 'Education' && (
                <>
                    <p>Highest Qualification: <span className="highlight">{values.highestQualification}</span></p>
                    <p>Field of Study: <span className="highlight">{values.fieldOfStudy}</span></p>
                </>
            )}
            <p>Feedback: <span className="highlight">{values.feedback}</span></p>
            {additionalQuestions.length > 0 && (
                <div>
                    <h4>Additional Questions:</h4>
                    {additionalQuestions.map((question, index) => (
                        <div key={index}>
                            <p>Question {index + 1}: {question}</p>
                            {/* <p>Category: {question.category}</p>
                            <p>Difficulty: {question.difficulty}</p> */}
                            {/* Render other details as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h1>Survey Form</h1>
            {submitted ? (
                displaySummary(values)
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Survey Topic:</label>
                        <select
                            name="surveyTopic"
                            value={values.surveyTopic}
                            onChange={handleChange}
                        >
                            <option value="">Select a topic</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                        </select>
                        {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
                    </div>
                    {values.surveyTopic === 'Technology' && (
                        <>
                            <div>
                                <label>Favorite Programming Language:</label>
                                <select
                                    name="favoriteLanguage"
                                    value={values.favoriteLanguage}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a language</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="Python">Python</option>
                                    <option value="Java">Java</option>
                                    <option value="C#">C#</option>
                                </select>
                                {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
                            </div>
                            <div>
                                <label>Years of Experience:</label>
                                <input
                                    type="number"
                                    name="yearsOfExperience"
                                    value={values.yearsOfExperience}
                                    onChange={handleChange}
                                />
                                {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
                            </div>
                        </>
                    )}
                    {values.surveyTopic === 'Health' && (
                        <>
                            <div>
                                <label>Exercise Frequency:</label>
                                <select
                                    name="exerciseFrequency"
                                    value={values.exerciseFrequency}
                                    onChange={handleChange}
                                >
                                    <option value="">Select frequency</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Rarely">Rarely</option>
                                </select>
                                {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
                            </div>
                            <div>
                                <label>Diet Preference:</label>
                                <select
                                    name="dietPreference"
                                    value={values.dietPreference}
                                    onChange={handleChange}
                                >
                                    <option value="">Select preference</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                                </select>
                                {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
                            </div>
                        </>
                    )}
                    {values.surveyTopic === 'Education' && (
                        <>
                            <div>
                                <label>Highest Qualification:</label>
                                <select
                                    name="highestQualification"
                                    value={values.highestQualification}
                                    onChange={handleChange}
                                >
                                    <option value="">Select qualification</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's">Bachelor's</option>
                                    <option value="Master's">Master's</option>
                                    <option value="PhD">PhD</option>
                                </select>
                                {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
                            </div>
                            <div>
                                <label>Field of Study:</label>
                                <input
                                    type="text"
                                    name="fieldOfStudy"
                                    value={values.fieldOfStudy}
                                    onChange={handleChange}
                                />
                                {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
                            </div>
                        </>
                    )}
                    <div>
                        <label>Feedback:</label>
                        <textarea
                            name="feedback"
                            value={values.feedback}
                            onChange={handleChange}
                        />
                        {errors.feedback && <p className="error">{errors.feedback}</p>}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default SurveyForm;
