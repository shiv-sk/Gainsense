# Gainsense
GainSense is an investment analytics platform that allows users to upload CSV-based investment data and visualize yearly investment totals, profit/loss, and asset-wise distributions.
The project emphasizes backend data processing, analytics, and frontend visualization using FastAPI, PostgreSQL, and Next.js.

# Working Features
- Upload investment data via CSV
- Investment categorization (Stocks, Mutual Funds, Gold, etc.)
- Profit/Loss calculation per investment
- Aggregated metrics:Total invested amount, Net profit/loss, Best & worst performing investments
- year-wise investment and profit/loss analysis
- Distribution of investments by type
- Interactive charts & tables
- Backend data validation & error handling

# Planned Features
- Token-based data editing & viewing limits
- Advanced filters (date range, asset type)
- Export analytics as PDF/CSV
- Reading Multiple Sheets

# Tech Stack
- Frontend: Next.js(React), Tailwind CSS / Daisyui
- charts: Chart.js
- Backend: FastAPI, SQLAlchemy
- Database: PostgreSQL (Local), Supabase (Hosted PostgreSQL)

# Installation & Local Setup
- Clone the Repository: git clone https://github.com/shiv-sk/Gainsense.git
- cd Gainsense

# Install Dependencies
### Server Dependencies
- cd server
- pip install -r requirements.txt

### Client Dependencies
- cd ../client
- npm install
# Environment Variables Setup
- Set up client environment variables using env.example
- Set up server environment variables using env.example
- Ensure Postgres is running locally or use a cloud Postgres URI

# Run the Application

### Start Backend Server
- cd server
- uvicorn main:app --reload

### Start Frontend
- cd client
- npm run dev

### Sample csv
[Download sample CSV](client/public/GainSense-sample-data.csv)

**CSV Format**

```csv
investment_type,investment_amount,investment_date,return_percent
Stock,5000,2022-03-15,12
Mutual Fund,10000,2023-06-10,8
Gold,7000,2024-01-05,10 
```
**Location**
``` client/public/GainSense-sample-data.csv ```

# Application Flow Diagram
[![](https://mermaid.ink/img/pako:eNpVkl1v2jAUhv-Kda42KaDEoQvJxaRAACG1G-KjUpf0wk0OIWpiI9uMdcB_n21Yu_nqtc5z3vNhn6AUFUIC21Ycyx2TmqyzghNzNvlGoXwmvd7X82bfClYpMl49nsl0kk-l4Bp59XxFpxNHmSiZNi2eSbqY5yNWvhrEaoNdQaMd-cjapmIaCTPAgkmFV-vF8vs4z5hmZCFFiUo1vL7VsCGXu9JCIrHQmWSj_JNVL0zh5_cq2ciBS3Ykc_4Tle6Q61tG-i29f1rPx6s85ax9002pyITXDcdbnXfAeTwhk71jY_r7x8k1LcW20eReKGVMZ7M8rWuJtZmpIg-opfH9mHo2c2Z2-iWqveAK7Rr_X55dvnLea_bSorHdWAA8qGVTQbJlrUIPOpQds3c42XABeocdFpAYWTH5WkDBLyZpz_gPITpItDyYNCkO9e7v5bC3y88aVkv2QZjHQjkWB64hCeLQWUBygl-QUD_qD-6oT434Eg1D6sEbJD0a0D4N_YE_GMZhHMRRdPHgt6tK-yENosAPB8OAxjSidx5g1Zi3e7h-OPfvLn8Av0DIbw?type=png)](https://mermaid.live/edit#pako:eNpVkl1v2jAUhv-Kda42KaDEoQvJxaRAACG1G-KjUpf0wk0OIWpiI9uMdcB_n21Yu_nqtc5z3vNhn6AUFUIC21Ycyx2TmqyzghNzNvlGoXwmvd7X82bfClYpMl49nsl0kk-l4Bp59XxFpxNHmSiZNi2eSbqY5yNWvhrEaoNdQaMd-cjapmIaCTPAgkmFV-vF8vs4z5hmZCFFiUo1vL7VsCGXu9JCIrHQmWSj_JNVL0zh5_cq2ciBS3Ykc_4Tle6Q61tG-i29f1rPx6s85ax9002pyITXDcdbnXfAeTwhk71jY_r7x8k1LcW20eReKGVMZ7M8rWuJtZmpIg-opfH9mHo2c2Z2-iWqveAK7Rr_X55dvnLea_bSorHdWAA8qGVTQbJlrUIPOpQds3c42XABeocdFpAYWTH5WkDBLyZpz_gPITpItDyYNCkO9e7v5bC3y88aVkv2QZjHQjkWB64hCeLQWUBygl-QUD_qD-6oT434Eg1D6sEbJD0a0D4N_YE_GMZhHMRRdPHgt6tK-yENosAPB8OAxjSidx5g1Zi3e7h-OPfvLn8Av0DIbw)

# Screenshots
![Page1](screenshots/gainsense-1.png)
![Page2](screenshots/gainsense-2.png)
![Page3](screenshots/gainsense-3.png)
![Page4](screenshots/gainsense-4.png)
![Page5](screenshots/gainsense-5.png)
![Page6](screenshots/gainsense-6.png)
# Demo
coming soon
# Links
Live: https://gainsense.vercel.app
# Contact
- email: shivanandcrew034@gmail.com