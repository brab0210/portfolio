import type { Lang } from '../i18n/ui';

export interface ArchitectureNode {
  step: string;
  name: string;
  role: string;
  tech: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  status: 'active' | 'completed';
  image: string;
  repoUrl: string;
  liveUrl?: string;
  isLivePending?: boolean;
  problem: string;
  dataSource: {
    origin: string;
    format: string;
    frequency: string;
  };
  architectureFlow: ArchitectureNode[];
  architectureDetails: string;
  transformations: string[];
  qualityControls: string[];
  results: string[];
  stack: string[];
}

export const projectsData: Record<Lang, ProjectCaseStudy[]> = {
  es: [
    {
      id: 'coingecko-crypto-pipeline',
      title: 'Crypto Data Pipeline (CoinGecko API)',
      tagline: 'Pipeline ETL automatizado en Databricks con arquitectura Medallion y dashboard en Streamlit',
      status: 'active',
      image: '/images/crypto_market.png',
      repoUrl: 'https://github.com/brab0210/ml-data-pipeline',
      liveUrl: 'https://ml-data-pipeline-jrp6rdenslzbvz2imfj5pf.streamlit.app/',
      isLivePending: false,
      problem:
        'Necesidad de recolectar, almacenar y analizar métricas de criptomonedas de manera automatizada y continua, manteniendo una ventana móvil de datos históricos sin incurrir en costos de infraestructura cloud paga.',
      dataSource: {
        origin: 'API REST pública de CoinGecko (/coins/markets)',
        format: 'JSON anidado con cotizaciones, volúmenes y capitalizaciones',
        frequency: 'Ejecución programada diaria (batch)',
      },
      architectureFlow: [
        { step: '01', name: 'Extract & Bronze', role: 'Ingesta cruda como String', tech: 'Python + PySpark' },
        { step: '02', name: 'Silver Layer', role: 'Casting, limpieza y MERGE de 7 días', tech: 'Delta Lake (SQL)' },
        { step: '03', name: 'Gold Layer', role: '4 tablas agregadas de mercado', tech: 'Delta Lake (SQL)' },
        { step: '04', name: 'Testing & Serve', role: 'Data Quality tests + Visualización', tech: 'PySpark + Streamlit' },
      ],
      architectureDetails:
        'Implementación en Databricks Free Edition siguiendo el patrón Medallion. La orquestación está a cargo de un Job en Databricks Workflows con 4 tareas dependientes secuenciales (Bronze ➔ Silver ➔ Gold ➔ Tests). La capa de consumo en Streamlit Cloud se conecta al SQL Warehouse mediante una conexión resiliente con control de reintentos y tiempo de vida (TTL) para evitar bloqueos por cursors inactivos.',
      transformations: [
        'Ingesta defensiva en Bronze almacenando los campos numéricos como texto para evitar fallos por cambios inesperados en el payload.',
        'Limpieza y casteo tipado explícito (Double, Int, Timestamp) usando SQL estándar en la capa Silver.',
        'Política de retención histórica de 7 días ejecutada mediante operaciones MERGE y DELETE para optimizar almacenamiento.',
        'Modelado de 4 tablas agregadas en Gold: gold_market_summary, gold_top_10_market_cap, gold_top_gainers y gold_top_losers.',
      ],
      qualityControls: [
        'Suite de aserciones en PySpark ejecutada como paso final de la orquestación antes de autorizar el consumo.',
        'Validación de no-nulos en claves primarias y campos críticos de precio y volumen.',
        'Chequeo de frescura de datos (control de timestamp máximo vs fecha de ejecución).',
        'Validación de consistencia en el conteo de filas entre capas Bronze y Silver.',
      ],
      results: [
        'Pipeline completamente automatizado con orquestación diaria estable en Databricks Workflows.',
        'Dashboard interactivo público en Streamlit Cloud con gráficos comparativos de capitalización y volatilidad.',
        'Arquitectura 100% reproducible sobre capa gratuita (Free Tier) sin costos fijos.',
      ],
      stack: ['Databricks', 'PySpark', 'SQL', 'Delta Lake', 'Databricks Workflows', 'Streamlit', 'Python'],
    },
    {
      id: 'olist-analytics-dbt',
      title: 'Olist Analytics Pipeline (dbt)',
      tagline: 'Transformación dimensional con dbt y Databricks sobre dataset transaccional de e-commerce',
      status: 'completed',
      image: '/images/olist_dashboard.png',
      repoUrl: 'https://github.com/brab0210/dbt-olist-analytics',
      liveUrl: 'https://dbt-olist-analytics-k9tt9jdwsgyec7q27astkf.streamlit.app/',
      isLivePending: false,
      problem:
        'El dataset transaccional de e-commerce (Olist Brasil) presenta datos dispersos entre múltiples tablas relacionales, registros duplicados y tipos de datos inconsistentes que complejizaban la consulta analítica directa para métricas de logística y rendimiento comercial.',
      dataSource: {
        origin: 'Dataset transaccional de Olist (pedidos, pagos, clientes, productos, geolocalización)',
        format: 'Tablas relacionales cargadas en Unity Catalog',
        frequency: 'Carga por lotes (Batch) analítica',
      },
      architectureFlow: [
        { step: '01', name: 'Raw Storage', role: 'Catálogo unificado y gobernanza', tech: 'Databricks Unity Catalog' },
        { step: '02', name: 'dbt Staging', role: 'Limpieza, TRY_CAST y deduplicación', tech: 'dbt Cloud (SQL)' },
        { step: '03', name: 'dbt Marts', role: 'Modelo estrella (Star Schema)', tech: 'dbt Cloud (SQL)' },
        { step: '04', name: 'Analytics UI', role: 'Métricas de logística y ventas', tech: 'Streamlit Cloud' },
      ],
      architectureDetails:
        'Estructuración con dbt Cloud conectado a Databricks mediante Unity Catalog. Se organizaron los modelos en capas modulares (staging y marts) siguiendo el diseño dimensional de Kimball. Cada corrida de transformación valida automáticamente el modelo mediante tests de dbt.',
      transformations: [
        'Modelado dimensional Star Schema: Tablas de hechos fct_orders y fct_payments vinculadas a dimensiones dim_customers y dim_products.',
        'Uso sistemático de TRY_CAST para garantizar robustez frente a conversiones de fechas y montos corruptos.',
        'Deduplicación rigurosa de registros utilizando funciones de ventana ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...).',
        'Normalización de métricas logísticas: cálculo de tiempos de entrega efectivos vs plazos estimados y cálculo de retrasos.',
      ],
      qualityControls: [
        'Ejecución obligatoria de dbt test en cada pipeline de compilación.',
        'Tests de unicidad (unique) y no-nulos (not_null) sobre las claves subrogadas y de negocio.',
        'Validación de integridad referencial entre tablas de hechos y dimensiones (relationships).',
      ],
      results: [
        'Modelo dimensional limpio que reduce la complejidad de joins para consultas analíticas.',
        'Dashboard interactivo en Streamlit con análisis de tiempos de entrega, cobertura geográfica por estado brasileño y métodos de pago.',
        'Documentación y linaje de datos generado automáticamente por dbt Docs.',
      ],
      stack: ['dbt Cloud', 'Databricks', 'Unity Catalog', 'SQL', 'Streamlit', 'Data Modeling'],
    },
    {
      id: 'indec-inflation-monitor',
      title: 'Monitor de Inflación (INDEC API)',
      tagline: 'Consumo de API pública, procesamiento de series temporales macroeconómicas y visualización',
      status: 'completed',
      image: '/images/mon_infla.png',
      repoUrl: 'https://github.com/brab0210/indec-inflation-dashboard',
      liveUrl: 'https://indec-inflation-dashboard-65p6mhamnfyljbhp3jpgv3.streamlit.app/',
      isLivePending: false,
      problem:
        'La API oficial de datos macroeconómicos de Argentina (datos.gob.ar / INDEC) entrega series temporales en estructuras JSON anidadas que dificultan el análisis directo de la evolución del índice de precios y sus variaciones acumuladas.',
      dataSource: {
        origin: 'API de Series de Tiempo de datos.gob.ar (INDEC)',
        format: 'JSON jerárquico anidado',
        frequency: 'Actualización mensual periódica',
      },
      architectureFlow: [
        { step: '01', name: 'API Fetch', role: 'Consumo de endpoints oficiales', tech: 'Python (Requests)' },
        { step: '02', name: 'Databricks Lake', role: 'Almacenamiento y staging tabular', tech: 'Databricks (SQL)' },
        { step: '03', name: 'SQL Analytics', role: 'Desanidado JSON y LAG()', tech: 'SQL Window Functions' },
        { step: '04', name: 'Streamlit App', role: 'Gráficos de tendencia y variación', tech: 'Streamlit (En preparación)' },
      ],
      architectureDetails:
        'Pipeline que extrae las series de tiempo mediante Python, persiste el JSON crudo en Databricks y ejecuta transformaciones puramente en SQL analítico para normalizar el esquema y calcular los índices de variación matemática.',
      transformations: [
        'Aplanamiento y parseo de estructuras JSON anidadas utilizando funciones nativas from_json y explode en SQL.',
        'Cálculo de variación porcentual mensual e interanual mediante la función de ventana analítica LAG(...) OVER (ORDER BY fecha).',
        'Normalización de tipos de datos de fechas y valores de índice a formatos estándar de serie temporal.',
      ],
      qualityControls: [
        'Control de continuidad en la serie temporal para asegurar ausencia de meses faltantes o duplicados.',
        'Validación de rangos numéricos y detección de anomalías en los valores de inflación reportados.',
      ],
      results: [
        'Pipeline reproducible que automatiza la ingesta y el cálculo de inflación sin intervención manual de planillas.',
        'Código fuente estructurado y documentado en GitHub.',
        'Despliegue de la interfaz Streamlit en preparación para acceso público.',
      ],
      stack: ['Python', 'SQL Analítico', 'Databricks', 'Streamlit', 'APIs REST'],
    },
  ],
  en: [
    {
      id: 'coingecko-crypto-pipeline',
      title: 'Crypto Data Pipeline (CoinGecko API)',
      tagline: 'Automated ETL pipeline in Databricks with Medallion architecture and Streamlit dashboard',
      status: 'active',
      image: '/images/crypto_market.png',
      repoUrl: 'https://github.com/brab0210/ml-data-pipeline',
      liveUrl: 'https://ml-data-pipeline-jrp6rdenslzbvz2imfj5pf.streamlit.app/',
      isLivePending: false,
      problem:
        'Need for continuous, automated cryptocurrency market data collection, storage, and analytics with a moving historical retention window, avoiding paid cloud infrastructure costs.',
      dataSource: {
        origin: 'CoinGecko public REST API (/coins/markets)',
        format: 'Nested JSON containing prices, market caps, and trading volumes',
        frequency: 'Daily scheduled batch run',
      },
      architectureFlow: [
        { step: '01', name: 'Extract & Bronze', role: 'Raw schema-safe String ingestion', tech: 'Python + PySpark' },
        { step: '02', name: 'Silver Layer', role: 'Typing, cleansing, 7-day MERGE', tech: 'Delta Lake (SQL)' },
        { step: '03', name: 'Gold Layer', role: '4 analytical market aggregate tables', tech: 'Delta Lake (SQL)' },
        { step: '04', name: 'Testing & Serve', role: 'Data Quality tests + Live dashboard', tech: 'PySpark + Streamlit' },
      ],
      architectureDetails:
        'Implemented on Databricks Free Edition following the Medallion Architecture pattern. Orchestrated via Databricks Workflows with 4 sequential dependent tasks (Bronze ➔ Silver ➔ Gold ➔ Tests). The consumption layer on Streamlit Cloud connects to the Databricks SQL Warehouse through a resilient connection pool with TTL caching and retry logic to avoid connection drops.',
      transformations: [
        'Defensive raw Bronze ingestion storing numeric fields as strings to prevent pipeline crashes on API schema drift.',
        'Explicit type casting (Double, Int, Timestamp) and sanitization using standard SQL in the Silver layer.',
        '7-day historical retention policy implemented using MERGE and DELETE operations to optimize table size.',
        'Modeled 4 Gold summary tables: gold_market_summary, gold_top_10_market_cap, gold_top_gainers, and gold_top_losers.',
      ],
      qualityControls: [
        'PySpark assertion test suite executed as the final orchestration task prior to serving.',
        'Not-null checks on primary keys and critical valuation fields.',
        'Data freshness verification comparing maximum recorded timestamp against run date.',
        'Row-count consistency checks between Bronze and Silver stages.',
      ],
      results: [
        'Fully automated, dependable daily orchestration in Databricks Workflows.',
        'Public interactive dashboard deployed on Streamlit Cloud displaying market capitalization and price trends.',
        'Zero-cost operational architecture running entirely on free tier allowances.',
      ],
      stack: ['Databricks', 'PySpark', 'SQL', 'Delta Lake', 'Databricks Workflows', 'Streamlit', 'Python'],
    },
    {
      id: 'olist-analytics-dbt',
      title: 'Olist Analytics Pipeline (dbt)',
      tagline: 'Dimensional transformation with dbt and Databricks on transactional e-commerce data',
      status: 'completed',
      image: '/images/olist_dashboard.png',
      repoUrl: 'https://github.com/brab0210/dbt-olist-analytics',
      liveUrl: 'https://dbt-olist-analytics-k9tt9jdwsgyec7q27astkf.streamlit.app/',
      isLivePending: false,
      problem:
        'The Olist Brazilian e-commerce dataset featured scattered relational tables, duplicate entries, and data type inconsistencies, making analytical queries for logistics and sales performance inefficient and cumbersome.',
      dataSource: {
        origin: 'Olist transactional dataset (orders, payments, customers, items, geolocation)',
        format: 'Relational tables ingested into Unity Catalog',
        frequency: 'Analytical batch ingestion',
      },
      architectureFlow: [
        { step: '01', name: 'Raw Storage', role: 'Unified governance and storage', tech: 'Databricks Unity Catalog' },
        { step: '02', name: 'dbt Staging', role: 'Cleaning, TRY_CAST, deduplication', tech: 'dbt Cloud (SQL)' },
        { step: '03', name: 'dbt Marts', role: 'Kimball Star Schema modeling', tech: 'dbt Cloud (SQL)' },
        { step: '04', name: 'Analytics UI', role: 'Logistics and revenue visualization', tech: 'Streamlit Cloud' },
      ],
      architectureDetails:
        'Built with dbt Cloud connected to Databricks Unity Catalog. Models are organized into modular layers (staging and marts) following Kimball dimensional design principles. Each transformation job runs automated tests before publishing.',
      transformations: [
        'Star Schema dimensional modeling: Fact tables fct_orders and fct_payments connected to dimensions dim_customers and dim_products.',
        'Consistent use of TRY_CAST for resilient handling of corrupted dates and numerical values.',
        'Strict analytical deduplication using ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...).',
        'Logistics metric engineering: calculating actual delivery lead times vs estimated dates, along with shipment delays.',
      ],
      qualityControls: [
        'Mandatory automated dbt test runs across all build cycles.',
        'Uniqueness and not-null assertions on surrogate and business primary keys.',
        'Referential integrity tests validating relationships between facts and dimensions.',
      ],
      results: [
        'Clean dimensional model substantially reducing query complexity for ad-hoc business intelligence.',
        'Interactive Streamlit dashboard exploring logistics lead times, state-level revenue distribution, and payment breakdowns.',
        'Comprehensive documentation and DAG lineage automatically generated via dbt Docs.',
      ],
      stack: ['dbt Cloud', 'Databricks', 'Unity Catalog', 'SQL', 'Streamlit', 'Data Modeling'],
    },
    {
      id: 'indec-inflation-monitor',
      title: 'Inflation Monitor (INDEC API)',
      tagline: 'Public API ingestion, macroeconomic time-series processing, and visual analytics',
      status: 'completed',
      image: '/images/mon_infla.png',
      repoUrl: 'https://github.com/brab0210/indec-inflation-dashboard',
      liveUrl: 'https://indec-inflation-dashboard-65p6mhamnfyljbhp3jpgv3.streamlit.app/',
      isLivePending: false,
      problem:
        'Argentina’s official macroeconomic time-series API (datos.gob.ar / INDEC) provides economic indicators in deeply nested JSON formats, lacking ready-to-consume calculations for monthly and year-over-year price index variations.',
      dataSource: {
        origin: 'INDEC Time Series API (datos.gob.ar)',
        format: 'Hierarchical nested JSON',
        frequency: 'Periodic monthly release updates',
      },
      architectureFlow: [
        { step: '01', name: 'API Fetch', role: 'Official endpoint consumption', tech: 'Python (Requests)' },
        { step: '02', name: 'Databricks Lake', role: 'Tabular staging and persistence', tech: 'Databricks (SQL)' },
        { step: '03', name: 'SQL Analytics', role: 'JSON unnesting and LAG() metrics', tech: 'SQL Window Functions' },
        { step: '04', name: 'Streamlit App', role: 'Trend and variation visual analytics', tech: 'Streamlit (In progress)' },
      ],
      architectureDetails:
        'Pipeline that extracts time series records via Python, stores raw payloads in Databricks, and executes analytical SQL queries to normalize the schema and calculate rate-of-change metrics.',
      transformations: [
        'Unnesting and parsing hierarchical JSON using native SQL functions from_json and explode.',
        'Calculating monthly and year-over-year inflation rates using analytical window functions (LAG(...) OVER (ORDER BY date)).',
        'Standardizing dates and price index numeric values into time-series specifications.',
      ],
      qualityControls: [
        'Time-series continuity checks ensuring no missing or duplicate chronological periods.',
        'Value boundary sanity checks verifying reasonable inflation variation ranges.',
      ],
      results: [
        'Reproducible pipeline eliminating manual spreadsheet manipulation for macroeconomic indexing.',
        'Version-controlled source code documented on GitHub.',
        'Streamlit interactive deployment currently in progress.',
      ],
      stack: ['Python', 'Analytical SQL', 'Databricks', 'Streamlit', 'REST APIs'],
    },
  ],
};
