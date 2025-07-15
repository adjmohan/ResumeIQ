import openai from './openaiClient';

/**
 * Generates comprehensive candidate analysis report
 * @param {object} candidateData - The candidate's resume data
 * @returns {Promise<object>} Detailed analysis report
 */
export async function generateCandidateAnalysis(candidateData) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR analyst. Generate a comprehensive analysis of the candidate including strengths, weaknesses, career trajectory, and recommendations.'
        },
        {
          role: 'user',
          content: `Provide a detailed analysis of this candidate:\n\n${JSON.stringify(candidateData, null, 2)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'candidate_analysis_response',
          schema: {
            type: 'object',
            properties: {
              overallAssessment: { type: 'string' },
              strengths: { type: 'array', items: { type: 'string' } },
              weaknesses: { type: 'array', items: { type: 'string' } },
              careerTrajectory: {
                type: 'object',
                properties: {
                  trend: { type: 'string' },
                  growth: { type: 'string' },
                  consistency: { type: 'string' }
                },
                required: ['trend', 'growth', 'consistency']
              },
              skillsAssessment: {
                type: 'object',
                properties: {
                  technical: { type: 'string' },
                  soft: { type: 'string' },
                  leadership: { type: 'string' },
                  communication: { type: 'string' }
                },
                required: ['technical', 'soft']
              },
              recommendations: { type: 'array', items: { type: 'string' } },
              redFlags: { type: 'array', items: { type: 'string' } },
              bestFitRoles: { type: 'array', items: { type: 'string' } },
              salaryRange: { type: 'string' },
              riskLevel: { type: 'string' },
              overallRating: { type: 'number' }
            },
            required: ['overallAssessment', 'strengths', 'weaknesses', 'careerTrajectory', 'skillsAssessment', 'recommendations', 'bestFitRoles', 'overallRating'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating candidate analysis:', error);
    throw new Error(`Failed to generate candidate analysis: ${error.message}`);
  }
}

/**
 * Compares multiple candidates side by side
 * @param {Array} candidates - Array of candidate data
 * @returns {Promise<object>} Comparison analysis
 */
export async function compareCandidates(candidates) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert recruiter. Compare candidates side by side, highlighting their relative strengths and weaknesses.'
        },
        {
          role: 'user',
          content: `Compare these candidates:\n\n${JSON.stringify(candidates, null, 2)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'candidate_comparison_response',
          schema: {
            type: 'object',
            properties: {
              summary: { type: 'string' },
              rankings: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    candidateId: { type: 'string' },
                    rank: { type: 'number' },
                    score: { type: 'number' },
                    keyStrengths: { type: 'array', items: { type: 'string' } },
                    mainWeaknesses: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['candidateId', 'rank', 'score', 'keyStrengths']
                }
              },
              comparisons: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: { type: 'string' },
                    analysis: { type: 'string' },
                    winner: { type: 'string' }
                  },
                  required: ['category', 'analysis']
                }
              },
              recommendations: { type: 'array', items: { type: 'string' } }
            },
            required: ['summary', 'rankings', 'comparisons', 'recommendations'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error comparing candidates:', error);
    throw new Error(`Failed to compare candidates: ${error.message}`);
  }
}

/**
 * Generates personalized feedback for candidates
 * @param {object} candidateData - The candidate's resume data
 * @param {object} jobRequirements - Optional job requirements for targeted feedback
 * @returns {Promise<object>} Personalized feedback
 */
export async function generateCandidateFeedback(candidateData, jobRequirements = null) {
  try {
    const context = jobRequirements 
      ? `Candidate data: ${JSON.stringify(candidateData, null, 2)}\n\nJob requirements: ${JSON.stringify(jobRequirements, null, 2)}`
      : `Candidate data: ${JSON.stringify(candidateData, null, 2)}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach. Provide constructive, actionable feedback to help candidates improve their profiles and career prospects.'
        },
        {
          role: 'user',
          content: `Generate personalized feedback for this candidate:\n\n${context}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'candidate_feedback_response',
          schema: {
            type: 'object',
            properties: {
              overallFeedback: { type: 'string' },
              resumeImprovements: { type: 'array', items: { type: 'string' } },
              skillDevelopment: { type: 'array', items: { type: 'string' } },
              careerAdvice: { type: 'array', items: { type: 'string' } },
              strengthsToHighlight: { type: 'array', items: { type: 'string' } },
              areasForImprovement: { type: 'array', items: { type: 'string' } },
              nextSteps: { type: 'array', items: { type: 'string' } },
              marketability: { type: 'string' },
              competitiveAdvantage: { type: 'string' }
            },
            required: ['overallFeedback', 'resumeImprovements', 'skillDevelopment', 'careerAdvice', 'strengthsToHighlight', 'areasForImprovement', 'nextSteps'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating candidate feedback:', error);
    throw new Error(`Failed to generate candidate feedback: ${error.message}`);
  }
}

/**
 * Predicts candidate success probability for a role
 * @param {object} candidateData - The candidate's resume data
 * @param {object} jobRequirements - The job requirements
 * @returns {Promise<object>} Success prediction analysis
 */
export async function predictCandidateSuccess(candidateData, jobRequirements) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert talent predictor. Analyze candidate data and job requirements to predict success probability and identify risk factors.'
        },
        {
          role: 'user',
          content: `Predict success probability for this candidate in this role:

CANDIDATE: ${JSON.stringify(candidateData, null, 2)}

JOB REQUIREMENTS: ${JSON.stringify(jobRequirements, null, 2)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'success_prediction_response',
          schema: {
            type: 'object',
            properties: {
              successProbability: { type: 'number' },
              confidenceLevel: { type: 'string' },
              keySuccessFactors: { type: 'array', items: { type: 'string' } },
              riskFactors: { type: 'array', items: { type: 'string' } },
              mitigationStrategies: { type: 'array', items: { type: 'string' } },
              onboardingRecommendations: { type: 'array', items: { type: 'string' } },
              performancePredictions: {
                type: 'object',
                properties: {
                  shortTerm: { type: 'string' },
                  longTerm: { type: 'string' },
                  growth: { type: 'string' }
                },
                required: ['shortTerm', 'longTerm', 'growth']
              },
              recommendation: { type: 'string' }
            },
            required: ['successProbability', 'confidenceLevel', 'keySuccessFactors', 'riskFactors', 'performancePredictions', 'recommendation'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error predicting candidate success:', error);
    throw new Error(`Failed to predict candidate success: ${error.message}`);
  }
}