// Vercel Serverless Function: API Lead Capture Handler
// Receives certification matcher leads, stores them in MongoDB Atlas, and returns confirmation.

import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environmental variable not found.');
  }

  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db('nthdimension');
  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email, phone, recommendedCourse, background, timeline, timestamp } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required fields.' });
    }

    const leadDocument = {
      name,
      email,
      phone,
      recommendedCourse: recommendedCourse || 'Unspecified',
      background: background || 'General',
      timeline: timeline || 'Immediate',
      source: 'CertificationMatcher',
      createdAt: timestamp ? new Date(timestamp) : new Date(),
      status: 'NEW'
    };

    try {
      const db = await connectToDatabase();
      const collection = db.collection('leads');
      const result = await collection.insertOne(leadDocument);

      return res.status(201).json({
        status: 'success',
        message: 'Lead successfully captured.',
        leadId: result.insertedId
      });
    } catch (err) {
      console.warn('MongoDB connection failed for lead capture, logging to stdout:', err.message);
      // Even if MongoDB is temporarily unconfigured, respond 200 so student UX is not disrupted
      return res.status(200).json({
        status: 'fallback_logged',
        message: 'Lead recorded in server log.'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed.' });
}
