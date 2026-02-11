import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  CONTACT,
  NAV_LINKS,
  COMPANY_TAGLINE,
  COMPANY_LOCATION,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl text-white mb-2">
              Sage Creek Group LLC
            </h3>
            <p className="font-serif text-sm italic text-white/50 mb-4">
              {COMPANY_TAGLINE}
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Commercial Real Estate Financing | $3M+
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin size={14} className="flex-shrink-0" />
              <span>{COMPANY_LOCATION}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[2px] text-white/80 mb-4 font-sans font-medium">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[2px] text-white/80 mb-4 font-sans font-medium">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-white/80">{CONTACT.tim.name}</p>
                <p>{CONTACT.tim.phone}</p>
                <a
                  href={`mailto:${CONTACT.tim.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.tim.email}
                </a>
              </div>
              <div>
                <p className="text-white/80">{CONTACT.pat.name}</p>
                <p>{CONTACT.pat.phone}</p>
                <a
                  href={`mailto:${CONTACT.pat.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.pat.email}
                </a>
              </div>
              <div>
                <p className="text-white/80">{CONTACT.jeff.name}</p>
                <p>{CONTACT.jeff.phone}</p>
                <a
                  href={`mailto:${CONTACT.jeff.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.jeff.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} Sage Creek Group LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
