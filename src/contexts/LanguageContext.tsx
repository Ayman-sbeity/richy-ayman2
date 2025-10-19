import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface Translations {
  nav: {
    buy: string;
    sell: string;
    rent: string;
    aboutUs: string;
    contact: string;
    login: string;
    signup: string;
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
      };
      form: {
        title: string;
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        send: string;
      };
      info: {
        address: string;
        email: string;
        phone: string;
        hours: string;
      };
      followUs: string;
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
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      agreeToTerms: string;
      signupButton: string;
      haveAccount: string;
      loginLink: string;
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
      form: {
        title: string;
        description: string;
        propertyType: string;
        listingType: string;
        price: string;
        location: string;
        city: string;
        bedrooms: string;
        bathrooms: string;
        area: string;
        submit: string;
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
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      buy: 'Buy',
      sell: 'Sell',
      rent: 'Rent',
      aboutUs: 'About Us',
      contact: 'Contact',
      login: 'Log in',
      signup: 'Sign up',
    },
    footer: {
      sections: {
        buy: {
          title: 'Buy',
          homesForSale: 'Homes for sale',
          openHouses: 'Open houses',
          newHomes: 'New homes',
          recentlySold: 'Recently sold',
          priceReduced: 'Price reduced',
        },
        sell: {
          title: 'Sell',
          sellYourHome: 'Sell your home',
          getHomeValue: 'Get home value',
          sellersGuide: "Seller's guide",
          closingCosts: 'Closing costs calculator',
          findAgent: "Find a seller's agent",
        },
        rent: {
          title: 'Rent',
          apartments: 'Apartments for rent',
          houses: 'Houses for rent',
          postRental: 'Post a rental listing',
          rentalManager: 'Rental manager',
          rentalGuide: 'Rental guide',
        },
        mortgage: {
          title: 'Mortgage & Finance',
          mortgageRates: 'Mortgage rates',
          refinanceRates: 'Refinance rates',
          mortgageCalc: 'Mortgage calculator',
          affordabilityCalc: 'Affordability calculator',
          mortgageGuide: 'Mortgage guide',
        },
        resources: {
          title: 'Resources',
          findAgent: 'Find an agent',
          marketData: 'Market data',
          buyingGuide: 'Home buying guide',
          realEstateNews: 'Real estate news',
          mobileApps: 'Mobile apps',
        },
      },
      app: {
        title: 'Get the RealtyFinder app',
        downloadOn: 'Download on the',
        appStore: 'App Store',
        getItOn: 'Get it on',
        googlePlay: 'Google Play',
      },
      social: {
        title: 'Follow us',
      },
      legal: {
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        cookiePolicy: 'Cookie Policy',
        accessibility: 'Accessibility',
        sitemap: 'Sitemap',
      },
      copyright: '© 2024 RealtyFinder. All rights reserved.',
      disclaimer: 'All information provided is deemed reliable but is not guaranteed and should be independently verified.',
    },
    pages: {
      home: {
        hero: {
          title: 'Find Your Dream Home',
          subtitle: 'Discover the perfect property with our comprehensive real estate platform',
          searchPlaceholder: 'Enter city, neighborhood or ZIP code',
          searchStartLabel: 'Start Your Property Search',
          location: 'Location',
          propertyType: 'Property Type',
          priceRange: 'Price Range',
          searchButton: 'Search Properties',
        },
        stats: {
          propertiesLabel: 'Properties Listed',
          propertiesCount: '5,000+',
          agentsLabel: 'Expert Agents',
          agentsCount: '200+',
          citiesLabel: 'Cities Covered',
          citiesCount: '15+',
          satisfactionLabel: 'Customer Satisfaction',
          satisfactionCount: '98%',
        },
        featured: {
          title: 'Featured Properties',
          subtitle: 'Discover our handpicked selection of premium properties across Lebanon',
          viewAll: 'View All Properties',
          forSale: 'For Sale',
          forRent: 'For Rent',
          beds: 'Beds',
          baths: 'Baths',
          sqft: 'sqft',
          propertyType: 'Property Type',
        },
        locations: {
          title: 'Explore Properties by Location',
          subtitle: "Find your perfect home in Lebanon's most desirable locations",
          viewMap: 'View Interactive Map',
        },
        agents: {
          title: 'Meet Our Expert Agents',
          subtitle: 'Work with the best real estate professionals in Lebanon',
          viewAllAgents: 'Meet All Our Agents',
          successfulDeals: 'Successful Deals',
          viewProfile: 'View Profile',
        },
        news: {
          title: 'Latest Insights & News',
          subtitle: 'Stay informed with the latest real estate trends and market updates',
          viewAllArticles: 'View All Articles',
          minRead: 'min read',
        },
      },
      about: {
        hero: {
          title: 'About Manzilocom Lebanon',
          subtitle: "Lebanon's Premier Real Estate Discovery Platform",
          description: 'Connecting Lebanese property seekers with their dream homes across Beirut, Mount Lebanon, and beyond.',
        },
        ourStory: {
          title: 'Our Story',
          paragraph1: 'Born from a passion for Lebanon\'s diverse real estate landscape, Manzilocom was founded in 2020 by two visionary real estate professionals—Ayman Sbeity and Richy—who recognized the need for a modern, transparent platform to connect property seekers with their ideal homes. With deep roots in the Lebanese market and an intimate understanding of the unique challenges facing buyers, sellers, and investors, our founders combined their decades of experience to create a solution that truly serves the Lebanese community.',
          paragraph2: 'From the coastal properties of Beirut to the mountain retreats of Mount Lebanon, from bustling commercial spaces in Tripoli to elegant villas in Jounieh, we\'ve built our reputation on trust, expertise, and an unwavering commitment to our clients\' success. Today, Manzilocom stands as Lebanon\'s trusted partner in real estate discovery, having facilitated over 380 successful transactions and counting.',
        },
        mission: {
          title: 'Our Mission',
          description: 'To empower the Lebanese community with innovative tools, comprehensive market insights, and personalized service that makes real estate decisions confident and informed. We\'re committed to maintaining the highest standards of transparency, integrity, and professionalism while honoring Lebanon\'s rich cultural heritage and architectural diversity.',
        },
        vision: {
          title: 'Our Vision',
          description: 'To be recognized as Lebanon\'s most trusted and innovative real estate platform, setting new benchmarks for excellence in property services while contributing to the growth and prosperity of Lebanese communities. We envision a future where every Lebanese resident and diaspora member can effortlessly connect with their dream property in their homeland.',
        },
        founders: {
          title: 'Meet Our Founders',
          subtitle: 'With over 380 successful deals combined, our founders bring unparalleled expertise and dedication to every client.',
          ayman: {
            name: 'Ayman Sbeity',
            title: 'Luxury Properties & Investment Specialist',
            deals: '200+ Successful Deals',
            description: 'Co-founder and luxury property expert with an exceptional track record in high-end residential and investment properties across Lebanon. Ayman\'s deep market knowledge and client-first approach have made him a trusted advisor for discerning buyers and investors.',
            phone: '+961 3 123 456',
            email: 'ayman@realty.com',
          },
          richy: {
            name: 'Richy',
            title: 'Residential & Commercial Sales Expert',
            deals: '180+ Successful Deals',
            description: 'Co-founder specializing in residential and commercial properties throughout Lebanon. Richy\'s dedication to understanding client needs and delivering exceptional results has earned him recognition as one of Lebanon\'s most reliable real estate professionals.',
            phone: '+961 3 234 567',
            email: 'richy@realty.com',
          },
        },
        contact: {
          title: 'Get In Touch',
          subtitle: 'Ready to find your dream property in Lebanon? We\'re here to help you every step of the way.',
          visitUs: 'Visit Us',
          visitAddress: 'Downtown Beirut\nMartyr\'s Square District\nBeirut, Lebanon',
          callUs: 'Call Us',
          callDetails: 'Ayman: +961 3 123 456\nRichy: +961 3 234 567\nAvailable 7 days a week',
          emailUs: 'Email Us',
          emailDetails: 'info@realtyfinder.com\nsupport@realtyfinder.com\nQuick response guaranteed',
        },
      },
      contact: {
        hero: {
          title: 'Get in Touch',
          subtitle: 'We\'re here to help you find your dream property',
        },
        form: {
          title: 'Send us a Message',
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
        },
        info: {
          address: 'Our Address',
          email: 'Email Us',
          phone: 'Call Us',
          hours: 'Business Hours',
        },
        followUs: 'Follow Us',
      },
      login: {
        title: 'Welcome Back',
        subtitle: 'Sign in to continue to your account',
        email: 'Email Address',
        password: 'Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        loginButton: 'Sign In',
        noAccount: "Don't have an account?",
        signupLink: 'Sign up',
        orContinueWith: 'Or continue with',
      },
      signup: {
        title: 'Create Account',
        subtitle: 'Join us today',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        agreeToTerms: 'I agree to the Terms and Conditions',
        signupButton: 'Sign Up',
        haveAccount: 'Already have an account?',
        loginLink: 'Sign in',
      },
      sell: {
        hero: {
          title: 'List Your Property',
          subtitle: 'Reach thousands of potential buyers',
        },
        steps: {
          accountType: 'Account Type',
          subscriptionPlan: 'Subscription Plan',
          propertyDetails: 'Property Details',
          features: 'Features & Amenities',
          photos: 'Photos & Contact',
        },
        form: {
          title: 'Property Title',
          description: 'Description',
          propertyType: 'Property Type',
          listingType: 'Listing Type',
          price: 'Price',
          location: 'Location',
          city: 'City',
          bedrooms: 'Bedrooms',
          bathrooms: 'Bathrooms',
          area: 'Area (sq ft)',
          submit: 'Submit Listing',
        },
      },
      common: {
        learnMore: 'Learn More',
        viewDetails: 'View Details',
        contactUs: 'Contact Us',
        getStarted: 'Get Started',
        backToHome: 'Back to Home',
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        next: 'Next',
        previous: 'Previous',
        close: 'Close',
        searchProperties: 'Search Properties',
      },
    },
  },
  ar: {
    nav: {
      buy: 'شراء',
      sell: 'بيع',
      rent: 'إيجار',
      aboutUs: 'من نحن',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
    },
    footer: {
      sections: {
        buy: {
          title: 'شراء',
          homesForSale: 'منازل للبيع',
          openHouses: 'منازل مفتوحة',
          newHomes: 'منازل جديدة',
          recentlySold: 'تم بيعها مؤخراً',
          priceReduced: 'تخفيض السعر',
        },
        sell: {
          title: 'بيع',
          sellYourHome: 'بيع منزلك',
          getHomeValue: 'احصل على قيمة المنزل',
          sellersGuide: 'دليل البائع',
          closingCosts: 'حاسبة تكاليف الإغلاق',
          findAgent: 'ابحث عن وكيل بائع',
        },
        rent: {
          title: 'إيجار',
          apartments: 'شقق للإيجار',
          houses: 'منازل للإيجار',
          postRental: 'انشر إعلان إيجار',
          rentalManager: 'مدير التأجير',
          rentalGuide: 'دليل الإيجار',
        },
        mortgage: {
          title: 'الرهن العقاري والتمويل',
          mortgageRates: 'أسعار الرهن العقاري',
          refinanceRates: 'أسعار إعادة التمويل',
          mortgageCalc: 'حاسبة الرهن العقاري',
          affordabilityCalc: 'حاسبة القدرة الشرائية',
          mortgageGuide: 'دليل الرهن العقاري',
        },
        resources: {
          title: 'الموارد',
          findAgent: 'ابحث عن وكيل',
          marketData: 'بيانات السوق',
          buyingGuide: 'دليل شراء المنزل',
          realEstateNews: 'أخبار العقارات',
          mobileApps: 'تطبيقات الجوال',
        },
      },
      app: {
        title: 'احصل على تطبيق RealtyFinder',
        downloadOn: 'حمله على',
        appStore: 'متجر التطبيقات',
        getItOn: 'احصل عليه من',
        googlePlay: 'جوجل بلاي',
      },
      social: {
        title: 'تابعنا',
      },
      legal: {
        privacyPolicy: 'سياسة الخصوصية',
        termsOfService: 'شروط الخدمة',
        cookiePolicy: 'سياسة الكوكيز',
        accessibility: 'إمكانية الوصول',
        sitemap: 'خريطة الموقع',
      },
      copyright: '© 2024 RealtyFinder. جميع الحقوق محفوظة.',
      disclaimer: 'جميع المعلومات المقدمة تعتبر موثوقة ولكنها غير مضمونة ويجب التحقق منها بشكل مستقل.',
    },
    pages: {
      home: {
        hero: {
          title: 'اعثر على منزل أحلامك',
          subtitle: 'اكتشف العقار المثالي مع منصتنا الشاملة للعقارات',
          searchPlaceholder: 'أدخل المدينة أو الحي أو الرمز البريدي',
          searchStartLabel: 'ابدأ بحث العقارات الخاص بك',
          location: 'الموقع',
          propertyType: 'نوع العقار',
          priceRange: 'نطاق السعر',
          searchButton: 'بحث عن عقارات',
        },
        stats: {
          propertiesLabel: 'عقار مدرج',
          propertiesCount: '5,000+',
          agentsLabel: 'وكلاء خبراء',
          agentsCount: '200+',
          citiesLabel: 'المدن المغطاة',
          citiesCount: '15+',
          satisfactionLabel: 'رضا العملاء',
          satisfactionCount: '98%',
        },
        featured: {
          title: 'عقارات مميزة',
          subtitle: 'اكتشف مجموعتنا المختارة بعناية من العقارات الفاخرة في جميع أنحاء لبنان',
          viewAll: 'عرض جميع العقارات',
          forSale: 'للبيع',
          forRent: 'للإيجار',
          beds: 'غرف نوم',
          baths: 'حمامات',
          sqft: 'قدم مربع',
          propertyType: 'نوع العقار',
        },
        locations: {
          title: 'استكشف العقارات حسب الموقع',
          subtitle: 'ابحث عن منزل أحلامك في أكثر المواقع المرغوبة في لبنان',
          viewMap: 'عرض الخريطة التفاعلية',
        },
        agents: {
          title: 'تعرف على وكلائنا الخبراء',
          subtitle: 'اعمل مع أفضل المهنيين العقاريين في لبنان',
          viewAllAgents: 'قابل جميع وكلائنا',
          successfulDeals: 'صفقة ناجحة',
          viewProfile: 'عرض الملف الشخصي',
        },
        news: {
          title: 'أحدث الأفكار والأخبار',
          subtitle: 'ابق على اطلاع مع أحدث اتجاهات العقارات وتحديثات السوق',
          viewAllArticles: 'عرض جميع المقالات',
          minRead: 'دقائق قراءة',
        },
      },
      about: {
        hero: {
          title: 'حول منزلوكوم لبنان',
          subtitle: 'منصة اكتشاف العقارات الرائدة في لبنان',
          description: 'ربط الباحثين عن العقارات اللبنانية بمنازل أحلامهم في جميع أنحاء بيروت وجبل لبنان وما بعده.',
        },
        ourStory: {
          title: 'قصتنا',
          paragraph1: 'ولدت منزلوكوم من شغف بالمشهد العقاري المتنوع في لبنان، وتأسست في عام 2020 على يد اثنين من المحترفين الرؤيويين في مجال العقارات - أيمن الصبيتي وريتشي - اللذين أدركا الحاجة إلى منصة حديثة وشفافة لربط الباحثين عن العقارات بمنازلهم المثالية. بجذور عميقة في السوق اللبناني وفهم عميق للتحديات الفريدة التي تواجه المشترين والبائعين والمستثمرين، جمع مؤسسونا عقودًا من الخبرة لإنشاء حل يخدم المجتمع اللبناني حقًا.',
          paragraph2: 'من العقارات الساحلية في بيروت إلى المنتجعات الجبلية في جبل لبنان، من المساحات التجارية الصاخبة في طرابلس إلى الفلل الأنيقة في جونيه، بنينا سمعتنا على الثقة والخبرة والالتزام الثابت بنجاح عملائنا. اليوم، تقف منزلوكوم كشريك لبنان الموثوق به في اكتشاف العقارات، بعد أن سهلت أكثر من 380 معاملة ناجحة ومستمرة.',
        },
        mission: {
          title: 'مهمتنا',
          description: 'تمكين المجتمع اللبناني بأدوات مبتكرة ورؤى شاملة للسوق وخدمة شخصية تجعل القرارات العقارية واثقة ومستنيرة. نحن ملتزمون بالحفاظ على أعلى معايير الشفافية والنزاهة والاحترافية مع تكريم التراث الثقافي الغني والتنوع المعماري للبنان.',
        },
        vision: {
          title: 'رؤيتنا',
          description: 'أن نكون معترف بنا كمنصة العقارات الأكثر موثوقية وابتكارًا في لبنان، ووضع معايير جديدة للتميز في خدمات العقارات مع المساهمة في نمو وازدهار المجتمعات اللبنانية. نتصور مستقبلاً حيث يمكن لكل مقيم لبناني وعضو في الشتات الاتصال بسهولة بممتلكاتهم المثالية في وطنهم.',
        },
        founders: {
          title: 'تعرف على مؤسسينا',
          subtitle: 'مع أكثر من 380 صفقة ناجحة مجتمعة، يجلب مؤسسونا خبرة لا مثيل لها وتفانيًا لكل عميل.',
          ayman: {
            name: 'أيمن الصبيتي',
            title: 'متخصص في العقارات الفاخرة والاستثمار',
            deals: '200+ صفقة ناجحة',
            description: 'مؤسس مشارك وخبير عقارات فاخرة مع سجل استثنائي في العقارات السكنية والاستثمارية الراقية في جميع أنحاء لبنان. جعلت معرفة أيمن العميقة بالسوق ونهجه الذي يضع العميل أولاً منه مستشارًا موثوقًا للمشترين والمستثمرين المميزين.',
            phone: '+961 3 123 456',
            email: 'ayman@realty.com',
          },
          richy: {
            name: 'ريتشي',
            title: 'خبير مبيعات عقارات سكنية وتجارية',
            deals: '180+ صفقة ناجحة',
            description: 'مؤسس مشارك متخصص في العقارات السكنية والتجارية في جميع أنحاء لبنان. لقد جعله تفاني ريتشي في فهم احتياجات العملاء وتقديم نتائج استثنائية معترفًا به كأحد أكثر المحترفين العقاريين موثوقية في لبنان.',
            phone: '+961 3 234 567',
            email: 'richy@realty.com',
          },
        },
        contact: {
          title: 'تواصل معنا',
          subtitle: 'هل أنت مستعد للعثور على عقار أحلامك في لبنان؟ نحن هنا لمساعدتك في كل خطوة على الطريق.',
          visitUs: 'قم بزيارتنا',
          visitAddress: 'وسط بيروت\nمنطقة ساحة الشهداء\nبيروت، لبنان',
          callUs: 'اتصل بنا',
          callDetails: 'أيمن: +961 3 123 456\nريتشي: +961 3 234 567\nمتاح 7 أيام في الأسبوع',
          emailUs: 'راسلنا عبر البريد الإلكتروني',
          emailDetails: 'info@realtyfinder.com\nsupport@realtyfinder.com\nاستجابة سريعة مضمونة',
        },
      },
      contact: {
        hero: {
          title: 'تواصل معنا',
          subtitle: 'نحن هنا لمساعدتك في العثور على عقار أحلامك',
        },
        form: {
          title: 'أرسل لنا رسالة',
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          phone: 'رقم الهاتف',
          subject: 'الموضوع',
          message: 'الرسالة',
          send: 'إرسال الرسالة',
        },
        info: {
          address: 'عنواننا',
          email: 'راسلنا',
          phone: 'اتصل بنا',
          hours: 'ساعات العمل',
        },
        followUs: 'تابعنا',
      },
      login: {
        title: 'مرحباً بعودتك',
        subtitle: 'سجل الدخول للمتابعة إلى حسابك',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'هل نسيت كلمة المرور؟',
        loginButton: 'تسجيل الدخول',
        noAccount: 'ليس لديك حساب؟',
        signupLink: 'إنشاء حساب',
        orContinueWith: 'أو تابع مع',
      },
      signup: {
        title: 'إنشاء حساب',
        subtitle: 'انضم إلينا اليوم',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        agreeToTerms: 'أوافق على الشروط والأحكام',
        signupButton: 'إنشاء حساب',
        haveAccount: 'لديك حساب بالفعل؟',
        loginLink: 'تسجيل الدخول',
      },
      sell: {
        hero: {
          title: 'أدرج عقارك',
          subtitle: 'تواصل مع الآلاف من المشترين المحتملين',
        },
        steps: {
          accountType: 'نوع الحساب',
          subscriptionPlan: 'خطة الاشتراك',
          propertyDetails: 'تفاصيل العقار',
          features: 'الميزات والمرافق',
          photos: 'الصور وجهة الاتصال',
        },
        form: {
          title: 'عنوان العقار',
          description: 'الوصف',
          propertyType: 'نوع العقار',
          listingType: 'نوع القائمة',
          price: 'السعر',
          location: 'الموقع',
          city: 'المدينة',
          bedrooms: 'غرف النوم',
          bathrooms: 'الحمامات',
          area: 'المساحة (قدم مربع)',
          submit: 'إرسال القائمة',
        },
      },
      common: {
        learnMore: 'تعلم المزيد',
        viewDetails: 'عرض التفاصيل',
        contactUs: 'اتصل بنا',
        getStarted: 'ابدأ الآن',
        backToHome: 'العودة للرئيسية',
        loading: 'جار التحميل...',
        save: 'حفظ',
        cancel: 'إلغاء',
        next: 'التالي',
        previous: 'السابق',
        close: 'إغلاق',
        searchProperties: 'البحث عن عقارات',
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    
    // Set document direction and lang attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
