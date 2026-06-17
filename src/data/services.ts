/*
  Service-line content (Brief §7). One data shape drives the shared ServicePage template.
  All copy here is VERBATIM from the brief (em dashes preserved). Line 1 (Procurement) added in
  Step 9; Lines 2 (ICT) and 3 (Energy) added in Step 10.

  Flexibility the template must honour:
  - `equipment` is OPTIONAL (Line 1 only; ICT/Energy omit it).
  - `delivery` is variable length (Line 1 has 5 steps, ICT/Energy have 4).
*/

export interface TitleBody {
  title: string;
  body: string;
}

export interface EquipmentTile {
  title: string;
  items: string;
}

export interface ServiceData {
  slug: string;
  href: string;
  /** Breadcrumb + nav + enquiry label (e.g. "ICT services"). */
  label: string;
  /** Hero H1 headline — may be longer than the label (e.g. with a tagline). */
  heroHeadline: string;
  metaDescription: string;
  hero: {
    sub: string;
  };
  intro: {
    quote: string;
    body: string;
  };
  capabilities: TitleBody[];
  equipment?: EquipmentTile[];
  delivery: TitleBody[];
  /** Optional lead sentence above the consultancy cards (Line 1 only). */
  consultancyIntro?: string;
  consultancy: TitleBody[];
  sectors: string[];
  cta: {
    headline: string;
    body: string;
  };
}

export const PROCUREMENT: ServiceData = {
  slug: 'procurement',
  href: '/what-we-do/procurement',
  label: 'Procurement, supply chain & logistics',
  heroHeadline: 'Procurement, supply chain & logistics',
  metaDescription:
    'Northaxis sources, procures, imports, and delivers equipment and materials for Nigerian infrastructure programmes, with procurement strategy advisory for government clients.',
  hero: {
    sub: 'We source, procure, import, and deliver the equipment and materials that Nigerian infrastructure programmes depend on — and we advise on the strategies that make procurement more effective for government clients.',
  },
  intro: {
    quote:
      "Projects stall when procurement fails. We make sure yours doesn't — from vendor selection to site delivery.",
    body: 'State governments, construction firms, and development agencies across Nigeria face a recurring constraint: the right equipment arrives late, the vendor list is poorly managed, or the procurement process exposes the client to compliance risk. Northaxis Integrated Services addresses all three. We handle vendor sourcing and pre-qualification, equipment procurement and importation, freight logistics and last-mile delivery — and we bring procurement strategy advisory to clients who want to build better systems, not just buy better equipment.',
  },
  capabilities: [
    {
      title: 'Vendor sourcing & pre-qualification',
      body: 'Identifying, evaluating, and onboarding suppliers for government and private sector clients. Services: Market scoping, vendor shortlisting, pre-qualification documentation, performance framework design.',
    },
    {
      title: 'Equipment procurement & import',
      body: 'End-to-end sourcing and importation of civil, mechanical, electrical, and industrial equipment. Services: Specification alignment, competitive sourcing, import documentation, customs clearance, duty management.',
    },
    {
      title: 'Freight, haulage & last-mile delivery',
      body: 'Transportation of goods of all descriptions from port to project site. Services: Port clearing, heavy haulage, abnormal load permits, project site delivery, off-loading and positioning.',
    },
    {
      title: 'Framework contract management',
      body: 'Ongoing management of supply agreements for repeat procurement clients. Services: Contract administration, spend tracking, supplier performance review, renewal management.',
    },
  ],
  equipment: [
    { title: 'Earthmoving', items: 'Excavators, bulldozers, scrapers, motor graders, dump trucks' },
    { title: 'Road works', items: 'Asphalt pavers, compactors, rollers, milling machines' },
    { title: 'Lifting', items: 'Mobile cranes, tower cranes, forklifts, aerial work platforms' },
    { title: 'Concrete works', items: 'Batching plants, mixers, concrete pumps, vibrators' },
    { title: 'Power & electrical', items: 'Generators, transformers, switchgear, cabling systems' },
    { title: 'Production & industrial', items: 'Industrial plant, conveyor systems, processing machinery' },
  ],
  delivery: [
    {
      title: 'Needs assessment',
      body: 'Detailed review of project scope, timeline, site conditions, and specifications. For government clients, we work within your procurement framework from the outset — including pre-qualification, BoQ review, and technical specification alignment.',
    },
    {
      title: 'Sourcing & procurement',
      body: 'Equipment identified from verified international and domestic manufacturers. All sourcing is documented, competitively priced, and aligned to NERC, SON, and relevant Nigerian standards.',
    },
    {
      title: 'Importation & clearance',
      body: 'Full import chain managed — manufacturer coordination, shipping, port documentation, customs clearance, and duty management.',
    },
    {
      title: 'Delivery & mobilisation',
      body: 'Transportation to project site using appropriately sized haulage, including abnormal load permits where required. Site access planning, off-loading, and initial positioning included.',
    },
    {
      title: 'Commissioning & handover',
      body: 'Equipment commissioned on-site before formal handover. Operational documentation, operator training, and structured maintenance schedule provided.',
    },
  ],
  consultancyIntro:
    'The following advisory services are available within this service line, as standalone engagements or alongside a supply contract:',
  consultancy: [
    {
      title: 'Procurement strategy & planning',
      body: 'Developing procurement frameworks, annual procurement plans, and category strategies for state MDAs and federal agencies.',
    },
    {
      title: 'Spend analysis & category management',
      body: 'Analysing historical procurement spend to identify savings opportunities, preferred supplier rationalisation, and category management structures.',
    },
    {
      title: 'Vendor risk assessment',
      body: 'Independent evaluation of supplier financial stability, delivery track record, and compliance posture — particularly for high-value or sole-source contracts.',
    },
    {
      title: 'Healthcare supply chain advisory',
      body: 'Specialist advisory for health sector procurement — medicines, consumables, equipment — aligned to Nigerian and international health procurement standards.',
    },
  ],
  sectors: [
    'Road & transport',
    'Health infrastructure',
    'Education & public buildings',
    'Water & sanitation',
    'Power & energy',
    'Industrial & commercial',
  ],
  cta: {
    headline: 'Have a procurement, logistics, or supply chain requirement to discuss?',
    body: 'Whether you need equipment on-site within weeks or a procurement strategy for the year ahead, our team is ready to help.',
  },
};

