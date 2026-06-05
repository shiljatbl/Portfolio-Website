---
title: "Getting Started with Apache Airflow: A Practical Introduction"
description: "An overview of Apache Airflow's core concepts — DAGs, operators, and scheduling — with a real-world example and tips from two years in production."
pubDate: 2026-06-01
tags: ["Data Engineering", "Apache Airflow", "Python", "Tutorial"]
draft: false
---

Apache Airflow has become one of the most popular tools for orchestrating data pipelines. If you work with data, you've likely heard of it — but getting from "I've heard of Airflow" to "I have a working pipeline in production" can be a steep climb.

Here's a practical introduction covering the core concepts, a simple end-to-end example, and a few hard-won lessons from running Airflow in production.

## What is Apache Airflow?

Airflow is an open-source platform for programmatically authoring, scheduling, and monitoring workflows. At its core, it lets you define pipelines as **Directed Acyclic Graphs (DAGs)** — Python code that describes a set of tasks and their dependencies.

Key reasons teams choose Airflow:

- **Code-as-configuration**: pipelines are Python, not YAML or a drag-and-drop GUI
- **Rich UI**: monitor runs, inspect logs, and retry failed tasks from a web interface
- **Ecosystem**: hundreds of pre-built operators for databases, cloud services, and APIs

## Core Concepts

### DAGs

A DAG is the top-level container for a workflow. It defines *which* tasks run, *when* they run, and *in what order*. A minimal DAG looks like this:

```python
from airflow import DAG
from datetime import datetime

with DAG(
    dag_id="my_first_dag",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    ...  # tasks go here
```

Two settings worth getting right from the start: `schedule` controls when the DAG runs (cron expression or preset like `@daily`), and `catchup=False` prevents Airflow from backfilling all the missed runs between `start_date` and today when you first deploy.

### Operators

Operators define *what* a task does. Airflow ships with a large library of built-in operators:

- `PythonOperator` — runs a Python function
- `BashOperator` — runs a shell command
- `BigQueryInsertJobOperator` — executes a BigQuery SQL job
- `HttpOperator` — makes an HTTP request

### Tasks and Dependencies

Tasks are instances of operators. You wire them together with `>>` to define execution order:

```python
extract >> transform >> load
```

This reads naturally: extract runs first, then transform, then load.

## A Simple Example

Here is a minimal DAG that extracts data from a PostgreSQL database, transforms it with Python, and loads the result into BigQuery:

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def extract(**context):
    # pull data from source, push to XCom or intermediate storage
    ...

def transform(**context):
    ...

def load(**context):
    ...

with DAG(
    dag_id="daily_sales_report",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    t_extract = PythonOperator(task_id="extract", python_callable=extract)
    t_transform = PythonOperator(task_id="transform", python_callable=transform)
    t_load = PythonOperator(task_id="load", python_callable=load)

    t_extract >> t_transform >> t_load
```

Once deployed, you can trigger the DAG manually from the UI, inspect each task's logs, and re-run individual failed tasks without re-running the whole pipeline.

## Tips from the Field

After running Airflow in production for nearly two years — including pipelines that moved data between PostgreSQL, Google Cloud Storage, and BigQuery — here are the lessons I wish I had learned sooner.

**Always set `catchup=False` unless you need backfills.** Without it, deploying a DAG with a `start_date` months in the past will immediately queue hundreds of runs. Your scheduler will not thank you.

**Design tasks to be idempotent.** If a task fails mid-run and gets retried, it should produce the same result as a fresh run with no side effects. This usually means using `INSERT INTO ... ON CONFLICT DO NOTHING` or equivalent in SQL, and writing to staging tables before swapping.

**Use XComs sparingly.** XComs (cross-communication) let tasks pass small values to each other via the metadata database. They work well for IDs, timestamps, and flags — not for DataFrames. For large data, use your data warehouse or object storage instead.

**Monitor task duration trends.** A task that normally takes 30 seconds and suddenly takes 8 minutes is a sign something is wrong upstream. Airflow's UI shows duration history per task, which makes spotting this easy.

**Use task groups for large DAGs.** Once a DAG grows beyond 10–15 tasks, `TaskGroup` helps organize them visually and keeps the UI readable.

## Getting Started Locally

The fastest way to run Airflow locally is with the official Docker Compose setup:

```bash
curl -LfO 'https://airflow.apache.org/docs/apache-airflow/stable/docker-compose.yaml'
docker compose up airflow-init
docker compose up -d
```

Open `http://localhost:8080` (default credentials: `airflow` / `airflow`) and you'll have a fully functional Airflow instance with a few sample DAGs to explore.

---

Airflow has a real learning curve — there's a lot of surface area. But once it clicks, the combination of Python-defined pipelines, a great UI, and a massive operator ecosystem makes it a tool that's hard to give up.

If you have questions or want to compare notes on a specific use case, feel free to reach out.
