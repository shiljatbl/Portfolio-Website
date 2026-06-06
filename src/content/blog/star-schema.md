---
title: "The Star Schema Explained: Why Your Power BI Reports Are Slow and How to Fix It"
description: "Learn how the star schema data model works, why it makes Power BI reports faster, and how to restructure your data model for better performance and simpler DAX."
pubDate: 2026-06-06
tags: ["Power BI", "Star Schema", "Data Modeling", "DAX", "Business Intelligence", "Performance"]
draft: false
---

If your Power BI report takes ten seconds to load, the problem is almost never the visualisation. It is almost always the data model underneath it.

After two years of building and optimising Power BI reports in production — for e-commerce operations, manufacturing companies, and logistics teams — the single most impactful change I make when inheriting a slow report is restructuring the data model into a star schema. It is not glamorous work, but nothing else comes close in terms of performance gains.

Here is what the star schema is, why Power BI's engine loves it, and how to get there from the flat tables most people start with.

## What is a Star Schema?

A star schema is a way of organising your data into two types of tables.

**Fact tables** contain your measurements — the numbers you want to analyse. Sales amounts, order quantities, page views, shift hours. Each row in a fact table represents a single event or transaction. Fact tables are typically long and narrow: many rows, few columns.

**Dimension tables** contain the context for those measurements — the who, what, when, and where. Customers, products, dates, locations, employees. Dimension tables are typically short and wide: fewer rows, more descriptive columns.

The fact table sits in the centre. The dimension tables surround it, each connected by a single relationship key. Draw it on a whiteboard and it looks like a star — hence the name. A typical star schema has a central FactSales table connected to DimDate, DimCustomer, DimProduct, and DimRegion tables, each joined by a single integer key.

## Why Power BI's Engine Loves It

Power BI uses an in-memory columnar engine called VertiPaq. Understanding two things about VertiPaq explains why the star schema works so well with it.

**First, VertiPaq compresses columns, not rows.** A column containing a thousand repetitions of "Electronics" compresses down to almost nothing. Wide flat tables with many repeated string values across multiple columns compress poorly. Narrow fact tables with integer foreign keys compress extremely well.

**Second, DAX was designed for star schemas.** Functions like `CALCULATE`, `RELATED`, and `USERELATIONSHIP` assume a clean separation between facts and dimensions. When your model is a flat table or a tangle of many-to-many relationships, DAX becomes awkward, slow, and hard to debug. Against a proper star schema, the same calculations are simpler to write and faster to execute.

## The Flat Table Problem

Most people start with a flat table — a single wide table exported from a database or Excel file that contains everything. A typical example has columns for OrderDate, CustomerName, CustomerCity, ProductName, Category, SalesAmount, and Quantity all in one place.

This feels convenient — everything is in one place. But it creates several problems:

- Repeated strings like CustomerName and Category across thousands of rows compress poorly
- DAX gets complicated when you need to filter by date intelligence or compare periods
- Relationships are impossible to build cleanly because there is nothing to relate to
- Maintenance is painful — changing a customer's city means updating every row that references them

## Building the Star Schema

Take that flat table and split it into its natural components.

**FactSales** keeps only the measurements and foreign keys — DateKey, CustomerKey, ProductKey, SalesAmount, and Quantity. Each row is a single transaction with integer keys pointing to the dimension tables.

**DimCustomer** holds one row per customer — CustomerKey, CustomerName, CustomerCity, and Country. A customer's city is stored once, not repeated across every order they ever placed.

**DimProduct** holds one row per product — ProductKey, ProductName, Category, and UnitCost.

**DimDate** holds one row per date, with every date attribute you need — DateKey, Date, Year, Quarter, Month, MonthName, Weekday, and IsWeekend.

The DimDate table deserves special attention. Time intelligence in DAX — year-to-date totals, same period last year comparisons, rolling averages — relies on having a proper date dimension that is marked as a date table in Power BI. Generate it with Power Query or DAX, make sure it has no gaps, and mark it as a date table. This single step unlocks the entire suite of DAX time intelligence functions.

## Doing This in Power Query

You do not need to restructure your database to build a star schema in Power BI. Power Query can do it for you during the import step.

Starting from a flat FactSales query, create your dimension tables by referencing it:

```m
let
    Source = FactSales,
    SelectColumns = Table.SelectColumns(Source, {"CustomerName", "CustomerCity", "Country"}),
    Deduplicated = Table.Distinct(SelectColumns),
    AddKey = Table.AddIndexColumn(Deduplicated, "CustomerKey", 1, 1, Int64.Type)
in
    AddKey
```

Then go back to your FactSales query and replace the customer columns with a merge that brings in just the CustomerKey. Repeat for each dimension. Your fact table ends up lean, your dimension tables are clean, and Power BI's model view shows the star you are aiming for.

## The Performance Impact

The difference is measurable. A report I optimised last year for a logistics client had a flat table of 4.2 million rows and 28 columns. Load time was 14 seconds. After restructuring into a star schema with a fact table and five dimensions, the same report loaded in under 2 seconds. The dataset size in memory dropped from 380MB to 94MB.

The improvement comes from three places: better VertiPaq compression on the narrow fact table, simpler DAX evaluation paths, and Power BI's query engine being able to filter dimension tables before scanning the fact table.

## Common Mistakes to Avoid

**Many-to-many relationships** between fact and dimension tables usually signal a modelling mistake. Revisit your grain — the level of detail each fact row represents — and adjust until you can build clean one-to-many relationships from dimension to fact.

**Calculated columns in fact tables** are expensive. A calculated column in a fact table with five million rows adds five million values to memory. Move calculations to measures where possible, or compute them upstream in Power Query or your data warehouse.

**Missing dates in DimDate** break time intelligence functions silently. Your date dimension should cover every date from the earliest transaction in your data to today, with no gaps.

**Bidirectional relationships** are almost never necessary and frequently cause circular dependency errors and incorrect filter propagation. Stick to single-direction relationships from dimension to fact unless you have a very specific reason not to.

## Where to Go From Here

The star schema is the foundation. Once your model is clean, DAX becomes significantly more predictable — measures like year-to-date sales, customer lifetime value, and period-over-period growth go from painful to straightforward.

If you are working with an existing Power BI report that is slow or hard to maintain, start by opening the Model view and looking at what you have. If you see one big table with everything in it, or a web of many-to-many relationships, the data model is where to focus first.

---

Questions about restructuring a specific model? Feel free to reach out — data modelling is one of my favourite things to dig into.