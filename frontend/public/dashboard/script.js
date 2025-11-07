// Global variables
let allStudents = [];
let filteredStudents = [];
let charts = {};
let currentPage = 1;
const studentsPerPage = 20;
let sortColumn = 'RiskScore';
let sortDirection = 'desc';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
});

// Load CSV data
function loadData() {
    Papa.parse('data/Student_Risk_Dataset_2200.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            allStudents = results.data.map(student => {
                const riskData = computeRiskScore(student);
                return {
                    ...student,
                    RiskScore: riskData.score,
                    RiskCategory: riskData.category
                };
            });
            filteredStudents = [...allStudents];
            initializeFilters();
            updateDashboard();
        },
        error: function(error) {
            console.error('Error loading CSV:', error);
            // Use mock data if CSV fails
            generateMockData();
        }
    });
}

// Generate mock data if CSV not found
function generateMockData() {
    const departments = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts', 'Science'];
    const genders = ['Male', 'Female', 'Other'];
    const names = [
        'John Smith', 'Emma Johnson', 'Michael Brown', 'Sophia Davis', 'James Wilson',
        'Olivia Martinez', 'William Anderson', 'Ava Taylor', 'Robert Thomas', 'Isabella Garcia',
        'David Rodriguez', 'Mia Hernandez', 'Joseph Lopez', 'Charlotte Gonzalez', 'Charles Perez',
        'Amelia Moore', 'Thomas Lee', 'Harper White', 'Daniel Harris', 'Evelyn Clark'
    ];
    
    allStudents = [];
    for (let i = 0; i < 2200; i++) {
        const gpa = (Math.random() * 2.5 + 1.5).toFixed(2);
        const attendance = Math.floor(Math.random() * 40 + 60);
        const feeBalance = Math.random() > 0.7 ? Math.floor(Math.random() * 5000) : 0;
        const semester = Math.floor(Math.random() * 8) + 1;
        
        const student = {
            StudentID: `STU${String(i + 1).padStart(4, '0')}`,
            Name: names[Math.floor(Math.random() * names.length)] + ' ' + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
            Department: departments[Math.floor(Math.random() * departments.length)],
            Gender: genders[Math.floor(Math.random() * genders.length)],
            GPA: parseFloat(gpa),
            Attendance: attendance,
            FeeBalance: feeBalance,
            Semester: semester
        };
        
        const riskData = computeRiskScore(student);
        student.RiskScore = riskData.score;
        student.RiskCategory = riskData.category;
        
        allStudents.push(student);
    }
    
    filteredStudents = [...allStudents];
    initializeFilters();
    updateDashboard();
}

// Compute risk score
function computeRiskScore(student) {
    const gpaScore = (4 - parseFloat(student.GPA)) / 4;
    const attendanceScore = (100 - parseFloat(student.Attendance)) / 100;
    const financialFlag = student.FeeBalance > 0 ? 0.15 : 0;
    const risk = (0.5 * gpaScore + 0.3 * attendanceScore + financialFlag) * 100;
    
    let category;
    if (risk < 30) category = 'Low';
    else if (risk < 60) category = 'Medium';
    else category = 'High';
    
    return { score: Math.round(risk), category };
}

// Initialize filters
function initializeFilters() {
    const departments = [...new Set(allStudents.map(s => s.Department))].sort();
    const genders = [...new Set(allStudents.map(s => s.Gender))].sort();
    const semesters = [...new Set(allStudents.map(s => s.Semester))].sort((a, b) => a - b);
    
    populateSelect('departmentFilter', departments);
    populateSelect('genderFilter', genders);
    populateSelect('semesterFilter', semesters);
}

