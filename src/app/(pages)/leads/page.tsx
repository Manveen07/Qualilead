"use client";

import React, { useEffect, useState } from "react";
import NavbarLayout from "@/app/components/Navbar";
import { useTheme } from "next-themes";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Sparkles,
  MapPin,
  Globe,
  Briefcase,
  Building,
} from "lucide-react";
import HolographicCard from "@/components/CompanyCard";
// import { readCsvData } from "@/app/actions/readcsvdata";

import { generateScoringReason } from "@/app/actions/scoringreason";
import { makeLeadPrompt } from "@/app/actions/prompt";

const LeadPage = () => {
  const { theme } = useTheme();

  const [industry, setIndustry] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for demonstration - replace with your actual data

  const BONUS_POINTS = {
    industry: 0.06,
    size: 0.05,
    location: 0.04,
  };

  const [topLeads, setTopLeads] = useState<any[]>([]);

  const fetchCompanies = async () => {
    const res = await fetch("/api/company");
    const data = await res.json();
    return data.companies;
  };

  useEffect(() => {
    const fetchTopLeads = async () => {
      const sampleLeads = await fetchCompanies();

      const adjusted = sampleLeads
        .filter((Lead) => {
          if (industry && Lead.industry !== industry) return false;
          return true;
        })
        .map((lead) => {
          let bonus = 0;

          // Safely access and compare company name
          const companyName = lead.company_name || "";
          if (
            searchQuery &&
            companyName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            bonus += 0.1;
          }

          // Match industry
          // if (industry && lead.industry !== industry) return false;

          // Match size (parse employees as number)
          if (size) {
            const employeeCount = parseFloat(lead.employees || "0");
            if (
              (size === "1-10" && employeeCount <= 10) ||
              (size === "11-50" && employeeCount > 10 && employeeCount <= 50) ||
              (size === "51-200" &&
                employeeCount > 50 &&
                employeeCount <= 200) ||
              (size === "201-500" &&
                employeeCount > 200 &&
                employeeCount <= 500) ||
              (size === "500+" && employeeCount > 500)
            ) {
              bonus += BONUS_POINTS.size;
            }
          }

          // Match location
          const hqCountry = lead.hq_country || "";
          if (
            location &&
            hqCountry.toLowerCase().includes(location.toLowerCase())
          ) {
            bonus += BONUS_POINTS.location;
          }

          return {
            ...lead,
            adjustedScore: parseFloat(lead.lead_score_predicted || "0") + bonus,
          };
        })
        .sort((a, b) => b.adjustedScore - a.adjustedScore)
        .slice(0, 6); // Optional, shows only top 3

      setTopLeads(adjusted);
    };

    fetchTopLeads();
  }, [industry, size, location, searchQuery]);

  const saveScoreReason = async (companyName: string, scoreReason: string) => {
    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: companyName,
        score_reason: scoreReason,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("❌ Failed to save score_reason:", data);
    } else {
      console.log("✅ Score reason saved to DB!");
    }
  };

  useEffect(() => {
    const generateReasons = async () => {
      const top3 = topLeads.slice(0, 3);
      console.log("Top 3 Leads for scoring reason:", topLeads.slice(0, 3));

      const reasons: string[] = [];

      for (const lead of top3) {
        if (lead.score_reason && lead.score_reason.length > 0) {
          console.log(`Using existing reason for ${lead.company_name}`);

          continue;
        }
        const prompt = makeLeadPrompt(lead);
        const reason = await generateScoringReason(prompt);
        if (reason.status == 200) {
          await saveScoreReason(lead.company_name, reason.text);

          setTopLeads((prevLeads) =>
            prevLeads.map((l) =>
              l.company_name === lead.company_name
                ? { ...l, score_reason: reason.text }
                : l
            )
          );
        } else {
          console.error(
            `❌ Failed to generate reason for ${lead.company_name}:`,
            reason
          );
          continue;
        }

        console.log("Generated Reason:", reason);
      }
    };

    if (topLeads.length > 0) {
      generateReasons();
    }
  }, [topLeads]);

  const countrycode: Record<string, string> = {
    IL: "Israel",
    US: "United States",
    AU: "Australia",
    ES: "Spain",
    IT: "Italy",
    CA: "Canada",
    MT: "Malta",
    EG: "Egypt",
    KE: "Kenya",
    EE: "Estonia",
    DE: "Germany",
    SG: "Singapore",
    "": "",
  };

  const stats = [
    {
      label: "Total Leads",
      value: "45",
      icon: Building,
      trend: "+12%", // optional dummy trend
    },
    {
      label: "Top HQ Country",
      value: " USA",
      icon: MapPin,
      trend: "+6%",
    },
    {
      label: "Remote Companies",
      value: "12",
      icon: Globe,
      trend: "+9%",
    },
    {
      label: "Top Industry",
      value: "Software Dev",
      icon: Briefcase,
      trend: "+10%",
    },
  ];

  return (
    <NavbarLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/20 text-slate-900 dark:text-slate-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgb(15,23,42),rgba(15,23,42,0.6))] -z-10" />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-4 h-4" />
                AI-Powered Lead Discovery
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                Discover Your Next
                <br />
                <span className="text-blue-600 dark:text-blue-400">
                  Perfect Lead
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Find high-quality prospects with advanced AI filtering and
                real-time company insights
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                  <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        {stat.trend}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Smart Filters
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search companies, keywords, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Industry Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Industry
                </label>
                <Select onValueChange={setIndustry}>
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 transition-colors text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectItem
                      value="Software Development"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      💻 Software Development
                    </SelectItem>
                    <SelectItem
                      value="Advertising Services"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      📢 Advertising Services
                    </SelectItem>
                    <SelectItem
                      value="IT Services and IT Consulting"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      👨‍💻 IT Consulting
                    </SelectItem>
                    <SelectItem
                      value="Venture Capital and Private Equity Principals"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      💰 Venture Capital
                    </SelectItem>
                    <SelectItem
                      value="Staffing and Recruiting"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🧑‍💼 Staffing & Recruiting
                    </SelectItem>
                    <SelectItem
                      value="Real Estate"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🏠 Real Estate
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  Company Size
                </label>
                <Select onValueChange={setSize}>
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectItem
                      value="1-10"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🚀 Startup (1-10)
                    </SelectItem>
                    <SelectItem
                      value="11-50"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      📈 Small (11-50)
                    </SelectItem>
                    <SelectItem
                      value="51-200"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🏢 Medium (51-200)
                    </SelectItem>
                    <SelectItem
                      value="201-500"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🏬 Large (201-500)
                    </SelectItem>
                    <SelectItem
                      value="500+"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🌆 Enterprise (500+)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Location
                </label>
                <Select onValueChange={setLocation}>
                  <SelectTrigger className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl hover:border-purple-300 dark:hover:border-purple-500 transition-colors text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <SelectItem
                      value="US"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🇺🇸 United States
                    </SelectItem>
                    <SelectItem
                      value="AU"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🇦🇺 Australia
                    </SelectItem>
                    <SelectItem
                      value="EU"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🇪🇺 Europe
                    </SelectItem>
                    <SelectItem
                      value="CA"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🇨🇦 Canada
                    </SelectItem>
                    <SelectItem
                      value="IL"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🇮🇱 Israel
                    </SelectItem>
                    <SelectItem
                      value="Remote"
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      🌐 Remote
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {topLeads.length > 0 ? (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {topLeads.length} Premium Leads Found
                  </h2>
                  <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Updated 2 minutes ago
                </div>
              </div>

              {/* Lead Cards */}
              <div className="flex flex-col gap-6">
                {topLeads.map((lead, index) => (
                  <HolographicCard
                    key={index}
                    name={lead.company_name || "Unknown Company"}
                    tagline={lead.tagline || "A curated directory of tools"}
                    domain={lead.company_domain}
                    location={
                      (lead.hq_country ? countrycode[lead.hq_country] : "") +
                      (lead.hq_city ? ", " + lead.hq_city : "")
                    }
                    createdAt={lead.created_at}
                    linkedinUrl={lead.linkedin_url}
                    employeeCount={lead.employees}
                    followerCount={lead.linkedin_follower_count}
                    voteCount={lead.votes_count}
                    email={lead.email_guess}
                    aiScore={lead.adjustedScore}
                    scoreReason={lead.score_reason}
                    company_domain={lead.cleaned_url || ""}
                    industry={lead.industry || ""}
                    theme={theme}
                    reviewCount={lead.reviews_count || 0}
                  />
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center pt-8">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                  Load More Leads
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LeadPage;
