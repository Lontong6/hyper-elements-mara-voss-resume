import {
  Column,
  component,
  defineTheme,
  Divider,
  Document,
  Grid,
  Heading,
  LineBreak,
  List,
  ListItem,
  PageBreak,
  PageFooter,
  PageHeader,
  PageNumber,
  prop,
  Row,
  Span,
  Text,
  token,
} from "@hyper-elements/react";

/**
 * Mara Voss — a résumé as a Hyper Elements `Document`.
 *
 * Renders to print HTML with `render()` and to a real PDF with
 * `renderPdf()` (fonts passed as bytes — see `src/render.tsx`). The layout
 * uses the Document's own furniture: a `PageHeader` and `PageFooter` with
 * live `PageNumber`s on every page, and explicit `Document.Page`s so the
 * two pages break exactly where a résumé should.
 */

const voss = defineTheme({
  colors: {
    background: "#ffffff",
    foreground: "#1b1b18",
    primary: "#166b4d",
    primaryForeground: "#ffffff",
    muted: "#6e6a61",
    border: "#e4dfd6",
  },
  fonts: {
    body: "Inter, 'Helvetica Neue', Arial, sans-serif",
    heading: "Fraunces, Georgia, serif",
  },
  components: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 46, lineHeight: 1.05, fontWeight: 700 },
          2: { fontSize: 13, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: "#166b4d" },
          3: { fontSize: 16, fontWeight: 700, lineHeight: 1.25 },
        },
      },
    },
    Text: { lineHeight: 1.45 },
    List: { gap: 4 },
  },
});

/** A section heading with its hairline, as one checked component. */
const SectionHeading = component({
  type: "voss.SectionHeading",
  label: "Section heading",
  description: "An uppercase green section title over a hairline rule.",
  props: { title: prop.text({ required: true }) },
  render: ({ title }) => (
    <Column style={{ gap: 8 }}>
      <Heading level={2}>{title}</Heading>
      <Divider style={{ borderTop: { width: 1, style: "solid", color: token("colors.border") } }} />
    </Column>
  ),
});

/** A headline outcome: a big serif number over a small caption. */
const Metric = component({
  type: "voss.Metric",
  label: "Outcome metric",
  description: "A large Fraunces value over a muted caption.",
  props: {
    value: prop.text({ required: true }),
    label: prop.text({ required: true }),
  },
  render: ({ value, label }) => (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 29, fontWeight: 700 }}>{value}</Text>
      <Text style={{ fontSize: 12, color: token("colors.muted") }}>{label}</Text>
    </Column>
  ),
});

type Role = { title: string; company: string; period: string; bullets: string[] };

const roles: Role[] = [
  {
    title: "Senior Product Designer",
    company: "Cartway — commerce platform, Berlin",
    period: "2023 — Present",
    bullets: [
      "Led the redesign of merchant onboarding; activation rose 38% in two quarters and setup-related support tickets fell by half.",
      "Built Ballast, the Cartway design system — 40+ components adopted by six product teams; design-to-engineering handoff time down 30%.",
      "Ran continuous discovery with two product managers (26 moderated studies in 2025) and keep the research repository the whole company reads.",
    ],
  },
  {
    title: "Product Designer",
    company: "Helios Health — patient platform, Hamburg",
    period: "2020 — 2023",
    bullets: [
      "Designed appointment booking and in-hospital wayfinding; task success in usability testing rose from 61% to 92%.",
      "Brought the app to WCAG 2.2 AA and kept it there, auditing every release with assistive-technology users.",
      "Worked with clinical staff in three hospitals to digitise discharge paperwork, returning about 25 minutes per shift to nursing teams.",
    ],
  },
];

function RoleBlock({ role }: { role: Role }) {
  return (
    <Column style={{ gap: 5 }}>
      <Row stackOnMobile={false} style={{ gap: 12 }}>
        <Heading level={3} style={{ flex: "none" }}>
          {role.title}
        </Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 13, textAlign: "right" }}>{role.period}</Text>
      </Row>
      <Text style={{ color: token("colors.primary"), fontWeight: 600 }}>{role.company}</Text>
      <List>
        {role.bullets.map((b) => (
          <ListItem key={b.slice(0, 24)}>{b}</ListItem>
        ))}
      </List>
    </Column>
  );
}

const skills: Array<{ group: string; items: string[] }> = [
  { group: "Design", items: ["Interaction design", "Design systems", "Visual design", "Prototyping (hi-fi)"] },
  { group: "Research", items: ["User interviews", "Usability testing", "Journey mapping", "Experiment analysis"] },
  { group: "Tools & code", items: ["Figma & FigJam", "ProtoPie", "Maze, Dovetail", "HTML & CSS"] },
];

