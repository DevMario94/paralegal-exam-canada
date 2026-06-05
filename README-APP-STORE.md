# Paralegal Exam Canada — App Store Build Guide

> From zero to App Store in one afternoon — everything you need, in exact order.

---

## What You're Building

A native iOS app powered by Capacitor. Your HTML/JS/CSS runs inside a native WKWebView — no browser chrome, no address bar, no Safari. Just your app, full screen, behaving exactly like any other App Store title. This is the same technology used by apps like Airbnb, BBC, and countless others.

---

## Prerequisites

| Requirement | Where to get it |
|---|---|
| **Mac** running macOS Ventura 13+ | Required for Xcode |
| **Xcode 15 or later** | Mac App Store (free, ~8GB) |
| **Apple Developer Account** | developer.apple.com — $99 USD/year |
| **Node.js 20+** | nodejs.org |
| **CocoaPods** | `sudo gem install cocoapods` |

---

## Step 1 — Project Setup

```bash
# Clone or download this folder, then:
cd paralegal-exam-canada

# Install all dependencies (React, Capacitor, etc.)
npm install

# Bundle React locally — makes the app 100% offline from first launch
npm run build
# → This creates www/index.html with React inlined (no CDN needed)
```

---

## Step 2 — Add iOS Platform

```bash
# Add the iOS native project (first time only)
npx cap add ios

# This creates the ios/ folder with a full Xcode project
```

---

## Step 3 — Generate App Icons

Put `AppIcon-1024.svg` (included in this project) through one of these:

**Option A — Automatic (recommended)**
```bash
npx @capacitor/assets generate --ios
```
This reads `AppIcon-1024.svg` and generates all required sizes automatically.

