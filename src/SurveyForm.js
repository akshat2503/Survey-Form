import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography } from '@mui/material';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import useForm from './useForm';
import useValidation from './useValidation';
import axios from 'axios';

const SurveyForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: ''
  };

  const { formData, handleChange, resetForm } = useForm(initialValues);
  const { errors, validate } = useValidation();
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${topic.length}`);
      setAdditionalQuestions(response.data);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      setSubmittedData(formData);
      resetForm();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>Survey Form</Typography>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Survey Topic</InputLabel>
          <Select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
          </Select>
        </FormControl>

        {formData.surveyTopic === 'Technology' && (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Favorite Programming Language</InputLabel>
              <Select
                name="favoriteProgrammingLanguage"
                value={formData.favoriteProgrammingLanguage}
                onChange={handleChange}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C#">C#</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              error={!!errors.yearsOfExperience}
              helperText={errors.yearsOfExperience}
              margin="normal"
            />
          </Box>
        )}

        {formData.surveyTopic === 'Health' && (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Exercise Frequency</InputLabel>
              <Select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Rarely">Rarely</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Diet Preference</InputLabel>
              <Select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
              >
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}

        {formData.surveyTopic === 'Education' && (
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel>Highest Qualification</InputLabel>
              <Select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
              >
                <MenuItem value="High School">High School</MenuItem>
                <MenuItem value="Bachelor's">Bachelor's</MenuItem>
                <MenuItem value="Master's">Master's</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Field of Study"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              error={!!errors.fieldOfStudy}
              helperText={errors.fieldOfStudy}
              margin="normal"
            />
          </Box>
        )}

        <TextField
          fullWidth
          label="Feedback"
          name="feedback"
          multiline
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          error={!!errors.feedback}
          helperText={errors.feedback}
          margin="normal"
        />

        {additionalQuestions.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6">Additional Questions</Typography>
            {additionalQuestions.map((question, index) => (
              <Box key={index} mb={2}>
                <TextField
                  fullWidth
                  label={`Question ${index + 1}`}
                  value={question.title}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  fullWidth
                  label={`Answer ${index + 1}`}
                  name={`additionalQuestion-${index}`}
                  value={formData[`additionalQuestion-${index}`] || ''}
                  onChange={handleChange}
                  margin="normal"
                />
              </Box>
            ))}
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6">Submitted Data:</Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default SurveyForm;
