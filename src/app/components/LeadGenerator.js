"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  TrendingUp,
  Mail,
  Phone,
  Building,
  MapPin,
  Download,
  RefreshCw,
  Brain,
  Target,
  Zap,
} from "lucide-react";

const LeadGenerator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    size: "",
    location: "",
    minScore: 0,
  });
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [selectedLeads, setSelectedLeads] = useState(new Set());

  // Mock data with realistic B2B companies and enhanced scoring
  const mockLeads = [
    {
      id: 1,
      company: "TechFlow Solutions",
      website: "techflow.io",
      industry: "SaaS",
      size: "50-200",
      location: "San Francisco, CA",
      revenue: "$5-10M",
      contact: {
        name: "Sarah Chen",
        title: "VP of Sales",
        email: "sarah.chen@techflow.io",
        phone: "+1 (415) 555-0123",
        linkedin: "linkedin.com/in/sarahchen",
      },
      aiScore: 92,
      scoreFactors: {
        growth: 85,
        engagement: 90,
        fit: 95,
        timing: 88,
      },
      signals: ["Recent funding", "Hiring VP of Marketing", "Expanding to EU"],
      lastActivity: "2 days ago",
      source: "LinkedIn + Crunchbase",
    },
    {
      id: 2,
      company: "DataVision Analytics",
      website: "datavision.com",
      industry: "Analytics",
      size: "20-50",
      location: "Austin, TX",
      revenue: "$2-5M",
      contact: {
        name: "Mike Rodriguez",
        title: "CEO",
        email: "mike@datavision.com",
        phone: "+1 (512) 555-0456",
        linkedin: "linkedin.com/in/mikerodriguez",
      },
      aiScore: 87,
      scoreFactors: {
        growth: 92,
        engagement: 78,
        fit: 85,
        timing: 90,
      },
      signals: ["Product launch", "Team expansion", "New office"],
      lastActivity: "1 day ago",
      source: "Apollo + Google Maps",
    },
    {
      id: 3,
      company: "CloudSecure Pro",
      website: "cloudsecure.pro",
      industry: "Cybersecurity",
      size: "100-500",
      location: "New York, NY",
      revenue: "$15-25M",
      contact: {
        name: "Jennifer Walsh",
        title: "Head of Procurement",
        email: "j.walsh@cloudsecure.pro",
        phone: "+1 (212) 555-0789",
        linkedin: "linkedin.com/in/jenniferwalsh",
      },
      aiScore: 95,
      scoreFactors: {
        growth: 88,
        engagement: 95,
        fit: 98,
        timing: 95,
      },
      signals: ["Budget approved", "RFP published", "Vendor evaluation"],
      lastActivity: "3 hours ago",
      source: "Growjo + LinkedIn",
    },
    {
      id: 4,
      company: "GreenTech Innovations",
      website: "greentech-inn.com",
      industry: "CleanTech",
      size: "10-20",
      location: "Portland, OR",
      revenue: "$1-2M",
      contact: {
        name: "David Kim",
        title: "Founder",
        email: "david@greentech-inn.com",
        phone: "+1 (503) 555-0321",
        linkedin: "linkedin.com/in/davidkim",
      },
      aiScore: 76,
      scoreFactors: {
        growth: 95,
        engagement: 65,
        fit: 70,
        timing: 75,
      },
      signals: ["Seed funding", "First customer", "MVP launch"],
      lastActivity: "1 week ago",
      source: "Crunchbase + LinkedIn",
    },
    {
      id: 5,
      company: "FinanceFlow Corp",
      website: "financeflow.com",
      industry: "FinTech",
      size: "200-500",
      location: "Chicago, IL",
      revenue: "$25-50M",
      contact: {
        name: "Lisa Thompson",
        title: "Chief Technology Officer",
        email: "lisa.thompson@financeflow.com",
        phone: "+1 (312) 555-0654",
        linkedin: "linkedin.com/in/lisathompson",
      },
      aiScore: 89,
      scoreFactors: {
        growth: 85,
        engagement: 88,
        fit: 92,
        timing: 88,
      },
      signals: ["Digital transformation", "Cloud migration", "New CTO hired"],
      lastActivity: "5 days ago",
      source: "Apollo + Crunchbase",
    },
  ];

  const searchLeads = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filteredLeads = mockLeads.filter((lead) => {
        const matchesSearch =
          !searchTerm ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.contact.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry =
          !filters.industry || lead.industry === filters.industry;
        const matchesSize = !filters.size || lead.size === filters.size;
        const matchesLocation =
          !filters.location || lead.location.includes(filters.location);
        const matchesScore = lead.aiScore >= filters.minScore;

        return (
          matchesSearch &&
          matchesIndustry &&
          matchesSize &&
          matchesLocation &&
          matchesScore
        );
      });

      // Sort by AI score
      filteredLeads.sort((a, b) => b.aiScore - a.aiScore);

      setLeads(filteredLeads);
      setLoading(false);
    }, 1500);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 80) return "text-blue-600 bg-blue-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const toggleLeadSelection = (leadId) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const exportSelected = () => {
    const selectedData = leads.filter((lead) => selectedLeads.has(lead.id));
    const csvContent = [
      [
        "Company",
        "Contact Name",
        "Title",
        "Email",
        "Phone",
        "AI Score",
        "Industry",
        "Signals",
      ].join(","),
      ...selectedData.map((lead) =>
        [
          lead.company,
          lead.contact.name,
          lead.contact.title,
          lead.contact.email,
          lead.contact.phone,
          lead.aiScore,
          lead.industry,
          lead.signals.join("; "),
        ].join(",")
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads_export.csv";
    a.click();
  };

  useEffect(() => {
    searchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Enhanced Lead Generator
                </h1>
                <p className="text-sm text-gray-600">
                  AI-powered B2B lead discovery and scoring
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Real-time enrichment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Brain className="h-4 w-4 text-purple-500" />
                <span>AI scoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6">
          {["search", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab === "search" ? (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Lead Search</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Analytics</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {activeTab === "search" ? (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search companies, contacts, or industries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <select
                  value={filters.industry}
                  onChange={(e) =>
                    setFilters({ ...filters, industry: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Industries</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="FinTech">FinTech</option>
                  <option value="CleanTech">CleanTech</option>
                </select>

                <select
                  value={filters.size}
                  onChange={(e) =>
                    setFilters({ ...filters, size: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Sizes</option>
                  <option value="10-20">10-20</option>
                  <option value="20-50">20-50</option>
                  <option value="50-200">50-200</option>
                  <option value="200-500">200-500</option>
                </select>

                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={searchLeads}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>Search</span>
                </button>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">
                    Min AI Score:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minScore}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        minScore: parseInt(e.target.value),
                      })
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">
                    {filters.minScore}
                  </span>
                </div>

                {selectedLeads.size > 0 && (
                  <button
                    onClick={exportSelected}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export {selectedLeads.size} leads</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">
                    Searching and scoring leads...
                  </span>
                </div>
              ) : (
                leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedLeads.has(lead.id)}
                            onChange={() => toggleLeadSelection(lead.id)}
                            className="mt-1"
                          />

                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {lead.company}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(
                                  lead.aiScore
                                )}`}
                              >
                                AI Score: {lead.aiScore}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Building className="h-4 w-4" />
                                <span>
                                  {lead.industry} • {lead.size} employees
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{lead.location}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>{lead.revenue} revenue</span>
                              </div>
                              <div className="text-sm text-gray-500">
                                Source: {lead.source}
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">
                                  {lead.contact.name}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {lead.contact.title}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <a
                                    href={`mailto:${lead.contact.email}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {lead.contact.email}
                                  </a>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-3 w-3 text-gray-400" />
                                  <span className="text-gray-600">
                                    {lead.contact.phone}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* AI Score Breakdown */}
                            <div className="mb-4">
                              <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                                <Brain className="h-4 w-4 text-purple-500" />
                                <span>AI Score Breakdown</span>
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {Object.entries(lead.scoreFactors).map(
                                  ([factor, score]) => (
                                    <div key={factor} className="text-center">
                                      <div className="text-xs text-gray-500 capitalize">
                                        {factor}
                                      </div>
                                      <div
                                        className={`text-sm font-medium ${getScoreColor(
                                          score
                                        )}`}
                                      >
                                        {score}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Buying Signals */}
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                <span>Buying Signals</span>
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {lead.signals.map((signal, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                                  >
                                    {signal}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-2">
                            Last activity
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.lastActivity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {leads.length === 0 && !loading && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No leads found. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </>
        ) : (
          /* Analytics Tab */
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Lead Generation Analytics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {leads.length}
                </div>
                <div className="text-sm text-gray-600">Total Leads Found</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {leads.filter((l) => l.aiScore >= 90).length}
                </div>
                <div className="text-sm text-gray-600">
                  High-Quality Leads (90+)
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">
                  {Math.round(
                    leads.reduce((acc, lead) => acc + lead.aiScore, 0) /
                      leads.length
                  ) || 0}
                </div>
                <div className="text-sm text-gray-600">Average AI Score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Industry Distribution
                </h3>
                <div className="space-y-2">
                  {[
                    "SaaS",
                    "Analytics",
                    "Cybersecurity",
                    "FinTech",
                    "CleanTech",
                  ].map((industry) => {
                    const count = leads.filter(
                      (l) => l.industry === industry
                    ).length;
                    const percentage =
                      leads.length > 0
                        ? ((count / leads.length) * 100).toFixed(1)
                        : 0;
                    return (
                      <div
                        key={industry}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">
                          {industry}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Score Distribution
                </h3>
                <div className="space-y-2">
                  {[
                    { range: "90-100", color: "bg-green-600" },
                    { range: "80-89", color: "bg-blue-600" },
                    { range: "70-79", color: "bg-yellow-600" },
                    { range: "60-69", color: "bg-red-600" },
                  ].map(({ range, color }) => {
                    const [min, max] = range.split("-").map(Number);
                    const count = leads.filter(
                      (l) => l.aiScore >= min && l.aiScore <= max
                    ).length;
                    const percentage =
                      leads.length > 0
                        ? ((count / leads.length) * 100).toFixed(1)
                        : 0;
                    return (
                      <div
                        key={range}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">{range}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`${color} h-2 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadGenerator;
