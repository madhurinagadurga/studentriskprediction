# 🚀 GitHub Pages Deployment Guide
### Student Risk Prediction Dashboard

---

## 📋 Prerequisites

- A GitHub account (free) - [Sign up here](https://github.com/join)
- Your dashboard files ready

---

## 📁 Files You Need

Make sure you have these files:
```
student-risk-dashboard/
├── index.html
├── style.css
├── script.js
├── data/
│   └── Student_Risk_Dataset_2200.csv
└── README.md (optional)
```

---

## 🎯 Deployment Steps

### Method 1: Web Upload (Easiest - No Git Knowledge Required)

#### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and **login**
2. Click the **"+"** icon in top-right corner
3. Select **"New repository"**

![New Repository](https://docs.github.com/assets/cb-11427/images/help/repository/repo-create.png)

4. Fill in the details:
   - **Repository name:** `student-risk-dashboard` (or any name you prefer)
   - **Description:** "Student Risk Prediction Analytics Dashboard"
   - **Visibility:** Choose **Public** (required for free GitHub Pages)
   - **✓ Check:** "Add a README file"
5. Click **"Create repository"**

---

#### Step 2: Upload Your Files

1. In your new repository, click **"Add file"** → **"Upload files"**

![Upload Files](https://docs.github.com/assets/cb-9337/images/help/repository/upload-files-button.png)

2. **Drag and drop** all your dashboard files into the upload area:
   - index.html
   - style.css
   - script.js
   - The entire **data** folder (with CSV file inside)

3. Scroll down and click **"Commit changes"**

> ⚠️ **Important:** Make sure the `data` folder structure is maintained!

---

#### Step 3: Enable GitHub Pages

1. In your repository, click the **"Settings"** tab (top menu)

2. In the left sidebar, scroll down and click **"Pages"**

![Pages Setting](https://docs.github.com/assets/cb-40951/images/help/pages/pages-settings-tab.png)

3. Under **"Source"**, click the dropdown and select:
   - **Deploy from a branch**

4. Under **"Branch"**, select:
   - Branch: **main**
   - Folder: **/ (root)**

5. Click **"Save"**

![Branch Selection](https://docs.github.com/assets/cb-47267/images/help/pages/publishing-source-drop-down.png)

---

#### Step 4: Wait for Deployment

1. GitHub will show a message: "Your site is ready to be published"
2. **Wait 2-3 minutes** for the build process
3. Refresh the page
4. You'll see: **"Your site is live at https://username.github.io/student-risk-dashboard/"**

---

#### Step 5: Access Your Dashboard

Your dashboard is now live! Access it at:

```
https://YOUR_USERNAME.github.io/student-risk-dashboard/
```

**Example:**
- If your GitHub username is `johndoe`
- Your dashboard URL: `https://johndoe.github.io/student-risk-dashboard/`

---

### Method 2: Using GitHub Desktop (For Regular Updates)

#### Step 1: Install GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and open the application
3. Sign in with your GitHub account

---

#### Step 2: Create Repository

1. Click **File** → **New Repository**
2. Fill in:
   - **Name:** `student-risk-dashboard`
   - **Local Path:** Choose where to save on your computer
3. Click **"Create Repository"**

---

#### Step 3: Add Your Files

1. Open the repository folder on your computer
2. Copy all dashboard files into this folder
3. GitHub Desktop will show all new files

---

#### Step 4: Commit and Push

1. In GitHub Desktop:
   - Enter commit message: "Add student risk dashboard"
   - Click **"Commit to main"**
2. Click **"Publish repository"** button
   - ✓ Keep this code **public**
   - Click **"Publish Repository"**

---

#### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Follow **Step 3** from Method 1 above

---

### Method 3: Using Git Command Line (Advanced)

If you're comfortable with terminal/command prompt:

```bash
# Navigate to your dashboard folder
cd path/to/student-risk-dashboard

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Student Risk Dashboard"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/student-risk-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages via repository Settings → Pages.

---

## ✅ Verification

After deployment, check if your dashboard is working:

1. Visit your GitHub Pages URL
2. You should see the **Login/Register** page
3. Create an account and login
4. Verify all charts are loading
5. Test the filters and navigation

---

## 🔧 Troubleshooting

### Problem: 404 Page Not Found

**Solutions:**
- Wait 5 more minutes (deployment can take time)
- Check if `index.html` is in the repository root (not in a subfolder)
- Verify GitHub Pages is enabled in Settings → Pages
- Make sure repository is **Public**

---

### Problem: Blank White Page

**Solutions:**
- Open browser console (Press F12)
- Check for JavaScript errors
- Verify all files were uploaded correctly
- Check if `data` folder exists with CSV file

---

### Problem: Charts Not Loading

**Solutions:**
- Check browser console (F12) for errors
- Verify internet connection (CDN libraries need to load)
- Make sure CSV file is in `data/` folder
- Try hard refresh: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

---

### Problem: CSV File Not Found

**Solutions:**
- Verify folder structure:
  ```
  repository/
  ├── index.html (root level)
  ├── style.css (root level)
  ├── script.js (root level)
  └── data/
      └── Student_Risk_Dataset_2200.csv
  ```
- Re-upload the `data` folder if needed
- Check file names match exactly (case-sensitive)

---

### Problem: Login Not Working

**Solutions:**
- Check if JavaScript is enabled in browser
- Clear browser cache and cookies
- Try incognito/private mode
- Make sure localStorage is not blocked

---

## 🔄 Updating Your Dashboard

### Using Web Interface:

1. Go to your repository on GitHub
2. Click on the file you want to edit
3. Click the pencil icon (Edit)
4. Make changes
5. Scroll down and click "Commit changes"
6. Wait 2-3 minutes for redeployment

### Using GitHub Desktop:

1. Make changes to files locally
2. Open GitHub Desktop
3. Review changes
4. Enter commit message
5. Click "Commit to main"
6. Click "Push origin"

---

## 🌐 Custom Domain (Optional)

Want to use your own domain instead of `username.github.io`?

1. Buy a domain from any registrar (GoDaddy, Namecheap, etc.)
2. In your repository:
   - Go to **Settings** → **Pages**
   - Under "Custom domain", enter your domain
   - Click **Save**
3. Update your domain's DNS settings:
   - Add a CNAME record pointing to: `username.github.io`
4. Wait 24-48 hours for DNS propagation

---

## 📊 Dashboard Features

Your deployed dashboard includes:

✅ **Login/Register System** - Secure authentication using localStorage  
✅ **10+ Interactive Charts** - Real-time data visualizations  
✅ **Risk Analysis** - Predictive algorithms for student performance  
✅ **Dynamic Filtering** - Filter by department, gender, risk, semester  
✅ **Student Profiles** - Detailed individual student analytics  
✅ **Documentation** - Complete guide to formulas and charts  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  

---

## 🎓 Using Your Own Data

To replace the mock data with your actual student data:

1. Export your data to CSV format
2. Ensure columns match:
   ```
   StudentID,Name,Department,Gender,GPA,Attendance,FeeBalance,Semester
   ```
3. Save as `Student_Risk_Dataset_2200.csv`
4. Replace the file in `data/` folder
5. Commit and push changes

---

## 🔒 Security Notes

- **Passwords** are stored in browser localStorage (not recommended for production)
- For real production use, implement proper backend authentication
- GitHub Pages hosts static sites only (no server-side code)
- Don't store sensitive student data in public repositories

---

## 📈 Analytics (Optional)

Want to track visits to your dashboard?

1. Sign up for [Google Analytics](https://analytics.google.com/)
2. Get your tracking ID
3. Add this code to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_TRACKING_ID');
</script>
```

---

## 💡 Tips for Success

1. **Test Locally First:** Open `index.html` in your browser before deploying
2. **Keep Backups:** Download your repository periodically
3. **Use Meaningful Commits:** Write clear commit messages for tracking changes
4. **Monitor Performance:** Check browser console for errors regularly
5. **Update Regularly:** Keep your data and visualizations current

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Tutorial](https://git-scm.com/docs/gittutorial)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [HTML/CSS/JS Basics](https://www.w3schools.com/)

---

## 🎯 What's Next?

After successful deployment, you can:

1. **Share Your Dashboard:** Send the URL to stakeholders
2. **Customize Design:** Modify colors, fonts, layout in `style.css`
3. **Add Features:** Extend functionality in `script.js`
4. **Export Reports:** Take screenshots or print charts for presentations
5. **Integrate APIs:** Connect to real-time data sources

---

## ✉️ Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Review browser console for specific errors
3. Search GitHub Pages documentation
4. Check if repository settings are correct
5. Verify all files are uploaded properly

---

## 🎉 Success!

Congratulations! Your Student Risk Prediction Dashboard is now live on the internet!

**Remember:**
- Your URL: `https://YOUR_USERNAME.github.io/student-risk-dashboard/`
- Updates take 2-3 minutes to appear
- Repository must stay public for free hosting
- Dashboard works 24/7 with 99.9% uptime

---

**© 2025 Nexus Strategies | Student Risk Prediction System**

*Built with HTML, CSS, JavaScript | Powered by GitHub Pages*
