# Simulación de facturación · Año 2025

Datos completamente ficticios. No son comprobantes fiscales.

Carga este archivo en **Importar simulación**, revisa el resumen y confirma la importación.

El bloque siguiente es el formato de intercambio `factura-demo-v1`. Puedes editar sus datos respetando la estructura; solo se admite USD.

```json
{
  "schema": "factura-demo-v1",
  "simulation": true,
  "year": 2025,
  "invoices": [
    {
      "number": "DEMO-2025-0001",
      "date": "2025-01-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 27
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0002",
      "date": "2025-01-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 182
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0003",
      "date": "2025-01-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 14
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0004",
      "date": "2025-01-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 67
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0005",
      "date": "2025-01-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 27
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0006",
      "date": "2025-01-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 182
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0007",
      "date": "2025-01-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 14
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0008",
      "date": "2025-01-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 67
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0009",
      "date": "2025-01-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 27
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 21
        }
      ]
    },
    {
      "number": "DEMO-2025-0010",
      "date": "2025-02-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 29
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0011",
      "date": "2025-02-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 184
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0012",
      "date": "2025-02-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 16
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0013",
      "date": "2025-02-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 69
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0014",
      "date": "2025-02-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 29
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0015",
      "date": "2025-02-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 184
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0016",
      "date": "2025-02-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 16
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0017",
      "date": "2025-02-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 69
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0018",
      "date": "2025-02-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 29
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0019",
      "date": "2025-02-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 184
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 22
        }
      ]
    },
    {
      "number": "DEMO-2025-0020",
      "date": "2025-03-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 31
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0021",
      "date": "2025-03-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 186
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0022",
      "date": "2025-03-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 18
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0023",
      "date": "2025-03-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 71
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0024",
      "date": "2025-03-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 31
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0025",
      "date": "2025-03-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 186
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0026",
      "date": "2025-03-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 18
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0027",
      "date": "2025-03-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 71
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0028",
      "date": "2025-03-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 31
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0029",
      "date": "2025-03-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 186
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0030",
      "date": "2025-03-22",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 2,
          "unitPrice": 18
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 23
        }
      ]
    },
    {
      "number": "DEMO-2025-0031",
      "date": "2025-04-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 33
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0032",
      "date": "2025-04-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 188
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0033",
      "date": "2025-04-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 20
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0034",
      "date": "2025-04-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 73
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0035",
      "date": "2025-04-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 33
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0036",
      "date": "2025-04-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 188
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0037",
      "date": "2025-04-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 20
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0038",
      "date": "2025-04-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 73
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0039",
      "date": "2025-04-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 33
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0040",
      "date": "2025-04-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 188
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0041",
      "date": "2025-04-22",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 2,
          "unitPrice": 20
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0042",
      "date": "2025-04-24",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 3,
          "unitPrice": 73
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 24
        }
      ]
    },
    {
      "number": "DEMO-2025-0043",
      "date": "2025-05-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 35
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0044",
      "date": "2025-05-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 190
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0045",
      "date": "2025-05-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 22
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0046",
      "date": "2025-05-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 75
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0047",
      "date": "2025-05-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 35
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0048",
      "date": "2025-05-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 190
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0049",
      "date": "2025-05-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 22
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0050",
      "date": "2025-05-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 75
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 25
        }
      ]
    },
    {
      "number": "DEMO-2025-0051",
      "date": "2025-06-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 37
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0052",
      "date": "2025-06-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 192
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0053",
      "date": "2025-06-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 24
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0054",
      "date": "2025-06-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 77
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0055",
      "date": "2025-06-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 37
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0056",
      "date": "2025-06-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 192
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0057",
      "date": "2025-06-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 24
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0058",
      "date": "2025-06-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 77
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0059",
      "date": "2025-06-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 37
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 26
        }
      ]
    },
    {
      "number": "DEMO-2025-0060",
      "date": "2025-07-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 39
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0061",
      "date": "2025-07-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 194
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0062",
      "date": "2025-07-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 26
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0063",
      "date": "2025-07-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 79
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0064",
      "date": "2025-07-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 39
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0065",
      "date": "2025-07-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 194
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0066",
      "date": "2025-07-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 26
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0067",
      "date": "2025-07-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 79
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0068",
      "date": "2025-07-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 39
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0069",
      "date": "2025-07-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 194
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 27
        }
      ]
    },
    {
      "number": "DEMO-2025-0070",
      "date": "2025-08-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 41
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0071",
      "date": "2025-08-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 196
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0072",
      "date": "2025-08-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 28
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0073",
      "date": "2025-08-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 81
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0074",
      "date": "2025-08-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 41
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0075",
      "date": "2025-08-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 196
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0076",
      "date": "2025-08-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 28
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0077",
      "date": "2025-08-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 81
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0078",
      "date": "2025-08-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 41
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0079",
      "date": "2025-08-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 196
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0080",
      "date": "2025-08-22",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 2,
          "unitPrice": 28
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 28
        }
      ]
    },
    {
      "number": "DEMO-2025-0081",
      "date": "2025-09-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 43
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0082",
      "date": "2025-09-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 198
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0083",
      "date": "2025-09-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 30
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0084",
      "date": "2025-09-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 83
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0085",
      "date": "2025-09-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 43
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0086",
      "date": "2025-09-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 198
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0087",
      "date": "2025-09-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 30
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0088",
      "date": "2025-09-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 83
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0089",
      "date": "2025-09-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 43
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0090",
      "date": "2025-09-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 198
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0091",
      "date": "2025-09-22",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 2,
          "unitPrice": 30
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0092",
      "date": "2025-09-24",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 3,
          "unitPrice": 83
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 29
        }
      ]
    },
    {
      "number": "DEMO-2025-0093",
      "date": "2025-10-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 45
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0094",
      "date": "2025-10-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 200
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0095",
      "date": "2025-10-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 32
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0096",
      "date": "2025-10-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 85
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0097",
      "date": "2025-10-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 45
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0098",
      "date": "2025-10-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 200
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0099",
      "date": "2025-10-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 32
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0100",
      "date": "2025-10-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 85
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 30
        }
      ]
    },
    {
      "number": "DEMO-2025-0101",
      "date": "2025-11-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 47
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0102",
      "date": "2025-11-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 202
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0103",
      "date": "2025-11-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 34
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0104",
      "date": "2025-11-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 87
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0105",
      "date": "2025-11-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 47
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0106",
      "date": "2025-11-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 202
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0107",
      "date": "2025-11-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 34
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0108",
      "date": "2025-11-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 87
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0109",
      "date": "2025-11-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 47
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 31
        }
      ]
    },
    {
      "number": "DEMO-2025-0110",
      "date": "2025-12-02",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 1,
          "unitPrice": 49
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0111",
      "date": "2025-12-04",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 2,
          "unitPrice": 204
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0112",
      "date": "2025-12-06",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 3,
          "unitPrice": 36
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0113",
      "date": "2025-12-08",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 1,
          "unitPrice": 89
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0114",
      "date": "2025-12-10",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 2,
          "unitPrice": 49
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0115",
      "date": "2025-12-12",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 3,
          "unitPrice": 204
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0116",
      "date": "2025-12-14",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Sofía Prueba",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Mouse",
          "quantity": 1,
          "unitPrice": 36
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0117",
      "date": "2025-12-16",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Luis Simulado",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Soporte técnico",
          "quantity": 2,
          "unitPrice": 89
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0118",
      "date": "2025-12-18",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Ana Demo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Teclado",
          "quantity": 3,
          "unitPrice": 49
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    },
    {
      "number": "DEMO-2025-0119",
      "date": "2025-12-20",
      "currency": "USD",
      "taxRate": 0.13,
      "issuer": {
        "name": "TechStore S.A. (simulación)",
        "identification": "3101123456"
      },
      "customer": {
        "name": "Carlos Ejemplo",
        "identification": "101230456",
        "identificationType": "fisica",
        "email": "demo@example.com",
        "address": "Dirección ficticia"
      },
      "items": [
        {
          "description": "Monitor",
          "quantity": 1,
          "unitPrice": 204
        },
        {
          "description": "Servicio de instalación",
          "quantity": 1,
          "unitPrice": 32
        }
      ]
    }
  ]
}
```
