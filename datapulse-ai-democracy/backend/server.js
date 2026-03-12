const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 5001;
const AI_SERVICE_URL = 'http://127.0.0.1:8000';
const DATA_FILE = path.join(__dirname, 'data', 'voters.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize empty data if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ voters: [], clusters: [] }));
}

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Fallback classification when AI service is down
function fallbackClassification(voters) {
  const voter_groups = [];
  const group_counts = {};
  const scheme_map = {};

  voters.forEach((v, idx) => {
    const age = parseInt(v.Age) || 0;
    const gen = (v.Gender || '').toLowerCase();
    const occ = (v.Occupation || '').toLowerCase();
    const isFemale = gen.includes('female') || gen === 'f';
    const isFarmer = occ.includes('farmer');

    const groups = [];
    const eligible_schemes = [];

    if (age < 18) {
      groups.push('Youth (Under 18)');
      eligible_schemes.push('Child Welfare Schemes');
    } else if (age <= 25) {
      groups.push('Youth (18-25)');
      eligible_schemes.push('Skill India (18+)', 'Youth Education Scholarship', 'Startup India');
    } else if (age <= 35) {
      groups.push('Youth (26-35)');
      eligible_schemes.push('Skill India (18+)', 'Startup India');
    } else if (age < 60) {
      groups.push('Working Age (36-59)');
    } else {
      groups.push('Senior Citizens (60+)');
      eligible_schemes.push('Ayushman Bharat', 'Senior Citizen Pension');
    }
    if (isFemale) {
      groups.push('Women');
      eligible_schemes.push('Beti Bachao Beti Padhao', 'Ujjwala Yojana');
      if (age >= 21 && age <= 60) eligible_schemes.push('Ladli Behna Yojana');
    }
    if (isFarmer) {
      groups.push('Farmers');
      eligible_schemes.push('PM-KISAN', 'Crop Insurance (Fasal Bima)');
    }

    groups.forEach(g => { group_counts[g] = (group_counts[g] || 0) + 1; });
    [...new Set(eligible_schemes)].forEach(s => {
      if (!scheme_map[s]) scheme_map[s] = 0;
      scheme_map[s]++;
    });

    voter_groups.push({
      id: v.id || idx + 1,
      Name: v.Name,
      Age: v.Age,
      Gender: v.Gender,
      Occupation: v.Occupation,
      BoothID: v.BoothID,
      groups,
      primary_group: groups[0],
      eligible_schemes: [...new Set(eligible_schemes)],
    });
  });

  const scheme_groups = Object.entries(scheme_map).map(([scheme, count]) => ({
    scheme,
    count,
    eligibility: scheme,
    description: '',
  }));
  const clusters = Object.entries(group_counts).map(([cluster_name, count]) => ({ cluster_name, count }));
  const group_summary = Object.entries(group_counts).map(([name, count]) => ({ name, count }));
  const recommendations = scheme_groups.map(sg => ({ cluster: sg.eligibility, scheme: sg.scheme }));

  return { clusters, recommendations, voter_groups, scheme_groups, group_summary };
}

