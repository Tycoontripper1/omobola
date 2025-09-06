-- Insert sample subjects
INSERT INTO public.subjects (name, code, description) VALUES
  ('Mathematics', 'MATH', 'Core mathematics curriculum'),
  ('English Language', 'ENG', 'English language and literature'),
  ('Science', 'SCI', 'General science subjects'),
  ('Social Studies', 'SS', 'History, geography, and civics'),
  ('Computer Studies', 'CS', 'Basic computer literacy'),
  ('Physical Education', 'PE', 'Sports and physical fitness')
ON CONFLICT (code) DO NOTHING;

-- Note: Users, teachers, and students will be created through the admin dashboard
-- This ensures proper authentication and role assignment