export const ICT: ServiceData = {
  slug: 'ict',
  href: '/what-we-do/ict',
  label: 'ICT services',
  heroHeadline: 'ICT services — supply, deployment, and digital advisory',
  metaDescription:
    'Northaxis supplies and deploys ICT hardware, software, networks, and data systems for Nigerian government institutions and businesses, with digital transformation advisory.',
  hero: {
    sub: 'We supply and deploy the technology infrastructure that Nigerian government institutions and businesses need — and we advise on the digital strategies that make it work over the long term.',
  },
  intro: {
    quote:
      'Technology only transforms when it is deployed correctly and supported strategically. We do both.',
    body: 'The gap between purchasing technology and making it work is where most government ICT projects fail. Northaxis Integrated Services bridges that gap — supplying hardware, deploying software, configuring networks, and building the data systems that underpin modern public service delivery. For clients who want more than a supplier, we bring digital transformation advisory, ICT systems audit, and e-government implementation support that turns technology investment into lasting institutional capability.',
  },
  capabilities: [
    {
      title: 'Hardware supply & deployment',
      body: 'Procurement and deployment of computers, servers, networking equipment, and peripherals for government and private sector clients. Services: Specification, sourcing, procurement, delivery, installation, configuration.',
    },
    {
      title: 'Software licensing & deployment',
      body: 'Supply and installation of productivity software, specialist government systems, and enterprise platforms. Services: Licensing, installation, user setup, integration support.',
    },
    {
      title: 'Network infrastructure',
      body: 'Design and deployment of local area networks, wide area networks, and internet connectivity solutions. Services: Network design, cabling, router and switch configuration, testing and commissioning.',
    },
    {
      title: 'Data collection & management systems',
      body: 'Supply and configuration of data capture, storage, and reporting systems for MDAs and development programmes. Services: System specification, deployment, training, ongoing support.',
    },
  ],
  delivery: [
    {
      title: 'Technical assessment',
      body: 'Review of existing infrastructure, user requirements, and connectivity context before any procurement recommendation is made.',
    },
    {
      title: 'Specification & procurement',
      body: 'Equipment and software specified to match the assessed requirements. Procurement aligned to government frameworks and budgetary constraints.',
    },
    {
      title: 'Deployment & configuration',
      body: 'Hardware installed, software configured, and network commissioned on-site by our technical team. All deployment is documented.',
    },
    {
      title: 'Training & handover',
      body: 'End-user training delivered before formal handover. Support documentation provided. Optional ongoing maintenance agreement available.',
    },
  ],
  consultancy: [
    {
      title: 'Digital transformation strategy',
      body: 'Advising government institutions on technology roadmaps, digital service design, and transformation programme management.',
    },
    {
      title: 'ICT systems audit & advisory',
      body: 'Independent review of existing ICT infrastructure, identifying gaps, risks, and optimisation opportunities.',
    },
    {
      title: 'Cyber security readiness review',
      body: "Assessment of an organisation's cyber security posture against Nigerian and international standards, with a prioritised remediation roadmap.",
    },
    {
      title: 'e-Government implementation support',
      body: 'Advisory and programme management for e-government initiatives — including citizen-facing digital services, internal workflow digitisation, and inter-agency data sharing.',
    },
  ],
  sectors: [
    'Education & schools',
    'Health sector',
    'State government MDAs',
    'Federal agencies',
    'Development finance institutions',
    'Private sector',
  ],
  cta: {
    headline: 'Have an ICT supply or digital advisory requirement?',
    body: 'From a school computer lab to a government digital transformation programme, our team is ready to scope your requirement and propose a solution.',
  },
};

