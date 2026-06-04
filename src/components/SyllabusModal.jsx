import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const syllabusData = {
  dp700: {
    trustPill: "DP-700 MASTER CURRICULUM",
    title: "Microsoft Fabric Data Engineer Atlas",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-700",
    credential: "Fabric Data Engineer Associate",
    level: "Elite Master",
    cost: "$165 USD",
    weights: [
      { topic: "Implement & Manage Analytics Solution", weight: "30–35%" },
      { topic: "Ingest & Transform Data", weight: "30–35%" },
      { topic: "Monitor & Optimize Analytics Solution", weight: "30–35%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum is engineered to guide data professionals through the architectural and operational realities of the unified Microsoft Fabric ecosystem.",
      "Perfect for intermediate and advanced data professionals seeking to master batch pipelines, lakehouse medallion architectures, database mirroring, OneLake virtualization, real-time intelligence streams, and version control (CI/CD DevOps)."
    ],
    tracks: [
      {
        title: "🛠️ Track 1: Workspace Management, Security & CI/CD",
        desc: "Capacity governance, custom Spark compute pools, Azure DevOps version control, Row-Level (RLS) & Column-Level Security (CLS), and multi-stage deployment release pipelines."
      },
      {
        title: "💾 Track 2: OneLake Architecture & Medallion Strategy",
        desc: "Designing high-performance Delta Parquet tables, conformed schema processing, and establishing structured Medallion pipelines (Bronze ➔ Silver ➔ Gold) within Lakehouses."
      },
      {
        title: "🚀 Track 3: High-Scale Ingestion & Mirroring",
        desc: "Ingestion pipelines, Dataflows Gen2, OneLake cloud shortcuts (S3, ADLS Gen2, GCS) with zero sync delay, and continuous database replication (Mirroring) from SQL / Snowflake."
      },
      {
        title: "💻 Track 4: Advanced Multi-Engine Transformations",
        desc: "PySpark Notebook processing at scale, T-SQL Synapse Warehouse engineering, views, stored procedures, and Kusto Query Language (KQL) analytics."
      },
      {
        title: "📡 Track 5: Real-Time Intelligence & Streaming Analytics",
        desc: "Eventstreams, Eventhouses, KQL databases, CDC event routing, and streaming window transformations (sliding, session, tumbling)."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Create and Configure a Fabric Lakehouse",
        desc: "Provision spaces, import historical structured sales datasets, build PySpark Delta Tables, and run analytics queries via SQL endpoints."
      },
      {
        num: "LAB 02",
        title: "Orchestrate Batch Ingestion with Pipelines",
        desc: "Construct data pipeline copy activities, parameterize SQL database sources, and chain automated notebooks and trigger alerts."
      },
      {
        num: "LAB 03",
        title: "No-Code ETL with Dataflows Gen2",
        desc: "Leverage visual Power Query Online to clean profiles, replace null fields, and load conformed dimensions."
      },
      {
        num: "LAB 04",
        title: "Advanced Transformations using Spark Notebooks",
        desc: "Perform large-scale joins, deduplication, timestamp formatting, and partition output Delta tables in OneLake dynamically."
      },
      {
        num: "LAB 05",
        title: "Delta Lake Optimization & Time Travel",
        desc: "Query transaction history logs using versionAsOf, and execute performance optimization commands (OPTIMIZE, Z-ORDER, VACUUM)."
      },
      {
        num: "LAB 06",
        title: "Implement and Load a Synapse Data Warehouse",
        desc: "Create an enterprise data warehouse, load dimension tables using T-SQL, and run cross-database queries."
      },
      {
        num: "LAB 07",
        title: "Set Up Real-Time Eventstreams and KQL",
        desc: "Ingest real-time simulator telemetry data, configure event processors, design Eventhouses, and query streams using KQL querysets."
      },
      {
        num: "LAB 08",
        title: "Implement Security, Governance & CI/CD",
        desc: "Secure data fields (RLS/CLS), track Purview metadata, link workspaces to Git Azure DevOps, and construct release pipelines."
      }
    ]
  },
  dp600: {
    trustPill: "DP-600 MASTER CURRICULUM",
    title: "Microsoft Fabric Analytics Engineer Atlas",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-600",
    credential: "Fabric Analytics Engineer Associate",
    level: "Specialist",
    cost: "$165 USD",
    weights: [
      { topic: "Plan & Implement Analytics Env", weight: "10–15%" },
      { topic: "Prepare & Serve Data", weight: "40–45%" },
      { topic: "Implement & Manage Semantic Models", weight: "25–30%" },
      { topic: "Explore & Analyze Data", weight: "20–25%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum is designed to guide analytics professionals from core SQL/Power BI development into the architectural realities of the unified Microsoft Fabric ecosystem.",
      "Perfect for intermediate and advanced analytics professionals seeking to master data preparation, Star Schema modeling, advanced DAX programming, Direct Lake mode optimization, and version control (CI/CD DevOps)."
    ],
    tracks: [
      {
        title: "🛠️ Track 1: Tenant & Workspace Administration, Security & Git",
        desc: "Capacity governance, tenant settings, custom Spark pools, Azure DevOps Git integration, row/column/object-level security, and multi-stage deployment release pipelines."
      },
      {
        title: "💾 Track 2: OneLake Data Warehousing & Medallion Strategy",
        desc: "OneLake logical unified layout, Delta Parquet tables, conformed schema processing, and establishing structured Medallion pipelines (Bronze ➔ Silver ➔ Gold) within Data Warehouses."
      },
      {
        title: "🚀 Track 3: Data Ingestion, Mirroring & Virtualization",
        desc: "Harness Data Factory Pipelines, Dataflows Gen2, database Mirroring, and OneLake shortcuts (S3, ADLS Gen2, GCS) with zero sync delay."
      },
      {
        title: "💻 Track 4: Advanced Multi-Engine Transformations",
        desc: "PySpark Notebook processing at scale, T-SQL Synapse Warehouse engineering, views, stored procedures, and Kusto Query Language (KQL) analytics."
      },
      {
        title: "📡 Track 5: Real-Time Intelligence & Streaming Analytics",
        desc: "Eventstreams, Eventhouses, KQL databases, CDC event routing, and streaming window transformations (sliding, session, tumbling)."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Create and Configure a Fabric Lakehouse",
        desc: "Provision spaces, import historical sales datasets, build PySpark Delta tables, and query via SQL endpoints."
      },
      {
        num: "LAB 02",
        title: "Orchestrate Batch Ingestion with Pipelines",
        desc: "Construct data pipeline copy activities, parameterize SQL database sources, and chain automated notebooks and trigger alerts."
      },
      {
        num: "LAB 03",
        title: "No-Code ETL with Dataflows Gen2",
        desc: "Leverage visual Power Query Online to clean profiles, replace null fields, and load conformed dimensions."
      },
      {
        num: "LAB 04",
        title: "Advanced Transformations using Spark Notebooks",
        desc: "Perform large-scale joins, deduplication, timestamp formatting, and partition output Delta tables in OneLake dynamically."
      },
      {
        num: "LAB 05",
        title: "Delta Lake Optimization & Time Travel",
        desc: "Query transaction history logs using versionAsOf, and execute performance optimization commands (OPTIMIZE, Z-ORDER, VACUUM)."
      },
      {
        num: "LAB 06",
        title: "Implement and Load a Synapse Data Warehouse",
        desc: "Create an enterprise data warehouse, load dimension tables using T-SQL, and run cross-database queries."
      },
      {
        num: "LAB 07",
        title: "Set Up Real-Time Eventstreams and KQL",
        desc: "Ingest real-time simulator telemetry data, configure event processors, design Eventhouses, and query streams using KQL querysets."
      },
      {
        num: "LAB 08",
        title: "Implement Security, Governance & CI/CD",
        desc: "Secure data fields (RLS/CLS), track Purview metadata, link workspaces to Git Azure DevOps, and construct release pipelines."
      }
    ]
  },
  dp900: {
    trustPill: "DP-900 CURRICULUM",
    title: "Azure Data Fundamentals (Coming Soon)",
    status: "coming",
    statusText: "Coming Soon",
    exam: "Exam DP-900",
    credential: "Microsoft Certified: Azure Data Fundamentals",
    level: "Foundation",
    cost: "$99 USD",
    weights: [
      { topic: "Describe Core Data Concepts", weight: "25–30%" },
      { topic: "Identify Relational Data on Azure", weight: "20–25%" },
      { topic: "Identify Non-Relational Data on Azure", weight: "15–20%" },
      { topic: "Describe Analytics Workloads on Azure", weight: "25–30%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this foundational course is tailored to establish a rock-solid baseline in modern cloud databases, relational and non-relational storage configurations, and fundamental business intelligence pipelines.",
      "<strong>Syllabus Status:</strong> Under active development and coming extremely soon! Get priority notifications and early access sandbox resources as soon as it launches."
    ],
    tracks: [
      {
        title: "📚 Track 1: Core Cloud Data Fundamentals",
        desc: "Explore structured, semi-structured, and unstructured database schemas. Understand relational database properties, ACID rules, and basic analytics roles."
      },
      {
        title: "🔍 Track 2: Relational Databases on Azure",
        desc: "Analyze relational server offerings including Azure SQL Database, SQL Managed Instance, Azure Cosmos DB for PostgreSQL, and relational query tools."
      },
      {
        title: "💾 Track 3: Non-Relational Storage Models",
        desc: "Understand NoSQL structures, Azure Blob Storage, Azure Files, ADLS Gen2, and Cosmos DB API models (SQL, MongoDB, Cassandra, Graph)."
      },
      {
        title: "📊 Track 4: Analytics Workloads & Synapse",
        desc: "Foundations of data warehousing, star schemas, dimensional modeling, and modern ELT orchestrations using Azure Synapse Analytics."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Provision and Query an Azure SQL Database",
        desc: "Create an active Azure SQL Database resource, configure workspace firewalls, and execute basic DDL/DML SELECT commands using standard T-SQL."
      },
      {
        num: "LAB 02",
        title: "NoSQL Database Provisioning with Cosmos DB",
        desc: "Create an Azure Cosmos DB database account, insert JSON document records, and query NoSQL datasets."
      },
      {
        num: "LAB 03",
        title: "Ingestion and Orchestration in Azure Synapse",
        desc: "Provision Synapse spaces, configure Synapse pipelines to ingest Blob data, and load curated tables."
      }
    ]
  },
  dp203: {
    trustPill: "DP-203 RETIRED CURRICULUM",
    title: "Azure Data Engineering Legacy",
    status: "retired",
    statusText: "Retired",
    exam: "Exam DP-203",
    credential: "Microsoft Certified: Azure Data Engineer Associate",
    level: "Legacy Core",
    cost: "$165 USD",
    weights: [
      { topic: "Design & Implement Data Storage", weight: "40–45%" },
      { topic: "Develop Data Processing", weight: "25–30%" },
      { topic: "Secure, Monitor & Optimize Data Storage", weight: "30–35%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this legacy curriculum was highly successful, helping hundreds of engineers master Azure Databricks, Azure Synapse Analytics, and Azure Data Factory pipelines.",
      "<strong>Syllabus Status:</strong> This course is now retired as Microsoft Fabric (DP-700 / DP-600) transitions organizations to a unified SaaS lakehouse paradigm. However, the foundational modules are kept here for historical reference."
    ],
    tracks: [
      {
        title: "💾 Track 1: Data Storage & Infrastructure Architectures",
        desc: "Implement partition schemes, configure ADLS Gen2 directory hierarchies, and design premium security layers inside Azure Synapse dedicated SQL pools."
      },
      {
        title: "⚙️ Track 2: Large-Scale PySpark Transformation",
        desc: "Develop advanced spark transformations using Databricks notebooks, manage DBFS storage options, optimize cluster configurations, and manage delta tables."
      },
      {
        title: "🚀 Track 3: Batch and Streaming Pipelines",
        desc: "Build hybrid batch loading patterns using Azure Data Factory pipelines, integrate Azure Key Vault secrets, and process streaming data with Azure Stream Analytics."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Azure Databricks Data Wrangling at Scale",
        desc: "Create clusters, load massive CSV files, apply schemas, and clean columns using high-performance Spark SQL operations."
      },
      {
        num: "LAB 02",
        title: "Build Synapse Dedicated SQL Pool Warehouses",
        desc: "Design hash-distributed and replicated dimension tables, partition fact tables, and execute COPY statements for fast loading."
      },
      {
        num: "LAB 03",
        title: "Deploy End-to-End Orchestrated pipelines in ADF",
        desc: "Construct parameterized pipelines, map copy data activities, and configure self-hosted integration runtimes."
      }
    ]
  }
};

export default function SyllabusModal({ isOpen, courseId, onClose, onBeginAscent }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const data = syllabusData[courseId];
  if (!data) return null;

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'retired': return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'coming': return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      default: return 'bg-sky-500/10 text-sky-400 border border-sky-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-hidden">
      <div 
        className="glass-panel w-full max-w-[860px] max-h-[85vh] overflow-y-auto p-6 md:p-10 relative bg-[#05070f]/95 border-cosmic-gold/20 scrollbar-thin scrollbar-thumb-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-2">
          <span className="text-[11px] font-bold tracking-widest text-cosmic-gold uppercase block">
            {data.trustPill}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {data.title}
            </h2>
            <span className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded ${getStatusColorClass(data.status)}`}>
              {data.statusText}
            </span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 mb-6 rounded-2xl bg-hyper-drive-blue/5 border border-hyper-drive-blue/15 text-sm">
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Exam</span>
            <span className="text-white font-semibold">{data.exam}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Credential</span>
            <span className="text-white font-semibold">{data.credential}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Level</span>
            <span className="text-white font-semibold">{data.level}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Cost</span>
            <span className="text-white font-semibold">{data.cost}</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 pb-2 gap-6 mb-6">
          {['overview', 'tracks', 'labs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-semibold uppercase tracking-wider pb-2 relative transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'text-cosmic-gold font-bold border-b border-cosmic-gold' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panes */}
        <div className="min-h-[220px]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {data.weights && data.weights.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">
                    Exam Domain Weights
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 font-light max-w-md">
                    {data.weights.map((w, idx) => (
                      <li key={idx} className="flex justify-between border-b border-white/5 pb-1">
                        <span>{w.topic}</span>
                        <span className="text-white font-semibold">{w.weight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">
                  Curriculum Overview
                </h4>
                <div className="space-y-3 text-sm text-gray-300 font-light leading-relaxed">
                  {data.description.map((p, idx) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider mb-2">
                Learning Tracks
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {data.tracks.map((track, idx) => (
                  <div key={idx} className="glass-panel p-5 bg-black/20 border-white/5 hover:border-cosmic-gold/15 transition-all">
                    <h5 className="text-sm font-bold text-cosmic-gold mb-2">{track.title}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider mb-2">
                Hands-On Labs
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {data.labs.map((lab, idx) => (
                  <div key={idx} className="glass-panel p-4 border-hyper-drive-blue/15 hover:border-hyper-drive-blue/30 transition-all">
                    <span className="inline-block px-2 py-0.5 rounded bg-hyper-drive-blue/10 text-hyper-drive-blue text-[10px] font-mono font-bold tracking-widest">
                      {lab.num}
                    </span>
                    <h5 className="text-sm font-bold text-white mt-2 mb-1">{lab.title}</h5>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{lab.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Begin Ascent Trigger */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => onBeginAscent(courseId)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-black font-bold uppercase tracking-wider bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-sm"
          >
            <Sparkles className="h-4 w-4 fill-black" />
            <span>Begin Your Ascent</span>
          </button>
        </div>

      </div>
    </div>
  );
}
