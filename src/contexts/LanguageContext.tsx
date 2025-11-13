import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface Translations {
  nav: {
    buy: string;
    sell: string;
    rent: string;
    aboutUs: string;
    contact: string;
    login: string;
    signup: string;
    welcome: string;
    logout: string;
    profile: string;
  };
  footer: {
    sections: {
      buy: {
        title: string;
        homesForSale: string;
        openHouses: string;
        newHomes: string;
        recentlySold: string;
        priceReduced: string;
      };
      sell: {
        title: string;
        sellYourHome: string;
        getHomeValue: string;
        sellersGuide: string;
        closingCosts: string;
        findAgent: string;
      };
      rent: {
        title: string;
        apartments: string;
        houses: string;
        postRental: string;
        rentalManager: string;
        rentalGuide: string;
      };
      mortgage: {
        title: string;
        mortgageRates: string;
        refinanceRates: string;
        mortgageCalc: string;
        affordabilityCalc: string;
        mortgageGuide: string;
      };
      resources: {
        title: string;
        findAgent: string;
        marketData: string;
        buyingGuide: string;
        realEstateNews: string;
        mobileApps: string;
      };
    };
    app: {
      title: string;
      downloadOn: string;
      appStore: string;
      getItOn: string;
      googlePlay: string;
    };
    social: {
      title: string;
    };
    legal: {
      privacyPolicy: string;
      termsOfService: string;
      cookiePolicy: string;
      accessibility: string;
      sitemap: string;
    };
    copyright: string;
    disclaimer: string;
  };
  pages: {
    home: {
      hero: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        searchStartLabel: string;
        location: string;
        propertyType: string;
        priceRange: string;
        searchButton: string;
      };
      stats: {
        propertiesLabel: string;
        propertiesCount: string;
        agentsLabel: string;
        agentsCount: string;
        citiesLabel: string;
        citiesCount: string;
        satisfactionLabel: string;
        satisfactionCount: string;
      };
      featured: {
        title: string;
        subtitle: string;
        viewAll: string;
        forSale: string;
        forRent: string;
        beds: string;
        baths: string;
        sqft: string;
        propertyType: string;
      };
      locations: {
        title: string;
        subtitle: string;
        viewMap: string;
        beirut: string;
        jounieh: string;
        byblos: string;
        tripoli: string;
        saida: string;
        batroun: string;
        zahle: string;
        tyre: string;
        properties: string;
      };
      agents: {
        title: string;
        subtitle: string;
        viewAllAgents: string;
        successfulDeals: string;
        viewProfile: string;
      };
      news: {
        title: string;
        subtitle: string;
        viewAllArticles: string;
        minRead: string;
      };
    };
    about: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
      };
      ourStory: {
        title: string;
        paragraph1: string;
        paragraph2: string;
      };
      mission: {
        title: string;
        description: string;
      };
      vision: {
        title: string;
        description: string;
      };
      founders: {
        title: string;
        subtitle: string;
        ayman: {
          name: string;
          title: string;
          deals: string;
          description: string;
          phone: string;
          email: string;
        };
        richy: {
          name: string;
          title: string;
          deals: string;
          description: string;
          phone: string;
          email: string;
        };
      };
      contact: {
        title: string;
        subtitle: string;
        visitUs: string;
        visitAddress: string;
        callUs: string;
        callDetails: string;
        emailUs: string;
        emailDetails: string;
      };
    };
    contact: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
      };
      form: {
        title: string;
        description: string;
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        send: string;
        messageSentSuccess: string;
        messageSentError: string;
      };
      info: {
        location: string;
        address: string;
        callUs: string;
        email: string;
        phone: string;
        whatsapp: string;
        hours: string;
        businessHours: string;
        getDirections: string;
        sendEmail: string;
      };
      sidebar: {
        title: string;
        features: string[];
      };
      followUs: string;
      connectWith: string;
    };
    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      rememberMe: string;
      forgotPassword: string;
      loginButton: string;
      noAccount: string;
      signupLink: string;
      orContinueWith: string;
    };
    signup: {
      title: string;
      subtitle: string;
      form: {
        fullName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        passwordStrength: string;
        passwordStrengthWeak: string;
        passwordStrengthFair: string;
        passwordStrengthGood: string;
        passwordStrengthStrong: string;
        createAccount: string;
        termsPrefix: string;
        termsPart1: string;
        termsLink: string;
        termsPart2: string;
        privacyLink: string;
      };
      success: {
        title: string;
        description: string;
        redirecting: string;
      };
      social: {
        orContinueWith: string;
        google: string;
        facebook: string;
        apple: string;
      };
      login: {
        haveAccount: string;
        link: string;
      };
      validation: {
        fillAllFields: string;
        invalidEmail: string;
        passwordTooShort: string;
        passwordsMismatch: string;
        passwordsMismatchError: string;
        agreeToTerms: string;
      };
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      backToLogin: string;
      form: {
        email: string;
        sendResetLink: string;
      };
      success: {
        title: string;
        description: string;
        emailSentTo: string;
        checkSpam: string;
        backToLogin: string;
      };
      remember: {
        question: string;
        link: string;
      };
      validation: {
        emailRequired: string;
        invalidEmail: string;
      };
    };
    listings: {
      title: string;
      available: string;
      property: string;
      properties: string;
      filter: {
        title: string;
        transactionType: string;
        city: string;
        allCities: string;
        propertyType: string;
        allTypes: string;
        priceRange: string;
        minBedrooms: string;
        minBathrooms: string;
        any: string;
        features: string;
        clearFilters: string;
        filtersButton: string;
        results: string;
      };
      transactionTypes: {
        all: string;
        sale: string;
        rent: string;
      };
      noResults: {
        title: string;
        subtitle: string;
        clearButton: string;
      };
      pagination: {
        showing: string;
        of: string;
      };
    };
    listingDetail: {
      backToListings: string;
      propertyNotFound: string;
      forSale: string;
      forRent: string;
      perMonth: string;
      specs: {
        bedrooms: string;
        bathrooms: string;
        sqft: string;
        parking: string;
      };
      sections: {
        description: string;
        propertyDetails: string;
        featuresAmenities: string;
        location: string;
        mapComingSoon: string;
      };
      details: {
        propertyType: string;
        yearBuilt: string;
        furnished: string;
        status: string;
        yes: string;
        no: string;
      };
      agent: {
        title: string;
        sendInquiry: string;
        yourName: string;
        email: string;
        phone: string;
        message: string;
        messagePlaceholder: string;
        sendMessage: string;
        successMessage: string;
      };
      similar: {
        title: string;
      };
    };
    sell: {
      hero: {
        title: string;
        subtitle: string;
      };
      steps: {
        accountType: string;
        subscriptionPlan: string;
        propertyDetails: string;
        features: string;
        photos: string;
      };
      accountType: {
        title: string;
        description: string;
        owner: {
          title: string;
          description: string;
        };
        realtor: {
          title: string;
          description: string;
        };
        ownerInfo: string;
        realtorInfo: string;
      };
      subscription: {
        title: string;
        description: string;
        monthly: string;
        yearly: string;
        savingsBadge: string;
      };
      propertyDetails: {
        title: string;
        propertyTitle: string;
        propertyTitlePlaceholder: string;
        propertyType: string;
        listingType: string;
        forSale: string;
        forRent: string;
        price: string;
        pricePlaceholder: string;
        city: string;
        location: string;
        locationPlaceholder: string;
        description: string;
        descriptionPlaceholder: string;
      };
      features: {
        title: string;
        bedrooms: string;
        bathrooms: string;
        area: string;
        areaPlaceholder: string;
        parking: string;
        yearBuilt: string;
        yearBuiltPlaceholder: string;
        selectFeatures: string;
        balcony: string;
        garden: string;
        pool: string;
        gym: string;
        security: string;
        elevator: string;
        heating: string;
        ac: string;
        furnished: string;
        seaView: string;
        mountainView: string;
        parkingSpace: string;
      };
      photos: {
        title: string;
        upload: string;
        uploadDescription: string;
        dragDrop: string;
        maxImages: string;
        contactTitle: string;
        fullName: string;
        email: string;
        phone: string;
        phonePlaceholder: string;
        warningRealtor: string;
        agencyName: string;
        agencyPlaceholder: string;
        licenseNumber: string;
        licensePlaceholder: string;
        infoOwner: string;
        infoRealtor: string;
      };
      buttons: {
        back: string;
        next: string;
        submit: string;
        submitting: string;
      };
      propertyTypes: {
        apartment: string;
        house: string;
        villa: string;
        penthouse: string;
        studio: string;
        duplex: string;
        land: string;
        commercial: string;
      };
      cities: {
        beirut: string;
        mountLebanon: string;
        tripoli: string;
        sidon: string;
        tyre: string;
        jounieh: string;
        byblos: string;
        zahle: string;
      };
    };
    common: {
      learnMore: string;
      viewDetails: string;
      contactUs: string;
      getStarted: string;
      backToHome: string;
      loading: string;
      save: string;
      cancel: string;
      next: string;
      previous: string;
      close: string;
      searchProperties: string;
    };
  };
  components: {
    propertyCard: {
      forSale: string;
      forRent: string;
      featured: string;
      beds: string;
      baths: string;
      sqft: string;
      perMonth: string;
    };
  };
  locations: {
    cities: Record<string, string>;
    neighborhoods: Record<string, string>;
  };
  listingTitles: Record<string, string>;
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      buy: "Buy",
      sell: "Sell",
      rent: "Rent",
      aboutUs: "About Us",
      contact: "Contact",
      login: "Log in",
      signup: "Sign up",
      welcome: "Welcome",
      logout: "Logout",
      profile: "Profile",
    },
    footer: {
      sections: {
        buy: {
          title: "Buy",
          homesForSale: "Homes for sale",
          openHouses: "Open houses",
          newHomes: "New homes",
          recentlySold: "Recently sold",
          priceReduced: "Price reduced",
        },
        sell: {
          title: "Sell",
          sellYourHome: "Sell your home",
          getHomeValue: "Get home value",
          sellersGuide: "Seller's guide",
          closingCosts: "Closing costs calculator",
          findAgent: "Find a seller's agent",
        },
        rent: {
          title: "Rent",
          apartments: "Apartments for rent",
          houses: "Houses for rent",
          postRental: "Post a rental listing",
          rentalManager: "Rental manager",
          rentalGuide: "Rental guide",
        },
        mortgage: {
          title: "Mortgage & Finance",
          mortgageRates: "Mortgage rates",
          refinanceRates: "Refinance rates",
          mortgageCalc: "Mortgage calculator",
          affordabilityCalc: "Affordability calculator",
          mortgageGuide: "Mortgage guide",
        },
        resources: {
          title: "Resources",
          findAgent: "Find an agent",
          marketData: "Market data",
          buyingGuide: "Home buying guide",
          realEstateNews: "Real estate news",
          mobileApps: "Mobile apps",
        },
      },
      app: {
        title: "Get the RealtyFinder app",
        downloadOn: "Download on the",
        appStore: "App Store",
        getItOn: "Get it on",
        googlePlay: "Google Play",
      },
      social: {
        title: "Follow us",
      },
      legal: {
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        cookiePolicy: "Cookie Policy",
        accessibility: "Accessibility",
        sitemap: "Sitemap",
      },
      copyright: "© 2024 RealtyFinder. All rights reserved.",
      disclaimer:
        "All information provided is deemed reliable but is not guaranteed and should be independently verified.",
    },
    pages: {
      home: {
        hero: {
          title: "Find Your Dream Home",
          subtitle:
            "Discover the perfect property with our comprehensive real estate platform",
          searchPlaceholder: "Enter city, neighborhood or ZIP code",
          searchStartLabel: "Start Your Property Search",
          location: "Location",
          propertyType: "Property Type",
          priceRange: "Price Range",
          searchButton: "Search Properties",
        },
        stats: {
          propertiesLabel: "Properties Listed",
          propertiesCount: "5,000+",
          agentsLabel: "Expert Agents",
          agentsCount: "200+",
          citiesLabel: "Cities Covered",
          citiesCount: "15+",
          satisfactionLabel: "Customer Satisfaction",
          satisfactionCount: "98%",
        },
        featured: {
          title: "Featured Properties",
          subtitle:
            "Discover our handpicked selection of premium properties across Lebanon",
          viewAll: "View All Properties",
          forSale: "For Sale",
          forRent: "For Rent",
          beds: "Beds",
          baths: "Baths",
          sqft: "sqft",
          propertyType: "Property Type",
        },
        locations: {
          title: "Explore Properties by Location",
          subtitle:
            "Find your perfect home in Lebanon's most desirable locations",
          viewMap: "View Interactive Map",
          beirut: "Beirut",
          jounieh: "Jounieh",
          byblos: "Byblos",
          tripoli: "Tripoli",
          saida: "Saida",
          batroun: "Batroun",
          zahle: "Zahle",
          tyre: "Tyre",
          properties: "Properties",
        },
        agents: {
          title: "Meet Our Expert Agents",
          subtitle: "Work with the best real estate professionals in Lebanon",
          viewAllAgents: "Meet All Our Agents",
          successfulDeals: "Successful Deals",
          viewProfile: "View Profile",
        },
        news: {
          title: "Latest Insights & News",
          subtitle:
            "Stay informed with the latest real estate trends and market updates",
          viewAllArticles: "View All Articles",
          minRead: "min read",
        },
      },
      about: {
        hero: {
          title: "About Manzilocom Lebanon",
          subtitle: "Lebanon's Premier Real Estate Discovery Platform",
          description:
            "Connecting Lebanese property seekers with their dream homes across Beirut, Mount Lebanon, and beyond.",
        },
        ourStory: {
          title: "Our Story",
          paragraph1:
            "Born from a passion for Lebanon's diverse real estate landscape, Manzilocom was founded in 2020 by two visionary real estate professionals—Ayman Sbeity and Richy—who recognized the need for a modern, transparent platform to connect property seekers with their ideal homes. With deep roots in the Lebanese market and an intimate understanding of the unique challenges facing buyers, sellers, and investors, our founders combined their decades of experience to create a solution that truly serves the Lebanese community.",
          paragraph2:
            "From the coastal properties of Beirut to the mountain retreats of Mount Lebanon, from bustling commercial spaces in Tripoli to elegant villas in Jounieh, we've built our reputation on trust, expertise, and an unwavering commitment to our clients' success. Today, Manzilocom stands as Lebanon's trusted partner in real estate discovery, having facilitated over 380 successful transactions and counting.",
        },
        mission: {
          title: "Our Mission",
          description:
            "To empower the Lebanese community with innovative tools, comprehensive market insights, and personalized service that makes real estate decisions confident and informed. We're committed to maintaining the highest standards of transparency, integrity, and professionalism while honoring Lebanon's rich cultural heritage and architectural diversity.",
        },
        vision: {
          title: "Our Vision",
          description:
            "To be recognized as Lebanon's most trusted and innovative real estate platform, setting new benchmarks for excellence in property services while contributing to the growth and prosperity of Lebanese communities. We envision a future where every Lebanese resident and diaspora member can effortlessly connect with their dream property in their homeland.",
        },
        founders: {
          title: "Meet Our Founders",
          subtitle:
            "With over 380 successful deals combined, our founders bring unparalleled expertise and dedication to every client.",
          ayman: {
            name: "Ayman Sbeity",
            title: "Luxury Properties & Investment Specialist",
            deals: "200+ Successful Deals",
            description:
              "Co-founder and luxury property expert with an exceptional track record in high-end residential and investment properties across Lebanon. Ayman's deep market knowledge and client-first approach have made him a trusted advisor for discerning buyers and investors.",
            phone: "+961 3 123 456",
            email: "ayman@realty.com",
          },
          richy: {
            name: "Richy",
            title: "Residential & Commercial Sales Expert",
            deals: "180+ Successful Deals",
            description:
              "Co-founder specializing in residential and commercial properties throughout Lebanon. Richy's dedication to understanding client needs and delivering exceptional results has earned him recognition as one of Lebanon's most reliable real estate professionals.",
            phone: "+961 3 234 567",
            email: "richy@realty.com",
          },
        },
        contact: {
          title: "Get In Touch",
          subtitle:
            "Ready to find your dream property in Lebanon? We're here to help you every step of the way.",
          visitUs: "Visit Us",
          visitAddress:
            "Downtown Beirut\nMartyr's Square District\nBeirut, Lebanon",
          callUs: "Call Us",
          callDetails:
            "Ayman: +961 3 123 456\nRichy: +961 3 234 567\nAvailable 7 days a week",
          emailUs: "Email Us",
          emailDetails:
            "info@realtyfinder.com\nsupport@realtyfinder.com\nQuick response guaranteed",
        },
      },
      contact: {
        hero: {
          title: "Get in Touch",
          subtitle: "We're here to help you find your dream property",
          description:
            "Have questions? Our expert team is ready to assist you with any inquiries about properties in Lebanon.",
        },
        form: {
          title: "Send us a Message",
          description:
            "Fill out the form below and our team will get back to you within 24 hours. We're excited to help you find your perfect property!",
          name: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          subject: "Subject",
          message: "Your Message",
          send: "Send Message",
          messageSentSuccess:
            "Message sent successfully! We'll get back to you soon.",
          messageSentError: "Please fill in all required fields correctly.",
        },
        info: {
          location: "Our Office",
          address: "Downtown Beirut, Martyr's Square District, Beirut, Lebanon",
          callUs: "Call Us",
          email: "Email Us",
          phone: "Phone",
          whatsapp: "WhatsApp",
          hours: "Business Hours",
          businessHours:
            "Monday - Friday: 9:00 AM - 7:00 PM, Saturday: 10:00 AM - 5:00 PM, Sunday: By Appointment",
          getDirections: "Get Directions",
          sendEmail: "Send Email",
        },
        sidebar: {
          title: "Why Choose Manzilocom?",
          features: [
            "380+ Successful Deals",
            "Expert Market Knowledge",
            "24/7 Customer Support",
            "Verified Property Listings",
            "Transparent Transactions",
            "Local Expertise in Lebanon",
          ],
        },
        followUs:
          "Follow us on social media for the latest property listings, market insights, and real estate tips.",
        connectWith: "Connect With Us",
      },
      login: {
        title: "Welcome Back",
        subtitle: "Sign in to continue to your account",
        email: "Email Address",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        loginButton: "Sign In",
        noAccount: "Don't have an account?",
        signupLink: "Sign up",
        orContinueWith: "Or continue with",
      },
      signup: {
        title: "Create Account",
        subtitle: "Join us to discover amazing properties",
        form: {
          fullName: "Full Name",
          email: "Email Address",
          phone: "Phone Number (Optional)",
          password: "Password",
          confirmPassword: "Confirm Password",
          passwordStrength: "Password strength:",
          passwordStrengthWeak: "Weak",
          passwordStrengthFair: "Fair",
          passwordStrengthGood: "Good",
          passwordStrengthStrong: "Strong",
          createAccount: "Create Account",
          termsPrefix: "I agree to the",
          termsPart1: "Terms and Conditions",
          termsLink: "/terms",
          termsPart2: "and",
          privacyLink: "Privacy Policy",
        },
        success: {
          title: "Account Created!",
          description: "Your account has been successfully created.",
          redirecting: "Redirecting to login...",
        },
        social: {
          orContinueWith: "OR",
          google: "Google",
          facebook: "Facebook",
          apple: "Apple",
        },
        login: {
          haveAccount: "Already have an account?",
          link: "Log In",
        },
        validation: {
          fillAllFields: "Please fill in all required fields",
          invalidEmail: "Please enter a valid email address",
          passwordTooShort: "Password must be at least 8 characters long",
          passwordsMismatch: "Passwords do not match",
          passwordsMismatchError: "Passwords do not match",
          agreeToTerms: "Please agree to the Terms and Conditions",
        },
      },
      forgotPassword: {
        title: "Forgot Password?",
        subtitle:
          "Enter your email and we'll send you a link to reset your password",
        backToLogin: "Back to Login",
        form: {
          email: "Email Address",
          sendResetLink: "Send Reset Link",
        },
        success: {
          title: "Check Your Email",
          description: "We've sent a password reset link to",
          emailSentTo: "your email address",
          checkSpam:
            "Click the link in the email to reset your password. If you don't see it, check your spam folder.",
          backToLogin: "Back to Login",
        },
        remember: {
          question: "Remember your password?",
          link: "Log In",
        },
        validation: {
          emailRequired: "Please enter your email address",
          invalidEmail: "Please enter a valid email address",
        },
      },
      listings: {
        title: "Property Listings",
        available: "available",
        property: "property",
        properties: "properties",
        filter: {
          title: "Filter Listings",
          transactionType: "Transaction Type",
          city: "City",
          allCities: "All Cities",
          propertyType: "Property Type",
          allTypes: "All Types",
          priceRange: "Price Range",
          minBedrooms: "Minimum Bedrooms",
          minBathrooms: "Minimum Bathrooms",
          any: "Any",
          features: "Features",
          clearFilters: "Clear All Filters",
          filtersButton: "Filters",
          results: "Results",
        },
        transactionTypes: {
          all: "All",
          sale: "For Sale",
          rent: "For Rent",
        },
        noResults: {
          title: "No properties found",
          subtitle: "Try adjusting your filters to see more results",
          clearButton: "Clear All Filters",
        },
        pagination: {
          showing: "Showing",
          of: "of",
        },
      },
      listingDetail: {
        backToListings: "Back to Listings",
        propertyNotFound: "Property Not Found",
        forSale: "For Sale",
        forRent: "For Rent",
        perMonth: "/month",
        specs: {
          bedrooms: "Bedrooms",
          bathrooms: "Bathrooms",
          sqft: "Sqft",
          parking: "Parking",
        },
        sections: {
          description: "Description",
          propertyDetails: "Property Details",
          featuresAmenities: "Features & Amenities",
          location: "Location",
          mapComingSoon: "Interactive map coming soon",
        },
        details: {
          propertyType: "Property Type",
          yearBuilt: "Year Built",
          furnished: "Furnished",
          status: "Status",
          yes: "Yes",
          no: "No",
        },
        agent: {
          title: "Real Estate Agent",
          sendInquiry: "Send Inquiry",
          yourName: "Your Name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          messagePlaceholder: "I'm interested in this property...",
          sendMessage: "Send Message",
          successMessage: "Thank you! Your inquiry has been sent to the agent.",
        },
        similar: {
          title: "Similar Properties",
        },
      },
      sell: {
        hero: {
          title: "List Your Property",
          subtitle:
            "Reach thousands of potential buyers and renters across Lebanon",
        },
        steps: {
          accountType: "Account Type",
          subscriptionPlan: "Subscription Plan",
          propertyDetails: "Property Details",
          features: "Features & Amenities",
          photos: "Photos & Contact",
        },
        accountType: {
          title: "Who are you?",
          description: "Please select your account type to continue",
          owner: {
            title: "Property Owner",
            description:
              "I own the property and want to sell or rent it directly",
          },
          realtor: {
            title: "Real Estate Agent",
            description:
              "I'm a licensed realtor representing the property owner",
          },
          ownerInfo:
            "As a property owner, you can list your property directly without any agency fees.",
          realtorInfo:
            "As a realtor, you'll need to provide your agency information and license number.",
        },
        subscription: {
          title: "Choose Your Perfect Plan",
          description:
            "Select the plan that best fits your property listing needs",
          monthly: "Monthly",
          yearly: "Yearly",
          savingsBadge: "Save up to 20%",
        },
        propertyDetails: {
          title: "Property Details",
          propertyTitle: "Property Title",
          propertyTitlePlaceholder: "e.g., Luxury 3BR Apartment in Achrafieh",
          propertyType: "Property Type",
          listingType: "Listing Type",
          forSale: "For Sale",
          forRent: "For Rent",
          price: "Price",
          pricePlaceholder: "e.g., 450000",
          city: "City",
          location: "Location / Address",
          locationPlaceholder: "e.g., Sassine Square, Achrafieh",
          description: "Property Description",
          descriptionPlaceholder: "Describe your property in detail...",
        },
        features: {
          title: "Features & Amenities",
          bedrooms: "Bedrooms",
          bathrooms: "Bathrooms",
          area: "Area (sqm)",
          areaPlaceholder: "Area in square meters",
          parking: "Parking Spaces",
          yearBuilt: "Year Built",
          yearBuiltPlaceholder: "e.g., 2020",
          selectFeatures: "Select Features",
          balcony: "Balcony",
          garden: "Garden",
          pool: "Swimming Pool",
          gym: "Gym",
          security: "Security",
          elevator: "Elevator",
          heating: "Central Heating",
          ac: "Air Conditioning",
          furnished: "Furnished",
          seaView: "Sea View",
          mountainView: "Mountain View",
          parkingSpace: "Parking",
        },
        photos: {
          title: "Property Photos",
          upload: "Upload Property Images",
          uploadDescription: "Click to select or drag and drop images here",
          dragDrop: "Click to select or drag and drop images here",
          maxImages: "Maximum 10 images, JPG or PNG",
          contactTitle: "Contact Information",
          fullName: "Full Name",
          email: "Email",
          phone: "Phone Number",
          phonePlaceholder: "+961 3 XXX XXX",
          warningRealtor:
            "As a real estate agent, please provide your professional credentials",
          agencyName: "Agency Name",
          agencyPlaceholder: "e.g., Century 21 Lebanon",
          licenseNumber: "License Number",
          licensePlaceholder: "e.g., RE-123456",
          infoOwner:
            "Your contact information will be displayed to interested buyers/renters.",
          infoRealtor:
            "Your agency information and license will be verified before listing approval.",
        },
        buttons: {
          back: "Back",
          next: "Next",
          submit: "Submit Listing",
          submitting: "Submitting...",
        },
        propertyTypes: {
          apartment: "Apartment",
          house: "House",
          villa: "Villa",
          penthouse: "Penthouse",
          studio: "Studio",
          duplex: "Duplex",
          land: "Land",
          commercial: "Commercial",
        },
        cities: {
          beirut: "Beirut",
          mountLebanon: "Mount Lebanon",
          tripoli: "Tripoli",
          sidon: "Sidon",
          tyre: "Tyre",
          jounieh: "Jounieh",
          byblos: "Byblos",
          zahle: "Zahle",
        },
      },
      common: {
        learnMore: "Learn More",
        viewDetails: "View Details",
        contactUs: "Contact Us",
        getStarted: "Get Started",
        backToHome: "Back to Home",
        loading: "Loading...",
        save: "Save",
        cancel: "Cancel",
        next: "Next",
        previous: "Previous",
        close: "Close",
        searchProperties: "Search Properties",
      },
    },
    components: {
      propertyCard: {
        forSale: "For Sale",
        forRent: "For Rent",
        featured: "Featured",
        beds: "Beds",
        baths: "Baths",
        sqft: "sqft",
        perMonth: "/mo",
      },
    },
    locations: {
      cities: {
        Beirut: "Beirut",
        Jounieh: "Jounieh",
        Byblos: "Byblos",
        Tripoli: "Tripoli",
        Saida: "Saida",
        Batroun: "Batroun",
        Zahle: "Zahle",
        Tyre: "Tyre",
      },
      neighborhoods: {
        Achrafieh: "Achrafieh",
        Maameltein: "Maameltein",
        "Old Souk": "Old Souk",
        Downtown: "Downtown",
        Mina: "Mina",
        Verdun: "Verdun",
        "Sea Road": "Sea Road",
      },
    },
    listingTitles: {
      "1": "Luxury Villa in Achrafieh",
      "2": "Modern Apartment in Maameltein",
      "3": "Beachfront Property in Byblos",
      "4": "Spacious House in Batroun",
      "5": "Downtown Beirut Apartment",
      "6": "Tripoli Family Home",
      "7": "Luxury Condo in Verdun",
      "8": "Cozy Apartment in Saida",
    },
  },
  ar: {
    nav: {
      buy: "شراء",
      sell: "بيع",
      rent: "إيجار",
      aboutUs: "من نحن",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      welcome: "مرحبا",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
    },
    footer: {
      sections: {
        buy: {
          title: "شراء",
          homesForSale: "منازل للبيع",
          openHouses: "منازل مفتوحة",
          newHomes: "منازل جديدة",
          recentlySold: "تم بيعها مؤخراً",
          priceReduced: "تخفيض السعر",
        },
        sell: {
          title: "بيع",
          sellYourHome: "بيع منزلك",
          getHomeValue: "احصل على قيمة المنزل",
          sellersGuide: "دليل البائع",
          closingCosts: "حاسبة تكاليف الإغلاق",
          findAgent: "ابحث عن وكيل بائع",
        },
        rent: {
          title: "إيجار",
          apartments: "شقق للإيجار",
          houses: "منازل للإيجار",
          postRental: "انشر إعلان إيجار",
          rentalManager: "مدير التأجير",
          rentalGuide: "دليل الإيجار",
        },
        mortgage: {
          title: "الرهن العقاري والتمويل",
          mortgageRates: "أسعار الرهن العقاري",
          refinanceRates: "أسعار إعادة التمويل",
          mortgageCalc: "حاسبة الرهن العقاري",
          affordabilityCalc: "حاسبة القدرة الشرائية",
          mortgageGuide: "دليل الرهن العقاري",
        },
        resources: {
          title: "الموارد",
          findAgent: "ابحث عن وكيل",
          marketData: "بيانات السوق",
          buyingGuide: "دليل شراء المنزل",
          realEstateNews: "أخبار العقارات",
          mobileApps: "تطبيقات الجوال",
        },
      },
      app: {
        title: "احصل على تطبيق RealtyFinder",
        downloadOn: "حمله على",
        appStore: "متجر التطبيقات",
        getItOn: "احصل عليه من",
        googlePlay: "جوجل بلاي",
      },
      social: {
        title: "تابعنا",
      },
      legal: {
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        cookiePolicy: "سياسة الكوكيز",
        accessibility: "إمكانية الوصول",
        sitemap: "خريطة الموقع",
      },
      copyright: "© 2024 RealtyFinder. جميع الحقوق محفوظة.",
      disclaimer:
        "جميع المعلومات المقدمة تعتبر موثوقة ولكنها غير مضمونة ويجب التحقق منها بشكل مستقل.",
    },
    pages: {
      home: {
        hero: {
          title: "اعثر على منزل أحلامك",
          subtitle: "اكتشف العقار المثالي مع منصتنا الشاملة للعقارات",
          searchPlaceholder: "أدخل المدينة أو الحي أو الرمز البريدي",
          searchStartLabel: "ابدأ بحث العقارات الخاص بك",
          location: "الموقع",
          propertyType: "نوع العقار",
          priceRange: "نطاق السعر",
          searchButton: "بحث عن عقارات",
        },
        stats: {
          propertiesLabel: "عقار مدرج",
          propertiesCount: "5,000+",
          agentsLabel: "وكلاء خبراء",
          agentsCount: "200+",
          citiesLabel: "المدن المغطاة",
          citiesCount: "15+",
          satisfactionLabel: "رضا العملاء",
          satisfactionCount: "98%",
        },
        featured: {
          title: "عقارات مميزة",
          subtitle:
            "اكتشف مجموعتنا المختارة بعناية من العقارات الفاخرة في جميع أنحاء لبنان",
          viewAll: "عرض جميع العقارات",
          forSale: "للبيع",
          forRent: "للإيجار",
          beds: "غرف نوم",
          baths: "حمامات",
          sqft: "قدم مربع",
          propertyType: "نوع العقار",
        },
        locations: {
          title: "استكشف العقارات حسب الموقع",
          subtitle: "ابحث عن منزل أحلامك في أكثر المواقع المرغوبة في لبنان",
          viewMap: "عرض الخريطة التفاعلية",
          beirut: "بيروت",
          jounieh: "جونية",
          byblos: "جبيل",
          tripoli: "طرابلس",
          saida: "صيدا",
          batroun: "بطرون",
          zahle: "زحلة",
          tyre: "صور",
          properties: "عقار",
        },
        agents: {
          title: "تعرف على وكلائنا الخبراء",
          subtitle: "اعمل مع أفضل المهنيين العقاريين في لبنان",
          viewAllAgents: "قابل جميع وكلائنا",
          successfulDeals: "صفقة ناجحة",
          viewProfile: "عرض الملف الشخصي",
        },
        news: {
          title: "أحدث الأفكار والأخبار",
          subtitle: "ابق على اطلاع مع أحدث اتجاهات العقارات وتحديثات السوق",
          viewAllArticles: "عرض جميع المقالات",
          minRead: "دقائق قراءة",
        },
      },
      about: {
        hero: {
          title: "حول منزلوكوم لبنان",
          subtitle: "منصة اكتشاف العقارات الرائدة في لبنان",
          description:
            "ربط الباحثين عن العقارات اللبنانية بمنازل أحلامهم في جميع أنحاء بيروت وجبل لبنان وما بعده.",
        },
        ourStory: {
          title: "قصتنا",
          paragraph1:
            "ولدت منزلوكوم من شغف بالمشهد العقاري المتنوع في لبنان، وتأسست في عام 2020 على يد اثنين من المحترفين الرؤيويين في مجال العقارات - أيمن الصبيتي وريتشي - اللذين أدركا الحاجة إلى منصة حديثة وشفافة لربط الباحثين عن العقارات بمنازلهم المثالية. بجذور عميقة في السوق اللبناني وفهم عميق للتحديات الفريدة التي تواجه المشترين والبائعين والمستثمرين، جمع مؤسسونا عقودًا من الخبرة لإنشاء حل يخدم المجتمع اللبناني حقًا.",
          paragraph2:
            "من العقارات الساحلية في بيروت إلى المنتجعات الجبلية في جبل لبنان، من المساحات التجارية الصاخبة في طرابلس إلى الفلل الأنيقة في جونيه، بنينا سمعتنا على الثقة والخبرة والالتزام الثابت بنجاح عملائنا. اليوم، تقف منزلوكوم كشريك لبنان الموثوق به في اكتشاف العقارات، بعد أن سهلت أكثر من 380 معاملة ناجحة ومستمرة.",
        },
        mission: {
          title: "مهمتنا",
          description:
            "تمكين المجتمع اللبناني بأدوات مبتكرة ورؤى شاملة للسوق وخدمة شخصية تجعل القرارات العقارية واثقة ومستنيرة. نحن ملتزمون بالحفاظ على أعلى معايير الشفافية والنزاهة والاحترافية مع تكريم التراث الثقافي الغني والتنوع المعماري للبنان.",
        },
        vision: {
          title: "رؤيتنا",
          description:
            "أن نكون معترف بنا كمنصة العقارات الأكثر موثوقية وابتكارًا في لبنان، ووضع معايير جديدة للتميز في خدمات العقارات مع المساهمة في نمو وازدهار المجتمعات اللبنانية. نتصور مستقبلاً حيث يمكن لكل مقيم لبناني وعضو في الشتات الاتصال بسهولة بممتلكاتهم المثالية في وطنهم.",
        },
        founders: {
          title: "تعرف على مؤسسينا",
          subtitle:
            "مع أكثر من 380 صفقة ناجحة مجتمعة، يجلب مؤسسونا خبرة لا مثيل لها وتفانيًا لكل عميل.",
          ayman: {
            name: "أيمن الصبيتي",
            title: "متخصص في العقارات الفاخرة والاستثمار",
            deals: "200+ صفقة ناجحة",
            description:
              "مؤسس مشارك وخبير عقارات فاخرة مع سجل استثنائي في العقارات السكنية والاستثمارية الراقية في جميع أنحاء لبنان. جعلت معرفة أيمن العميقة بالسوق ونهجه الذي يضع العميل أولاً منه مستشارًا موثوقًا للمشترين والمستثمرين المميزين.",
            phone: "+961 3 123 456",
            email: "ayman@realty.com",
          },
          richy: {
            name: "ريتشي",
            title: "خبير مبيعات عقارات سكنية وتجارية",
            deals: "180+ صفقة ناجحة",
            description:
              "مؤسس مشارك متخصص في العقارات السكنية والتجارية في جميع أنحاء لبنان. لقد جعله تفاني ريتشي في فهم احتياجات العملاء وتقديم نتائج استثنائية معترفًا به كأحد أكثر المحترفين العقاريين موثوقية في لبنان.",
            phone: "+961 3 234 567",
            email: "richy@realty.com",
          },
        },
        contact: {
          title: "تواصل معنا",
          subtitle:
            "هل أنت مستعد للعثور على عقار أحلامك في لبنان؟ نحن هنا لمساعدتك في كل خطوة على الطريق.",
          visitUs: "قم بزيارتنا",
          visitAddress: "وسط بيروت\nمنطقة ساحة الشهداء\nبيروت، لبنان",
          callUs: "اتصل بنا",
          callDetails:
            "أيمن: +961 3 123 456\nريتشي: +961 3 234 567\nمتاح 7 أيام في الأسبوع",
          emailUs: "راسلنا عبر البريد الإلكتروني",
          emailDetails:
            "info@realtyfinder.com\nsupport@realtyfinder.com\nاستجابة سريعة مضمونة",
        },
      },
      contact: {
        hero: {
          title: "تواصل معنا",
          subtitle: "نحن هنا لمساعدتك في العثور على عقار أحلامك",
          description:
            "هل لديك أسئلة؟ فريقنا الخبير مستعد لمساعدتك بشأن أي استفسارات عن العقارات في لبنان.",
        },
        form: {
          title: "أرسل لنا رسالة",
          description:
            "أكمل النموذج أدناه وسيعود إليك فريقنا في غضون 24 ساعة. نحن متحمسون لمساعدتك في العثور على العقار المثالي!",
          name: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          subject: "الموضوع",
          message: "رسالتك",
          send: "إرسال الرسالة",
          messageSentSuccess: "تم إرسال الرسالة بنجاح! سنعود إليك قريباً.",
          messageSentError: "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.",
        },
        info: {
          location: "مكتبنا",
          address: "وسط بيروت، حي ساحة الشهداء، بيروت، لبنان",
          callUs: "اتصل بنا",
          email: "راسلنا",
          phone: "الهاتف",
          whatsapp: "واتساب",
          hours: "ساعات العمل",
          businessHours:
            "الاثنين - الجمعة: 9:00 صباحاً - 7:00 مساءً، السبت: 10:00 صباحاً - 5:00 مساءً، الأحد: بموعد",
          getDirections: "احصل على الاتجاهات",
          sendEmail: "إرسال بريد إلكتروني",
        },
        sidebar: {
          title: "لماذا اختيار Manzilocom؟",
          features: [
            "380+ صفقة ناجحة",
            "معرفة متخصصة بالسوق",
            "دعم العملاء 24/7",
            "قوائم عقارات موثقة",
            "معاملات شفافة",
            "خبرة محلية في لبنان",
          ],
        },
        followUs:
          "تابعنا على وسائل التواصل الاجتماعي للحصول على أحدث قوائم العقارات والرؤى السوقية ونصائح العقارات.",
        connectWith: "تواصل معنا",
      },
      login: {
        title: "مرحباً بعودتك",
        subtitle: "سجل الدخول للمتابعة إلى حسابك",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        rememberMe: "تذكرني",
        forgotPassword: "هل نسيت كلمة المرور؟",
        loginButton: "تسجيل الدخول",
        noAccount: "ليس لديك حساب؟",
        signupLink: "إنشاء حساب",
        orContinueWith: "أو تابع مع",
      },
      signup: {
        title: "إنشاء حساب",
        subtitle: "انضم إلينا لاكتشاف خصائص رائعة",
        form: {
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف (اختياري)",
          password: "كلمة المرور",
          confirmPassword: "تأكيد كلمة المرور",
          passwordStrength: "قوة كلمة المرور:",
          passwordStrengthWeak: "ضعيفة",
          passwordStrengthFair: "متوسطة",
          passwordStrengthGood: "جيدة",
          passwordStrengthStrong: "قوية",
          createAccount: "إنشاء حساب",
          termsPrefix: "أوافق على",
          termsPart1: "الشروط والأحكام",
          termsLink: "/terms",
          termsPart2: "و",
          privacyLink: "سياسة الخصوصية",
        },
        success: {
          title: "تم إنشاء الحساب!",
          description: "تم إنشاء حسابك بنجاح.",
          redirecting: "إعادة التوجيه إلى تسجيل الدخول...",
        },
        social: {
          orContinueWith: "أو",
          google: "جوجل",
          facebook: "فيسبوك",
          apple: "أبل",
        },
        login: {
          haveAccount: "لديك حساب بالفعل؟",
          link: "تسجيل الدخول",
        },
        validation: {
          fillAllFields: "يرجى ملء جميع الحقول المطلوبة",
          invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
          passwordTooShort: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
          passwordsMismatch: "كلمات المرور غير متطابقة",
          passwordsMismatchError: "كلمات المرور غير متطابقة",
          agreeToTerms: "يرجى الموافقة على الشروط والأحكام",
        },
      },
      forgotPassword: {
        title: "هل نسيت كلمة المرور؟",
        subtitle:
          "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور",
        backToLogin: "العودة إلى تسجيل الدخول",
        form: {
          email: "البريد الإلكتروني",
          sendResetLink: "إرسال رابط إعادة التعيين",
        },
        success: {
          title: "تحقق من بريدك الإلكتروني",
          description: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى",
          emailSentTo: "عنوان بريدك الإلكتروني",
          checkSpam:
            "انقر على الرابط في البريد الإلكتروني لإعادة تعيين كلمة المرور. إذا لم تجده، تحقق من مجلد البريد العشوائي.",
          backToLogin: "العودة إلى تسجيل الدخول",
        },
        remember: {
          question: "هل تتذكر كلمة المرور؟",
          link: "تسجيل الدخول",
        },
        validation: {
          emailRequired: "يرجى إدخال بريدك الإلكتروني",
          invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
        },
      },
      listings: {
        title: "قوائم العقارات",
        available: "متاح",
        property: "عقار",
        properties: "عقارات",
        filter: {
          title: "تصفية القوائم",
          transactionType: "نوع المعاملة",
          city: "المدينة",
          allCities: "جميع المدن",
          propertyType: "نوع العقار",
          allTypes: "جميع الأنواع",
          priceRange: "نطاق السعر",
          minBedrooms: "الحد الأدنى لغرف النوم",
          minBathrooms: "الحد الأدنى للحمامات",
          any: "أي",
          features: "الميزات",
          clearFilters: "مسح جميع الفلاتر",
          filtersButton: "الفلاتر",
          results: "نتائج",
        },
        transactionTypes: {
          all: "الكل",
          sale: "للبيع",
          rent: "للإيجار",
        },
        noResults: {
          title: "لم يتم العثور على عقارات",
          subtitle: "حاول تعديل الفلاتر لرؤية المزيد من النتائج",
          clearButton: "مسح جميع الفلاتر",
        },
        pagination: {
          showing: "عرض",
          of: "من",
        },
      },
      listingDetail: {
        backToListings: "العودة إلى القوائم",
        propertyNotFound: "لم يتم العثور على العقار",
        forSale: "للبيع",
        forRent: "للإيجار",
        perMonth: "/شهر",
        specs: {
          bedrooms: "غرف النوم",
          bathrooms: "الحمامات",
          sqft: "قدم مربع",
          parking: "موقف سيارات",
        },
        sections: {
          description: "الوصف",
          propertyDetails: "تفاصيل العقار",
          featuresAmenities: "الميزات والمرافق",
          location: "الموقع",
          mapComingSoon: "الخريطة التفاعلية قريبًا",
        },
        details: {
          propertyType: "نوع العقار",
          yearBuilt: "سنة البناء",
          furnished: "مفروش",
          status: "الحالة",
          yes: "نعم",
          no: "لا",
        },
        agent: {
          title: "وكيل عقارات",
          sendInquiry: "إرسال استفسار",
          yourName: "اسمك",
          email: "البريد الإلكتروني",
          phone: "الهاتف",
          message: "الرسالة",
          messagePlaceholder: "أنا مهتم بهذا العقار...",
          sendMessage: "إرسال رسالة",
          successMessage: "شكراً! تم إرسال استفسارك إلى الوكيل.",
        },
        similar: {
          title: "عقارات مشابهة",
        },
      },
      sell: {
        hero: {
          title: "أدرج عقارك",
          subtitle:
            "تواصل مع الآلاف من المشترين والمستأجرين المحتملين في جميع أنحاء لبنان",
        },
        steps: {
          accountType: "نوع الحساب",
          subscriptionPlan: "خطة الاشتراك",
          propertyDetails: "تفاصيل العقار",
          features: "الميزات والمرافق",
          photos: "الصور وجهة الاتصال",
        },
        accountType: {
          title: "من أنت؟",
          description: "الرجاء اختيار نوع حسابك للمتابعة",
          owner: {
            title: "مالك العقار",
            description: "أنا مالك العقار وأريد بيعه أو تأجيره مباشرة",
          },
          realtor: {
            title: "وكيل عقاري",
            description: "أنا وكيل عقاري مرخص أمثل مالك العقار",
          },
          ownerInfo: "كمالك عقار، يمكنك إدراج عقارك مباشرة دون أي رسوم وكالة.",
          realtorInfo:
            "كوكيل عقاري، ستحتاج إلى تقديم معلومات وكالتك ورقم الترخيص.",
        },
        subscription: {
          title: "اختر خطتك المثالية",
          description: "حدد الخطة التي تناسب احتياجات قائمة العقارات الخاصة بك",
          monthly: "شهري",
          yearly: "سنوي",
          savingsBadge: "وفر حتى 20%",
        },
        propertyDetails: {
          title: "تفاصيل العقار",
          propertyTitle: "عنوان العقار",
          propertyTitlePlaceholder: "مثال: شقة فاخرة 3 غرف نوم في الأشرفية",
          propertyType: "نوع العقار",
          listingType: "نوع القائمة",
          forSale: "للبيع",
          forRent: "للإيجار",
          price: "السعر",
          pricePlaceholder: "مثال: 450000",
          city: "المدينة",
          location: "الموقع / العنوان",
          locationPlaceholder: "مثال: ساحة ساسين، الأشرفية",
          description: "وصف العقار",
          descriptionPlaceholder: "صف عقارك بالتفصيل...",
        },
        features: {
          title: "الميزات والمرافق",
          bedrooms: "غرف النوم",
          bathrooms: "الحمامات",
          area: "المساحة (متر مربع)",
          areaPlaceholder: "المساحة بالمتر المربع",
          parking: "مواقف السيارات",
          yearBuilt: "سنة البناء",
          yearBuiltPlaceholder: "مثال: 2020",
          selectFeatures: "اختر الميزات",
          balcony: "شرفة",
          garden: "حديقة",
          pool: "مسبح",
          gym: "نادي رياضي",
          security: "أمن",
          elevator: "مصعد",
          heating: "تدفئة مركزية",
          ac: "تكييف",
          furnished: "مفروش",
          seaView: "إطلالة بحرية",
          mountainView: "إطلالة جبلية",
          parkingSpace: "موقف سيارات",
        },
        photos: {
          title: "صور العقار",
          upload: "تحميل صور العقار",
          uploadDescription: "انقر للاختيار أو اسحب وأفلت الصور هنا",
          dragDrop: "انقر للاختيار أو اسحب وأفلت الصور هنا",
          maxImages: "بحد أقصى 10 صور، JPG أو PNG",
          contactTitle: "معلومات الاتصال",
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          phonePlaceholder: "+961 3 XXX XXX",
          warningRealtor: "كوكيل عقاري، يرجى تقديم بيانات اعتمادك المهنية",
          agencyName: "اسم الوكالة",
          agencyPlaceholder: "مثال: سنشري 21 لبنان",
          licenseNumber: "رقم الترخيص",
          licensePlaceholder: "مثال: RE-123456",
          infoOwner:
            "سيتم عرض معلومات الاتصال الخاصة بك للمشترين / المستأجرين المهتمين.",
          infoRealtor:
            "سيتم التحقق من معلومات وكالتك والترخيص قبل الموافقة على القائمة.",
        },
        buttons: {
          back: "رجوع",
          next: "التالي",
          submit: "إرسال القائمة",
          submitting: "جار الإرسال...",
        },
        propertyTypes: {
          apartment: "شقة",
          house: "منزل",
          villa: "فيلا",
          penthouse: "بنتهاوس",
          studio: "استوديو",
          duplex: "دوبلكس",
          land: "أرض",
          commercial: "تجاري",
        },
        cities: {
          beirut: "بيروت",
          mountLebanon: "جبل لبنان",
          tripoli: "طرابلس",
          sidon: "صيدا",
          tyre: "صور",
          jounieh: "جونية",
          byblos: "جبيل",
          zahle: "زحلة",
        },
      },
      common: {
        learnMore: "تعلم المزيد",
        viewDetails: "عرض التفاصيل",
        contactUs: "اتصل بنا",
        getStarted: "ابدأ الآن",
        backToHome: "العودة للرئيسية",
        loading: "جار التحميل...",
        save: "حفظ",
        cancel: "إلغاء",
        next: "التالي",
        previous: "السابق",
        close: "إغلاق",
        searchProperties: "البحث عن عقارات",
      },
    },
    components: {
      propertyCard: {
        forSale: "للبيع",
        forRent: "للإيجار",
        featured: "مميز",
        beds: "غرف",
        baths: "حمامات",
        sqft: "قدم²",
        perMonth: "/شهر",
      },
    },
    locations: {
      cities: {
        Beirut: "بيروت",
        Jounieh: "جونية",
        Byblos: "جبيل",
        Tripoli: "طرابلس",
        Saida: "صيدا",
        Batroun: "بترون",
        Zahle: "زحلة",
        Tyre: "صور",
      },
      neighborhoods: {
        Achrafieh: "الأشرفية",
        Maameltein: "مع ملتين",
        "Old Souk": "السوق القديم",
        Downtown: "الوسط التجاري",
        Mina: "المينا",
        Verdun: "فردان",
        "Sea Road": "الطريق البحري",
      },
    },
    listingTitles: {
      "1": "فيلا فاخرة في الأشرفية",
      "2": "شقة حديثة في مع ملتين",
      "3": "عقار على البحر في جبيل",
      "4": "منزل واسع في بترون",
      "5": "شقة وسط بيروت",
      "6": "منزل عائلي في طرابلس",
      "7": "كوندو فاخر في فردان",
      "8": "شقة مريحة في صيدا",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "ar" || saved === "en" ? saved : "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    // Save language preference
    localStorage.setItem("language", language);

    // Set document direction and lang attribute
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const translateCity = (city: string, language: Language): string => {
  const cityTranslations = translations[language].locations.cities;
  return cityTranslations[city as keyof typeof cityTranslations] || city;
};

export const translateNeighborhood = (
  neighborhood: string,
  language: Language
): string => {
  const neighborhoodTranslations =
    translations[language].locations.neighborhoods;
  return (
    neighborhoodTranslations[
      neighborhood as keyof typeof neighborhoodTranslations
    ] || neighborhood
  );
};

export const translateListingTitle = (
  listingId: string,
  language: Language
): string => {
  const titleTranslations = translations[language].listingTitles;
  return titleTranslations[listingId as keyof typeof titleTranslations] || "";
};
