"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Mail,
  Users,
  Calendar,
  Globe,
  Building,
  MessageSquare,
  ThumbsUp,
  UserCheck,
} from "lucide-react";

const FeatureAnalyticsDashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const featureData = [
    {
      name: "reviews_count",
      importance: 0.0594,
      icon: MessageSquare,
      color: "#3B82F6",
      trend: "positive",
      description: "Number of Product Hunt reviews",
      impact: "More reviews → Higher lead scores",
      businessValue: "Prioritize leads with real customer engagement",
      interpretation:
        "Product Hunt reviews signal community engagement and credibility",
      shap_contribution: "+0.0571",
    },
    {
      name: "email_valid",
      importance: 0.0312,
      icon: Mail,
      color: "#10B981",
      trend: "positive",
      description: "Whether email address is valid",
      impact: "Valid emails significantly increase score",
      businessValue: "A valid email makes a lead actionable for outreach",
      interpretation:
        "Binary feature - valid emails are essential for conversion",
      shap_contribution: "+0.0216",
    },
    {
      name: "votes_count",
      importance: 0.0308,
      icon: ThumbsUp,
      color: "#8B5CF6",
      trend: "positive",
      description: "Number of Product Hunt upvotes",
      impact: "More upvotes → Higher lead scores",
      businessValue: "High user interest indicates high potential",
      interpretation: "Strong Product Hunt interest equals warm leads",
      shap_contribution: "+0.0546",
    },
    {
      name: "linkedin_follower_count",
      importance: 0.0259,
      icon: Users,
      color: "#F59E0B",
      trend: "positive",
      description: "Number of LinkedIn followers",
      impact: "Higher followers → Higher scores",
      businessValue: "Indicates market presence or brand authority",
      interpretation:
        "Social proof through follower count correlates with quality",
      shap_contribution: "+0.0187",
    },
    {
      name: "industry_freq",
      importance: 0.0225,
      icon: Building,
      color: "#EF4444",
      trend: "mixed",
      description: "Frequency of industry in dataset",
      impact: "Common industries score higher",
      businessValue: "Common industries may be easier to convert",
      interpretation: "Caution: May bias against niche but valuable industries",
      shap_contribution: "-0.0165",
    },
    {
      name: "domain_age",
      importance: 0.0149,
      icon: Calendar,
      color: "#06B6D4",
      trend: "positive",
      description: "Age of company domain",
      impact: "Older domains → Higher scores",
      businessValue: "Aged domains imply stability and credibility",
      interpretation: "Domain age correlates with company maturity",
      shap_contribution: "+0.0187",
    },
    {
      name: "hq_country_freq",
      importance: 0.0082,
      icon: Globe,
      color: "#84CC16",
      trend: "mixed",
      description: "Frequency of HQ country",
      impact: "Common countries (US/CA) score higher",
      businessValue: "Geographic targeting preference",
      interpretation: "Watch for geographic bias in scoring",
      shap_contribution: "Neutral",
    },
    {
      name: "employees",
      importance: 0.0077,
      icon: Users,
      color: "#F97316",
      trend: "positive",
      description: "Number of employees",
      impact: "More employees → Slight positive impact",
      businessValue: "Larger teams often mean more mature organizations",
      interpretation:
        "Less important than expected, possibly due to scaling issues",
      shap_contribution: "Minor positive",
    },
    {
      name: "founded_recently",
      importance: 0.0053,
      icon: Calendar,
      color: "#EC4899",
      trend: "negative",
      description: "Whether company was founded recently",
      impact: "Recently founded → Lower scores",
      businessValue: "Early-stage startups may be riskier to sell to",
      interpretation: "Established companies preferred over new startups",
      shap_contribution: "Negative for recent",
    },
    {
      name: "linkedin_enriched",
      importance: 0.0005,
      icon: UserCheck,
      color: "#6366F1",
      trend: "positive",
      description: "Whether LinkedIn data was enriched",
      impact: "Enriched data → Minor positive impact",
      businessValue: "Enrichment indicates more trustworthy data",
      interpretation: "Data completeness correlates with lead quality",
      shap_contribution: "Minor positive",
    },
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-yellow-500 rounded-full" />;
    }
  };

  const sortedFeatures = [...featureData].sort(
    (a, b) => b.importance - a.importance
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900  dark:text-white mb-2">
            Feature Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Understanding the impact of features on lead scoring model
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Features
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {featureData.length}
                </p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Feature</p>
                <p className="text-2xl font-bold text-gray-900">Reviews</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Importance
                </p>
                <p className="text-2xl font-bold text-gray-900">0.0207</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Positive Impact
                </p>
                <p className="text-2xl font-bold text-gray-900">70%</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Feature Importance Ranking
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sortedFeatures}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <Tooltip
                formatter={(value) => [value.toFixed(4), "Importance"]}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="importance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.name}
                className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedFeature === feature.name ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() =>
                  setSelectedFeature(
                    selectedFeature === feature.name ? null : feature.name
                  )
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg`}
                      style={{ backgroundColor: feature.color + "20" }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: feature.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-gray-600">Rank #{index + 1}</p>
                    </div>
                  </div>
                  {getTrendIcon(feature.trend)}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Importance Score
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(feature.importance / 0.06) * 100}%`,
                            backgroundColor: feature.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {feature.importance.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Description
                    </p>
                    <p className="text-sm text-gray-800">
                      {feature.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Impact</p>
                    <p className="text-sm text-gray-800">{feature.impact}</p>
                  </div>

                  {selectedFeature === feature.name && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Business Value
                        </p>
                        <p className="text-sm text-gray-800">
                          {feature.businessValue}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Interpretation
                        </p>
                        <p className="text-sm text-gray-800">
                          {feature.interpretation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          SHAP Contribution
                        </p>
                        <p className="text-sm text-gray-800">
                          {feature.shap_contribution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Insights */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                ✅ Strong Positive Indicators
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Reviews Count:</strong> Community engagement drives
                  highest scores
                </li>
                <li>
                  • <strong>Valid Email:</strong> Essential for actionable
                  outreach
                </li>
                <li>
                  • <strong>Votes Count:</strong> High user interest indicates
                  warm leads
                </li>
                <li>
                  • <strong>Domain Age:</strong> Stability and credibility
                  matter
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                ⚠️ Areas for Review
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  • <strong>Industry Frequency:</strong> May bias against
                  valuable niche markets
                </li>
                <li>
                  • <strong>Geographic Bias:</strong> HQ country frequency could
                  limit global opportunities
                </li>
                <li>
                  • <strong>Startup Bias:</strong> Recently founded companies
                  scored lower
                </li>
                <li>
                  • <strong>Employee Count:</strong> Less predictive than
                  expected
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureAnalyticsDashboard;
