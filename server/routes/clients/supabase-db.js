import { Pool } from 'pg';

export const pool = new Pool({
    host: "aws-1-us-west-2.pooler.supabase.com",
    port: "6543",
    database: "postgres",
    user: "postgres.tafjyavfpqrkaxwrprfm",
    password: "x3fDzEEsKjg0dkCO",
});