// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import React from "react";

// interface SearchBarProps {
//   onSearch: (query: string) => void;
// }

// const SearchBar = ({ onSearch }: SearchBarProps) => {
//   return (
//     <div className="w-full relative flex items-center border rounded-full bg-muted overflow-hidden shadow-sm">
//       <Button
//         type="submit"
//         variant={"ghost"}
//         size={"sm"}
//         className="absolute left-2 h-full px-2 bg-transparent hover:bg-muted"
//       >
//         <Search className="h-4 w-4 text-muted-foreground" />
//         <span className="sr-only">Search</span>
//       </Button>
//       <Input
//         type="text"
//         placeholder="Search by industry..."
//         onChange={(e) => onSearch(e.target.value)}
//         className="pl-10 pr-4 py-2 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
//       />
//     </div>
//   );
// };

// export default SearchBar;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  // Debounce the search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(input);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [input, onSearch]);

  return (
    <div className="w-full relative flex items-center border rounded-full bg-muted overflow-hidden shadow-sm pr-2">
      {/* Search icon button */}
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute left-2 h-full px-2 bg-transparent hover:bg-muted"
        onClick={(e) => e.preventDefault()}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Input field */}
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Search by industry... (or click "Show All")'
        className="pl-10 pr-20 py-2 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {/* "Show All" button */}
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto text-xs"
        onClick={() => {
          setInput("");
          onSearch("all");
        }}
      >
        Show All
      </Button>
    </div>
  );
};

export default SearchBar;
