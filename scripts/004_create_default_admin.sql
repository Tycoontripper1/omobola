-- Create a default admin user for initial access
-- This user can create other accounts through the admin dashboard

-- Insert default admin profile (this will be linked when the user signs up)
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at) VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin@omobolaschool.edu', 'System Administrator', 'admin', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Note: The admin user needs to sign up through Supabase Auth with:
-- Email: admin@omobolaschool.edu
-- Password: (set during first signup)
-- The profile will be automatically linked via the trigger
