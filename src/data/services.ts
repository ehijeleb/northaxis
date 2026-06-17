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
  /** Breadcrumb + hero headline label. */
  label: string;
  /** Short nav/menu label if different (optional). */
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
  consultancyIntro: string;
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

/** Registry — extended in Step 10. */
export const SERVICES: Record<string, ServiceData> = {
  procurement: PROCUREMENT,
};