export default function MaraVossResume() {
  return (
    <Document
      lang="en"
      theme={voss}
      size="A4"
      title="Mara Voss — Résumé"
      margin={{ top: 44, bottom: 44, left: 70, right: 70 }}
    >
      <PageHeader
        style={{
          padding: [0, 0, 10],
          border: { bottom: { width: 1, style: "solid", color: token("colors.border") } },
        }}
      >
        <Row stackOnMobile={false} style={{ gap: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>MARA VOSS</Text>
          <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "right" }}>
            Senior Product Designer — Berlin
          </Text>
        </Row>
      </PageHeader>

      <PageFooter
        style={{
          padding: [10, 0, 0],
          border: { top: { width: 1, style: "solid", color: token("colors.border") } },
        }}
      >
        <Row stackOnMobile={false} style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, color: token("colors.muted") }}>maravoss.design · hello@maravoss.design</Text>
          <Text style={{ fontSize: 11, color: token("colors.muted"), textAlign: "right" }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      <Document.Page style={{ gap: 16, alignItems: "center" }}>
       <Column style={{ width: 600, gap: 14 }}>
        <Column style={{ gap: 6 }}>
          <Heading level={1}>Mara Voss</Heading>
          <Text style={{ fontSize: 17, fontWeight: 600, color: token("colors.primary") }}>
            Senior Product Designer
          </Text>
          <Row stackOnMobile={false} style={{ gap: 8 }}>
            {["hello@maravoss.design", "+49 30 4402 7718", "maravoss.design", "Berlin, Germany"].map((c, i) => (
              <Text key={c} style={{ fontSize: 13, color: token("colors.muted"), flex: "none" }}>
                {i > 0 && <Span style={{ color: token("colors.border") }}>· </Span>}
                {c}
              </Text>
            ))}
          </Row>
        </Column>

        <Text>
          Product designer with nine years across commerce, health and studio work. I specialise in the unglamorous
          middle of products — onboarding, systems, workflows — where careful design moves the numbers a business
          watches.
        </Text>

        <Row
          stackOnMobile={false}
          style={{
            gap: 24,
            padding: [14, 0],
            border: {
              top: { width: 1, style: "solid", color: token("colors.border") },
              bottom: { width: 1, style: "solid", color: token("colors.border") },
            },
          }}
        >
          <Metric value="+38%" label="Activation lift, merchant onboarding (2024)" />
          <Metric value="€4.2M" label="Yearly revenue tied to the checkout redesign" />
          <Metric value="40+" label="Design-system components, six teams shipping" />
        </Row>

        <Column style={{ gap: 12 }}>
          <SectionHeading title="Experience" />
          {roles.map((role) => (
            <RoleBlock key={role.company} role={role} />
          ))}
        </Column>
       </Column>
      </Document.Page>

      <PageBreak />

      <Document.Page style={{ gap: 16, alignItems: "center" }}>
       <Column style={{ width: 600, gap: 14 }}>
        <Column style={{ gap: 12 }}>
          <SectionHeading title="Experience, continued" />
          <RoleBlock
            role={{
              title: "Product Designer",
              company: "Studio Norr — design studio, Berlin",
              period: "2018 — 2020",
              bullets: [
                "E-commerce and editorial sites for retail and publishing clients; two projects shortlisted for the German Design Award.",
                "Replaced static handoffs with in-browser prototypes on the studio's largest account; revision rounds fell from five to two.",
              ],
            }}
          />
          <RoleBlock
            role={{
              title: "Visual Designer",
              company: "Fernpost — logistics scale-up, Munich",
              period: "2016 — 2018",
              bullets: [
                "Brand and campaign design; built the template system still in use.",
                "Illustrated the onboarding guide shipped in 40,000 welcome packs.",
              ],
            }}
          />
        </Column>

        <Column style={{ gap: 12 }}>
          <SectionHeading title="Selected projects" />
          <Column style={{ gap: 5 }}>
            <Heading level={3}>AccessCheck — accessibility plugin for Figma</Heading>
            <Text>
              A contrast and reading-order checker with plain-language fixes, now used by 8,000+ designers.
              Presented at the Forward Festival, 2025.
            </Text>
          </Column>
          <Column style={{ gap: 5 }}>
            <Heading level={3}>Type specimen microsites</Heading>
            <Text>
              Ongoing collaboration with a Berlin type foundry: small, fast specimen sites that set whole alphabets
              as working interfaces, not posters.
            </Text>
          </Column>
        </Column>

        <Column style={{ gap: 12 }}>
          <SectionHeading title="Skills" />
          <Grid columns={3} style={{ gap: 20 }}>
            {skills.map((s) => (
              <Column key={s.group} style={{ gap: 6 }}>
                <Text style={{ fontWeight: 700 }}>{s.group}</Text>
                <List>
                  {s.items.map((i) => (
                    <ListItem key={i}>{i}</ListItem>
                  ))}
                </List>
              </Column>
            ))}
          </Grid>
        </Column>

        <Column style={{ gap: 12 }}>
          <SectionHeading title="Education" />
          <Row stackOnMobile={false} style={{ gap: 12 }}>
            <Column style={{ gap: 2, flex: "none" }}>
              <Text style={{ fontWeight: 700 }}>M.A. Interaction Design</Text>
              <Text style={{ color: token("colors.muted") }}>Berlin University of the Arts (UdK)</Text>
            </Column>
            <Text style={{ color: token("colors.muted"), fontSize: 13, textAlign: "right" }}>2014 — 2016</Text>
          </Row>
          <Row stackOnMobile={false} style={{ gap: 12 }}>
            <Column style={{ gap: 2, flex: "none" }}>
              <Text style={{ fontWeight: 700 }}>B.A. Communication Design</Text>
              <Text style={{ color: token("colors.muted") }}>Munich University of Applied Sciences</Text>
            </Column>
            <Text style={{ color: token("colors.muted"), fontSize: 13, textAlign: "right" }}>2010 — 2014</Text>
          </Row>
        </Column>

        <Column style={{ gap: 12 }}>
          <SectionHeading title="Languages & elsewhere" />
          <Text>
            German (native) · English (fluent) · French (conversational)
            <LineBreak />
            Mentor on ADPList since 2022 · Speaker, Forward Festival 2025 · References on request
          </Text>
        </Column>
       </Column>
      </Document.Page>
    </Document>
  );
}
