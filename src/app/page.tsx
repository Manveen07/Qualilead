"use client";

import React, { useEffect, useState } from "react";
import NavbarLayout from "../../src/app/components/Navbar";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "../components/Searchbar"; // Optional: if you want it here

import { useTheme } from "next-themes";

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

interface ShapExplanation {
  feature: string;
  value: number;
  impact: number;
}

interface Lead {
  cleaned_url: string;
  company_domain: string;
  company_name: string;
  created_at: string;
  domain_age: number;
  email_guess: string;
  email_valid: number;
  employees: number;
  founded_recently: number;
  hq_city: string;
  hq_country: string;
  hq_country_freq: number;
  hq_state: string;
  industry: string;
  industry_freq: number;
  lead_score: number;
  lead_score_final: number;
  lead_score_predicted: number;
  linkedin_enriched: number;
  linkedin_follower_count: number;
  linkedin_url: string;
  reviews_count: number;
  score_reason: string;
  shap_explanation: ShapExplanation[];
  tagline: string;
  votes_count: number;
}


const LeadsPage = () => {
  const { theme } = useTheme();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      // const data = await readCsvData();
      const data = await fetchCompanies();
      setLeads(data);
      // console.log("Fetched leads:", data);
      // console.log("Fetched companies:", data1);
    };
    fetchLeads();
  }, []);

  const fetchCompanies = async () => {
    const res = await fetch("/api/company");
    const data = await res.json();
    return data.companies;
  };

  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm || searchTerm.toLowerCase() === "all") return true;
    return lead.industry?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    // Reset search term when the component mounts
    setSearchTerm("");
  }, []);
  return (
    <NavbarLayout>
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-6 mb-6">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4">Welcome to QualiLead</h1>

      <p className="text-muted-foreground mb-6">
        {searchTerm && searchTerm.toLowerCase() !== "all"
          ? `Showing results for industry: "${searchTerm}"`
          : "Your AI-powered lead scoring and management platform. Explore our curated directory of tools and resources for startups"}
      </p>

      {/* Company Cards */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No results found.</p>
        ) : (
          filteredLeads.map((lead, index) => (
            <CompanyCard
              key={index}
              name={lead.company_name || "Unknown Company"}
              tagline={lead.tagline}
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
              aiScore={lead.lead_score_predicted}
              scoreReason={lead.score_reason}
              company_domain={lead.cleaned_url || ""}
              industry={lead.industry || ""}
              theme={theme}
              reviewCount={lead.reviews_count || 0}
            />
          ))
        )}
      </div>
    </NavbarLayout>
  );
};

export default LeadsPage;