// Helper to read voters data
function getVotersData() {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper to save voters data
function saveVotersData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Upload and process CSV
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const content = req.file.buffer.toString('utf8');
    const records = parse(content, { columns: true, skip_empty_lines: true });

    const voters = records.map((row, idx) => ({
      id: idx + 1,
      Name: row.Name || row.name || '',
      Age: parseInt(row.Age || row.age || 0) || 0,
      Gender: row.Gender || row.gender || '',
      BoothID: row.BoothID || row.boothid || row.boothId || '',
      Area: row.Area || row.area || '',
      Occupation: row.Occupation || row.occupation || '',
      Experience: row.Experience || row.experience || '',
    })).filter(v => v.Name && v.Age > 0);

    const data = getVotersData();
    data.voters = voters;

    // Call AI service for clustering and classification
    try {
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/api/cluster`, {
        voters: data.voters,
      }, { timeout: 10000 });
      data.clusters = aiResponse.data.clusters || [];
      data.recommendations = aiResponse.data.recommendations || [];
      data.voter_groups = aiResponse.data.voter_groups || [];
      data.scheme_groups = aiResponse.data.scheme_groups || [];
      data.group_summary = aiResponse.data.group_summary || [];
    } catch (aiError) {
      console.warn('AI service unavailable, using fallback classification:', aiError.message);
      const fallback = fallbackClassification(data.voters);
      data.clusters = fallback.clusters;
      data.recommendations = fallback.recommendations;
      data.voter_groups = fallback.voter_groups;
      data.scheme_groups = fallback.scheme_groups;
      data.group_summary = fallback.group_summary;
    }

    saveVotersData(data);
    res.json({ message: 'Data uploaded successfully', count: voters.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Failed to process CSV' });
  }
});

// Get analytics data
app.get('/api/analytics', (req, res) => {
  try {
    const data = getVotersData();
    const voters = data.voters || [];

    if (voters.length === 0) {
      return res.json({
        ageDistribution: [],
        genderRatio: {},
        boothCounts: [],
        clusterDistribution: [],
        recommendations: [],
        voter_groups: [],
        scheme_groups: [],
        group_summary: [],
        totalVoters: 0,
      });
    }

    // Age distribution
    const ageBuckets = { '18-25': 0, '26-40': 0, '41-60': 0, '61+': 0 };
    voters.forEach(v => {
      const age = v.Age || 0;
      if (age <= 25) ageBuckets['18-25']++;
      else if (age <= 40) ageBuckets['26-40']++;
      else if (age <= 60) ageBuckets['41-60']++;
      else ageBuckets['61+']++;
    });
    const ageDistribution = Object.entries(ageBuckets).map(([label, count]) => ({ label, count }));

    // Gender ratio
    const genderRatio = {};
    voters.forEach(v => {
      const g = (v.Gender || 'Unknown').trim() || 'Unknown';
      genderRatio[g] = (genderRatio[g] || 0) + 1;
    });

    // Booth-wise counts
    const boothMap = {};
    voters.forEach(v => {
      const b = v.BoothID || 'Unknown';
      boothMap[b] = (boothMap[b] || 0) + 1;
    });
    const boothCounts = Object.entries(boothMap).map(([boothId, count]) => ({ boothId, count }));

    // Cluster distribution (from AI or fallback)
    let clusterDistribution = [];
    if (data.clusters && data.clusters.length > 0) {
      const clusterMap = {};
      data.clusters.forEach(c => {
        const name = c.cluster_name || c.name || 'Unknown';
        clusterMap[name] = (clusterMap[name] || 0) + (c.count || 1);
      });
      clusterDistribution = Object.entries(clusterMap).map(([name, count]) => ({ name, count }));
    } else {
      // Fallback: derive clusters from occupation/age
      const clusters = { 'Youth': 0, 'Farmers': 0, 'Senior Citizens': 0, 'Women (other)': 0 };
      voters.forEach(v => {
        const age = v.Age || 0;
        const occ = (v.Occupation || '').toLowerCase();
        const gen = (v.Gender || '').toLowerCase();
        if (age <= 30) clusters['Youth']++;
        else if (occ.includes('farmer')) clusters['Farmers']++;
        else if (age >= 60) clusters['Senior Citizens']++;
        else clusters['Women (other)']++;
      });
      clusterDistribution = Object.entries(clusters).filter(([_, c]) => c > 0).map(([name, count]) => ({ name, count }));
    }

    // Compute classification if missing (e.g. data loaded before update)
    let voterGroups = data.voter_groups || [];
    let schemeGroups = data.scheme_groups || [];
    let groupSummary = data.group_summary || [];
    if (!voterGroups.length && voters.length > 0) {
      const fb = fallbackClassification(voters);
      voterGroups = fb.voter_groups;
      schemeGroups = fb.scheme_groups;
      groupSummary = fb.group_summary;
    }

    res.json({
      ageDistribution,
      genderRatio,
      boothCounts,
      clusterDistribution,
      recommendations: data.recommendations || [],
      voter_groups: voterGroups,
      scheme_groups: schemeGroups,
      group_summary: groupSummary,
      totalVoters: voters.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get raw voters list
app.get('/api/voters', (req, res) => {
  try {
    const data = getVotersData();
    res.json({ voters: data.voters || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Load sample data (for quick demo)
app.get('/api/load-sample', async (req, res) => {
  try {
    const samplePath = path.join(__dirname, '..', 'data', 'sample_voters.csv');
    if (!fs.existsSync(samplePath)) {
      return res.status(404).json({ error: 'Sample file not found' });
    }
    const content = fs.readFileSync(samplePath, 'utf8');
    const records = parse(content, { columns: true, skip_empty_lines: true });
    const voters = records.map((row, idx) => ({
      id: idx + 1,
      Name: row.Name || row.name || '',
      Age: parseInt(row.Age || row.age || 0) || 0,
      Gender: row.Gender || row.gender || '',
      BoothID: row.BoothID || row.boothid || row.boothId || '',
      Area: row.Area || row.area || '',
      Occupation: row.Occupation || row.occupation || '',
      Experience: row.Experience || row.experience || '',
    })).filter(v => v.Name && v.Age > 0);
    const data = getVotersData();
    data.voters = voters;
    try {
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/api/cluster`, { voters: data.voters }, { timeout: 10000 });
      data.clusters = aiResponse.data.clusters || [];
      data.recommendations = aiResponse.data.recommendations || [];
      data.voter_groups = aiResponse.data.voter_groups || [];
      data.scheme_groups = aiResponse.data.scheme_groups || [];
      data.group_summary = aiResponse.data.group_summary || [];
    } catch {
      const fallback = fallbackClassification(data.voters);
      data.clusters = fallback.clusters;
      data.recommendations = fallback.recommendations;
      data.voter_groups = fallback.voter_groups;
      data.scheme_groups = fallback.scheme_groups;
      data.group_summary = fallback.group_summary;
    }
    saveVotersData(data);
    res.json({ message: 'Sample data loaded', count: voters.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Download sample CSV
app.get('/api/download-sample', (req, res) => {
  const samplePath = path.join(__dirname, '..', 'data', 'sample_voters.csv');
  if (!fs.existsSync(samplePath)) {
    return res.status(404).json({ error: 'Sample file not found' });
  }
  const content = fs.readFileSync(samplePath, 'utf8');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="sample_voters.csv"');
  res.send(content);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`DataPulse Backend running at http://localhost:${PORT}`);
});
