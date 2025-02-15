# Music Video Tracker

A multi tier, data oriented web application that lets you track your favorite YouTube music videos' statistics over time.
- [Try it here](https://caidam.github.io/project-project-front)
    > **Use username: `guest` and passsword: `guest` to access the website without creating an account.**

<img src="./misc/focus_page.png" alt="Description" width=800 >

## Overview

Music Video Tracker is a multi-tier, data-driven web application designed to track YouTube music video statistics over time. It enables users to monitor video performance, discover new music clips, and analyze trends through a secure and interactive interface.

## Features

- **Track Music Videos**: Monitor views, likes, comments, and other performance metrics over time.
- **Discover New Videos**: Randomized video selection for music discovery.
- **Advanced Analytics**: Data-driven insights with performance comparison.
- **Secure Authentication**: User login with JWT authentication.
- **Automated Data Processing**: Daily updates on video performance.

## Architecture

<img src="./misc/project-project-target-architecture.png" alt="Description" width=800>

- **Frontend**: Built with Vite, React, and Tailwind for a responsive UI.
- **Backend**: Django REST Framework handling API interactions.
- **Data Processing**: Flask API for analytical data retrieval.
- **Database**: PostgreSQL for application data, BigQuery for analytics.
- **Orchestration**: Kestra for workflow automation.

## Documentation

- **[Technical Doc (in french)](./misc/public_mvt_dossier_projet.pdf)** – Detailed project report.

## Repositories

- [Frontend Repo](./repos/mvt_frontend)
- [Backend Repo](./repos/mvt_backend)
- [Data Processing Repo](./repos/mvt_data_processing)
- [dbt Repo](./repos/mvt_dbt)

## DevOps & Security

- **Infrastructure as Code**: Terraform.
- **Secrets Management**: HashiCorp Vault.
- **Cloud Deployment**: AWS Lambda via Zappa for backend scalability.
- **Testing & Automation**: Pytest, Jest

