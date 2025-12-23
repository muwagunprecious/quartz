"use client";
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import Button from '../common/Button';

const universityData: Record<string, string[]> = {
    "Lagos": ["UNILAG", "LASU", "YABATECH"],
    "Osun": ["OAU", "UNIOSUN", "UNILESA", "Poly Ede"],
    "Oyo": ["UI", "LAUTECH"],
    "Abuja": ["UniAbuja", "Veritas"],
};

export default function FilterBar() {
    const [selectedState, setSelectedState] = useState("");
    const [selectedUni, setSelectedUni] = useState("");

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
        setSelectedUni(""); // Reset uni
    };

    return (
        <div className="w-full max-w-[800px] mx-auto bg-white rounded-[10px] shadow-subtle border border-mutedhex p-4 mb-10 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
                <label className="text-xs font-semibold text-textmuted uppercase ml-1 mb-1 block">In State</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-textmuted" size={16} />
                    <select
                        className="w-full h-10 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-textprimary focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                        value={selectedState}
                        onChange={handleStateChange}
                    >
                        <option value="">Select State...</option>
                        {Object.keys(universityData).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-1 w-full relative">
                <label className="text-xs font-semibold text-textmuted uppercase ml-1 mb-1 block">University</label>
                <div className="relative">
                    <select
                        className="w-full h-10 pl-3 pr-4 bg-gray-50 border border-gray-200 rounded-md text-sm text-textprimary focus:border-primary focus:ring-1 focus:ring-primary appearance-none disabled:bg-gray-100 disabled:text-gray-400"
                        value={selectedUni}
                        onChange={(e) => setSelectedUni(e.target.value)}
                        disabled={!selectedState}
                    >
                        <option value="">{selectedState ? "Select University..." : "Select State First"}</option>
                        {selectedState && universityData[selectedState].map(uni => (
                            <option key={uni} value={uni}>{uni}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full md:w-auto mt-auto pt-5">
                <Button variant="primary" className="w-full md:w-auto h-10" leftIcon={<Search size={16} />}>
                    Find
                </Button>
            </div>
        </div>
    );
}