export const ENERGY: ServiceData = {
  slug: 'energy',
  href: '/what-we-do/energy',
  label: 'Energy & sustainability',
  heroHeadline: 'Energy supply, power systems & sustainability advisory',
  metaDescription:
    'Northaxis supplies petroleum products, power generation, and renewable energy equipment across Nigeria, with energy audit, electrification planning, and sustainability advisory.',
  hero: {
    sub: 'We supply petroleum products, power generation systems, and renewable energy equipment — and we advise government institutions and development agencies on electrification planning, energy efficiency, and the transition to sustainable energy.',
  },
  intro: {
    quote:
      'Reliable energy is not a luxury — it is the foundation of every other development priority. We supply it and help you plan for it.',
    body: 'Unreliable power is one of the most persistent constraints on public service delivery across Nigeria. Northaxis Integrated Services addresses this directly — supplying the petroleum products, generators, solar systems, and industrial power equipment that keep government facilities, health centres, schools, and infrastructure projects operational. For institutions ready to think beyond the immediate supply problem, we bring energy audit, rural electrification planning, and sustainability advisory that aligns energy investment with long-term development goals.',
  },
  capabilities: [
    {
      title: 'Petroleum products supply',
      body: 'Supply of petroleum products for government fleet management, facility operations, and project site energy needs. Services: Fuel supply agreements, delivery logistics, storage solutions.',
    },
    {
      title: 'Power generation equipment',
      body: 'Supply of generators, UPS systems, and diesel power plants for government facilities and project sites. Services: Specification, procurement, delivery, installation, maintenance planning.',
    },
    {
      title: 'Solar & renewable energy equipment',
      body: 'Supply of solar panels, inverters, batteries, and hybrid systems for off-grid and grid-tied applications. Services: System design support, equipment supply, installation coordination.',
    },
    {
      title: 'Industrial energy equipment',
      body: 'Supply of transformers, switchgear, cabling, and electrical systems for industrial and infrastructure projects. Services: Specification, procurement, import, delivery, commissioning support.',
    },
  ],
  delivery: [
    {
      title: 'Energy needs assessment',
      body: "Review of the facility's or project's energy requirements, current supply arrangements, and reliability constraints before any recommendation is made.",
    },
    {
      title: 'Solution specification',
      body: 'Energy supply or equipment solution specified to match assessed requirements, budget, and site conditions. Solar, generator, hybrid, and grid options evaluated where relevant.',
    },
    {
      title: 'Procurement & delivery',
      body: 'Equipment sourced, imported where necessary, and delivered to site. Full import documentation and customs clearance managed by Northaxis.',
    },
    {
      title: 'Commissioning & handover',
      body: 'Equipment installed and commissioned. Operator training delivered. Maintenance schedule and spare parts plan provided at handover.',
    },
  ],
  consultancy: [
    {
      title: 'Energy audit & efficiency advisory',
      body: "Independent assessment of a facility's or organisation's energy consumption, identifying efficiency opportunities and cost reduction measures.",
    },
    {
      title: 'Rural electrification planning',
      body: 'Advisory for state governments and development agencies on rural electrification programmes — technology selection, community engagement, rollout sequencing, and monitoring frameworks.',
    },
    {
      title: 'Sustainability strategy for MDAs',
      body: 'Advising government ministries and agencies on integrating sustainability commitments into operations, procurement, and infrastructure planning.',
    },
    {
      title: 'Renewable transition roadmaps',
      body: 'Structured advisory for organisations moving from diesel dependency to solar, hybrid, or grid-connected renewable energy — including business case development, technology selection, and phased implementation planning.',
    },
  ],
  sectors: [
    'Health sector',
    'Education & schools',
    'Road & transport',
    'Water & sanitation',
    'Oil & gas',
    'Industrial & commercial',
    'Rural development',
  ],
  cta: {
    headline: 'Have an energy supply or sustainability advisory requirement?',
    body: 'Whether you need fuel supply for a project site, solar panels for a health centre, or a rural electrification plan for your state, our team is ready to help.',
  },
};

/** Registry of all service lines. */
export const SERVICES: Record<string, ServiceData> = {
  procurement: PROCUREMENT,
  ict: ICT,
  energy: ENERGY,
};
