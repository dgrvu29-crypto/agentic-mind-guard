-- Sample data for AgenticAI development and testing
-- Run this via Lovable Cloud UI or Supabase SQL editor

-- IMPORTANT: First create an admin user by signing up through the UI
-- Then run this to give them admin role (replace USER_ID_HERE with actual UUID):
-- INSERT INTO user_roles (user_id, role) VALUES ('USER_ID_HERE', 'admin')
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Insert sample mental health resources
INSERT INTO resources (
  title, 
  description, 
  content,
  department, 
  contact_email, 
  contact_phone,
  tags, 
  access_level
) VALUES
(
  'University Counseling Center',
  'Free, confidential counseling services for all enrolled students',
  'The Counseling Center provides individual therapy, group counseling, crisis intervention, and psychiatric consultations. Services are free and confidential for all enrolled students. Walk-in hours are Monday-Friday 9am-5pm, with appointments available extended hours.',
  'Student Health Services',
  'counseling@university.edu',
  '(555) 123-4567',
  ARRAY['counseling', 'therapy', 'crisis'],
  'public'
),
(
  'Campus Crisis Hotline',
  '24/7 mental health crisis support line staffed by trained counselors',
  'Our crisis hotline is available 24 hours a day, 7 days a week. Trained mental health professionals provide immediate support for students experiencing a mental health emergency. All calls are confidential.',
  'Emergency Services',
  'crisis@university.edu',
  '(555) 988-8888',
  ARRAY['crisis', 'emergency', '24/7'],
  'public'
),
(
  'Peer Support Groups',
  'Student-led support groups meeting weekly for various mental health topics',
  'Join fellow students in safe, supportive group settings. Topics include anxiety management, depression support, grief and loss, LGBTQ+ support, and more. All groups are facilitated by trained peer counselors.',
  'Student Wellness',
  'peersupport@university.edu',
  '(555) 123-4568',
  ARRAY['peer support', 'group therapy', 'community'],
  'public'
),
(
  'Mindfulness & Meditation Classes',
  'Free weekly mindfulness sessions to reduce stress and improve mental clarity',
  'Learn evidence-based mindfulness techniques to manage stress, anxiety, and improve focus. No experience necessary. Sessions held every Tuesday and Thursday at 5pm in the Wellness Center.',
  'Wellness Center',
  'wellness@university.edu',
  '(555) 123-4569',
  ARRAY['mindfulness', 'meditation', 'stress management'],
  'public'
),
(
  'Academic Success Coaching',
  'One-on-one coaching for students struggling with academic stress and performance',
  'Work with a trained coach to develop strategies for time management, test anxiety, procrastination, and academic performance. Includes study skills workshops and stress management techniques.',
  'Academic Support Services',
  'academiccoach@university.edu',
  '(555) 123-4570',
  ARRAY['academic', 'stress', 'coaching'],
  'public'
),
(
  'Substance Use Support',
  'Confidential support and resources for students concerned about substance use',
  'Non-judgmental support for students who want to explore their relationship with alcohol, drugs, or other substances. Includes individual consultations, support groups, and referrals to specialized treatment.',
  'Health Services',
  'substancesupport@university.edu',
  '(555) 123-4571',
  ARRAY['substance use', 'addiction', 'recovery'],
  'public'
),
(
  'International Student Support',
  'Culturally-sensitive counseling and support for international students',
  'Support services specifically designed for international students dealing with cultural adjustment, homesickness, visa stress, and mental health concerns. Counselors understand unique challenges faced by international students.',
  'International Student Services',
  'intlsupport@university.edu',
  '(555) 123-4572',
  ARRAY['international', 'cultural', 'adjustment'],
  'public'
),
(
  'LGBTQ+ Resource Center',
  'Safe space and support services for LGBTQ+ students',
  'The LGBTQ+ Resource Center provides counseling, support groups, educational resources, and social events. Drop-in hours daily 10am-6pm. All services are affirming and confidential.',
  'Diversity & Inclusion',
  'lgbtq@university.edu',
  '(555) 123-4573',
  ARRAY['LGBTQ+', 'identity', 'support'],
  'public'
);

-- Note: To add more resources, admins can use the admin dashboard upload feature
-- or insert directly via SQL following the same pattern above

-- Sample audit log entries (anonymized examples for testing)
-- These would normally be created automatically by the system
INSERT INTO audit_logs (user_id_hash, action, resource_type, metadata) VALUES
('anonymized_hash_001', 'assessment_started', 'assessment', '{"timestamp": "2025-01-01T10:00:00Z"}'::jsonb),
('anonymized_hash_002', 'resource_viewed', 'resource', '{"resource_id": "counseling_center", "timestamp": "2025-01-01T11:00:00Z"}'::jsonb),
('anonymized_hash_003', 'booking_created', 'booking', '{"timestamp": "2025-01-01T12:00:00Z"}'::jsonb);

-- Verification queries (run these to check data was inserted correctly)
-- SELECT COUNT(*) FROM resources WHERE access_level = 'public';
-- SELECT title, department FROM resources ORDER BY title;
