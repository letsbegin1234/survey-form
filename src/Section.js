import React from 'react';

const Section = ({ sectionName, visible, values, handleChange, errors }) => {
    if (!visible) return null;

    return (
        <div>
            <h3>{sectionName} Section</h3>
            {sectionName === 'Technology' && (
                <div>
                    <label>Favorite Programming Language:</label>
                    <select
                        name="technology.favoriteLanguage"
                        value={values.favoriteLanguage}
                        onChange={handleChange}
                    >
                        <option value="">Select Language</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C#">C#</option>
                    </select>
                    {errors.favoriteLanguage && <p className="error">{errors.favoriteLanguage}</p>}
                    <label>Years of Experience:</label>
                    <input
                        type="number"
                        name="technology.yearsOfExperience"
                        value={values.yearsOfExperience}
                        onChange={handleChange}
                    />
                    {errors.yearsOfExperience && <p className="error">{errors.yearsOfExperience}</p>}
                </div>
            )}
            {sectionName === 'Health' && (
                <div>
                    <label>Exercise Frequency:</label>
                    <select
                        name="health.exerciseFrequency"
                        value={values.exerciseFrequency}
                        onChange={handleChange}
                    >
                        <option value="">Select Frequency</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Rarely">Rarely</option>
                    </select>
                    {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
                    <label>Diet Preference:</label>
                    <select
                        name="health.dietPreference"
                        value={values.dietPreference}
                        onChange={handleChange}
                    >
                        <option value="">Select Preference</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                    {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
                </div>
            )}
            {sectionName === 'Education' && (
                <div>
                    <label>Highest Qualification:</label>
                    <select
                        name="education.highestQualification"
                        value={values.highestQualification}
                        onChange={handleChange}
                    >
                        <option value="">Select Qualification</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                    </select>
                    {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
                    <label>Field of Study:</label>
                    <input
                        type="text"
                        name="education.fieldOfStudy"
                        value={values.fieldOfStudy}
                        onChange={handleChange}
                    />
                    {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
                </div>
            )}
        </div>
    );
};

export default Section;
