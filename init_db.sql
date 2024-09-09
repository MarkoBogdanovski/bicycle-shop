CREATE DATABASE shop;
CREATE USER owneru WITH PASSWORD 'shoppw';
ALTER DATABASE shop OWNER TO owneru;
ALTER ROLE owneru SET client_encoding TO 'utf8';
ALTER ROLE owneru SET default_transaction_isolation TO 'read committed';
ALTER ROLE owneru SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON SCHEMA public TO owneru;
