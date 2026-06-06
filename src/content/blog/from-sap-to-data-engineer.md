---
title: "From SAP Consultant to Data Engineer: How I Made the Transition"
description: "A personal account of transitioning from SAP consulting to data engineering — what skills transferred, what I had to learn from scratch, and what I wish I had known earlier."
pubDate: 2026-06-06
tags: ["Career", "Data Engineering", "SAP", "Power BI", "Career Change", "Personal"]
draft: false
---

In October 2020 I was an SAP Support Consultant at a manufacturing company in Novi Sad, handling first and second level support tickets, writing SQL queries in SAP Business One, and generating periodic sales reports in Excel. By June 2023 I was a Data Engineer, building ETL pipelines in Python, orchestrating workflows with Apache Airflow, and moving data between PostgreSQL and Google BigQuery at scale.

The transition took almost three years and was not a straight line. Here is how it happened, what made it possible, and what I would do differently if I were starting over.

## Why I Wanted to Make the Change

The honest answer is that I was already doing data work — I just was not doing it with the right tools.

As an SAP consultant and later as a Data Analyst, I spent a significant part of my day writing SQL queries, cleaning data in Excel, and building reports that people would actually use to make decisions. I found that work genuinely interesting. The support ticket side — troubleshooting integrations, rolling out new SAP instances, handling user issues — was fine, but it was not where my energy went.

Around 2021 I started noticing how much of the interesting data work I wanted to do was locked behind skills I did not have yet. Python. Cloud platforms. Orchestration tools. The people doing the most interesting data work at the companies I was working with had those skills. I decided I wanted them too.

## What SAP Consulting Gave Me

This is the part I underestimated at the time and appreciate more now.

**Understanding business processes deeply.** SAP is not a technical tool in the way that Python or BigQuery are — it is a system that encodes how a business actually runs. Procurement, inventory, sales order management, financial reporting. Spending two years in SAP B1 gave me an unusually clear mental model of where data comes from in a business, what it means, and how the different parts connect.

This turned out to be genuinely valuable as a data engineer. When a stakeholder asks for a report on procurement efficiency or inventory turnover, I understand what they are actually asking for — not just which tables to query, but what the numbers mean in the context of a real business operation.

**SQL.** SAP Business One runs on SQL Server or HANA, and writing direct SQL queries was a regular part of the job. By the time I started seriously learning data engineering, SQL was already comfortable. This matters because SQL is the single most important skill in the modern data stack, and having it solid before learning everything else meant one less thing to struggle with.

**Stakeholder communication.** Consulting teaches you to translate between what technical systems do and what business users need. That skill does not go away when you move to data engineering — if anything it becomes more valuable, because data engineers who can explain what they are building and why are rare.

## What I Had to Learn From Scratch

**Python.** This was the biggest gap and the one I spent the most time on. I started with basic scripting — automating Excel report generation, writing simple data cleaning scripts — and gradually worked up to building full ETL pipelines with pandas, SQLAlchemy, and REST API integrations. The learning curve was real but the investment paid off immediately.

**Cloud platforms.** Moving from on-premise SAP to Google Cloud Platform required learning a new mental model entirely. BigQuery in particular thinks about data differently from a traditional SQL database — the distributed query engine, the cost model based on bytes scanned, the partitioning and clustering strategies. It took time to stop thinking in SQL Server terms and start thinking in BigQuery terms.

**Orchestration.** Apache Airflow was the first tool I used that felt genuinely new rather than an extension of something I already knew. The DAG-based mental model, the scheduler, the XCom system for passing data between tasks — none of it mapped cleanly onto anything from the SAP world. I broke a lot of things before I understood it well enough to use it confidently in production.

**Git and version control.** SAP consulting does not involve version control in any meaningful way. Learning Git — not just the basic commit and push workflow, but branching strategies, pull requests, and reviewing diffs — was an adjustment that took longer than I expected.

## What the Transition Actually Looked Like

I did not quit my job and do a bootcamp. The transition happened gradually, in parallel with existing work.

The first step was moving into a Data Analyst role at the same company, which gave me more time with SQL and reporting and less time with support tickets. That was the right move — it reduced the gap between where I was and where I wanted to be without requiring a leap into the unknown.

The second step was deliberately choosing projects that pushed into adjacent skills. When an internal project needed some data to be fetched from an API and loaded into a database, I volunteered and wrote it in Python. When someone needed a Power BI report connected to Google Sheets, I figured out the connector. Small projects in real business contexts are a much faster way to learn than courses alone.

The third step was moving to a company where data engineering was a defined role and expectation — Gorilla Sports Balkans, where I spent two years building pipelines, working with BigQuery and Airflow in production, and developing Power BI reporting on top of the data we were moving. Having colleagues who were further along and a codebase that needed real maintenance accelerated my learning faster than anything else.

## What I Would Do Differently

**Start Python earlier.** I spent too long thinking SQL and Excel were enough. They are important, but Python is the connective tissue of the modern data stack. Starting earlier would have opened more doors sooner.

**Build in public sooner.** I wrote my first GitHub repository much later than I should have. Documenting projects publicly — even small ones — builds a portfolio that speaks for itself and forces you to think about code quality and documentation.

**Find the community earlier.** The data engineering community online — on LinkedIn, in Slack groups, on subforums — is genuinely generous with knowledge. I spent too long learning in isolation when faster answers and better mental models were one conversation away.

**Do not wait until you feel ready.** The jump from Data Analyst to Data Engineer felt premature when I made it. Looking back, it was the right time. You never feel fully ready for the next step in your career. You learn the rest on the job.

## Is the Transition Worth It?

For me, yes — clearly. The work is more varied, the problems are more technically interesting, and the combination of SAP/ERP background with modern data engineering skills turns out to be a genuinely useful niche. A lot of data engineers understand Python and cloud infrastructure but have never been inside an ERP system. A lot of SAP consultants understand business processes but have never built a pipeline. The overlap is smaller than you might think.

If you are an SAP consultant or a business analyst who finds yourself drawn to the more technical side of data work — writing more SQL, wanting to automate things that are currently manual, curious about how the data actually gets from source to report — that curiosity is worth following.

The tools are learnable. The business knowledge you already have is harder to acquire than most data engineers realise.

---

If you are considering a similar transition and want to talk through what the path might look like for your specific background, feel free to reach out. It is a question I am always happy to discuss.