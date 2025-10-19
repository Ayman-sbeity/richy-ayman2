#!/usr/bin/env python3
"""Apply translations to Home.tsx in a safe manner"""

# Read the file
with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Apply replacements
replacements = [
    # Hero section
    ("Find Your Dream Home", "{t.pages.home.hero.title}"),
    ("Discover the perfect property with our comprehensive real estate\n            platform", "{t.pages.home.hero.subtitle}"),
    ("Start Your Property Search", "{t.pages.home.hero.searchStartLabel}"),
    ('label="Location"', 'label={t.pages.home.hero.location}'),
    
    # Search button
    (">Search Properties<", ">{t.pages.common.searchProperties}<"),
    
    # Stats section labels
    ("Properties Listed", "{t.pages.home.stats.propertiesLabel}"),
    ("Expert Agents", "{t.pages.home.stats.agentsLabel}"),
    ("Cities Covered", "{t.pages.home.stats.citiesLabel}"),
    ("Customer Satisfaction", "{t.pages.home.stats.satisfactionLabel}"),
    
    # Featured Properties section
    ("<h2>Featured Properties</h2>", "<h2>{t.pages.home.featured.title}</h2>"),
    ("For Sale", "{t.pages.home.featured.forSale}"),
    ("For Rent", "{t.pages.home.featured.forRent}"),
    
    # Property type labels in search
    ('label="Property Type"', 'label={t.pages.home.featured.propertyType}'),
    ('label="Price Range"', 'label={t.pages.home.hero.priceRange}'),
]

for old, new in replacements:
    content = content.replace(old, new)

# Write the file back
with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Applied all translations to Home.tsx")
