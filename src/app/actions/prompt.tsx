type ShapExplanation = {
  feature: string;
  value: number;
  impact: number;
};


export const makeLeadPrompt = ({
  company_name,
  lead_score,
  adjusted_score,
  reviews_count,
  votes_count,
  email_valid,
  linkedin_follower_count,
  domain_age,
  employees,
  industry,
  shap_explanation,
}: {
  company_name: string;
  lead_score: number;
  adjusted_score?: number;
  reviews_count?: number;
  votes_count?: number;
  email_valid?: number;
  linkedin_follower_count?: number;
  domain_age?: number;
  employees?: number;
  industry?: string;
  shap_explanation?: ShapExplanation[];
}) => {
  return `
You are an AI assistant helping a B2B sales team understand why this lead ranks highly based on predictive signals.

Summarize the 4–6 strongest reasons this lead looks promising, using clear, non-technical language. Make it useful for a sales rep evaluating follow-up potential.

Company: ${company_name}
Industry: ${industry || "N/A"}
Lead Score: ${Math.round(lead_score * 100)}/100${
    adjusted_score ? ` (Adjusted: ${Math.round(adjusted_score * 100)}/100)` : ""
  }
Product Hunt Votes: ${votes_count ?? "N/A"}
Reviews: ${reviews_count ?? "N/A"}
Valid Email: ${email_valid === 1 ? "Yes" : "No"}
LinkedIn Followers: ${linkedin_follower_count ?? "N/A"}
Domain Age: ${domain_age ? `${domain_age} years` : "N/A"}
Employees: ${employees ?? "N/A"}
Shap Explanation: ${shap_explanation ? shap_explanation : "N/A"}

Focus on traction, credibility, and outreach readiness. If some fields are missing, skip them. you can use shap explanation to understand the model's reasoning, but do not mention it in the response. give me a concise, actionable summary that a sales rep can use to prioritize this lead. give paragraphs not lines

Avoid technical terms like SHAP or model impact. Keep it sharp, helpful, and sales-ready.End with a short sentence stating why this lead should be contacted.
`;
};
