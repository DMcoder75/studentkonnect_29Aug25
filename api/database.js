// Backend API for database connections
const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'postgres.xududbaqaaffcaejwuix',
  password: 'D#lveer@123',
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// API endpoints
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Countries endpoints
app.get('/api/countries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM n_countries ORDER BY country_name');
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/countries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM n_countries WHERE country_id = $1', [id]);
    res.json({ data: result.rows[0] || null, error: null });
  } catch (error) {
    console.error('Error fetching country:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Universities endpoints
app.get('/api/universities', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.*, c.country_name 
      FROM new_universities u 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      ORDER BY u.university_name
    `);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/universities/country/:countryId', async (req, res) => {
  try {
    const { countryId } = req.params;
    const result = await pool.query(`
      SELECT u.*, c.country_name 
      FROM new_universities u 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE u.country_id = $1 
      ORDER BY u.university_name
    `, [countryId]);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching universities by country:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/universities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT u.*, c.country_name 
      FROM new_universities u 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE u.id = $1
    `, [id]);
    res.json({ data: result.rows[0] || null, error: null });
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Courses endpoints
app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
      FROM new_courses co 
      LEFT JOIN new_universities u ON co.university_id = u.university_id 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      ORDER BY co.program_name
    `);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/courses/university/:universityId', async (req, res) => {
  try {
    const { universityId } = req.params;
    const result = await pool.query(`
      SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
      FROM new_courses co 
      LEFT JOIN new_universities u ON co.university_id = u.university_id 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE co.university_id = $1 
      ORDER BY co.program_name
    `, [universityId]);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching courses by university:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
      FROM new_courses co 
      LEFT JOIN new_universities u ON co.university_id = u.university_id 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE co.course_id = $1
    `, [id]);
    res.json({ data: result.rows[0] || null, error: null });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Pathways endpoints
app.get('/api/pathways', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pathways ORDER BY pathway_name');
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error fetching pathways:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Search endpoints
app.get('/api/search/universities', async (req, res) => {
  try {
    const { q, country_id, university_type } = req.query;
    let query = `
      SELECT u.*, c.country_name, c.country_code 
      FROM new_universities u 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (q) {
      paramCount++;
      query += ` AND (u.university_name ILIKE $${paramCount} OR u.city ILIKE $${paramCount} OR u.state_province ILIKE $${paramCount})`;
      params.push(`%${q}%`);
    }

    if (country_id) {
      paramCount++;
      query += ` AND u.country_id = $${paramCount}`;
      params.push(country_id);
    }

    if (university_type) {
      paramCount++;
      query += ` AND u.university_type ILIKE $${paramCount}`;
      params.push(`%${university_type}%`);
    }

    query += ' ORDER BY u.university_name';

    const result = await pool.query(query, params);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error searching universities:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

app.get('/api/search/courses', async (req, res) => {
  try {
    const { q, university_id, degree_level } = req.query;
    let query = `
      SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
      FROM new_courses co 
      LEFT JOIN new_universities u ON co.university_id = u.university_id 
      LEFT JOIN n_countries c ON u.country_id = c.country_id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (q) {
      paramCount++;
      query += ` AND co.program_name ILIKE $${paramCount}`;
      params.push(`%${q}%`);
    }

    if (university_id) {
      paramCount++;
      query += ` AND co.university_id = $${paramCount}`;
      params.push(university_id);
    }

    if (degree_level) {
      paramCount++;
      query += ` AND co.degree_level = $${paramCount}`;
      params.push(degree_level);
    }

    query += ' ORDER BY co.program_name';

    const result = await pool.query(query, params);
    res.json({ data: result.rows, error: null });
  } catch (error) {
    console.error('Error searching courses:', error);
    res.status(500).json({ data: null, error: error.message });
  }
});

// Statistics endpoint
app.get('/api/statistics', async (req, res) => {
  try {
    const [countries, universities, courses, pathways] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM n_countries'),
      pool.query('SELECT COUNT(*) FROM new_universities'),
      pool.query('SELECT COUNT(*) FROM new_courses'),
      pool.query('SELECT COUNT(*) FROM pathways')
    ]);

    res.json({
      countries: parseInt(countries.rows[0].count),
      universities: parseInt(universities.rows[0].count),
      courses: parseInt(courses.rows[0].count),
      pathways: parseInt(pathways.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Database API server running on port ${PORT}`);
});

module.exports = app;

