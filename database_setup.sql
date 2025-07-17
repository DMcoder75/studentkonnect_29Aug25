-- SQL statements for creating users table and demo user
-- Execute these in your Supabase SQL editor

-- 1. Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_image_url TEXT,
    phone VARCHAR(20),
    date_of_birth DATE,
    bio TEXT,
    university_preferences TEXT[], -- Array of university IDs or names
    career_interests TEXT[], -- Array of career interests
    study_level VARCHAR(50), -- 'undergraduate', 'postgraduate', 'phd'
    preferred_location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 3. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. Insert demo user
-- Note: In production, passwords should be properly hashed
-- For demo purposes, we'll use a simple hash representation
INSERT INTO users (
    email,
    password_hash,
    first_name,
    last_name,
    bio,
    university_preferences,
    career_interests,
    study_level,
    preferred_location
) VALUES (
    'demouser@unipath.com',
    '$2b$10$demo.hash.for.password123', -- This represents hashed 'password@123'
    'Demo',
    'User',
    'I am a demo user exploring university pathways and career opportunities. Passionate about technology and education.',
    ARRAY['University of Melbourne', 'University of Sydney', 'Australian National University'],
    ARRAY['Software Engineering', 'Data Science', 'Artificial Intelligence', 'Web Development'],
    'undergraduate',
    'Melbourne, Australia'
) ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    bio = EXCLUDED.bio,
    university_preferences = EXCLUDED.university_preferences,
    career_interests = EXCLUDED.career_interests,
    study_level = EXCLUDED.study_level,
    preferred_location = EXCLUDED.preferred_location,
    updated_at = NOW();

-- 5. Enable Row Level Security (RLS) for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 6. Create policy to allow users to read/update their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- 7. Create storage bucket for profile images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Create storage policy for profile images
CREATE POLICY "Users can upload own profile images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view profile images" ON storage.objects
    FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Users can update own profile images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own profile images" ON storage.objects
    FOR DELETE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 9. Create user_favorites table for storing user favorites
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL, -- 'university', 'course', 'pathway'
    item_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- 10. Enable RLS for user_favorites
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites" ON user_favorites
    FOR ALL USING (auth.uid()::text = user_id::text);

-- 11. Verify the demo user was created
SELECT 
    id,
    email,
    first_name,
    last_name,
    bio,
    university_preferences,
    career_interests,
    study_level,
    preferred_location,
    created_at
FROM users 
WHERE email = 'demouser@unipath.com';

