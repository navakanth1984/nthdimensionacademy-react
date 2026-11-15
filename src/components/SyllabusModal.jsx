import React, { useState, useEffect } from 'react';
import { X, Sparkles, Clock, Calendar, CheckCircle2, Compass, ExternalLink } from 'lucide-react';

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
    durationDays: "35 Days",
    durationWeeks: "7 Weeks",
    totalHours: "70 Total Hours (35h Live + 35h Lab)",
    schedule: "Mon–Fri (2 hrs/day: 1h Lecture + 1h Lab) or Weekend Intensive",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Tenant, Workspace & OneLake Foundations", desc: "Enterprise Fabric tenant setup, capacity metrics, OneLake shortcuts (ADLS/S3/GCS), and security governance (RLS/CLS).", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "Lakehouse Architecture & Medallion Strategy", desc: "Delta Parquet internals, ACID logs, and Bronze ➔ Silver ➔ Gold conformed medallion pipeline design.", lab: "LAB 02" },
      { week: "Week 3", days: "Days 11–15", title: "High-Scale Ingestion & Database Mirroring", desc: "Data Factory copy pipelines, Dataflows Gen2 with Power Query Online, and continuous zero-ETL database mirroring.", lab: "LAB 03 & 04" },
      { week: "Week 4", days: "Days 16–20", title: "Advanced PySpark Notebook Engineering", desc: "Distributed Spark compute pools, DataFrame transformations, partition pruning, and broadcast joins at scale.", lab: "LAB 05" },
      { week: "Week 5", days: "Days 21–25", title: "Delta Lake Performance & Time Travel", desc: "OPTIMIZE, Z-ORDER, VACUUM maintenance, versionAsOf time travel restoration, and write conflict mitigation.", lab: "LAB 06" },
      { week: "Week 6", days: "Days 26–30", title: "Synapse Warehouse & Real-Time Intelligence", desc: "T-SQL warehouse queries, cross-database endpoints, Eventstreams ingestion, Eventhouses, and KQL streaming.", lab: "LAB 07" },
      { week: "Week 7", days: "Days 31–35", title: "CI/CD Git DevOps, Purview & Exam Marathon", desc: "Azure DevOps release pipelines, Purview data catalog/lineage, capacity optimization, and 150-question mock exam.", lab: "LAB 08" }
    ],
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
    durationDays: "30 Days",
    durationWeeks: "6 Weeks",
    totalHours: "60 Total Hours (30h Live + 30h Lab)",
    schedule: "Mon–Fri (2 hrs/day: 1h Lecture + 1h Lab) or Weekend Intensive",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Analytics Environment & OneLake Provisioning", desc: "Capacity governance, workspace security roles, OneLake file layout, and lakehouse storage.", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "Data Preparation with Dataflows Gen2", desc: "Power Query M cleansing, error handling, staging mechanics, and incremental refresh dimension loading.", lab: "LAB 02" },
      { week: "Week 3", days: "Days 11–15", title: "Data Serving via SQL Endpoints & Notebooks", desc: "T-SQL analytics on lakehouses, view materialization, and low-code PySpark preparation.", lab: "LAB 03" },
      { week: "Week 4", days: "Days 16–20", title: "Enterprise Semantic Modeling & Advanced DAX", desc: "Star schema design, calculation groups, semi-additive measures, and advanced DAX time intelligence.", lab: "LAB 04" },
      { week: "Week 5", days: "Days 21–25", title: "Power BI Direct Lake Mode & Performance Tuning", desc: "Direct Lake zero-copy memory mapping, fallback diagnostics, and DAX Studio query tracing.", lab: "LAB 05" },
      { week: "Week 6", days: "Days 26–30", title: "Deployment Pipelines, Purview & DP-600 Exam Drills", desc: "Git-backed PBIP release pipelines, Purview data cataloging, and comprehensive DP-600 practice test.", lab: "LAB 06" }
    ],
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
    durationDays: "30 Days",
    durationWeeks: "6 Weeks",
    totalHours: "60 Total Hours (30h Live + 30h Lab)",
    schedule: "Mon–Fri (2 hrs/day: 1h Lecture + 1h Lab) or Weekend Intensive",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Databricks Workspaces & Unity Catalog", desc: "Metastore setup, 3-level namespace (catalog.schema.table), and external volume credentials.", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "Delta Lake Internals & Medallion Design", desc: "_delta_log transaction logs, ACID compliance, and Bronze-to-Gold medallion streaming architecture.", lab: "LAB 02" },
      { week: "Week 3", days: "Days 11–15", title: "Delta Live Tables (DLT) & Streaming Pipelines", desc: "Declarative Python/SQL DLT pipelines, data quality expectations, and Auto Loader stream ingestion.", lab: "LAB 03" },
      { week: "Week 4", days: "Days 16–20", title: "PySpark Optimization & Liquid Clustering", desc: "Cluster sizing, shuffle partition tuning, data skew mitigation, Photon engine, and Liquid Clustering.", lab: "LAB 04" },
      { week: "Week 5", days: "Days 21–25", title: "Fine-Grained Security & Purview Lineage", desc: "Dynamic row filtering, column masking, audit logs, and cross-platform Purview catalog integration.", lab: "LAB 05" },
      { week: "Week 6", days: "Days 26–30", title: "CI/CD Asset Bundles (DABs) & Mock Exam", desc: "Databricks Asset Bundles for automated deployment, production job alerting, and DP-750 exam marathon.", lab: "LAB 06" }
    ],
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
    title: "Developing AI-Enabled Database Solutions",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-800",
    credential: "Microsoft Certified: SQL AI Developer Associate",
    level: "Specialist",
    cost: "$165 USD",
    durationDays: "25 Days",
    durationWeeks: "5 Weeks",
    totalHours: "50 Total Hours (25h Live + 25h Lab)",
    schedule: "Mon–Fri (2 hrs/day: 1h Lecture + 1h Lab) or Weekend Intensive",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Fabric Warehouse Architecture & Provisioning", desc: "Decoupled compute and storage internals, creating warehouses, and cross-database queries.", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "Dimensional Modeling & SCD Implementation", desc: "Star schema dimensional design, SCD Type 1 & Type 2 merge patterns using T-SQL.", lab: "LAB 02" },
      { week: "Week 3", days: "Days 11–15", title: "High-Performance T-SQL & Stored Procedures", desc: "Stored procedure automation, transactions, dynamic SQL, and OneLake Delta table compaction.", lab: "LAB 03" },
      { week: "Week 4", days: "Days 16–20", title: "Legacy Migration to Fabric Warehouse", desc: "Migrating Azure Synapse Dedicated SQL Pools and on-prem SQL Server to Fabric Data Warehouse.", lab: "LAB 04" },
      { week: "Week 5", days: "Days 21–25", title: "Performance Insights, Security & Exam Drills", desc: "DMV query insights, Object/Row/Column-level security, and DP-800 certification mock test.", lab: "LAB 05" }
    ],
    weights: [
      { topic: "Design & Develop Database Solutions", weight: "35–40%" },
      { topic: "Secure, Optimize & Deploy Database Solutions", weight: "35–40%" },
      { topic: "Implement AI Capabilities in Database Solutions", weight: "25–30%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum covers the full DP-800 blueprint — from advanced T-SQL, database objects, and CI/CD for SQL projects to embedding models, vector search, and retrieval-augmented generation (RAG) directly inside Azure SQL.",
      "Designed for database developers and SQL engineers building AI-enabled applications who want to combine solid database fundamentals with modern AI capabilities natively in the database layer."
    ],
    tracks: [
      {
        title: "🗄️ Track 1: Database Objects & Advanced T-SQL",
        desc: "Design specialized tables (JSON, graph, columnstore), constraints and sequences, views, functions, stored procedures, and advanced T-SQL — CTEs, window functions, JSON functions, and graph queries."
      },
      {
        title: "🤖 Track 2: AI-Assisted SQL Development",
        desc: "Use AI-assisted tools like GitHub Copilot and MCP servers to accelerate SQL development, while understanding the security implications of AI-assisted coding."
      },
      {
        title: "🔒 Track 3: Data Security & Compliance",
        desc: "Implement encryption, dynamic data masking, row-level security, auditing, and secure endpoints for Azure SQL databases."
      },
      {
        title: "⚡ Track 4: Performance & CI/CD",
        desc: "Optimize database configurations, transaction isolation, and query performance; implement CI/CD for SQL Database Projects with testing, source control, and deployment pipelines."
      },
      {
        title: "🧠 Track 5: Models, Embeddings & RAG",
        desc: "Integrate external models and generate embeddings, implement full-text, vector, and hybrid search, and build retrieval-augmented generation (RAG) solutions directly on SQL data."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Specialized Tables & Indexing",
        desc: "Design JSON, graph, and columnstore tables; choose the right index strategy for OLTP vs. analytical workloads in Azure SQL."
      },
      {
        num: "LAB 02",
        title: "Advanced T-SQL & Window Functions",
        desc: "Write CTEs and window functions, query JSON and graph data, and build correlated queries with structured error handling."
      },
      {
        num: "LAB 03",
        title: "Securing Database Solutions",
        desc: "Configure encryption, dynamic data masking, row-level security policies, and auditing across a multi-tenant database schema."
      },
      {
        num: "LAB 04",
        title: "CI/CD for SQL Database Projects",
        desc: "Build a SQL Database Project, wire it into source control and branching, and deploy it through an automated pipeline with tests."
      },
      {
        num: "LAB 05",
        title: "Vector Search & Embeddings",
        desc: "Generate embeddings for text data, index them for vector search, and combine full-text and vector results with hybrid search (RRF)."
      },
      {
        num: "LAB 06",
        title: "Building a RAG Pipeline on SQL",
        desc: "Chunk and embed source documents, store them in Azure SQL, and build a retrieval-augmented generation pipeline that grounds LLM answers in your data."
      }
    ]
  },
  ai103: {
    trustPill: "AI-103 MASTER CURRICULUM",
    title: "Azure AI Foundry & Generative AI Solutions",
    status: "active",
    statusText: "Active",
    exam: "Exam AI-103",
    credential: "Azure AI Engineer Associate",
    level: "Specialist",
    cost: "$165 USD",
    durationDays: "25 Days",
    durationWeeks: "5 Weeks",
    totalHours: "50 Total Hours (25h Live + 25h Lab)",
    schedule: "Mon–Fri (2 hrs/day: 1h Lecture + 1h Lab) or Weekend Intensive",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Azure AI Foundry Ecosystem & Foundation Models", desc: "Hubs, projects, role-based access, and model catalog deployments (GPT-4o, Llama 3, Phi-3).", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "Prompt Engineering & System Safeguards", desc: "Few-shot prompting, structured JSON outputs, Azure Content Safety shields, and jailbreak detection.", lab: "LAB 02" },
      { week: "Week 3", days: "Days 11–15", title: "Enterprise RAG Architecture with AI Search", desc: "Vector embeddings, chunking, hybrid search (BM25 + Vector), and semantic re-ranking.", lab: "LAB 03" },
      { week: "Week 4", days: "Days 16–20", title: "Multi-Agent Systems & Semantic Kernel", desc: "Microsoft AutoGen and Semantic Kernel multi-agent collaboration, tool-use, and persistent memory.", lab: "LAB 04" },
      { week: "Week 5", days: "Days 21–25", title: "Model Evaluation, Tracing & AI-103 Exam Drills", desc: "Automated evaluations (groundedness, relevance), OpenTelemetry tracing, and full mock exam.", lab: "LAB 05" }
    ],
    weights: [
      { topic: "Plan & Manage Azure AI Solutions", weight: "15–20%" },
      { topic: "Implement Generative AI & Prompting", weight: "25–30%" },
      { topic: "Build Enterprise RAG Applications", weight: "30–35%" },
      { topic: "Evaluate, Secure & Monitor AI Solutions", weight: "20–25%" }
    ],
    description: [
      "Led by Master Consultant and Microsoft Certified Trainer (MCT) <strong>Navakanth Reddy Dumpa</strong>, this curriculum equips AI and software engineers to architect, deploy, and evaluate production-grade generative AI applications.",
      "Master enterprise Retrieval-Augmented Generation (RAG) using Azure AI Search, multi-agent workflows with AutoGen / Semantic Kernel, and robust content safety mechanisms."
    ],
    tracks: [
      {
        title: "🤖 Track 1: Foundation Models & AI Foundry",
        desc: "Deploy, test, and manage frontier LLMs and SLMs across Azure AI Studio and AI Foundry hubs."
      },
      {
        title: "🛡️ Track 2: Advanced Prompting & Safety Shields",
        desc: "Design system prompts, few-shot templates, and enforce Azure Content Safety and Prompt Shields."
      },
      {
        title: "📚 Track 3: Enterprise RAG Architecture",
        desc: "Vector chunking, indexing in Azure AI Search, hybrid vector/keyword queries, and semantic reranking."
      },
      {
        title: "👥 Track 4: Multi-Agent Systems & Tools",
        desc: "Build collaborative agent swarms, function calling, tool routing, and external API connectors."
      },
      {
        title: "📊 Track 5: LLM Evaluation & Production Monitoring",
        desc: "Run automated LLM-as-a-judge evaluations, configure OpenTelemetry traces, and ensure governance compliance."
      }
    ],
    labs: [
      {
        num: "LAB 01",
        title: "Deploy Foundation Models via AI Foundry",
        desc: "Configure an AI Studio project, deploy GPT-4o and Phi-3 endpoints, and test inference parameters."
      },
      {
        num: "LAB 02",
        title: "Prompt Engineering & Safety Filters",
        desc: "Implement structured JSON output prompts and attach Azure Content Safety moderation filters."
      },
      {
        num: "LAB 03",
        title: "Production RAG with Azure AI Search",
        desc: "Index complex enterprise PDF documents with vector embeddings and build hybrid search retrieval."
      },
      {
        num: "LAB 04",
        title: "Multi-Agent Workflow with Semantic Kernel",
        desc: "Build a collaborative agent team where specialist agents draft, critique, and finalize analytical reports."
      },
      {
        num: "LAB 05",
        title: "Continuous Evaluation & Telemetry",
        desc: "Set up groundedness and relevance evaluations and trace inference latency in Azure Monitor."
      }
    ]
  },
  dp900: {
    trustPill: "DP-900 CURRICULUM",
    title: "Azure Data Fundamentals",
    status: "active",
    statusText: "Active",
    exam: "Exam DP-900",
    credential: "Microsoft Certified: Azure Data Fundamentals",
    level: "Foundation",
    cost: "$99 USD",
    durationDays: "10 Days",
    durationWeeks: "2 Weeks",
    totalHours: "20 Total Hours (10h Live + 10h Lab)",
    schedule: "Mon–Fri (2 hrs/day) Fast-Track",
    timeline: [
      { week: "Week 1", days: "Days 1–5", title: "Core Data Concepts & Azure Relational Databases", desc: "Relational vs non-relational storage, ACID principles, Azure SQL Database and PostgreSQL.", lab: "LAB 01" },
      { week: "Week 2", days: "Days 6–10", title: "NoSQL, Cloud Storage & Analytics Workloads", desc: "Azure Blob, ADLS Gen2, Cosmos DB multi-model APIs, Synapse Analytics, and DP-900 practice test.", lab: "LAB 02 & 03" }
    ],
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
    durationDays: "40 Days",
    durationWeeks: "Self-Paced",
    totalHours: "80 Total Hours (Curated Archive)",
    schedule: "On-Demand Historical Reference",
    timeline: [
      { week: "Phase 1", days: "Days 1–15", title: "Data Storage & Dedicated SQL Pools", desc: "Synapse Dedicated SQL Pools, ADLS Gen2 partition schemes, and security configurations.", lab: "LAB 01" },
      { week: "Phase 2", days: "Days 16–30", title: "PySpark Transformations on Databricks", desc: "Spark notebooks, DBFS storage, and cluster performance tuning.", lab: "LAB 02" },
      { week: "Phase 3", days: "Days 31–40", title: "ADF Ingestion & Synapse Migration Pathways", desc: "Parameterized ADF pipelines, self-hosted integration runtimes, and migration patterns to Fabric.", lab: "LAB 03" }
    ],
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

const courseAtlasMap = {
  dp700: '/dp700-atlas/index.html',
  dp600: '/dp600-atlas/index.html',
  dp750: '/dp750-atlas/index.html',
  dp800: '/dp800-atlas/index.html',
  ai103: '/ai103-atlas/index.html'
};

export default function SyllabusModal({ isOpen, courseId, onClose, onBeginAscent }) {
  const [activeTab, setActiveTab] = useState('tracks');

  useEffect(() => {
    if (isOpen) {
      setActiveTab('tracks');
    }
  }, [isOpen, courseId]);

  if (!isOpen) return null;

  const data = syllabusData[courseId];
  if (!data) return null;

  const normalized = (courseId || '').toLowerCase().replace('-', '');
  const atlasUrl = courseAtlasMap[normalized];

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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-bold tracking-widest text-cosmic-gold uppercase block">
              {data.trustPill}
            </span>
            {atlasUrl && (
              <button
                onClick={() => onBeginAscent(courseId)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-hyper-drive-blue/10 hover:bg-hyper-drive-blue/20 text-hyper-drive-blue border border-hyper-drive-blue/30 text-xs font-semibold transition-all hover:scale-105 cursor-pointer mr-6"
                title="Launch Full Interactive Atlas"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Open Full Interactive Atlas</span>
              </button>
            )}
          </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 mb-6 rounded-2xl bg-hyper-drive-blue/5 border border-hyper-drive-blue/15 text-sm">
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Exam</span>
            <span className="text-white font-semibold text-xs md:text-sm">{data.exam}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Credential</span>
            <span className="text-white font-semibold text-xs truncate block" title={data.credential}>{data.credential}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Duration</span>
            <span className="text-cyan-400 font-semibold text-xs md:text-sm">{data.durationDays || '30 Days'}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Total Hours</span>
            <span className="text-cosmic-gold font-semibold text-xs md:text-sm">{data.totalHours?.split(' ')[0]} {data.totalHours?.split(' ')[1] || 'Hrs'}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Level</span>
            <span className="text-white font-semibold text-xs md:text-sm">{data.level}</span>
          </div>
          <div>
            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Cost</span>
            <span className="text-white font-semibold text-xs md:text-sm">{data.cost}</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 pb-2 gap-4 md:gap-6 mb-6 overflow-x-auto scrollbar-none">
          {['tracks', 'timeline', 'labs', 'overview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs md:text-sm font-semibold uppercase tracking-wider pb-2 relative transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-cosmic-gold font-bold border-b-2 border-cosmic-gold' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'timeline' ? `📅 Timeline (${data.durationDays || 'Roadmap'})` : tab === 'tracks' ? 'Tracks (Syllabus)' : tab}
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

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-cosmic-gold uppercase tracking-wider">
                    Syllabus Timeline &amp; Day-by-Day Progression
                  </h4>
                  <p className="text-xs text-gray-400 font-light mt-0.5">
                    {data.durationDays} · {data.durationWeeks} · {data.totalHours}
                  </p>
                </div>
                {data.schedule && (
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono self-start sm:self-auto">
                    {data.schedule}
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-4">
                {data.timeline?.map((step, idx) => (
                  <div key={idx} className="glass-panel p-4 bg-black/30 border-white/5 hover:border-cyan-500/30 transition-all rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[11px] border border-cyan-500/20">
                          {step.week}
                        </span>
                        <span className="text-xs font-mono text-cosmic-gold font-semibold">
                          {step.days}
                        </span>
                      </div>
                      {step.lab && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px] border border-amber-500/20">
                          {step.lab}
                        </span>
                      )}
                    </div>
                    <h5 className="text-sm font-bold text-white mb-1">{step.title}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
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

        {/* Begin Ascent Trigger & Atlas Link */}
        <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <button 
            onClick={() => onBeginAscent(courseId)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-black font-bold uppercase tracking-wider bg-gradient-to-r from-hyper-drive-blue to-cosmic-gold shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-sm"
          >
            <Sparkles className="h-4 w-4 fill-black" />
            <span>Begin Your Ascent</span>
          </button>
          {atlasUrl && (
            <a
              href={atlasUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/10 hover:border-hyper-drive-blue transition-all duration-300 cursor-pointer"
              title="Open Atlas in New Tab"
            >
              <Compass className="h-4 w-4 text-hyper-drive-blue" />
              <span>Open Atlas in New Tab</span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
