# Missouri Legislative Tracker

A civic accountability tool that makes Missouri legislation accessible to the public through visual bill tracking, plain-English summaries, and AI-powered analysis.

## Features

### Bill Tracking & Discovery
- **Visual Pipeline** - Track bills from introduction through committee, floor votes, and governor's desk
- **Topic-Based Browsing** - 13 citizen-friendly topic categories (Taxes, Healthcare, Education, etc.)
- **Smart Filters** - Filter by chamber, status, sponsor party, fiscal impact, and topic
- **Real-time Status** - Sync with official Missouri House and Senate data sources

### AI-Powered Analysis
- **Plain-English Summaries** - Automatically generated bill explanations
- **Bill Chat** - Ask questions about any bill using AI
- **Version Comparison** - Compare bill text changes between amendments

### Fiscal Transparency
- **Fiscal Notes** - Display official fiscal impact estimates
- **Weighted Impact** - Calculate expected fiscal impact based on passage probability
- **Budget Dashboard** - Track bills by fiscal impact across all categories

### Accountability Features
- **Committee View** - See which committees are holding up which bills
- **Sponsor Profiles** - Track legislator sponsorship patterns
- **Hearing Calendar** - Upcoming committee hearings with bill details

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **Data Storage** | JSON Graph Database (no external DB required) |
| **AI Integration** | Anthropic Claude API, OpenAI API (optional) |
| **Data Sync** | TypeScript scripts with XML/HTML parsing |
| **Charts** | Recharts |
| **Icons** | Lucide React |

## Project Structure

```
mo-leg-tracker/
├── webapp/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── bills/     # Bill listing and detail pages
│   │   │   ├── calendar/  # Hearing calendar
│   │   │   ├── committees/# Committee views
│   │   │   ├── fiscal/    # Fiscal impact dashboard
│   │   │   └── members/   # Legislator profiles
│   │   ├── components/    # React components
│   │   │   ├── bills/     # Bill cards, lists
│   │   │   ├── chat/      # AI chat sidebar
│   │   │   ├── dashboard/ # Dashboard widgets
│   │   │   └── fiscal/    # Fiscal components
│   │   ├── data/          # Data access layer
│   │   ├── lib/           # Utilities and AI handlers
│   │   └── types/         # TypeScript type definitions
│   └── db/
│       └── graph.json     # Legislative data (single source of truth)
│
├── sync/                   # Data synchronization scripts
│   ├── sources/           # Data source parsers
│   │   ├── house-xml-parser.ts    # Missouri House XML feeds
│   │   ├── senate-scraper.ts      # Missouri Senate HTML scraping
│   │   └── fiscal-note-parser.ts  # Fiscal note PDF extraction
│   ├── database/          # Graph database writers
│   ├── classify-bill-topics.ts    # Topic auto-classification
│   └── index.ts           # Main sync orchestrator
│
├── db/                     # Database schemas and utilities
│   ├── schema.json        # Graph schema definition
│   └── graph.json         # Backup/reference data
│
└── docs/
    ├── ARCHITECTURE.md    # System architecture
    ├── DATA_SOURCES.md    # Official data source documentation
    └── XML_SCHEMA.md      # XML feed structure
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) Anthropic API key for AI features
- (Optional) OpenAI API key for AI features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jsteelman8834/mo-leg-tracker.git
   cd mo-leg-tracker
   ```

2. **Install webapp dependencies**
   ```bash
   cd webapp
   npm install
   ```

3. **Install sync dependencies** (if you plan to sync data)
   ```bash
   cd ../sync
   npm install
   ```

4. **Configure environment** (for AI features)
   ```bash
   cd ../webapp
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   ANTHROPIC_API_KEY=your_anthropic_key_here
   OPENAI_API_KEY=your_openai_key_here  # optional
   ```

### Running the Application

**Development mode:**
```bash
cd webapp
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm start
```

## Data Synchronization

The sync module pulls data from official Missouri legislative sources:

### Full Sync
```bash
cd sync
npm run sync:full
```

### Incremental Sync (updates only)
```bash
npm run sync:incremental
```

### Single Bill Sync
```bash
npm run sync:bill -- HB123
```

### Topic Classification
Auto-classify all bills into topic categories:
```bash
npx ts-node classify-bill-topics.ts
```

## Topic Taxonomy

Bills are automatically classified into 13 citizen-friendly categories:

| Icon | Topic | Description |
|------|-------|-------------|
| 💰 | Taxes & Budget | Property tax, income tax, sales tax, state budget |
| 🏥 | Health & Healthcare | Insurance, hospitals, mental health, drugs |
| 🎓 | Education | K-12, higher education, teachers, curriculum |
| ⚖️ | Crime & Justice | Criminal law, sentencing, courts, corrections |
| 🔫 | Guns & Firearms | Firearms, ammunition, concealed carry |
| 🚨 | Public Safety | Police, fire, emergency services |
| 🏠 | Housing & Property | Real estate, homeowners, landlords |
| 👷 | Jobs & Business | Employment, labor, business regulations |
| 🚗 | Transportation | Vehicles, roads, drivers licenses |
| 🌾 | Agriculture & Environment | Farming, conservation, wildlife |
| 🗳️ | Voting & Government | Elections, voting, local government |
| 👨‍👩‍👧 | Families & Seniors | Child welfare, parental rights, aging |
| 🔒 | Rights & Technology | Civil liberties, privacy, AI, internet |

Classification uses keyword matching on bill titles and descriptions, with committee assignments as a secondary signal.

## Data Model

The application uses a graph-based JSON data model with the following node types:

- **Bills** - Legislation with status, sponsors, topics
- **Members** - Legislators with party, district, contact info
- **Committees** - Standing and special committees
- **Actions** - Bill history events
- **Hearings** - Scheduled committee hearings
- **Fiscal Notes** - Official fiscal impact estimates
- **Summaries** - AI-generated plain language summaries
- **Topics** - Category definitions for bill classification

## Key Pages

### Dashboard (`/`)
- Bills to Watch widget with upcoming hearings
- Chamber views showing committee activity
- Quick stats on session progress

### Bills (`/bills`)
- Filterable bill list with topic chips
- Search by number, title, or sponsor
- Fiscal impact and partisan filters
- Sort by date, impact, or passage likelihood

### Bill Detail (`/bills/[slug]`)
- Complete bill information
- Topic badges with links
- AI chat for questions
- Fiscal impact breakdown
- Action timeline
- Sponsor information

### Fiscal Dashboard (`/fiscal`)
- Bills sorted by fiscal impact
- Weighted impact calculations
- Committee fiscal summaries

### Calendar (`/calendar`)
- Upcoming committee hearings
- Bills scheduled for each hearing

## API Routes

### Chat API (`/api/chat`)
AI-powered bill analysis endpoint:
```typescript
POST /api/chat
{
  "message": "What does this bill do?",
  "billId": "bill:103:HB:123",
  "conversationHistory": []
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | For AI | Anthropic Claude API key |
| `OPENAI_API_KEY` | Optional | OpenAI API key (fallback) |
| `AI_PROVIDER` | Optional | `anthropic` or `openai` (default: anthropic) |

## Data Sources

Official Missouri legislative data is sourced from:

- **House**: `https://house.mo.gov/xml/` (XML feeds)
- **Senate**: `https://senate.mo.gov/` (HTML scraping)
- **Fiscal Notes**: PDF parsing from official documents

See [DATA_SOURCES.md](DATA_SOURCES.md) for detailed documentation.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Missouri House of Representatives for public XML data feeds
- Missouri Senate for public bill information
- [Anthropic](https://anthropic.com) for Claude AI
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

---

**Disclaimer**: This is an independent civic technology project and is not affiliated with the Missouri General Assembly. Data is sourced from official public feeds but may have delays or inaccuracies. Always verify information with official sources.
