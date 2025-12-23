import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8 mt-12">
            <div className="container max-w-[1200px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-poppins font-bold text-lg mb-4">CampusMart</h3>
                        <p className="text-gray-400 text-sm font-inter">
                            The #1 marketplace for students. Buy and sell safely on campus.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-poppins font-semibold mb-4">About Us</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-inter">
                            <li><Link href="#" className="hover:text-primary">Our Story</Link></li>
                            <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-poppins font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-inter">
                            <li><Link href="#" className="hover:text-primary">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary">Safety Tips</Link></li>
                            <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-poppins font-semibold mb-4">Contact</h4>
                        <p className="text-gray-400 text-sm font-inter mb-2">
                            WhatsApp: 0814-4065-5785
                        </p>
                        <p className="text-gray-400 text-sm font-inter">
                            Email: help@campusmart.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500 font-inter">
                    © 2024 CampusMart. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
