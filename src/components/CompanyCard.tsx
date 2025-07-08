"use client";

import React, { useState } from "react";
import {
  Star,
  TrendingUp,
  Sparkles,
  MapPin,
  Building,
  Users,
  ThumbsUp,
  Globe,
  ExternalLink,
  Linkedin,
  MessageCircle,
} from "lucide-react";

import OutreachDialog from "./outreachdialog";

interface CompanyCardProps {
  name?: string;
  tagline?: string;
  aiScore?: number;
  scoreReason?: string;
  domain?: string;
  company_domain?: string;
  location?: string;
  employeeCount?: number;
  industry?: string;
  followerCount?: number;
  voteCount?: number;
  email?: string;
  linkedinUrl?: string;
  createdAt?: string;
  theme?: "light" | "dark"; // Add theme prop
  reviewCount?: number; // Optional review count
}

const HolographicCard = (props: CompanyCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const {
    name,
    tagline,
    aiScore = 0,
    scoreReason,
    domain,
    company_domain,
    location,
    employeeCount,
    industry,
    followerCount,
    voteCount,
    email,
    reviewCount,
    linkedinUrl,
    createdAt,
    theme,
  } = props;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <Star className="w-4 h-4 fill-current" />;
    if (score >= 0.6) return <TrendingUp className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  const isDark = theme === "dark";
  // const sub = `Inquiry about ${name || "your company"}`;
  // const body = `Hi,\n\nI came across your company and was impressed by your work in the ${
  //   industry || "industry"
  // } sector. I would love to learn more about your initiatives and explore potential collaboration opportunities.\n\nBest regards,\n[Your Name]`;

  // const mailtoLink = `mailto:${email}?subject=${sub}&body=${body}`;

  // Theme-based styles
  const cardStyles = isDark
    ? {
        outerGradient: "from-indigo-900 via-purple-900 to-pink-900",
        innerBg: "bg-gray-900",
        titleGradient: "from-cyan-300 to-pink-300",
        taglineColor: "text-gray-300",
        dateColor: "text-cyan-300",
        dateBg: "bg-gray-800",
        dateBorder: "border-cyan-500/30",
        scoreBoxGradient: "from-cyan-500/20 to-pink-500/20",
        scoreBoxBorder: "border-cyan-500/30",
        scoreTextColor: "text-cyan-300",
        scoreReasonColor: "text-gray-400",
        infoBg: "bg-gray-800/50",
        infoBorder: "border-gray-700",
        establishedLabel: "text-gray-500",
        holographicOverlay: "via-white/10",
      }
    : {
        outerGradient: "from-blue-200 via-purple-200 to-pink-200",
        innerBg: "bg-white",
        titleGradient: "from-blue-600 to-purple-600",
        taglineColor: "text-gray-600",
        dateColor: "text-blue-600",
        dateBg: "bg-gray-50",
        dateBorder: "border-blue-200",
        scoreBoxGradient: "from-blue-50 to-purple-50",
        scoreBoxBorder: "border-blue-200",
        scoreTextColor: "text-blue-600",
        scoreReasonColor: "text-gray-500",
        infoBg: "bg-gray-50",
        infoBorder: "border-gray-200",
        establishedLabel: "text-gray-400",
        holographicOverlay: "via-black/10",
      };

  const iconColors = isDark
    ? {
        location: "text-cyan-300",
        employees: "text-pink-300",
        industry: "text-green-300",
        followers: "text-purple-300",
        votes: "text-orange-300",
        industryDot: "bg-green-400",
        reviews: "text-yellow-300",
      }
    : {
        location: "text-blue-500",
        employees: "text-purple-500",
        industry: "text-green-500",
        followers: "text-indigo-500",
        votes: "text-orange-500",
        industryDot: "bg-green-500",
        reviews: "text-yellow-600",
      };

  const buttonStyles = isDark
    ? {
        website:
          "from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700",
        email:
          "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
        linkedin:
          "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      }
    : {
        website:
          "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
        email:
          "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
        linkedin:
          "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
      };

  return (
    <div
      className={`relative bg-gradient-to-br ${cardStyles.outerGradient} rounded-2xl p-[2px] shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden`}
    >
      {/* Holographic effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent ${cardStyles.holographicOverlay} to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000`}
      ></div>

      <div className={`${cardStyles.innerBg} rounded-2xl p-6 relative z-10`}>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3
                  className={`text-xl font-bold bg-gradient-to-r ${cardStyles.titleGradient} bg-clip-text text-transparent`}
                >
                  {name}
                </h3>
                {aiScore >= 0.8 && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium">
                    <Star className="w-3 h-3 fill-current" />
                    TOP RATED
                  </div>
                )}
              </div>
              <p className={`text-sm ${cardStyles.taglineColor}`}>{tagline}</p>
            </div>

            {formattedDate && (
              <div className="text-right">
                <span className={`text-xs ${cardStyles.establishedLabel}`}>
                  Established
                </span>
                <div
                  className={`text-sm font-medium ${cardStyles.dateColor} ${cardStyles.dateBg} px-2 py-1 rounded-lg border ${cardStyles.dateBorder}`}
                >
                  {formattedDate}
                </div>
              </div>
            )}
          </div>

          <div
            className={`bg-gradient-to-r ${cardStyles.scoreBoxGradient} rounded-lg p-3 border ${cardStyles.scoreBoxBorder}`}
          >
            <div
              className={`flex items-center gap-2 ${cardStyles.scoreTextColor} text-sm font-semibold mb-2`}
            >
              {getScoreIcon(aiScore)}
              <span>AI Score: {Math.round(aiScore * 100)}/100</span>
            </div>
            {/* {scoreReason && (
              <p
                className={`text-xs ${cardStyles.scoreReasonColor} line-clamp-3`}
              >
                {scoreReason}
              </p>
            )} */}

            {scoreReason && (
              <div className="space-y-1">
                <p
                  className={`text-xs ${cardStyles.scoreReasonColor} ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                >
                  {scoreReason}
                </p>
                {scoreReason.length > 150 && (
                  <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className={`text-xs font-medium underline hover:opacity-80 ${
                      isDark ? "text-cyan-300" : "text-blue-600"
                    }`}
                  >
                    {expanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {location && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm`}
              >
                <div
                  className={`flex items-center gap-2 ${iconColors.location}`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>
            )}
            {employeeCount && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm`}
              >
                <div
                  className={`flex items-center gap-2 ${iconColors.employees}`}
                >
                  <Building className="w-4 h-4" />
                  <span className="text-sm">
                    {Math.trunc(employeeCount).toLocaleString()} Employees
                  </span>
                </div>
              </div>
            )}
            {industry && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm col-span-2`}
              >
                <div
                  className={`flex items-center gap-2 ${iconColors.industry}`}
                >
                  <div
                    className={`w-2 h-2 ${iconColors.industryDot} rounded-full`}
                  ></div>
                  <span className="text-sm">{industry}</span>
                </div>
              </div>
            )}
            {followerCount && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm`}
              >
                <div
                  className={`flex items-center gap-2 ${iconColors.followers}`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {Math.trunc(followerCount).toLocaleString()} Followers
                  </span>
                </div>
              </div>
            )}
            {voteCount && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm`}
              >
                <div className={`flex items-center gap-2 ${iconColors.votes}`}>
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">
                    {Math.trunc(voteCount).toLocaleString()} Likes
                  </span>
                </div>
              </div>
            )}

            {reviewCount && (
              <div
                className={`${cardStyles.infoBg} rounded-lg p-3 border ${cardStyles.infoBorder} backdrop-blur-sm`}
              >
                <div
                  className={`flex items-center gap-2 ${iconColors.reviews}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {Math.trunc(reviewCount).toLocaleString()} Reviews
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {domain && (
              <a
                href={company_domain}
                className={`flex items-center gap-2 bg-gradient-to-r ${buttonStyles.website} rounded-lg px-3 py-2 text-white transition-all duration-200 group/link`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{domain}</span>
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            )}
            {email && (
              <OutreachDialog
                email={email}
                companyName={name || ""}
                tagline={tagline || ""}
                website={company_domain || ""}
                location={location || ""}
                industry={industry}
              />
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                className={`flex items-center gap-2 bg-gradient-to-r ${buttonStyles.linkedin} rounded-lg px-3 py-2 text-white transition-all duration-200`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolographicCard;
