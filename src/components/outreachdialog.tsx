// components/OutreachDialog.tsx

"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Mail } from "lucide-react";
import { generateScoringReason } from "@/app/actions/scoringreason";

export default function OutreachDialog({
  email,
  companyName,
  industry,
  tagline,
  website,
  loaction,
}: {
  email: string;
  companyName: string;
  industry?: string;
  tagline?: string;
  website?: string;
  location?: string;
}) {
  const [tone, setTone] = useState("Direct");
  const [focus, setFocus] = useState("Collaboration");
  const [context, setContext] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const makeprompt =
    () => `You are a B2B founder or advisor reaching out cold to a decision-maker at ${companyName}, a company in the ${industry} industry.

You are not selling a product. Your goal is to open a conversation, explore mutual interests, or get insights.

Write a short, thoughtful email with:
- A ${tone.toLowerCase()} tone
- A focus on ${focus.toLowerCase()}
- Context: ${context}

Requirements:
- Include a compelling subject line (max 8 words)
- Keep the message under 100 words
- End with a soft CTA (e.g., “open to connect?”, “quick chat?”)
- Don’t sound like a sales pitch

Output:
Subject: ...
Message:
...
`;

  const generateMessage = async () => {
    const prompt = makeprompt();
    console.log(prompt);
    const response = await generateScoringReason(prompt);
    console.log(response);

    const newSubject = "Enhancing Packaging Efficiency with Real-Time Data";
    const newMessage = `I saw that ${companyName} is a key player in the ${industry} industry, and I’m curious as to how you see real-time data changing the landscape. What specific gaps do you think still need solving in terms of packaging efficiency and supply chain management?\n\nWould you be open to a quick chat next Thursday or Friday? Let me know what works.`;

    setSubject(newSubject);
    setMessage(newMessage);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 dark:from-green-600 dark:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700 rounded-lg px-3 py-2 text-white transition-all duration-200"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate Outreach Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Tone</label>
              <Select onValueChange={setTone} defaultValue={tone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Curious">Curious</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Focus</label>
              <Select onValueChange={setFocus} defaultValue={focus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select focus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Collaboration">Collaboration</SelectItem>
                  <SelectItem value="Product Pitch">Product Pitch</SelectItem>
                  <SelectItem value="Insight Sharing">
                    Insight Sharing
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Additional Context</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Any special notes or company info"
            />
          </div>

          <Button onClick={generateMessage} className="w-full">
            Generate Message
          </Button>

          <div>
            <label className="text-sm font-medium">Subject</label>
            <Input value={subject} readOnly />
          </div>

          <div>
            <label className="text-sm font-medium">Generated Message</label>
            <Textarea value={message} rows={5} readOnly />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() =>
              window.open(
                `mailto:${email}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(message)}`
              )
            }
          >
            Open in Email
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${subject}\n\n${message}`);
            }}
            variant="secondary"
          >
            Copy to Clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
