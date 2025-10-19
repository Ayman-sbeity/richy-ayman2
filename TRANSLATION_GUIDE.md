# Translation System Implementation Guide

## Overview
A complete internationalization (i18n) system has been implemented for your React application, supporting English and Arabic with RTL (right-to-left) support.

## Features Implemented

### ✅ What's Already Translated
- **Navbar**: All navigation items and action buttons
- **Footer**: All sections, links, and legal information
- **Translation Context**: Complete translation system with English and Arabic

### 🔧 Components Created
1. **LanguageContext** (`src/contexts/LanguageContext.tsx`)
   - Manages language state
   - Provides translations
   - Handles RTL support
   - Persists language preference in localStorage

2. **LanguageToggle** (`src/components/UI/LanguageToggle.tsx`)
   - Button to switch between English and Arabic
   - Already added to Navbar (both desktop and mobile views)

## How to Use Translations in Your Pages

### Step 1: Import the useLanguage Hook
```typescript
import { useLanguage } from '../contexts/LanguageContext';
```

### Step 2: Get Translations in Your Component
```typescript
const YourPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Box>
      <Typography>{t.pages.home.hero.title}</Typography>
      <Typography>{t.pages.contact.form.name}</Typography>
    </Box>
  );
};
```

## Translation Structure

All translations are accessible via the `t` object:

### Navigation & Footer
- `t.nav.buy` - "Buy" / "شراء"
- `t.nav.sell` - "Sell" / "بيع"
- `t.footer.copyright` - Copyright text
- `t.footer.sections.buy.title` - Footer section titles

### Page-Specific Translations

#### Home Page
```typescript
t.pages.home.hero.title          // "Find Your Dream Home" / "اعثر على منزل أحلامك"
t.pages.home.hero.searchButton   // "Search Properties" / "بحث عن عقارات"
t.pages.home.stats.properties    // "Properties Listed" / "عقار مدرج"
```

#### About Page
```typescript
t.pages.about.hero.title         // "About Manzilocom Lebanon"
t.pages.about.ourStory.title     // "Our Story" / "قصتنا"
```

#### Contact Page
```typescript
t.pages.contact.form.name        // "Full Name" / "الاسم الكامل"
t.pages.contact.form.email       // "Email Address" / "البريد الإلكتروني"
t.pages.contact.form.send        // "Send Message" / "إرسال الرسالة"
```

#### Login/Signup Pages
```typescript
t.pages.login.title              // "Welcome Back" / "مرحباً بعودتك"
t.pages.login.email              // "Email Address" / "البريد الإلكتروني"
t.pages.signup.firstName         // "First Name" / "الاسم الأول"
```

#### Sell Page
```typescript
t.pages.sell.hero.title          // "List Your Property"
t.pages.sell.form.bedrooms       // "Bedrooms" / "غرف النوم"
t.pages.sell.form.price          // "Price" / "السعر"
```

#### Common Translations
```typescript
t.pages.common.learnMore         // "Learn More" / "تعلم المزيد"
t.pages.common.contactUs         // "Contact Us" / "اتصل بنا"
t.pages.common.loading           // "Loading..." / "جار التحميل..."
t.pages.common.save              // "Save" / "حفظ"
t.pages.common.next              // "Next" / "التالي"
```

## Example: Updating Home.tsx

```typescript
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <Box>
      <HeroSection>
        <Typography variant="h2">
          {t.pages.home.hero.title}
        </Typography>
        <Typography variant="h5">
          {t.pages.home.hero.subtitle}
        </Typography>
        <Button>
          {t.pages.home.hero.searchButton}
        </Button>
      </HeroSection>
      
      {/* Stats Section */}
      <Box>
        <Typography>{t.pages.home.stats.properties}</Typography>
        <Typography>{t.pages.home.stats.happyClients}</Typography>
        <Typography>{t.pages.home.stats.yearsExperience}</Typography>
      </Box>
    </Box>
  );
};
```

## Example: Updating Contact.tsx

```typescript
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <Typography variant="h2">
        {t.pages.contact.hero.title}
      </Typography>
      
      <TextField
        label={t.pages.contact.form.name}
        fullWidth
      />
      <TextField
        label={t.pages.contact.form.email}
        fullWidth
      />
      <TextField
        label={t.pages.contact.form.message}
        multiline
        rows={4}
      />
      <Button>
        {t.pages.contact.form.send}
      </Button>
    </Container>
  );
};
```

## RTL Support

The `isRTL` boolean can be used for directional styling:

```typescript
const { t, isRTL } = useLanguage();

<Box sx={{ 
  textAlign: isRTL ? 'right' : 'left',
  direction: isRTL ? 'rtl' : 'ltr',
  paddingRight: isRTL ? 2 : 0,
  paddingLeft: isRTL ? 0 : 2,
}}>
  {t.pages.home.hero.title}
</Box>
```

## Adding New Translations

To add new translations:

1. **Update the interface** in `LanguageContext.tsx`:
```typescript
interface Translations {
  pages: {
    newPage: {
      title: string;
      description: string;
    };
  };
}
```

2. **Add English translations**:
```typescript
en: {
  pages: {
    newPage: {
      title: 'New Page Title',
      description: 'New page description',
    },
  },
}
```

3. **Add Arabic translations**:
```typescript
ar: {
  pages: {
    newPage: {
      title: 'عنوان الصفحة الجديدة',
      description: 'وصف الصفحة الجديدة',
    },
  },
}
```

## Testing

1. **Test the language toggle**: Click the language icon in the navbar
2. **Test RTL**: When Arabic is selected, text should align right
3. **Test persistence**: Refresh the page - language should be remembered
4. **Test all pages**: Navigate through all pages to ensure translations work

## Current State

✅ **Already Implemented:**
- Translation context with comprehensive translations
- Language toggle button in navbar
- Navbar translations (working)
- Footer translations (working)
- RTL support for Arabic
- LocalStorage persistence

⏳ **Next Steps (You need to update these pages):**
- Update Home.tsx to use `t.pages.home.*`
- Update About.tsx to use `t.pages.about.*`
- Update Contact.tsx to use `t.pages.contact.*`
- Update Login.tsx to use `t.pages.login.*`
- Update Signup.tsx to use `t.pages.signup.*`
- Update Sell.tsx to use `t.pages.sell.*`
- Update other pages as needed

## Tips

1. **Always use translations**: Replace all hardcoded text with translation keys
2. **Keep translations organized**: Group related translations together
3. **Test both languages**: Always test your changes in both English and Arabic
4. **Use descriptive keys**: Make translation keys self-explanatory
5. **Consider RTL**: Use `isRTL` for directional styling when needed

## Support

The translation system is now fully integrated and ready to use. Just import the `useLanguage` hook and start using translations in your pages!
