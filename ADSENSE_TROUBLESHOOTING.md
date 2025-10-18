# Google AdSense Troubleshooting Guide

## ✅ Fixes Applied

### 1. **Fixed index.html**
- ✅ Removed line break in AdSense script URL
- ✅ Removed duplicate ad code inside `<div id="root">`
- ✅ Script now loads correctly

### 2. **Updated AdSenseAd Component**
- ✅ Added publisher ID: `ca-pub-3544612181938151`
- ✅ Added timeout to ensure script loads before pushing ads
- ✅ Fixed development vs production rendering
- ✅ Proper data attributes for both ad slots

## 🔍 Why Ads Might Not Show (Checklist)

### **A. Account & Approval Issues**
- [ ] **AdSense account approved?** Check your AdSense dashboard
- [ ] **Domain added to AdSense?** Add your production domain in AdSense settings
- [ ] **Site reviewed by Google?** First-time approval takes 24-48 hours
- [ ] **Payment info complete?** Ensure billing is set up

### **B. Technical Issues**
- [ ] **Deployed to production domain?** (not localhost)
- [ ] **Ad blocker disabled?** Test in incognito mode
- [ ] **Console errors?** Check browser DevTools Console (F12)
- [ ] **Correct publisher ID?** Should be `ca-pub-3544612181938151`
- [ ] **Correct ad slot IDs?**
  - Slot 1: `4007518640`
  - Slot 2: `9340764048`

### **C. Policy Compliance**
- [ ] **Sufficient content?** Pages should have meaningful content
- [ ] **No prohibited content?** Check AdSense policies
- [ ] **Not clicking your own ads?** This can get you banned
- [ ] **Traffic is real?** No bot traffic or click farms

## 🧪 How to Test After Deployment

### Step 1: Open DevTools (F12)
```
Right-click on page → Inspect → Console tab
```

### Step 2: Check for AdSense Script
In Console, type:
```javascript
window.adsbygoogle
```
Should return: `Array []` or similar (not undefined)

### Step 3: Find Ad Elements
In Console, type:
```javascript
document.querySelectorAll('.adsbygoogle')
```
Should return: `NodeList(2)` (2 ad elements)

### Step 4: Check for Errors
Look for messages like:
- ❌ `adsbygoogle.push() error` - Script didn't load
- ❌ `No slot size for availableWidth=0` - Layout issue
- ✅ `Adslot rendered` - Ad is working!

### Step 5: Network Tab
1. Open DevTools → Network tab
2. Filter by "pagead"
3. Refresh page
4. You should see requests to `googlesyndication.com`

## 📊 Ad Placement on Your Site

### Home Page:
```
1. Hero Section
2. Stats
3. Featured Properties
4. Interactive Map
5. Agents Section
6. Blog/News
7. 📢 Ad Slot 1 (4007518640)  ← First ad here
8. 📢 Ad Slot 2 (9340764048)  ← Second ad here
```

## ⏱️ Timeline for Ads to Appear

| Event | Time | Action |
|-------|------|--------|
| Deploy code | 0 hours | Build & deploy to production |
| Google crawls site | 1-24 hours | Automatic |
| Review & approval | 24-48 hours | Wait for email |
| Ads start showing | 48+ hours | Done! |

## 🚨 Common Errors & Solutions

### Error: "adsbygoogle is not defined"
**Solution:** AdSense script didn't load
- Check internet connection
- Check if script tag is in `<head>`
- Check domain is approved in AdSense

### Error: "No fill" or "Blank ad space"
**Solution:** No ads available
- Normal for new sites
- Try different page content
- Wait 24-48 hours

### Error: "Ad slot not defined"
**Solution:** Wrong ad slot ID
- Check AdSense dashboard for correct slot IDs
- Update `Home.tsx` with correct IDs

### Error: Ads show in dev but not production
**Solution:** This is backwards! Ads ONLY show in production
- Disable ad blocker
- Wait for Google approval
- Check domain in AdSense settings

## 📝 Your Ad Configuration

### Publisher ID
```
ca-pub-3544612181938151
```

### Ad Units
| Location | Slot ID | Format |
|----------|---------|--------|
| Home Page (Bottom, First) | 4007518640 | Auto, Full-width |
| Home Page (Bottom, Second) | 9340764048 | Auto, Full-width |

## ✨ Next Steps

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting:**
   - Vercel, Netlify, AWS, etc.
   - NOT localhost

3. **Add your domain in AdSense:**
   - Go to AdSense → Sites
   - Add your production domain
   - Wait for approval

4. **Monitor in AdSense Dashboard:**
   - Check for policy violations
   - Monitor earnings
   - View performance

## 🆘 Still Not Working?

### Quick Checklist:
1. Is site deployed to real domain? (not localhost)
2. Is AdSense account fully approved?
3. Is domain added in AdSense dashboard?
4. Waited 48 hours after deployment?
5. Disabled ad blocker for testing?
6. Checked browser console for errors?

### Contact Support:
- **AdSense Help:** https://support.google.com/adsense
- **Community Forum:** https://support.google.com/adsense/community

## 📞 Debug Commands

Run these in browser console:

```javascript
// Check if AdSense loaded
console.log('AdSense:', window.adsbygoogle);

// Check ad elements
console.log('Ad elements:', document.querySelectorAll('.adsbygoogle').length);

// Check publisher ID
const ads = document.querySelectorAll('.adsbygoogle');
ads.forEach((ad, i) => {
  console.log(`Ad ${i+1}:`, ad.dataset.adClient, ad.dataset.adSlot);
});
```

Expected output:
```
AdSense: Array []
Ad elements: 2
Ad 1: ca-pub-3544612181938151 4007518640
Ad 2: ca-pub-3544612181938151 9340764048
```

---

**Last Updated:** October 18, 2025
**Status:** Ready for production deployment 🚀
