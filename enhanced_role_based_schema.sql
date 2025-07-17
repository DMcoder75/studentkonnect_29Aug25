-- Enhanced Role-Based User System Database Schema
-- Execute these SQL statements in your Supabase SQL editor

-- 1. Create user_roles table to define available roles
CREATE TABLE IF NOT EXISTS user_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert predefined roles
INSERT INTO user_roles (role_name, role_description, permissions) VALUES
('student', 'Student users exploring university pathways', '{"can_view_courses": true, "can_save_favorites": true, "can_apply": true, "can_view_pathways": true}'),
('professor', 'Professors and teachers from educational institutions', '{"can_view_courses": true, "can_manage_courses": true, "can_view_students": true, "can_create_content": true}'),
('authority', 'College/School authority and administrative staff', '{"can_view_all": true, "can_manage_institution": true, "can_view_analytics": true, "can_manage_users": true}'),
('admin', 'System administrators with full access', '{"can_manage_all": true, "can_view_all": true, "can_delete_users": true, "can_manage_system": true}')
ON CONFLICT (role_name) DO UPDATE SET
    role_description = EXCLUDED.role_description,
    permissions = EXCLUDED.permissions;

-- 2. Enhanced users table with role support
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_image_url TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    bio TEXT,
    role_id INTEGER REFERENCES user_roles(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended')),
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Student-specific profile table
CREATE TABLE IF NOT EXISTS student_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    student_id VARCHAR(50), -- University student ID
    current_institution VARCHAR(255),
    study_level VARCHAR(50) CHECK (study_level IN ('high_school', 'undergraduate', 'postgraduate', 'phd')),
    field_of_study VARCHAR(255),
    graduation_year INTEGER,
    gpa DECIMAL(3,2),
    preferred_location VARCHAR(100),
    university_preferences TEXT[],
    career_interests TEXT[],
    extracurricular_activities TEXT[],
    achievements TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Professor-specific profile table
CREATE TABLE IF NOT EXISTS professor_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    employee_id VARCHAR(50),
    institution_name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    position VARCHAR(100), -- Professor, Associate Professor, Lecturer, etc.
    specialization TEXT[],
    qualifications TEXT[],
    research_interests TEXT[],
    publications_count INTEGER DEFAULT 0,
    years_of_experience INTEGER,
    office_location VARCHAR(255),
    office_hours VARCHAR(255),
    courses_taught TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Authority-specific profile table (College/School Authority)
CREATE TABLE IF NOT EXISTS authority_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    employee_id VARCHAR(50),
    institution_name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(50) CHECK (institution_type IN ('university', 'college', 'school', 'institute')),
    position VARCHAR(100), -- Dean, Principal, Director, etc.
    department VARCHAR(255),
    responsibilities TEXT[],
    managed_programs TEXT[],
    institution_address TEXT,
    institution_website VARCHAR(255),
    accreditation_details TEXT,
    years_in_position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Admin-specific profile table
CREATE TABLE IF NOT EXISTS admin_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    admin_level VARCHAR(50) CHECK (admin_level IN ('super_admin', 'system_admin', 'content_admin', 'support_admin')),
    access_level INTEGER DEFAULT 1, -- 1-5 scale
    managed_modules TEXT[], -- Which parts of the system they manage
    last_admin_action TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create triggers for updated_at on all tables
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_student_profiles_updated_at ON student_profiles;
CREATE TRIGGER update_student_profiles_updated_at
    BEFORE UPDATE ON student_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_professor_profiles_updated_at ON professor_profiles;
CREATE TRIGGER update_professor_profiles_updated_at
    BEFORE UPDATE ON professor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_authority_profiles_updated_at ON authority_profiles;
CREATE TRIGGER update_authority_profiles_updated_at
    BEFORE UPDATE ON authority_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at
    BEFORE UPDATE ON admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Enhanced user_favorites table with role-based access
DROP TABLE IF EXISTS user_favorites CASCADE;
CREATE TABLE user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL, -- 'university', 'course', 'pathway', 'professor'
    item_id INTEGER NOT NULL,
    notes TEXT, -- User's personal notes about the favorite
    priority INTEGER DEFAULT 1, -- 1-5 priority rating
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- 10. Create demo users for each role
-- Demo Student
INSERT INTO users (email, password_hash, first_name, last_name, role_id, bio, email_verified) 
SELECT 
    'student@unipath.com',
    '$2b$10$demo.hash.for.password123',
    'Demo',
    'Student',
    r.id,
    'I am a demo student exploring university pathways and career opportunities.',
    true
FROM user_roles r WHERE r.role_name = 'student'
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- Demo Professor
INSERT INTO users (email, password_hash, first_name, last_name, role_id, bio, email_verified) 
SELECT 
    'professor@unipath.com',
    '$2b$10$demo.hash.for.password123',
    'Dr. Sarah',
    'Johnson',
    r.id,
    'I am a Computer Science professor with expertise in AI and Machine Learning.',
    true
FROM user_roles r WHERE r.role_name = 'professor'
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- Demo Authority
INSERT INTO users (email, password_hash, first_name, last_name, role_id, bio, email_verified) 
SELECT 
    'authority@unipath.com',
    '$2b$10$demo.hash.for.password123',
    'Michael',
    'Thompson',
    r.id,
    'I am the Dean of Engineering at Melbourne University, overseeing academic programs.',
    true
FROM user_roles r WHERE r.role_name = 'authority'
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- Demo Admin
INSERT INTO users (email, password_hash, first_name, last_name, role_id, bio, email_verified) 
SELECT 
    'admin@unipath.com',
    '$2b$10$demo.hash.for.password123',
    'System',
    'Administrator',
    r.id,
    'I am the system administrator managing the UniPath platform.',
    true
FROM user_roles r WHERE r.role_name = 'admin'
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- 11. Create role-specific profiles for demo users
-- Student Profile
INSERT INTO student_profiles (user_id, student_id, current_institution, study_level, field_of_study, graduation_year, preferred_location, university_preferences, career_interests)
SELECT 
    u.id,
    'STU2024001',
    'Melbourne High School',
    'high_school',
    'Science and Mathematics',
    2024,
    'Melbourne, Australia',
    ARRAY['University of Melbourne', 'Monash University', 'RMIT University'],
    ARRAY['Software Engineering', 'Data Science', 'Artificial Intelligence', 'Cybersecurity']
FROM users u 
JOIN user_roles r ON u.role_id = r.id 
WHERE r.role_name = 'student' AND u.email = 'student@unipath.com'
ON CONFLICT (user_id) DO UPDATE SET
    current_institution = EXCLUDED.current_institution,
    study_level = EXCLUDED.study_level,
    updated_at = NOW();

-- Professor Profile
INSERT INTO professor_profiles (user_id, employee_id, institution_name, department, position, specialization, qualifications, research_interests, years_of_experience, courses_taught)
SELECT 
    u.id,
    'PROF2024001',
    'University of Melbourne',
    'Computer Science and Software Engineering',
    'Associate Professor',
    ARRAY['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    ARRAY['PhD in Computer Science - Stanford University', 'MSc in AI - MIT'],
    ARRAY['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
    12,
    ARRAY['Introduction to AI', 'Machine Learning Fundamentals', 'Advanced Deep Learning']
FROM users u 
JOIN user_roles r ON u.role_id = r.id 
WHERE r.role_name = 'professor' AND u.email = 'professor@unipath.com'
ON CONFLICT (user_id) DO UPDATE SET
    institution_name = EXCLUDED.institution_name,
    department = EXCLUDED.department,
    updated_at = NOW();

-- Authority Profile
INSERT INTO authority_profiles (user_id, employee_id, institution_name, institution_type, position, department, responsibilities, managed_programs, years_in_position)
SELECT 
    u.id,
    'AUTH2024001',
    'University of Melbourne',
    'university',
    'Dean of Engineering',
    'Faculty of Engineering and Information Technology',
    ARRAY['Academic oversight', 'Curriculum development', 'Faculty management', 'Student affairs'],
    ARRAY['Bachelor of Engineering', 'Master of Engineering', 'PhD in Engineering'],
    5
FROM users u 
JOIN user_roles r ON u.role_id = r.id 
WHERE r.role_name = 'authority' AND u.email = 'authority@unipath.com'
ON CONFLICT (user_id) DO UPDATE SET
    institution_name = EXCLUDED.institution_name,
    position = EXCLUDED.position,
    updated_at = NOW();

-- Admin Profile
INSERT INTO admin_profiles (user_id, admin_level, access_level, managed_modules)
SELECT 
    u.id,
    'super_admin',
    5,
    ARRAY['user_management', 'content_management', 'system_settings', 'analytics', 'security']
FROM users u 
JOIN user_roles r ON u.role_id = r.id 
WHERE r.role_name = 'admin' AND u.email = 'admin@unipath.com'
ON CONFLICT (user_id) DO UPDATE SET
    admin_level = EXCLUDED.admin_level,
    access_level = EXCLUDED.access_level,
    updated_at = NOW();

-- 12. Enable Row Level Security (RLS) for all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authority_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- 13. Create RLS policies
-- Users can view their own profile and admins can view all
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (
        auth.uid()::text = id::text OR 
        EXISTS (
            SELECT 1 FROM users u2 
            JOIN user_roles r ON u2.role_id = r.id 
            WHERE u2.id::text = auth.uid()::text AND r.role_name = 'admin'
        )
    );

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Role-specific profile policies
CREATE POLICY "Users can manage own student profile" ON student_profiles
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own professor profile" ON professor_profiles
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own authority profile" ON authority_profiles
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can manage admin profiles" ON admin_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users u 
            JOIN user_roles r ON u.role_id = r.id 
            WHERE u.id::text = auth.uid()::text AND r.role_name = 'admin'
        )
    );

-- Favorites policies
CREATE POLICY "Users can manage own favorites" ON user_favorites
    FOR ALL USING (auth.uid()::text = user_id::text);

-- 14. Create storage bucket for profile images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- 15. Create view for complete user information
CREATE OR REPLACE VIEW user_complete_profiles AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.profile_image_url,
    u.phone,
    u.date_of_birth,
    u.bio,
    u.status,
    u.email_verified,
    u.last_login,
    u.created_at,
    u.updated_at,
    r.role_name,
    r.role_description,
    r.permissions,
    -- Role-specific data
    sp.student_id,
    sp.current_institution as student_institution,
    sp.study_level,
    sp.field_of_study,
    sp.graduation_year,
    sp.university_preferences,
    sp.career_interests,
    pp.employee_id as professor_employee_id,
    pp.institution_name as professor_institution,
    pp.department as professor_department,
    pp.position as professor_position,
    pp.specialization,
    pp.research_interests,
    ap.institution_name as authority_institution,
    ap.institution_type,
    ap.position as authority_position,
    ap.responsibilities,
    adp.admin_level,
    adp.access_level,
    adp.managed_modules
FROM users u
JOIN user_roles r ON u.role_id = r.id
LEFT JOIN student_profiles sp ON u.id = sp.user_id
LEFT JOIN professor_profiles pp ON u.id = pp.user_id
LEFT JOIN authority_profiles ap ON u.id = ap.user_id
LEFT JOIN admin_profiles adp ON u.id = adp.user_id;

-- 16. Verify demo users were created
SELECT 
    u.email,
    u.first_name,
    u.last_name,
    r.role_name,
    u.status,
    u.created_at
FROM users u
JOIN user_roles r ON u.role_id = r.id
WHERE u.email IN ('student@unipath.com', 'professor@unipath.com', 'authority@unipath.com', 'admin@unipath.com')
ORDER BY r.role_name;

