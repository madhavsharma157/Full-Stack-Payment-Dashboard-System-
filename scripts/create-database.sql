-- Create database schema for Payment Dashboard

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    payment_method VARCHAR(50) NOT NULL,
    receiver VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Payment methods lookup table
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    method_name VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Audit log table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