**Option B — Manual**
Export `AppIcon-1024.svg` as a 1024×1024 PNG (no transparency, no rounded corners — Apple handles the rounding). Then use [appicon.co](https://appicon.co) to generate all required sizes and drag them into Xcode's Assets.xcassets.

---

## Step 4 — Splash Screen

Create a 2732×2732 PNG with your dark green background (#0B0F14) and the scale logo centered. Place it at:

```
ios/App/App/Assets.xcassets/Splash.imageset/splash.png
```

Or run:
```bash
npx @capacitor/assets generate --ios
```
(It reads a `splash.png` in your project root.)

---

## Step 5 — Sync & Open Xcode

```bash
# Sync your www/ build into the native iOS project
npx cap sync ios

# Open in Xcode
npx cap open ios
```

---

## Step 6 — Configure in Xcode

Inside Xcode, select the `App` target and set:

### General Tab
| Field | Value |
|---|---|
| **Display Name** | Paralegal Exam Canada |
| **Bundle Identifier** | `ca.paralegalexamcanada.app` |
| **Version** | `1.0.0` |
| **Build** | `1` |
| **Deployment Target** | iOS 16.0 |

### Signing & Capabilities Tab
- Select your Apple Developer Team
- Enable **Automatically manage signing**
- Xcode will create the provisioning profile automatically

---

## Step 7 — Info.plist Settings

Add these keys to `ios/App/App/Info.plist`:

```xml
<!-- Status bar -->
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>

<!-- Portrait only (or remove to allow all orientations) -->
<key>UISupportedInterfaceOrientations</key>
<array>
  <string>UIInterfaceOrientationPortrait</string>
</array>

<!-- Privacy descriptions (required by App Store) -->
<key>NSUserTrackingUsageDescription</key>
<string>This app does not track you. Your study data stays on your device.</string>
```

---

## Step 8 — Test on a Real Device

1. Connect your iPhone via USB
2. Select your device in the Xcode device picker (top bar)
3. Press **▶ Run** (Cmd+R)
4. Trust the developer certificate on your iPhone:
   → Settings → General → VPN & Device Management → Trust

---

## Step 9 — App Store Connect Setup

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **+** → **New App**
3. Fill in:

| Field | Value |
|---|---|
| **Name** | Paralegal Exam Canada |
| **Bundle ID** | `ca.paralegalexamcanada.app` |
| **Primary Language** | English (Canada) |
| **Category** | Education |
| **Secondary Category** | Reference |

---

## Step 10 — App Store Listing

### App Description
```
Master Canadian paralegal and legal knowledge across all 13 provinces and territories.

Paralegal Exam Canada is the most comprehensive Canadian legal knowledge study app available — built specifically for paralegal licensing exam candidates in Ontario and legal professionals across Canada.

565 PRACTICE QUESTIONS
Covering ethics & professional conduct, civil law & procedure, administrative law, provincial offences, criminal law, and legal practice — with questions specific to your province or territory.

EVERY PROVINCE & TERRITORY
Switch between Ontario, BC, Alberta, Quebec, and all 10 other jurisdictions. Each province has its own question bank covering the specific law societies, courts, limitation periods, tenancy bodies, human rights tribunals, workers' compensation systems, and professional conduct rules that matter for that jurisdiction.

EXAM MODES
• Quick (15 questions, 10 min)
• Sprint (50 questions)
• Half (80 questions)
• Full simulation (160 questions, 4.5 hours — matches the Ontario LSO licensing exam)
• Smart Exam — AI-weighted toward your weakest areas

STUDY TOOLS
• Topic drills by subject area
• Missed questions review (re-drill until you get them right)
• Bookmarks for questions you want to revisit
• Flashcards with tap-to-reveal
• Full question index with clickable source citations

TRACK YOUR PROGRESS
XP system, accuracy by subject area, study streaks, exam countdown timer, and a readiness indicator that calibrates to your actual performance.

103 LANGUAGES
Interface available in English, French, Spanish, Portuguese, German, Italian, Japanese, Korean, Arabic, Hindi, Punjabi, Tagalog, and 91 more — making legal education accessible to everyone preparing for a Canadian legal career.

All questions are original practice content. Progress saves locally to your device.
```

### Keywords (100 characters max)
```
paralegal,LSO,licensing exam,Canadian law,legal study,Ontario,bar exam,law society,legal knowledge
```

### Support URL
Create a simple page at your domain — even a single-page site with your contact email qualifies.

### Privacy Policy URL
Required. Use a free generator like [privacypolicygenerator.info](https://privacypolicygenerator.info) — this app collects nothing, so the policy will be very short.

---

## Step 11 — Screenshots

Apple requires screenshots for **iPhone 6.7" (iPhone 15 Pro Max)** and optionally for older sizes. You can capture these from the iPhone Simulator in Xcode:

1. In Xcode → Window → Devices and Simulators → Simulators
2. Select iPhone 15 Pro Max
3. Run the app (Cmd+R)
4. Take screenshots (Cmd+S in Simulator)

**Required screenshots** (at minimum):
- Home screen showing the question bank and stats
- A question in progress
- Exam results screen
- Province selector
- Language picker

Upload 3–10 screenshots per device size in App Store Connect.

---

## Step 12 — Archive and Upload

In Xcode:
1. Select **Any iOS Device** as the destination (not a simulator)
2. Menu → **Product → Archive**
3. When Archive is complete → Organizer window opens automatically
4. Click **Distribute App**
5. Select **App Store Connect**
6. Follow the wizard → Upload

---

## Step 13 — Submit for Review

Back in App Store Connect:
1. Select your build under the **TestFlight & Builds** section
2. Fill in **What's New in This Version**: `Initial release`
3. Set **Age Rating**: Complete the questionnaire → will be **4+**
4. Click **Submit for Review**

**Review timeline**: Apple typically reviews new apps in 1–3 business days. You'll receive an email when it's approved or if they need changes.

---

## App Privacy Label (Required)

In App Store Connect → App Privacy, declare:

**Data Not Collected** — this app collects zero user data. All progress is stored locally on the device. No analytics, no tracking, no servers.

Select: **No data collected** → Continue → Publish.

---

## After Approval

Once approved:
- Set your **price** (free recommended for broad adoption)
- Set **availability** to Canada (and wherever else you want)
- Click **Release This Version**

---

## Future Updates

When you update `paralegal-exam-sim.html` (add questions, fix bugs):

```bash
# 1. Replace index.html with the new build
cp /path/to/new/paralegal-exam-sim.html index.html

# 2. Re-inline React and sync
npm run build
npx cap sync ios

# 3. Open Xcode, bump the Build number, archive, and upload
npx cap open ios
```

---

## Project Structure

```
paralegal-exam-canada/
├── index.html              ← Your app (replace with new builds)
├── www/                    ← Built output (generated by npm run build)
│   └── index.html          ← React-inlined, offline-ready version
├── ios/                    ← Native iOS project (generated by Capacitor)
│   └── App/
│       └── App/
│           ├── Info.plist
│           └── Assets.xcassets/
│               ├── AppIcon.appiconset/
│               └── Splash.imageset/
├── scripts/
│   └── inline-react.js     ← Bundles React locally (no CDN)
├── AppIcon-1024.svg        ← Source icon — export as 1024×1024 PNG
├── capacitor.config.ts     ← Capacitor configuration
├── package.json
└── README-APP-STORE.md     ← This file
```

---

## Common Issues

**"No signing certificate" error in Xcode**
→ Xcode → Preferences → Accounts → Add your Apple ID → Download Manual Profiles

**App crashes on launch (device)**
→ Check that `www/index.html` exists. Run `npm run build` first.

**Blank white screen**
→ Open Safari → Develop → [Your Device] → index.html → Check console for errors

**"ITMS-90338" error on upload**
→ You have a duplicate key in Info.plist. Remove the duplicate.

**Apple rejects for missing privacy policy**
→ Add a real URL. Even a GitHub Pages site with a plain-text privacy policy works.

---

## Support

Built with ❤️ for the Canadian paralegal community.
565 questions · 13 provinces & territories · 103 languages
