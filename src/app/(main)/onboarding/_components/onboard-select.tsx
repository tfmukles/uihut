"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function OnboardingSelect({
  options,
  onSelect,
  isDropdownOpen,
  onToggle,
}: {
  options?: { label: string; value: string }[];
  onSelect: (option: string) => void;
  isDropdownOpen: boolean;
  onToggle: (option: string) => void;
}) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const COLLISION_PADDING = 10;

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && dropdownContentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const dropdownContentRect =
        dropdownContentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate space below and above with the collision padding
      const spaceBelow =
        viewportHeight - dropdownRect.bottom - COLLISION_PADDING;
      const spaceAbove = dropdownRect.top - COLLISION_PADDING;

      // Calculate space on the left and right with the collision padding
      const spaceOnRight =
        viewportWidth - dropdownRect.right - COLLISION_PADDING;
      const spaceOnLeft = dropdownRect.left - COLLISION_PADDING;

      // Determine vertical positioning (upward or downward)
      const shouldOpenUpwards =
        spaceBelow < dropdownContentRect.height &&
        spaceAbove >= dropdownContentRect.height;

      // Determine horizontal positioning (left or right)
      const shouldAlignLeft =
        spaceOnRight < dropdownContentRect.width &&
        spaceOnLeft >= dropdownContentRect.width;

      // Set the dropdown style based on the available space
      setDropdownStyle({
        top: shouldOpenUpwards
          ? `-${dropdownContentRect.height + 5}px`
          : `calc(100% + ${COLLISION_PADDING}px)`,
        bottom: "auto",
        left: shouldAlignLeft ? "auto" : 0,
        right: shouldAlignLeft ? 0 : "auto",
      });
    }
  };

  useEffect(() => {
    setSelectedValue(null);
  }, [options]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen]);

  return (
    <div
      className={`custom-select ${isDropdownOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <Button
        type="button"
        // @ts-ignore
        onClick={onToggle}
        variant={"outline"}
        className={cn(
          "custom-select-trigger h-[40px] justify-start rounded-lg before:rounded-lg after:rounded-lg [&_span]:flex-1",
        )}
        size={"xl"}
      >
        <p
          className={`${!isDropdownOpen && selectedValue ? "" : ""} text-base`}
        >
          {selectedValue || "Select an option"}
        </p>
        <ChevronDown className="ml-auto size-5" />
      </Button>
      <div
        ref={dropdownContentRef}
        className="custom-select-content"
        style={dropdownStyle}
      >
        {options?.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              onSelect(option.value);
              setSelectedValue(option.label);
              onToggle(option.label);
            }}
            className={`custom-select-option ${selectedValue === option.label ? "active" : ""}`}
          >
            <button type="button" className="text-sm">
              {option.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingSelect;
