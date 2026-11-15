import type { Lang } from '../i18n/ui';

export interface SkillItem {
  name: string;
  isCore?: boolean;
  note?: string;
}

export interface SkillDomain {
  id: string;
  code: string;
  badge: string;
  title: string;
  description: string;
  skills: SkillItem[];
  keyPractices: string[];
  appliedIn: {
    projectTitle: string;
    projectId: string;
    summary: string;
  };
}

export const skillsData: Record<Lang, SkillDomain[]> = {
  es: [
    {
      id: 'ingestion-etl',
      code: 'DOM_01',
      badge: 'INGESTA & PIPELINES ETL',
      title: 'Ingesta de Datos & Pipelines ETL/ELT',
      description: 'Extracción programada desde APIs REST públicas, ingesta por lotes en capa Bronze y orquestación estructurada de dependencias entre tareas.',
      skills: [
        { name: 'Python (Requests, Urllib)', isCore: true, note: 'Manejo de errores HTTP, reintentos y paginación' },
        { name: 'PySpark (Batch Processing)', isCore: true, note: 'Lectura estructurada y parseo de JSON anidado' },
        { name: 'Databricks Workflows', isCore: true, note: 'DAGs de tareas orquestadas y disparadores cron' },
        { name: 'APIs REST', isCore: false, note: 'Rate-limiting, autenticación por cabeceras y payloads anidados' },
        { name: 'Arquitectura Medallion (Bronze)', isCore: true, note: 'Persistencia inmutable de JSON crudo en formato string' }
      ],
      keyPractices: [
        'Ingesta idempotente: re-ejecuciones seguras sin duplicación de registros.',
        'Preservación de datos crudos (Raw preservation) para reproducibilidad y auditoría.',
        'Estrategias de control de cuotas y tolerancia preventiva a fallos de red.'
      ],
      appliedIn: {
        projectTitle: 'Crypto Data Pipeline (CoinGecko)',
        projectId: 'coingecko-crypto-pipeline',
        summary: 'Ingesta diaria programada vía API REST hacia Bronze Delta Table en Databricks.'
      }
    },
    {
      id: 'transformation-modeling',
      code: 'DOM_02',
      badge: 'TRANSFORMACIÓN & MODELADO',
      title: 'Transformación & Modelado Dimensional',
      description: 'Construcción de capas analíticas limpias con dbt y SQL. Diseño dimensional (Kimball) separando hechos de dimensiones con reglas de negocio claras.',
      skills: [
        { name: 'dbt (Core & Cloud)', isCore: true, note: 'Estructuración modular de staging y marts' },
        { name: 'SQL Analítico Avanzado', isCore: true, note: 'CTEs, window functions y agregaciones multi-nivel' },
        { name: 'Modelado Kimball (Star Schema)', isCore: true, note: 'Tablas fct_orders/payments y dimensiones conformadas' },
        { name: 'Funciones de Ventana (Window)', isCore: true, note: 'LAG(), LEAD(), ROW_NUMBER() para deduplicación' },
        { name: 'Casteo Defensivo (TRY_CAST)', isCore: false, note: 'Conversión segura de fechas y números corruptos' }
      ],
      keyPractices: [
        'Desacoplamiento estricto: la lógica analítica de negocio se ejecuta en SQL, no en scripts sueltos.',
        'Normalización de métricas temporales (Lead time de entrega real vs estimado).',
        'Modelos SQL reutilizables y autodescriptivos organizados por dominios de negocio.'
      ],
      appliedIn: {
        projectTitle: 'Olist E-Commerce Analytics',
        projectId: 'olist-ecommerce-analytics',
        summary: 'Modelado dimensional en Star Schema con dbt Cloud sobre Unity Catalog.'
      }
    },
    {
      id: 'storage-lakehouse',
      code: 'DOM_03',
      badge: 'STORAGE & LAKEHOUSE',
      title: 'Almacenamiento & Arquitectura Lakehouse',
      description: 'Gestión eficiente de datos estructurados y semiestructurados en formato Parquet/Delta con gobernanza, versionado y control transaccional.',
      skills: [
        { name: 'Delta Lake (ACID)', isCore: true, note: 'Transacciones ACID sobre almacenamiento distribuido' },
        { name: 'Operaciones MERGE / Upsert', isCore: true, note: 'Carga incremental y ventana histórica móvil de 7 días' },
        { name: 'Databricks Unity Catalog', isCore: true, note: 'Gobierno de catálogos, esquemas y linaje de tablas' },
        { name: 'PostgreSQL / SQL Tabular', isCore: false, note: 'Esquemas relacionales, constraints y consultas eficientes' },
        { name: 'Particionamiento & Time Travel', isCore: false, note: 'Consulta histórica y optimización de lecturas' }
      ],
      keyPractices: [
        'Estrategia de retención controlada: DELETE y MERGE automatizado para optimizar almacenamiento.',
        'Garantía de idempotencia en cargas incrementales de datos.',
        'Gobierno y aislamiento de tablas en Unity Catalog para consumo downstream seguro.'
      ],
      appliedIn: {
        projectTitle: 'Crypto Data Pipeline',
        projectId: 'coingecko-crypto-pipeline',
        summary: 'Tablas Delta en Silver y Gold con operaciones MERGE y retención rotativa.'
      }
    },
    {
      id: 'quality-devops',
      code: 'DOM_04',
      badge: 'CALIDAD, TESTING & DEVOPS',
      title: 'Calidad de Datos, Testing & Entrega',
      description: 'Validación automatizada de esquemas y reglas de integridad para evitar datos corruptos en capas de consumo, con entrega mediante dashboards interactivos.',
      skills: [
        { name: 'dbt Tests (Schema & Integrity)', isCore: true, note: 'unique, not_null, accepted_values, relationships' },
        { name: 'PySpark Assertions', isCore: true, note: 'Verificación de row counts y nulos previo a capa Gold' },
        { name: 'Streamlit Community Cloud', isCore: true, note: 'Deploy de dashboards analíticos conectados al lakehouse' },
        { name: 'Git & GitHub', isCore: true, note: 'Ramas, pull requests, commits convencionales y documentación' },
        { name: 'Docker (Fundamentos)', isCore: false, note: 'Conceptos de contenedores para reproducibilidad local' }
      ],
      keyPractices: [
        'Filosofía Fail-Fast: abortar la ejecución del pipeline si los datos violan las aserciones mínimas.',
        'Documentación viva: linaje de datos y catálogo de campos generado con dbt docs.',
        'Diseño orientado al consumidor final: exposición limpia de KPIs para toma de decisiones.'
      ],
      appliedIn: {
        projectTitle: 'Olist Pipeline & Crypto Pipeline',
        projectId: 'olist-ecommerce-analytics',
        summary: 'Suite completa de tests dbt y aserciones de consistencia en PySpark.'
      }
    }
  ],
  en: [
    {
      id: 'ingestion-etl',
      code: 'DOM_01',
      badge: 'INGESTION & ETL PIPELINES',
      title: 'Data Ingestion & ETL/ELT Pipelines',
      description: 'Scheduled extraction from public REST APIs, raw batch ingestion into Bronze, and structured DAG dependency orchestration.',
      skills: [
        { name: 'Python (Requests, Urllib)', isCore: true, note: 'HTTP error handling, backoff retries, and pagination' },
        { name: 'PySpark (Batch Processing)', isCore: true, note: 'Structured reading and nested JSON schema parsing' },
        { name: 'Databricks Workflows', isCore: true, note: 'Task dependency DAGs and scheduled cron triggers' },
        { name: 'REST APIs', isCore: false, note: 'Rate-limiting, header authentication, and payload parsing' },
        { name: 'Medallion Architecture (Bronze)', isCore: true, note: 'Immutable raw JSON persistence as strings' }
      ],
      keyPractices: [
        'Idempotent ingestion: safe re-runs without duplicate record creation.',
        'Raw preservation: keeping original payloads for reproducibility and auditability.',
        'Preventive error handling and quota management against external API endpoints.'
      ],
      appliedIn: {
        projectTitle: 'Crypto Data Pipeline (CoinGecko)',
        projectId: 'coingecko-crypto-pipeline',
        summary: 'Daily scheduled ingestion via REST API into Databricks Bronze Delta tables.'
      }
    },
    {
      id: 'transformation-modeling',
      code: 'DOM_02',
      badge: 'TRANSFORMATION & MODELING',
      title: 'Transformation & Dimensional Modeling',
      description: 'Building clean analytical layers using dbt and SQL. Kimball dimensional design separating facts from conformable dimensions with explicit business rules.',
      skills: [
        { name: 'dbt (Core & Cloud)', isCore: true, note: 'Modular layering across staging and business marts' },
        { name: 'Advanced Analytical SQL', isCore: true, note: 'CTEs, window functions, and multi-level aggregations' },
        { name: 'Kimball Modeling (Star Schema)', isCore: true, note: 'fct_orders/payments facts and conformable dimensions' },
        { name: 'Window Functions', isCore: true, note: 'LAG(), LEAD(), ROW_NUMBER() for precise deduplication' },
        { name: 'Defensive Casting (TRY_CAST)', isCore: false, note: 'Safe date and numeric parsing preventing query crashes' }
      ],
      keyPractices: [
        'Strict decoupling: analytical business logic belongs in SQL, not ad-hoc scripts.',
        'Standardized operational metrics (Actual vs estimated delivery lead times).',
        'Self-documenting, reusable SQL models organized by business domain.'
      ],
      appliedIn: {
        projectTitle: 'Olist E-Commerce Analytics',
        projectId: 'olist-ecommerce-analytics',
        summary: 'Star Schema dimensional modeling with dbt Cloud over Unity Catalog.'
      }
    },
    {
      id: 'storage-lakehouse',
      code: 'DOM_03',
      badge: 'STORAGE & LAKEHOUSE',
      title: 'Storage & Lakehouse Architecture',
      description: 'Efficient structured and semi-structured data management in Parquet/Delta format with ACID compliance, governance, and transactional control.',
      skills: [
        { name: 'Delta Lake (ACID)', isCore: true, note: 'ACID transactions over distributed object storage' },
        { name: 'MERGE / Upsert Operations', isCore: true, note: 'Incremental updates and 7-day rolling historical retention' },
        { name: 'Databricks Unity Catalog', isCore: true, note: 'Catalog, schema, and table governance with column lineage' },
        { name: 'PostgreSQL / Relational SQL', isCore: false, note: 'Relational schemas, constraints, and optimized queries' },
        { name: 'Partitioning & Time Travel', isCore: false, note: 'Historical version queries and read-path optimization' }
      ],
      keyPractices: [
        'Controlled retention policy: automated DELETE and MERGE to prevent storage blowup.',
        'Idempotency guarantee during incremental delta batch loads.',
        'Isolation and table management in Unity Catalog for secure downstream consumption.'
      ],
      appliedIn: {
        projectTitle: 'Crypto Data Pipeline',
        projectId: 'coingecko-crypto-pipeline',
        summary: 'Silver and Gold Delta tables with MERGE operations and sliding retention.'
      }
    },
    {
      id: 'quality-devops',
      code: 'DOM_04',
      badge: 'QUALITY, TESTING & DEVOPS',
      title: 'Data Quality, Testing & Delivery',
      description: 'Automated schema validation and referential integrity rules preventing corrupt data from reaching analytics marts, delivered via live interactive apps.',
      skills: [
        { name: 'dbt Tests (Schema & Integrity)', isCore: true, note: 'unique, not_null, accepted_values, relationships' },
        { name: 'PySpark Assertions', isCore: true, note: 'Pre-Gold assertions checking row count drops and nulls' },
        { name: 'Streamlit Community Cloud', isCore: true, note: 'Live deployment of analytical dashboards reading lakehouse marts' },
        { name: 'Git & GitHub', isCore: true, note: 'Feature branches, PRs, conventional commits, and clean READMEs' },
        { name: 'Docker (Fundamentals)', isCore: false, note: 'Containerization principles for local pipeline reproducibility' }
      ],
      keyPractices: [
        'Fail-Fast mindset: immediately halt pipeline execution if assertions fail.',
        'Living documentation: automated data lineage and dictionary generated with dbt docs.',
        'Consumer-centric design: clean KPI presentation tailored for business decisions.'
      ],
      appliedIn: {
        projectTitle: 'Olist Pipeline & Crypto Pipeline',
        projectId: 'olist-ecommerce-analytics',
        summary: 'Complete dbt test suite and programmatic PySpark consistency assertions.'
      }
    }
  ]
};
