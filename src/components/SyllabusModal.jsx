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
  dp750: {
    trustPill: "DP-750 MASTER CURRICULUM",
    title: "Implement a Lakehouse with Microsoft Fabric",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-750",
    credential: "Microsoft Certified: Fabric Data Engineer Associate",
    level: "Specialist",
    cost: "$165 USD",
    weights: [
      { topic: "Design & Implement a Lakehouse", weight: "30–35%" },
      { topic: "Ingest & Transform Data", weight: "25–30%" },
      { topic: "Implement Semantic Models & Reporting", weight: "20–25%" },
      { topic: "Monitor & Optimize", weight: "15–20%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum focuses on implementing a complete lakehouse solution on Microsoft Fabric — from raw ingestion to curated semantic layers ready for enterprise reporting.",
      "Designed for data engineers and architects looking to master Delta Lake storage, Spark-based transformations, OneLake management, and end-to-end medallion pipelines within the unified Fabric SaaS platform."
    ],
    tracks: [
      {
        title: "🏗️ Track 1: Lakehouse Architecture & OneLake Design",
        desc: "Plan and provision Fabric workspaces, design OneLake folder structures, configure Delta Parquet storage, and establish Bronze/Silver/Gold medallion layers."
      },
      {
        title: "🚀 Track 2: Data Ingestion Patterns",
        desc: "Build Data Factory pipelines, configure Dataflows Gen2, set up OneLake shortcuts (ADLS Gen2, S3, GCS), and implement database mirroring for continuous replication."
      },
      {
        title: "💻 Track 3: Spark Transformations & Optimization",
        desc: "Author PySpark notebooks for large-scale joins, deduplication, and schema evolution. Apply OPTIMIZE, Z-ORDER, and VACUUM for Delta table performance."
      },
      {
        title: "📊 Track 4: Semantic Models & Direct Lake",
        desc: "Build Star Schema semantic models in Power BI, configure Direct Lake mode for zero-copy reporting, and write DAX measures for business KPIs."
      },
      {
        title: "🔒 Track 5: Security, Governance & CI/CD",
        desc: "Implement RLS/CLS policies, register lineage in Purview, connect workspaces to Git, and deploy multi-stage release pipelines."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Provision & Configure a Fabric Lakehouse",
        desc: "Create a Fabric workspace, configure OneLake, import structured datasets, and query raw files via SQL endpoints."
      },
      {
        num: "LAB 02",
        title: "Build Bronze-to-Gold Medallion Pipelines",
        desc: "Implement a three-layer medallion architecture with automated pipeline triggers and incremental load patterns."
      },
      {
        num: "LAB 03",
        title: "No-Code Transformation with Dataflows Gen2",
        desc: "Use Power Query Online to cleanse, reshape, and load dimension tables into the Silver layer without writing code."
      },
      {
        num: "LAB 04",
        title: "PySpark Notebook Engineering",
        desc: "Author advanced Spark notebooks for large-scale joins, window functions, schema evolution, and partitioned Delta output."
      },
      {
        num: "LAB 05",
        title: "Delta Lake Time Travel & Optimization",
        desc: "Query historical snapshots using versionAsOf, restore table versions, and run OPTIMIZE with Z-ORDER for query acceleration."
      },
      {
        num: "LAB 06",
        title: "Semantic Model & Direct Lake Reporting",
        desc: "Design a Star Schema model in Power BI Desktop, connect via Direct Lake, and publish enterprise-grade dashboards."
      }
    ]
  },
  dp800: {
    trustPill: "DP-800 MASTER CURRICULUM",
    title: "Implementing a Data Science Solution on Azure",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-800",
    credential: "Microsoft Certified: Fabric Data Scientist Associate",
    level: "Specialist",
    cost: "$165 USD",
    weights: [
      { topic: "Design & Prepare Data for ML", weight: "25–30%" },
      { topic: "Build & Train ML Models", weight: "30–35%" },
      { topic: "Manage & Deploy Models", weight: "20–25%" },
      { topic: "Monitor & Optimize Solutions", weight: "15–20%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum covers the full lifecycle of data science on Microsoft Fabric — from feature engineering and Spark-based ML training to MLflow experiment tracking and model deployment.",
      "Designed for data scientists and ML engineers working in the Azure and Fabric ecosystem who want to operationalize machine learning at enterprise scale."
    ],
    tracks: [
      {
        title: "📐 Track 1: Data Preparation & Feature Engineering",
        desc: "Profile raw datasets, handle missing values, encode categorical features, and engineer training features using PySpark and pandas on Fabric."
      },
      {
        title: "🤖 Track 2: ML Model Training with Spark & MLflow",
        desc: "Train Scikit-learn and Spark MLlib models in Fabric Notebooks, track experiments with MLflow, compare runs, and register champion models."
      },
      {
        title: "🚀 Track 3: Model Deployment & Batch Scoring",
        desc: "Deploy registered MLflow models, build batch inference pipelines using Data Factory, and score large datasets in OneLake."
      },
      {
        title: "📊 Track 4: Real-Time Inference & API Integration",
        desc: "Configure real-time endpoints, integrate model predictions into Power BI reports, and build REST API wrappers for downstream consumption."
      },
      {
        title: "🔒 Track 5: Responsible AI & Governance",
        desc: "Apply fairness assessments, configure model explainability with SHAP, register lineage in Purview, and enforce data governance policies."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Exploratory Data Analysis on Fabric",
        desc: "Load raw data into a Fabric Lakehouse, profile distributions, detect outliers, and visualize feature correlations using Spark notebooks."
      },
      {
        num: "LAB 02",
        title: "Feature Engineering & Data Preparation",
        desc: "Impute missing values, encode categoricals, scale numeric features, and persist engineered datasets as Delta tables."
      },
      {
        num: "LAB 03",
        title: "Train & Track Models with MLflow",
        desc: "Train classification and regression models, log parameters and metrics to MLflow, compare experiment runs, and register the best model."
      },
      {
        num: "LAB 04",
        title: "Hyperparameter Tuning with Spark",
        desc: "Use Spark MLlib CrossValidator and ParamGridBuilder to tune model hyperparameters at scale across a distributed cluster."
      },
      {
        num: "LAB 05",
        title: "Batch Inference Pipeline",
        desc: "Build a Data Factory pipeline that loads the champion model and scores a new dataset in OneLake, writing predictions back as Delta tables."
      },
      {
        num: "LAB 06",
        title: "Model Explainability & Responsible AI",
        desc: "Apply SHAP values to explain predictions, generate feature importance charts, and document model cards for governance compliance."
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
