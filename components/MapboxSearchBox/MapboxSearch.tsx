"use client";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Input,
} from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useSearchBoxCore, useSearchSession } from "@mapbox/search-js-react";
import React, { forwardRef, useEffect, useState } from "react";

interface MapboxSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  accessToken: string;
}

const MapboxSearch = forwardRef<HTMLInputElement, MapboxSearchProps>(
  ({ accessToken, ...props }, ref) => {
    const [searchTerm, setSerchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);

    const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);

    const searchBoxCore = useSearchBoxCore({ accessToken: accessToken });
    const searchSession = useSearchSession(searchBoxCore);

    const grabSuggestionInfo = async (
      selectedSuggestion: SearchBoxSuggestion
    ) => {
      if (searchSession.canRetrieve(selectedSuggestion)) {
        const suggestionInfo = await searchSession.retrieve(selectedSuggestion);
        console.log(suggestionInfo);
      }
    };

    useEffect(() => {
      const grabSuggestions = async () => {
        const suggestions = await searchSession.suggest(debouncedSearchTerm);
        if (suggestions.suggestions) {
          setSuggestions(suggestions.suggestions);
        }
      };

      if (debouncedSearchTerm !== "") {
        grabSuggestions();
      }
    }, [debouncedSearchTerm, searchBoxCore, searchSession]);

    return (
      <Combobox immediate>
        <ComboboxInput
          ref={ref}
          placeholder="Search"
          {...props}
          value={searchTerm}
          onChange={(e) => setSerchTerm(e.target.value)}
        />
        <ComboboxOptions
          anchor="bottom"
          as="ul"
          className="border empty:invisible p-2.5 rounded-xl bg-slate-400 shadow-xl w-72 space-y-2.5"
        >
          {suggestions.map((suggestion) => (
            <ComboboxOption
              as="li"
              key={suggestion.mapbox_id}
              value={suggestion}
              className="text-sm"
            >
              <div className="flex flex-row items-center gap-2 cursor-pointer truncate">
                <span className="p-1 bg-slate-50 rounded-full">
                  <MapPinIcon className="size-5" />
                </span>
                <div className="flex flex-col items-start">
                  <p className="text-sm font-semibold">{suggestion.address}</p>
                  <p className="text-xs">{suggestion.place_formatted}</p>
                </div>
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    );
  }
);

MapboxSearch.displayName = "MapboxSearchBox";

export { MapboxSearch };
