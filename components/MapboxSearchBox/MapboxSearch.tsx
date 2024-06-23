"use client";

import useDebouncedValue from "@/hooks/useDebouncedValue";
import { Input } from "@headlessui/react";
import { SearchSession, SessionToken } from "@mapbox/search-js-core";
import { useSearchBoxCore, useSearchSession } from "@mapbox/search-js-react";
import React, { forwardRef, useEffect, useMemo, useState } from "react";

interface MapboxSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  accessToken: string;
}

const MapboxSearch = forwardRef<HTMLInputElement, MapboxSearchProps>(
  ({ accessToken, ...props }, ref) => {
    const [searchTerm, setSerchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

    const searchBoxCore = useSearchBoxCore({ accessToken: accessToken });
    const searchSession = useSearchSession(searchBoxCore);

    useEffect(() => {
      const grabSuggestions = async () => {
        const suggestions = await searchSession.suggest(debouncedSearchTerm);
        console.log(suggestions);
      };

      if (debouncedSearchTerm !== "") {
        grabSuggestions();
      }
    }, [debouncedSearchTerm, searchBoxCore, searchSession]);

    return (
      <Input
        ref={ref}
        placeholder="Search"
        {...props}
        value={searchTerm}
        onChange={(e) => setSerchTerm(e.target.value)}
      />
    );
  }
);

MapboxSearch.displayName = "MapboxSearchBox";

export { MapboxSearch };
