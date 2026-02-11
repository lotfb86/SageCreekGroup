"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin, Calendar, CheckCircle } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { CONTACT } from "@/lib/constants";

const PROPERTY_TYPES = [
  "Multifamily",
  "Industrial",
  "Retail",
  "Office",
  "Hotel",
  "Mixed-Use",
  "Senior Housing",
  "Student Housing",
  "Medical Office",
  "Land",
  "Other",
];

const LOAN_AMOUNTS = [
  "Under $3M",
  "$3M – $5M",
  "$5M – $10M",
  "$10M – $25M",
  "$25M – $40M",
  "$40M+",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-warmgray/20 rounded-sm text-warmgray-heading focus:outline-none focus:border-sage-400 transition-colors bg-white";
  const labelClass =
    "block text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-2";

  return (
    <>
      <HeroSection
        image="/images/heroes/contact-hero.jpg"
        title="Submit Your Deal"
        height="medium"
      />

      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-3xl text-warmgray-heading mb-8">
                Tell Us About Your Deal
              </h2>

              {submitted ? (
                <div className="bg-sage-400/10 border border-sage-400/30 rounded-sm p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-sage-400/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-sage-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-warmgray-heading mb-3">
                    Deal Submitted Successfully
                  </h3>
                  <p className="text-warmgray text-sm mb-2">
                    Thank you for submitting your deal. A member of our team will
                    review your information and respond within one business day.
                  </p>
                  <p className="text-warmgray/60 text-xs">
                    Need immediate assistance? Call Tim at{" "}
                    <a href={`tel:${CONTACT.tim.phone}`} className="text-sage-400 hover:underline">
                      {CONTACT.tim.phone}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Deal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="propertyType" className={labelClass}>
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        required
                        className={inputClass}
                      >
                        <option value="">Select property type</option>
                        {PROPERTY_TYPES.map((pt) => (
                          <option key={pt} value={pt}>{pt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="loanAmount" className={labelClass}>
                        Estimated Loan Amount *
                      </label>
                      <select
                        id="loanAmount"
                        name="loanAmount"
                        required
                        className={inputClass}
                      >
                        <option value="">Select range</option>
                        {LOAN_AMOUNTS.map((la) => (
                          <option key={la} value={la}>{la}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="dealType" className={labelClass}>
                        Financing Type
                      </label>
                      <select
                        id="dealType"
                        name="dealType"
                        className={inputClass}
                      >
                        <option value="">Select financing type</option>
                        <option value="permanent">Permanent Financing</option>
                        <option value="construction">Construction Loan</option>
                        <option value="bridge">Bridge Loan</option>
                        <option value="refinance">Refinance</option>
                        <option value="acquisition">Acquisition</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="propertyLocation" className={labelClass}>
                        Property Location
                      </label>
                      <input
                        type="text"
                        id="propertyLocation"
                        name="propertyLocation"
                        placeholder="City, State"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Deal Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about the property, your business plan, and any specific financing needs..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
                  >
                    Submit Your Deal <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-sm p-8 sticky top-28 space-y-8">
                <div>
                  <h3 className="font-serif text-xl text-warmgray-heading mb-6">
                    Direct Contact
                  </h3>

                  <div className="space-y-8">
                    {/* Tim */}
                    <div>
                      <p className="text-warmgray-heading font-medium">
                        {CONTACT.tim.name}
                      </p>
                      <p className="text-warmgray text-sm mb-2">
                        {CONTACT.tim.title}
                      </p>
                      <div className="space-y-1">
                        <a
                          href={`tel:${CONTACT.tim.phone}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Phone size={14} />
                          {CONTACT.tim.phone}
                        </a>
                        <a
                          href={`mailto:${CONTACT.tim.email}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Mail size={14} />
                          {CONTACT.tim.email}
                        </a>
                      </div>
                    </div>

                    {/* Pat */}
                    <div>
                      <p className="text-warmgray-heading font-medium">
                        {CONTACT.pat.name}
                      </p>
                      <p className="text-warmgray text-sm mb-2">
                        {CONTACT.pat.title}
                      </p>
                      <div className="space-y-1">
                        <a
                          href={`tel:${CONTACT.pat.phone}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Phone size={14} />
                          {CONTACT.pat.phone}
                        </a>
                        <a
                          href={`mailto:${CONTACT.pat.email}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Mail size={14} />
                          {CONTACT.pat.email}
                        </a>
                      </div>
                    </div>

                    {/* Jeff */}
                    <div>
                      <p className="text-warmgray-heading font-medium">
                        {CONTACT.jeff.name}
                      </p>
                      <p className="text-warmgray text-sm mb-2">
                        {CONTACT.jeff.title}
                      </p>
                      <div className="space-y-1">
                        <a
                          href={`tel:${CONTACT.jeff.phone}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Phone size={14} />
                          {CONTACT.jeff.phone}
                        </a>
                        <a
                          href={`mailto:${CONTACT.jeff.email}`}
                          className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                        >
                          <Mail size={14} />
                          {CONTACT.jeff.email}
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-warmgray/10">
                      <div className="flex items-start gap-2 text-warmgray text-sm">
                        <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                        <p>
                          Pacific Northwest &amp; Nationwide
                          <br />
                          Idaho &bull; Oregon &bull; Washington
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendly Placeholder */}
                <div className="pt-6 border-t border-warmgray/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-sage-400" />
                    <h4 className="text-warmgray-heading font-medium text-sm">
                      Schedule a Call
                    </h4>
                  </div>
                  <p className="text-warmgray text-xs mb-3">
                    Prefer to talk first? Book a 15-minute introductory call.
                  </p>
                  <div className="bg-warmgray/5 rounded-sm p-4 text-center">
                    <p className="text-warmgray/60 text-xs italic">
                      Calendly integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
