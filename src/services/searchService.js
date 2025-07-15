import openai from './openaiClient';

/**
 * Performs intelligent search across candidate database using natural language
 * @param {string} searchQuery - Natural language search query
 * @param {Array} candidates - Array of candidate data
 * @returns {Promise<object>} Search results with relevance scores
 */
export async function intelligentSearch(searchQuery, candidates) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert search system. Analyze the search query and identify relevant candidates based on the criteria. Return structured results with relevance scores.'
        },
        {
          role: 'user',
          content: `Search for candidates matching this query: "${searchQuery}"

Available candidates:
${JSON.stringify(candidates, null, 2)}

Return the most relevant candidates with scores and reasoning.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'search_results_response',
          schema: {
            type: 'object',
            properties: {
              query: { type: 'string' },
              results: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    candidateId: { type: 'string' },
                    relevanceScore: { type: 'number' },
                    matchReasons: { type: 'array', items: { type: 'string' } },
                    highlightedSkills: { type: 'array', items: { type: 'string' } },
                    summary: { type: 'string' }
                  },
                  required: ['candidateId', 'relevanceScore', 'matchReasons', 'summary']
                }
              },
              totalResults: { type: 'number' },
              searchInterpretation: { type: 'string' },
              suggestions: { type: 'array', items: { type: 'string' } }
            },
            required: ['query', 'results', 'totalResults', 'searchInterpretation'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error performing intelligent search:', error);
    throw new Error(`Failed to perform search: ${error.message}`);
  }
}

/**
 * Processes natural language queries to answer questions about candidates
 * @param {string} question - Natural language question
 * @param {Array} candidates - Array of candidate data
 * @returns {Promise<string>} Answer to the question
 */
export async function answerCandidateQuestion(question, candidates) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert HR assistant. Answer questions about candidates based on their resume data. Provide accurate, helpful, and detailed responses.'
        },
        {
          role: 'user',
          content: `Question: ${question}

Candidate Database:
${JSON.stringify(candidates, null, 2)}

Please provide a comprehensive answer to the question.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error answering question:', error);
    throw new Error(`Failed to answer question: ${error.message}`);
  }
}

/**
 * Generates search suggestions based on candidate database
 * @param {Array} candidates - Array of candidate data
 * @returns {Promise<Array>} Search suggestions
 */
export async function generateSearchSuggestions(candidates) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert search system. Generate helpful search suggestions based on the available candidate data.'
        },
        {
          role: 'user',
          content: `Generate search suggestions based on this candidate database:
${JSON.stringify(candidates.slice(0, 5), null, 2)}`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'search_suggestions_response',
          schema: {
            type: 'object',
            properties: {
              skillBasedSuggestions: { type: 'array', items: { type: 'string' } },
              experienceBasedSuggestions: { type: 'array', items: { type: 'string' } },
              roleBasedSuggestions: { type: 'array', items: { type: 'string' } },
              locationBasedSuggestions: { type: 'array', items: { type: 'string' } },
              educationBasedSuggestions: { type: 'array', items: { type: 'string' } }
            },
            required: ['skillBasedSuggestions', 'experienceBasedSuggestions', 'roleBasedSuggestions'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating search suggestions:', error);
    throw new Error(`Failed to generate search suggestions: ${error.message}`);
  }
}