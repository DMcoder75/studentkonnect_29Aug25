from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)
CORS(app)

# Database connection configuration
DB_CONFIG = {
    'user': 'postgres.xududbaqaaffcaejwuix',
    'password': 'D#lveer@123',
    'host': 'aws-0-ap-southeast-2.pooler.supabase.com',
    'port': 6543,
    'database': 'postgres'
}

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

@app.route('/')
def home():
    return jsonify({"message": "StudentKonnect Database API", "status": "running"})

@app.route('/api/countries', methods=['GET'])
def get_countries():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM n_countries ORDER BY country_name")
        countries = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": countries, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/countries/<int:country_id>', methods=['GET'])
def get_country(country_id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM n_countries WHERE country_id = %s", (country_id,))
        country = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": country, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/universities', methods=['GET'])
def get_universities():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT u.*, c.country_name, c.country_code 
            FROM new_universities u 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            ORDER BY u.university_name
        """)
        universities = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": universities, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/universities/country/<int:country_id>', methods=['GET'])
def get_universities_by_country(country_id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT u.*, c.country_name, c.country_code 
            FROM new_universities u 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE u.country_id = %s 
            ORDER BY u.university_name
        """, (country_id,))
        universities = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": universities, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/universities/<int:university_id>', methods=['GET'])
def get_university(university_id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT u.*, c.country_name, c.country_code 
            FROM new_universities u 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE u.university_id = %s
        """, (university_id,))
        university = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": university, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/courses', methods=['GET'])
def get_courses():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
            FROM new_courses co 
            LEFT JOIN new_universities u ON co.university_id = u.university_id 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            ORDER BY co.program_name
        """)
        courses = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": courses, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/courses/university/<int:university_id>', methods=['GET'])
def get_courses_by_university(university_id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
            FROM new_courses co 
            LEFT JOIN new_universities u ON co.university_id = u.university_id 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE co.university_id = %s 
            ORDER BY co.program_name
        """, (university_id,))
        courses = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": courses, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("""
            SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
            FROM new_courses co 
            LEFT JOIN new_universities u ON co.university_id = u.university_id 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE co.course_id = %s
        """, (course_id,))
        course = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": course, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/pathways', methods=['GET'])
def get_pathways():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM pathways ORDER BY pathway_name")
        pathways = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": pathways, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/search/universities', methods=['GET'])
def search_universities():
    try:
        q = request.args.get('q', '')
        country_id = request.args.get('country_id', '')
        university_type = request.args.get('university_type', '')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT u.*, c.country_name, c.country_code 
            FROM new_universities u 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE 1=1
        """
        params = []
        
        if q:
            query += " AND (u.university_name ILIKE %s OR u.city ILIKE %s OR u.state_province ILIKE %s)"
            params.extend([f'%{q}%', f'%{q}%', f'%{q}%'])
        
        if country_id:
            query += " AND u.country_id = %s"
            params.append(country_id)
        
        if university_type:
            query += " AND u.university_type ILIKE %s"
            params.append(f'%{university_type}%')
        
        query += " ORDER BY u.university_name"
        
        cursor.execute(query, params)
        universities = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": universities, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/search/courses', methods=['GET'])
def search_courses():
    try:
        q = request.args.get('q', '')
        university_id = request.args.get('university_id', '')
        degree_level = request.args.get('degree_level', '')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({"data": None, "error": "Database connection failed"}), 500
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            SELECT co.*, u.university_name, u.city, u.state_province, c.country_name, c.country_code 
            FROM new_courses co 
            LEFT JOIN new_universities u ON co.university_id = u.university_id 
            LEFT JOIN n_countries c ON u.country_id = c.country_id 
            WHERE 1=1
        """
        params = []
        
        if q:
            query += " AND co.program_name ILIKE %s"
            params.append(f'%{q}%')
        
        if university_id:
            query += " AND co.university_id = %s"
            params.append(university_id)
        
        if degree_level:
            query += " AND co.degree_level = %s"
            params.append(degree_level)
        
        query += " ORDER BY co.program_name"
        
        cursor.execute(query, params)
        courses = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({"data": courses, "error": None})
    except Exception as e:
        return jsonify({"data": None, "error": str(e)}), 500

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
        
        cursor = conn.cursor()
        
        # Get counts for each table
        cursor.execute("SELECT COUNT(*) FROM n_countries")
        countries_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM new_universities")
        universities_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM new_courses")
        courses_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM pathways")
        pathways_count = cursor.fetchone()[0]
        
        cursor.close()
        conn.close()
        
        return jsonify({
            "countries": countries_count,
            "universities": universities_count,
            "courses": courses_count,
            "pathways": pathways_count
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