function populateSelect(id, options) {
    const select = document.getElementById(id);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

// Event listeners
function initializeEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchTab(targetTab);
        });
    });
    
    // Filters
    ['departmentFilter', 'genderFilter', 'riskFilter', 'semesterFilter'].forEach(id => {
        document.getElementById(id).addEventListener('change', applyFilters);
    });
    
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // Search
    document.getElementById('searchStudent').addEventListener('input', applySearch);
    
    // Table sorting
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'desc';
            }
            updateTable();
        });
    });
    
    // Modal
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('studentModal').addEventListener('click', (e) => {
        if (e.target.id === 'studentModal') closeModal();
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Apply filters
function applyFilters() {
    const dept = document.getElementById('departmentFilter').value;
    const gender = document.getElementById('genderFilter').value;
    const risk = document.getElementById('riskFilter').value;
    const semester = document.getElementById('semesterFilter').value;
    
    filteredStudents = allStudents.filter(student => {
        return (dept === 'all' || student.Department === dept) &&
               (gender === 'all' || student.Gender === gender) &&
               (risk === 'all' || student.RiskCategory === risk) &&
               (semester === 'all' || student.Semester == semester);
    });
    
    updateDashboard();
}

function resetFilters() {
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    document.getElementById('riskFilter').value = 'all';
    document.getElementById('semesterFilter').value = 'all';
    document.getElementById('searchStudent').value = '';
    
    filteredStudents = [...allStudents];
    updateDashboard();
}

function applySearch() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    
    if (searchTerm === '') {
        applyFilters();
        return;
    }
    
    filteredStudents = allStudents.filter(student => {
        return student.Name.toLowerCase().includes(searchTerm) ||
               student.StudentID.toLowerCase().includes(searchTerm);
    });
    
    updateTable();
}

// Update dashboard
function updateDashboard() {
    updateKPIs();
    updateCharts();
    updateTable();
}

// Update KPIs
function updateKPIs() {
    const avgGPA = (filteredStudents.reduce((sum, s) => sum + s.GPA, 0) / filteredStudents.length).toFixed(2);
    const avgAttendance = Math.round(filteredStudents.reduce((sum, s) => sum + s.Attendance, 0) / filteredStudents.length);
    const highRiskCount = filteredStudents.filter(s => s.RiskCategory === 'High').length;
    const highRiskPercent = ((highRiskCount / filteredStudents.length) * 100).toFixed(1);
    
    document.getElementById('avgGPA').textContent = avgGPA;
    document.getElementById('avgAttendance').textContent = avgAttendance + '%';
    document.getElementById('highRiskPercent').textContent = highRiskPercent + '%';
    document.getElementById('highRiskCount').textContent = `${highRiskCount} students`;
    document.getElementById('totalStudents').textContent = filteredStudents.length.toLocaleString();
}

// Update all charts
function updateCharts() {
    createRiskDonutChart();
    createDeptGPAChart();
    createGPARiskScatter();
    createAttendanceGPABubble();
    createGenderRiskChart();
    createSemesterTrendChart();
    createDeptRiskChart();
    createRiskScoreDistribution();
    createRiskHeatmap();
}

// Risk Donut Chart
function createRiskDonutChart() {
    const riskCounts = {
        'High': filteredStudents.filter(s => s.RiskCategory === 'High').length,
        'Medium': filteredStudents.filter(s => s.RiskCategory === 'Medium').length,
        'Low': filteredStudents.filter(s => s.RiskCategory === 'Low').length
    };
    
    if (charts.riskDonut) charts.riskDonut.destroy();
    
    const ctx = document.getElementById('riskDonutChart').getContext('2d');
    charts.riskDonut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Risk', 'Medium Risk', 'Low Risk'],
            datasets: [{
                data: [riskCounts.High, riskCounts.Medium, riskCounts.Low],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(16, 185, 129, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#e4e6eb', font: { size: 12 } }
                }
            }
        }
    });
}

// Department GPA Chart
function createDeptGPAChart() {
    const deptData = {};
    filteredStudents.forEach(s => {
        if (!deptData[s.Department]) deptData[s.Department] = [];
        deptData[s.Department].push(s.GPA);
    });
    
    const labels = Object.keys(deptData);
    const avgGPAs = labels.map(dept => {
        const gpas = deptData[dept];
        return (gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length).toFixed(2);
    });
    
    if (charts.deptGPA) charts.deptGPA.destroy();
    
    const ctx = document.getElementById('deptGPAChart').getContext('2d');
    charts.deptGPA = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average GPA',
                data: avgGPAs,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
}

