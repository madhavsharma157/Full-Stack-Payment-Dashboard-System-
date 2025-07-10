-- Seed data for Payment Dashboard

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjO', 'admin'),
('viewer1', 'viewer1@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjO', 'viewer'),
('manager', 'manager@example.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjO', 'admin');

-- Insert payment methods
INSERT INTO payment_methods (method_name) VALUES
('credit_card'),
('debit_card'),
('paypal'),
('bank_transfer'),
('apple_pay'),
('google_pay');

-- Insert sample payments
INSERT INTO payments (transaction_id, amount, status, payment_method, receiver, description, created_at) VALUES
('TXN001', 250.00, 'success', 'credit_card', 'john.doe@example.com', 'Payment for services', '2024-01-15 10:30:00'),
('TXN002', 150.00, 'pending', 'paypal', 'jane.smith@example.com', 'Monthly subscription payment', '2024-01-15 09:15:00'),
('TXN003', 350.00, 'success', 'bank_transfer', 'bob.johnson@example.com', 'Invoice payment', '2024-01-14 16:45:00'),
('TXN004', 75.00, 'failed', 'credit_card', 'alice.brown@example.com', 'Payment declined - insufficient funds', '2024-01-14 14:20:00'),
('TXN005', 500.00, 'success', 'debit_card', 'charlie.wilson@example.com', 'Product purchase', '2024-01-13 11:30:00'),
('TXN006', 125.50, 'success', 'apple_pay', 'diana.lee@example.com', 'Mobile app purchase', '2024-01-13 09:45:00'),
('TXN007', 89.99, 'pending', 'google_pay', 'frank.miller@example.com', 'Subscription renewal', '2024-01-12 15:20:00'),
('TXN008', 299.00, 'success', 'credit_card', 'grace.taylor@example.com', 'Annual membership', '2024-01-12 12:10:00'),
('TXN009', 45.00, 'failed', 'paypal', 'henry.davis@example.com', 'Payment timeout', '2024-01-11 18:30:00'),
('TXN010', 175.25, 'success', 'bank_transfer', 'ivy.chen@example.com', 'Consulting services', '2024-01-11 14:15:00');
