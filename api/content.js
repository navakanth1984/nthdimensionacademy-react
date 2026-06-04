// Vercel Serverless Function: API Website Content CMS Handler
// Fetches website text from MongoDB Atlas, falling back to static defaults if not set.

import { MongoClient } from 'mongodb';

// Fallback content in case MongoDB is not configured yet
const defaultContent = {
  hero: {
    title: "Get Set Certified",
    subtitle: "Microsoft Fabric & Azure mastery, led by MCT Navakanth Reddy Dumpa. Step through the data multiverse."
  },
  about: {
    summary1: "Master Consultant and Microsoft Certified Trainer (MCT) with over 14 years of industry experience across global enterprises. Recognized for bridging the gap between complex cloud engineering and scalable technical enablement.",
    summary2: "A specialist in the Azure Data Ecosystem, delivering high-impact training programs for global audiences while concurrently serving as a Lead Data Architect. Proven expertise in designing Medallion architectures using Microsoft Fabric and Azure Databricks, empowering teams through structured, certification-aligned curricula and real-world project mentoring."
  },
  achievements: [
    {
      title: 'Enterprise Upskilling',
      desc: 'Elevated the Azure data capabilities of global engineering squads through DP-600, DP-203, and DP-900 training.'
    },
    {
      title: 'Fabric Adoption',
      desc: 'Spearheaded the internal “Fabric Readiness” program, accelerating the transition to Lakehouse architectures.'
    },
    {
      title: 'Certification Enablement',
      desc: 'Mentored teams through Microsoft curricula, driving high certification success rates for Azure Data and Power BI.'
    }
  ],
  experience: [
    {
      role: 'MCT Lead & Lead Consultant',
      company: 'Genpact India Pvt Ltd',
      duration: 'Dec 2019 – Present',
      desc: 'Elite MCT Trainer & Data Architect: upskilling global engineering squads on DP-700, DP-600, and DP-900. Architected production-grade Medallion architectures using Microsoft Fabric & Azure Databricks.'
    },
    {
      role: 'Process Lead (VBA Programmer)',
      company: 'Deloitte (via Magna Infotech)',
      duration: '2018 – 2019',
      desc: 'Enterprise Analytics Architect: automated reporting and built interactive Power BI, Synapse, and Alteryx workflows for high-scale Consumer-Packaged Goods analytics.'
    },
    {
      role: 'Data Analyst',
      company: 'IBM (via Alchemy Techsol)',
      duration: '2015 – 2017',
      desc: 'Financial & Automation Analyst: designed financial models, custom macros, and Cognos/VBA automated reporting systems for global SLA monitoring.'
    },
    {
      role: 'QA Data Analyst',
      company: 'Wells Fargo (via Magna Infotech)',
      duration: '2009 – 2011',
      desc: 'QA Data & Macro Engineer: conditioned and validated multi-terabyte financial datasets, building custom Excel/VBA tools for banking test environments.'
    },
    {
      role: 'MIS Officer',
      company: 'Sitel India',
      duration: '2007 – 2009',
      desc: 'MIS & Reporting Specialist: developed automated templates, database procedures, and custom SQL/VBA scripts for SLA tracking.'
    },
    {
      role: 'Customer Dialog Executive',
      company: 'Magus Customer Dialog Pvt Ltd',
      duration: '2005 – 2006',
      desc: 'Operations & Metrics Coordinator: engineered reporting templates and data-driven client tracking models for customer service desks.'
    }
  ]
};

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
  // GET: Fetch current site content
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const collection = db.collection('content');
      const content = await collection.findOne({ type: 'website_config' });

      if (content) {
        return res.status(200).json(content.data);
      } else {
        // Initialize DB with defaults if collection is empty
        await collection.insertOne({ type: 'website_config', data: defaultContent });
        return res.status(200).json(defaultContent);
      }
    } catch (error) {
      console.warn('MongoDB fallback activated:', error.message);
      return res.status(200).json(defaultContent);
    }
  }

  // POST: Update site content
  if (req.method === 'POST') {
    const { password, data } = req.body;
    const CMS_ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'nthadmin123';

    if (password !== CMS_ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized credentials.' });
    }

    if (!data) {
      return res.status(400).json({ error: 'No data provided for update.' });
    }

    try {
      const db = await connectToDatabase();
      const collection = db.collection('content');
      
      await collection.updateOne(
        { type: 'website_config' },
        { $set: { data } },
        { upsert: true }
      );

      return res.status(200).json({ status: 'success', message: 'Content successfully synced to database.' });
    } catch (error) {
      console.error('MongoDB update failed:', error);
      return res.status(500).json({ error: 'Failed to write content to database.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