// GPA vs Risk Scatter
function createGPARiskScatter() {
    const data = filteredStudents.map(s => ({
        x: s.GPA,
        y: s.RiskScore,
        backgroundColor: s.RiskCategory === 'High' ? 'rgba(239, 68, 68, 0.7)' :
                         s.RiskCategory === 'Medium' ? 'rgba(245, 158, 11, 0.7)' :
                         'rgba(16, 185, 129, 0.7)'
    }));
    
    if (charts.gpaRisk) charts.gpaRisk.destroy();
    
    const ctx = document.getElementById('gpaRiskScatter').getContext('2d');
    charts.gpaRisk = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Students',
                data: data,
                backgroundColor: data.map(d => d.backgroundColor),
                borderColor: data.map(d => d.backgroundColor.replace('0.7', '1')),
                borderWidth: 1,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'GPA', color: '#fbbf24' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    title: { display: true, text: 'Risk Score', color: '#fbbf24' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Attendance vs GPA Bubble
function createAttendanceGPABubble() {
    const data = filteredStudents.slice(0, 100).map(s => ({
        x: s.Attendance,
        y: s.GPA,
        r: s.RiskScore / 5,
        backgroundColor: s.RiskCategory === 'High' ? 'rgba(239, 68, 68, 0.6)' :
                         s.RiskCategory === 'Medium' ? 'rgba(245, 158, 11, 0.6)' :
                         'rgba(16, 185, 129, 0.6)'
    }));
    
    if (charts.attendanceGPA) charts.attendanceGPA.destroy();
    
    const ctx = document.getElementById('attendanceGPABubble').getContext('2d');
    charts.attendanceGPA = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Students (bubble size = risk)',
                data: data,
                backgroundColor: data.map(d => d.backgroundColor),
                borderColor: data.map(d => d.backgroundColor.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Attendance %', color: '#fbbf24' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    title: { display: true, text: 'GPA', color: '#fbbf24' },
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Gender Risk Chart
function createGenderRiskChart() {
    const genderData = {};
    filteredStudents.forEach(s => {
        if (!genderData[s.Gender]) {
            genderData[s.Gender] = { High: 0, Medium: 0, Low: 0 };
        }
        genderData[s.Gender][s.RiskCategory]++;
    });
    
    const labels = Object.keys(genderData);
    
    if (charts.genderRisk) charts.genderRisk.destroy();
    
    const ctx = document.getElementById('genderRiskChart').getContext('2d');
    charts.genderRisk = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'High Risk',
                    data: labels.map(g => genderData[g].High),
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Medium Risk',
                    data: labels.map(g => genderData[g].Medium),
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Low Risk',
                    data: labels.map(g => genderData[g].Low),
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    stacked: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    stacked: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
}

// Semester Trend Chart
function createSemesterTrendChart() {
    const semesterData = {};
    filteredStudents.forEach(s => {
        if (!semesterData[s.Semester]) semesterData[s.Semester] = [];
        semesterData[s.Semester].push(s.GPA);
    });
    
    const labels = Object.keys(semesterData).sort((a, b) => a - b);
    const avgGPAs = labels.map(sem => {
        const gpas = semesterData[sem];
        return (gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length).toFixed(2);
    });
    
    if (charts.semesterTrend) charts.semesterTrend.destroy();
    
    const ctx = document.getElementById('semesterTrendChart').getContext('2d');
    charts.semesterTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.map(l => `Sem ${l}`),
            datasets: [{
                label: 'Average GPA',
                data: avgGPAs,
                borderColor: 'rgba(245, 158, 11, 1)',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(245, 158, 11, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: '#cbd5e1' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
}

// Department Risk Chart
function createDeptRiskChart() {
    const deptData = {};
    filteredStudents.forEach(s => {
        if (!deptData[s.Department]) {
            deptData[s.Department] = { High: 0, Medium: 0, Low: 0 };
        }
        deptData[s.Department][s.RiskCategory]++;
    });
    
    const labels = Object.keys(deptData);
    
    if (charts.deptRisk) charts.deptRisk.destroy();
    
    const ctx = document.getElementById('deptRiskChart').getContext('2d');
    charts.deptRisk = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'High Risk',
                    data: labels.map(d => deptData[d].High),
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Medium Risk',
                    data: labels.map(d => deptData[d].Medium),
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 2
                },
                {
                    label: 'Low Risk',
                    data: labels.map(d => deptData[d].Low),
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    stacked: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
}

// Risk Score Distribution
function createRiskScoreDistribution() {
    const bins = Array(10).fill(0);
    filteredStudents.forEach(s => {
        const binIndex = Math.min(Math.floor(s.RiskScore / 10), 9);
        bins[binIndex]++;
    });
    
    if (charts.riskScoreDist) charts.riskScoreDist.destroy();
    
    const ctx = document.getElementById('riskScoreDistribution').getContext('2d');
    charts.riskScoreDist = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
            datasets: [{
                label: 'Number of Students',
                data: bins,
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    title: { display: true, text: 'Risk Score Range', color: '#fbbf24' },
                    ticks: { color: '#cbd5e1' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
}

// Risk Heatmap
function createRiskHeatmap() {
    const heatmapData = {};
    filteredStudents.forEach(s => {
        const key = `${s.Department}_${s.Semester}`;
        if (!heatmapData[key]) {
            heatmapData[key] = { dept: s.Department, sem: s.Semester, risks: [] };
        }
        heatmapData[key].risks.push(s.RiskScore);
    });
    
    const departments = [...new Set(filteredStudents.map(s => s.Department))].sort();
    const semesters = [...new Set(filteredStudents.map(s => s.Semester))].sort((a, b) => a - b);
    
    const container = document.getElementById('riskHeatmap');
    container.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';
    
    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row';
    headerRow.innerHTML = '<div class="heatmap-label">Department</div>';
    semesters.forEach(sem => {
        headerRow.innerHTML += `<div class="heatmap-label">Sem ${sem}</div>`;
    });
    grid.appendChild(headerRow);
    
    // Data rows
    departments.forEach(dept => {
        const row = document.createElement('div');
        row.className = 'heatmap-row';
        row.innerHTML = `<div class="heatmap-label">${dept}</div>`;
        
        semesters.forEach(sem => {
            const key = `${dept}_${sem}`;
            const cellData = heatmapData[key];
            
            if (cellData && cellData.risks.length > 0) {
                const avgRisk = cellData.risks.reduce((sum, r) => sum + r, 0) / cellData.risks.length;
                const color = avgRisk < 30 ? 'rgba(16, 185, 129, 0.7)' :
                             avgRisk < 60 ? 'rgba(245, 158, 11, 0.7)' :
                             'rgba(239, 68, 68, 0.7)';
                row.innerHTML += `<div class="heatmap-cell" style="background: ${color}">${Math.round(avgRisk)}</div>`;
            } else {
                row.innerHTML += `<div class="heatmap-cell" style="background: rgba(255, 255, 255, 0.1)">-</div>`;
            }
        });
        
        grid.appendChild(row);
    });
    
    container.appendChild(grid);
}

// Update table
function updateTable() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    
    // Sort data
    const sorted = [...filteredStudents].sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Pagination
    const totalPages = Math.ceil(sorted.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = Math.min(startIndex + studentsPerPage, sorted.length);
    const pageData = sorted.slice(startIndex, endIndex);
    
    // Populate table
    pageData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.StudentID}</td>
            <td>${student.Name}</td>
            <td>${student.Department}</td>
            <td>${student.GPA.toFixed(2)}</td>
            <td>${student.Attendance}%</td>
            <td><span class="risk-badge risk-${student.RiskCategory.toLowerCase()}">${student.RiskCategory}</span></td>
            <td>${student.RiskScore}</td>
            <td><button class="view-btn" onclick="viewStudent('${student.StudentID}')">View</button></td>
        `;
        tbody.appendChild(row);
    });
    
    // Update pagination
    updatePagination(totalPages);
}

function updatePagination(totalPages) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    };
    container.appendChild(prevBtn);
    
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            updateTable();
        };
        container.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateTable();
        }
    };
    container.appendChild(nextBtn);
}

// View student modal
function viewStudent(studentId) {
    const student = allStudents.find(s => s.StudentID === studentId);
    if (!student) return;
    
    document.getElementById('modalStudentName').textContent = student.Name;
    document.getElementById('modalStudentID').textContent = student.StudentID;
    document.getElementById('modalDepartment').textContent = student.Department;
    document.getElementById('modalGender').textContent = student.Gender;
    document.getElementById('modalSemester').textContent = student.Semester;
    document.getElementById('modalGPA').textContent = student.GPA.toFixed(2);
    document.getElementById('modalAttendance').textContent = student.Attendance + '%';
    document.getElementById('modalFeeBalance').textContent = '$' + student.FeeBalance.toLocaleString();
    document.getElementById('modalRiskScore').textContent = student.RiskScore;
    
    const badge = document.getElementById('modalRiskBadge');
    badge.textContent = student.RiskCategory;
    badge.className = `risk-badge risk-${student.RiskCategory.toLowerCase()}`;
    
    // Create student performance chart
    const ctx = document.getElementById('modalChart').getContext('2d');
    if (window.modalChart) window.modalChart.destroy();
    
    window.modalChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['GPA (scaled)', 'Attendance', 'Financial Status', 'Overall Risk'],
            datasets: [{
                label: 'Student Metrics',
                data: [
                    (student.GPA / 4) * 100,
                    student.Attendance,
                    student.FeeBalance === 0 ? 100 : 50,
                    100 - student.RiskScore
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: '#cbd5e1' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    pointLabels: { color: '#fbbf24' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#e4e6eb' }
                }
            }
        }
    });
    
    document.getElementById('studentModal').classList.add('active');
}

function closeModal() {
    document.getElementById('studentModal').classList.remove('active');
}

// Make viewStudent globally accessible
window.viewStudent = viewStudent;