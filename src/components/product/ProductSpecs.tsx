import React from 'react';

interface ProductSpecsProps {
    specifications: any;
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
    if (!specifications || Object.keys(specifications).length === 0) {
        return null;
    }

    // Handle both JSON string or object
    let specs = specifications;
    if (typeof specifications === 'string') {
        try {
            specs = JSON.parse(specifications);
        } catch (e) {
            return null; // Invalid JSON
        }
    }

    return (
        <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 capitalize">{key.replace(/_/g, ' ')}</dt>
                            <dd className="mt-1 text-sm text-gray-900 font-semibold">{String(value)}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
}
