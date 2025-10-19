# Quick Implementation Example - Home.tsx

## Before (Hardcoded Text):
```typescript
<Typography variant="h2">
  Find Your Dream Home
</Typography>
<Typography variant="h5">
  Discover the perfect property in Lebanon
</Typography>
<Button>
  Search Properties
</Button>
```

## After (With Translations):
```typescript
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Typography variant="h2">
      {t.pages.home.hero.title}
    </Typography>
    <Typography variant="h5">
      {t.pages.home.hero.subtitle}
    </Typography>
    <Button>
      {t.pages.home.hero.searchButton}
    </Button>
  );
};
```

## Complete List of Available Home Page Translations:

### Hero Section
- `t.pages.home.hero.title` → "Find Your Dream Home" / "اعثر على منزل أحلامك"
- `t.pages.home.hero.subtitle` → "Discover the perfect property in Lebanon" / "اكتشف العقار المثالي في لبنان"
- `t.pages.home.hero.searchPlaceholder` → "Enter city, neighborhood or ZIP code"
- `t.pages.home.hero.propertyType` → "Property Type" / "نوع العقار"
- `t.pages.home.hero.priceRange` → "Price Range" / "نطاق السعر"
- `t.pages.home.hero.searchButton` → "Search Properties" / "بحث عن عقارات"

### Stats Section
- `t.pages.home.stats.properties` → "Properties Listed" / "عقار مدرج"
- `t.pages.home.stats.happyClients` → "Happy Clients" / "عميل راضٍ"
- `t.pages.home.stats.yearsExperience` → "Years Experience" / "سنوات من الخبرة"

### Featured Properties
- `t.pages.home.featured.title` → "Featured Properties" / "عقارات مميزة"
- `t.pages.home.featured.subtitle` → "Explore our hand-picked selection"
- `t.pages.home.featured.viewAll` → "View All Properties" / "عرض جميع العقارات"

### How It Works Section
- `t.pages.home.howItWorks.title` → "How It Works" / "كيف يعمل"
- `t.pages.home.howItWorks.subtitle` → "Your journey to finding the perfect property"
- `t.pages.home.howItWorks.step1Title` → "Search Properties" / "ابحث عن عقارات"
- `t.pages.home.howItWorks.step1Desc` → "Browse through thousands of listings"
- `t.pages.home.howItWorks.step2Title` → "Schedule Visit" / "جدولة الزيارة"
- `t.pages.home.howItWorks.step2Desc` → "Book a tour of your favorite properties"
- `t.pages.home.howItWorks.step3Title` → "Get Your Keys" / "احصل على مفاتيحك"
- `t.pages.home.howItWorks.step3Desc` → "Complete the deal and move in"

### Call to Action
- `t.pages.home.cta.title` → "Ready to Get Started?" / "هل أنت مستعد للبدء؟"
- `t.pages.home.cta.subtitle` → "Join thousands of satisfied customers"
- `t.pages.home.cta.button` → "Start Your Search" / "ابدأ بحثك"

### Common Buttons & Labels
- `t.pages.common.learnMore` → "Learn More" / "تعلم المزيد"
- `t.pages.common.viewDetails` → "View Details" / "عرض التفاصيل"
- `t.pages.common.contactUs` → "Contact Us" / "اتصل بنا"
- `t.pages.common.getStarted` → "Get Started" / "ابدأ الآن"

## Step-by-Step Guide to Update Home.tsx:

1. **Add the import at the top:**
   ```typescript
   import { useLanguage } from '../contexts/LanguageContext';
   ```

2. **Get translations in your component:**
   ```typescript
   const Home: React.FC = () => {
     const { t, isRTL } = useLanguage();
     // ... rest of your code
   ```

3. **Replace all hardcoded English text with translation keys:**
   - Look for any `<Typography>`, `<Button>`, `<TextField label="">` with hardcoded text
   - Replace with appropriate `t.pages.home.*` key

4. **For form inputs and labels:**
   ```typescript
   <InputLabel>{t.pages.home.hero.propertyType}</InputLabel>
   <TextField placeholder={t.pages.home.hero.searchPlaceholder} />
   ```

## Tips for Your Implementation:

1. **Search & Replace Strategy**: Search for hardcoded strings in your page and replace them one section at a time
2. **Test Frequently**: Click the language toggle after each section to see your changes
3. **Use DevTools**: Check the console for any missing translation keys
4. **Keep Context**: Some translations might need context - feel free to add more specific keys if needed

## Adding Custom Translations:

If you need a translation that doesn't exist yet, add it to `src/contexts/LanguageContext.tsx`:

```typescript
// In the interface
pages: {
  home: {
    customSection: {
      myNewText: string;
    };
  };
}

// In English (en)
pages: {
  home: {
    customSection: {
      myNewText: 'My New English Text',
    },
  },
}

// In Arabic (ar)
pages: {
  home: {
    customSection: {
      myNewText: 'النص العربي الجديد',
    },
  },
}
```

Then use it in your component:
```typescript
<Typography>{t.pages.home.customSection.myNewText}</Typography>
```
