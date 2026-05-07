import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const spanishSpeakingCountries = [
  "MX", "ES", "AR", "CO", "PE", "VE", "CL", "EC", "GT", "CU", 
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR"
];

export default withAuth(
  function middleware(req: NextRequest) {
    const response = NextResponse.next();
    
    // 1. Detect Locale
    let locale = req.cookies.get("NEXT_LOCALE")?.value;
    
    if (!locale) {
      // Try to detect from Netlify/Vercel GeoIP headers
      const country = req.headers.get("x-vercel-ip-country") || 
                      req.headers.get("x-nf-geo-country") || 
                      "US";
      
      locale = spanishSpeakingCountries.includes(country.toUpperCase()) ? "es" : "en";
      
      // Set cookie for future requests
      response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    }

    // 2. Add locale to headers so layouts can access it
    response.headers.set("x-next-locale", locale);

    return response;
  },
  {
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/portal/:path*"],
};
