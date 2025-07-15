import openai from './openaiClient';

/**
 * Analyzes job requirements and extracts structured information
 * @param {string} jobDescription - The job description text
 * @returns {Promise<object>} Parsed job requirements
 */
export async function parseJobRequirements(jobDescription) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert job analyst. Parse job descriptions and extract structured requirements, skills, and qualifications.'
        },
        {
          role: 'user',
          content: `Parse this job description and extract all requirements:\n\n${jobDescription}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'job_requirements_response',
          schema: {
            type: 'object',
            properties: {
              jobTitle: { type: 'string' },
              company: { type: 'string' },
              location: { type: 'string' },
              jobType: { type: 'string' },
              experienceLevel: { type: 'string' },
              requiredSkills: { type: 'array', items: { type: 'string' } },
              preferredSkills: { type: 'array', items: { type: 'string' } },
              qualifications: { type: 'array', items: { type: 'string' } },
              responsibilities: { type: 'array', items: { type: 'string' } },
              benefits: { type: 'array', items: { type: 'string' } },
              salaryRange: { type: 'string' },
              requiredExperience: { type: 'string' },
              industry: { type: 'string' },
              remote: { type: 'boolean' }
            },
            required: ['jobTitle', 'requiredSkills', 'qualifications', 'responsibilities', 'experienceLevel'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error parsing job requirements:', error);
    throw new Error(`Failed to parse job requirements: ${error.message}`);
  }
}

/**
 * Calculates match score between a candidate and job requirements
 * @param {object} candidateData - The parsed candidate resume data
 * @param {object} jobRequirements - The parsed job requirements
 * @returns {Promise<object>} Match analysis with score and details
 */
export async function calculateMatchScore(candidateData, jobRequirements) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert recruiter. Analyze candidate-job fit and provide a detailed match score with reasoning.'
        },
        {
          role: 'user',
          content: `Analyze the match between this candidate and job requirements:

CANDIDATE DATA:
${JSON.stringify(candidateData, null, 2)}

JOB REQUIREMENTS:
${JSON.stringify(jobRequirements, null, 2)}

Provide a comprehensive match analysis.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'match_analysis_response',
          schema: {
            type: 'object',
            properties: {
              overallScore: { type: 'number' },
              skillsMatch: {
                type: 'object',
                properties: {
                  score: { type: 'number' },
                  matchedSkills: { type: 'array', items: { type: 'string' } },
                  missingSkills: { type: 'array', items: { type: 'string' } },
                  additionalSkills: { type: 'array', items: { type: 'string' } }
                },
                required: ['score', 'matchedSkills', 'missingSkills']
              },
              experienceMatch: {
                type: 'object',
                properties: {
                  score: { type: 'number' },
                  analysis: { type: 'string' }
                },
                required: ['score', 'analysis']
              },
              educationMatch: {
                type: 'object',
                properties: {
                  score: { type: 'number' },
                  analysis: { type: 'string' }
                },
                required: ['score', 'analysis']
              },
              strengths: { type: 'array', items: { type: 'string' } },
              concerns: { type: 'array', items: { type: 'string' } },
              recommendations: { type: 'array', items: { type: 'string' } },
              fitLevel: { type: 'string' },
              summary: { type: 'string' }
            },
            required: ['overallScore', 'skillsMatch', 'experienceMatch', 'educationMatch', 'strengths', 'concerns', 'fitLevel', 'summary'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error calculating match score:', error);
    throw new Error(`Failed to calculate match score: ${error.message}`);
  }
}

/**
 * Ranks multiple candidates for a job position
 * @param {Array} candidates - Array of candidate data
 * @param {object} jobRequirements - The job requirements
 * @returns {Promise<Array>} Ranked candidates with scores
 */
export async function rankCandidates(candidates, jobRequirements) {
  try {
    const rankedCandidates = [];
    
    for (const candidate of candidates) {
      const matchAnalysis = await calculateMatchScore(candidate, jobRequirements);
      rankedCandidates.push({
        ...candidate,
        matchAnalysis,
        overallScore: matchAnalysis.overallScore
      });
    }

    // Sort by overall score (descending)
    return rankedCandidates.sort((a, b) => b.overallScore - a.overallScore);
  } catch (error) {
    console.error('Error ranking candidates:', error);
    throw new Error(`Failed to rank candidates: ${error.message}`);
  }
}

/**
 * Generates interview questions based on job requirements and candidate profile
 * @param {object} candidateData - The candidate's resume data
 * @param {object} jobRequirements - The job requirements
 * @returns {Promise<Array>} Generated interview questions
 */
export async function generateInterviewQuestions(candidateData, jobRequirements) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer. Generate relevant, insightful interview questions based on the candidate\'s background and job requirements.'
        },
        {
          role: 'user',
          content: `Generate interview questions for this candidate and job:

CANDIDATE: ${JSON.stringify(candidateData, null, 2)}

JOB REQUIREMENTS: ${JSON.stringify(jobRequirements, null, 2)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'interview_questions_response',
          schema: {
            type: 'object',
            properties: {
              technical: { type: 'array', items: { type: 'string' } },
              behavioral: { type: 'array', items: { type: 'string' } },
              situational: { type: 'array', items: { type: 'string' } },
              roleSpecific: { type: 'array', items: { type: 'string' } },
              cultural: { type: 'array', items: { type: 'string' } }
            },
            required: ['technical', 'behavioral', 'situational', 'roleSpecific'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw new Error(`Failed to generate interview questions: ${error.message}`);
  }
}