# 📋 Quick Reference Card
## Student Risk Prediction Dashboard

---

## 🧮 RISK SCORE FORMULA (MEMORIZE THIS!)

```
Risk Score = (0.5 × GPA_Component + 0.3 × Attendance_Component + Financial_Flag) × 100

Where:
  GPA_Component = (4.0 - Student_GPA) / 4.0
  Attendance_Component = (100 - Attendance%) / 100
  Financial_Flag = 0.15 if Fee Balance > $0, else 0

Categories:
  Low Risk:    0-29   (🟢 Green)
  Medium Risk: 30-59  (🟡 Orange)
  High Risk:   60-100 (🔴 Red)
```

**Quick Example:**
```
GPA 2.5, Attendance 70%, Fee $1200
= (0.5 × 0.375 + 0.3 × 0.30 + 0.15) × 100
= 42.75 → Medium Risk
```

---

## 📊 CHART SUMMARY (9 CHARTS)

| # | Chart Name | Purpose | Key Insight |
|---|------------|---------|-------------|
| 1 | **Risk Distribution Donut** | Overall risk breakdown | What % are high risk? |
| 2 | **Department GPA Bars** | Compare dept performance | Which dept needs help? |
| 3 | **GPA vs Risk Scatter** | Correlation visualization | Are there outliers? |
| 4 | **Attendance-GPA Bubbles** | 3D relationship view | High attendance, low GPA? |
| 5 | **Gender Risk Stacked Bars** | Equity check | Fair distribution? |
| 6 | **Semester GPA Trend Line** | Performance over time | Improving or declining? |
| 7 | **Risk Heatmap Grid** | Dept × Semester risk | Hot spots? |
| 8 | **Dept Risk Horizontal Bars** | Risk by department | Where to focus resources? |
| 9 | **Risk Score Histogram** | Distribution shape | Normal curve? |

---

## 🚀 GITHUB DEPLOYMENT (5-MINUTE VERSION)

### Step 1: Create Repository (2 min)
1. Go to https://github.com → Click **"+"** → **"New repository"**
2. Name: `student-risk-dashboard`
3. Make it **PUBLIC** ✅
4. Check "Add README"
5. Click **"Create"**

### Step 2: Upload Files (2 min)
1. Click **"Add file"** → **"Upload files"**
2. Drag: `index.html`, `style.css`, `script.js`, `data/` folder
3. Click **"Commit changes"**

### Step 3: Enable Pages (1 min)
1. **Settings** → **Pages**
2. Source: **"Deploy from branch"**
3. Branch: **"main"** + **"/ (root)"**
4. Click **"Save"**
5. Wait 2 minutes

### Your URL:
```
https://YOUR_USERNAME.github.io/student-risk-dashboard/
```

---

## 🔑 LOGIN INSTRUCTIONS

1. Open dashboard URL
2. Click **"Register here"**
3. Enter any name, email, password (min 6 chars)
4. Click **"Create Account"**
5. ✅ You're in!

**Note:** Accounts saved in browser only (localStorage)

---

## ⚡ COMMON ISSUES & FIXES

| Problem | Quick Fix |
|---------|-----------|
| **404 Error** | Wait 5 minutes, then refresh |
| **Blank Page** | Hard refresh: `Ctrl + Shift + R` |
| **No Charts** | Check internet, wait 5 seconds |
| **CSV Not Loading** | Verify `data` folder uploaded |
| **Can't Login** | Clear browser cache, try again |

---

## 📖 CHART READING TIPS

### What to Look For:

✅ **Risk Distribution:** Want mostly green  
✅ **GPA Bars:** All above 2.5  
✅ **Scatter Plot:** Downward slope = good  
✅ **Bubbles:** Upper-right area = low risk  
✅ **Trend Line:** Upward = improving  
✅ **Heatmap:** Avoid red clusters  

### Red Flags:

🚩 **>20% High Risk students**  
🚩 **Department GPA < 2.0**  
🚩 **Declining semester trend**  
🚩 **Large red section in heatmap**  
🚩 **Bimodal histogram** (two peaks)

---

## 🎯 USING FILTERS

1. **Select department/gender/risk/semester**
2. **All charts update automatically**
3. **Click "Reset All Filters" to clear**
4. **Search box: find students by name/ID**

---

## 📁 FILE STRUCTURE

```
dashboard/
├── index.html          ← Main page
├── style.css          ← Styling  
├── script.js          ← Logic
├── data/
│   └── Student_Risk_Dataset_2200.csv  ← Data
└── COMPLETE_GUIDE.md  ← Full documentation
```

---

## 🔄 TO UPDATE DASHBOARD

### On GitHub:
1. Click file to edit
2. Click ✏️ (pencil icon)
3. Make changes
4. Scroll down → "Commit changes"
5. Wait 2 minutes for redeployment

---

## 📞 NEED MORE HELP?

📖 **Full Documentation:**
- `COMPLETE_GUIDE.md` - Everything explained in detail
- `QUICK_START_GUIDE.md` - Getting started tutorial  
- `GITHUB_DEPLOYMENT_GUIDE.md` - Deployment with screenshots

🌐 **Live Dashboard:**
```
https://riskmetrics.preview.emergentagent.com/dashboard/
```

💻 **Browser Console (for errors):**
- Press **F12**
- Click **"Console"** tab
- Look for red error messages

---

## ✅ DEPLOYMENT CHECKLIST

Before going live, verify:

```
✅ All files uploaded (including data folder)
✅ Repository is PUBLIC
✅ GitHub Pages enabled
✅ URL works (wait 2-3 minutes)
✅ Login page loads
✅ Can create account
✅ Charts display
✅ Filters work
✅ Student table populates
✅ Modal opens when clicking "View"
✅ Documentation tab loads
```

---

## 🎓 KEY NUMBERS TO KNOW

| Metric | Value | What It Means |
|--------|-------|---------------|
| **Total Students** | 2,200 | Full dataset size |
| **Risk Weights** | 50/30/15 | GPA/Attendance/Finance |
| **Low Risk %** | ~50% | Ideal proportion |
| **Charts** | 10+ | Total visualizations |
| **Departments** | 10 | Engineering, CS, etc. |
| **Semesters** | 8 | Full 4-year period |

---

## 💡 PRO TIPS

1. **Filter before presenting** - Focus on specific departments
2. **Screenshot charts** - For reports and presentations  
3. **Export student list** - Use table sorting
4. **Monitor trends** - Check semester chart monthly
5. **Compare periods** - Take screenshots over time

---

**© 2025 Nexus Strategies | Student Risk Prediction System**

*Keep this card handy for quick reference!*

---

**Print This Page:** File → Print → Save as PDF for offline access
