import openai from './openaiClient';

/**
 * Parses resume content using OpenAI to extract structured information
 * @param {string} resumeText - The extracted text from the resume
 * @param {string} fileName - The name of the resume file
 * @returns {Promise<object>} Parsed resume data
 */
export async function parseResumeContent(resumeText, fileName) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert resume parser. Extract structured information from resume text and return it in the specified JSON format. Focus on accuracy and completeness.`
        },
        {
          role: 'user',
          content: `Please parse the following resume and extract all relevant information:\n\n${resumeText}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'resume_parse_response',
          schema: {
            type: 'object',
            properties: {
              personalInfo: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  location: { type: 'string' },
                  linkedinUrl: { type: 'string' },
                  portfolioUrl: { type: 'string' }
                },
                required: ['name']
              },
              summary: { type: 'string' },
              skills: {
                type: 'object',
                properties: {
                  technical: { type: 'array', items: { type: 'string' } },
                  soft: { type: 'array', items: { type: 'string' } },
                  languages: { type: 'array', items: { type: 'string' } }
                },
                required: ['technical', 'soft']
              },
              experience: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    company: { type: 'string' },
                    position: { type: 'string' },
                    startDate: { type: 'string' },
                    endDate: { type: 'string' },
                    description: { type: 'string' },
                    achievements: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['company', 'position', 'startDate']
                }
              },
              education: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    institution: { type: 'string' },
                    degree: { type: 'string' },
                    fieldOfStudy: { type: 'string' },
                    graduationDate: { type: 'string' },
                    gpa: { type: 'string' }
                  },
                  required: ['institution', 'degree']
                }
              },
              certifications: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    issuer: { type: 'string' },
                    date: { type: 'string' },
                    expiryDate: { type: 'string' }
                  },
                  required: ['name', 'issuer']
                }
              },
              projects: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    technologies: { type: 'array', items: { type: 'string' } },
                    url: { type: 'string' }
                  },
                  required: ['name', 'description']
                }
              },
              experienceLevel: { type: 'string' },
              totalYearsExperience: { type: 'number' }
            },
            required: ['personalInfo', 'skills', 'experience', 'education', 'experienceLevel', 'totalYearsExperience'],
            additionalProperties: false
          }
        }
      }
    });

    const parsedData = JSON.parse(response.choices[0].message.content);
    
    return {
      ...parsedData,
      fileName,
      parsedAt: new Date().toISOString(),
      id: Date.now() + Math.random()
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error(`Failed to parse resume: ${error.message}`);
  }
}

/**
 * Generates a professional summary for a candidate based on their resume data
 * @param {object} resumeData - The parsed resume data
 * @returns {Promise<string>} Generated summary
 */
export async function generateCandidateSummary(resumeData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR professional. Generate a concise, professional summary highlighting the candidate\'s key strengths, experience, and potential value to employers.'
        },
        {
          role: 'user',
          content: `Generate a professional summary for this candidate:\n\n${JSON.stringify(resumeData, null, 2)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}

/**
 * Extracts skills from resume text and categorizes them
 * @param {string} resumeText - The resume text content
 * @returns {Promise<object>} Categorized skills
 */
export async function extractSkills(resumeText) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at identifying and categorizing skills from resumes. Extract all relevant skills and categorize them appropriately.'
        },
        {
          role: 'user',
          content: `Extract and categorize all skills from this resume text:\n\n${resumeText}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'skills_extraction_response',
          schema: {
            type: 'object',
            properties: {
              technical: { type: 'array', items: { type: 'string' } },
              soft: { type: 'array', items: { type: 'string' } },
              languages: { type: 'array', items: { type: 'string' } },
              tools: { type: 'array', items: { type: 'string' } },
              frameworks: { type: 'array', items: { type: 'string' } },
              databases: { type: 'array', items: { type: 'string' } },
              certifications: { type: 'array', items: { type: 'string' } }
            },
            required: ['technical', 'soft'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error extracting skills:', error);
    throw new Error(`Failed to extract skills: ${error.message}`);
  }
}